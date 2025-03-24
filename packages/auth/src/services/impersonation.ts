import { BaseAuthToken } from '../models/core';
import { tokenStorage } from '../storage/token';
import { PortalUser, StartImpersonationParams, UserRole } from '../types/user';
import { AuthAction, logAuthEvent } from '../utils/logger';
import { authServiceImpl } from './auth';

export class ImpersonationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ImpersonationError';
  }
}

/**
 * Impersonation state
 */
export interface ImpersonationState {
  originalToken: BaseAuthToken;
  impersonatedToken: BaseAuthToken;
}

/**
 * Impersonation service interface
 */
export interface ImpersonationService {
  startImpersonation(
    token: BaseAuthToken,
    targetUserId: string,
  ): Promise<BaseAuthToken>;
  endImpersonation(token: BaseAuthToken): Promise<BaseAuthToken>;
  isImpersonating(token: BaseAuthToken): boolean;
  getOriginalUser(token: BaseAuthToken): BaseAuthToken | null;
}

/**
 * Default impersonation service implementation
 */
export class DefaultImpersonationService implements ImpersonationService {
  private impersonationStates = new Map<string, ImpersonationState>();

  /**
   * Start impersonating a user
   */
  async startImpersonation(
    token: BaseAuthToken,
    targetUserId: string,
  ): Promise<BaseAuthToken> {
    if (this.isImpersonating(token)) {
      throw new Error('Already impersonating a user');
    }

    // Call your API to get impersonated user token
    const impersonatedToken = await this.getImpersonatedUserToken(targetUserId);

    // Store impersonation state
    this.impersonationStates.set(impersonatedToken.userId, {
      originalToken: token,
      impersonatedToken,
    });

    // Update token in storage with impersonation data
    await tokenStorage.updateTokenForImpersonation(token, impersonatedToken);

    return impersonatedToken;
  }

  /**
   * End impersonation
   */
  async endImpersonation(token: BaseAuthToken): Promise<BaseAuthToken> {
    if (!this.isImpersonating(token)) {
      throw new Error('Not currently impersonating');
    }

    const state = this.impersonationStates.get(token.userId);
    if (!state) {
      throw new Error('Impersonation state not found');
    }

    // Remove impersonation state
    this.impersonationStates.delete(token.userId);

    // Restore original token in storage
    await tokenStorage.restoreOriginalToken(state.originalToken);

    return state.originalToken;
  }

  /**
   * Check if token is impersonating
   */
  isImpersonating(token: BaseAuthToken): boolean {
    return Boolean((token?.user as PortalUser)?.impersonation?.isImpersonating);
  }

  /**
   * Get original user token
   */
  getOriginalUser(token: BaseAuthToken): BaseAuthToken | null {
    if (!this.isImpersonating(token)) {
      return null;
    }

    const state = this.impersonationStates.get(token.userId);
    return state?.originalToken || null;
  }

  /**
   * Get impersonated user token from API
   * This is a placeholder - implement actual API call
   */
  private async getImpersonatedUserToken(
    targetUserId: string,
  ): Promise<BaseAuthToken> {
    // Implement API call to get impersonated user token
    throw new Error('Not implemented');
  }
}

/**
 * Default impersonation service instance
 */
export const impersonationService = new DefaultImpersonationService();

export async function startImpersonation({
  targetUserId,
  reason,
}: StartImpersonationParams) {
  const session = await authServiceImpl.getSession();

  if (!session) {
    logAuthEvent({
      action: AuthAction.IMPERSONATION_START,
      status: 'failure',
      error: new Error('No active session'),
    });
    throw new ImpersonationError('No active session');
  }

  logAuthEvent({
    userId: session.user.id,
    action: AuthAction.IMPERSONATION_START,
    status: 'attempt',
    metadata: { targetUserId, reason },
  });

  // Only INTERNAL and ADMIN roles can impersonate
  if (![UserRole.INTERNAL, UserRole.ADMIN].includes(session.user.role)) {
    logAuthEvent({
      userId: session.user.id,
      action: AuthAction.IMPERSONATION_START,
      status: 'failure',
      error: new Error('User role cannot perform impersonation'),
    });
    throw new ImpersonationError('User role cannot perform impersonation');
  }

  try {
    // Call your API to get target user details
    const response = await fetch(`/api/users/${targetUserId}`);
    const targetUser = await response.json();

    // Create impersonation context
    const impersonationContext = {
      originalUser: {
        id: session.user.id,
        role: session.user.role,
        permissions: session.user.permissions,
      },
      impersonatedUser: {
        id: targetUser.id,
        role: targetUser.role,
        permissions: targetUser.permissions || ['view-profile'],
      },
      timestamp: new Date().toISOString(),
      reason,
      isImpersonating: true,
    };

    // Update session with impersonation context
    await authServiceImpl.updateSession({
      ...session,
      user: {
        ...targetUser,
        impersonation: impersonationContext,
      },
    });

    logAuthEvent({
      userId: session.user.id,
      action: AuthAction.IMPERSONATION_START,
      status: 'success',
      metadata: {
        targetUserId,
        targetRole: targetUser.role,
        impersonationContext,
      },
    });

    return { success: true };
  } catch (error) {
    logAuthEvent({
      userId: session.user.id,
      action: AuthAction.IMPERSONATION_START,
      status: 'failure',
      error: error as Error,
    });
    throw new ImpersonationError('Failed to start impersonation session');
  }
}

export async function endImpersonation() {
  const session = await authServiceImpl.getSession();
  const portalUser = session?.user as PortalUser;

  if (!portalUser?.impersonation) {
    logAuthEvent({
      action: AuthAction.IMPERSONATION_END,
      status: 'failure',
      error: new Error('No active impersonation session'),
    });
    throw new ImpersonationError('No active impersonation session');
  }

  try {
    logAuthEvent({
      userId: portalUser.impersonation.originalUser.id,
      action: AuthAction.IMPERSONATION_END,
      status: 'attempt',
      metadata: {
        impersonatedUserId: portalUser.id,
      },
    });

    // Restore original user session
    const { originalUser } = portalUser.impersonation;
    await authServiceImpl.updateSession({
      user: {
        ...originalUser,
        impersonation: undefined,
      } as PortalUser,
      expires: session!.expires,
    });

    logAuthEvent({
      userId: originalUser.id,
      action: AuthAction.IMPERSONATION_END,
      status: 'success',
      metadata: {
        impersonatedUserId: portalUser.id,
      },
    });

    return { success: true };
  } catch (error) {
    logAuthEvent({
      userId: portalUser.impersonation.originalUser.id,
      action: AuthAction.IMPERSONATION_END,
      status: 'failure',
      error: error as Error,
    });
    throw new ImpersonationError('Failed to end impersonation session');
  }
}

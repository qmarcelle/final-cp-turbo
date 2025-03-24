import axios from 'axios';
import { SERVER_ACTION_NO_SESSION_ERROR } from '../auth';
import { AuthService, isErrorResponse } from '../types/auth';
import { Session, SessionUser } from '../types/user';
import { AuthAction, logAuthEvent } from '../utils/logger';

/**
 * Base URL for API calls - will be configurable
 */
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '/api';

export class AuthServiceImpl implements AuthService {
  private readonly sessionEndpoint = `${API_BASE_URL}/auth/session`;
  private readonly refreshEndpoint = `${API_BASE_URL}/auth/refresh`;
  private readonly userEndpoint = `${API_BASE_URL}/users`;
  private session: Session | null = null;

  private async handleErrorResponse(response: Response): Promise<never> {
    try {
      const data = await response.json();
      if (isErrorResponse(data)) {
        throw new Error(
          data.message ||
            data.error ||
            `Request failed with status ${response.status}`,
        );
      }
      throw new Error(`Request failed with status ${response.status}`);
    } catch (e) {
      if (e instanceof Error) {
        throw e;
      }
      throw new Error(`Request failed with status ${response.status}`);
    }
  }

  /**
   * Get current session from the server
   */
  async getSession(): Promise<Session | null> {
    try {
      logAuthEvent({
        action: AuthAction.SESSION_REFRESH,
        status: 'attempt',
      });

      const response = await axios.get<Session>(this.sessionEndpoint);
      const session = response.data;

      if (!session) {
        logAuthEvent({
          action: AuthAction.SESSION_REFRESH,
          status: 'failure',
          error: new Error('No session found'),
        });
        return null;
      }

      this.session = session;
      logAuthEvent({
        userId: session.user?.id,
        action: AuthAction.SESSION_REFRESH,
        status: 'success',
      });

      return session;
    } catch (error) {
      logAuthEvent({
        action: AuthAction.SESSION_REFRESH,
        status: 'failure',
        error: error as Error,
      });
      return null;
    }
  }

  /**
   * Update session on the server
   */
  async updateSession(session: Session): Promise<void> {
    try {
      logAuthEvent({
        userId: session.user?.id,
        action: AuthAction.SESSION_REFRESH,
        status: 'attempt',
        metadata: { expires: session.expires },
      });

      await axios.post(this.sessionEndpoint, session);
      this.session = session;

      logAuthEvent({
        userId: session.user?.id,
        action: AuthAction.SESSION_REFRESH,
        status: 'success',
        metadata: { expires: session.expires },
      });
    } catch (error) {
      logAuthEvent({
        userId: session.user?.id,
        action: AuthAction.SESSION_REFRESH,
        status: 'failure',
        error: error as Error,
      });
      throw error;
    }
  }

  /**
   * Refresh session token
   */
  async refreshSession(session: Session): Promise<Session> {
    try {
      logAuthEvent({
        userId: session.user?.id,
        action: AuthAction.TOKEN_REFRESH,
        status: 'attempt',
        metadata: { currentExpiry: session.expires },
      });

      const response = await axios.post<Session>(this.refreshEndpoint, {
        userId: session.user?.id,
        currentExpiry: session.expires,
      });

      const newSession = response.data;
      if (!newSession || !newSession.expires) {
        throw new Error('Invalid session received from refresh endpoint');
      }

      this.session = newSession;
      logAuthEvent({
        userId: session.user?.id,
        action: AuthAction.TOKEN_REFRESH,
        status: 'success',
        metadata: {
          oldExpiry: session.expires,
          newExpiry: newSession.expires,
        },
      });

      return newSession;
    } catch (error) {
      logAuthEvent({
        userId: session.user?.id,
        action: AuthAction.TOKEN_REFRESH,
        status: 'failure',
        error: error as Error,
      });
      throw error;
    }
  }

  /**
   * Get user data from API
   */
  private async getUserData(userId: string): Promise<SessionUser> {
    const response = await axios.get(`${this.userEndpoint}/${userId}`);
    const userData = response.data;

    return {
      id: userData.id,
      email: userData.email || '',
      role: userData.role,
      permissions: userData.permissions || ['view-profile'],
    };
  }

  async signIn(credentials: {
    username: string;
    password: string;
  }): Promise<Session> {
    const response = await fetch('/api/auth/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      await this.handleErrorResponse(response);
    }

    const session = await response.json();
    this.session = session;
    return session;
  }

  async verifyMFA(code: string): Promise<Session> {
    const response = await fetch('/api/auth/verify-mfa', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    });

    if (!response.ok) {
      await this.handleErrorResponse(response);
    }

    const session = await response.json();
    this.session = session;
    return session;
  }

  async requestPasswordReset(email: string): Promise<void> {
    const response = await fetch('/api/auth/request-reset', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      await this.handleErrorResponse(response);
    }
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    const response = await fetch('/api/auth/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, newPassword }),
    });

    if (!response.ok) {
      await this.handleErrorResponse(response);
    }
  }

  async signOut(): Promise<void> {
    const response = await fetch('/api/auth/signout', {
      method: 'POST',
    });

    if (!response.ok) {
      await this.handleErrorResponse(response);
    }

    this.session = null;
  }
}

// Create a singleton instance
export const authServiceImpl = new AuthServiceImpl();

/**
 * Get the current server-side user ID
 * @returns User ID string
 * @throws Error if no session is found
 */
export async function getServerSideUserId(): Promise<string> {
  try {
    const session = await authServiceImpl.getSession();
    if (!session?.user?.id) {
      logAuthEvent({
        action: AuthAction.SESSION_REFRESH,
        status: 'failure',
        error: new Error(SERVER_ACTION_NO_SESSION_ERROR),
      });
      throw SERVER_ACTION_NO_SESSION_ERROR;
    }
    return session.user.id;
  } catch (error) {
    logAuthEvent({
      action: AuthAction.SESSION_REFRESH,
      status: 'failure',
      error: error as Error,
    });
    throw error;
  }
}

/**
 * Check if session has timed out
 */
export function checkSessionTimeout(session: Session): boolean {
  if (!session.expires) {
    logAuthEvent({
      userId: session.user?.id,
      action: AuthAction.SESSION_TIMEOUT,
      status: 'failure',
      error: new Error('No expiration time set for session'),
    });
    return true;
  }

  const hasExpired = new Date(session.expires) < new Date();

  logAuthEvent({
    userId: session.user?.id,
    action: AuthAction.SESSION_TIMEOUT,
    status: hasExpired ? 'failure' : 'success',
    metadata: {
      expiresAt: session.expires,
      currentTime: new Date().toISOString(),
    },
  });

  return hasExpired;
}

/**
 * Check if user has required permission
 */
export function checkPermission(session: Session, permission: string): boolean {
  if (!session.user?.permissions) {
    logAuthEvent({
      userId: session.user?.id,
      action: AuthAction.PERMISSION_CHECK,
      status: 'failure',
      error: new Error('No permissions found in session'),
      metadata: { requiredPermission: permission },
    });
    return false;
  }

  const hasPermission = session.user.permissions.includes(permission);

  logAuthEvent({
    userId: session.user?.id,
    action: AuthAction.PERMISSION_CHECK,
    status: hasPermission ? 'success' : 'failure',
    metadata: {
      requiredPermission: permission,
      userPermissions: session.user.permissions,
    },
  });

  return hasPermission;
}

/**
 * Refresh auth token
 */
export async function refreshToken(session: Session): Promise<Session> {
  try {
    logAuthEvent({
      userId: session.user?.id,
      action: AuthAction.TOKEN_REFRESH,
      status: 'attempt',
      metadata: { currentExpiry: session.expires },
    });

    const newSession = await authServiceImpl.refreshSession(session);

    logAuthEvent({
      userId: session.user?.id,
      action: AuthAction.TOKEN_REFRESH,
      status: 'success',
      metadata: {
        oldExpiry: session.expires,
        newExpiry: newSession.expires,
      },
    });

    return newSession;
  } catch (error) {
    logAuthEvent({
      userId: session.user?.id,
      action: AuthAction.TOKEN_REFRESH,
      status: 'failure',
      error: error as Error,
    });
    throw error;
  }
}

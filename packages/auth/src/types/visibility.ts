/**
 * Base visibility rules interface
 */
export interface VisibilityRules {
  /**
   * Whether the user is authenticated
   */
  isAuthenticated: boolean;

  /**
   * Whether the user can view their profile
   */
  canViewProfile: boolean;

  /**
   * Whether the user can edit their profile
   */
  canEditProfile: boolean;

  /**
   * Whether the user can access admin features
   */
  canAccessAdmin: boolean;
}

/**
 * Visibility action types
 */
export type VisibilityAction =
  | 'view'
  | 'edit'
  | 'delete'
  | 'create'
  | 'manage'
  | 'approve'
  | 'reject';

/**
 * Base interface for authentication-related visibility flags
 * This should only contain flags related to core authentication functionality
 */
export interface BaseAuthVisibility {
  /**
   * Whether the user is authenticated
   */
  isAuthenticated: boolean;

  /**
   * Whether the user can access admin features
   */
  canAccessAdmin: boolean;

  /**
   * Whether the user can manage their profile
   */
  canManageProfile: boolean;

  /**
   * Whether the user's session is active
   */
  isSessionActive: boolean;

  /**
   * Whether the user needs to change their password
   */
  requiresPasswordChange: boolean;

  /**
   * Whether the user has MFA enabled
   */
  hasMfaEnabled: boolean;
}

/**
 * Type for auth-specific permissions
 */
export type AuthPermission =
  | 'admin'
  | 'profile_manage'
  | 'mfa_manage'
  | 'password_manage';

/**
 * Interface for auth-specific roles
 */
export interface AuthRole {
  name: string;
  permissions: AuthPermission[];
}

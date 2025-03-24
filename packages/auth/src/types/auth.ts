import { AuthConfig as AuthJSConfig } from '@auth/core';
import { Session } from '@auth/core/types';
import { SessionTimeoutConfig } from './session';

/**
 * Configuration for the auth package
 *
 * @remarks
 * This configuration must be provided by the consuming application to set up authentication.
 * The loginUrl and logoutUrl are required and must be provided by the consuming application
 * to ensure proper routing control.
 */
export interface AuthConfig {
  /**
   * Base URL for authentication (e.g., http://localhost:3000)
   */
  baseUrl: string;

  /**
   * URL to redirect to for login
   */
  loginUrl: string;

  /**
   * URL to redirect to after login success
   */
  loginRedirectUrl: string;

  /**
   * URL to redirect to for logout
   */
  logoutUrl: string;

  /**
   * URL to redirect to after logout
   */
  logoutRedirectUrl: string;

  /**
   * API authentication prefix (e.g., /api/auth)
   */
  apiAuthPrefix: string;

  /**
   * Session timeout configuration
   */
  sessionTimeout?: SessionTimeoutConfig;

  /**
   * Session expiry time in seconds
   */
  sessionExpiry?: number;

  /**
   * Whether MFA is enabled
   */
  mfaEnabled?: boolean;

  /**
   * PingOne configuration
   */
  pingOneConfig?: PingOneConfig;

  /**
   * Login page path
   */
  loginPath: string;

  /**
   * Home page path
   */
  homePath: string;

  /**
   * MFA page path
   */
  mfaPath: string;

  /**
   * Reset password page path
   */
  resetPasswordPath: string;

  /**
   * Verify email page path
   */
  verifyEmailPath: string;

  /**
   * Account selection page path
   */
  accountSelectionPath: string;

  /**
   * Auth.js configuration overrides
   */
  authJsConfig?: Partial<AuthJSConfig>;
}

/**
 * PingOne configuration for risk signals
 */
export interface PingOneConfig {
  clientId: string;
  clientSecret: string;
  environment: string;
  region: string;
}

/**
 * Auth routes configuration for middleware
 */
export interface AuthRoutes {
  /** Routes that don't require authentication */
  publicRoutes: string[];

  /** Routes that require authentication */
  authRoutes: string[];

  /** Prefix for authentication API routes */
  apiAuthPrefix: string;

  /** Routes for inbound SSO with their corresponding redirect paths */
  inboundSSORoutes: Map<string, string>;

  /** Routes that should not display header and footer */
  noHeaderAndFooterRoutes: string[];

  /** Default redirect path after logout */
  defaultLogoutRedirect: string;
}

/**
 * DX Auth Token type for legacy integration
 */
export interface DXAuthToken {
  user: string;
  time: number;
}

/**
 * Core authentication service interface
 */
export interface AuthService {
  // Session management
  getSession(): Promise<Session | null>;
  updateSession(session: Session): Promise<void>;
  refreshSession(session: Session): Promise<Session>;

  // Authentication
  signIn(credentials: { username: string; password: string }): Promise<Session>;
  signOut(): Promise<void>;

  // MFA
  verifyMFA(code: string): Promise<Session>;

  // Password management
  requestPasswordReset(email: string): Promise<void>;
  resetPassword(token: string, newPassword: string): Promise<void>;
}

/**
 * Error response type for authentication errors
 */
export interface ErrorResponse {
  /** Error code or identifier */
  error?: string;

  /** Human-readable error message */
  message?: string;
}

/**
 * Type guard for error responses
 * @param obj Object to check
 * @returns True if object matches ErrorResponse interface
 */
export function isErrorResponse(obj: any): obj is ErrorResponse {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    (typeof obj.error === 'string' || typeof obj.message === 'string')
  );
}

/**
 * Sign in credentials interface
 */
export interface SignInCredentials {
  /**
   * User's email or username
   */
  email: string;

  /**
   * User's password
   */
  password: string;

  /**
   * Optional MFA code
   */
  mfaCode?: string;
}

/**
 * Authentication context type
 */
export interface AuthContextType {
  /**
   * Sign in with credentials
   */
  signIn: (credentials: SignInCredentials) => Promise<void>;

  /**
   * Sign out the current user
   */
  signOut: () => Promise<void>;

  /**
   * Verify MFA code
   */
  verifyMFA: (code: string) => Promise<void>;

  /**
   * Request password reset
   */
  requestPasswordReset: (email: string) => Promise<void>;

  /**
   * Reset password with token
   */
  resetPassword: (token: string, newPassword: string) => Promise<void>;

  /**
   * Current authentication status
   */
  status: 'loading' | 'authenticated' | 'unauthenticated';

  /**
   * Current session data
   */
  session: Session | null;

  /**
   * Whether MFA is required
   */
  mfaRequired: boolean;

  /**
   * Whether password reset is required
   */
  passwordResetRequired: boolean;

  /**
   * Whether email verification is required
   */
  emailVerificationRequired: boolean;

  /**
   * Authentication error if any
   */
  error: Error | null;
}

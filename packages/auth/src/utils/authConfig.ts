import { AuthConfig } from '../types/auth';
import { SessionTimeoutConfig } from '../types/session';

/**
 * Default session timeout configuration
 * Can be overridden by consuming application
 */
const DEFAULT_SESSION_TIMEOUT_CONFIG: SessionTimeoutConfig = {
  enabled: true,
  timeoutMinutes: 30,
  warningMinutes: 5,
};

/**
 * Default authentication configuration
 *
 * @remarks
 * This provides default values for the auth configuration.
 * Note that loginUrl and logoutUrl MUST be overridden by the consuming application
 * as they control the authentication flow routing.
 *
 * Example usage:
 * ```typescript
 * const config = mergeAuthConfig({
 *   loginUrl: '/custom/login',
 *   logoutUrl: '/custom/logout',
 *   // other custom config...
 * });
 * ```
 */
export const defaultAuthConfig: AuthConfig = {
  baseUrl: process.env.NEXTAUTH_URL || 'http://localhost:3000',
  loginUrl: '/auth/login',
  loginRedirectUrl: '/dashboard',
  logoutUrl: '/auth/logout',
  logoutRedirectUrl: '/auth/login',
  apiAuthPrefix: '/api/auth',
  sessionTimeout: DEFAULT_SESSION_TIMEOUT_CONFIG,
  loginPath: '/auth/login',
  homePath: '/',
  mfaPath: '/auth/mfa',
  resetPasswordPath: '/auth/reset-password',
  verifyEmailPath: '/auth/verify-email',
  accountSelectionPath: '/auth/account-selection',
};

/**
 * Merge custom config with default config
 *
 * @param config - Partial auth configuration to merge with defaults
 * @returns Complete auth configuration
 * @throws Error if loginUrl or logoutUrl are not provided
 *
 * @remarks
 * This function ensures that the consuming application provides the required
 * loginUrl and logoutUrl configurations. These URLs control where users are
 * redirected during the authentication flow and must be explicitly set by
 * the consuming application.
 */
export function mergeAuthConfig(config?: Partial<AuthConfig>): AuthConfig {
  if (!config?.loginUrl || !config?.logoutUrl) {
    throw new Error('loginUrl and logoutUrl must be provided in auth config');
  }

  return {
    ...defaultAuthConfig,
    ...config,
  };
}

/**
 * Get environment-specific JWT expiry time
 *
 * @returns JWT expiry time in seconds
 * @default 1800 (30 minutes)
 *
 * @remarks
 * Checks for JWT expiry time in the following order:
 * 1. JWT_SESSION_EXPIRY_SECONDS environment variable
 * 2. NEXT_PUBLIC_JWT_SESSION_EXPIRY_SECONDS environment variable
 * 3. Falls back to default of 1800 seconds (30 minutes)
 */
export function getJwtExpiry(): number {
  return parseInt(
    process.env.JWT_SESSION_EXPIRY_SECONDS ||
      process.env.NEXT_PUBLIC_JWT_SESSION_EXPIRY_SECONDS ||
      '1800',
  );
}

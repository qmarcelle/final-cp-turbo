/**
 * Authentication routes configuration
 */

/**
 * Authentication route paths
 */
export const AUTH_ROUTES = {
  // Authentication paths
  LOGIN: '/login',
  LOGOUT: '/logout',
  REGISTER: '/register',
  MFA: '/mfa',
  ACCOUNT_SELECTION: '/account-selection',
  MFA_SETUP: '/mfa-setup',
  SECURITY_SETTINGS: '/security-settings',

  // Password management
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  CHANGE_PASSWORD: '/change-password',

  // Email verification
  VERIFY_EMAIL: '/verify-email',

  // SSO
  SSO_CALLBACK: '/auth/sso/callback',

  // API endpoints
  API: {
    LOGIN: '/api/auth/login',
    LOGOUT: '/api/auth/logout',
    SESSION: '/api/auth/session',
    REGISTER: '/api/auth/register',
    MFA: '/api/auth/mfa',
    MFA_METHODS: '/api/auth/mfa/methods',
    VERIFY_EMAIL: '/api/auth/verify-email',
    RESET_PASSWORD: '/api/auth/reset-password',
    CHANGE_PASSWORD: '/api/auth/change-password',
    SSO: '/api/auth/sso',
  },
};

/**
 * Default authentication configuration
 */
export const DEFAULT_AUTH_CONFIG = {
  // Redirect paths
  loginRedirectPath: '/',
  logoutRedirectPath: '/login',

  // Session settings
  sessionMaxAge: 30 * 60, // 30 minutes in seconds
  sessionRefreshWindow: 5 * 60, // 5 minutes in seconds

  // MFA settings
  mfaEnabled: true,
  mfaRememberDuration: 30, // 30 days

  // Password policy
  passwordMinLength: 8,
  passwordRequireUppercase: true,
  passwordRequireLowercase: true,
  passwordRequireNumber: true,
  passwordRequireSpecial: true,

  // Email verification
  emailVerificationRequired: true,
  emailVerificationExpiry: 24 * 60 * 60, // 24 hours in seconds

  // Password reset
  passwordResetExpiry: 1 * 60 * 60, // 1 hour in seconds
};

/**
 * Check if a route is a protected route
 * @param route Route to check
 * @param protectedRoutes List of protected routes
 * @returns True if the route is protected
 */
export function isProtectedRoute(
  route: string,
  protectedRoutes: string[] = [],
): boolean {
  // Default protected route patterns
  const defaultProtectedPatterns = [
    /^\/account\//,
    /^\/settings\//,
    /^\/profile\//,
    /^\/dashboard\//,
  ];

  // Check against specific protected routes
  if (protectedRoutes.some((r) => route === r || route.startsWith(r))) {
    return true;
  }

  // Check against default protected patterns
  return defaultProtectedPatterns.some((pattern) => pattern.test(route));
}

/**
 * Check if a route is an auth route
 * @param route Route to check
 * @returns True if the route is an auth route
 */
export function isAuthRoute(route: string): boolean {
  const authRoutes = Object.values(AUTH_ROUTES).filter(
    (r) => typeof r === 'string',
  );
  return authRoutes.includes(route);
}

/**
 * Get the redirect URL after login
 * @param returnUrl Requested return URL
 * @param defaultUrl Default URL to redirect to
 * @param allowedUrls List of allowed redirect URLs
 * @returns Safe redirect URL
 */
export function getSafeRedirectUrl(
  returnUrl: string | null | undefined,
  defaultUrl = '/',
  allowedUrls: string[] = [],
): string {
  if (!returnUrl) {
    return defaultUrl;
  }

  try {
    // Check if it's a relative URL (starts with /)
    if (returnUrl.startsWith('/')) {
      // Don't allow redirects to auth routes
      if (isAuthRoute(returnUrl)) {
        return defaultUrl;
      }
      return returnUrl;
    }

    // For absolute URLs, check against allowed domains
    const url = new URL(returnUrl);
    const isSafeUrl = allowedUrls.some((allowed) => {
      try {
        const allowedUrl = new URL(allowed);
        return url.origin === allowedUrl.origin;
      } catch {
        return false;
      }
    });

    return isSafeUrl ? returnUrl : defaultUrl;
  } catch {
    // Invalid URL, return the default
    return defaultUrl;
  }
}

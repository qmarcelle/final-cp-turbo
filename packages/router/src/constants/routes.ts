/**
 * Application route constants with categorization
 * All routes are defined without base paths - these will be added at runtime
 * based on the application's configuration
 */
export const ROUTES = {
  // Public routes that don't require authentication
  PUBLIC: {
    HOME: '/',
    LOGIN: '/login',
    REGISTER: '/register',
    FORGOT_PASSWORD: '/forgot-password',
    RESET_PASSWORD: '/reset-password',
    TERMS: '/terms',
    PRIVACY: '/privacy',
    HELP: '/help',
    CONTACT: '/contact',
    ABOUT: '/about',
  },
  
  // Authenticated routes that require user login
  AUTH: {
    DASHBOARD: '/(authenticated)/dashboard',
    CLAIMS: '/(authenticated)/claims',
    CLAIM_DETAILS: '/(authenticated)/claims/:claimId',
    BENEFITS: '/(authenticated)/benefits',
    BENEFIT_DETAILS: '/(authenticated)/benefits/:benefitId',
    PROFILE: '/(authenticated)/profile',
    SETTINGS: '/(authenticated)/settings',
    DOCUMENTS: '/(authenticated)/documents',
    DOCUMENT_DETAILS: '/(authenticated)/documents/:documentId',
    MESSAGES: '/(authenticated)/messages',
    MESSAGE_DETAILS: '/(authenticated)/messages/:messageId',
  },
  
  // API routes
  API: {
    AUTH: '/api/auth',
    USER: '/api/user',
    CLAIMS: '/api/claims',
    BENEFITS: '/api/benefits',
    DOCUMENTS: '/api/documents',
    MESSAGES: '/api/messages',
    FORMS: '/api/forms',
  },
  
  // Admin routes (if applicable)
  ADMIN: {
    DASHBOARD: '/admin/dashboard',
    USERS: '/admin/users',
    USER_DETAILS: '/admin/users/:userId',
    SETTINGS: '/admin/settings',
  },
} as const;

/**
 * Extract route parameters from a path string
 * This type utility extracts parameter names from routes with :param syntax
 */
export type ExtractRouteParams<T extends string> = 
  T extends `${string}:${infer Param}/${infer Rest}`
    ? { [K in Param]: string } & ExtractRouteParams<Rest>
    : T extends `${string}:${infer Param}`
      ? { [K in Param]: string }
      : {};

/**
 * Get all route paths as a union type
 */
export type RoutePath = typeof ROUTES[keyof typeof ROUTES][keyof typeof ROUTES[keyof typeof ROUTES]];

/**
 * Type-safe route parameters
 * Maps route paths to their expected parameter types
 */
export type RouteParams = {
  [K in RoutePath as K extends string ? K : never]: 
    K extends string ? ExtractRouteParams<K> : never;
};

/**
 * Type guard to check if a route has parameters
 */
export function hasRouteParams(route: string): route is keyof RouteParams {
  return route.includes(':');
}

/**
 * Flatten a nested route object for easier lookups
 */
export const FLAT_ROUTES: Record<string, string> = Object.entries(ROUTES).reduce(
  (acc, [category, routes]) => {
    Object.entries(routes).forEach(([name, path]) => {
      acc[`${category}.${name}`] = path as string;
    });
    return acc;
  },
  {} as Record<string, string>
); 
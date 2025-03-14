/**
 * Example of how to integrate @cp/router with Auth.js v5
 * This is a reference implementation, not part of the package exports
 */

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@cp/auth'; // Assuming you have an auth package
import { RouteMiddlewareOptions } from '../middleware';
import { ROUTES } from '../constants/routes';
import { getBasePath } from '../utils/urlHelpers';

/**
 * Create an Auth.js integrated route middleware
 */
export function createAuthRouteMiddleware(options: RouteMiddlewareOptions = {}) {
  const config = {
    publicRoutes: Object.values(ROUTES.PUBLIC),
    loginRoute: ROUTES.PUBLIC.LOGIN,
    homeRoute: ROUTES.AUTH.DASHBOARD,
    apiPrefix: '/api',
    ...options
  };
  
  // Return middleware function that uses Auth.js
  return auth((request: NextRequest) => {
    const { auth } = request;
    const { pathname } = request.nextUrl;
    const basePath = options.basePath || getBasePath();
    
    // Remove base path for route matching
    const pathWithoutBase = pathname.replace(new RegExp(`^${basePath}`), '');
    
    // Always allow public routes
    if (config.publicRoutes?.some(route => 
      pathWithoutBase === route || 
      (route.endsWith('*') && pathWithoutBase.startsWith(route.slice(0, -1)))
    )) {
      return NextResponse.next();
    }
    
    // If not authenticated and not on a public route, redirect to login
    if (!auth?.user && !pathWithoutBase.startsWith(config.loginRoute as string)) {
      const loginUrl = basePath 
        ? `${basePath}${config.loginRoute}` 
        : config.loginRoute;
      
      const url = new URL(loginUrl, request.url);
      url.searchParams.set('callbackUrl', encodeURI(request.url));
      return NextResponse.redirect(url);
    }
    
    // If authenticated and on login page, redirect to home
    if (auth?.user && pathWithoutBase === config.loginRoute) {
      const homeUrl = basePath 
        ? `${basePath}${config.homeRoute}` 
        : config.homeRoute;
      
      return NextResponse.redirect(new URL(homeUrl, request.url));
    }
    
    // Allow the request to proceed
    return NextResponse.next();
  });
}

/**
 * Configure auth middleware matcher
 */
export const authConfig = {
  matcher: [
    // Match all routes except static files and API routes that handle their own auth
    '/((?!_next/static|_next/image|favicon.ico|api/auth|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};

/**
 * Example usage in middleware.ts:
 * 
 * ```typescript
 * import { createAuthRouteMiddleware, authConfig } from '@cp/router/examples/authjs-integration';
 * 
 * export default createAuthRouteMiddleware({
 *   // Override options if needed
 *   basePath: process.env.NEXT_PUBLIC_BASE_PATH,
 * });
 * 
 * export const config = authConfig;
 * ```
 */ 
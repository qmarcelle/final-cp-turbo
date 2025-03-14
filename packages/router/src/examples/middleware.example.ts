/**
 * Example middleware.ts file showing how to use @cp/router with Auth.js
 * This would typically be placed at the root of your Next.js application
 */

import type { NextRequest } from 'next/server';
import { ROUTES, removeBasePath, getBasePath } from '../';

/**
 * Auth middleware function enhanced with base path support
 */
const authMiddleware = async (request: NextRequest) => {
  // Dynamic import Auth.js and Next.js
  const { auth } = await import('@cp/auth');
  const { NextResponse } = await import('next/server');
  
  // Return middleware function that uses Auth.js
  return auth((request: NextRequest) => {
    // @ts-ignore - Auth.js attaches auth to the request
    const { auth } = request;
    const { pathname } = request.nextUrl;
    const basePath = getBasePath();
    
    // Remove base path for route matching
    const pathWithoutBase = removeBasePath(pathname);
    
    // Public routes that don't require authentication
    const publicRoutes = [
      ROUTES.PUBLIC.HOME,
      ROUTES.PUBLIC.LOGIN,
      ROUTES.PUBLIC.REGISTER,
      ROUTES.PUBLIC.FORGOT_PASSWORD,
      ROUTES.PUBLIC.RESET_PASSWORD,
      ROUTES.PUBLIC.TERMS,
      ROUTES.PUBLIC.PRIVACY,
      '/api/auth', // Auth.js routes
    ];
    
    // Check if route is public
    const isPublicRoute = publicRoutes.some(route => 
      pathWithoutBase === route || 
      (route.endsWith('*') && pathWithoutBase.startsWith(route.slice(0, -1)))
    );
    
    // Handle API routes
    const isApiRoute = pathWithoutBase.startsWith('/api');
    
    // If not authenticated and not on a public route
    if (!auth?.user && !isPublicRoute) {
      // For API routes, return 401
      if (isApiRoute) {
        return NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401, headers: { 'Content-Type': 'application/json' } }
        );
      }
      
      // For regular routes, redirect to login
      const loginUrl = basePath 
        ? `${basePath}${ROUTES.PUBLIC.LOGIN}` 
        : ROUTES.PUBLIC.LOGIN;
      
      const url = new URL(loginUrl, request.url);
      url.searchParams.set('callbackUrl', encodeURI(request.url));
      return NextResponse.redirect(url);
    }
    
    // If authenticated and on login page, redirect to dashboard
    if (auth?.user && pathWithoutBase === ROUTES.PUBLIC.LOGIN) {
      const dashboardUrl = basePath 
        ? `${basePath}${ROUTES.AUTH.DASHBOARD}` 
        : ROUTES.AUTH.DASHBOARD;
      
      return NextResponse.redirect(new URL(dashboardUrl, request.url));
    }
    
    // Allow the request to proceed
    return NextResponse.next();
  });
};

export default authMiddleware;

/**
 * Matcher configuration to control which routes use the middleware
 */
export const config = {
  matcher: [
    // Match all routes except static files
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}; 
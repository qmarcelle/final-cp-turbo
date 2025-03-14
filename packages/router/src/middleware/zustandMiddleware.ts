import type { NextRequest, NextResponse } from 'next/server';
import { ROUTES } from '../constants/routes';
import { getBasePath, removeBasePath } from '../utils/urlHelpers';
import { useAuthStore } from '../store/authStore';

/**
 * Options for configuring enhanced route middleware
 */
export interface EnhancedRouteMiddlewareOptions {
  publicRoutes?: string[];
  loginRoute?: string;
  homeRoute?: string;
  apiPrefix?: string;
  basePath?: string;
  requiredPermissions?: Record<string, string[]>;
  requiredRoles?: Record<string, string[]>;
}

/**
 * Default middleware options
 */
const defaultOptions: EnhancedRouteMiddlewareOptions = {
  publicRoutes: Object.values(ROUTES.PUBLIC),
  loginRoute: ROUTES.PUBLIC.LOGIN,
  homeRoute: ROUTES.AUTH.DASHBOARD,
  apiPrefix: '/api',
  requiredPermissions: {},
  requiredRoles: {},
};

/**
 * Create a middleware that uses Zustand auth state for route protection
 * 
 * This middleware provides:
 * - Basic auth protection
 * - Role-based access control
 * - Permission-based access control
 * - Different handling for API routes
 */
export function createZustandRouteMiddleware(options: EnhancedRouteMiddlewareOptions = {}) {
  const config = { ...defaultOptions, ...options };
  
  return async function middleware(request: NextRequest) {
    // Dynamic import NextResponse
    const { NextResponse } = await import('next/server');
    
    const basePath = config.basePath || getBasePath();
    const { pathname } = request.nextUrl;
    
    // Remove base path for route matching
    const pathWithoutBase = removeBasePath(pathname);
    
    // Always allow public routes
    if (config.publicRoutes?.some(route => 
      pathWithoutBase === route || 
      (route.endsWith('*') && pathWithoutBase.startsWith(route.slice(0, -1)))
    )) {
      return NextResponse.next();
    }
    
    // Handle API routes differently
    const isApiRoute = pathWithoutBase.startsWith(config.apiPrefix as string);
    
    // Get auth state from the store
    const { isAuthenticated, hasPermission, hasRole } = useAuthStore.getState();
    
    // Check authentication
    if (!isAuthenticated) {
      if (isApiRoute) {
        return NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401, headers: { 'Content-Type': 'application/json' } }
        );
      }
      
      // Redirect to login for regular routes
      const loginUrl = basePath 
        ? `${basePath}${config.loginRoute}` 
        : config.loginRoute as string;
      
      const url = new URL(loginUrl, request.url);
      url.searchParams.set('callbackUrl', encodeURI(request.url));
      return NextResponse.redirect(url);
    }
    
    // Check permissions for specific routes
    const requiredPermissions = Object.entries(config.requiredPermissions || {})
      .find(([route]) => pathWithoutBase.startsWith(route))?.[1];
      
    if (requiredPermissions?.length) {
      const hasRequiredPermission = requiredPermissions.some(permission => 
        hasPermission(permission)
      );
      
      if (!hasRequiredPermission) {
        if (isApiRoute) {
          return NextResponse.json(
            { error: 'Forbidden - Insufficient permissions' },
            { status: 403, headers: { 'Content-Type': 'application/json' } }
          );
        }
        
        // Redirect to home or access denied page
        const homeUrl = basePath
          ? `${basePath}${config.homeRoute}`
          : config.homeRoute as string;
          
        return NextResponse.redirect(new URL(homeUrl, request.url));
      }
    }
    
    // Check roles for specific routes
    const requiredRoles = Object.entries(config.requiredRoles || {})
      .find(([route]) => pathWithoutBase.startsWith(route))?.[1];
      
    if (requiredRoles?.length) {
      const hasRequiredRole = requiredRoles.some(role => 
        hasRole(role)
      );
      
      if (!hasRequiredRole) {
        if (isApiRoute) {
          return NextResponse.json(
            { error: 'Forbidden - Insufficient role' },
            { status: 403, headers: { 'Content-Type': 'application/json' } }
          );
        }
        
        // Redirect to home or access denied page
        const homeUrl = basePath
          ? `${basePath}${config.homeRoute}`
          : config.homeRoute as string;
          
        return NextResponse.redirect(new URL(homeUrl, request.url));
      }
    }
    
    // User is authenticated and has required permissions/roles - proceed
    return NextResponse.next();
  };
}

/**
 * Helper to create middleware configuration for Next.js
 */
export function enhancedRouteConfig() {
  return {
    matcher: [
      // Match all routes except public routes and static files
      '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
  };
} 
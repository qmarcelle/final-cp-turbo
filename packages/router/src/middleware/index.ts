import { NextRequest, NextResponse } from 'next/server';
import { ROUTES } from '../constants/routes';
import { getBasePath, removeBasePath } from '../utils/urlHelpers';
import { getRouterLogger, RouterEventType, LogLevel } from '../logging';

/**
 * Options for route middleware
 */
export interface RouteMiddlewareOptions {
  /**
   * Whether to protect all routes by default
   * @default true
   */
  protectByDefault?: boolean;
  
  /**
   * Routes that should be public (if protect by default is true)
   */
  publicRoutes?: string[];
  
  /**
   * Routes that should be protected (if protect by default is false)
   */
  protectedRoutes?: string[];
  
  /**
   * Route to redirect to for unauthenticated users
   * @default '/login'
   */
  loginRoute?: string;
  
  /**
   * Custom authorization function
   */
  authorize?: (req: NextRequest) => Promise<boolean> | boolean;
  
  /**
   * Enable detailed logging
   * @default true
   */
  enableLogging?: boolean;
  
  homeRoute?: string;       // Route to redirect to after successful login
  apiPrefix?: string;       // Prefix for API routes
  basePath?: string;        // Optional base path
}

/**
 * Default options for route middleware
 */
const defaultOptions: RouteMiddlewareOptions = {
  protectByDefault: true,
  publicRoutes: ['/login', '/register', '/forgot-password', '/reset-password'],
  loginRoute: '/login',
  homeRoute: ROUTES.AUTH.DASHBOARD,
  apiPrefix: '/api',
  enableLogging: true,
};

/**
 * Create middleware for route protection
 */
export function createRouteMiddleware(options: RouteMiddlewareOptions = {}) {
  const mergedOptions = { ...defaultOptions, ...options };
  const {
    protectByDefault,
    publicRoutes = [],
    protectedRoutes = [],
    loginRoute = '/login', // Ensure loginRoute is never undefined
    authorize,
    enableLogging,
    homeRoute,
    apiPrefix,
    basePath,
  } = mergedOptions;
  
  // Get logger instance if logging is enabled
  const logger = enableLogging ? getRouterLogger() : null;
  
  return async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const startTime = performance.now();
    
    // Log middleware execution if enabled
    logger?.logMiddleware('start', pathname, 'processing');
    
    // Determine if the route should be protected
    let shouldProtect = protectByDefault;
    
    if (protectByDefault) {
      // If protecting by default, check if the route is in the public list
      shouldProtect = !publicRoutes.some(route => pathname.startsWith(route));
    } else {
      // If not protecting by default, check if the route is in the protected list
      shouldProtect = protectedRoutes.some(route => pathname.startsWith(route));
    }
    
    // Early return for unprotected routes
    if (!shouldProtect) {
      const endTime = performance.now();
      logger?.logMiddleware('public_route', pathname, 'allowed');
      
      // Log performance metrics if enabled
      if (logger && enableLogging) {
        logger.logEvent({
          type: RouterEventType.MIDDLEWARE,
          action: 'public_route_processed',
          data: {
            path: pathname,
            result: 'allowed',
            publicRoutes,
            protectedRoutes,
          },
          timestamp: Date.now(),
          duration: endTime - startTime,
        });
      }
      
      return NextResponse.next();
    }
    
    try {
      // Check authorization (if custom function provided)
      let isAuthorized = true;
      
      if (authorize) {
        // Execute custom authorization logic
        isAuthorized = await Promise.resolve(authorize(request));
        
        // Log authorization result
        logger?.logAuth('middleware_authorization', isAuthorized, {
          path: pathname,
        });
      } else {
        // Default authorization - check for auth token/cookie
        // This is a simplified example - replace with your actual auth check
        const token = request.cookies.get('auth-token');
        isAuthorized = !!token;
        
        // Log default authorization
        logger?.logAuth('middleware_token_check', isAuthorized, {
          path: pathname,
          hasToken: !!token,
        });
      }
      
      // If not authorized, redirect to login
      if (!isAuthorized) {
        const loginUrl = new URL(loginRoute, request.url);
        
        // Add return URL as a query parameter (for post-login redirect)
        loginUrl.searchParams.set('returnUrl', pathname);
        
        const endTime = performance.now();
        
        // Log unauthorized redirect
        logger?.logMiddleware('protected_route', pathname, 'unauthorized');
        
        // Log detailed metrics
        if (logger && enableLogging) {
          logger.logEvent({
            type: RouterEventType.MIDDLEWARE,
            action: 'unauthorized_redirect',
            data: {
              path: pathname,
              redirectTo: loginUrl.toString(),
            },
            timestamp: Date.now(),
            duration: endTime - startTime,
          });
        }
        
        return NextResponse.redirect(loginUrl);
      }
      
      // User is authorized
      const endTime = performance.now();
      
      // Log successful authorization
      logger?.logMiddleware('protected_route', pathname, 'authorized');
      
      // Log detailed metrics
      if (logger && enableLogging) {
        logger.logEvent({
          type: RouterEventType.MIDDLEWARE,
          action: 'authorized_access',
          data: {
            path: pathname,
          },
          timestamp: Date.now(),
          duration: endTime - startTime,
        });
      }
      
      return NextResponse.next();
    } catch (error) {
      // Log error
      logger?.logMiddleware('error', pathname, 'error');
      logger?.logEvent({
        type: RouterEventType.ERROR,
        action: 'middleware_error',
        data: {
          path: pathname,
        },
        timestamp: Date.now(),
        error,
      }, LogLevel.ERROR);
      
      // Redirect to login on error (fail-safe approach)
      const loginUrl = new URL(loginRoute, request.url);
      return NextResponse.redirect(loginUrl);
    }
  };
}

/**
 * Helper for NextJS middleware config
 */
export function routeConfig() {
  return {
    matcher: [
      // Match all paths except static files, api routes, and _next
      '/((?!_next/|_vercel|api/|static/|public/|favicon.ico|robots.txt).*)',
    ],
  };
} 
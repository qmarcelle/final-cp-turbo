import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

/**
 * Authentication middleware for Next.js applications
 * Handles route protection and redirects for authenticated/unauthenticated users
 */

export interface AuthMiddlewareOptions {
  publicRoutes?: string[];  // Routes that don't require authentication
  loginRoute?: string;      // Route to redirect to for login
  homeRoute?: string;       // Route to redirect to after successful login
  apiPrefix?: string;       // Prefix for API routes
}

const defaultOptions: AuthMiddlewareOptions = {
  publicRoutes: ['/', '/login', '/register', '/forgot-password', '/reset-password', '/api/auth'],
  loginRoute: '/login',
  homeRoute: '/dashboard',
  apiPrefix: '/api',
};

// Environment variable for JWT secret - should be set in deployment environment
const JWT_SECRET = process.env.JWT_SECRET || 'your-development-secret';

/**
 * Factory function to create a configured auth middleware
 */
export function createAuthMiddleware(options: AuthMiddlewareOptions = {}) {
  const config = { ...defaultOptions, ...options };
  
  return async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    
    // Always allow public routes
    if (config.publicRoutes?.some(route => 
      pathname === route || 
      (route.endsWith('*') && pathname.startsWith(route.slice(0, -1)))
    )) {
      return NextResponse.next();
    }
    
    // Handle API routes differently (return 401 instead of redirect)
    const isApiRoute = pathname.startsWith(config.apiPrefix as string);
    
    // Get token from cookies or Authorization header
    const token = request.cookies.get('auth_token')?.value || 
                 request.headers.get('Authorization')?.split(' ')[1];
    
    if (!token) {
      // For API routes, return 401
      if (isApiRoute) {
        return new NextResponse(
          JSON.stringify({ error: 'Unauthorized' }),
          { status: 401, headers: { 'Content-Type': 'application/json' } }
        );
      }
      
      // For normal routes, redirect to login
      const url = new URL(config.loginRoute as string, request.url);
      url.searchParams.set('callbackUrl', encodeURI(request.url));
      return NextResponse.redirect(url);
    }
    
    try {
      // Verify the token
      const secretKey = new TextEncoder().encode(JWT_SECRET);
      const { payload } = await jwtVerify(token, secretKey);
      
      // Check if token is expired
      const isExpired = payload.exp && payload.exp * 1000 < Date.now();
      
      if (isExpired) {
        throw new Error('Token expired');
      }
      
      // If we're on the login page and already authenticated, redirect to home
      if (pathname === config.loginRoute) {
        return NextResponse.redirect(new URL(config.homeRoute as string, request.url));
      }
      
      // Token is valid, proceed to the requested page
      return NextResponse.next();
    } catch (error) {
      // Token is invalid or expired
      // For API routes, return 401
      if (isApiRoute) {
        return new NextResponse(
          JSON.stringify({ error: 'Unauthorized', details: (error as Error).message }),
          { status: 401, headers: { 'Content-Type': 'application/json' } }
        );
      }
      
      // For normal routes, clear the token cookie and redirect to login
      const response = NextResponse.redirect(
        new URL(config.loginRoute as string, request.url)
      );
      
      response.cookies.delete('auth_token');
      return response;
    }
  };
}

/**
 * Helper to create middleware configuration for Next.js
 */
export function authConfig(options: AuthMiddlewareOptions = {}) {
  const config = { ...defaultOptions, ...options };
  
  return {
    matcher: [
      // Match all routes except public routes and static files
      '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
  };
}

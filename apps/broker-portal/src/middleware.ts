import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from './auth';

/**
 * Authentication middleware for broker portal access
 * Integrates with AuthJS for JWT-based authentication
 * 
 * @todo Replace with auth() from @portals/auth when AuthJS integration is complete
 * @see https://authjs.dev/reference/nextjs/middleware
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get the session using AuthJS
  const session = await auth();

  // Define route types (relative paths since basePath is handled by Next.js)
  const isRoot = pathname === '/';
  
  // Protected routes based on the (protected) route group structure
  const protectedRoutes = [
    '/dashboard',
    '/broker',
    '/sales',
    '/member-support', 
    '/reporting',
    '/materials-library',
    '/learning',
    '/inbox',
    '/profile',
    '/search',
    '/support'
  ];
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  
  // Handle root path
  if (isRoot) {
    if (!session) {
      // Unauthenticated users go to login
      return NextResponse.redirect(new URL('/login', request.url));
    }
    // Authenticated users can see the welcome page at root
    // No redirect needed - let the page render
  }
  
  // Protect routes that require authentication
  if (isProtectedRoute && !session) {
    // Log unauthorized access attempts for security monitoring
    if (process.env.NODE_ENV !== 'development') {
      console.log(`[Auth] Unauthorized access attempt to ${pathname}, redirecting to login`);
    }
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

/**
 * Configure which routes this middleware should run on
 * 
 * When AuthJS is integrated, the matcher configuration will be:
 * export const config = { matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"] }
 * 
 * @see https://authjs.dev/reference/nextjs/middleware
 */
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}; 
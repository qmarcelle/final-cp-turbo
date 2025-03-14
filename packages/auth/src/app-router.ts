/**
 * Auth.js (NextAuth) v5 App Router integration examples
 * 
 * This file provides examples for how to use the shared auth package
 * with Next.js 14+ and the App Router. These patterns are based on the
 * latest Auth.js (NextAuth) v5 recommendations.
 */

import { createNextAuthConfig } from './next-auth-setup';

/**
 * Example for setting up auth.ts in the app directory (app/auth.ts)
 * 
 * This file would be used to configure Auth.js (NextAuth) v5 in your application
 */
/* 
import NextAuth from 'next-auth';
import { createNextAuthConfig } from '@cp/auth';

// Configure your auth providers with the shared auth package
const authConfig = createNextAuthConfig({
  baseUrl: process.env.NEXTAUTH_URL,
  enableOAuth: true,
});

// Export the Auth.js handlers
export const { 
  handlers: { GET, POST },
  auth, 
  signIn, 
  signOut,
} = NextAuth(authConfig);
*/

/**
 * Example for setting up route.ts for Auth.js in app directory
 * (app/api/auth/[...nextauth]/route.ts)
 */
/*
import { GET, POST } from '../../../auth';

// Export the handlers
export { GET, POST };
*/

/**
 * Example for protecting a server component with Auth.js v5
 * This would go in a server component file
 */
/*
import { auth } from '../auth';
import { redirect } from 'next/navigation';

export default async function ProtectedPage() {
  const session = await auth();
  
  // If there's no session, the user is not authenticated
  if (!session) {
    redirect('/auth/login');
  }
  
  return (
    <div>
      <h1>Protected Page</h1>
      <p>Welcome, {session.user?.name}</p>
      <p>Role: {session.user?.role}</p>
    </div>
  );
}
*/

/**
 * Example for using middleware with Auth.js v5
 * This would go in the middleware.ts file at your project root
 */
/*
import { NextResponse } from 'next/server';
import { auth } from './auth';

export default auth((req) => {
  // req.auth contains the session
  const isAuthenticated = !!req.auth;
  
  // Define your public paths
  const publicPaths = [
    '/',
    '/auth/login',
    '/auth/register',
    '/api/auth',
  ];
  
  // Get current path
  const { pathname } = req.nextUrl;
  
  // Check if the path is public
  const isPublicPath = publicPaths.some(path => 
    pathname === path || pathname.startsWith(`${path}/`)
  );
  
  // If the path is not public and user is not authenticated, redirect to login
  if (!isAuthenticated && !isPublicPath) {
    const redirectUrl = new URL('/auth/login', req.url);
    redirectUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(redirectUrl);
  }
  
  return NextResponse.next();
});

// Specify which routes the middleware should run on
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
*/

/**
 * Example for using Auth.js v5 in a client component
 * This would go in a client component file in your app
 */
/*
'use client';

import { useSession, signIn, signOut } from 'next-auth/react';

export function AuthStatus() {
  const { data: session, status } = useSession();
  
  if (status === 'loading') {
    return <div>Loading...</div>;
  }
  
  if (status === 'unauthenticated') {
    return (
      <button onClick={() => signIn()}>
        Sign In
      </button>
    );
  }
  
  return (
    <div>
      <p>Signed in as {session?.user?.email}</p>
      <button onClick={() => signOut()}>
        Sign Out
      </button>
    </div>
  );
}
*/ 
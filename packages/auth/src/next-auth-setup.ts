/**
 * This file provides a reference implementation for setting up NextAuth in a Next.js application.
 * It should be used as a guide for implementing authentication in your app.
 */

import { createAuthConfig } from './core';
import { createCredentialsProvider } from './providers';

/**
 * Configuration options for the NextAuth setup
 */
export interface NextAuthSetupOptions {
  /** Base URL for the application, defaults to NEXTAUTH_URL env variable */
  baseUrl?: string;
  /** Whether to enable Credentials provider, defaults to true */
  enableCredentials?: boolean;
  /** Array of custom providers to include */
  customProviders?: any[];
  /** Custom pages configuration */
  pages?: {
    signIn?: string;
    signOut?: string;
    error?: string;
  };
  /** Secret for JWT encryption, defaults to NEXTAUTH_SECRET env variable */
  secret?: string;
}

/**
 * Example of how to create a NextAuth configuration for a Next.js application.
 * 
 * In your Next.js app, you would typically use this in:
 * - app/api/auth/[...nextauth]/route.ts (App Router)
 * - pages/api/auth/[...nextauth].ts (Pages Router)
 */
export function createNextAuthConfig(options?: NextAuthSetupOptions) {
  // Validate required environment variables in production
  if (process.env.NODE_ENV === 'production') {
    if (!process.env.NEXTAUTH_URL) {
      console.warn('Warning: NEXTAUTH_URL is not set in production environment');
    }
    if (!process.env.NEXTAUTH_SECRET) {
      console.warn('Warning: NEXTAUTH_SECRET is not set in production environment');
    }
  }

  const baseUrl = options?.baseUrl || process.env.NEXTAUTH_URL || 'http://localhost:3000';
  
  // Set up providers
  const providers = [];
  
  // Add credentials provider if enabled
  if (options?.enableCredentials !== false) {
    providers.push(
      createCredentialsProvider({
        // Configure with your auth endpoint
        authorizationUrl: `${baseUrl}/api/login`,
      })
    );
  }
  
  // Add any custom providers
  if (options?.customProviders) {
    providers.push(...options.customProviders);
  }
  
  // Create the NextAuth configuration
  return createAuthConfig({
    providers,
    pages: options?.pages || {
      signIn: '/auth/login',
      error: '/auth/error',
    },
    secret: options?.secret || process.env.NEXTAUTH_SECRET,
  });
}

/**
 * Example of setting up the auth API route in a Next.js App Router application.
 * 
 * This would go in app/api/auth/[...nextauth]/route.ts
 */
/*
import NextAuth from 'next-auth';
import { createNextAuthConfig } from '@cp/auth';

// This is a modern Next.js App Router API route
const handler = NextAuth(createNextAuthConfig({
  baseUrl: process.env.NEXTAUTH_URL,
  enableOAuth: true,
}));

export { handler as GET, handler as POST };
*/

/**
 * Example of creating a React Server Component that uses the session in the App Router
 * 
 * This would go in a server component file in the app directory
 */
/*
import { getServerSession } from 'next-auth';
import { createNextAuthConfig } from '@cp/auth';
import { redirect } from 'next/navigation';

export default async function MyServerComponent() {
  const authConfig = createNextAuthConfig();
  const session = await getServerSession(authConfig);
  
  if (!session) {
    redirect('/auth/login');
  }
  
  return (
    <div>
      <h1>Welcome {session.user?.name}</h1>
      <p>Your email: {session.user?.email}</p>
    </div>
  );
}
*/

/**
 * Example of setting up the auth API route in a Next.js Pages Router application.
 * 
 * This would go in pages/api/auth/[...nextauth].ts
 */
/*
import NextAuth from 'next-auth';
import { createNextAuthConfig } from '@cp/auth';

export default NextAuth(createNextAuthConfig({
  baseUrl: process.env.NEXTAUTH_URL,
  enableOAuth: true,
}));
*/ 
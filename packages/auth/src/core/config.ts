import type { Session } from 'next-auth';
import type { JWT } from 'next-auth/jwt';
import { type User, type UserRole, type Permission } from './types';

/**
 * Types specific to the auth configuration
 */
export interface NextAuthOptions {
  providers: any[];
  callbacks?: {
    jwt?: (params: { token: JWT; user?: any; account?: any; profile?: any; isNewUser?: boolean }) => Promise<JWT>;
    session?: (params: { session: Session; token: JWT }) => Promise<Session>;
    signIn?: (params: { user: any; account: any; profile?: any; email?: any; credentials?: any }) => Promise<boolean>;
  };
  pages?: {
    signIn?: string;
    signOut?: string;
    error?: string;
    verifyRequest?: string;
    newUser?: string;
  };
  secret?: string;
  debug?: boolean;
  session?: {
    strategy?: 'jwt' | 'database';
    maxAge?: number;
    updateAge?: number;
  };
  cookies?: Record<string, any>;
}

export interface AuthConfig {
  providers: any[]; // Auth providers
  callbacks?: {
    jwt?: (params: { token: JWT; user?: any; account?: any; profile?: any; isNewUser?: boolean }) => Promise<JWT>;
    session?: (params: { session: Session; token: JWT }) => Promise<Session>;
    signIn?: (params: { user: any; account: any; profile?: any; email?: any; credentials?: any }) => Promise<boolean>;
  };
  pages?: {
    signIn?: string;
    signOut?: string;
    error?: string;
    verifyRequest?: string;
    newUser?: string;
  };
  secret?: string;
  debug?: boolean;
  session?: {
    strategy?: 'jwt' | 'database';
    maxAge?: number;
    updateAge?: number;
  };
  cookies?: Record<string, any>;
}

/**
 * Creates a NextAuth configuration object that can be used in the API route
 */
export function createAuthConfig(config: AuthConfig): NextAuthOptions {
  // Default configuration
  const defaultConfig: Partial<NextAuthOptions> = {
    debug: process.env.NODE_ENV === 'development',
    session: {
      strategy: 'jwt',
      maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    cookies: {
      sessionToken: {
        name: `next-auth.session-token`,
        options: {
          httpOnly: true,
          sameSite: 'lax',
          path: '/',
          secure: process.env.NODE_ENV === 'production',
        },
      },
    },
    callbacks: {
      jwt: async ({ token, user }: { token: JWT; user?: any }) => {
        // Initial sign in
        if (user && typeof user === 'object') {
          token.id = user.id;
          token.email = user.email;
          token.name = user.name;
          // Type assertion for custom properties after checking user exists
          if ('role' in user) token.role = user.role as UserRole;
          if ('permissions' in user) token.permissions = user.permissions as Permission[];
          if ('accountInfo' in user) token.accountInfo = user.accountInfo;
        }
        return token;
      },
      session: async ({ session, token }: { session: Session; token: JWT }) => {
        if (token) {
          session.user = {
            id: token.id as string,
            email: token.email as string,
            name: token.name as string,
            role: token.role as UserRole,
            permissions: token.permissions as Permission[],
            accountInfo: token.accountInfo,
          } as User;
        }
        return session;
      },
    },
  };

  // Merge default config with provided config
  return {
    ...defaultConfig,
    ...config,
    callbacks: {
      ...defaultConfig.callbacks,
      ...config.callbacks,
    },
    session: {
      ...defaultConfig.session,
      ...config.session,
    },
    cookies: {
      ...defaultConfig.cookies,
      ...config.cookies,
    },
  };
}
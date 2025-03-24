import { type DefaultJWT } from '@auth/core/jwt';
import { type DefaultSession } from '@auth/core/types';
import { AuthConfig } from './types/auth';
import { SessionTimeoutConfig } from './types/session';
import { PortalUser, SessionUser } from './types/user';

// Extend Auth.js JWT and Session to include our user type
declare module '@auth/core/jwt' {
  interface JWT extends DefaultJWT {
    user?: SessionUser;
  }
}

declare module '@auth/core/types' {
  interface Session extends DefaultSession {
    user: PortalUser;
    userId?: string;
    planId?: string;
  }
}

// Default JWT expiry (30 minutes)
const JWT_EXPIRY: number = parseInt(
  process.env.JWT_SESSION_EXPIRY_SECONDS || '1800',
);

// Define session callback parameter types
export type SessionParams = {
  token: {
    user?: SessionUser;
    sub?: string;
    [key: string]: unknown;
  };
  session: {
    user: PortalUser;
    userId?: string;
    planId?: string;
    [key: string]: unknown;
  };
};

// Define JWT callback parameter types
export type JWTParams = {
  token: {
    user?: SessionUser;
    sub?: string;
    [key: string]: unknown;
  };
  session: {
    userId?: string;
    planId?: string;
    [key: string]: unknown;
  };
  trigger?: 'update' | 'signIn' | 'signOut';
  user?: SessionUser;
};

// Create a basic Auth configuration that can be extended by the consuming application
export const authConfig = {
  callbacks: {
    async session({ token, session }: SessionParams) {
      if (!token.user) {
        throw new Error('No user in token');
      }

      return {
        ...session,
        user: {
          ...session.user,
          ...token.user,
        },
      };
    },
    async jwt({ token, session, trigger, user }: JWTParams) {
      if (trigger === 'update') {
        console.log('JWT Update', session);
        return {
          ...token,
          user: token.user,
        };
      }

      if (user) {
        return {
          ...token,
          user,
        };
      }
      return { ...token, ...session };
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: JWT_EXPIRY,
  },
  jwt: {
    maxAge: JWT_EXPIRY,
  },
  cookies: {
    sessionToken: {
      name: 'authjs.session-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        maxAge: JWT_EXPIRY,
      },
    },
  },
};

/**
 * Default session timeout configuration
 */
const DEFAULT_SESSION_TIMEOUT_CONFIG: SessionTimeoutConfig = {
  enabled: true,
  timeoutMinutes: 30,
  warningMinutes: 5,
};

/**
 * Default authentication configuration
 */
export const DEFAULT_AUTH_CONFIG: AuthConfig = {
  baseUrl: process.env.NEXTAUTH_URL || 'http://localhost:3000',
  loginUrl: '/auth/login',
  loginRedirectUrl: '/dashboard',
  logoutUrl: '/auth/logout',
  logoutRedirectUrl: '/auth/login',
  apiAuthPrefix: '/api/auth',
  sessionTimeout: DEFAULT_SESSION_TIMEOUT_CONFIG,
  loginPath: '/auth/login',
  homePath: '/',
  mfaPath: '/auth/mfa',
  resetPasswordPath: '/auth/reset-password',
  verifyEmailPath: '/auth/verify-email',
  accountSelectionPath: '/auth/account-selection',
};

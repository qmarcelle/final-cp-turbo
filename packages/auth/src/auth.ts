import { type DefaultJWT } from '@auth/core/jwt';
import { BaseAuthToken } from './models/core';
import { PortalUser, Session, SessionUser } from './types/user';

export const SERVER_ACTION_NO_SESSION_ERROR = 'Invalid session';

export enum AuthStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  AUTHENTICATED = 'AUTHENTICATED',
  UNAUTHENTICATED = 'UNAUTHENTICATED',
  ERROR = 'ERROR',
}

// Extend Auth.js JWT to include our user type
declare module '@auth/core/jwt' {
  interface JWT extends DefaultJWT {
    user?: SessionUser;
  }
}

// Define session callback parameter types
export type SessionParams = {
  token: {
    user?: SessionUser;
    sub?: string;
    [key: string]: unknown;
  };
  session: Session;
};

// Define JWT callback parameter types
export type JWTParams = {
  token: {
    user?: SessionUser;
    sub?: string;
    [key: string]: unknown;
  };
  session?: {
    userId?: string;
    planId?: string;
    [key: string]: unknown;
  };
  trigger?: 'update' | 'signIn' | 'signOut';
  user?: SessionUser;
};

// Default JWT expiry (30 minutes)
const JWT_EXPIRY: number = parseInt(
  process.env.JWT_SESSION_EXPIRY_SECONDS || '1800',
);

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
      // Handle session updates
      if (trigger === 'update' && session) {
        return {
          ...token,
          user: session.user,
        };
      }

      // Handle initial sign in
      if (user) {
        return {
          ...token,
          user,
        };
      }

      return token;
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

// These need to be implemented in the consuming application
export const auth = {};
export const signIn = async () => {};
export const signOut = async () => {};
export const unstable_update = async () => {};
export const handlers = { GET: async () => {}, POST: async () => {} };

export interface AuthState {
  token: BaseAuthToken | null;
  session: Session | null;
  status: AuthStatus;
  error: Error | null;
}

export interface AuthToken extends BaseAuthToken {
  user: PortalUser;
  session: Session;
  status: AuthStatus;
}

export interface AuthSession extends Session {
  user: PortalUser;
  status: AuthStatus;
}

import type { Session, User } from 'next-auth';
import { createLogger } from './logger';

interface ExtendedSession extends Session {
  user: User & {
    // Removed impersonation-related fields
  };
}

// Create an Auth.js-specific logger
const authLogger = createLogger({ name: 'auth' });

/**
 * Auth.js event logger for tracking authentication events
 */
export const authEventLogger = {
  signIn: (params: { user: User; account?: any; isNew?: boolean }) => {
    authLogger.info({
      msg: `User signed in: ${params.user.email}`,
      type: 'auth_signin',
      user: {
        id: params.user.id,
        email: params.user.email,
        isNew: params.isNew || false
      },
      accountType: params.account?.provider
    });
  },
  
  signOut: (params: { session: Session }) => {
    authLogger.info({
      msg: `User signed out: ${params.session?.user?.email}`,
      type: 'auth_signout',
      user: {
        id: params.session?.user?.id,
        email: params.session?.user?.email
      }
    });
  },
  
  createUser: (params: { user: User }) => {
    authLogger.info({
      msg: `User created: ${params.user.email}`,
      type: 'auth_user_create',
      user: {
        id: params.user.id,
        email: params.user.email
      }
    });
  },
  
  updateUser: (params: { user: User }) => {
    authLogger.info({
      msg: `User updated: ${params.user.email}`,
      type: 'auth_user_update',
      user: {
        id: params.user.id,
        email: params.user.email
      }
    });
  },
  
  linkAccount: (params: { user: User; account: any }) => {
    authLogger.info({
      msg: `Account linked for user: ${params.user.email}`,
      type: 'auth_account_link',
      user: {
        id: params.user.id,
        email: params.user.email,
      },
      account: {
        provider: params.account.provider
      }
    });
  },
  
  error: (error: Error) => {
    authLogger.error({
      msg: `Authentication error: ${error.message}`,
      type: 'auth_error',
      error: {
        name: error.name,
        message: error.message,
        stack: process.env.NODE_ENV !== 'production' ? error.stack : undefined
      }
    });
  }
};

/**
 * Auth.js logger callbacks
 */
export const authCallbacks = {
  jwt: async ({ token, user, account }: any) => {
    // Log JWT creation for debugging
    if (account && user) {
      authLogger.debug({
        msg: 'JWT created for session',
        type: 'auth_jwt_create',
        user: {
          id: user.id,
          email: user.email
        },
        provider: account.provider
      });
    }
    
    // Return modified token
    return token;
  }
};

/**
 * Get a logger configured with Auth.js session information
 */
export function getSessionLogger(session: Session | null | undefined) {
  const extendedSession = session as ExtendedSession | null | undefined;
  
  if (!extendedSession?.user) {
    return createLogger({ name: 'anonymous' });
  }
  
  // Include user info in the logger
  const loggerOptions = {
    name: 'session',
    user: {
      id: extendedSession.user.id,
      email: extendedSession.user.email
    }
  };
  
  return createLogger(loggerOptions);
} 
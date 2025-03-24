import { DefaultSession } from '@auth/core/types';
import { PortalUser } from './user';

/**
 * AuthSession type extending Auth.js session to include our user type
 */
export interface AuthSession extends DefaultSession {
  user: PortalUser;
}

/**
 * Session timeout configuration
 */
export interface SessionTimeoutConfig {
  enabled: boolean;
  timeoutMinutes: number;
  warningMinutes: number;
}

/**
 * Session state interface for client-side state management
 */
export interface SessionState {
  isAuthenticated: boolean;
  user: PortalUser | null;
  loading: boolean;
  error: string | null;
}

export interface Session {
  user: PortalUser;
  expires: string;
  userId?: string;
  planId?: string;
}

export interface SessionParams {
  session: Session | null;
  token: any;
}

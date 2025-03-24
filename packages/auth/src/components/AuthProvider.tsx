'use client';

import {
  SessionProvider as NextAuthProvider,
  signIn,
  signOut,
  useSession,
} from 'next-auth/react';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { DEFAULT_AUTH_CONFIG } from '../config';
import { AuthConfig } from '../types/auth';
import { SessionState } from '../types/session';
import { PortalUser } from '../types/user';
import { SessionTimeoutDialog } from './SessionTimeoutDialog';
import { SessionTimeoutMonitor } from './SessionTimeoutMonitor';

// Default auth configuration
const defaultConfig: AuthConfig = {
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || '/api',
  loginUrl: '/login',
  loginRedirectUrl: '/dashboard',
  logoutUrl: '/logout',
  logoutRedirectUrl: '/login',
  apiAuthPrefix: '/api/auth',
  sessionTimeout: {
    enabled: true,
    timeoutMinutes: 30,
    warningMinutes: 5,
  },
  mfaEnabled: true,
  loginPath: '/login',
  homePath: '/',
  mfaPath: '/auth/mfa',
  resetPasswordPath: '/auth/reset-password',
  verifyEmailPath: '/auth/verify-email',
  accountSelectionPath: '/auth/account-selection',
};

// Auth context with session state and methods
interface AuthContextType {
  session: SessionState;
  config: AuthConfig;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshSession: () => Promise<void>;
}

// Create auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export interface AuthProviderProps {
  /**
   * Authentication configuration
   */
  config?: Partial<AuthConfig>;

  /**
   * Children components
   */
  children: React.ReactNode;

  /**
   * Custom session timeout dialog component
   */
  customSessionTimeoutDialog?: React.ReactNode;
}

/**
 * Auth provider component
 * Main entry point for auth functionality
 */
export function AuthProvider({
  config: customConfig,
  children,
  customSessionTimeoutDialog,
}: AuthProviderProps) {
  const [enableSessionTimeout, setEnableSessionTimeout] = useState(false);
  const config = {
    ...DEFAULT_AUTH_CONFIG,
    ...customConfig,
  };

  useEffect(() => {
    setEnableSessionTimeout(config.sessionTimeout?.enabled ?? false);
  }, [config.sessionTimeout?.enabled]);

  // Use next-auth session
  const { data: authSession, status } = useSession();

  // Initial session state
  const [session, setSession] = useState<SessionState>({
    isAuthenticated: false,
    user: null,
    loading: true,
    error: null,
  });

  // Update session when next-auth session changes
  useEffect(() => {
    if (status === 'loading') {
      setSession((prev) => ({ ...prev, loading: true }));
      return;
    }

    if (status === 'authenticated' && authSession?.user) {
      setSession({
        isAuthenticated: true,
        user: authSession.user as PortalUser,
        loading: false,
        error: null,
      });
    } else {
      setSession({
        isAuthenticated: false,
        user: null,
        loading: false,
        error: null,
      });
    }
  }, [authSession, status]);

  // Login function
  const login = async (username: string, password: string) => {
    try {
      setSession((prev) => ({ ...prev, loading: true, error: null }));

      // Use next-auth signIn
      const result = await signIn('credentials', {
        username,
        password,
        redirect: false,
      });

      if (result?.error) {
        setSession((prev) => ({
          ...prev,
          loading: false,
          error: result.error || 'Authentication failed',
        }));
      }
      // Session will be updated via the useEffect hook monitoring authSession
    } catch (error) {
      setSession((prev) => ({
        ...prev,
        loading: false,
        error: 'Login failed',
      }));
    }
  };

  // Logout function
  const logout = async () => {
    try {
      // Use next-auth signOut
      await signOut({ redirect: false });

      setSession({
        isAuthenticated: false,
        user: null,
        loading: false,
        error: null,
      });

      // Redirect to login page
      window.location.href = config.logoutRedirectUrl;
    } catch (error) {
      setSession((prev) => ({
        ...prev,
        error: 'Logout failed',
      }));
    }
  };

  // Refresh session function
  const refreshSession = async () => {
    try {
      // This would need to be implemented based on Auth.js v5's session refresh mechanism
      // In v5, you can use the auth API directly
      const response = await fetch('/api/auth/session', {
        method: 'GET',
      });

      const data = await response.json();

      if (data.user) {
        setSession({
          isAuthenticated: true,
          user: data.user as PortalUser,
          loading: false,
          error: null,
        });
      }
    } catch (error) {
      // If refresh fails, log out
      logout();
    }
  };

  // Value for the context provider
  const contextValue: AuthContextType = {
    session,
    config,
    login,
    logout,
    refreshSession,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      <NextAuthProvider
        {...config}
        refetchInterval={5 * 60}
        refetchOnWindowFocus={true}
      >
        {children}
        {enableSessionTimeout && (
          <SessionTimeoutMonitor
            enabled={enableSessionTimeout}
            sessionExpiry={config.sessionTimeout?.timeoutMinutes ?? 30}
            warningTime={config.sessionTimeout?.warningMinutes ?? 5}
          />
        )}
      </NextAuthProvider>
      {customSessionTimeoutDialog && (
        <SessionTimeoutDialog customDialog={customSessionTimeoutDialog} />
      )}
    </AuthContext.Provider>
  );
}

/**
 * Custom hook to use auth context
 * @returns Auth context
 */
export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

'use client'; // This directive is important for hooks using context

import React, { createContext, useContext, useMemo, PropsWithChildren } from 'react';
import { useSession, SessionContextValue } from 'next-auth/react';
import type { SessionUser } from '@portals/auth/src/userManagement/models/sessionUser'; // Adjust path as needed
import type { VisibilityContextType } from './types'; // Assuming types.ts defines this

const VisibilityContext = createContext<VisibilityContextType | undefined>(undefined);

export const VisibilityProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const { data: session, status }: SessionContextValue = useSession();
  const isLoading = status === 'loading';

  const vRules = useMemo(() => {
    // Ensure session.user and session.user.vRules exist
    const user = session?.user as SessionUser | undefined;
    return user?.vRules || {};
  }, [session, status]);

  const contextValue: VisibilityContextType = {
    vRules,
    isLoading,
    error: session?.error as Error | undefined, // Propagate error if present
  };

  return (
    <VisibilityContext.Provider value={contextValue}>
      {children}
    </VisibilityContext.Provider>
  );
};

export function useVisibility(): VisibilityContextType {
  const context = useContext(VisibilityContext);
  if (context === undefined) {
    throw new Error('useVisibility must be used within a VisibilityProvider');
  }
  return context;
}

export function useFeatureFlag(featureKey: string): boolean {
  const { vRules, isLoading, error } = useVisibility();
  
  if (isLoading) {
    return false; // Don't grant access while loading
  }
  if (error) {
    return false; // Don't grant access if there was an error loading session/rules
  }
  return vRules[featureKey] === true;
}

// Example Guard component as discussed
interface GuardProps extends PropsWithChildren {
  feature: string;
  fallback?: React.ReactNode;
  loadingFallback?: React.ReactNode; // Optional specific fallback for loading state
}

export const Guard: React.FC<GuardProps> = ({ 
  feature, 
  fallback = null, 
  loadingFallback = <p>Loading feature access...</p>, // Default loading fallback
  children 
}) => {
  const { isLoading, error } = useVisibility();
  const isAllowed = useFeatureFlag(feature); // This already handles isLoading internally

  if (isLoading) {
    return <>{loadingFallback}</>; 
  }
  if (error) {
    // If there was an error (e.g. refreshing token, loading rules), deny access or show specific error fallback
    return <>{fallback}</>; 
  }

  return isAllowed ? <>{children}</> : <>{fallback}</>;
}; 
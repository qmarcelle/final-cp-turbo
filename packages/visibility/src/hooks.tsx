'use client' // This directive is important for hooks using context

import React, {
  createContext,
  useContext,
  useMemo,
  PropsWithChildren,
  Context,
} from 'react'
import { useSession, SessionContextValue } from 'next-auth/react'
import type { SessionUser } from '@portals/auth'
import type { VisibilityContextType } from './types' // Assuming types.ts defines this

// Explicitly type VisibilityContext
const VisibilityContext: Context<VisibilityContextType | undefined> =
  createContext<VisibilityContextType | undefined>(undefined)

export const VisibilityProvider: React.FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  const { data: session, status }: SessionContextValue = useSession()
  const isLoading = status === 'loading'

  const vRules = useMemo(() => {
    const user = session?.user as SessionUser | undefined
    return user?.vRules || {}
  }, [session, status])

  // Determine if there's an error state from next-auth session
  // (e.g., 'RefreshAccessTokenError' if token refresh failed)
  const sessionError =
    session?.error === 'RefreshAccessTokenError'
      ? new Error('Session token refresh failed')
      : undefined

  const contextValue: VisibilityContextType = {
    vRules,
    isLoading,
    error: sessionError, // Propagate session error
  }

  return (
    <VisibilityContext.Provider value={contextValue}>
      {children}
    </VisibilityContext.Provider>
  )
}

export function useVisibility(): VisibilityContextType {
  const context = useContext(VisibilityContext)
  if (context === undefined) {
    throw new Error('useVisibility must be used within a VisibilityProvider')
  }
  return context
}

export function useFeatureFlag(featureKey: string): boolean {
  const { vRules, isLoading, error } = useVisibility()

  if (isLoading) {
    // Potentially return a default or throw, depending on desired behavior for loading state
    return false
  }
  if (error) {
    // Handle error state, e.g., log it and deny access
    console.error('Visibility error:', error)
    return false
  }
  return vRules[featureKey] === true
}

// Example Guard component as discussed
interface GuardProps extends PropsWithChildren {
  feature: string
  fallback?: React.ReactNode
  loadingFallback?: React.ReactNode // Optional specific fallback for loading state
}

export const Guard: React.FC<GuardProps> = ({
  feature,
  fallback = null,
  loadingFallback = <p>Loading...</p>,
  children,
}) => {
  const { isLoading, error } = useVisibility() // Get isLoading and error states
  const isAllowed = useFeatureFlag(feature) // This already incorporates isLoading and error logic

  if (isLoading) {
    return <>{loadingFallback}</>
  }

  // If useFeatureFlag already handles the error state by returning false,
  // this specific error check might be redundant unless you want different UI for errors vs. denied.
  // For now, relying on useFeatureFlag's handling.
  // if (error) {
  //   return <>{fallback}</>; // Or a specific error fallback
  // }

  return isAllowed ? <>{children}</> : <>{fallback}</>
}

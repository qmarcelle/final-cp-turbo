// packages/ui/src/components/enhanced/react19-patterns.tsx
'use client'

import * as React from 'react'
import { use, useActionState, useOptimistic } from 'react'

// Utility function for className merging (replace '@/lib/utils')
function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(' ')
}

// =============================================
// 1. React 19 Enhanced Form Pattern
// =============================================

interface FormState {
  success?: boolean
  error?: string
  pending?: boolean
  data?: any
}

interface EnhancedFormProps {
  action: (prevState: FormState, formData: FormData) => Promise<FormState>
  children: React.ReactNode
  className?: string
  optimistic?: boolean
}

/**
 * Enhanced form component using React 19 useActionState
 * Supports optimistic updates and automatic pending states
 */
export const EnhancedForm = ({ 
  action, 
  children, 
  className,
  optimistic = false 
}: EnhancedFormProps) => {
  const [state, formAction, isPending] = useActionState(action, {})
  
  // Optimistic updates for immediate UI feedback
  const [optimisticState, addOptimistic] = useOptimistic(
    state,
    (currentState, optimisticUpdate) => ({
      ...currentState,
      ...optimisticUpdate,
      pending: true
    })
  )

  const handleSubmit = (formData: FormData) => {
    if (optimistic) {
      addOptimistic({ pending: true })
    }
    return formAction(formData)
  }

  return (
    <form 
      action={handleSubmit}
      className={cn('space-y-4', className)}
      aria-busy={isPending}
    >
      {children}
      
      {/* Global form state indicators */}
      {optimisticState.error ? (
        <div className="text-destructive text-sm" role="alert">
          {optimisticState.error}
        </div>
      ) : null}
      
      {optimisticState.success ? (
        <div className="text-green-600 text-sm" role="status">
          Operation completed successfully
        </div>
      ) : null}
      
      {/* Hidden state for debugging */}
      <input 
        type="hidden" 
        name="_formState" 
        value={JSON.stringify(optimisticState)} 
      />
    </form>
  )
}

// =============================================
// 2. Async Component with React 19 'use' Hook
// =============================================

interface AsyncDataProps<T> {
  promise: Promise<T>
  fallback?: React.ReactNode
  children: (data: T) => React.ReactNode
  errorBoundary?: React.ComponentType<{ error: Error; retry: () => void }>
}

/**
 * Component that handles async data using React 19 'use' hook
 * Integrates with Suspense and Error Boundaries
 */
export function AsyncData<T>({ 
  promise, 
  children, 
  fallback,
  errorBoundary: ErrorBoundary 
}: AsyncDataProps<T>) {
  try {
    const data = use(promise)
    return <>{children(data)}</>
  } catch (error) {
    if (ErrorBoundary) {
      return (
        <ErrorBoundary 
          error={error as Error} 
          retry={() => window.location.reload()} 
        />
      )
    }
    throw error // Re-throw for nearest Error Boundary
  }
}

// =============================================
// 3. Enhanced Button with React 19 Features
// =============================================

interface React19ButtonProps 
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Action to perform (can be async) */
  action?: () => Promise<void> | void
  /** Show loading state during async actions */
  showPending?: boolean
  /** Optimistic update while action runs */
  optimisticContent?: React.ReactNode
  /** Custom pending indicator */
  pendingIndicator?: React.ReactNode
}

/**
 * Enhanced button using React 19 patterns
 * Automatically handles pending states for async actions
 */
export const React19Button = React.forwardRef<
  HTMLButtonElement,
  React19ButtonProps
>(({ 
  action,
  showPending = true,
  optimisticContent,
  pendingIndicator,
  children,
  disabled,
  onClick,
  ...props 
}, ref) => {
  const [isPending, startTransition] = React.useTransition()
  const [optimisticChildren, setOptimisticChildren] = useOptimistic(
    children,
    (_current, newChildren) => newChildren
  )

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(e)
    }

    if (action) {
      if (optimisticContent) {
        setOptimisticChildren(optimisticContent)
      }

      startTransition(async () => {
        try {
          await action()
        } catch (error) {
          console.error('Button action failed:', error)
          // Reset optimistic state on error
          if (optimisticContent) {
            setOptimisticChildren(children)
          }
        }
      })
    }
  }

  return (
    <button
      ref={ref}
      onClick={handleClick}
      disabled={disabled || (showPending && isPending)}
      aria-busy={isPending}
      {...props}
    >
      {isPending && pendingIndicator ? (
        pendingIndicator
      ) : (
        optimisticChildren
      )}
    </button>
  )
})

React19Button.displayName = 'React19Button'

// =============================================
// 4. Resource Loader with Suspense Integration
// =============================================

interface ResourceLoaderProps {
  /** Resource identifier */
  resourceId: string
  /** Loader function */
  loader: (id: string) => Promise<any>
  /** Cache the loaded resource */
  cache?: boolean
  children: (resource: any) => React.ReactNode
}

// Simple cache for resources
const resourceCache = new Map<string, Promise<any>>()

/**
 * Resource loader that integrates with React 19 Suspense
 * Provides automatic caching and error handling
 */
export const ResourceLoader = ({ 
  resourceId, 
  loader, 
  cache = true,
  children 
}: ResourceLoaderProps) => {
  const cacheKey = `${resourceId}`
  
  let resourcePromise = cache ? resourceCache.get(cacheKey) : undefined
  
  if (!resourcePromise) {
    resourcePromise = loader(resourceId)
    if (cache) {
      resourceCache.set(cacheKey, resourcePromise)
    }
  }

  const resource = use(resourcePromise)
  
  return <>{children(resource)}</>
}

// =============================================
// 5. Sitecore-Ready Component Pattern
// =============================================

interface SitecoreComponentProps {
  fields?: Record<string, any>
  params?: Record<string, string>
  rendering?: {
    uid?: string
    componentName?: string
  }
}

/**
 * HOC for making components Sitecore-compatible
 * Supports both static props and Sitecore field data
 */
export function withSitecoreSupport<P extends object>(
  Component: React.ComponentType<P>
) {
  return React.forwardRef<any, P & SitecoreComponentProps>(
    ({ fields, params, rendering, ...props }, ref) => {
      // Transform Sitecore fields to component props
      const transformedProps = React.useMemo(() => {
        if (!fields) return props
        const transformed = { ...props }
        Object.entries(fields).forEach(([key, field]) => {
          if (field && typeof field === 'object' && 'value' in field) {
            // @ts-ignore - Dynamic prop assignment
            transformed[key] = field.value
          }
        })
        return transformed
      }, [fields, props])
      return (
        <Component
          {...(transformedProps as P)}
          data-sitecore-uid={rendering?.uid}
          data-sitecore-component={rendering?.componentName}
          ref={ref}
        />
      )
    }
  )
}

// =============================================
// 6. Usage Examples
// =============================================

// Example: Enhanced form with server action
async function createMemberAction(
  prevState: FormState, 
  formData: FormData
): Promise<FormState> {
  try {
    const name = formData.get('name') as string
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    if (!name) {
      return { error: 'Name is required' }
    }
    
    return { 
      success: true, 
      data: { name, id: Date.now() } 
    }
  } catch (error) {
    return { error: 'Failed to create member' }
  }
}

// Example usage
export const ExampleUsage = () => {
  return (
    <div className="space-y-8">
      {/* Enhanced Form */}
      <EnhancedForm action={createMemberAction} optimistic>
        <input 
          name="name" 
          placeholder="Member name"
          className="w-full p-2 border rounded"
        />
        <React19Button 
          type="submit"
          showPending
          pendingIndicator={<span>Creating...</span>}
        >
          Create Member
        </React19Button>
      </EnhancedForm>

      {/* Async Data Loading */}
      <React.Suspense fallback={<div>Loading members...</div>}>
        <ResourceLoader
          resourceId="members"
          loader={async () => {
            const response = await fetch('/api/members')
            return response.json()
          }}
        >
          {(members) => (
            <div>
              <h3>Members ({members.length})</h3>
              {members.map((member: any) => (
                <div key={member.id}>{member.name}</div>
              ))}
            </div>
          )}
        </ResourceLoader>
      </React.Suspense>
    </div>
  )
}
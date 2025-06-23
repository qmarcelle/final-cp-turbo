import React, { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

/**
 * Context type for hydration state
 * @interface HydrationContextType
 * @property {boolean} isHydrated - Whether the component tree has been hydrated
 */
interface HydrationContextType {
  isHydrated: boolean;
}

/**
 * React context for managing hydration state
 * @internal
 */
const HydrationContext = createContext<HydrationContextType>({ isHydrated: false });

/**
 * Props for the HydrationProvider component
 * @interface HydrationProviderProps
 * @property {ReactNode} children - The components to be rendered after hydration
 * @property {ReactNode} [fallback] - Optional content to show before hydration
 */
interface HydrationProviderProps {
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * Provider component for handling React 19's hydration changes
 * 
 * This component manages the hydration state of your application and provides
 * a way to show different content before and after hydration. This helps prevent
 * hydration mismatches and provides a better user experience during the hydration process.
 * 
 * @example
 * ```tsx
 * function App() {
 *   return (
 *     <HydrationProvider fallback={<LoadingSpinner />}>
 *       <YourApp />
 *     </HydrationProvider>
 *   );
 * }
 * ```
 * 
 * @param {HydrationProviderProps} props - The component props
 * @returns {ReactNode} The rendered content
 */
export function HydrationProvider({ children, fallback }: HydrationProviderProps) {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return (
    <HydrationContext.Provider value={{ isHydrated }}>
      {isHydrated ? children : fallback || null}
    </HydrationContext.Provider>
  );
}

/**
 * Hook for accessing the current hydration state
 * 
 * @example
 * ```tsx
 * function Component() {
 *   const { isHydrated } = useHydration();
 *   
 *   if (!isHydrated) {
 *     return <LoadingSpinner />;
 *   }
 *   
 *   return <div>Hydrated Content</div>;
 * }
 * ```
 * 
 * @throws {Error} If used outside of a HydrationProvider
 * @returns {HydrationContextType} The current hydration state
 */
export function useHydration() {
  const context = useContext(HydrationContext);
  if (context === undefined) {
    throw new Error('useHydration must be used within a HydrationProvider');
  }
  return context;
}

/**
 * HOC that wraps a component with hydration awareness
 * 
 * This higher-order component provides hydration state handling to any component,
 * showing a fallback until hydration is complete.
 * 
 * @example
 * ```tsx
 * const HydratedComponent = withHydration(YourComponent, <LoadingSpinner />);
 * 
 * // Usage
 * function App() {
 *   return <HydratedComponent someProp={value} />;
 * }
 * ```
 * 
 * @template P - The props type of the wrapped component
 * @param {React.ComponentType<P>} WrappedComponent - The component to wrap
 * @param {ReactNode} [fallback] - Optional fallback content to show before hydration
 * @returns {React.ComponentType<P>} A new component with hydration handling
 */
export function withHydration<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  fallback?: ReactNode
) {
  return function WithHydrationComponent(props: P) {
    const { isHydrated } = useHydration();
    return isHydrated ? <WrappedComponent {...props} /> : fallback || null;
  };
} 
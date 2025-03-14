import { useState, useEffect, useCallback } from 'react';
import { useDataLoadingStore } from '../store/dataLoadingStore';
import { useNavigationStore } from '../store/navigationStore';

/**
 * Options for the useRouteData hook
 */
export interface UseRouteDataOptions<T> {
  route?: string;
  fetcher: () => Promise<T>;
  autoLoad?: boolean;
  maxAge?: number;
  dependencies?: any[];
}

/**
 * Hook for route-specific data loading
 * 
 * This hook integrates with the data loading store to:
 * - Automatically load data when a route is visited
 * - Prefetch data for routes that might be visited soon
 * - Provide loading, error, and data states
 * - Cache data and avoid unnecessary fetches
 * 
 * @example
 * function Dashboard() {
 *   const { data, isLoading, error, reload } = useRouteData({
 *     route: '/dashboard',
 *     fetcher: () => fetch('/api/dashboard').then(res => res.json()),
 *     autoLoad: true,
 *   });
 *   
 *   if (isLoading) return <Loading />;
 *   if (error) return <ErrorMessage error={error} />;
 *   
 *   return <DashboardContent data={data} />;
 * }
 */
export function useRouteData<T = any>({
  route,
  fetcher,
  autoLoad = true,
  maxAge = 30000,
  dependencies = []
}: UseRouteDataOptions<T>) {
  // Use the current route if none provided
  const currentPath = useNavigationStore(state => state.currentPath);
  const routeKey = route || currentPath;
  
  // Get the data loading store
  const {
    loadRouteData,
    getRouteData,
    clearRouteData,
    prefetchRoute
  } = useDataLoadingStore();
  
  // Get the current data state
  const { data, isLoading, error, lastUpdated } = getRouteData<T>(routeKey);
  
  // Local state for synchronization
  const [localLoading, setLocalLoading] = useState(isLoading);
  
  // Load the data on mount if autoLoad is true
  useEffect(() => {
    if (autoLoad) {
      setLocalLoading(true);
      loadRouteData<T>(routeKey, fetcher, { maxAge })
        .finally(() => setLocalLoading(false));
    }
  }, [routeKey, autoLoad, ...dependencies]);
  
  // Reload function to force refresh the data
  const reload = useCallback(async () => {
    setLocalLoading(true);
    try {
      return await loadRouteData<T>(routeKey, fetcher, { forceRefresh: true });
    } finally {
      setLocalLoading(false);
    }
  }, [routeKey, fetcher]);
  
  // Function to prefetch data for another route
  const prefetch = useCallback(async (prefetchRoute: string, prefetchFetcher: () => Promise<any>) => {
    return useDataLoadingStore.getState().prefetchRoute(prefetchRoute, prefetchFetcher);
  }, []);
  
  // Clear data function
  const clear = useCallback(() => {
    clearRouteData(routeKey);
  }, [routeKey]);
  
  return {
    data,
    isLoading: localLoading || isLoading,
    error,
    lastUpdated,
    reload,
    clear,
    prefetch
  };
}

export default useRouteData; 
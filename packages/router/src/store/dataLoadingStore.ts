import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { devtools } from 'zustand/middleware';

/**
 * Data record interface
 */
export interface DataRecord<T = any> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
  lastUpdated: number | null;
}

/**
 * Fetch options for data loading
 */
export interface FetchOptions {
  forceRefresh?: boolean; // Force refetch even if the data is fresh
  maxAge?: number; // Maximum age in milliseconds before data is considered stale
  headers?: HeadersInit;
  signal?: AbortSignal;
}

/**
 * Data loading state interface
 */
export interface DataLoadingState {
  // State
  routeData: Record<string, DataRecord>;
  prefetchedRoutes: string[];
  abortControllers: Record<string, AbortController>;
  
  // Actions
  loadRouteData: <T = any>(
    route: string, 
    fetcher: () => Promise<T>, 
    options?: FetchOptions
  ) => Promise<T | null>;
  
  prefetchRoute: <T = any>(
    route: string, 
    fetcher: () => Promise<T>
  ) => Promise<void>;
  
  clearRouteData: (route: string) => void;
  clearAllData: () => void;
  abortLoading: (route: string) => void;
  isDataFresh: (route: string, maxAge?: number) => boolean;
  getRouteData: <T = any>(route: string) => DataRecord<T>;
}

/**
 * Zustand store for route-specific data loading
 * Uses immer for easier state updates and devtools for debugging
 */
export const useDataLoadingStore = create<DataLoadingState>()(
  devtools(
    immer((set: any, get: any) => ({
      // Initial state
      routeData: {},
      prefetchedRoutes: [] as string[],
      abortControllers: {},
      
      // Load data for a specific route
      loadRouteData: async (route: string, fetcher: () => Promise<any>, options: FetchOptions = {}) => {
        const { forceRefresh = false, maxAge = 30000 } = options;
        
        // Check if we have fresh data already
        if (!forceRefresh && get().isDataFresh(route, maxAge)) {
          return get().routeData[route].data;
        }
        
        // Abort any existing requests for this route
        get().abortLoading(route);
        
        // Create a new abort controller
        const abortController = new AbortController();
        
        // Update state to indicate loading
        set((state: DataLoadingState) => {
          state.abortControllers[route] = abortController;
          state.routeData[route] = {
            ...state.routeData[route],
            isLoading: true,
            error: null
          };
        });
        
        try {
          // Perform the data fetch
          const fetchOptions = {
            ...options,
            signal: abortController.signal
          };
          
          // Let the consumer provide their own fetch logic
          const data = await fetcher();
          
          // Update state with the fetched data
          set((state: DataLoadingState) => {
            state.routeData[route] = {
              data,
              isLoading: false,
              error: null,
              lastUpdated: Date.now()
            };
            
            // Clean up the abort controller
            delete state.abortControllers[route];
          });
          
          return data;
        } catch (error) {
          // Only update state if the error is not due to an abort
          if (error instanceof Error && error.name !== 'AbortError') {
            set((state: DataLoadingState) => {
              state.routeData[route] = {
                ...state.routeData[route],
                isLoading: false,
                error: error as Error,
                lastUpdated: Date.now()
              };
              
              // Clean up the abort controller
              delete state.abortControllers[route];
            });
          }
          
          return null;
        }
      },
      
      // Prefetch data for a route before it's needed
      prefetchRoute: async (route: string, fetcher: () => Promise<any>) => {
        if (get().prefetchedRoutes.includes(route)) {
          return;
        }
        
        set((state: DataLoadingState) => {
          state.prefetchedRoutes.push(route);
        });
        
        await get().loadRouteData(route, fetcher, { maxAge: 60000 });
      },
      
      // Clear data for a specific route
      clearRouteData: (route: string) => {
        set((state: DataLoadingState) => {
          delete state.routeData[route];
          state.prefetchedRoutes = state.prefetchedRoutes.filter(r => r !== route);
        });
      },
      
      // Clear all route data
      clearAllData: () => {
        set((state: DataLoadingState) => {
          state.routeData = {};
          state.prefetchedRoutes = [];
          
          // Abort all pending requests
          Object.values(state.abortControllers).forEach(controller => {
            controller.abort();
          });
          
          state.abortControllers = {};
        });
      },
      
      // Abort loading for a specific route
      abortLoading: (route: string) => {
        const { abortControllers } = get();
        
        if (abortControllers[route]) {
          abortControllers[route].abort();
          
          set((state: DataLoadingState) => {
            delete state.abortControllers[route];
          });
        }
      },
      
      // Check if data for a route is fresh
      isDataFresh: (route: string, maxAge: number = 30000) => {
        const routeData = get().routeData[route];
        
        if (!routeData || routeData.lastUpdated === null) {
          return false;
        }
        
        return Date.now() - routeData.lastUpdated < maxAge;
      },
      
      // Get data for a specific route
      getRouteData: (route: string) => {
        return get().routeData[route] || {
          data: null,
          isLoading: false,
          error: null,
          lastUpdated: null
        };
      }
    })),
    { name: 'router-data-loading' }
  )
);

export default useDataLoadingStore; 
import { useCallback, useState, useEffect } from 'react';
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';
import type { PathName } from 'next/dist/shared/lib/router/router';

import { ROUTES, RouteParams, RoutePath, hasRouteParams } from '../constants/routes';
import { getFullRoute, removeBasePath, getBasePath } from '../utils/urlHelpers';
import { getRouterLogger } from '../logging';

type NavigateOptions = {
  scroll?: boolean;
  prefetch?: boolean;
  transition?: boolean;
  replace?: boolean;
  params?: Record<string, string>;
};

// Type for router object
interface Router extends AppRouterInstance {
  push: (url: string, options?: { scroll?: boolean }) => void;
  prefetch: (url: string) => void;
}

// Type for the hook's return value
interface NavigationHook {
  navigate: <T extends RoutePath>(
    route: T,
    params?: T extends keyof RouteParams ? RouteParams[T] : never,
    options?: NavigateOptions
  ) => void;
  navigateWithError: <T extends RoutePath>(
    route: T,
    params?: T extends keyof RouteParams ? RouteParams[T] : never,
    options?: NavigateOptions & { fallbackRoute?: string }
  ) => void;
  isActive: (route: string) => boolean;
  currentPath: string | null;
  prefetchRoute: (route: string) => void;
}

/**
 * Records a router error for monitoring
 */
function recordRouterError(error: {
  type: 'navigation_error' | 'parameter_error' | 'route_error';
  destination: string;
  error: string;
}) {
  // This will be a no-op in development but would connect
  // to monitoring in production environments
  if (process.env.NODE_ENV === 'production') {
    console.error('Router error:', error);
    // Integration point for monitoring solutions like Sentry or custom analytics
  }
}

/**
 * Navigation hook with router context integration
 */
export function useNavigation(): NavigationHook {
  // Get the current router logger instance
  const logger = getRouterLogger();
  
  // Get current path state (excluding base path)
  const [currentPath, setCurrentPath] = useState<string>(() => {
    // Initialize with current path, removing base path
    if (typeof window !== 'undefined') {
      const basePath = getBasePath();
      const rawPath = window.location.pathname;
      return rawPath.startsWith(basePath)
        ? rawPath.slice(basePath.length)
        : rawPath;
    }
    return '';
  });
  
  // Keep track of previous path for transitions
  const [previousPath, setPreviousPath] = useState<string | null>(null);
  
  // Update current path on route changes
  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    
    const basePath = getBasePath();
    
    // Function to update current path state
    const updatePath = () => {
      const rawPath = window.location.pathname;
      const path = rawPath.startsWith(basePath)
        ? rawPath.slice(basePath.length)
        : rawPath;
      
      // Only update if path has changed  
      if (path !== currentPath) {
        setPreviousPath(currentPath);
        setCurrentPath(path);
        
        // Log the navigation completion
        logger.logNavigation(currentPath, path);
      }
    };
    
    // Initialize
    updatePath();
    
    // Listen for popstate events
    window.addEventListener('popstate', updatePath);
    
    // Clean up listener
    return () => window.removeEventListener('popstate', updatePath);
  }, [currentPath, logger]);
  
  // Navigate function
  const navigate = useCallback(<T extends RoutePath>(
    route: T,
    params?: T extends keyof RouteParams ? RouteParams[T] : never,
    options?: NavigateOptions
  ) => {
    if (typeof window === 'undefined') return;
    
    try {
      let url = route as string;
      
      // Add dynamic parameters if provided
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value) {
            url = url.replace(`:${key}`, encodeURIComponent(value as string));
          }
        });
      }
      
      // Validate that all parameters were replaced
      if (url.includes(':')) {
        throw new Error(`Missing required parameter in route: ${url}`);
      }
      
      // Get full route with base path
      const fullRoute = getFullRoute(url);
      
      // Handle View Transitions API if enabled and supported
      if (options?.transition !== false && 'startViewTransition' in document) {
        (document as any).startViewTransition(() => {
          window.history.pushState({}, '', fullRoute);
          setPreviousPath(currentPath);
          setCurrentPath(url);
          
          // Log the navigation completion
          logger.logNavigation(currentPath, url);
          
          // Dispatch a custom event
          window.dispatchEvent(new Event('navigationchange'));
        });
      } else {
        window.history.pushState({}, '', fullRoute);
        setPreviousPath(currentPath);
        setCurrentPath(url);
        
        // Log the navigation completion
        logger.logNavigation(currentPath, url);
        
        // Dispatch a custom event
        window.dispatchEvent(new Event('navigationchange'));
      }
      
      if (options?.prefetch) {
        // This is a placeholder implementation as the original code didn't include prefetching
        // The original code used a router object, but now we're using the history API
        // If you need to implement prefetching, you'll need to add it here
      }
    } catch (err) {
      recordRouterError({
        type: 'navigation_error',
        destination: route as string,
        error: err instanceof Error ? err.message : String(err)
      });
      console.error('Navigation error:', err);
    }
  }, [currentPath, logger]);
  
  const navigateWithError = useCallback(<T extends RoutePath>(
    route: T,
    params?: T extends keyof RouteParams ? RouteParams[T] : never,
    options?: NavigateOptions & { fallbackRoute?: string }
  ) => {
    if (typeof window === 'undefined') return;
    
    try {
      navigate(route, params, options);
    } catch (err) {
      console.error('Navigation error:', err);
      
      // If fallback provided, try to navigate there instead
      if (options?.fallbackRoute) {
        try {
          const fallbackUrl = getFullRoute(options.fallbackRoute);
          window.history.pushState({}, '', fallbackUrl);
          setPreviousPath(currentPath);
          setCurrentPath(options.fallbackRoute as string);
          
          // Log the navigation completion
          logger.logNavigation(currentPath, options.fallbackRoute, options.params);
          
          // Dispatch a custom event
          window.dispatchEvent(new Event('navigationchange'));
        } catch (fallbackErr) {
          // Last resort - go to home
          window.history.pushState({}, '', getFullRoute('/'));
          setPreviousPath(currentPath);
          setCurrentPath('/');
          
          // Log the navigation completion
          logger.logNavigation(currentPath, '/');
          
          // Dispatch a custom event
          window.dispatchEvent(new Event('navigationchange'));
        }
      }
    }
  }, [navigate, currentPath, logger]);

  const prefetchRoute = useCallback((route: string) => {
    if (typeof window === 'undefined') return;
    
    try {
      const fullRoute = getFullRoute(route);
      // This is a placeholder implementation as the original code didn't include prefetching
      // If you need to implement prefetching, you'll need to add it here
    } catch (err) {
      recordRouterError({
        type: 'route_error',
        destination: route,
        error: 'Failed to prefetch route'
      });
    }
  }, []);
  
  const isActive = useCallback((route: string): boolean => {
    const currentPathWithoutBase = removeBasePath(currentPath || '');
    return currentPathWithoutBase === route || 
          currentPathWithoutBase.startsWith(`${route}/`);
  }, [currentPath]);
  
  return {
    navigate,
    navigateWithError,
    isActive,
    currentPath: currentPath,
    prefetchRoute,
  };
} 
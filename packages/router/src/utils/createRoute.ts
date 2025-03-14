/**
 * Route creation utilities for the routing system
 * Provides typed routes with parameter handling
 */
import { isExternalLink, getFullRoute } from './urlHelpers';

/**
 * Interface for route options
 */
export interface RouteOptions {
  /**
   * Whether this route is an external link
   */
  isExternal?: boolean;
  
  /**
   * Additional metadata for the route
   */
  meta?: Record<string, any>;
  
  /**
   * Whether this route requires authentication
   * @default true for /broker/* and /employer/* routes, false otherwise
   */
  requiresAuth?: boolean;
}

/**
 * Type for route parameters extracted from path
 * Extracts parameter names from a path like "/user/:id" -> { id: string }
 */
export type ExtractRouteParams<T extends string> = 
  T extends `${infer Start}:${infer Param}/${infer Rest}` 
    ? { [K in Param]: string } & ExtractRouteParams<Rest> 
    : T extends `${infer Start}:${infer Param}` 
      ? { [K in Param]: string } 
      : {};

/**
 * Type for a route with its path and parameter information
 */
export interface Route<T extends string> {
  /**
   * The path pattern for this route (includes parameter placeholders)
   */
  path: T;
  
  /**
   * Full URL with base path included (for non-external routes)
   * or the original URL (for external routes)
   */
  fullPath: string;
  
  /**
   * Whether this route is external
   */
  isExternal: boolean;
  
  /**
   * Whether this route requires authentication
   */
  requiresAuth: boolean;
  
  /**
   * Additional metadata for this route
   */
  meta: Record<string, any>;
  
  /**
   * Function to construct URL with parameters 
   * @param params The parameter values to insert into the route
   * @returns The concrete URL with parameters filled in
   */
  createUrl: (params?: ExtractRouteParams<T>) => string;
}

/**
 * Create a typed route with parameters
 * 
 * @example
 * const userRoute = createRoute('/user/:id');
 * const url = userRoute.createUrl({ id: '123' }); // => '/user/123'
 */
export function createRoute<T extends string>(
  path: T, 
  isExternal = false,
  options: Omit<RouteOptions, 'isExternal'> = {}
): Route<T> {
  // Determine if authentication is required based on path (if not explicitly specified)
  const requiresAuth = options.requiresAuth ?? (path.startsWith('/broker/') || path.startsWith('/employer/'));
  
  // Create the route object
  const route: Route<T> = {
    path,
    fullPath: isExternal ? path : getFullRoute(path),
    isExternal,
    requiresAuth,
    meta: options.meta || {},
    
    // Implementation of createUrl function to handle parameters
    createUrl: (params = {} as ExtractRouteParams<T>) => {
      // Create a copy of the path to modify
      let url = String(path) as string;
      
      // Replace parameters in the URL
      Object.entries(params).forEach(([key, value]) => {
        url = url.replace(`:${key}`, encodeURIComponent(String(value)));
      });
      
      // Return the full path for internal links
      return isExternal ? url : getFullRoute(url);
    }
  };
  
  return route;
} 
import type { ReadonlyURLSearchParams } from 'next/navigation';
import { RouteParams } from '../constants/routes';

// Define type for params object
interface Params {
  [key: string]: string | string[] | undefined;
}

// Define type for search params
interface SearchParams {
  get: (key: string) => string | null;
  getAll: (key: string) => string[];
  has: (key: string) => boolean;
  forEach: (callback: (value: string, key: string) => void) => void;
  entries: () => IterableIterator<[string, string]>;
  keys: () => IterableIterator<string>;
  values: () => IterableIterator<string>;
  toString: () => string;
}

// Type for hook return value
interface RouteParamsHook<T extends keyof RouteParams> {
  getParam: <K extends keyof RouteParams[T]>(paramName: K) => string | undefined;
  getQueryParam: (paramName: string) => string | undefined;
  getAllQueryParams: () => Record<string, string>;
  params: Params | null;
  searchParams: SearchParams | null;
}

/**
 * Hook to get type-safe route parameters
 */
export function useRouteParams<T extends keyof RouteParams>(): RouteParamsHook<T> {
  let params: Params | null = null;
  let searchParams: SearchParams | null = null;
  
  // Only run on client
  if (typeof window !== 'undefined') {
    try {
      // Dynamic import Next.js navigation
      const { useParams, useSearchParams } = require('next/navigation');
      
      params = useParams() as Params;
      searchParams = useSearchParams() as SearchParams;
    } catch (e) {
      console.warn('Route params hooks require client-side rendering', e);
    }
  }
  
  /**
   * Get a route parameter with type safety
   */
  function getParam<K extends keyof RouteParams[T]>(paramName: K): string | undefined {
    if (!params) return undefined;
    
    const param = params[paramName as string];
    return param ? (Array.isArray(param) ? param[0] : param) : undefined;
  }
  
  /**
   * Get a query parameter
   */
  function getQueryParam(paramName: string): string | undefined {
    return searchParams?.get(paramName) || undefined;
  }
  
  /**
   * Get all query parameters
   */
  function getAllQueryParams(): Record<string, string> {
    const result: Record<string, string> = {};
    
    if (searchParams) {
      searchParams.forEach((value, key) => {
        result[key] = value;
      });
    }
    
    return result;
  }
  
  return {
    getParam,
    getQueryParam,
    getAllQueryParams,
    params,
    searchParams
  };
} 
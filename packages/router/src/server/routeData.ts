/**
 * Server-side data fetching utilities for React Server Components
 * This module provides functions that work with React Server Components
 * and enables server-side rendering with proper data fetching
 */
// React cache will be available in React 18.3+ for RSC
// Using unstable_cache from Next.js as a fallback
import { unstable_cache } from 'next/cache';
import { getBasePath } from '../utils/urlHelpers';
import type { RouteParams, RoutePath } from '../constants/routes';
import { getRouterLogger, RouterEventType, LogLevel } from '../logging';

// Cache for server data to avoid refetching during a render cycle
const DATA_CACHE = new Map<string, Promise<any>>();

/**
 * Options for route data fetching
 */
export interface RouteDataOptions {
  /**
   * Whether to cache the result
   * @default true
   */
  cache?: boolean;
  
  /**
   * Cache TTL in seconds
   * @default 60
   */
  cacheTtl?: number;
  
  /**
   * Headers to include in the request
   */
  headers?: HeadersInit;
  
  /**
   * Abort signal for cancellation
   */
  signal?: AbortSignal;
  
  /**
   * Next.js fetch cache tag for revalidation
   */
  tag?: string;
  
  /**
   * Enable detailed performance logging
   * @default true in development, false in production
   */
  enableLogging?: boolean;
}

// Interface for the Next.js revalidation API
interface NextJsRevalidate {
  revalidateTag?: (tag: string) => void;
}

// Type assertion for Next.js global API
const nextGlobal = globalThis as unknown as NextJsRevalidate;

/**
 * Get data for a specific route (Server Component Compatible)
 * 
 * @example
 * // In a React Server Component
 * export default async function Page({ params }) {
 *   const data = await getRouteData('/api/documents/:documentId', { 
 *     documentId: params.documentId 
 *   });
 *   
 *   return <DocumentViewer document={data} />;
 * }
 */
export async function getRouteData<T = any>(
  route: string,
  params?: Record<string, string>,
  options: RouteDataOptions = {},
): Promise<T> {
  'use server'; // Mark as server action
  
  const {
    cache: shouldCache = true,
    cacheTtl = 60,
    headers = {},
    signal,
    tag,
    enableLogging = process.env.NODE_ENV === 'development',
  } = options;
  
  // Get router logger if logging is enabled
  const logger = enableLogging ? getRouterLogger() : null;
  const startTime = performance.now();
  
  let url = route;
  
  // Replace route parameters
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url = url.replace(`:${key}`, encodeURIComponent(String(value)));
    });
  }
  
  // Ensure API route starts with the correct base path
  if (url.startsWith('/api')) {
    url = `${getBasePath()}${url}`;
  }
  
  // Create a cache key
  const cacheKey = `${url}:${JSON.stringify(headers)}`;
  
  // Log the fetch start
  logger?.logDataFetch(url, {
    params,
    headers: { ...headers },
    cacheTtl,
    shouldCache,
  }, DATA_CACHE.has(cacheKey));
  
  // Check cache
  if (shouldCache && DATA_CACHE.has(cacheKey)) {
    const cachedData = DATA_CACHE.get(cacheKey) as Promise<T>;
    
    // Log cache hit
    if (logger) {
      logger.logEvent({
        type: RouterEventType.DATA_FETCH,
        action: 'cache_hit',
        data: {
          url,
          cacheKey,
          params,
        },
        timestamp: Date.now(),
      }, LogLevel.DEBUG);
    }
    
    try {
      const data = await cachedData;
      
      // Log completion with timing
      const endTime = performance.now();
      logger?.logEvent({
        type: RouterEventType.DATA_FETCH,
        action: 'complete',
        data: {
          url,
          cacheHit: true,
          responseSize: JSON.stringify(data).length,
        },
        timestamp: Date.now(),
        duration: endTime - startTime,
      }, LogLevel.DEBUG);
      
      return data;
    } catch (error) {
      // If cached promise was rejected, remove from cache
      DATA_CACHE.delete(cacheKey);
      
      // Log cache error
      logger?.logEvent({
        type: RouterEventType.ERROR,
        action: 'cache_error',
        data: {
          url,
          cacheKey,
          params,
        },
        timestamp: Date.now(),
        error,
      }, LogLevel.ERROR);
      
      throw error;
    }
  }
  
  // Create fetch completion logger
  const fetchLogger = logger?.logDataFetch(url, {
    params,
    headers: { ...headers },
    cacheTtl,
    shouldCache,
  }, false);
  
  // Fetch data with proper Next.js cache options
  const fetchPromise = fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    next: {
      // Use tag for data revalidation if provided
      tags: tag ? [tag] : undefined,
      // Cache with provided TTL
      revalidate: cacheTtl,
    },
    signal,
  })
  .then(async (response) => {
    if (!response.ok) {
      const error = new Error(`Error fetching route data: ${response.status}`);
      (error as any).status = response.status;
      (error as any).url = url;
      
      // Log fetch error
      fetchLogger?.complete(false);
      logger?.logEvent({
        type: RouterEventType.ERROR,
        action: 'fetch_error',
        data: {
          url,
          status: response.status,
          statusText: response.statusText,
          params,
        },
        timestamp: Date.now(),
        error,
      }, LogLevel.ERROR);
      
      throw error;
    }
    
    const data = await response.json() as T;
    
    // Log successful fetch
    fetchLogger?.complete(true, data);
    
    return data;
  })
  .catch((error) => {
    // Log network error
    fetchLogger?.complete(false);
    logger?.logEvent({
      type: RouterEventType.ERROR,
      action: 'fetch_network_error',
      data: {
        url,
        params,
      },
      timestamp: Date.now(),
      error,
    }, LogLevel.ERROR);
    
    throw error;
  });
  
  // Store in cache if caching is enabled
  if (shouldCache) {
    DATA_CACHE.set(cacheKey, fetchPromise);
    
    // Set cache expiration
    setTimeout(() => {
      DATA_CACHE.delete(cacheKey);
      
      // Log cache expiration
      logger?.logEvent({
        type: RouterEventType.DATA_FETCH,
        action: 'cache_expired',
        data: {
          url,
          cacheKey,
          ttl: cacheTtl,
        },
        timestamp: Date.now(),
      }, LogLevel.DEBUG);
    }, cacheTtl * 1000);
  }
  
  return fetchPromise;
}

/**
 * Version of getRouteData that can be used with Next.js cache
 * To be used with unstable_cache import at the component level
 * 
 * @example
 * import { unstable_cache } from 'next/cache';
 * import { getCacheableRouteData } from '@cp/router';
 * 
 * const cachedGetRouteData = unstable_cache(getCacheableRouteData, ['my-cache-key']);
 */
export const getCacheableRouteData = getRouteData;

/**
 * Prefetch route data on the server (prebake data for hydration)
 */
export async function prefetchRouteData(
  route: string,
  params?: Record<string, string>,
  options: RouteDataOptions = {},
): Promise<void> {
  'use server';
  
  const logger = options.enableLogging ? getRouterLogger() : null;
  
  // Log prefetch attempt
  logger?.logEvent({
    type: RouterEventType.DATA_FETCH,
    action: 'prefetch',
    data: {
      route,
      params,
    },
    timestamp: Date.now(),
  }, LogLevel.DEBUG);
  
  try {
    // Simply call getRouteData to cache the result
    await getRouteData(route, params, {
      ...options,
      cache: true,
    });
    
    // Log successful prefetch
    logger?.logEvent({
      type: RouterEventType.DATA_FETCH,
      action: 'prefetch_success',
      data: {
        route,
        params,
      },
      timestamp: Date.now(),
    }, LogLevel.DEBUG);
  } catch (error) {
    // Log prefetch error but don't rethrow
    // Prefetch errors shouldn't block rendering
    logger?.logEvent({
      type: RouterEventType.ERROR,
      action: 'prefetch_error',
      data: {
        route,
        params,
      },
      timestamp: Date.now(),
      error,
    }, LogLevel.WARN);
  }
}

/**
 * Version of prefetchRouteData that can be used with Next.js cache
 */
export const getCacheablePrefetchRouteData = prefetchRouteData;

/**
 * Invalidate cached route data
 */
export async function invalidateRouteData(
  route: string,
  params?: Record<string, string | number>
): Promise<void> {
  'use server';
  
  const logger = getRouterLogger();
  const startTime = performance.now();
  
  let url = route;
  
  // Replace route parameters
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url = url.replace(`:${key}`, encodeURIComponent(String(value)));
    });
  }
  
  // Log invalidation attempt
  logger.logEvent({
    type: RouterEventType.DATA_FETCH,
    action: 'invalidate',
    data: {
      url,
      params,
    },
    timestamp: Date.now(),
  });
  
  // Find and delete all cache entries that match this URL
  const cachePrefix = `${url}:`;
  let invalidatedCount = 0;
  
  for (const key of DATA_CACHE.keys()) {
    if (key.startsWith(cachePrefix)) {
      DATA_CACHE.delete(key);
      invalidatedCount++;
    }
  }
  
  // Also use Next.js revalidate API if available
  if (nextGlobal.revalidateTag) {
    try {
      nextGlobal.revalidateTag(url);
      
      // Log tag revalidation
      logger.logEvent({
        type: RouterEventType.DATA_FETCH,
        action: 'tag_revalidated',
        data: {
          url,
          tag: url,
        },
        timestamp: Date.now(),
      }, LogLevel.DEBUG);
    } catch (error) {
      // Log revalidation error
      logger.logEvent({
        type: RouterEventType.ERROR,
        action: 'tag_revalidation_error',
        data: {
          url,
        },
        timestamp: Date.now(),
        error,
      }, LogLevel.WARN);
    }
  }
  
  // Log invalidation completion
  const endTime = performance.now();
  logger.logEvent({
    type: RouterEventType.DATA_FETCH,
    action: 'invalidate_complete',
    data: {
      url,
      params,
      entriesInvalidated: invalidatedCount,
    },
    timestamp: Date.now(),
    duration: endTime - startTime,
  });
}

// Create a cached version of the invalidateRouteData function
export const cachedInvalidateRouteData = unstable_cache(
  invalidateRouteData,
  ['route-invalidate']
); 
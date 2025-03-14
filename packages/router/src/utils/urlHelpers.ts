/**
 * URL helper functions to handle base path and route manipulation
 */

/**
 * Get the base path from environment variables
 * This should match the basePath setting in next.config.js
 */
export function getBasePath(): string {
  // For server components
  if (typeof process !== 'undefined' && typeof process.env !== 'undefined' && process.env.NEXT_PUBLIC_BASE_PATH) {
    return process.env.NEXT_PUBLIC_BASE_PATH;
  }
  
  // For client components
  if (typeof window !== 'undefined') {
    // @ts-ignore - Next.js adds __NEXT_DATA__ to the window object
    return window.__NEXT_DATA__?.basePath || '';
  }
  
  return '';
}

/**
 * Join multiple path segments, handling slashes properly
 */
export function joinPaths(...paths: string[]): string {
  return paths
    .map(path => path.trim())
    .map(path => path.replace(/^\/+/, '').replace(/\/+$/, ''))
    .filter(Boolean)
    .join('/');
}

/**
 * Determine if a URL is external (absolute) or internal (relative)
 */
export function isExternalLink(url: string): boolean {
  if (!url) return false;
  return url.startsWith('http://') || 
         url.startsWith('https://') || 
         url.startsWith('//') ||
         url.startsWith('mailto:') ||
         url.startsWith('tel:');
}

/**
 * Get the full route with the base path prefixed
 * Does not modify external links
 */
export function getFullRoute(route: string): string {
  if (isExternalLink(route)) {
    return route;
  }
  
  const basePath = getBasePath();
  
  // Handle hash and query parameters correctly
  const [pathPart, hashOrQueryPart = ''] = route.split(/([#?])/);
  const hashOrQueryPrefix = hashOrQueryPart ? route.charAt(pathPart.length) : '';
  
  // Combine with proper handling of slashes
  const fullPath = basePath 
    ? `/${joinPaths(basePath, pathPart)}` 
    : (pathPart.startsWith('/') ? pathPart : `/${pathPart}`);
  
  return hashOrQueryPrefix ? `${fullPath}${hashOrQueryPrefix}${hashOrQueryPart}` : fullPath;
}

/**
 * Remove the base path from a route (useful for route matching)
 */
export function removeBasePath(fullRoute: string): string {
  const basePath = getBasePath();
  if (!basePath || !fullRoute.startsWith(basePath)) {
    return fullRoute;
  }
  
  const routeWithoutBase = fullRoute.slice(basePath.length);
  return routeWithoutBase.startsWith('/') ? routeWithoutBase : `/${routeWithoutBase}`;
} 
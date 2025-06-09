/**
 * Navigation Functions
 */

/**
 * Navigate to a new route programmatically outside of React components
 */
export const navigateTo = (path: string) => {
  if (typeof window !== 'undefined') {
    window.location.href = path;
  } else {
    // For server-side, you might want to use Next.js redirect
    throw new Error('Server-side navigation requires Next.js redirect');
  }
};

/**
 * Reload the current page
 */
export const reloadPage = () => {
  if (typeof window !== 'undefined') {
    window.location.reload();
  }
};

/**
 * Get the current URL
 */
export const getCurrentUrl = () => {
  if (typeof window !== 'undefined') {
    return window.location.href;
  }
  return '';
};

/**
 * Get the current pathname
 */
export const getCurrentPathname = () => {
  if (typeof window !== 'undefined') {
    return window.location.pathname;
  }
  return '';
};

/**
 * Get URL search params
 */
export const getSearchParams = () => {
  if (typeof window !== 'undefined') {
    return new URLSearchParams(window.location.search);
  }
  return null;
};

/**
 * Route Definitions and Configuration
 */

/**
 * Routes accessible to non-logged-in clients
 */
export const publicRoutes = ['/embed/logout', '/chat-test'];

/**
 * Authentication routes that redirect logged-in users to /settings
 */
export const authRoutes = ['/login', '/embed/dxAuth'];

/**
 * Context root for API authentication routes
 */
export const apiAuthPrefix = '/api';

/**
 * Routes that hide header and footer
 */
export const ROUTES_WITHOUT_HEADER_FOOTER = [
  '/login',
  '/error',
  '/maintenance',
  '/embed',
];

/**
 * Common routes shared across all groups
 */
export const commonRoutes = {
  myPlan: '/myplan',
  benefits: '/benefits',
  profile: '/profile',
  sharing: '/sharing',
};

/**
 * Group-specific routes that can be overridden
 */
export const groupRoutes = {
  dashboard: '/dashboard',
  findCare: '/findcare',
  myHealth: '/myhealth',
  support: '/support',
};

/**
 * Route Utility Functions
 */

/**
 * Check if a route should hide header and footer
 */
export const shouldHideHeaderFooter = (pathname: string): boolean => {
  return ROUTES_WITHOUT_HEADER_FOOTER.some((route) =>
    pathname.startsWith(route),
  );
};

/**
 * Check if a route is group-specific
 */
export const isGroupRoute = (pathname: string): boolean => {
  return Object.values(groupRoutes).some((route) =>
    pathname.startsWith(route),
  );
};

/**
 * Get the group from the pathname
 */
export const getGroupFromPath = (pathname: string): string => {
  const parts = pathname.split('/');
  return parts[1] || 'member';
};

/**
 * Breadcrumb Generation
 */

interface Breadcrumb {
  label: string;
  path: string;
}

type RouteMetadata = {
  [key: string]: string;
};

// Common acronyms that should remain uppercase
const COMMON_ACRONYMS = new Set(['FAQ', 'HSA', 'FSA', 'ID', 'SSN']);

/**
 * Converts a camelCase or kebab-case string to Title Case
 */
const toTitleCase = (str: string): string => {
  // Handle kebab-case
  const withoutHyphens = str.replace(/-/g, ' ');

  // Handle camelCase with special care for acronyms
  const withSpaces = withoutHyphens
    .replace(/([A-Z][a-z]+|[A-Z]{2,}(?=[A-Z][a-z]|\d|\W|$))/g, ' $1')
    .replace(/([a-z])([A-Z])/g, '$1 $2');

  // Split into words and process each
  const words = withSpaces.trim().split(/\s+/);

  return words
    .map((word) => {
      // Check if word is exactly a known acronym
      const upperWord = word.toUpperCase();
      if (COMMON_ACRONYMS.has(upperWord)) {
        return upperWord;
      }

      // Handle compound words with acronyms
      for (const acronym of COMMON_ACRONYMS) {
        const regex = new RegExp(`\\b${acronym}\\b`, 'i');
        if (regex.test(word)) {
          return word.replace(regex, acronym);
        }
      }

      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(' ');
};

/**
 * Generates breadcrumb navigation items from a given path
 */
export const getBreadcrumbs = (
  path: string,
  metadata: RouteMetadata = {},
): Breadcrumb[] => {
  // Handle root path
  if (path === '/') {
    return [];
  }

  // Remove query parameters if present
  const cleanPath = path.split('?')[0];

  // Split path into segments
  const segments = cleanPath.split('/').filter(Boolean);

  // Build breadcrumbs array
  return segments.reduce<Breadcrumb[]>((breadcrumbs, segment, index) => {
    // Build the current path
    const currentPath = '/' + segments.slice(0, index + 1).join('/');

    // Check if we have a dynamic segment pattern in metadata
    const dynamicPattern = Object.keys(metadata).find((pattern) => {
      const regex = new RegExp(
        '^' + pattern.replace(/\[.*?\]/g, '[^/]+') + '$',
      );
      return regex.test(currentPath);
    });

    // Get the label from metadata or generate from segment
    const label = dynamicPattern
      ? metadata[dynamicPattern]
      : toTitleCase(segment);

    breadcrumbs.push({
      label,
      path: currentPath,
    });

    return breadcrumbs;
  }, []);
};

/**
 * Advanced Route Utilities
 */

/**
 * Checks if current route matches any of the provided patterns
 */
export const matchesRoutePattern = (
  currentPath: string,
  patterns: string[],
): boolean => {
  return patterns.some((pattern) => {
    const regex = new RegExp(
      '^' + pattern.replace(/\[.*?\]/g, '[^/]+').replace(/\*/g, '.*') + '$',
    );
    return regex.test(currentPath);
  });
};

/**
 * Extracts dynamic segments from a path based on a pattern
 */
export const extractDynamicSegments = (
  path: string,
  pattern: string,
): Record<string, string> => {
  const pathSegments = path.split('/').filter(Boolean);
  const patternSegments = pattern.split('/').filter(Boolean);
  const params: Record<string, string> = {};

  patternSegments.forEach((segment, index) => {
    if (segment.startsWith('[') && segment.endsWith(']')) {
      const paramName = segment.slice(1, -1);
      params[paramName] = pathSegments[index] || '';
    }
  });

  return params;
};

/**
 * Builds a path from a pattern and parameters
 */
export const buildPath = (
  pattern: string,
  params: Record<string, string>,
): string => {
  let path = pattern;
  
  Object.entries(params).forEach(([key, value]) => {
    path = path.replace(`[${key}]`, value);
  });
  
  return path;
};

/**
 * Gets the parent path from a given path
 */
export const getParentPath = (path: string): string => {
  const segments = path.split('/').filter(Boolean);
  if (segments.length <= 1) return '/';
  
  return '/' + segments.slice(0, -1).join('/');
};

/**
 * Checks if one path is a child of another
 */
export const isChildPath = (childPath: string, parentPath: string): boolean => {
  if (parentPath === '/') return childPath !== '/';
  return childPath.startsWith(parentPath + '/');
};

/**
 * Navigation state management utilities
 */
export interface NavigationState {
  previousPath?: string;
  returnPath?: string;
  metadata?: Record<string, any>;
}

/**
 * Stores navigation state (client-side only)
 */
export const setNavigationState = (state: NavigationState) => {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('navigationState', JSON.stringify(state));
  }
};

/**
 * Gets stored navigation state (client-side only)
 */
export const getNavigationState = (): NavigationState | null => {
  if (typeof window !== 'undefined') {
    const stored = sessionStorage.getItem('navigationState');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return null;
      }
    }
  }
  return null;
};

/**
 * Clears navigation state
 */
export const clearNavigationState = () => {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem('navigationState');
  }
}; 
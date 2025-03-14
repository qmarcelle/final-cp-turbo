import { create } from 'zustand';
import { getBasePath } from '../utils/urlHelpers';
import { ROUTES } from '../constants/routes';

/**
 * Interface for a breadcrumb item
 */
export interface BreadcrumbItem {
  label: string;
  path: string;
  isActive?: boolean;
}

/**
 * Interface for navigation state
 */
export interface NavigationState {
  // State
  currentPath: string;
  previousPath: string | null;
  isNavigating: boolean;
  breadcrumbs: BreadcrumbItem[];
  portalContext: string;
  
  // Actions
  setCurrentPath: (path: string) => void;
  navigate: (path: string, params?: Record<string, string | number>) => void;
  updatePortalContext: (portal: string) => void;
}

/**
 * Helper to generate breadcrumbs from a path
 */
export const generateBreadcrumbs = (path: string): BreadcrumbItem[] => {
  const parts = path.split('/').filter(Boolean);
  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', path: '/' },
  ];
  
  let currentPath = '';
  parts.forEach((part, index) => {
    currentPath += `/${part}`;
    // Create a readable label from the path segment
    const label = part
      .replace(/-/g, ' ')
      .replace(/\b\w/g, char => char.toUpperCase());
    
    breadcrumbs.push({
      label,
      path: currentPath,
      isActive: index === parts.length - 1,
    });
  });
  
  return breadcrumbs;
};

/**
 * Zustand store for navigation state management
 */
export const useNavigationStore = create<NavigationState>((set: any, get: any) => ({
  // Initial state
  currentPath: typeof window !== 'undefined' ? window.location.pathname : '/',
  previousPath: null,
  isNavigating: false,
  breadcrumbs: [],
  portalContext: '',
  
  // Actions
  setCurrentPath: (path: string) => {
    const breadcrumbs = generateBreadcrumbs(path);
    set((state: NavigationState) => ({ 
      previousPath: state.currentPath,
      currentPath: path,
      breadcrumbs,
      isNavigating: false,
    }));
  },
  
  navigate: (path: string, params: Record<string, string | number> = {}) => {
    set({ isNavigating: true });
    
    // Apply base path for correct routing
    const basePath = getBasePath();
    const portalContext = get().portalContext;
    
    // Process params to construct query string
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      queryParams.append(key, String(value));
    });
    
    const queryString = queryParams.toString();
    const separator = queryString ? '?' : '';
    
    // Construct the full path with base path, context, and params
    const fullPath = `${basePath}${portalContext ? `/${portalContext}` : ''}${path}${separator}${queryString}`;
    
    // Navigate using the browser API
    if (typeof window !== 'undefined') {
      window.location.href = fullPath;
    }
  },
  
  updatePortalContext: (portal: string) => {
    set({ portalContext: portal });
    
    // Update breadcrumbs if path has changed
    const { currentPath } = get();
    const breadcrumbs = generateBreadcrumbs(currentPath);
    set({ breadcrumbs });
  },
}));

/**
 * Hook to check if a route is active
 */
export const useIsActive = () => {
  const currentPath = useNavigationStore((state: NavigationState) => state.currentPath);
  
  return (path: string): boolean => {
    // Remove trailing slashes for comparison
    const normalizedCurrentPath = currentPath.replace(/\/+$/, '');
    const normalizedPath = path.replace(/\/+$/, '');
    
    // Exact match
    if (normalizedCurrentPath === normalizedPath) {
      return true;
    }
    
    // Base path match (e.g., /dashboard matches /dashboard/settings)
    if (normalizedCurrentPath.startsWith(normalizedPath + '/')) {
      return true;
    }
    
    return false;
  };
};

export default useNavigationStore; 
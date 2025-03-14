import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useNavigationStore, useIsActive } from '../store/navigationStore';
import { getBasePath } from '../utils/urlHelpers';

/**
 * Enhanced navigation hook that integrates with Zustand store
 * 
 * This hook provides navigation capabilities with state management,
 * including breadcrumb generation and active route detection.
 */
export function useZustandNavigation() {
  const pathname = usePathname();
  const isActive = useIsActive();
  const { 
    currentPath,
    breadcrumbs,
    navigate,
    setCurrentPath,
    updatePortalContext,
    portalContext
  } = useNavigationStore();
  
  // Update the current path when the pathname changes
  useEffect(() => {
    if (pathname) {
      setCurrentPath(pathname);
    }
  }, [pathname, setCurrentPath]);
  
  // Detect portal context from base path
  useEffect(() => {
    const basePath = getBasePath();
    if (basePath) {
      const portal = basePath.replace('/', '');
      if (portal && portal !== portalContext) {
        updatePortalContext(portal);
      }
    }
  }, [updatePortalContext, portalContext]);
  
  return {
    currentPath,
    breadcrumbs,
    navigate,
    isActive,
    portalContext,
    updatePortalContext
  };
}

export default useZustandNavigation; 
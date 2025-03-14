/**
 * Main export file for the router package
 * Provides all routing functionality for the application
 */

// Export route definitions
export * from './routes';

// Export route constants
export { ROUTES, type RouteParams, type RoutePath, type ExtractRouteParams, hasRouteParams } from './constants/routes';

// Export hooks
export { useNavigation } from './hooks/useNavigation';
export { useBasePath } from './hooks/useBasePath';
export { useRouteParams } from './hooks/useRouteParams';

// Export enhanced navigation with View Transitions
export { 
  useTransitionNavigation, 
  isViewTransitionsSupported,
  type TransitionOptions 
} from './hooks/useTransitionNavigation';

// Export middleware
export { 
  createRouteMiddleware, 
  routeConfig, 
  type RouteMiddlewareOptions 
} from './middleware';

// Export security middleware
export {
  createSecurityMiddleware,
  generateSecurityHeaders,
  type SecurityOptions,
  type CSPOptions,
} from './middleware/securityMiddleware';

// Export utility functions
export { getBasePath, removeBasePath, isExternalLink, joinPaths, getFullRoute } from './utils/urlHelpers';
export { createRoute, type RouteOptions, type ExtractRouteParams as RoutePathParams, type Route } from './utils/createRoute';

// Export Zustand integration
export { 
  useNavigationStore, 
  useIsActive,
  type NavigationState,
  type BreadcrumbItem
} from './store/navigationStore';

export { useZustandNavigation } from './hooks/useZustandNavigation';

export {
  useAuthStore,
  type AuthState,
  type UserProfile,
  type Credentials
} from './store/authStore';

export {
  createZustandRouteMiddleware,
  enhancedRouteConfig,
  type EnhancedRouteMiddlewareOptions
} from './middleware/zustandMiddleware';

// Export data loading (Phase 3)
export {
  useDataLoadingStore,
  type DataLoadingState,
  type DataRecord,
  type FetchOptions
} from './store/dataLoadingStore';

export {
  useRouteData,
  type UseRouteDataOptions
} from './hooks/useRouteData';

// Export server components integration
export {
  getRouteData,
  prefetchRouteData,
  invalidateRouteData,
  getCacheableRouteData,
  getCacheablePrefetchRouteData,
  cachedInvalidateRouteData,
  type RouteDataOptions
} from './server/routeData';

// Export logging functionality
export {
  RouterLoggerService,
  getRouterLogger,
  initRouterLogger,
  createLoggerAdapter,
  createCommonLoggerAdapter,
  LogLevel,
  RouterEventType,
  type RouterLogger,
  type RouterLogEvent,
  type RouterLoggerConfig,
  type DataFetchLogCompletion
} from './logging';

// Export logging utilities
export * from './logging';

// Export transitions utilities
export * from './transitions';

// Export debugging tools (Phase 4)
export { RouterDevtools } from './debugging/RouterDevtools'; 
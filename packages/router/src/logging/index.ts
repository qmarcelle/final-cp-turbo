/**
 * Router logging system
 * Export all logging-related functionality from a single entry point
 */

export {
  // Core logger functionality
  RouterLoggerService,
  getRouterLogger,
  initRouterLogger,
  
  // Enums and interfaces
  LogLevel,
  RouterEventType,
  type RouterLogger,
  type RouterLogEvent,
  type RouterLoggerConfig,
  type DataFetchLogCompletion
} from './routerLogger';

export {
  // Logger adapters
  createLoggerAdapter,
  createCommonLoggerAdapter
} from './loggerAdapter'; 
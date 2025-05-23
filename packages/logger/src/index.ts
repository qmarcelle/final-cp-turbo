// Core logger exports
export { 
  createLogger, 
  logger,
  LogLevel
} from './logger';

// Next.js router exports
export {
  withLogging,
  getClientLogger
} from './next';

// Auth.js integration exports
export {
  authEventLogger,

  authCallbacks,
  getSessionLogger
} from './auth';

// Middleware exports
export {
  withRequestLogging,
  logErrorBoundary
} from './middleware';

// Export types
export type { Logger, LoggerOptions } from 'pino'; 
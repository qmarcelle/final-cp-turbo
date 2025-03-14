/**
 * Logger adapter for integrating custom logging packages with the router
 * This lets you connect your existing logging system to the router's logging infrastructure
 */
import { RouterLogger } from './routerLogger';

/**
 * Creates an adapter to use your existing logger with the router
 * 
 * @example
 * // Integrate with your existing logger
 * import { yourLogger } from '@your-org/logger';
 * import { createLoggerAdapter, initRouterLogger } from '@cp/router/logging';
 * 
 * // Create an adapter that maps router logging to your logger
 * const loggerAdapter = createLoggerAdapter({
 *   debug: (message, data) => yourLogger.debug(message, data),
 *   info: (message, data) => yourLogger.info(message, data),
 *   warn: (message, data) => yourLogger.warn(message, data),
 *   error: (message, error, data) => yourLogger.error(message, { error, ...data }),
 * });
 * 
 * // Initialize the router with your logger
 * initRouterLogger({ logger: loggerAdapter });
 */
export function createLoggerAdapter(implementation: RouterLogger): RouterLogger {
  return implementation;
}

/**
 * Creates a simple adapter for common logging libraries
 * Works with Winston, Pino, and similar structured loggers
 * 
 * @example
 * // With Winston
 * import winston from 'winston';
 * import { createCommonLoggerAdapter, initRouterLogger } from '@cp/router/logging';
 * 
 * const winstonLogger = winston.createLogger({
 *   level: 'info',
 *   format: winston.format.json(),
 *   transports: [new winston.transports.Console()]
 * });
 * 
 * const loggerAdapter = createCommonLoggerAdapter(winstonLogger);
 * initRouterLogger({ logger: loggerAdapter });
 */
export function createCommonLoggerAdapter(logger: any): RouterLogger {
  // Check for common logger interfaces
  const hasLevelMethods = 
    typeof logger.debug === 'function' &&
    typeof logger.info === 'function' &&
    typeof logger.warn === 'function' &&
    typeof logger.error === 'function';
  
  if (hasLevelMethods) {
    // Standard logger with level methods (Winston, Pino, etc.)
    return {
      debug: (message, data) => logger.debug(message, { context: 'router', ...data }),
      info: (message, data) => logger.info(message, { context: 'router', ...data }),
      warn: (message, data) => logger.warn(message, { context: 'router', ...data }),
      error: (message, error, data) => logger.error(message, { 
        context: 'router', 
        error: error instanceof Error ? { 
          message: error.message, 
          stack: error.stack,
          name: error.name
        } : error,
        ...data 
      })
    };
  }
  
  // Check for loggers with a generic log method
  if (typeof logger.log === 'function') {
    return {
      debug: (message, data) => logger.log('debug', message, { context: 'router', ...data }),
      info: (message, data) => logger.log('info', message, { context: 'router', ...data }),
      warn: (message, data) => logger.log('warn', message, { context: 'router', ...data }),
      error: (message, error, data) => logger.log('error', message, { 
        context: 'router', 
        error: error instanceof Error ? { 
          message: error.message, 
          stack: error.stack,
          name: error.name
        } : error,
        ...data 
      })
    };
  }
  
  // Fallback: create a basic console logger with a warning
  console.warn('[Router] Unrecognized logger format. Using console logger instead.');
  return {
    debug: (message, data) => console.debug(`[Router] ${message}`, data || ''),
    info: (message, data) => console.info(`[Router] ${message}`, data || ''),
    warn: (message, data) => console.warn(`[Router] ${message}`, data || ''),
    error: (message, error, data) => console.error(`[Router] ${message}`, error || '', data || '')
  };
} 
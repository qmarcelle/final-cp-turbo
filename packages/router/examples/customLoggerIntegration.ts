/**
 * Custom Logger Integration Example
 * 
 * This example demonstrates how to integrate your existing logging package
 * with the router's logging system.
 */

// Import your custom logger (replace with your actual logger import)
// import { logger } from '@your-org/logger';

// Import router logging utilities
import { 
  createLoggerAdapter, 
  createCommonLoggerAdapter,
  initRouterLogger, 
  LogLevel,
  RouterEventType,
  getRouterLogger
} from '../src/logging';

// Mock CustomLogger class definition for example
class CustomLogger {
  debug(message: string, data?: any) { console.debug(message, data); }
  info(message: string, data?: any) { console.info(message, data); }
  warn(message: string, data?: any) { console.warn(message, data); }
  error(message: string, data?: any) { console.error(message, data); }
}

/**
 * Example 1: Direct adapter to your custom logger
 * 
 * Use this approach when your logger has a similar interface to what the router expects.
 */
export function integrateWithCustomLogger() {
  // Create a logger adapter that maps to your logger's methods
  const loggerAdapter = createLoggerAdapter({
    debug: (message, data) => {
      // Call your logger's debug method
      // logger.debug(message, data);
      console.debug('[Custom Logger]', message, data);
    },
    info: (message, data) => {
      // Call your logger's info method
      // logger.info(message, data);
      console.info('[Custom Logger]', message, data);
    },
    warn: (message, data) => {
      // Call your logger's warn method
      // logger.warn(message, data);
      console.warn('[Custom Logger]', message, data);
    },
    error: (message, error, data) => {
      // Call your logger's error method
      // logger.error(message, { error, ...data });
      console.error('[Custom Logger]', message, error, data);
    }
  });

  // Initialize the router logger with your custom adapter
  initRouterLogger({
    logger: loggerAdapter,
    minLevel: LogLevel.DEBUG, // Set the minimum log level
    logPerformance: true,     // Include performance metrics
    redactSensitiveInfo: true // Redact sensitive information
  });
}

/**
 * Example 2: Using the common logger adapter
 * 
 * Use this approach when your logger follows common patterns like Winston or Pino.
 */
export function integrateWithCommonLogger() {
  // Create your logger (this is just an example)
  // const customLogger = createYourLogger();
  
  // For this example, we'll create a mock logger that matches common patterns
  const mockCommonLogger = {
    debug: (message: string, meta?: any) => console.debug('[Mock Logger]', message, meta),
    info: (message: string, meta?: any) => console.info('[Mock Logger]', message, meta),
    warn: (message: string, meta?: any) => console.warn('[Mock Logger]', message, meta),
    error: (message: string, meta?: any) => console.error('[Mock Logger]', message, meta)
  };
  
  // Create an adapter for your common logger
  const loggerAdapter = createCommonLoggerAdapter(mockCommonLogger);
  
  // Initialize the router logger
  initRouterLogger({ logger: loggerAdapter });
}

/**
 * Example 3: Customizing log formatting
 * 
 * Use this approach when you want to customize how logs are formatted
 * before sending them to your logger.
 */
export function integrateWithCustomFormatting() {
  // Create a logger adapter with custom formatting
  const loggerAdapter = createLoggerAdapter({
    debug: (message, data) => {
      // Format the data as needed for your logging system
      const formattedData = formatDataForYourLogger(data);
      // logger.debug(`🔷 ${message}`, formattedData);
      console.debug(`🔷 ${message}`, formattedData);
    },
    info: (message, data) => {
      const formattedData = formatDataForYourLogger(data);
      // logger.info(`🔵 ${message}`, formattedData);
      console.info(`🔵 ${message}`, formattedData);
    },
    warn: (message, data) => {
      const formattedData = formatDataForYourLogger(data);
      // logger.warn(`🟠 ${message}`, formattedData);
      console.warn(`🟠 ${message}`, formattedData);
    },
    error: (message, error, data) => {
      const formattedData = formatDataForYourLogger({...data, error});
      // logger.error(`🔴 ${message}`, formattedData);
      console.error(`🔴 ${message}`, formattedData);
    }
  });
  
  // Initialize the router logger
  initRouterLogger({ logger: loggerAdapter });
}

/**
 * Helper function to format data for your logger
 */
function formatDataForYourLogger(data: any): any {
  // This is where you would transform the data to match your logger's expected format
  // For example, adding timestamps, correlation IDs, etc.
  return {
    ...data,
    timestamp: new Date().toISOString(),
    appName: 'broker-portal',
    component: 'router'
  };
}

/**
 * Example 4: Setting up in your application entry point
 */
export function setupInAppEntryPoint() {
  // Call this in your app's entry point (e.g., _app.tsx or layout.tsx)
  integrateWithCustomLogger();
  
  // Now all router navigation and data fetching will be logged through your custom logger
}

/**
 * Example showing how to integrate a custom logger with the router package
 */
export function CustomLoggerIntegration() {
  // Create a instance of the custom logger
  const customLogger = new CustomLogger();
  
  // Create a direct logger adapter instead of using createCommonLoggerAdapter with 2 arguments
  const loggerAdapter = createLoggerAdapter({
    debug: (message, data) => {
      const formattedMessage = `Router ${data?.type || ''} - ${data?.action || ''}: ${message}`;
      customLogger.debug(formattedMessage, {
        ...data,
        duration: data?.duration,
        timestamp: data?.timestamp ? new Date(data.timestamp) : new Date()
      });
    },
    info: (message, data) => {
      const formattedMessage = `Router ${data?.type || ''} - ${data?.action || ''}: ${message}`;
      customLogger.info(formattedMessage, {
        ...data,
        duration: data?.duration,
        timestamp: data?.timestamp ? new Date(data.timestamp) : new Date()
      });
    },
    warn: (message, data) => {
      const formattedMessage = `Router ${data?.type || ''} - ${data?.action || ''}: ${message}`;
      customLogger.warn(formattedMessage, {
        ...data,
        duration: data?.duration,
        timestamp: data?.timestamp ? new Date(data.timestamp) : new Date()
      });
    },
    error: (message, error, data) => {
      const formattedMessage = `Router ${data?.type || ''} - ${data?.action || ''}: ${message}`;
      customLogger.error(formattedMessage, {
        ...data,
        error,
        duration: data?.duration,
        timestamp: data?.timestamp ? new Date(data.timestamp) : new Date()
      });
    }
  });
  
  // Set the logger adapter as the router logger
  initRouterLogger({ logger: loggerAdapter });
  
  // Return a component that could demonstrate the logger
  return {
    testLogger: () => {
      // Log some example events - use the logger methods directly
      // instead of logEvent which doesn't exist
      loggerAdapter.info('Navigation', { 
        type: RouterEventType.NAVIGATION, 
        action: 'navigate',
        data: { path: '/test' },
        timestamp: Date.now(),
      });
      
      loggerAdapter.error('Navigation Error', new Error('Test error'), {
        type: RouterEventType.ERROR,
        action: 'navigation_error',
        data: { path: '/test' },
        timestamp: Date.now(),
      });
    }
  };
}

export default CustomLoggerIntegration; 
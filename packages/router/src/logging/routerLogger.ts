/**
 * Router logging integration
 * Provides standardized logging for router events with support for custom loggers
 */

/**
 * Log levels supported by the router logger
 */
export enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error'
}

/**
 * Router event types for logging
 */
export enum RouterEventType {
  NAVIGATION = 'navigation',
  MIDDLEWARE = 'middleware',
  DATA_FETCH = 'data_fetch',
  AUTH = 'auth',
  ERROR = 'error',
  PERFORMANCE = 'performance',
  UI = 'ui',
}

/**
 * Data structure for a router log event
 */
export interface RouterLogEvent {
  /** Type of router event */
  type: RouterEventType;
  
  /** Detailed action within the event type */
  action: string;
  
  /** Additional context data specific to the event */
  data?: Record<string, any>;
  
  /** Timestamp when the event occurred */
  timestamp: number;
  
  /** Duration of the event in milliseconds (for performance logging) */
  duration?: number;
  
  /** Error object if this is an error event */
  error?: Error | unknown;
}

/**
 * Interface for logger implementations
 * This allows users to inject their own logging solution
 */
export interface RouterLogger {
  debug(message: string, data?: Record<string, any>): void;
  info(message: string, data?: Record<string, any>): void;
  warn(message: string, data?: Record<string, any>): void;
  error(message: string, error?: Error | unknown, data?: Record<string, any>): void;
}

/**
 * Return type for data fetch logging
 */
export interface DataFetchLogCompletion {
  complete: (success: boolean, responseData?: any) => void;
}

/**
 * Default console logger implementation
 * Used as a fallback if no custom logger is provided
 */
export class ConsoleRouterLogger implements RouterLogger {
  debug(message: string, data?: Record<string, any>): void {
    console.debug(`[Router] ${message}`, data || '');
  }
  
  info(message: string, data?: Record<string, any>): void {
    console.info(`[Router] ${message}`, data || '');
  }
  
  warn(message: string, data?: Record<string, any>): void {
    console.warn(`[Router] ${message}`, data || '');
  }
  
  error(message: string, error?: Error | unknown, data?: Record<string, any>): void {
    console.error(`[Router] ${message}`, error || '', data || '');
  }
}

/**
 * Router logger configuration
 */
export interface RouterLoggerConfig {
  /** Custom logger implementation */
  logger?: RouterLogger;
  
  /** Minimum log level to capture */
  minLevel?: LogLevel;
  
  /** Whether to include performance metrics */
  logPerformance?: boolean;
  
  /** Whether to include navigation parameters in logs */
  logNavigationParams?: boolean;
  
  /** Whether to redact sensitive information in logs */
  redactSensitiveInfo?: boolean;
}

/**
 * Default configuration values
 */
const DEFAULT_CONFIG: RouterLoggerConfig = {
  logger: new ConsoleRouterLogger(),
  minLevel: LogLevel.INFO,
  logPerformance: true,
  logNavigationParams: true,
  redactSensitiveInfo: true
};

/**
 * Sensitive parameter names that should be redacted
 */
const SENSITIVE_PARAMS = ['password', 'token', 'secret', 'key', 'auth', 'credential'];

/**
 * Global router logger instance
 */
let routerLoggerInstance: RouterLoggerService | undefined;

/**
 * Core router logger service
 */
export class RouterLoggerService {
  private config: RouterLoggerConfig;
  private logger: RouterLogger;
  
  constructor(config: RouterLoggerConfig = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.logger = this.config.logger || new ConsoleRouterLogger();
  }
  
  /**
   * Log a router event
   */
  logEvent(event: RouterLogEvent, level: LogLevel = LogLevel.INFO): void {
    // Check if this level should be logged
    if (!this.shouldLog(level)) {
      return;
    }
    
    // Process and sanitize the event data
    const processedEvent = this.processEvent(event);
    
    // Format the log message
    const message = this.formatMessage(processedEvent);
    
    // Log at the appropriate level
    switch (level) {
      case LogLevel.DEBUG:
        this.logger.debug(message, processedEvent.data);
        break;
      case LogLevel.INFO:
        this.logger.info(message, processedEvent.data);
        break;
      case LogLevel.WARN:
        this.logger.warn(message, processedEvent.data);
        break;
      case LogLevel.ERROR:
        this.logger.error(message, processedEvent.error, processedEvent.data);
        break;
    }
  }
  
  /**
   * Log a navigation event
   */
  logNavigation(from: string, to: string, params?: Record<string, any>): void {
    const start = performance.now();
    
    // Store the navigation start time so we can calculate duration later
    const navigationData: Record<string, any> = { from, to };
    
    // Include parameters if configured and provided
    if (this.config.logNavigationParams && params) {
      navigationData.params = this.config.redactSensitiveInfo 
        ? this.redactSensitiveData(params)
        : params;
    }
    
    // Log the initial navigation event
    this.logEvent({
      type: RouterEventType.NAVIGATION,
      action: 'start',
      data: navigationData,
      timestamp: Date.now()
    }, LogLevel.DEBUG);
    
    // Schedule logging of navigation completion
    // This is done after the current execution context to allow for async navigation
    setTimeout(() => {
      const end = performance.now();
      this.logEvent({
        type: RouterEventType.NAVIGATION,
        action: 'complete',
        data: navigationData,
        timestamp: Date.now(),
        duration: end - start
      });
    }, 0);
  }
  
  /**
   * Log a navigation error
   */
  logNavigationError(from: string, to: string, error: Error | unknown, params?: Record<string, any>): void {
    const navigationData: Record<string, any> = { from, to };
    
    // Include parameters if configured and provided
    if (this.config.logNavigationParams && params) {
      navigationData.params = this.config.redactSensitiveInfo 
        ? this.redactSensitiveData(params)
        : params;
    }
    
    this.logEvent({
      type: RouterEventType.ERROR,
      action: 'navigation_failed',
      data: navigationData,
      timestamp: Date.now(),
      error
    }, LogLevel.ERROR);
  }
  
  /**
   * Log a data fetching event
   * @returns An object with a complete method to call when the fetch is complete
   */
  logDataFetch(url: string, options?: Record<string, any>, cacheHit?: boolean): DataFetchLogCompletion {
    const start = performance.now();
    
    const fetchData = { 
      url,
      cacheHit,
      options: options ? (this.config.redactSensitiveInfo 
        ? this.redactSensitiveData(options) 
        : options) : undefined
    };
    
    // Log the start of data fetching
    this.logEvent({
      type: RouterEventType.DATA_FETCH,
      action: 'start',
      data: fetchData,
      timestamp: Date.now()
    }, LogLevel.DEBUG);
    
    // Return a function to log completion
    return {
      complete: (success: boolean, responseData?: any) => {
        const end = performance.now();
        this.logEvent({
          type: RouterEventType.DATA_FETCH,
          action: success ? 'success' : 'failed',
          data: { 
            ...fetchData,
            responseSize: responseData ? JSON.stringify(responseData).length : 0,
            success
          },
          timestamp: Date.now(),
          duration: end - start
        }, success ? LogLevel.DEBUG : LogLevel.WARN);
      }
    };
  }
  
  /**
   * Log a middleware execution event
   */
  logMiddleware(type: string, path: string, result: string): void {
    this.logEvent({
      type: RouterEventType.MIDDLEWARE,
      action: type,
      data: {
        path,
        result
      },
      timestamp: Date.now()
    });
  }
  
  /**
   * Log an authentication event
   */
  logAuth(action: string, success: boolean, data?: Record<string, any>): void {
    this.logEvent({
      type: RouterEventType.AUTH,
      action,
      data: {
        success,
        ...(data ? (this.config.redactSensitiveInfo 
          ? this.redactSensitiveData(data) 
          : data) : {})
      },
      timestamp: Date.now()
    }, success ? LogLevel.INFO : LogLevel.WARN);
  }
  
  /**
   * Private helper methods
   */
  
  /**
   * Check if a log level should be logged based on configuration
   */
  private shouldLog(level: LogLevel): boolean {
    const levelPriority = {
      [LogLevel.DEBUG]: 0,
      [LogLevel.INFO]: 1,
      [LogLevel.WARN]: 2,
      [LogLevel.ERROR]: 3
    };
    
    return levelPriority[level] >= levelPriority[this.config.minLevel || LogLevel.INFO];
  }
  
  /**
   * Process and sanitize event data
   */
  private processEvent(event: RouterLogEvent): RouterLogEvent {
    // Deep clone to avoid modifying the original
    const processedEvent = JSON.parse(JSON.stringify(event)) as RouterLogEvent;
    
    // Redact sensitive data if configured
    if (this.config.redactSensitiveInfo && processedEvent.data) {
      processedEvent.data = this.redactSensitiveData(processedEvent.data);
    }
    
    return processedEvent;
  }
  
  /**
   * Format a log message from an event
   */
  private formatMessage(event: RouterLogEvent): string {
    const { type, action, duration } = event;
    
    let message = `${type.toUpperCase()} - ${action}`;
    
    // Add duration for performance logs
    if (duration !== undefined && this.config.logPerformance) {
      message += ` (${duration.toFixed(2)}ms)`;
    }
    
    return message;
  }
  
  /**
   * Redact sensitive data from objects
   */
  private redactSensitiveData(data: Record<string, any>): Record<string, any> {
    const result: Record<string, any> = {};
    
    Object.keys(data).forEach(key => {
      // Check if this key should be redacted
      const isKeyValueSensitive = 
        SENSITIVE_PARAMS.some(param => key.toLowerCase().includes(param.toLowerCase()));
      
      if (isKeyValueSensitive) {
        // Redact sensitive values
        result[key] = '[REDACTED]';
      } else if (typeof data[key] === 'object' && data[key] !== null) {
        // Recursively redact nested objects
        result[key] = this.redactSensitiveData(data[key]);
      } else {
        // Keep non-sensitive values as is
        result[key] = data[key];
      }
    });
    
    return result;
  }
}

/**
 * Create or retrieve the router logger instance
 */
export function getRouterLogger(config?: RouterLoggerConfig): RouterLoggerService {
  if (!routerLoggerInstance) {
    routerLoggerInstance = new RouterLoggerService(config);
  } else if (config) {
    // If config is provided but instance exists, create a new instance
    routerLoggerInstance = new RouterLoggerService(config);
  }
  
  return routerLoggerInstance;
}

/**
 * Initialize the router logger with a custom configuration
 */
export function initRouterLogger(config: RouterLoggerConfig): RouterLoggerService {
  routerLoggerInstance = new RouterLoggerService(config);
  return routerLoggerInstance;
} 
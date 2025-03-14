import pino, { Logger, LoggerOptions } from 'pino';

/**
 * Log levels mapping
 */
export enum LogLevel {
  TRACE = 'trace',
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
  FATAL = 'fatal',
  SILENT = 'silent'
}

/**
 * Default logger options
 */
const DEFAULT_OPTIONS: LoggerOptions = {
  level: process.env.LOG_LEVEL || 'info',
  redact: {
    paths: [
      'password',
      'passwordConfirmation',
      'secret',
      'token',
      'authorization',
      '*.password',
      '*.passwordConfirmation',
      '*.secret',
      '*.token',
      '*.authorization',
      'req.headers.authorization',
      'req.headers.cookie'
    ],
    remove: true
  },
  timestamp: true
};

/**
 * Environment-specific transport configuration
 */
const getTransport = () => {
  // In development, use pretty-print
  if (process.env.NODE_ENV !== 'production') {
    return {
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'SYS:standard',
          ignore: 'pid,hostname'
        }
      }
    };
  }
  
  // In production, use JSON format
  return {};
};

/**
 * Create a logger instance with the given options
 */
export function createLogger(options: LoggerOptions = {}): Logger {
  // Combine default options with provided options
  const mergedOptions = {
    ...DEFAULT_OPTIONS,
    ...getTransport(),
    ...options
  };

  // Create and return the Pino logger instance
  return pino(mergedOptions);
}

/**
 * Default logger instance
 */
export const logger = createLogger({
  name: 'app'
}); 
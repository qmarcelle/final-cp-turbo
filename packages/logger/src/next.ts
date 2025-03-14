import type { NextApiRequest, NextApiResponse } from 'next';
import { createLogger } from './logger';
import type { Logger } from 'pino';

/**
 * Next.js middleware for logging API requests
 */
export function withLogging<T = any>(
  handler: (req: NextApiRequest & { log: Logger }, res: NextApiResponse<T>) => Promise<void> | void
) {
  return async (req: NextApiRequest, res: NextApiResponse<T>) => {
    // Create request-specific logger with request ID
    const requestId = req.headers['x-request-id'] || req.headers['x-correlation-id'] || crypto.randomUUID();
    
    const log = createLogger({
      name: 'api',
      reqId: typeof requestId === 'string' ? requestId : requestId[0],
      req: {
        id: requestId,
        method: req.method,
        url: req.url,
        // Only include basic headers to avoid leaking sensitive information
        headers: {
          host: req.headers.host,
          referer: req.headers.referer,
          'user-agent': req.headers['user-agent']
        }
      }
    });

    // Start timer for response time calculation
    const startTime = performance.now();

    // Attach logger to request object
    (req as any).log = log;

    // Log the start of the request
    log.info({ 
      msg: `Incoming request: ${req.method} ${req.url}`,
      type: 'request_start'
    });

    // Handle response completion
    res.on('finish', () => {
      const responseTime = Math.round(performance.now() - startTime);
      
      const logMethod = res.statusCode >= 400 ? log.error : log.info;
      
      logMethod.call(log, { 
        msg: `Request completed: ${req.method} ${req.url} ${res.statusCode} (${responseTime}ms)`,
        type: 'request_complete',
        res: {
          statusCode: res.statusCode,
          responseTime
        }
      });
    });

    // Execute the API route handler
    return handler(req as any, res);
  };
}

/**
 * Get a logger for client-side usage
 */
export function getClientLogger(module: string) {
  if (typeof window !== 'undefined') {
    // Client-side implementation
    return {
      trace: (message: string, ...args: any[]) => console.trace(`[${module}] ${message}`, ...args),
      debug: (message: string, ...args: any[]) => console.debug(`[${module}] ${message}`, ...args),
      info: (message: string, ...args: any[]) => console.info(`[${module}] ${message}`, ...args),
      warn: (message: string, ...args: any[]) => console.warn(`[${module}] ${message}`, ...args),
      error: (message: string, ...args: any[]) => console.error(`[${module}] ${message}`, ...args),
      fatal: (message: string, ...args: any[]) => console.error(`[FATAL][${module}] ${message}`, ...args),
      // Add support for object-based logging
      child: () => getClientLogger(module)
    };
  }
  
  // Server-side implementation - use actual Pino logger
  return createLogger({ name: module });
} 
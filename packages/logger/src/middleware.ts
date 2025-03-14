import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createLogger } from './logger';

// Logger for HTTP requests
const httpLogger = createLogger({ name: 'http' });

/**
 * Next.js middleware for logging HTTP requests
 */
export function withRequestLogging(middleware: (request: NextRequest) => NextResponse | Promise<NextResponse>) {
  return async (request: NextRequest) => {
    // Generate a unique ID for this request
    const requestId = request.headers.get('x-request-id') || 
                     request.headers.get('x-correlation-id') || 
                     crypto.randomUUID();
    
    // Create request-specific context
    const requestLogger = httpLogger.child({
      reqId: requestId,
      req: {
        id: requestId,
        method: request.method,
        url: request.url,
        headers: {
          host: request.headers.get('host'),
          referer: request.headers.get('referer'),
          'user-agent': request.headers.get('user-agent')
        }
      }
    });
    
    // Log the request
    const startTime = performance.now();
    requestLogger.info({
      msg: `Incoming request: ${request.method} ${request.nextUrl.pathname}`,
      type: 'http_request'
    });
    
    try {
      // Execute the middleware
      const response = await middleware(request);
      
      // Calculate response time
      const responseTime = Math.round(performance.now() - startTime);
      
      // Log the response
      const logMethod = response.status >= 400 ? requestLogger.error : requestLogger.info;
      logMethod.call(requestLogger, {
        msg: `Response: ${request.method} ${request.nextUrl.pathname} ${response.status} (${responseTime}ms)`,
        type: 'http_response',
        res: {
          status: response.status,
          responseTime
        }
      });
      
      // Add the request ID to the response headers
      response.headers.set('x-request-id', requestId.toString());
      
      return response;
    } catch (error) {
      // Log errors
      requestLogger.error({
        msg: `Error processing request: ${request.method} ${request.nextUrl.pathname}`,
        type: 'http_error',
        error: {
          message: (error as Error).message,
          stack: process.env.NODE_ENV !== 'production' ? (error as Error).stack : undefined
        }
      });
      
      // Re-throw the error
      throw error;
    }
  };
}

/**
 * Utility for logging errors in the global error boundary
 */
export function logErrorBoundary(error: Error, componentStack?: string) {
  const logger = createLogger({ name: 'error-boundary' });
  
  logger.error({
    msg: `Error in React component: ${error.message}`,
    type: 'react_error',
    error: {
      name: error.name,
      message: error.message,
      stack: process.env.NODE_ENV !== 'production' ? error.stack : undefined
    },
    component: componentStack
  });
} 
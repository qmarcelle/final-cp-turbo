# @portals/logger

A shared logging library for Consumer Portals applications.

## Overview

This package provides a centralized, consistent logging solution for all portal applications. It's built on top of Pino, offering structured logging with various output formats and log levels.

## Features

- **Structured Logging**: JSON-formatted logs for better parsing and analysis
- **Log Levels**: Support for different log levels (trace, debug, info, warn, error, fatal)
- **Context Enrichment**: Ability to add context to logs (user info, correlation IDs, etc.)
- **Pretty Printing**: Human-readable logs in development
- **Next.js Integration**: Seamless integration with Next.js applications
- **Performance**: High-performance logging with minimal overhead

## Installation

```bash
# Install in a portal application
pnpm add @portals/logger
```

## Usage

### Basic Usage

```typescript
import { createLogger } from '@portals/logger';

// Create a logger instance
const logger = createLogger({
  name: 'my-component',
  level: 'info',
});

// Use the logger
logger.info('Application started');
logger.error('An error occurred', { error: new Error('Failed to fetch data') });
logger.debug('Debug information', { requestId: '123', userId: 'user-456' });
```

### With Request Context

```typescript
import { createLogger, withRequest } from '@portals/logger';
import type { NextApiRequest } from 'next';

const logger = createLogger({ name: 'api' });

export default function handler(req: NextApiRequest, res) {
  // Enhance logger with request context
  const requestLogger = withRequest(logger, req);
  
  requestLogger.info('Processing request');
  
  // Log includes request info like method, url, headers, etc.
  try {
    // Process request
    res.status(200).json({ success: true });
  } catch (error) {
    requestLogger.error('Request failed', { error });
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
```

### In Next.js App Router

```typescript
// app/api/example/route.ts
import { createLogger } from '@portals/logger';
import { NextRequest, NextResponse } from 'next/server';

const logger = createLogger({ name: 'api-route' });

export async function GET(request: NextRequest) {
  const requestId = request.headers.get('x-request-id') || 'unknown';
  
  logger.info('Handling GET request', { requestId, path: request.nextUrl.pathname });
  
  try {
    // Handle request
    return NextResponse.json({ success: true });
  } catch (error) {
    logger.error('Error handling request', { 
      requestId,
      error: error instanceof Error ? error.message : String(error),
    });
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
```

## Configuration

The logger can be configured with various options:

```typescript
import { createLogger } from '@portals/logger';

const logger = createLogger({
  name: 'service-name',       // Service name for log identification
  level: 'debug',             // Log level (trace, debug, info, warn, error, fatal)
  pretty: true,               // Enable pretty printing for development
  baseContext: {              // Base context added to all logs
    environment: process.env.NODE_ENV,
    version: process.env.APP_VERSION,
  },
  destination: process.stdout // Output destination
});
```

## API Reference

### Core Functions

#### `createLogger(options)`

Creates a new logger instance.

**Options:**

- `name`: Logger name (string)
- `level`: Log level (string, default: 'info')
- `pretty`: Enable pretty printing (boolean, default: development mode)
- `baseContext`: Base context for all logs (object)
- `destination`: Output destination (stream)

#### `withContext(logger, context)`

Creates a child logger with additional context.

```typescript
const userLogger = withContext(logger, { userId: '123', role: 'admin' });
userLogger.info('User action'); // Includes userId and role in log
```

#### `withRequest(logger, req)`

Creates a child logger with request context.

```typescript
const requestLogger = withRequest(logger, req);
```

### Log Levels

In order of increasing severity:

1. `trace`: Very detailed information
2. `debug`: Debugging information
3. `info`: General information (default)
4. `warn`: Warning conditions
5. `error`: Error conditions
6. `fatal`: Critical conditions

## Best Practices

### Log Structure

Maintain consistent log structure:

```typescript
// Good
logger.info('User authenticated', { userId, role });

// Avoid
logger.info(`User ${userId} with role ${role} authenticated`);
```

### Log Levels

Use appropriate log levels:

- `trace`: For very detailed debugging
- `debug`: Internal flows useful during development
- `info`: Normal operation information
- `warn`: Potential issues that don't affect operation
- `error`: Issues that affect functionality
- `fatal`: Critical issues that require immediate attention

### Sensitive Information

Avoid logging sensitive information:

```typescript
// Bad
logger.info('User logged in', { password: 'secret123' });

// Good
logger.info('User logged in', { userId: 'user-123' });
```

### Error Logging

Log full error context:

```typescript
try {
  // Operation
} catch (error) {
  logger.error('Operation failed', { 
    error: error instanceof Error ? error.message : String(error),
    stack: error instanceof Error ? error.stack : undefined,
    operationId: '123',
  });
}
```

## Integration with Monitoring Systems

The structured JSON logs can be easily integrated with monitoring systems:

```typescript
// Configure for specific monitoring systems
const logger = createLogger({
  name: 'my-service',
  baseContext: {
    // Add fields required by your monitoring system
    service: 'portal-api',
    hostId: process.env.HOST_ID,
  }
});
```

## Contributing

Please refer to the main repository's contributing guidelines.

## License

Proprietary and Confidential 
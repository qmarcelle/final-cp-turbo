# @portals/logger

Structured logging library for Consumer Portals applications.

## Overview

High-performance logging built on Pino, providing JSON-structured logs with context enrichment and Next.js integration.

## Features

- **Structured Logging**: JSON format for better parsing and analysis
- **Context Enrichment**: Add user info, request IDs, and custom context
- **Performance**: Minimal overhead with async logging
- **Next.js Integration**: Works seamlessly with App Router and API routes
- **Pretty Development**: Human-readable logs in development mode

## Quick Start

```bash
pnpm add @portals/logger
```

```typescript
import { createLogger } from '@portals/logger'

const logger = createLogger({ name: 'my-service' })

logger.info('User logged in', { userId: '123', role: 'broker' })
logger.error('Database connection failed', { error: err.message })
```

## Usage Patterns

### Basic Logging

```typescript
import { createLogger } from '@portals/logger'

const logger = createLogger({
  name: 'api-service',
  level: 'info', // trace, debug, info, warn, error, fatal
  baseContext: {
    environment: process.env.NODE_ENV,
    version: process.env.APP_VERSION,
  }
})

// Log with structured data
logger.info('Processing request', { requestId: '123', path: '/api/members' })
logger.warn('Slow query detected', { duration: 2500, query: 'SELECT...' })
logger.error('Payment failed', { userId, amount, error: err.message })
```

### Next.js API Routes

```typescript
// app/api/example/route.ts
import { createLogger } from '@portals/logger'
import { NextRequest, NextResponse } from 'next/server'

const logger = createLogger({ name: 'api' })

export async function GET(request: NextRequest) {
  const requestId = request.headers.get('x-request-id') || crypto.randomUUID()
  
  logger.info('Handling GET request', { 
    requestId, 
    path: request.nextUrl.pathname 
  })
  
  try {
    // Process request...
    return NextResponse.json({ success: true })
  } catch (error) {
    logger.error('Request failed', { 
      requestId,
      error: error instanceof Error ? error.message : String(error)
    })
    return NextResponse.json(
      { error: 'Internal Server Error' }, 
      { status: 500 }
    )
  }
}
```

### Context Enhancement

```typescript
import { createLogger, withContext } from '@portals/logger'

const baseLogger = createLogger({ name: 'user-service' })

// Create child logger with persistent context
const userLogger = withContext(baseLogger, { 
  userId: '123', 
  sessionId: 'abc-def' 
})

// All logs will include userId and sessionId
userLogger.info('Profile updated')
userLogger.warn('Password change attempted')
```

## Log Levels

Use appropriate levels for different scenarios:

- **trace**: Very detailed debugging (performance sensitive operations)
- **debug**: Debugging information useful during development
- **info**: Normal operation events (user actions, system events)
- **warn**: Potential issues that don't break functionality
- **error**: Error conditions that affect functionality
- **fatal**: Critical issues requiring immediate attention

## Best Practices

### Structure Your Logs

```typescript
// ✅ Good - structured data
logger.info('User authenticated', { userId, role, method: 'oauth' })

// ❌ Avoid - string interpolation
logger.info(`User ${userId} authenticated with ${role}`)
```

### Handle Errors Properly

```typescript
// ✅ Good - include error context
try {
  await processPayment(amount)
} catch (error) {
  logger.error('Payment processing failed', {
    amount,
    userId,
    error: error.message,
    stack: error.stack
  })
}
```

### Never Log Sensitive Data

```typescript
// ❌ Bad - exposes sensitive information
logger.info('User login', { password: 'secret123', ssn: '123-45-6789' })

// ✅ Good - log only necessary info
logger.info('User login', { userId, timestamp: Date.now() })
```

## Complete Configuration

For detailed configuration options, logging strategies, and monitoring integration:

**[→ Development Guide](../../docs/development.md)** 
# @portals/api-client

Centralized API client and mocking utilities for all Consumer Portals applications.

## Features

- **Unified API Client**: Single source of truth for backend API calls
- **Mock Service Worker**: Built-in API mocking for development and testing
- **TypeScript First**: Full type safety for both real and mocked APIs

## Installation

```bash
pnpm add @portals/api-client
```

## Basic Usage

### Real API Calls

```typescript
import { apiClient } from '@portals/api-client'

// Make authenticated API requests
const members = await apiClient.members.search('John Doe')
```

### API Mocking

For development and testing, this package includes MSW (Mock Service Worker) setup:

```typescript
// Enable mocking in your app
import { startMocking } from '@portals/api-client/mocks'

if (process.env.NODE_ENV === 'development') {
  startMocking()
}
```

## Complete Setup Guide

This package provides the foundation for API mocking across all portal applications. For detailed setup instructions, configuration options, and best practices, see:

**[→ MSW Setup Guide](../../docs/msw-setup.md)**

The guide covers:
- Setting up MSW in Next.js apps
- Testing with mocked APIs
- Adding custom handlers
- Debugging and troubleshooting

## Available Mock Endpoints

Pre-configured mocks include:
- Authentication (`/api/auth/*`)
- Member management (`/api/members/*`)
- Claims and prior authorizations
- Broker operations and reporting

## Architecture Benefits

- **Single Source**: API client and mocks in one place
- **Reusable**: Share mocks between development and testing
- **Type Safe**: TypeScript support throughout
- **Flexible**: Easy to customize for specific scenarios 
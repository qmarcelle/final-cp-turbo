# @portals/testing

Shared testing utilities and configurations for Consumer Portals applications.

## What's Included

- **Jest Configuration**: Pre-configured Jest setup for unit and integration tests
- **MSW Integration**: API mocking setup for testing environments
- **Testing Utilities**: Helper functions and custom matchers
- **Next.js Mocks**: Common mocks for Next.js components and modules

## Quick Start

```bash
# Install in your app
pnpm add -D @portals/testing

# Import configurations
import { jestConfig } from '@portals/testing'
import { setupMswForTests } from '@portals/testing'
```

## Testing Strategy

We follow a comprehensive testing pyramid:

1. **Unit Tests** - Individual components and functions (Jest + Testing Library)
2. **Integration Tests** - Multi-component interactions
3. **E2E Tests** - Complete user workflows (set up separately in each app)

## Complete Testing Guide

For detailed testing strategies, best practices, and examples, see:

**[→ Testing Guide](../../docs/testing.md)**

The guide covers:
- Testing patterns and best practices
- Component testing strategies
- API mocking with MSW
- E2E testing workflows
- Debugging and troubleshooting

## API Mocking

This package includes MSW setup for testing environments. For development mocking, see `@portals/api-client`.

For complete MSW setup and usage:

**[→ MSW Setup Guide](../../docs/msw-setup.md)**

## Architecture

- **Shared Configs**: Consistent testing setup across all apps
- **Reusable Utilities**: Common testing helpers and matchers
- **MSW Integration**: Unified API mocking for predictable tests
- **TypeScript Support**: Full type safety in test environments

> **Note**: For Cypress E2E testing, set up Cypress directly in your application as testing needs vary significantly between apps.

# Testing Guide

## Overview

Our testing strategy focuses on practical, maintainable tests that actually help catch bugs and improve confidence in deployments. We've learned that over-engineering testing infrastructure often creates more problems than it solves.

## Testing Philosophy

**Keep it simple.** We use battle-tested tools and avoid exotic setups. The goal is to write tests that developers actually want to maintain, not impressive configurations that break constantly.

**Test what matters.** Focus on user-facing functionality and critical business logic. Don't test implementation details or third-party libraries.

**Fast feedback loops.** Tests should run quickly and give clear feedback when something breaks.

## Architecture

### Centralized Testing Utilities (`@portals/testing`)

We maintain a shared testing package for common utilities, configurations, and helpers. This keeps individual apps lean while ensuring consistency.

**What's included:**
- Jest configuration with sensible defaults
- MSW integration for API mocking  
- Testing utilities and custom matchers
- Next.js-specific mocks

**What's NOT included:**
- Cypress configurations (too app-specific)
- Complex test orchestration
- Framework-specific setup that changes frequently

### Why No Shared Cypress?

After trying to centralize Cypress setup, we learned it's better handled per-app. Each portal has different:
- Authentication flows
- Routing patterns  
- External integrations
- Performance requirements

Apps set up their own Cypress configurations as needed. This avoids the headache of trying to make one config work for everyone.

## Testing Levels

### Unit Tests
**Tool:** Jest + Testing Library  
**Purpose:** Test individual functions and components in isolation  
**Location:** `*.test.ts` or `*.test.tsx` files next to source code

```typescript
// Simple, focused tests
import { render, screen } from '@portals/testing'
import { Button } from './Button'

test('button renders with correct text', () => {
  render(<Button>Click me</Button>)
  expect(screen.getByRole('button')).toHaveTextContent('Click me')
})
```

### Integration Tests  
**Tool:** Jest + Testing Library + MSW  
**Purpose:** Test how components work together and with APIs  
**Location:** `*.integration.test.ts` files or dedicated test directories

```typescript
import { setupMswForTests } from '@portals/testing'

beforeAll(() => setupMswForTests())

test('form submission updates member data', async () => {
  // Test real user workflows
})
```

### End-to-End Tests
**Tool:** Cypress (app-specific setup)  
**Purpose:** Test critical user journeys in production-like environments  
**Location:** Per-app `cypress/` directories

Set up Cypress directly in each app. The testing package provides MSW helpers that work with Cypress if needed.

## API Mocking Strategy

We use Mock Service Worker (MSW) for consistent API mocking across development, testing, and Storybook. See the [MSW Setup Guide](./msw-setup.md) for details.

**Key principle:** Mock at the network level, not the component level. This means your tests run against the same API interface your production code uses.

## Getting Started

### In Your App

1. **Install dependencies:**
```bash
pnpm add -D @portals/testing jest @testing-library/react
```

2. **Create Jest config:**
```javascript
// jest.config.js
import { jestConfig } from '@portals/testing'

export default {
  ...jestConfig,
  // Add app-specific overrides if needed
}
```

3. **Write tests:**
```bash
# Run tests
pnpm test

# Run tests in watch mode  
pnpm test:watch

# Run with coverage
pnpm test:coverage
```

### Common Patterns

**Testing forms:**
```typescript
import { fireEvent, waitFor } from '@portals/testing'

test('form validates required fields', async () => {
  render(<MemberForm />)
  
  fireEvent.click(screen.getByRole('button', { name: /submit/i }))
  
  await waitFor(() => {
    expect(screen.getByText(/email is required/i)).toBeInTheDocument()
  })
})
```

**Testing with API calls:**
```typescript
import { setupMswForTests } from '@portals/testing'

beforeAll(() => setupMswForTests())

test('loads member data on mount', async () => {
  render(<MemberDetails memberId="123" />)
  
  await waitFor(() => {
    expect(screen.getByText('John Doe')).toBeInTheDocument()
  })
})
```

## Best Practices

### Do
- Test user behavior, not implementation
- Use descriptive test names that explain the scenario
- Keep tests focused on one thing
- Mock external dependencies consistently
- Run tests as part of CI/CD pipeline

### Don't  
- Test third-party library internals
- Mock everything - test real integrations when possible
- Write tests that break when you refactor code structure
- Ignore flaky tests - fix them or remove them
- Over-engineer test infrastructure

## Debugging Tests

**Common issues:**

1. **Tests timing out:** Usually async/await issues or missing MSW handlers
2. **Tests flaky on CI:** Often timing-related - use `waitFor` instead of fixed delays  
3. **Tests breaking on refactor:** You're testing implementation details, not user behavior
4. **Slow test suite:** Too many integration tests, consider more unit tests

**Useful commands:**
```bash
# Debug specific test
pnpm test -- --testNamePattern="loads member data"

# Run tests with more verbose output
pnpm test -- --verbose

# Update snapshots 
pnpm test -- --updateSnapshot
```

## CI/CD Integration

Tests run automatically in our Azure DevOps pipeline (see azure-pipelines.yml):

1. **On PR:** Unit and integration tests for changed packages
2. **Security audit:** `pnpm audit --audit-level=moderate`
3. **Type checking:** `pnpm check-types`
4. **Linting:** `pnpm lint`
5. **Coverage:** `pnpm test:coverage`
2. **On merge:** Full test suite across all packages
3. **Nightly:** E2E tests against staging environment

Failed tests block deployments. This has saved us from several production issues.

---

> **Remember:** Good tests give you confidence to ship changes quickly. If your tests are slowing you down or breaking constantly, they're probably testing the wrong things. 
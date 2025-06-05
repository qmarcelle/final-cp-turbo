# MSW Removal Notice

## Why MSW Was Removed

Mock Service Worker (MSW) has been removed from the testing package due to significant compatibility issues with Next.js 14+ and the App Router:

### Known Issues:
- **Race conditions**: MSW service worker registration races with application startup
- **App Router compatibility**: Persistent issues with Next.js App Router request interception
- **Development instability**: Unpredictable behavior in development environment
- **Complex workarounds**: Required complex configuration that was unreliable

### Reference Issues:
- [MSW GitHub Discussion #1049](https://github.com/mswjs/msw/discussions/1049)
- [Next.js 14.2.1+ compatibility issues](https://github.com/nextauthjs/next-auth/issues/10585)

## Alternative Testing Strategies

### 1. API Route Testing
Test your API routes directly without mocking:

```typescript
// __tests__/api/users.test.ts
import { createMocks } from 'node-mocks-http';
import handler from '../../pages/api/users';

describe('/api/users', () => {
  test('GET returns users', async () => {
    const { req, res } = createMocks({
      method: 'GET',
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    const data = JSON.parse(res._getData());
    expect(data).toHaveProperty('users');
  });
});
```

### 2. Component Testing with Mocked Fetch
Mock fetch calls at the component level:

```typescript
// __tests__/components/UserList.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import UserList from '../components/UserList';

// Mock fetch globally
global.fetch = jest.fn();

describe('UserList', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  test('displays users after loading', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ users: [{ id: 1, name: 'John' }] }),
    });

    render(<UserList />);

    await waitFor(() => {
      expect(screen.getByText('John')).toBeInTheDocument();
    });
  });
});
```

### 3. E2E Testing with Controlled Data
Use Playwright or Cypress with test databases:

```typescript
// e2e/users.spec.ts
import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  // Seed test database
  await setupTestData();
});

test('user list displays correctly', async ({ page }) => {
  await page.goto('/users');
  await expect(page.getByText('John Doe')).toBeVisible();
});
```

### 4. Next.js API Route Handlers Testing
For App Router API routes:

```typescript
// __tests__/app/api/users/route.test.ts
import { GET } from '../../../app/api/users/route';
import { NextRequest } from 'next/server';

describe('/api/users route', () => {
  test('GET returns users', async () => {
    const request = new NextRequest('http://localhost:3000/api/users');
    const response = await GET(request);
    
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data).toHaveProperty('users');
  });
});
```

## Recommended Testing Stack

1. **Unit Tests**: Jest + React Testing Library
2. **Integration Tests**: Next.js API route testing
3. **E2E Tests**: Playwright with test databases
4. **Visual Regression**: Chromatic or similar tools

This approach provides more reliable and maintainable testing without the complexity and issues of MSW.
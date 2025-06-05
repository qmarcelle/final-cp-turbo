# Mock Service Worker (MSW) Setup Guide

This guide shows how to use Mock Service Worker (MSW) for API mocking across Consumer Portals applications.

## Overview

MSW is configured at the **package level** in `@portals/api-client` following industry best practices. This approach provides:

- ✅ **Single source of truth** for API definitions and mocks
- ✅ **Reusability** across development, testing, and Storybook
- ✅ **Better organization** - mocks live with the API client
- ✅ **Type safety** with shared TypeScript interfaces

## Architecture

```
@portals/api-client/
├── src/
│   ├── mocks/
│   │   ├── handlers.ts     # API endpoint handlers
│   │   ├── browser.ts      # Browser MSW setup  
│   │   ├── server.ts       # Node.js MSW setup
│   │   └── index.ts        # Exports
│   ├── mocks.ts           # Main mocks entry point
│   └── index.ts           # API client exports
```

## Quick Start

### 1. Install MSW in Your Portal App

```bash
cd apps/your-portal
pnpm add -D msw
npx msw init public/ --save
```

### 2. Enable Mocking in Development

Add to your `.env.local`:

```env
NEXT_PUBLIC_ENABLE_MSW=true
```

### 3. Configure App Entry Point

Update your app's layout file (e.g., `apps/your-portal/src/app/layout.tsx`):

```tsx
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

// Enable MSW in development
if (process.env.NEXT_PUBLIC_ENABLE_MSW === 'true' && typeof window !== 'undefined') {
  import('@portals/api-client/mocks').then(async ({ startMocking }) => {
    await startMocking()
  })
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
```

### 4. Using Mocked APIs

Now any component making API calls will use mocked data:

```tsx
// Example: Member search component
import { useEffect, useState } from 'react'

export function MemberSearch() {
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(false)

  const searchMembers = async (query: string) => {
    setLoading(true)
    try {
      // This will hit the MSW handler instead of real API
      const response = await fetch(`/api/members/search?q=${query}`)
      const data = await response.json()
      setMembers(data.members)
    } catch (error) {
      console.error('Search failed:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <input 
        onChange={(e) => searchMembers(e.target.value)}
        placeholder="Search members..."
      />
      {loading && <div>Searching...</div>}
      {members.map(member => (
        <div key={member.id}>{member.firstName} {member.lastName}</div>
      ))}
    </div>
  )
}
```

## Available Mock Endpoints

The following endpoints are pre-configured in `@portals/api-client`:

### Authentication
- `GET /api/auth/session` - Get current session
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Member Management
- `GET /api/members/search` - Search members
- `GET /api/members/:id` - Get member details
- `GET /api/members/:id/benefits` - Get member benefits
- `GET /api/members/:id/claims` - Get member claims
- `POST /api/members/:id/id-card` - Generate ID card

### Broker Operations
- `GET /api/broker/dashboard` - Dashboard data
- `GET /api/broker/commission` - Commission reports
- `GET /api/sales/leads` - Sales leads
- `POST /api/sales/quote` - Generate quote

### Reporting
- `GET /api/reports/bob` - BOB reports
- `GET /api/reports/compensation` - Compensation reports
- `GET /api/reports/edi` - EDI reports

## Testing with MSW

### Jest Setup

Create `src/setupTests.ts` in your portal app:

```typescript
import '@testing-library/jest-dom'
import { server } from '@portals/api-client/mocks'

// Start MSW server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

// Reset handlers after each test
afterEach(() => server.resetHandlers())

// Stop MSW server after all tests
afterAll(() => server.close())
```

### Writing Tests

```typescript
import { render, screen, waitFor } from '@testing-library/react'
import { server } from '@portals/api-client/mocks'
import { http, HttpResponse } from 'msw'
import { MemberSearch } from './MemberSearch'

test('displays search results', async () => {
  render(<MemberSearch />)
  
  // Type in search box
  const input = screen.getByPlaceholderText('Search members...')
  fireEvent.change(input, { target: { value: 'John' } })

  // Wait for results
  await waitFor(() => {
    expect(screen.getByText('John Doe')).toBeInTheDocument()
  })
})

test('handles search errors', async () => {
  // Override handler for this test
  server.use(
    http.get('/api/members/search', () => {
      return new HttpResponse(null, { status: 500 })
    })
  )

  render(<MemberSearch />)
  
  const input = screen.getByPlaceholderText('Search members...')
  fireEvent.change(input, { target: { value: 'error' } })

  await waitFor(() => {
    expect(screen.getByText(/search failed/i)).toBeInTheDocument()
  })
})
```

## Customizing Mocks

### Override Specific Endpoints

To customize responses for specific scenarios:

```typescript
import { server, http, HttpResponse } from '@portals/api-client/mocks'

// Override member search to return specific data
server.use(
  http.get('/api/members/search', ({ request }) => {
    const url = new URL(request.url)
    const query = url.searchParams.get('q')
    
    if (query === 'test') {
      return HttpResponse.json({
        members: [
          { id: 'test-1', firstName: 'Test', lastName: 'User' }
        ]
      })
    }
    
    return HttpResponse.json({ members: [] })
  })
)
```

### Add App-Specific Handlers

Create `src/mocks/handlers.ts` in your portal app for app-specific endpoints:

```typescript
import { http, HttpResponse } from 'msw'

export const appHandlers = [
  http.get('/api/app/notifications', () => {
    return HttpResponse.json({
      notifications: [
        {
          id: '1',
          title: 'New Notification',
          message: 'You have a new message',
          type: 'info',
          timestamp: new Date().toISOString()
        }
      ]
    })
  }),

  http.post('/api/app/message', async ({ request }) => {
    const { message, recipientId } = await request.json()
    
    return HttpResponse.json({
      success: true,
      messageId: `msg_${Date.now()}`,
      timestamp: new Date().toISOString()
    })
  })
]
```

Then add them to your MSW setup:

```typescript
import { startMocking } from '@portals/api-client/mocks'
import { appHandlers } from './mocks/handlers'

// Add app-specific handlers
if (process.env.NEXT_PUBLIC_ENABLE_MSW === 'true') {
  startMocking().then(() => {
    // Add additional handlers after MSW starts
    import('msw/browser').then(({ setupWorker }) => {
      const worker = setupWorker(...appHandlers)
      worker.start()
    })
  })
}
```

## Development vs Testing vs Production

| Environment | MSW Enabled | Data Source |
|-------------|-------------|-------------|
| Development | ✅ (optional) | Mock data from `@portals/api-client` |
| Testing | ✅ (always) | Mock data for predictable tests |
| Production | ❌ (never) | Real API endpoints |

## Debugging MSW

### Check Console Output

When MSW is enabled, you'll see:
```
[MSW] Mocking enabled.
[MSW] Found a request match: GET /api/members/search
```

### Network Tab

- Intercepted requests show up in Network tab
- They have the correct URL and response data
- Status codes match your handlers

### Common Issues

1. **MSW not intercepting requests**
   - Check console for "[MSW] Mocking enabled" message
   - Verify `mockServiceWorker.js` exists in `public/` folder
   - Make sure environment variable is set correctly

2. **Requests hitting real API**
   - Check handler URL patterns match exactly
   - Verify MSW started before first request
   - Look for unhandled request warnings

3. **Type errors**
   - Ensure `@portals/api-client` is built: `pnpm build`
   - Check TypeScript types are exported correctly

## Best Practices

### ✅ DO
- Keep mocks in `@portals/api-client` package
- Use realistic test data that matches API contracts
- Add delays to simulate network latency: `await delay(500)`
- Test both success and error scenarios
- Use environment variables to control MSW

### ❌ DON'T
- Mock at the component level (prefer package-level)
- Use overly simplistic test data
- Leave MSW enabled in production
- Mock too many implementation details
- Duplicate handlers across apps

## Resources

- [MSW Documentation](https://mswjs.io/docs/)
- [MSW Best Practices](https://mswjs.io/docs/best-practices/)
- [Consumer Portals API Client](../packages/api-client/README.md)

## Support

For MSW setup questions:
1. Check this documentation
2. Review the `@portals/api-client` package
3. Ask in the team Slack channel
4. Check [MSW Discord](https://discord.gg/msw) for community help 
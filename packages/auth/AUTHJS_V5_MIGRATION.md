# AuthJS v5 Migration Guide

The auth package has been updated from NextAuth.js v4 to AuthJS v5 (next-auth@beta). This brings significant improvements and some breaking changes.

## Key Changes in AuthJS v5

### 1. Configuration Changes
- `authOptions` is no longer used
- Configuration is now passed directly to `NextAuth()`
- Session strategy defaults to JWT

### 2. New API Structure
```typescript
// v4 (old)
import NextAuth from 'next-auth'
import { authOptions } from './auth-options'

export default NextAuth(authOptions)

// v5 (new)
import NextAuth from 'next-auth'
import GitHub from 'next-auth/providers/github'

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
  // ... other config
})
```

### 3. Route Handler Changes
**App Router** (`app/api/auth/[...nextauth]/route.ts`):
```typescript
// v5
import { handlers } from '@/auth'
export const { GET, POST } = handlers
```

### 4. Middleware Integration
```typescript
// middleware.ts
export { auth as middleware } from '@/auth'

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
```

### 5. Environment Variables
AuthJS v5 supports automatic environment variable inference:

```bash
# .env.local
AUTH_SECRET=your-secret-here
AUTH_GITHUB_ID=your-github-id
AUTH_GITHUB_SECRET=your-github-secret
```

Variable format: `AUTH_{PROVIDER}_{ID|SECRET}`

### 6. Session Access
```typescript
// Server Components
import { auth } from '@/auth'

export default async function Page() {
  const session = await auth()
  if (!session) return <div>Not authenticated</div>
  return <div>Hello {session.user?.name}</div>
}

// Client Components
import { useSession } from 'next-auth/react'

export default function ClientPage() {
  const { data: session } = useSession()
  // ... rest of component
}
```

### 7. Breaking Changes to Address

1. **No more `getServerSession`**: Use `auth()` instead
2. **Provider imports**: Import providers directly from `next-auth/providers/*`
3. **Session callback**: Simplified session handling
4. **JWT callback**: Updated signature and behavior

### 8. Updated Middleware Pattern

The middleware in `apps/broker-portal/src/middleware.ts` is already prepared for v5 integration. Once the auth package is fully migrated, replace the custom authentication logic with:

```typescript
export { auth as middleware } from '@portals/auth'
```

## Migration Steps

1. ✅ Update package dependency to `next-auth@beta`
2. 🔄 **TODO**: Update auth package configuration files
3. 🔄 **TODO**: Update provider configurations
4. 🔄 **TODO**: Test authentication flows
5. 🔄 **TODO**: Update middleware integration

## Resources

- [AuthJS v5 Migration Guide](https://authjs.dev/getting-started/migrating-to-v5)
- [Next.js Integration Guide](https://authjs.dev/getting-started/installation?framework=next.js)
- [Environment Variable Inference](https://authjs.dev/getting-started/installation?framework=next.js#environment-variable-inference)
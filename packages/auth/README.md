# @portals/auth

This package is responsible for handling authentication and authorization logic across all portal
applications.

Refer to the main [Enterprise Portal Architecture & Development Standards](../../../README.md) for
overall guidelines, particularly the sections on Security Standards.

## Purpose

- Provide a centralized and consistent way to manage user authentication (e.g., login, logout,
  session management).
- Handle authorization logic, including role-based access control (RBAC).
- Abstract away the complexities of interacting with identity providers (e.g., Okta, Azure AD B2C).

## Key Features (To Be Developed)

- JWT generation, validation, and refresh mechanisms.
- Secure session management (e.g., using HTTP-only cookies).
- Adapters for different identity providers.
- Hooks and utilities for accessing user session and roles in Next.js applications (both Server and
  Client Components).
- Middleware for protecting routes.
- Implementation of SSO patterns.

## API Design Ideas

```typescript
// Example hook
// import { useSession } from '@portals/auth';
// const { user, isAuthenticated, roles } = useSession();

// Example server-side utility
// import { getServerSession } from '@portals/auth/server';
// const session = await getServerSession(req, res);

// Example middleware
// import { withAuth } from '@portals/auth/middleware';
// export default withAuth(function middleware(req) { ... });
```

## Getting Started

This package will typically be a dependency of the individual applications in the `apps/` directory.

```bash
# Install as a dependency in an app (e.g., member-portal)
# pnpm --filter=member-portal add @portals/auth
```

Ensure this package adheres to strict security best practices as it handles sensitive operations.

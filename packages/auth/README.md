# @portals/auth

Authentication and authorization utilities for Consumer Portals applications.

## Overview

Centralized authentication logic for handling user sessions, JWT tokens, and role-based access control across all portal applications.

## Features (In Development)

- **Session Management**: Secure session handling with HTTP-only cookies
- **JWT Operations**: Token generation, validation, and refresh
- **Role-Based Access**: RBAC for different user types (brokers, employers, admins)
- **Identity Providers**: Support for Okta, Azure AD B2C, and other SSO providers
- **Next.js Integration**: Hooks and utilities for both server and client components

## Planned API

```typescript
// Client-side hooks
import { useSession } from '@portals/auth'
const { user, isAuthenticated, roles } = useSession()

// Server-side utilities  
import { getServerSession } from '@portals/auth/server'
const session = await getServerSession(req, res)

// Route protection middleware
import { withAuth } from '@portals/auth/middleware'
export default withAuth(function middleware(req) { /* ... */ })
```

## Installation

```bash
# Add to your portal app
pnpm add @portals/auth
```

## Current Status

This package is under active development. The authentication patterns and security requirements follow enterprise standards outlined in our main documentation.

For overall security guidelines and architecture decisions, see:

**[→ Architecture Guide](../../docs/architecture.md)**

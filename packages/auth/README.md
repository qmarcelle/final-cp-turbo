# Auth Package

This package provides core authentication functionality for the Member Portal application.

## Features

- Session management
- Authentication flows
- Basic permission checks
- Impersonation support
- MFA support
- Configurable session timeouts
- JWT-based authentication

## Installation

```bash
npm install @memberportal/auth
```

## Configuration

The auth package requires configuration to work properly. At minimum, you must provide `loginUrl` and `logoutUrl`:

```typescript
import { mergeAuthConfig } from '@memberportal/auth';

const authConfig = mergeAuthConfig({
  loginUrl: '/custom/login',
  logoutUrl: '/custom/logout',
  // Optional overrides
  baseUrl: process.env.NEXTAUTH_URL,
  apiAuthPrefix: '/api/auth',
  sessionTimeout: {
    enabled: true,
    timeoutMinutes: 30,
    warningMinutes: 5,
  },
  // Additional paths
  loginPath: '/auth/login',
  homePath: '/',
  mfaPath: '/auth/mfa',
  resetPasswordPath: '/auth/reset-password',
  verifyEmailPath: '/auth/verify-email',
  accountSelectionPath: '/auth/account-selection',
});
```

### Environment Variables

The following environment variables are supported:

- `NEXTAUTH_URL`: Base URL for authentication (default: http://localhost:3000)
- `JWT_SESSION_EXPIRY_SECONDS`: JWT token expiry time in seconds (default: 1800)
- `NEXT_PUBLIC_JWT_SESSION_EXPIRY_SECONDS`: Alternative JWT expiry time variable

## Usage

### Basic Authentication

```typescript
import { authServiceImpl } from '@memberportal/auth';

// Sign in
await authServiceImpl.signIn({
  email: 'user@example.com',
  password: 'password',
});

// Get current session
const session = await authServiceImpl.getSession();

// Sign out
await authServiceImpl.signOut();
```

### Impersonation

```typescript
import { impersonationService } from '@memberportal/auth';

// Start impersonation
await impersonationService.startImpersonation({
  targetUserId: 'user-to-impersonate',
  originalUser: currentUser,
});

// End impersonation
await impersonationService.endImpersonation();
```

### Session Types

The package exports TypeScript types for working with sessions:

```typescript
import type { Session, SessionUser, PortalUser } from '@memberportal/auth';

// Example session user
const user: SessionUser = {
  id: 'user-id',
  email: 'user@example.com',
  role: UserRole.USER,
  // ... other properties
};
```

## Security

- Sessions are JWT-based with configurable expiry
- MFA support built-in
- Secure cookie handling based on environment
- CSRF protection via Next.js built-in mechanisms

## Error Handling

The package provides custom error types for different scenarios:

- `AuthenticationError`: General authentication failures
- `ImpersonationError`: Issues with impersonation
- `MFAError`: Multi-factor authentication issues

## Contributing

Please see CONTRIBUTING.md for guidelines on contributing to this package.

## License

MIT

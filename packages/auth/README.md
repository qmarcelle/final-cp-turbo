# @cp/auth

Authentication and authorization library for Consumer Portals applications.

## Overview

This package provides a centralized authentication system for all portal applications, built on top of NextAuth.js. It handles token management, session handling, and integration with various identity providers.

## Features

- **Secure Authentication**: Implementation of secure authentication protocols
- **OAuth Integration**: Support for OAuth 2.0 and OpenID Connect
- **JWT Handling**: Secure handling of JWT tokens
- **Session Management**: User session management and persistence
- **Role-Based Access Control**: Authorization based on user roles and permissions
- **Error Handling**: Comprehensive error management for auth failures

## Installation

```bash
# Install in a portal application
pnpm add @cp/auth
```

## Usage

### Basic Setup

```tsx
// pages/api/auth/[...nextauth].ts
import { authOptions } from '@cp/auth';
import NextAuth from 'next-auth';

export default NextAuth(authOptions);
```

### Protecting Routes

```tsx
// pages/protected.tsx
import { useSession, getServerSession } from '@cp/auth';
import { GetServerSideProps } from 'next';
import { authOptions } from '@cp/auth';

export default function ProtectedPage() {
  const { data: session } = useSession();
  
  return (
    <div>
      <h1>Protected Page</h1>
      <p>Welcome {session?.user?.name}</p>
    </div>
  );
}

// Server-side protection
export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);
  
  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false,
      },
    };
  }
  
  return {
    props: { session },
  };
};
```

### Using Authentication Hook

```tsx
// components/ProfileButton.tsx
import { useSession, signIn, signOut } from '@cp/auth';

export function ProfileButton() {
  const { data: session, status } = useSession();
  
  if (status === 'loading') {
    return <div>Loading...</div>;
  }
  
  if (status === 'unauthenticated') {
    return (
      <button onClick={() => signIn()}>
        Sign in
      </button>
    );
  }
  
  return (
    <div>
      <p>Signed in as {session.user.email}</p>
      <button onClick={() => signOut()}>
        Sign out
      </button>
    </div>
  );
}
```

## Configuration

The auth package can be configured with various options:

```typescript
// In your Next.js app
import { configureAuth } from '@cp/auth';

export const { authOptions } = configureAuth({
  providers: ['azure-ad'],
  callbacks: {
    // Custom callbacks
  },
  pages: {
    signIn: '/custom-signin',
    error: '/auth-error',
  },
  logger: {
    level: 'info',
  },
});
```

## API Reference

### Core Functions

- `configureAuth(options)`: Configure the authentication system
- `getServerSession(req, res, options)`: Get the session on the server
- `useSession()`: React hook for accessing the session
- `signIn(provider, options)`: Programmatically sign in
- `signOut(options)`: Sign the user out
- `getSession(options)`: Get the session client-side

### Types

```typescript
interface User {
  id: string;
  name?: string;
  email?: string;
  image?: string;
  roles?: string[];
}

interface Session {
  user: User;
  expires: string;
  accessToken?: string;
}

interface AuthOptions {
  providers: string[];
  callbacks?: {
    signIn?: (user: User) => Promise<boolean>;
    redirect?: (url: string) => Promise<string>;
    session?: (session: Session) => Promise<Session>;
    jwt?: (token: JWT) => Promise<JWT>;
  };
  pages?: {
    signIn?: string;
    signOut?: string;
    error?: string;
    verifyRequest?: string;
  };
  logger?: {
    level?: 'error' | 'warn' | 'info' | 'debug';
    prefix?: string;
  };
}
```

## Integration with Logger

This package uses the `@cp/logger` package for consistent logging:

```typescript
import { createLogger } from '@cp/logger';

const logger = createLogger({
  name: 'auth',
  level: 'info',
});

// Used in authentication flows
logger.info('User authenticated successfully', { userId: 'user123' });
```

## Error Handling

The package provides standardized error handling:

```typescript
import { AuthError } from '@cp/auth';

try {
  // Authentication code
} catch (error) {
  if (error instanceof AuthError) {
    console.error('Authentication error:', error.message, error.code);
  }
}
```

## Security Considerations

- All tokens are stored securely using encrypted cookies
- CSRF protection is enabled by default
- JWT tokens are signed and verified
- Session data is minimized to reduce exposure

## Contributing

Please refer to the main repository's contributing guidelines.

## License

Proprietary and Confidential 
# @cp/router

Routing and navigation library for Consumer Portals applications.

## Overview

This package provides a centralized routing system for all portal applications. It handles route configuration, navigation, and integration with Next.js router, ensuring consistent navigation patterns across portals.

## Features

- **Route Configuration**: Centralized route definitions with proper typing
- **Route Guards**: Protection for authenticated routes
- **Navigation Helpers**: Consistent navigation API across applications 
- **Breadcrumb Support**: Automatic breadcrumb generation
- **Type Safety**: Full TypeScript support for route paths and parameters
- **Next.js Integration**: Seamless integration with both App Router and Pages Router

## Installation

```bash
# Install in a portal application
pnpm add @cp/router
```

## Usage

### Basic Setup

```tsx
// app/routes.ts
import { createRouteConfig } from '@cp/router';

export const routes = createRouteConfig({
  home: {
    path: '/',
    title: 'Home',
  },
  dashboard: {
    path: '/dashboard',
    title: 'Dashboard',
    auth: true, // Protected route
  },
  profile: {
    path: '/profile',
    title: 'User Profile',
    auth: true,
  },
  settings: {
    path: '/settings',
    title: 'Settings',
    auth: true,
    children: {
      account: {
        path: '/account',
        title: 'Account Settings',
      },
      notifications: {
        path: '/notifications',
        title: 'Notification Settings',
      },
    },
  },
});

// Export types based on the route config
export type AppRoutes = typeof routes;
```

### Navigation

```tsx
// components/Navigation.tsx
import { useRouter } from '@cp/router';
import { routes } from '../routes';

export function Navigation() {
  const router = useRouter();
  
  return (
    <nav>
      <button onClick={() => router.navigate(routes.home)}>
        Home
      </button>
      <button onClick={() => router.navigate(routes.dashboard)}>
        Dashboard
      </button>
      <button 
        onClick={() => 
          router.navigate(routes.settings.children.account)
        }
      >
        Account Settings
      </button>
    </nav>
  );
}
```

### Route Guards

```tsx
// app/layout.tsx
import { RouteGuard } from '@cp/router';
import { routes } from './routes';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <RouteGuard
          routes={routes}
          authCheck={isAuthenticated}
          loginRedirect="/login"
        >
          {children}
        </RouteGuard>
      </body>
    </html>
  );
}
```

### Typed Links

```tsx
// components/AppLink.tsx
import { Link } from '@cp/router';
import { routes } from '../routes';

export function DashboardLink() {
  return (
    <Link to={routes.dashboard} className="dashboard-link">
      Go to Dashboard
    </Link>
  );
}

export function ProfileLink() {
  // With dynamic parameters
  return (
    <Link 
      to={routes.profile} 
      params={{ userId: '123' }}
      className="profile-link"
    >
      View Profile
    </Link>
  );
}
```

### Breadcrumbs

```tsx
// components/Breadcrumbs.tsx
import { useBreadcrumbs } from '@cp/router';
import { routes } from '../routes';

export function Breadcrumbs() {
  const { breadcrumbs } = useBreadcrumbs(routes);
  
  return (
    <div className="breadcrumbs">
      {breadcrumbs.map((crumb, index) => (
        <span key={crumb.path}>
          {index > 0 && <span className="separator"> / </span>}
          <Link to={crumb.route}>{crumb.title}</Link>
        </span>
      ))}
    </div>
  );
}
```

## Configuration

### Route Configuration Options

```typescript
interface RouteConfig {
  path: string;
  title: string;
  auth?: boolean;
  roles?: string[];
  icon?: React.ReactNode;
  hidden?: boolean;
  children?: Record<string, RouteConfig>;
}
```

### Router Provider Setup

```tsx
// app/providers.tsx
import { RouterProvider } from '@cp/router';
import { routes } from './routes';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <RouterProvider routes={routes}>
      {children}
    </RouterProvider>
  );
}
```

## API Reference

### Core Components

#### `RouterProvider`

Provides routing context to the application.

```tsx
<RouterProvider routes={routes}>
  {children}
</RouterProvider>
```

#### `Link`

Type-safe link component.

```tsx
<Link to={routes.dashboard}>Dashboard</Link>
```

#### `RouteGuard`

Protects routes based on authentication status.

```tsx
<RouteGuard
  routes={routes}
  authCheck={isAuthenticated}
  loginRedirect="/login"
>
  {children}
</RouteGuard>
```

### Hooks

#### `useRouter()`

Access the router instance with type-safe navigation methods.

```typescript
const router = useRouter();
router.navigate(routes.dashboard);
```

#### `useRoute()`

Get information about the current route.

```typescript
const { route, params } = useRoute();
```

#### `useBreadcrumbs()`

Generate breadcrumbs based on the current route.

```typescript
const { breadcrumbs } = useBreadcrumbs(routes);
```

## Integration with Auth

This package integrates with `@cp/auth` for protecting routes:

```typescript
import { useSession } from '@cp/auth';
import { RouteGuard } from '@cp/router';
import { routes } from './routes';

function AppLayout({ children }) {
  const { data: session, status } = useSession();
  
  return (
    <RouteGuard
      routes={routes}
      authCheck={() => status === 'authenticated'}
      loginRedirect="/login"
    >
      {children}
    </RouteGuard>
  );
}
```

## Best Practices

1. **Centralized Routes**: Define all routes in a single file using `createRouteConfig`
2. **Type Safety**: Leverage TypeScript for type-safe navigation and links
3. **Consistent Navigation**: Use the router's navigate method for programmatic navigation
4. **Route Guards**: Protect routes that require authentication
5. **Breadcrumbs**: Use breadcrumbs for better navigation UX

## Contributing

Please refer to the main repository's contributing guidelines.

## Testing Configuration

This package includes a robust testing setup for Jest with TypeScript. Key features:

1. **TypeScript Configuration**:
   - Uses a dedicated `tsconfig.test.json` for tests
   - Properly configured to work with Jest and testing-library

2. **Jest Configuration**:
   - Configured with ts-jest for TypeScript support
   - Setup for module path aliases (`@/`, `@cp/`)
   - Includes jsdom environment for component testing

3. **Test Utilities**:
   - Integration with testing-library for React
   - Type-safe mock utilities

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage
```

### Writing Tests

Example test for a hook:

```typescript
import { renderHook, act } from '@testing-library/react';
import { useNavigation } from '../hooks/useNavigation';
import { describe, it, expect, jest } from '@jest/globals';

describe('useNavigation', () => {
  it('should provide navigate function', () => {
    const { result } = renderHook(() => useNavigation());
    
    expect(result.current).toHaveProperty('navigate');
    expect(typeof result.current.navigate).toBe('function');
  });
});
```

## Development

```bash
# Start development mode
pnpm dev

# Build the package
pnpm build

# Lint the code
pnpm lint
```

## License

UNLICENSED - This package is for internal use only.

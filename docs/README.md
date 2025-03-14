# Consumer Portals Architecture

This document provides an overview of the Consumer Portals architecture, explaining how different packages work together to create a cohesive application ecosystem.

## Architecture Overview

The Consumer Portals platform is built as a monorepo using TurboRepo, containing multiple NextJS applications and shared packages. The architecture follows these key principles:

1. **Modularity**: Core functionality is separated into reusable packages
2. **Consistency**: Shared configurations ensure consistent development practices
3. **Performance**: Optimized build processes and caching via TurboRepo
4. **Maintainability**: Clear boundaries between packages with well-defined interfaces

## Package Dependencies

```
┌─────────────────┐     ┌─────────────────┐
│  broker-portal  │     │ employer-portal │
└───────┬─────────┘     └────────┬────────┘
        │                        │
        v                        v
┌──────────────────────────────────────────┐
│                  @cp/ui                   │
├──────────────────────────────────────────┤
│                @cp/router                 │
├──────────────────────────────────────────┤
│                 @cp/auth                  │
├──────────────────────────────────────────┤
│              @cp/api-client               │
└──────────────────────────────────────────┘
                    │
                    v
┌──────────────────────────────────────────┐
│                @cp/logger                 │
└──────────────────────────────────────────┘

┌──────────────────────────────────────────┐
│           shared-configurations           │
│    @cp/tsconfig, eslint-config-custom    │
└──────────────────────────────────────────┘
```

## Key Interactions

### Portal Applications → UI Components

- Portal applications import and use UI components for consistent interface
- UI components handle presentation logic and user interactions
- UI components use Tailwind for styling

### Portal Applications → Router

- Router package provides navigation utilities
- Handles route guards and authentication checks
- Manages navigation between different portal sections

### Portal Applications → Auth

- Auth package provides authentication mechanisms
- Integrates with NextAuth.js for secure login/logout
- Manages user sessions and tokens

### Portal Applications → API Client

- API client handles all backend communication
- Provides hooks for data fetching using SWR
- Manages request/response formatting and error handling

### Auth → Logger

- Auth package uses Logger for authentication events
- Logs login attempts, session management, etc.
- Provides audit trail for security events

### API Client → Logger

- API client uses Logger for request/response logging
- Tracks API calls and performance metrics
- Logs errors and exceptional conditions

## Configuration Sharing

The shared configuration packages ensure consistent development across all packages:

### TypeScript Configuration (@cp/tsconfig)

- Provides base TypeScript settings for different project types
- Ensures type consistency across the monorepo
- Configures paths and compilation settings appropriately

### ESLint Configuration (eslint-config-custom)

- Enforces consistent code style
- Configures rules for different frameworks (React, Next.js)
- Ensures code quality across the codebase

## Development Workflow

1. **Local Development**:
   - Run `pnpm dev` for development of all packages
   - Use `pnpm --filter <package-name> dev` for focused development

2. **Building**:
   - Run `pnpm build` to build all packages
   - TurboRepo optimizes build order based on dependencies

3. **Testing**:
   - Run `pnpm test` to test all packages
   - Each package contains its own tests

## Integration Patterns

### Component Integration

UI components are integrated into portal applications through direct imports:

```tsx
import { Button, Input, FormLayout } from '@cp/ui';

function LoginForm() {
  return (
    <FormLayout variant="column">
      <Input name="email" label="Email" />
      <Input name="password" label="Password" type="password" />
      <Button variant="primary">Log In</Button>
    </FormLayout>
  );
}
```

### Authentication Integration

Auth is integrated with portal applications using hooks and providers:

```tsx
import { useSession, signIn, signOut } from '@cp/auth';

function ProfileButton() {
  const { data: session, status } = useSession();
  
  if (status === 'authenticated') {
    return <button onClick={() => signOut()}>Sign Out</button>;
  }
  
  return <button onClick={() => signIn()}>Sign In</button>;
}
```

### API Integration

API client is used for data fetching and mutations:

```tsx
import { useQuery, useMutation } from '@cp/api-client';

function UserProfile() {
  const { data, isLoading, error } = useQuery('/api/user/profile');
  const { mutate } = useMutation('/api/user/profile');
  
  const updateProfile = (data) => {
    mutate(data);
  };
  
  // Component implementation
}
```

### Logging Integration

Logger is used for consistent logging across all packages:

```tsx
import { createLogger } from '@cp/logger';

const logger = createLogger({ name: 'user-service' });

export async function processUserData(userId) {
  logger.info('Processing user data', { userId });
  
  try {
    // Process data
    logger.info('User data processed successfully', { userId });
  } catch (error) {
    logger.error('Failed to process user data', { userId, error });
    throw error;
  }
}
```

## Extending the Architecture

To add new functionality to the Consumer Portals platform:

1. **New UI Components**:
   - Add to the UI package following the established patterns
   - Document the component API and usage examples

2. **New API Endpoints**:
   - Add to the appropriate portal application
   - Extend the API client to support the new endpoints

3. **New Shared Functionality**:
   - Create a new package in the packages directory
   - Define clear interfaces and maintain proper isolation
   - Update documentation to reflect the new package

## Deployment Considerations

- Each portal application can be deployed independently
- Shared packages are bundled with the applications
- Environment configuration is managed per-application
- Proper versioning ensures compatibility

## Best Practices

1. **Package Boundaries**:
   - Keep packages focused on a single responsibility
   - Avoid circular dependencies between packages
   - Maintain clear interfaces between packages

2. **Documentation**:
   - Document each package's API
   - Provide usage examples
   - Keep architecture documentation updated

3. **Testing**:
   - Write tests for all packages
   - Test integration between packages
   - Ensure proper mocking of dependencies

4. **Performance**:
   - Optimize bundle sizes
   - Use code splitting where appropriate
   - Leverage TurboRepo caching for faster builds

## Conclusion

The Consumer Portals architecture provides a flexible, maintainable foundation for building portal applications. By leveraging shared packages and clear boundaries, it enables multiple teams to work together effectively while maintaining consistency across the platform. 
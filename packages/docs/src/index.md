# Consumer Portals API Documentation

This documentation is automatically generated from the TypeScript source code of the Consumer Portals packages.

## Packages

- [@cp/router](./modules/cp_router.html) - Routing utilities for Consumer Portals applications
- [@cp/testing](./modules/cp_testing.html) - Testing utilities for Consumer Portals applications

## Getting Started

To use these packages in your application, install them using your package manager:

```bash
npm install @cp/router
```

Then import the components and utilities you need:

```typescript
import { useNavigation, routes } from '@cp/router';

function MyComponent() {
  const { navigate } = useNavigation();
  
  return (
    <button onClick={() => navigate(routes.member.dashboard.home)}>
      Go to Dashboard
    </button>
  );
}
```

## Development

This documentation is automatically generated when packages are built. To update the documentation, run:

```bash
turbo run build --filter=@cp/docs
``` 
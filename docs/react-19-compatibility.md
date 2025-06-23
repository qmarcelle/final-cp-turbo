# React 19 Compatibility Guide

This guide documents the changes and utilities implemented to ensure compatibility with React 19 and Next.js 15 in the Consumer Portals project.

## Table of Contents

- [Overview](#overview)
- [Key Changes in React 19](#key-changes-in-react-19)
- [Compatibility Components](#compatibility-components)
- [Usage Examples](#usage-examples)
- [Migration Guide](#migration-guide)

## Overview

React 19 introduces several breaking changes, particularly around ref handling, hydration, and component lifecycle. This documentation covers the utilities and components we've implemented to handle these changes seamlessly.

## Key Changes in React 19

1. **Ref Handling**
   - Refs are now treated as regular props
   - `element.ref` access has been removed
   - New ref forwarding patterns are required

2. **Hydration Changes**
   - Enhanced hydration error detection
   - Stricter hydration mismatch handling
   - New hydration lifecycle events

3. **Component Updates**
   - New state update batching behavior
   - Stricter type checking for refs
   - Enhanced error boundaries

## Compatibility Components

### 1. ErrorBoundary

A component to catch and handle React 19-specific errors.

```tsx
import { ErrorBoundary } from '@portals/ui/components/foundation/ErrorBoundary';

<ErrorBoundary
  fallback={<div>Something went wrong</div>}
  onError={(error, errorInfo) => {
    console.error('Error:', error, errorInfo);
  }}
>
  <YourComponent />
</ErrorBoundary>
```

### 2. withReactModernRefs

A Higher-Order Component (HOC) for safe ref handling in React 19.

```tsx
import { withReactModernRefs } from '@portals/ui/components/foundation/withReactModernRefs';

// Basic usage
const ModernComponent = withReactModernRefs(YourComponent);

// With TypeScript
interface Props {
  name: string;
}
const ModernComponent = withReactModernRefs<HTMLDivElement, Props>(YourComponent);
```

### 3. Ref Utilities

A collection of utilities for handling refs in React 19.

```tsx
import {
  assignRef,
  mergeRefs,
  createSafeRef,
  isRefObject
} from '@portals/ui/utils/refUtils';

// Combining multiple refs
const combinedRef = mergeRefs(ref1, ref2);

// Creating a safe ref
const safeRef = createSafeRef<HTMLDivElement>(null);

// Checking ref type
if (isRefObject(ref)) {
  // Handle ref object
}
```

### 4. HydrationProvider

A provider component to handle React 19's hydration changes.

```tsx
import {
  HydrationProvider,
  useHydration,
  withHydration
} from '@portals/ui/components/foundation/HydrationProvider';

// Wrap your app
<HydrationProvider fallback={<LoadingSpinner />}>
  <App />
</HydrationProvider>

// Use the hook
function Component() {
  const { isHydrated } = useHydration();
  return isHydrated ? <Content /> : <Fallback />;
}

// Use the HOC
const HydratedComponent = withHydration(YourComponent, <LoadingSpinner />);
```

## Usage Examples

### 1. Form Component with Refs

```tsx
import { withReactModernRefs } from '@portals/ui/components/foundation/withReactModernRefs';
import { mergeRefs } from '@portals/ui/utils/refUtils';

interface FormProps {
  onSubmit: (data: FormData) => void;
}

const Form = React.forwardRef<HTMLFormElement, FormProps>((props, ref) => {
  const localRef = useRef<HTMLFormElement>(null);
  const combinedRef = mergeRefs(localRef, ref);

  return <form ref={combinedRef} {...props} />;
});

export const ModernForm = withReactModernRefs(Form);
```

### 2. Complex Component with Error Handling

```tsx
import { ErrorBoundary } from '@portals/ui/components/foundation/ErrorBoundary';
import { HydrationProvider } from '@portals/ui/components/foundation/HydrationProvider';

function ComplexComponent() {
  return (
    <HydrationProvider fallback={<LoadingState />}>
      <ErrorBoundary
        fallback={<ErrorState />}
        onError={(error) => logError(error)}
      >
        <YourComplexLogic />
      </ErrorBoundary>
    </HydrationProvider>
  );
}
```

## Migration Guide

1. **Update Dependencies**
   ```json
   {
     "dependencies": {
       "react": "^19.0.0",
       "react-dom": "^19.0.0",
       "next": "^15.1.0"
     }
   }
   ```

2. **Wrap Your App**
   ```tsx
   // pages/_app.tsx or app/layout.tsx
   export default function App({ Component, pageProps }) {
     return (
       <HydrationProvider>
         <ErrorBoundary>
           <Component {...pageProps} />
         </ErrorBoundary>
       </HydrationProvider>
     );
   }
   ```

3. **Update Ref Usage**
   - Replace direct ref access with ref utilities
   - Wrap components using refs with `withReactModernRefs`
   - Use `mergeRefs` when combining multiple refs

4. **Handle Hydration**
   - Use `HydrationProvider` at the app root
   - Implement `useHydration` or `withHydration` for components that need hydration awareness
   - Add appropriate fallback UI for pre-hydration state

## Best Practices

1. **Error Handling**
   - Always wrap complex components with `ErrorBoundary`
   - Provide meaningful fallback UI
   - Implement proper error logging

2. **Ref Management**
   - Use ref utilities instead of direct ref manipulation
   - Implement proper ref cleanup in useEffect
   - Type refs properly with TypeScript

3. **Hydration**
   - Handle hydration mismatches gracefully
   - Provide appropriate loading states
   - Test both server and client rendering

4. **Performance**
   - Monitor component updates
   - Implement proper memoization
   - Use React DevTools for debugging

## Troubleshooting

Common issues and their solutions:

1. **Ref Access Errors**
   ```
   Error: Accessing element.ref was removed in React 19
   Solution: Use withReactModernRefs HOC
   ```

2. **Hydration Mismatch**
   ```
   Error: Hydration failed because the initial UI does not match
   Solution: Implement HydrationProvider with appropriate fallback
   ```

3. **Type Errors**
   ```
   TS Error: Type 'MutableRefObject<T>' is not assignable...
   Solution: Use proper generic types with ref utilities
   ```

## Contributing

When adding new components or utilities:

1. Follow the established patterns
2. Add proper TypeScript types
3. Include comprehensive tests
4. Update this documentation

## Further Reading

- [React 19 Release Notes](https://react.dev/blog/2024/04/25/react-19-upgrade-guide)
- [Next.js 15 Documentation](https://nextjs.org/docs/app/guides/upgrading/version-15)
- [React Refs and the DOM](https://react.dev/learn/referencing-values-with-refs) 
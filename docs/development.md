# 💻 Development Guide

This guide covers day-to-day development workflows, coding standards, and best practices for the Consumer Portals project.

## Development Workflow

### 1. Feature Development Process

```bash
# 1. Start from main branch
git checkout main
git pull origin main

# 2. Create feature branch
git checkout -b feature/PRT-123-new-feature

# 3. Start development environment
pnpm dev                     # Start all apps
# OR
pnpm dev:broker             # Start specific app

# 4. Make changes
# ... edit code, add tests, update docs ...

# 5. Quality checks
pnpm lint && pnpm typecheck && pnpm test

# 6. Commit and push
git add .
git commit -m "feat(broker): add new feature for PRT-123"
git push origin feature/PRT-123-new-feature

# 7. Create pull request
```

### 2. Commit Message Format

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

**Types:**
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation changes
- `style` - Code style changes (formatting, etc.)
- `refactor` - Code refactoring
- `test` - Adding or updating tests
- `chore` - Build process or auxiliary tool changes

**Scopes:**
- `broker` - Broker portal
- `employer` - Employer portal
- `ui` - UI package
- `auth` - Auth package
- `api` - API client package
- `docs` - Documentation
- `deps` - Dependencies

**Examples:**
```bash
feat(broker): add member search functionality
fix(ui): correct button padding in dark mode
docs(api): update authentication examples
chore(deps): update next.js to v15.1.0
```

## Coding Standards

### TypeScript Guidelines

#### 1. Type Definitions

```tsx
// ✅ Good - Explicit interface definitions
interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'broker' | 'user';
  createdAt: Date;
}

// ✅ Good - Use type for simple unions/primitives
type Theme = 'light' | 'dark';
type UserId = string;

// ❌ Avoid - Don't use any
const data: any = fetchData(); // Bad

// ✅ Good - Use proper typing
const data: UserProfile = fetchData();
```

#### 2. Function Types

```tsx
// ✅ Good - Explicit parameter and return types
function processUser(user: UserProfile): Promise<ProcessedUser> {
  // implementation
}

// ✅ Good - Arrow function with types
const calculateTotal = (items: LineItem[]): number => {
  return items.reduce((sum, item) => sum + item.price, 0);
};

// ✅ Good - Generic functions
function createApiClient<T>(baseUrl: string): ApiClient<T> {
  // implementation
}
```

#### 3. React Component Types

```tsx
// ✅ Good - Interface for props
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  children: ReactNode;
}

// ✅ Good - Typed component
export function Button({ variant, size = 'medium', ...props }: ButtonProps) {
  // implementation
}

// ✅ Good - Forward ref with types
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return <input ref={ref} className={cn(className)} {...props} />;
  }
);
```

### React Guidelines

#### 1. Component Structure

```tsx
// ✅ Good - Component file structure
import { useState, useEffect } from 'react';
import { Button, Input } from '@portals/ui';
import { useSession } from '@portals/auth';
import { api } from './api';

interface UserFormProps {
  userId?: string;
  onSave: (user: UserProfile) => void;
}

export function UserForm({ userId, onSave }: UserFormProps) {
  // 1. Hooks at the top
  const { data: session } = useSession();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // 2. Effects
  useEffect(() => {
    if (userId) {
      loadUser(userId);
    }
  }, [userId]);

  // 3. Event handlers
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    // implementation
  };

  // 4. Helper functions
  const loadUser = async (id: string) => {
    // implementation
  };

  // 5. Early returns
  if (!session) {
    return <div>Please log in</div>;
  }

  // 6. Main render
  return (
    <form onSubmit={handleSubmit}>
      {/* JSX */}
    </form>
  );
}
```

#### 2. Custom Hooks

```tsx
// ✅ Good - Custom hook with proper typing
interface UseUserReturn {
  user: UserProfile | null;
  isLoading: boolean;
  error: string | null;
  updateUser: (data: Partial<UserProfile>) => Promise<void>;
}

export function useUser(userId: string): UseUserReturn {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const updateUser = useCallback(async (data: Partial<UserProfile>) => {
    try {
      setIsLoading(true);
      const updatedUser = await api.updateUser(userId, data);
      setUser(updatedUser);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    loadUser();
  }, [userId]);

  return { user, isLoading, error, updateUser };
}
```

### File Organization

#### 1. Directory Structure

```
apps/portal-name/src/
├── app/                    # Next.js App Router pages
│   ├── (protected)/        # Protected route group
│   ├── (public)/          # Public route group
│   └── api/               # API routes
├── components/            # App-specific components
│   ├── forms/            # Form components
│   ├── layouts/          # Layout components
│   └── ui/               # Local UI components
├── hooks/                # Custom hooks
├── lib/                  # Utility functions
├── styles/               # Global styles
└── types/                # Type definitions
```

#### 2. File Naming

```
// ✅ Good - Descriptive file names
UserProfileForm.tsx       # Component (PascalCase)
useUserProfile.ts        # Hook (camelCase with 'use' prefix)
api-client.ts           # Utility (kebab-case)
user-types.ts           # Types (kebab-case)
UserProfile.test.tsx    # Test files
```

#### 3. Export Patterns

```tsx
// ✅ Good - Named exports for components
export function UserProfile() { /* */ }
export function UserSettings() { /* */ }

// ✅ Good - Default export for single component files
export default function UserDashboard() { /* */ }

// ✅ Good - Re-exports from index files
// components/index.ts
export { UserProfile } from './UserProfile';
export { UserSettings } from './UserSettings';
```

### CSS and Styling

#### 1. Tailwind CSS Guidelines

```tsx
// ✅ Good - Consistent spacing and responsive design
<div className="flex flex-col gap-4 p-6 md:flex-row md:gap-6 md:p-8">
  <div className="flex-1">
    {/* Content */}
  </div>
</div>

// ✅ Good - Use design system values
<button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
  Submit
</button>

// ✅ Good - Use cn() utility for conditional classes
import { cn } from '@portals/ui/lib/utils';

<div className={cn(
  "base-styles",
  variant === 'primary' && "primary-styles",
  isDisabled && "disabled-styles"
)}>
```

#### 2. CSS Custom Properties

```css
/* ✅ Good - Use CSS custom properties for theme values */
:root {
  --color-primary: #3b82f6;
  --color-primary-hover: #2563eb;
  --spacing-unit: 0.25rem;
  --border-radius: 0.375rem;
}

/* ✅ Good - Component-specific styles when needed */
.user-profile-card {
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-hover) 100%);
  border-radius: var(--border-radius);
}
```

## Testing Guidelines

### 1. Unit Test Structure

```tsx
// UserProfile.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { UserProfile } from './UserProfile';

// Mock dependencies
vi.mock('@portals/api-client', () => ({
  useQuery: vi.fn(),
  useMutation: vi.fn(),
}));

describe('UserProfile', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('displays user information correctly', () => {
    // Arrange
    const mockUser = {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
    };

    // Act
    render(<UserProfile user={mockUser} />);

    // Assert
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
  });

  it('handles user update correctly', async () => {
    // Test implementation
  });
});
```

### 2. Integration Test Example

```tsx
// UserDashboard.integration.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import { createMockServer } from '@portals/testing';
import { UserDashboard } from './UserDashboard';

const server = createMockServer();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('UserDashboard Integration', () => {
  it('loads and displays user data', async () => {
    server.use(
      rest.get('/api/users/me', (req, res, ctx) => {
        return res(ctx.json({ id: '1', name: 'John Doe' }));
      })
    );

    render(<UserDashboard />);

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });
  });
});
```

## Performance Guidelines

### 1. React Performance

```tsx
// ✅ Good - Memoize expensive calculations
const expensiveValue = useMemo(() => {
  return processLargeDataset(data);
}, [data]);

// ✅ Good - Memoize callbacks to prevent re-renders
const handleClick = useCallback((id: string) => {
  onItemClick(id);
}, [onItemClick]);

// ✅ Good - Memoize components when appropriate
const ExpensiveComponent = memo(({ data }: { data: ComplexData }) => {
  return <div>{/* Complex rendering logic */}</div>;
});
```

### 2. Bundle Optimization

```tsx
// ✅ Good - Dynamic imports for code splitting
const LazyComponent = lazy(() => import('./ExpensiveComponent'));

// ✅ Good - Conditional imports
if (process.env.NODE_ENV === 'development') {
  import('./dev-tools').then(({ setupDevTools }) => {
    setupDevTools();
  });
}
```

## Security Guidelines

### 1. Input Validation

```tsx
// ✅ Good - Validate inputs on both client and server
import { z } from 'zod';

const UserSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  age: z.number().min(0).max(120),
});

function validateUser(input: unknown) {
  return UserSchema.parse(input);
}
```

### 2. XSS Prevention

```tsx
// ✅ Good - Sanitize HTML content
import DOMPurify from 'dompurify';

function DisplayUserContent({ content }: { content: string }) {
  const sanitizedContent = DOMPurify.sanitize(content);
  return <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />;
}

// ✅ Good - Use text content when possible
function DisplayUserName({ name }: { name: string }) {
  return <span>{name}</span>; // React automatically escapes
}
```

## Error Handling

### 1. Error Boundaries

```tsx
// ErrorBoundary.tsx
import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <div>Something went wrong.</div>;
    }

    return this.props.children;
  }
}
```

### 2. API Error Handling

```tsx
// ✅ Good - Consistent error handling
async function fetchUserData(userId: string): Promise<UserProfile> {
  try {
    const response = await fetch(`/api/users/${userId}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch user: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error; // Re-throw for component to handle
  }
}
```

## Package Development

### 1. Creating New Packages

```bash
# 1. Create package directory
mkdir packages/my-package

# 2. Initialize package.json
cd packages/my-package
cat > package.json << EOF
{
  "name": "@portals/my-package",
  "version": "0.0.0",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "default": "./dist/index.js"
    }
  },
  "scripts": {
    "build": "tsup",
    "dev": "tsup --watch",
    "typecheck": "tsc --noEmit"
  }
}
EOF

# 3. Set up TypeScript configuration
cat > tsconfig.json << EOF
{
  "extends": "@portals/tsconfig/base.json",
  "include": ["src/**/*"],
  "exclude": ["dist", "node_modules"]
}
EOF
```

### 2. Package API Design

```tsx
// src/index.ts - Clean public API
export { Button } from './components/Button';
export { Input } from './components/Input';
export type { ButtonProps, InputProps } from './types';

// Don't export internal utilities
// export { internalHelper } from './internal'; // ❌ Bad
```

## CI/CD Integration

### 1. Pre-commit Hooks

```bash
# Install husky and lint-staged
pnpm add -D husky lint-staged

# Set up pre-commit hook
npx husky install
npx husky add .husky/pre-commit "npx lint-staged"
```

### 2. Lint-staged Configuration

```json
// package.json
{
  "lint-staged": {
    "*.{ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{md,json}": [
      "prettier --write"
    ]
  }
}
```

---

**See Also:**
- [Testing Guide](./testing.md) for comprehensive testing strategies
- [TypeScript Best Practices](./typescript-best-practices.md) for advanced TypeScript patterns
- [Contributing Guide](./contributing.md) for contribution workflows 
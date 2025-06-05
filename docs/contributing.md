# 🤝 Contributing Guide

Thank you for contributing to the Consumer Portals project! This guide will help you get started and ensure your contributions align with our standards.

## Quick Start for Contributors

### 1. Clone and Setup

For collaborative development, we use a branch-based workflow directly on the main repository:

```bash
# Clone the repository directly
git clone https://github.com/bcbst/cp_turbo_skeleton.git
cd cp_turbo_skeleton

# Ensure you're on the latest main
git checkout main
git pull origin main
```

**Why direct branching works well:**
- Streamlined collaboration between team members
- Simplified CI/CD pipeline integration
- Reduced complexity in branch management
- Better integration with project management tools

### 2. Set Up Development Environment

```bash
# Install dependencies
pnpm install

# Start development servers
pnpm dev

# Verify setup
pnpm lint && pnpm typecheck && pnpm test
```

### 3. Create Feature Branch

```bash
# Create feature branch from main
git checkout -b feature/PRT-123-your-feature

# Or for bug fixes
git checkout -b fix/PRT-124-bug-description

# Or for documentation
git checkout -b docs/PRT-125-update-readme
```

## Contribution Workflow

### 1. Planning Your Contribution

**Before you start coding:**

1. **Check existing issues** - Is there already an issue for this?
2. **Create an issue** - If not, create one to discuss the change
3. **Get approval** - For large features, get approval from maintainers
4. **Assign yourself** - Assign the issue to yourself when you start work

### 2. Development Process

```bash
# 1. Create feature branch
git checkout -b feature/PRT-123-new-feature

# 2. Make your changes
# ... code, test, document ...

# 3. Run quality checks
pnpm lint:fix
pnpm typecheck
pnpm test

# 4. Commit with conventional format
git add .
git commit -m "feat(broker): add member search functionality

- Add search bar to member listing page
- Implement fuzzy search algorithm
- Add tests for search functionality

Closes #123"

# 5. Push to origin
git push origin feature/PRT-123-new-feature

# 6. Create pull request on GitHub
```

### 3. Pull Request Process

1. **Create PR** with descriptive title and description
2. **Fill out PR template** completely
3. **Request reviews** from appropriate team members
4. **Address feedback** promptly and professionally
5. **Keep PR updated** with main branch changes
6. **Celebrate** when it's merged! 🎉

### 4. Pair Development Best Practices

**For pair programming:**
- Use descriptive branch names that include both developers' initials
- Commit frequently with clear messages
- Take turns driving and reviewing
- Ensure both developers understand the changes
- Use shared development environments when beneficial

**Example pair workflow:**
```bash
# Create feature branch with pair initials
git checkout -b feature/PRT-123-search-AB-CD

# Work together, commit frequently
git commit -m "feat(broker): add search input component"
git commit -m "feat(broker): implement search logic"

# Push to origin
git push origin feature/PRT-123-search-AB-CD
```

## Coding Standards

### Commit Message Format

We use [Conventional Commits](https://conventionalcommits.org/):

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

**Types:**
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation only changes
- `style` - Code style changes (formatting, missing semicolons, etc)
- `refactor` - Code change that neither fixes a bug nor adds a feature
- `perf` - Code change that improves performance
- `test` - Adding missing tests or correcting existing tests
- `chore` - Changes to build process or auxiliary tools

**Scopes:**
- `broker` - Broker portal
- `employer` - Employer portal
- `ui` - UI package
- `auth` - Auth package
- `api` - API client package
- `testing` - Testing utilities
- `docs` - Documentation
- `deps` - Dependencies

**Examples:**
```bash
feat(broker): add member search functionality
fix(ui): correct button padding in dark mode
docs(api): update authentication examples
chore(deps): update next.js to v15.1.0
test(auth): add unit tests for login flow
```

### Code Quality Requirements

All contributions must pass:

1. **TypeScript compilation**: `pnpm typecheck`
2. **ESLint rules**: `pnpm lint`
3. **Prettier formatting**: `pnpm format`
4. **Unit tests**: `pnpm test`
5. **Build process**: `pnpm build`

### File and Folder Conventions

```
✅ Good naming:
- UserProfileForm.tsx      (PascalCase for components)
- useUserProfile.ts        (camelCase for hooks)
- api-client.ts           (kebab-case for utilities)
- user-types.ts           (kebab-case for types)

❌ Avoid:
- userprofileform.tsx     (inconsistent casing)
- User_Profile_Form.tsx   (snake_case)
- UserProfile-Form.tsx    (mixed conventions)
```

## Testing Requirements

### Writing Tests

All new features and bug fixes must include tests:

```tsx
// Component test example
describe('UserProfile', () => {
  it('displays user information correctly', () => {
    const mockUser = {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
    };

    render(<UserProfile user={mockUser} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
  });

  it('handles missing user gracefully', () => {
    render(<UserProfile user={null} />);
    expect(screen.getByText('User not found')).toBeInTheDocument();
  });
});
```

### Test Coverage

- **New features**: Must have 80%+ test coverage
- **Bug fixes**: Must include regression tests
- **Refactoring**: Existing test coverage must be maintained

### Running Tests

```bash
# Run all tests
pnpm test
```

## Documentation Requirements

### Code Documentation

```tsx
/**
 * Renders a user profile component with editable fields
 * 
 * @param user - The user object containing profile information
 * @param onSave - Callback function called when user saves changes
 * @param readonly - Whether the component should be in read-only mode
 * 
 * @example
 * ```tsx
 * <UserProfile 
 *   user={currentUser} 
 *   onSave={handleSave}
 *   readonly={false}
 * />
 * ```
 */
export function UserProfile({ user, onSave, readonly = false }: UserProfileProps) {
  // Implementation
}
```

### API Documentation

```tsx
/**
 * Updates a user's profile information
 * 
 * @param userId - Unique identifier for the user
 * @param updates - Partial user object with fields to update
 * @returns Promise that resolves to the updated user object
 * 
 * @throws {ValidationError} When user data is invalid
 * @throws {NotFoundError} When user doesn't exist
 * 
 * @example
 * ```typescript
 * const updatedUser = await updateUser('123', { name: 'New Name' });
 * ```
 */
export async function updateUser(userId: string, updates: Partial<User>): Promise<User> {
  // Implementation
}
```

### Documentation Updates

When making changes, update relevant documentation:

1. **README.md** - If changing core functionality
2. **Package README** - If changing package API
3. **Code comments** - For complex logic
4. **Type definitions** - Keep TypeScript docs current

## Package Contributions

### Creating New Packages

```bash
# 1. Create package directory
mkdir packages/my-new-package
cd packages/my-new-package

# 2. Initialize package.json
cat > package.json << 'EOF'
{
  "name": "@portals/my-new-package",
  "version": "0.0.0",
  "description": "Description of your package",
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
    "test": "jest",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {},
  "devDependencies": {
    "@portals/tsconfig": "workspace:*",
    "tsup": "^8.0.0",
    "typescript": "^5.0.0"
  }
}
EOF

# 3. Create TypeScript config
cat > tsconfig.json << 'EOF'
{
  "extends": "@portals/tsconfig/base.json",
  "include": ["src/**/*"],
  "exclude": ["dist", "node_modules"]
}
EOF

# 4. Create src directory and files
mkdir src
echo "export * from './lib';" > src/index.ts
mkdir src/lib
```

### Package Guidelines

1. **Single Responsibility**: Each package should have one clear purpose
2. **Clear API**: Export only what consumers need
3. **No Side Effects**: Packages shouldn't perform global side effects
4. **Proper Dependencies**: Only depend on what you actually use
5. **Good Documentation**: Include README with usage examples

## UI Component Contributions

### Component Guidelines

```tsx
// ✅ Good component structure
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'medium', disabled, loading, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          'inline-flex items-center justify-center rounded-md font-medium transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
          'disabled:pointer-events-none disabled:opacity-50',
          {
            'bg-blue-600 text-white hover:bg-blue-700': variant === 'primary',
            'bg-gray-200 text-gray-900 hover:bg-gray-300': variant === 'secondary',
            'bg-red-600 text-white hover:bg-red-700': variant === 'danger',
            'h-8 px-3 text-sm': size === 'small',
            'h-10 px-4 text-sm': size === 'medium',
            'h-12 px-6 text-base': size === 'large',
          }
        )}
        {...props}
      >
        {loading && <Spinner className="mr-2 h-4 w-4" />}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
```

### Component Documentation

```tsx
/**
 * Button component with multiple variants and sizes
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <Button>Click me</Button>
 * 
 * // With variant and size
 * <Button variant="danger" size="large">Delete</Button>
 * 
 * // Loading state
 * <Button loading={isSubmitting}>Submit</Button>
 * ```
 */
```

## Review Process

### What Reviewers Look For

1. **Code Quality**
   - Follows coding standards
   - Proper TypeScript usage
   - Good error handling
   - Performance considerations

2. **Testing**
   - Adequate test coverage
   - Tests are meaningful and well-written
   - Edge cases are covered

3. **Documentation**
   - Code is self-documenting
   - Complex logic is explained
   - API changes are documented

4. **Architecture**
   - Follows established patterns
   - Doesn't introduce unnecessary complexity
   - Maintains package boundaries

### Responding to Review Feedback

1. **Be responsive** - Address feedback promptly
2. **Be open** - Consider suggestions with an open mind
3. **Ask questions** - If feedback is unclear, ask for clarification
4. **Make changes** - Address all feedback before requesting re-review
5. **Say thanks** - Acknowledge reviewers' time and effort

### Common Review Comments

| Comment | Meaning | Action |
|---------|---------|---------|
| "LGTM" | Looks Good To Me | Ready to merge |
| "nit:" | Minor suggestion | Optional to fix |
| "Consider..." | Suggestion for improvement | Consider implementing |
| "This breaks..." | Identifies breaking change | Must fix before merge |
| "Tests needed" | Missing test coverage | Add tests |

## Release Process

### Version Bumping

We use semantic versioning (SemVer):

- **MAJOR** (1.0.0 → 2.0.0): Breaking changes
- **MINOR** (1.0.0 → 1.1.0): New features, backwards compatible
- **PATCH** (1.0.0 → 1.0.1): Bug fixes, backwards compatible

### Release Checklist

1. ✅ All tests pass
2. ✅ Documentation is updated
3. ✅ CHANGELOG.md is updated
4. ✅ Version numbers are bumped
5. ✅ Release notes are written

## Getting Help

### Where to Ask Questions

1. **Microsoft Teams**: Contact the Consumer Portals team for general questions
2. **Email**: consumerportals@groups.bcbst.com for technical discussions
3. **GitHub Discussions**: For longer discussions and RFC (Request for Comments)
4. **GitHub Issues**: For bugs and feature requests
5. **Code Reviews**: During PR review process

### Mentorship Program

New contributors can request a mentor:

1. Comment on any issue with `@mentor-needed`
2. A senior developer will be assigned
3. Schedule pairing sessions as needed
4. Get guidance on architecture and best practices

## Recognition

### Contributor Levels

- **First-time Contributor**: Your first merged PR
- **Regular Contributor**: 5+ merged PRs
- **Core Contributor**: 20+ merged PRs + mentoring others
- **Maintainer**: Trusted with repository access

### Ways We Recognize Contributors

- Monthly shout-outs in team meetings
- Contributor highlights in release notes
- Opportunities to present at tech talks
- Access to advanced training resources

---

## Thank You! 

Every contribution, no matter how small, makes this project better. Whether it's fixing a typo, adding a feature, or helping other contributors, your efforts are appreciated! 🙏

**Questions?** Reach out via Teams or email - we're here to help! 
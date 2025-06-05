# 🔧 Troubleshooting Guide

*Don't panic! These are normal issues that everyone runs into.*

This guide helps you resolve common issues when developing with the Consumer Portals monorepo.

> **Quick tip:** Most issues can be solved by "turning it off and on again" - clean your dependencies, restart your dev server, and try again!

## Installation Issues

### pnpm Installation Fails

> **What's happening:** Your computer can't download or install the packages we need.

**Problem**: `pnpm install` fails with permission or network errors.

**Solutions**:

1. **Clear package manager caches** (like emptying your browser cache):
   ```bash
   pnpm store prune      # Clear pnpm's cache
   rm -rf node_modules   # Delete installed packages
   rm pnpm-lock.yaml     # Delete lock file
   pnpm install          # Start fresh
   ```

2. **Corporate network (BCBST employees only)**:
   > **Why this happens:** Corporate networks often block direct internet access.
   
   ```bash
   # Option 1: Use our script (easier)
   ./scripts/configure-proxy.sh
   
   # Option 2: Configure manually
   pnpm config set proxy http://webproxy.bcbst.com:80
   pnpm config set https-proxy http://webproxy.bcbst.com:443
   ```

3. **Node version mismatch**:
   > **Why this matters:** Different Node versions can have incompatible packages.
   
   ```bash
   node --version          # Check current version
   nvm install 20         # Install Node 20 (if using nvm)
   nvm use 20             # Switch to Node 20
   node --version         # Should show 20.x.x
   ```

### Dependency Resolution Issues

> **What's happening:** Think of dependencies like ingredients for a recipe. Sometimes you have the wrong version of an ingredient, or it's missing entirely.

**Problem**: Conflicting dependency versions or missing packages.

**Solutions**:

1. **Check workspace dependencies**:
   ```bash
   pnpm list --depth=0
   pnpm why <package-name>
   ```

2. **Update all dependencies**:
   ```bash
   pnpm update --recursive
   ```

3. **Force clean installation**:
   ```bash
   rm -rf node_modules packages/*/node_modules apps/*/node_modules
   rm pnpm-lock.yaml
   pnpm install
   ```

## Development Server Issues

### Port Already in Use

> **What's happening:** It's like trying to park in a spot that's already taken. Another app is using port 3000.

**Problem**: `Error: listen EADDRINUSE: address already in use :::3000`

**Solutions**:

1. **Kill process using the port** ("kick out" the app using that port):
   ```bash
   # Find and stop the app using port 3000
   lsof -ti:3000                    # Find what's using port 3000
   kill -9 $(lsof -ti:3000)        # Stop it
   
   # For port 3001
   kill -9 $(lsof -ti:3001)
   ```

2. **Use different ports** (Next.js will find an empty "parking spot"):
   ```bash
   pnpm dev    # Next.js will automatically find an available port
   # Look for output like: "ready - started server on 0.0.0.0:3002"
   ```

### Hot Reload Not Working

> **What's happening:** You save your code, but the browser doesn't show your changes. It's like the browser isn't listening for updates.

**Problem**: Changes to code don't trigger browser refresh.

**Solutions**:

1. **Check file watcher limits (Linux)**:
   ```bash
   echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
   sudo sysctl -p
   ```

2. **Restart development server**:
   ```bash
   # Stop dev server (Ctrl+C)
   pnpm dev
   ```

3. **Clear Next.js cache**:
   ```bash
   rm -rf .next
   pnpm dev
   ```

## Build Issues

### TypeScript Compilation Errors

> **What's happening:** TypeScript is like a grammar checker for your code. It found "grammar mistakes" that need fixing.

**Problem**: Build fails with TypeScript errors.

**Solutions**:

1. **Check for type errors**:
   ```bash
   pnpm typecheck
   ```

2. **Common fixes** (like fixing grammar in an essay):
   ```tsx
   // ❌ Problem: TypeScript doesn't know what this function returns
   function fetchData() {
     return fetch('/api/data');
   }
   
   // ✅ Solution: Tell TypeScript what it returns
   function fetchData(): Promise<Response> {
     return fetch('/api/data');
   }
   
   // ❌ Problem: TypeScript doesn't know what 'event' is
   function handleEvent(event) {
     console.log(event);
   }
   
   // ✅ Solution: Tell TypeScript it's a MouseEvent
   function handleEvent(event: MouseEvent) {
     console.log(event);
   }
   ```

3. **Update TypeScript**:
   ```bash
   pnpm add -D typescript@latest
   pnpm typecheck
   ```

### ESLint Errors

> **What's happening:** ESLint is like a style guide enforcer. It found code that doesn't follow our team's style rules.

**Problem**: Linting errors prevent build.

**Solutions**:

1. **Auto-fix ESLint issues**:
   ```bash
   pnpm lint:fix
   ```

2. **Common ESLint fixes** (like following a writing style guide):
   ```tsx
   // ❌ Problem: useEffect uses userId but doesn't list it as dependency
   useEffect(() => {
     fetchData(userId);    // Uses userId
   }, []);                 // But doesn't mention userId here
   
   // ✅ Solution: Add userId to the dependency array
   useEffect(() => {
     fetchData(userId);
   }, [userId]);           // Now it knows to re-run when userId changes
   
   // ❌ Problem: onSave is defined but never used
   function Component({ data, onSave }) {
     return <div>{data}</div>;  // Only uses data, not onSave
   }
   
   // ✅ Solution: Remove unused variable or mark it as intentionally unused
   function Component({ data, onSave: _onSave }) {
     return <div>{data}</div>;  // _ prefix means "I know this is unused"
   }
   ```

3. **Disable specific rules (carefully)**:
   ```tsx
   // Disable for single line
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   const data: any = legacyApiCall();
   
   // Disable for block
   /* eslint-disable @typescript-eslint/no-explicit-any */
   function legacyCode() {
     // ...
   }
   /* eslint-enable @typescript-eslint/no-explicit-any */
   ```

### Turborepo Cache Issues

**Problem**: Builds fail or produce unexpected results due to cache.

**Solutions**:

1. **Clear Turborepo cache**:
   ```bash
   pnpm turbo clean
   rm -rf .turbo
   pnpm build
   ```

2. **Force rebuild specific package**:
   ```bash
   pnpm turbo build --filter=@portals/ui --force
   ```

3. **Debug cache behavior**:
   ```bash
   pnpm turbo build --dry-run
   pnpm turbo build --verbosity=2
   ```

## Authentication Issues

### NextAuth.js Session Errors

**Problem**: `JWTSessionError` or authentication not working.

**Solutions**:

1. **Check environment variables**:
   ```bash
   # Make sure these are set
   echo $NEXTAUTH_SECRET
   echo $NEXTAUTH_URL
   ```

2. **Clear browser cookies**:
   - Open browser dev tools
   - Go to Application/Storage tab
   - Clear cookies for localhost

3. **Fix JWT callback types**:
   ```tsx
   // ✅ Proper JWT callback
   callbacks: {
     async jwt({ token, user }) {
       if (user) {
         token.brokerId = user.brokerId;
       }
       return token;
     },
     async session({ session, token }) {
       if (token) {
         session.user.brokerId = token.brokerId;
       }
       return session;
     }
   }
   ```

### Middleware Redirect Loops

**Problem**: Infinite redirects between login and protected pages.

**Solutions**:

1. **Check middleware matcher**:
   ```tsx
   // middleware.ts
   export const config = {
     matcher: [
       '/((?!api|_next/static|_next/image|favicon.ico).*)',
     ]
   };
   ```

2. **Fix route protection logic**:
   ```tsx
   // ✅ Proper route protection
   const isPublicRoute = pathname === '/login';
   const isProtectedRoute = pathname.startsWith('/dashboard') || 
                           pathname.startsWith('/broker/') ||
                           pathname.startsWith('/sales/');
   
   if (!session && isProtectedRoute) {
     return NextResponse.redirect(new URL('/login', request.url));
   }
   ```

## Testing Issues

### Tests Failing

**Problem**: Tests fail unexpectedly or don't run.

**Solutions**:

1. **Check test setup**:
   ```bash
   # Run specific test
   pnpm test UserProfile.test.tsx
   
   # Run with verbose output
   pnpm test --verbose
   
   # Update snapshots if needed
   pnpm test --updateSnapshot
   ```

2. **Common test fixes**:
   ```tsx
   // ❌ Missing await
   it('should update user', () => {
     render(<UserForm />);
     fireEvent.click(screen.getByText('Save'));
     expect(screen.getByText('Saved')).toBeInTheDocument();
   });
   
   // ✅ Proper async testing
   it('should update user', async () => {
     render(<UserForm />);
     fireEvent.click(screen.getByText('Save'));
     await waitFor(() => {
       expect(screen.getByText('Saved')).toBeInTheDocument();
     });
   });
   ```

3. **Mock setup issues**:
   ```tsx
   // ✅ Proper mock setup
   vi.mock('@portals/api-client', () => ({
     useQuery: vi.fn(),
     useMutation: vi.fn(),
   }));
   
   beforeEach(() => {
     vi.clearAllMocks();
   });
   ```

### E2E Test Issues

**Problem**: Playwright tests fail or don't run properly.

**Solutions**:

1. **Install browsers**:
   ```bash
   npx playwright install
   ```

2. **Run with debug mode**:
   ```bash
   pnpm e2e --debug
   pnpm e2e --headed  # Run in headed mode
   ```

3. **Check test configuration**:
   ```typescript
   // playwright.config.ts
   export default defineConfig({
     baseURL: 'http://localhost:3000',
     webServer: {
       command: 'pnpm dev',
       url: 'http://localhost:3000',
       reuseExistingServer: !process.env.CI,
     },
   });
   ```

## Package Development Issues

### Package Not Found

**Problem**: `Cannot resolve module '@portals/my-package'` errors.

**Solutions**:

1. **Check package is built**:
   ```bash
   cd packages/my-package
   pnpm build
   ls dist/  # Should see built files
   ```

2. **Verify package.json exports**:
   ```json
   {
     "name": "@portals/my-package",
     "main": "./dist/index.js",
     "types": "./dist/index.d.ts",
     "exports": {
       ".": {
         "types": "./dist/index.d.ts",
         "default": "./dist/index.js"
       }
     }
   }
   ```

3. **Add to transpilePackages**:
   ```javascript
   // next.config.js
   const nextConfig = {
     transpilePackages: ['@portals/my-package'],
   };
   ```

### Circular Dependencies

**Problem**: Build fails with circular dependency errors.

**Solutions**:

1. **Find circular dependencies**:
   ```bash
   npx madge --circular packages/*/src
   ```

2. **Refactor to remove cycles**:
   ```tsx
   // ❌ Circular dependency
   // file-a.ts
   import { functionB } from './file-b';
   
   // file-b.ts  
   import { functionA } from './file-a';
   
   // ✅ Extract shared logic
   // shared.ts
   export const sharedFunction = () => {};
   
   // file-a.ts
   import { sharedFunction } from './shared';
   
   // file-b.ts
   import { sharedFunction } from './shared';
   ```

## Performance Issues

### Slow Build Times

**Problem**: Builds take too long to complete.

**Solutions**:

1. **Check Turborepo caching**:
   ```bash
   pnpm turbo build --dry-run  # See what would rebuild
   pnpm turbo build --graph    # Visualize dependency graph
   ```

2. **Optimize TypeScript config**:
   ```json
   // tsconfig.json
   {
     "compilerOptions": {
       "incremental": true,
       "tsBuildInfoFile": ".tsbuildinfo"
     },
     "exclude": ["node_modules", "dist", "coverage"]
   }
   ```

3. **Use SWC instead of Babel** (already configured in Next.js 15):
   ```javascript
   // next.config.js
   const nextConfig = {
     swcMinify: true,  // Already default in Next.js 13+
   };
   ```

### Slow Hot Reload

**Problem**: Hot reload takes too long during development.

**Solutions**:

1. **Reduce bundle size**:
   ```bash
   # Analyze bundle
   pnpm build
   npx @next/bundle-analyzer
   ```

2. **Use dynamic imports**:
   ```tsx
   // ✅ Lazy load heavy components
   const HeavyComponent = lazy(() => import('./HeavyComponent'));
   
   function App() {
     return (
       <Suspense fallback={<div>Loading...</div>}>
         <HeavyComponent />
       </Suspense>
     );
   }
   ```

## Environment Issues

### Environment Variables Not Loading

**Problem**: Environment variables are undefined in the application.

**Solutions**:

1. **Check .env file location**:
   ```bash
   # Should be in app root (apps/broker-portal/.env)
   ls apps/broker-portal/.env*
   ```

2. **Prefix with NEXT_PUBLIC_ for client-side**:
   ```bash
   # .env
   NEXTAUTH_SECRET=your-secret          # Server-side only
   NEXT_PUBLIC_APP_URL=http://localhost:3000  # Client-side accessible
   ```

3. **Restart development server** after changing .env files:
   ```bash
   # Kill and restart
   pnpm dev
   ```

### Corporate Network Issues (BCBST)

**Problem**: Network-related build or installation failures.

**Solutions**:

1. **Configure corporate proxy**:
   ```bash
   # Use the provided script
   ./scripts/configure-proxy.sh
   
   # Or configure manually
   npm config set proxy http://webproxy.bcbst.com:80
   npm config set https-proxy http://webproxy.bcbst.com:443
   pnpm config set proxy http://webproxy.bcbst.com:80
   pnpm config set https-proxy http://webproxy.bcbst.com:443
   ```

2. **SSL and registry issues**:
   ```bash
   # Set registry to HTTP (if required by security policy)
   npm config set registry http://registry.npmjs.org/
   pnpm config set registry http://registry.npmjs.org/
   ```

## Getting Help

### Before Asking for Help

1. **Check this troubleshooting guide**
2. **Search existing GitHub issues**
3. **Check the logs for specific error messages**
4. **Try reproducing in a clean environment**

### How to Ask for Help

1. **Provide context**:
   - What were you trying to do?
   - What steps did you take?
   - What did you expect to happen?
   - What actually happened?

2. **Include relevant information**:
   ```bash
   # System info
   node --version
   pnpm --version
   git --version
   
   # Project info
   cat package.json | grep version
   pnpm list --depth=0
   ```

3. **Share error messages**:
   - Copy the full error message
   - Include stack traces
   - Share relevant console logs

### Where to Get Help

- **Microsoft Teams**: Contact the Consumer Portals team for general questions
- **Email**: consumerportals@groups.bcbst.com for technical discussions
- **GitHub Issues**: For bugs and feature requests
- **Documentation**: Check other docs in this directory
- **Code Reviews**: Ask during PR reviews

---

**Remember**: Most issues can be resolved by:
1. Clearing caches (`pnpm clean`, `rm -rf node_modules`)
2. Updating dependencies (`pnpm update`)
3. Checking TypeScript/ESLint output
4. Reading error messages carefully 
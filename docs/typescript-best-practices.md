# TypeScript Best Practices

This document outlines best practices for TypeScript configuration in our monorepo to avoid common errors.

## Configuration Principles

1. **Standardized TypeScript Configurations**
   - All package configs should extend the shared base configs in `packages/tsconfig`
   - The root `tsconfig.json` defines global settings and path aliases

2. **Path Alias Management**
   - All path aliases should be defined only in the root `tsconfig.json`
   - Individual packages should not define their own path aliases
   - Use `@cp/*` for cross-package imports and `@/*` for local imports

3. **Required Options for All Configs**
   - `"skipLibCheck": true` - Avoids type errors in dependencies
   - Proper `typeRoots` configuration to find all type definitions
   - `"moduleResolution": "bundler"` for proper module resolution

## Common Issues and Solutions

### Missing Types

If you encounter errors like:
```
Cannot find type definition file for 'node'.
```

Solutions:
1. Add `skipLibCheck: true` to your tsconfig.json
2. Ensure `typeRoots` includes:
   ```json
   "typeRoots": [
     "../../node_modules/.pnpm/@types",
     "../../node_modules/@types",
     "./node_modules/@types"
   ]
   ```
3. Run `pnpm install` to ensure all dependencies are properly linked

### Path Resolution Errors

If you encounter errors like:
```
Cannot find module '@cp/ui/components' or its corresponding type declarations.
```

Solutions:
1. Ensure path aliases are correctly defined in the root tsconfig.json
2. Use consistent import patterns as defined in [Module Alias Standards](./module-aliases.md)
3. Check that the imported files actually exist in the specified paths

### Monorepo-Specific Issues

1. **Next.js Integration**
   - Ensure all imported packages are listed in `transpilePackages` in Next.js config
   - Use `jsx: "preserve"` in tsconfig.json for Next.js apps

2. **Jest Testing**
   - Use separate `tsconfig.test.json` for testing with appropriate settings
   - Set `"module": "commonjs"` for Jest compatibility

## Quick Fix Script

For projects experiencing widespread TypeScript issues, run the following command from the project root:

```bash
# Install required dependencies
pnpm add -D glob

# Run the fix script (requires prior installation of glob)
node scripts/fix-tsconfig.js

# Reinstall dependencies
pnpm install

# Clean build artifacts
pnpm run clean

# Check types
pnpm check-types
``` 
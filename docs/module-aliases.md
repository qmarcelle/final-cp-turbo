# Module Alias Standards

This document outlines the standard module aliasing conventions used in our monorepo to ensure consistent imports across packages and applications.

## Path Alias Configuration

All module aliases are centrally defined in the root `tsconfig.json` file. Individual package tsconfig files should **not** define their own path aliases (except for special cases like React resolution).

### Standard Aliases

| Alias | Purpose | Example |
|-------|---------|---------|
| `@/*` | Imports within the current package/app | `import { Button } from '@/components/Button'` |
| `@cp/*` | Cross-package imports within the monorepo | `import { useAuth } from '@cp/auth/hooks/useAuth'` |

## Package Aliases

The following package aliases are available:

| Package | Alias | Example Usage |
|---------|-------|---------------|
| Auth | `@cp/auth/*` | `import { useAuth } from '@cp/auth/hooks/useAuth'` |
| Router | `@cp/router/*` | `import { useNavigation } from '@cp/router/hooks/useNavigation'` |
| UI | `@cp/ui/*` | `import { Button } from '@cp/ui/components/Button'` |
| Testing | `@cp/testing/*` | `import { createTestUser } from '@cp/testing/fixtures/users'` |
| Logger | `@cp/logger/*` | `import { createLogger } from '@cp/logger/core'` |
| Utils | `@cp/utils/*` | `import { formatDate } from '@cp/utils/date'` |
| Types | `@cp/types/*` | `import type { User } from '@cp/types/auth'` |

## Best Practices

1. **Always use the appropriate alias**:
   - For imports within the same package, use `@/*`
   - For imports from another package, use the corresponding `@cp/*` alias

2. **Never use relative imports across packages**:
   - ❌ `import { Button } from '../../packages/ui/src/components/Button'`
   - ✅ `import { Button } from '@cp/ui/components/Button'`

3. **Use relative imports only for files in the same directory or subdirectories**:
   - ✅ `import { helper } from './helper'`
   - ✅ `import { constants } from './constants'`

## Technical Implementation

The module aliases are configured in:

1. **Root tsconfig.json** - Defines all aliases
2. **Next.js configs** - Includes the `transpilePackages` option for packages (all packages must be listed)
3. **Application configs** - Each app must include all packages in their transpilePackages

## Azure DevOps Integration

Since our project uses Azure DevOps instead of git hooks:

1. **Build Validation** - Set up build validation policies in Azure DevOps to run:
   ```bash
   pnpm check-types
   pnpm lint:all
   ```

2. **Pull Request Quality Gates** - Configure quality gates in Azure DevOps to require:
   - Type checking passes
   - Linting passes
   - Tests pass

## Troubleshooting

If you encounter path resolution issues:

1. Ensure you're using the correct alias format
2. Check that the imported file exists in the specified path
3. Verify that your package is listed in `transpilePackages` in the Next.js configs
4. Run `pnpm clean && pnpm install` to clean build artifacts and reinstall dependencies 
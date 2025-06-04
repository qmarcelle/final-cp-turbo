# Module Alias Standards

This document outlines the standard module aliasing conventions used in our monorepo to ensure consistent imports across packages and applications.

## Path Alias Configuration

All module aliases are centrally defined in the root `tsconfig.json` file. Individual package tsconfig files should **not** define their own path aliases (except for special cases like React resolution).

### Standard Aliases

| Alias | Purpose | Example |
|-------|---------|---------|
| `@/*` | Imports within the current package/app | `import { Button } from '@/components/Button'` |
| `@portals/*` | Cross-package imports within the monorepo | `import { useAuth } from '@portals/auth/hooks/useAuth'` |

## Package Aliases

The following package aliases are available:

| Package | Alias | Example Usage |
|---------|-------|---------------|
| Auth | `@portals/auth/*` | `import { useAuth } from '@portals/auth/hooks/useAuth'` |
| Router | `@portals/router/*` | `import { useNavigation } from '@portals/router/hooks/useNavigation'` |
| UI | `@portals/ui/*` | `import { Button } from '@portals/ui/components/Button'` |
| Testing | `@portals/testing/*` | `import { createTestUser } from '@portals/testing/fixtures/users'` |
| Logger | `@portals/logger/*` | `import { createLogger } from '@portals/logger/core'` |
| Utils | `@portals/utils/*` | `import { formatDate } from '@portals/utils/date'` |
| Types | `@portals/types/*` | `import type { User } from '@portals/types/auth'` |

## Best Practices

1. **Always use the appropriate alias**:
   - For imports within the same package, use `@/*`
   - For imports from another package, use the corresponding `@portals/*` alias

2. **Never use relative imports across packages**:
   - ❌ `import { Button } from '../../packages/ui/src/components/Button'`
   - ✅ `import { Button } from '@portals/ui/components/Button'`

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
# TurboRepo Dependency Management for Web 2025

This guide outlines our approach to dependency management using TurboRepo, providing best practices, standards, and workflows for our development teams.

## Table of Contents

1. [Core Principles](#core-principles)
2. [Workspace Organization](#workspace-organization)
3. [Dependency Management](#dependency-management)
4. [Caching Strategy](#caching-strategy)
5. [Task Configuration](#task-configuration)
6. [Remote Caching](#remote-caching)
7. [CI/CD Integration](#cicd-integration)
8. [Troubleshooting](#troubleshooting)
9. [Recommended Workflows](#recommended-workflows)

## Core Principles

- **Single Source of Truth**: All dependencies are managed through the root `package.json` and workspace packages.
- **Minimal Duplication**: Dependencies should be hoisted whenever possible to reduce duplication.
- **Explicit Dependencies**: Each package should explicitly declare its dependencies for clarity.
- **Versioning Strategy**: We use semantic versioning for all packages.
- **Performance First**: Optimize build, test, and development workflows through smart caching and parallel execution.

## Workspace Organization

Our monorepo follows this structure:

```
bcbst-portals/
├── apps/               # User-facing applications
│   ├── member-portal/  # Member-facing portal
│   ├── broker-portal/  # Broker-facing portal
│   └── employer-portal/  # Employer-facing portal
├── packages/           # Shared libraries and utilities
│   ├── ui/             # UI component library
│   ├── types/          # Shared TypeScript types
│   ├── utils/          # General utilities
│   ├── api-client/     # API client library
│   └── ...             # Other internal packages
├── turbo.json          # TurboRepo configuration
└── package.json        # Root package config
```

### Guidelines for adding new workspaces:

1. Use the workspace generator: `pnpm gen:workspace`
2. Follow the naming convention: `@portals/{package-name}`
3. Document the package's purpose in its README.md
4. Add appropriate build, test, and lint scripts

## Dependency Management

### Dependency Types

- **Root Dependencies**: Tools used across the entire monorepo (e.g., ESLint, TypeScript)
- **Workspace Dependencies**: Package-specific dependencies
- **Peer Dependencies**: Libraries expected to be provided by the consuming app (e.g., React)

### Best Practices

#### Adding Dependencies

```bash
# Add a dev dependency to the root
pnpm add -D eslint --workspace-root

# Add a dependency to a specific workspace
pnpm add axios --filter @portals/api-client

# Add a dependency to multiple workspaces
pnpm add dayjs --filter "@portals/broker-portal..." --filter "@portals/employer-portal..."
```

#### Updating Dependencies

```bash
# Update a specific package
pnpm update react --recursive

# Update all dependencies
pnpm update --recursive

# Check for outdated packages
pnpm dlx npm-check-updates
```

#### Handling Dependency Conflicts

We use `pnpm.overrides` in the root `package.json` to enforce consistent versions of key packages:

```json
"pnpm": {
  "overrides": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  }
}
```

## Caching Strategy

TurboRepo uses content-based caching to dramatically speed up builds. Our strategy:

1. **Local Cache**: Default for development
2. **Remote Cache**: For CI/CD and team sharing
3. **Cache Keys**: Based on file content, not timestamps
4. **Outputs**: Explicitly defined in `turbo.json`

### Cache Configuration in `turbo.json`

```json
{
  "pipeline": {
    "build": {
      "outputs": ["dist/**", ".next/**", "!.next/cache/**"],
      "cache": true
    }
  }
}
```

## Task Configuration

Our tasks are configured in `turbo.json` with the following pattern:

```json
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "test": {
      "dependsOn": ["build"],
      "inputs": ["src/**/*.tsx", "test/**/*.tsx"]
    }
  }
}
```

Key patterns:
- `^build` means "dependent workspaces' build tasks"
- `build` means "this workspace's build task"

## Remote Caching

For team collaboration, we use Vercel Remote Caching:

```bash
# Login to Vercel
pnpm dlx turbo login

# Link to your project
pnpm dlx turbo link

# Enable remote caching with
pnpm build --remote-only
```

## CI/CD Integration

TurboRepo is integrated with our CI/CD pipelines:

```yaml
# Example Azure DevOps Pipeline workflow (see azure-pipelines.yml)
steps:
  - task: NodeTool@0
    inputs:
      versionSpec: "20.x"
    displayName: "Install Node.js"
  - uses: pnpm/action-setup@v2
    with:
      version: 9.x
  - uses: actions/setup-node@v3
    with:
      node-version: 20
      cache: 'pnpm'
  - run: pnpm install --frozen-lockfile
  - name: Build
    run: pnpm build
    env:
      TURBO_TOKEN: ${{ secrets.TURBO_TOKEN }}
      TURBO_TEAM: ${{ vars.TURBO_TEAM }}
```

## Troubleshooting

Common issues and solutions:

### Invalid Cache

Clear the local cache:
```bash
rm -rf ./node_modules/.cache/turbo
```

### Dependency Resolution Issues

Force reinstall dependencies:
```bash
pnpm clean:install
```

### Inconsistent Locks

Update lockfile:
```bash
pnpm install --force
```

## Recommended Workflows

### Development Workflow

1. Clone the repository
2. `pnpm install`
3. `pnpm dev --filter=@portals/broker-portal` (to work on a specific app)
4. `pnpm dev` (to run all workspaces)

### Creating a New Feature

1. Create a new branch: `git checkout -b feature/new-feature`
2. Make changes
3. Test locally: `pnpm test --filter=@portals/affected-package`
4. Run type checking: `pnpm check-types`
5. Create a PR

### Updating the Monorepo

Run our update script:
```bash
node scripts/update-dependencies.js
```

This will:
1. Update TurboRepo to the latest version
2. Update pnpm
3. Optimize configuration files
4. Install useful development tools
5. Apply best practices for dependency management 
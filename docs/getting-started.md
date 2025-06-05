# 🚀 Getting Started Guide

This guide will help you set up the Consumer Portals monorepo for development.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js 20.x** (use `nvm` for version management)
- **Git 2.x**  
- **VS Code** (recommended IDE)

> **Note**: The project uses `pnpm` for package management. If you don't have `pnpm` installed globally, the setup process will install it locally.

## Quick Setup

### 1. Clone the Repository

```bash
git clone [repository-url]
cd cp_turbo_skeleton
```

### 2. Install Dependencies

```bash
# Option 1: Automated setup (recommended for first time)
npm start

# Option 2: Manual setup
pnpm install
```

The automated setup will:
- Check for `pnpm` and install it locally if needed
- Install all workspace dependencies
- Build all packages and applications
- Start the broker portal in development mode

### 3. Start Development

```bash
# Start all applications
pnpm dev

# Or start specific applications
pnpm dev:broker          # Broker portal only (port 3000)
pnpm dev:employer        # Employer portal only (port 3001)
```

### 4. Verify Setup

Open your browser and navigate to:
- **Broker Portal**: [http://localhost:3000](http://localhost:3000)
- **Employer Portal**: [http://localhost:3001](http://localhost:3001)

You should see the portal welcome pages.

## Corporate Network Setup (BCBST Only)

If you're on the BCBST corporate network, run the proxy configuration:

```bash
# Linux/macOS
./scripts/configure-proxy.sh

# Windows (PowerShell)
.\scripts\configure-proxy.ps1
```

This configures npm, pnpm, and git for the corporate proxy (`webproxy.bcbst.com:80/443`).

## IDE Configuration

### VS Code Setup

1. **Install recommended extensions** when prompted, or manually install:
   - ESLint
   - Prettier - Code formatter
   - Tailwind CSS IntelliSense
   - TypeScript Importer
   - Path Intellisense

2. **Configure workspace settings** (`.vscode/settings.json`):
   ```json
   {
     "editor.formatOnSave": true,
     "editor.defaultFormatter": "esbenp.prettier-vscode",
     "editor.codeActionsOnSave": {
       "source.fixAll.eslint": true,
       "source.organizeImports": true
     },
     "typescript.tsdk": "node_modules/typescript/lib",
     "typescript.enablePromptUseWorkspaceTsdk": true
   }
   ```

## Project Structure Overview

```
cp_turbo_skeleton/
├── apps/                   # Deployable applications
│   ├── broker-portal/      # Broker tools & management
│   └── employer-portal/    # Employer administration
├── packages/               # Shared libraries
│   ├── ui/                # Component library (@portals/ui)
│   ├── auth/              # Authentication (@portals/auth)
│   ├── api-client/        # API integration (@portals/api-client)
│   ├── logger/            # Logging utilities (@portals/logger)
│   ├── testing/           # Test utilities (@portals/testing)
│   ├── types/             # Shared TypeScript types (@portals/types)
│   ├── utils/             # Common utilities (@portals/utils)
│   ├── eslint-config/     # ESLint configuration (@portals/eslint-config)
│   └── tsconfig/          # TypeScript configuration (@portals/tsconfig)
├── docs/                  # Documentation
├── scripts/               # Utility scripts
├── turbo.json            # Turborepo configuration
└── package.json          # Root package configuration
```

## Essential Commands

```bash
# Development
pnpm dev                   # Start all apps in development mode
pnpm build                 # Build all packages and apps
pnpm clean                 # Clean build artifacts

# Testing
pnpm test                  # Run all tests
pnpm test:watch           # Run tests in watch mode
pnpm e2e                  # Run end-to-end tests

# Code Quality
pnpm lint                 # Lint all code
pnpm lint:fix             # Fix linting issues
pnpm typecheck            # TypeScript type checking
pnpm format               # Format code with Prettier

# Package Management
pnpm add [package] --filter=[workspace]  # Add dependency to specific workspace
pnpm update --recursive                   # Update all dependencies
```

## Development Workflow

1. **Create a feature branch**: `git checkout -b feature/PRT-123-new-feature`
2. **Make your changes**: Edit code, add tests, update docs
3. **Run quality checks**: `pnpm lint && pnpm typecheck && pnpm test`
4. **Commit your changes**: Follow [conventional commit format](./contributing.md#commit-message-format)
5. **Push and create PR**: Follow the [contributing guidelines](./contributing.md)

## Common Issues

### Port Already in Use
If ports 3000/3001 are in use, the dev server will automatically use the next available port.

### TypeScript Errors
Run `pnpm typecheck` to see detailed TypeScript errors. See [Development Guide](./development.md) for common solutions.

### Build Failures
Clean your build artifacts and reinstall dependencies:
```bash
pnpm clean
pnpm install
pnpm build
```

### Performance Issues
If builds are slow, check if Turborepo caching is working:
```bash
pnpm build --dry-run  # See what would be rebuilt
```

## Next Steps

Now that you have the project running:

1. **Read the [Architecture Overview](./architecture.md)** to understand the system design
2. **Review [Development Guide](./development.md)** for coding standards and workflows
3. **Explore the [Testing Guide](./testing.md)** to learn about testing strategies
4. **Check out the [Module Aliases](./module-aliases.md)** for import conventions

## Getting Help

- **Microsoft Teams**: Contact the Consumer Portals team
- **Email**: consumerportals@groups.bcbst.com
- **Documentation**: Check the [troubleshooting guide](./troubleshooting.md)
- **Issues**: Create a GitHub issue with the `help-wanted` label

---

**Need help?** Don't hesitate to reach out via Teams or email! 
# 🚀 Getting Started Guide

This guide will help you set up the Consumer Portals monorepo for development.

> **New to our tech stack?** Check out our **[Developer-Friendly Guide](./developer-friendly-guide.md)** first for explanations of TurboRepo, Next.js, and all the technologies we use!

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js 20.x** (use `nvm` for version management)
- **Git 2.x**  
- **VS Code** (recommended IDE)

> **What's pnpm?** It's like npm but faster and more efficient for monorepos (projects with multiple apps). Don't worry if you haven't used it before - it works just like npm but with better performance.

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
- **Broker Portal**: [http://localhost:3000](http://localhost:3000) - Tools for insurance brokers
- **Employer Portal**: [http://localhost:3001](http://localhost:3001) - Tools for employers managing benefits

You should see the portal welcome pages. If you see a login screen, that's normal - the authentication system is working!

## Corporate Network Setup (BCBST Employees Only)

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

> **Think of this like a shopping mall:** `apps/` are the stores (actual websites), `packages/` are the shared services (security, utilities, etc.)

```
cp_turbo_skeleton/
├── apps/                   # 🏢 The actual websites ("stores in the mall")
│   ├── broker-portal/      # Website for insurance brokers
│   └── employer-portal/    # Website for employers
├── packages/               # 📦 Shared code ("mall services")
│   ├── ui/                # Reusable UI components (buttons, forms, etc.)
│   ├── auth/              # Login/logout functionality
│   ├── api-client/        # Talking to backend services
│   ├── logger/            # Recording what happens (for debugging)
│   ├── testing/           # Tools for testing code
│   ├── types/             # TypeScript type definitions
│   ├── utils/             # Helper functions used everywhere
│   ├── eslint-config/     # Code style rules
│   └── tsconfig/          # TypeScript configuration
├── docs/                  # 📚 Documentation (you are here!)
├── scripts/               # 🔧 Automation scripts
├── turbo.json            # TurboRepo configuration
└── package.json          # Project dependencies and scripts
```

## Essential Commands

> **Don't memorize these!** Just bookmark this page and come back when you need them.

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

> **This is your daily routine:** Think of it like getting ready for work - there's a logical order that makes everything smoother.

1. **Create a feature branch**: `git checkout -b feature/PRT-123-new-feature`
   - Like making a copy of the project to work on safely
2. **Make your changes**: Edit code, add tests, update docs
   - Do your actual work here
3. **Run quality checks**: `pnpm lint && pnpm typecheck && pnpm test`
   - Like proofreading before submitting
4. **Commit your changes**: Follow [conventional commit format](./contributing.md#commit-message-format)
   - Save your work with a clear description
5. **Push and create PR**: Follow the [contributing guidelines](./contributing.md)
   - Submit your work for review

## Common Issues

> **Don't panic!** These are normal issues that everyone runs into. Here's how to fix them:

### Port Already in Use
If ports 3000/3001 are in use, the dev server will automatically use the next available port.

> **What this means:** If you have other apps running (like another Next.js project), they might be using the same port. The system will automatically find a free port and tell you which one to use.

### TypeScript Errors
Run `pnpm typecheck` to see detailed TypeScript errors. See [Development Guide](./development.md) for common solutions.

> **What TypeScript does:** It's like spell-check for your code, catching errors before they become bugs.

### Build Failures
Clean your build artifacts and reinstall dependencies:
```bash
pnpm clean      # Delete old build files
pnpm install    # Reinstall dependencies
pnpm build      # Try building again
```

> **Why this works:** Sometimes old build files get corrupted. This is like "turning it off and on again" for your project.

### Performance Issues
If builds are slow, check if Turborepo caching is working:
```bash
pnpm build --dry-run  # See what would be rebuilt
```

## Next Steps

Now that you have the project running:

1. **New to our tech stack?** Read the **[Developer-Friendly Guide](./developer-friendly-guide.md)** first
2. **Understand the big picture:** [Architecture Overview](./architecture.md)
3. **Learn daily workflows:** [Development Guide](./development.md)
4. **Write better tests:** [Testing Guide](./testing.md)
5. **Import like a pro:** [Module Aliases](./module-aliases.md)

## Getting Help

> **We're here to help!** Seriously, no question is too small. We'd rather you ask than struggle alone.

- **Microsoft Teams**: Consumer Portals team channel (fastest response)
- **Email**: consumerportals@groups.bcbst.com (for longer questions)
- **Documentation**: Check the [troubleshooting guide](./troubleshooting.md) first
- **Issues**: Create a GitHub issue with the `help-wanted` label

### 💡 Pro Tips for Getting Help
1. **Include error messages** - Copy/paste the exact error
2. **Describe what you were trying to do** - Context helps us help you faster
3. **Mention what you already tried** - Saves everyone time

---

**Remember:** Every expert was once a beginner. Don't hesitate to ask questions! 🚀 
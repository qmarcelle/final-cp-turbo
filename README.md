# 🏗️ BCBST Consumer Portals Monorepo

> Enterprise-grade portals built with Next.js, TypeScript, and Turborepo

## 🚀 Quick Start

```bash
# 1. Clone and install
git clone [repository-url]
cd cp_turbo_skeleton
pnpm install

# 2. Start development
pnpm dev                    # Start all apps
pnpm dev:broker            # Start broker portal only
pnpm dev:employer          # Start employer portal only
```

**Access your portals:**
- Broker Portal: [http://localhost:3000](http://localhost:3000)
- Employer Portal: [http://localhost:3001](http://localhost:3001)

## 📁 Project Structure

```
cp_turbo_skeleton/
├── apps/                   # Deployable applications
│   ├── broker-portal/      # Broker tools & management
│   └── employer-portal/    # Employer administration
├── packages/               # Shared libraries
│   ├── ui/                # Component library
│   ├── auth/              # Authentication
│   ├── api-client/        # API integration
│   ├── logger/            # Logging utilities
│   ├── testing/           # Test utilities
│   └── utils/             # Common utilities
└── docs/                  # Documentation
```

## 📚 Documentation

| Topic | Description |
|-------|-------------|
| **[Getting Started](./docs/getting-started.md)** | Complete setup guide for new developers |
| **[Architecture](./docs/architecture.md)** | System design and package relationships |
| **[Development Guide](./docs/development.md)** | Day-to-day development workflows |
| **[Testing Guide](./docs/testing.md)** | Testing strategies and configuration |
| **[TypeScript Guide](./docs/typescript-best-practices.md)** | TypeScript standards and best practices |
| **[Dependency Management](./docs/dependency-management.md)** | Package management with Turborepo |
| **[Module Aliases](./docs/module-aliases.md)** | Import path standards |
| **[Deployment](./docs/deployment.md)** | Build processes and Azure pipeline integration |
| **[Contributing](./docs/contributing.md)** | Contribution guidelines and workflows |

## 🛠️ Common Commands

```bash
# Development
pnpm dev                   # Start all apps in dev mode
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

## 🎯 Key Technologies

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript (strict mode)
- **Monorepo**: Turborepo with pnpm workspaces
- **Styling**: Tailwind CSS
- **Testing**: Jest + Testing Library + Playwright
- **Auth**: NextAuth.js v5 (beta.28)
- **Code Quality**: ESLint + Prettier + Husky

## 🤝 Quick Links

- **[Architecture Overview](./docs/architecture.md)** - Understand the system design
- **[Development Setup](./docs/getting-started.md)** - Get up and running quickly  
- **[Coding Standards](./docs/development.md#coding-standards)** - Follow our conventions
- **[Troubleshooting](./docs/troubleshooting.md)** - Solve common issues

## 📞 Support

- **Microsoft Teams**: Contact the Consumer Portals team
- **Email**: consumerportals@groups.bcbst.com
- **Documentation Issues**: Create an issue with the `documentation` label
- **Technical Questions**: Reach out via Teams or create a GitHub discussion

---

**Last Updated**: January 2025 | **Maintained By**: The Consumer Portals Team
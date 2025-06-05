# BCBST Consumer Portals

> Authenticated BCBST Portals

A modern monorepo built with Next.js, TypeScript, and Turborepo for managing BCBST's consumer-facing applications.

## Quick Start

```bash
# Clone and install
git clone [repository-url]
cd cp_turbo_skeleton
pnpm install

# Start development
pnpm dev                    # All apps
pnpm dev:broker            # Broker portal only
pnpm dev:employer          # Employer portal only
```

**Your portals:**
- Broker Portal: http://localhost:3000
- Employer Portal: http://localhost:3001

## What's Inside

```
cp_turbo_skeleton/
├── apps/                   # Portal applications
│   ├── broker-portal/      # Tools for insurance brokers
│   └── employer-portal/    # Benefits management for employers
├── packages/               # Shared libraries
│   ├── ui/                # Component library
│   ├── auth/              # Authentication
│   ├── api-client/        # API integration & mocking
│   └── [more...]          # Utilities, testing, logging
└── docs/                  # Documentation
```

## Documentation

**New to the project?** Start with our [Getting Started Guide](./docs/getting-started.md)

| Guide | What You'll Learn |
|-------|------------------|
| [Getting Started](./docs/getting-started.md) | Setup and first steps |
| [Development](./docs/development.md) | Daily workflows and standards |
| [Architecture](./docs/architecture.md) | How everything fits together |
| [Testing](./docs/testing.md) | Testing strategies |
| [MSW Setup](./docs/msw-setup.md) | API mocking for development |

[View all documentation →](./docs/README.md)

## Common Commands

```bash
# Development
pnpm dev                   # Start all apps
pnpm build                 # Build everything
pnpm clean                 # Clean build artifacts

# Testing
pnpm test                  # Run all tests
pnpm test:watch           # Watch mode
pnpm e2e                  # End-to-end tests

# Code Quality
pnpm lint                 # Check code style
pnpm lint:fix             # Fix issues
pnpm typecheck            # Type checking
```

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **Monorepo**: Turborepo + pnpm workspaces
- **Testing**: Jest + Cypress + Testing Library
- **Auth**: NextAuth.js v5

## Need Help?

- **Documentation Issues**: Create an issue with `documentation` label
- **Questions**: Reach out on Microsoft Teams
- **Email**: consumerportals@groups.bcbst.com

---

*Built by the Consumer Portals Team*
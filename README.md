# BCBST Consumer Portals

A modern, monorepo-based approach to building scalable and maintainable portals for brokers and employers.

## Architecture Overview

This project is a monorepo containing multiple packages and applications focused on providing broker and employer portal experiences. The architecture is designed to be modular, allowing for shared components and business logic while keeping portal-specific code separate.

### Key Components

- **Broker Portal**: An application designed for insurance brokers to manage their clients and accounts.
- **Employer Portal**: An application for employers to manage employee benefits and plans.

### Technical Stack

- **Framework**: React, Next.js
- **State Management**: Zustand for global state
- **UI Components**: Custom component library with a design system
- **Authentication**: NextAuth.js with customized providers
- **Routing**: Type-safe routing system
- **Testing**: Jest, React Testing Library, Cypress
- **Build System**: Turborepo for efficient package management

## Portal-Specific Architecture

### Broker Portal

The broker portal includes the following key features:

- Dashboard with a summary of clients and accounts
- Client management
- Account details view
- Reports and analytics

Routes are structured as follows:
- `/broker/home`: Main dashboard
- `/broker/accounts`: Account listing
- `/broker/accounts/:accountId`: Account details
- `/broker/clients`: Client listing
- `/broker/clients/:clientId`: Client details

### Employer Portal

The employer portal includes the following key features:

- Dashboard with employee benefits overview
- Employee management
- Benefits plan administration
- Enrollment management

Routes are structured as follows:
- `/employer/home`: Main dashboard
- `/employer/employees`: Employee listing
- `/employer/employees/:employeeId`: Employee details
- `/employer/benefits`: Benefits overview
- `/employer/benefits/plans`: Plan management

## Authentication and Permissions

User roles are defined as:
- **Admin**: Full system access
- **Broker**: Access to broker-specific features
- **Employer**: Access to employer-specific features
- **Guest**: Limited access for unauthenticated users

Each role has specific permissions that control access to features.

## Getting Started

### Prerequisites

- Node.js v18+
- pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/bcbst-portals.git

# Navigate to the project directory
cd bcbst-portals

# Install dependencies
pnpm install

# Build all packages
pnpm build

# Start development server
pnpm dev
```

## Development Guidelines

- Use the shared component library for UI elements
- Follow the repository's ESLint and TypeScript configuration
- Write tests for all new features
- Document all APIs and complex components

## Deployment

The application uses a CI/CD pipeline for automated testing and deployment. Deploy to different environments using:

```bash
# Development deployment
pnpm deploy:dev

# Staging deployment
pnpm deploy:staging

# Production deployment
pnpm deploy:prod
```

## Contributing

Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests. 
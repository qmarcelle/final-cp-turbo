# Employer Portal

A Next.js application for insurance plan employers, built with the Consumer Portals framework.

## Overview

The Employer Portal provides a powerful platform for employers to manage their employee benefits, insurance plans, and enrollment processes. It uses the Consumer Portals shared packages for UI components, authentication, routing, and API interactions.

## Features

- **Modern UI**: Built with Next.js and Tailwind CSS
- **Authentication**: Secure login and session management
- **Plan Management**: View and configure insurance plans
- **Employee Management**: Add, update, and remove employees
- **Enrollment**: Manage open enrollment periods
- **Reporting**: Access and export usage and claims reports

## Technology Stack

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **State Management**: React Hooks
- **Authentication**: NextAuth.js via @cp/auth
- **Routing**: Next.js App Router with @cp/router
- **API Communication**: SWR and Axios via @cp/api-client
- **Logging**: Structured logging via @cp/logger

## Project Structure

```
employer-portal/
├── src/
│   ├── app/              # Next.js App Router
│   ├── components/       # UI Components
│   ├── hooks/            # Custom React hooks
│   ├── styles/           # Global styles
│   ├── types/            # TypeScript types
│   └── utils/            # Utility functions
├── public/               # Static assets
├── tailwind.config.js    # Tailwind configuration
└── next.config.js        # Next.js configuration
```

## Getting Started

### Prerequisites

- Node.js 18+
- PNPM package manager

### Installation

From the root of the monorepo:

```bash
# Install dependencies
pnpm install

# Build dependent packages
pnpm build

# Start development server
pnpm --filter employer-portal dev
```

### Environment Variables

Create a `.env.local` file:

```
NEXTAUTH_URL=http://localhost:3001
NEXTAUTH_SECRET=your-secret-here
NEXT_PUBLIC_API_URL=https://api.example.com
```

## Usage of Shared Packages

### UI Components

The portal uses the `@cp/ui` package for core UI components:

```tsx
import { Button, Input, FormLayout } from '@cp/ui';

function PlanForm() {
  return (
    <FormLayout variant="column">
      <Input name="planName" label="Plan Name" />
      <Input name="planType" label="Plan Type" />
      <Button variant="primary">Save Plan</Button>
    </FormLayout>
  );
}
```

### Authentication

Authentication is handled via the `@cp/auth` package:

```tsx
import { useSession, signIn, signOut } from '@cp/auth';

function ProfileButton() {
  const { data: session, status } = useSession();
  
  if (status === 'authenticated') {
    return <button onClick={() => signOut()}>Sign Out</button>;
  }
  
  return <button onClick={() => signIn()}>Sign In</button>;
}
```

### API Client

API communication uses the `@cp/api-client` package:

```tsx
import { useQuery } from '@cp/api-client';

function EmployeeList() {
  const { data, error, isLoading } = useQuery('/api/employees');
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <ul>
      {data.map(employee => (
        <li key={employee.id}>{employee.name}</li>
      ))}
    </ul>
  );
}
```

### Routing

Navigation is managed via the `@cp/router` package:

```tsx
import { useRouter } from '@cp/router';
import { routes } from '@/routes';

function Navigation() {
  const router = useRouter();
  
  return (
    <nav>
      <button onClick={() => router.navigate(routes.dashboard)}>
        Dashboard
      </button>
      <button onClick={() => router.navigate(routes.employees)}>
        Employees
      </button>
    </nav>
  );
}
```

## Building for Production

```bash
# From the monorepo root
pnpm build --filter employer-portal
```

The built application will be available in the `.next` directory.

## License

Proprietary and Confidential 
# Employer Portal

Benefits management platform for insurance plan employers.

## Overview

The Employer Portal helps employers manage their employee benefits, insurance plans, and enrollment processes. Built with Next.js and the shared Consumer Portals component library.

## Quick Start

```bash
# From the monorepo root
pnpm install

# Start development server
pnpm dev:employer
# or
pnpm --filter employer-portal dev
```

Portal runs at: **http://localhost:3001**

## Environment Setup

Create `.env.local`:

```bash
NEXTAUTH_URL=http://localhost:3001
NEXTAUTH_SECRET=your-secret-here
NEXT_PUBLIC_API_URL=https://api.example.com

# Optional: Enable MSW for API mocking
NEXT_PUBLIC_ENABLE_MSW=true
```

## Key Features

- **Plan Management**: Configure and manage insurance plans
- **Employee Management**: Add, update, and remove employees
- **Enrollment**: Handle open enrollment periods and plan selections
- **Reporting**: Access usage analytics and claims reports
- **Authentication**: Secure employer login and session management

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS
- **Authentication**: NextAuth.js via `@portals/auth`
- **API**: SWR with `@portals/api-client`
- **Components**: `@portals/ui` component library
- **Logging**: `@portals/logger`

## Using Shared Packages

### UI Components

```tsx
import { Button, Input, FormLayout } from '@portals/ui'

function PlanForm() {
  return (
    <FormLayout>
      <Input name="planName" label="Plan Name" />
      <Input name="planType" label="Plan Type" />
      <Button variant="primary">Save Plan</Button>
    </FormLayout>
  )
}
```

### API Calls

```tsx
import { useQuery } from '@portals/api-client'

function EmployeeList() {
  const { data, error, isLoading } = useQuery('/api/employees')
  
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  
  return (
    <ul>
      {data.map(employee => (
        <li key={employee.id}>{employee.name}</li>
      ))}
    </ul>
  )
}
```

### Authentication

```tsx
import { useSession, signIn, signOut } from '@portals/auth'

function ProfileButton() {
  const { data: session, status } = useSession()
  
  if (status === 'authenticated') {
    return <button onClick={() => signOut()}>Sign Out</button>
  }
  
  return <button onClick={() => signIn()}>Sign In</button>
}
```

## Project Structure

```
employer-portal/
├── src/
│   ├── app/              # Next.js App Router
│   ├── components/       # Portal-specific components
│   ├── hooks/            # Custom React hooks
│   ├── styles/           # Global styles
│   └── types/            # TypeScript types
├── public/               # Static assets
└── [config files]
```

## API Mocking

For development with mocked APIs, see our complete setup guide:

**[→ MSW Setup Guide](../../docs/msw-setup.md)**

## Documentation

For comprehensive development guidance:

- **[Getting Started](../../docs/getting-started.md)** - First time setup
- **[Development Guide](../../docs/development.md)** - Daily workflows
- **[Architecture](../../docs/architecture.md)** - System design
- **[Testing](../../docs/testing.md)** - Testing strategies

## Building for Production

```bash
# Build the employer portal
pnpm build --filter employer-portal
```

Built files are generated in the `.next` directory. 
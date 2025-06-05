# Broker Portal

Insurance management platform for brokers and agents.

## Overview

The Broker Portal provides comprehensive tools for insurance brokers to manage clients, policies, quotes, and commissions. Built with Next.js and the shared Consumer Portals component library.

## Quick Start

```bash
# From the monorepo root
pnpm install

# Start development server
pnpm dev:broker
# or
pnpm --filter broker-portal dev
```

Portal runs at: **http://localhost:3000**

## Environment Setup

Create `.env.local`:

```bash
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-here
NEXT_PUBLIC_API_URL=https://api.example.com

# Optional: Enable MSW for API mocking
NEXT_PUBLIC_ENABLE_MSW=true
```

## Key Features

- **Client Management**: View and manage client information and relationships
- **Policy Administration**: Handle policies, renewals, and coverage details
- **Quote Generation**: Create and customize insurance quotes
- **Commission Tracking**: Monitor earnings and payment schedules
- **Reporting**: Access sales analytics and performance metrics

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

function LoginForm() {
  return (
    <FormLayout>
      <Input name="email" label="Email" />
      <Input name="password" label="Password" type="password" />
      <Button variant="primary">Log In</Button>
    </FormLayout>
  )
}
```

### API Calls

```tsx
import { useQuery } from '@portals/api-client'

function ClientList() {
  const { data, error, isLoading } = useQuery('/api/clients')
  
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  
  return (
    <ul>
      {data.map(client => (
        <li key={client.id}>{client.name}</li>
      ))}
    </ul>
  )
}
```

### Authentication

```tsx
import { useSession, signIn, signOut } from '@portals/auth'

function AuthButton() {
  const { data: session, status } = useSession()
  
  if (status === 'authenticated') {
    return <button onClick={() => signOut()}>Sign Out</button>
  }
  
  return <button onClick={() => signIn()}>Sign In</button>
}
```

## Project Structure

```
broker-portal/
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
# Build the broker portal
pnpm build --filter broker-portal
```

Built files are generated in the `.next` directory. 
# Broker Portal

A Next.js application for insurance brokers, built with the Consumer Portals framework.

## Overview

The Broker Portal provides a comprehensive platform for insurance brokers to manage clients, policies, and quotes. It uses the Consumer Portals shared packages for UI components, authentication, routing, and API interactions.

## Features

- **Modern UI**: Built with Next.js and Tailwind CSS
- **Authentication**: Secure login and session management
- **Client Management**: View and manage client information
- **Policy Administration**: Manage policies and renewals
- **Quote Generation**: Create and customize insurance quotes

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
broker-portal/
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
pnpm --filter broker-portal dev
```

### Environment Variables

Create a `.env.local` file:

```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-here
NEXT_PUBLIC_API_URL=https://api.example.com
```

## Usage of Shared Packages

### UI Components

The portal uses the `@cp/ui` package for core UI components:

```tsx
import { Button, Input, FormLayout } from '@cp/ui';

function LoginForm() {
  return (
    <FormLayout variant="column">
      <Input name="email" label="Email" />
      <Input name="password" label="Password" type="password" />
      <Button variant="primary">Log In</Button>
    </FormLayout>
  );
}
```

### Authentication

Authentication is handled via the `@cp/auth` package:

```tsx
import { useSession, signIn, signOut } from '@cp/auth';

function AuthButton() {
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

function ClientList() {
  const { data, error, isLoading } = useQuery('/api/clients');
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <ul>
      {data.map(client => (
        <li key={client.id}>{client.name}</li>
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
      <button onClick={() => router.navigate(routes.clients)}>
        Clients
      </button>
    </nav>
  );
}
```

## Building for Production

```bash
# From the monorepo root
pnpm build --filter broker-portal
```

The built application will be available in the `.next` directory.

## License

Proprietary and Confidential 
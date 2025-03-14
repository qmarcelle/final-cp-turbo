# Broker and Employer Portal Architecture

This document provides a detailed overview of the architecture for the broker and employer portals in the BCBST Consumer Portals platform.

## Overview

The platform is designed around two primary user roles:

1. **Brokers**: Insurance professionals who manage multiple clients (employers) and their benefit plans.
2. **Employers**: Organizations that manage employee benefits and health plans.

This focus ensures that the platform serves the specific needs of these user types without unnecessary complexity.

## User Roles and Permissions

### Broker Role

Brokers have the following permissions:
- View and manage client accounts
- Review client details and history
- Generate reports and analytics
- Access benefit plan details
- Communicate with clients

### Employer Role

Employers have the following permissions:
- Manage employee information
- Administer benefit plans
- Handle enrollment processes
- View and generate reports
- Communicate with employees

### Admin Role

Administrators have extended permissions for platform management:
- User management across all roles
- System configuration
- Content management
- Analytics and reporting access
- Support functionality

## Authentication System

The authentication system is built on NextAuth.js with custom providers, including:

- Credentials (username/password)
- OAuth providers (Google, Microsoft)
- SAML for enterprise SSO

User sessions include role-based information and account details that drive access control throughout the application.

## Routing Architecture

### Broker Routes

```
/broker/home                     # Broker dashboard
/broker/accounts                 # Account listing
/broker/accounts/:accountId      # Account details
/broker/clients                  # Client listing
/broker/clients/:clientId        # Client details
/broker/bluecross/home           # BlueCross specific dashboard
/broker/amplifyhealth/home       # AmplifyHealth specific dashboard
```

### Employer Routes

```
/employer/home                   # Employer dashboard
/employer/employees              # Employee listing
/employer/employees/:employeeId  # Employee details
/employer/benefits               # Benefits overview
/employer/benefits/plans         # Plan management
/employer/bluecross/home         # BlueCross specific dashboard
/employer/amplifyhealth/home     # AmplifyHealth specific dashboard
```

## State Management

State management is handled with Zustand, providing:

- Authentication state
- User preferences
- UI state (modals, notifications)
- Data caching

Example pattern:
```typescript
// Auth store example
const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: async (credentials) => {
    // Authentication logic
    set({ user: userData, isAuthenticated: true });
  },
  logout: () => set({ user: null, isAuthenticated: false }),
}));
```

## Data Flow

1. **API Client Layer**: Handles communication with backend services
2. **Service Layer**: Processes business logic
3. **State Management**: Updates application state
4. **UI Layer**: Renders data and handles user interactions

## Tenant-Specific Functionality

The platform supports multi-tenancy for different branded experiences:

- **BlueCross**: Standard BlueCross branded experience
- **AmplifyHealth**: AmplifyHealth branded experience

Each tenant can have custom routes, themes, and functionality while sharing core features.

## Security Considerations

- Role-based access control for all routes and features
- Token-based authentication with secure storage
- HTTPS-only communication
- Content Security Policy implementation
- Regular security audits and updates

## Technology Stack

- **Frontend**: React, Next.js, Tailwind CSS
- **State Management**: Zustand
- **API Communication**: Axios, SWR
- **Testing**: Jest, React Testing Library, Cypress
- **Build System**: Turborepo, pnpm

## Future Expansion

The architecture is designed to support:

- Additional user roles as needed
- New portal types without disrupting existing ones
- Feature expansion through the package system
- Integration with additional third-party services

## Development Guidelines

When working with this architecture:

1. Respect role boundaries and separation of concerns
2. Use shared components from the UI package
3. Implement proper access control checks
4. Follow the established routing patterns
5. Document any new features or changes 
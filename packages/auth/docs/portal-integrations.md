# Portal Integrations

The auth package provides a base portal integration pattern that can be extended by specific portals. Currently, we support the following portals:

1. Member Portal
2. Broker Portal
3. Employer Portal
4. Shared Health Member Portal

## Base Portal Integration

The base portal integration provides common functionality:

- Authentication state management
- Route protection
- Visibility rules computation
- Login response handling

### Base Auth Functions

```typescript
export const BasePortalAuthFunctions = {
  VIEW_PROFILE: 'VIEW_PROFILE',
  UPDATE_PROFILE: 'UPDATE_PROFILE',
  VIEW_DOCUMENTS: 'VIEW_DOCUMENTS',
  IS_SUBSCRIBER: 'IS_SUBSCRIBER',
  IS_DEPENDANT: 'IS_DEPENDANT',
  HAS_ACTIVE_PLAN: 'HAS_ACTIVE_PLAN',
  HAS_TERMED_PLAN: 'HAS_TERMED_PLAN',
};
```

### Base Visibility Rules

```typescript
export interface BaseVisibilityRules {
  isAuthenticated: boolean;
  canViewProfile: boolean;
  canUpdateProfile: boolean;
  canViewDocuments: boolean;
}
```

## Portal-Specific Integrations

### Member Portal

The Member Portal integration extends the base integration with:

- Claims access
- Benefits access
- Pharmacy access
- MyHealth access
- Find Care access
- Plan management

Example usage:

```typescript
import { memberPortal } from '@cp/auth/integration/memberPortal';

// Configure auth
const authConfig = memberPortal.createAuthConfig({
  sessionTimeout: 30 * 60 * 1000,
  jwtExpiry: 60 * 60 * 1000,
});

// Use in middleware
export const middleware = createMiddleware({
  routeRules: memberPortal.getRouteRules(),
});
```

### Broker Portal (TODO)

The Broker Portal will extend the base integration with:

- Client management
- Quote generation
- Commission tracking
- Plan comparison tools

### Employer Portal (TODO)

The Employer Portal will extend the base integration with:

- Employee management
- Plan administration
- Enrollment management
- Billing and payments

### Shared Health Member Portal (TODO)

The Shared Health Member Portal will extend the base integration with:

- Health record access
- Provider network management
- Care coordination
- Health program enrollment

## Creating a New Portal Integration

To create a new portal integration:

1. Create a new file in `src/integration/[portalName].ts`
2. Extend the `BasePortalIntegration` class
3. Define portal-specific auth functions
4. Define portal-specific visibility rules
5. Implement `computePortalSpecificRules`
6. Implement `getRouteRules`

Example:

```typescript
export class NewPortalIntegration extends BasePortalIntegration<
  NewPortalVisibilityRules,
  typeof NewPortalAuthFunctions
> {
  constructor() {
    super(NewPortalAuthFunctions);
  }

  protected computePortalSpecificRules(
    token: AuthToken,
  ): Partial<NewPortalVisibilityRules> {
    return {
      // Implement portal-specific rules
    };
  }

  getRouteRules(): Record<string, Array<keyof NewPortalVisibilityRules>> {
    return {
      // Define route protection rules
    };
  }
}
```

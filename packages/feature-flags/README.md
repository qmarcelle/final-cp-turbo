# @portals/feature-flags

This package provides a centralized system for managing feature flags across the portal applications.

Refer to the main [Enterprise Portal Architecture & Development Standards](../../../README.md) for overall guidelines.

## Purpose

- Allow teams to toggle features on or off in different environments without requiring a new deployment.
- Facilitate A/B testing, canary releases, and gradual rollouts.
- Decouple feature releases from code deployments.

## Key Features (To Be Developed)

- Integration with a feature flag management service (e.g., LaunchDarkly, Unleash, or a custom solution).
- Hooks and utilities to check flag statuses in both client-side and server-side code (Next.js).
- Context provider for making flags easily accessible throughout the React component tree.
- Typed flag definitions for better developer experience and safety.
- Mechanisms for user/group targeting and percentage-based rollouts.

## API Design Ideas

```typescript
// Example hook
// import { useFeatureFlag } from '@portals/feature-flags';
// const { isEnabled: isNewDashboardEnabled } = useFeatureFlag('new-member-dashboard');

// Example server-side utility
// import { getFeatureFlagServer } from '@portals/feature-flags/server';
// const isEnabled = await getFeatureFlagServer('new-feature', userContext);
```

## Getting Started

This package will be a dependency for applications that need to consume feature flags.

```bash
# Install as a dependency in an app
# pnpm --filter=member-portal add @portals/feature-flags
```

Consider how feature flag states will be fetched and cached for performance.

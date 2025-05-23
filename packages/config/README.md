# @portals/config

This package is intended to store shared configurations that can be used across different applications and packages within the monorepo.

Refer to the main [Enterprise Portal Architecture & Development Standards](../../../README.md) for overall guidelines, particularly the sections on Coding Standards (Configuration Management).

## Purpose

- Centralize configurations that are not specific to a single app or package but are shared across the platform.
- Examples could include: API endpoint URLs for different environments, shared constants, internationalization (i18n) default configurations, or theme tokens if not managed by the UI package.

## Key Features (To Be Developed)

- Environment-specific configuration loading (e.g., for `development`, `qa`, `staging`, `production`).
- Type-safe configuration objects.
- Utilities to easily access configuration values.

## Structure Ideas

```
src/
├── environments/
│   ├── default.ts
│   ├── development.ts
│   ├── production.ts
│   └── index.ts
├── constants/
│   └── app-constants.ts
└── index.ts
```

## API Design Ideas

```typescript
// Example usage
// import { config } from '@portals/config';
// const apiUrl = config.get('API_URL');
// const maxItemsPerPage = config.get('pagination.maxItems');
```

## Getting Started

This package can be a dependency for any app or package needing access to shared configurations.

```bash
# Install as a dependency
# pnpm --filter=member-portal add @portals/config
```

**Note:** Sensitive configurations like API keys or secrets should NOT be stored here. Use environment variables and secure secret management practices as outlined in the main `README.md`.

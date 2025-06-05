# Breadcrumbs Implementation Guide

This guide explains how to implement and configure breadcrumbs across the consumer portals using the standardized breadcrumb system.

## Architecture Overview

The breadcrumb system follows a clean separation of concerns:

- **`@portals/ui`** provides reusable breadcrumb components and configuration interfaces
- **Each app** (broker-portal, employer-portal, etc.) defines its own breadcrumb configuration
- **Apps import and configure** the breadcrumb components with their specific routing needs

## Components Available from `@portals/ui`

### Base Components
- `Breadcrumb` - Container component
- `BreadcrumbList` - List wrapper
- `BreadcrumbItem` - Individual breadcrumb item

### Smart Components
- `AppBreadcrumbs` - Configurable breadcrumb component that automatically generates breadcrumbs based on current route and app configuration

### Types
- `BreadcrumbConfig` - Configuration interface for app-specific breadcrumb behavior
- `AppBreadcrumbsProps` - Props for the AppBreadcrumbs component
- `BreadcrumbItemData` - Data structure for individual breadcrumb items

## Setting Up Breadcrumbs in Your App

### 1. Create App Configuration

Create a configuration file in your app: `src/config/breadcrumb.config.ts`

```typescript
import { BreadcrumbConfig } from '@portals/ui';

export const yourAppBreadcrumbConfig: BreadcrumbConfig = {
  home: {
    label: 'Dashboard',
    href: '/dashboard'
  },
  
  ignoredSegments: [
    '(protected)',  // Route groups
    '(public)',
    '[id]',         // Dynamic segments
    '[userId]'
  ],
  
  pathLabels: {
    'member-support': 'Member Support',
    'materials-library': 'Materials Library',
    // ... more custom labels
  },
  
  showCurrentPage: true,
  maxItems: 6,
  
  getDynamicLabel: (segment, pathname) => {
    if (segment.includes('userId')) {
      return 'User Details';
    }
    return null;
  }
};
```

### 2. Create Layout Component

Create a layout component that includes breadcrumbs:

```typescript
'use client';

import React from 'react';
import { AppBreadcrumbs } from '@portals/ui';
import { yourAppBreadcrumbConfig } from '@/config/breadcrumb.config';

export const BreadcrumbsLayout: React.FC<{ children: React.ReactNode }> = ({ 
  children 
}) => {
  return (
    <div>
      <div className="bg-gray-50 border-b px-4 py-2">
        <AppBreadcrumbs 
          config={yourAppBreadcrumbConfig}
          className="text-sm"
        />
      </div>
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
};
```

### 3. Use in Your App

Import and use the layout component in your pages or root layout:

```typescript
import { BreadcrumbsLayout } from '@/components/layout/BreadcrumbsLayout';

export default function Page() {
  return (
    <BreadcrumbsLayout>
      <h1>Your Page Content</h1>
    </BreadcrumbsLayout>
  );
}
```

## Configuration Options

### `BreadcrumbConfig` Interface

| Property | Type | Description |
|----------|------|-------------|
| `home` | `{ label: string; href: string }` | Home/root breadcrumb configuration |
| `ignoredSegments` | `string[]` | Path segments to ignore (route groups, dynamic segments) |
| `pathLabels` | `Record<string, string>` | Custom labels for path segments |
| `showCurrentPage` | `boolean` | Whether to show current page as last breadcrumb |
| `maxItems` | `number` | Maximum breadcrumb items before collapsing |
| `processPath` | `(segments: string[], fullPath: string) => string[]` | Custom path processing |
| `getDynamicLabel` | `(segment: string, pathname: string) => string \\| null` | Custom labels for dynamic segments |

### Ignoring Segments

Use `ignoredSegments` to exclude parts of the URL from breadcrumbs:

```typescript
ignoredSegments: [
  '(protected)',    // Route groups: (protected)/dashboard → dashboard
  '(public)',       // Route groups: (public)/login → login
  '[id]',           // Dynamic segments: /users/[id] → /users
  '[memberId]',     // Specific dynamic segments
]
```

### Custom Labels

Use `pathLabels` to provide human-readable names:

```typescript
pathLabels: {
  'member-support': 'Member Support',
  'id-cards': 'ID Cards',
  'medicare-advantage': 'Medicare Advantage',
  'search-results': 'Search Results'
}
```

### Dynamic Segment Handling

Use `getDynamicLabel` to provide context-aware labels for dynamic routes:

```typescript
getDynamicLabel: (segment, pathname) => {
  if (segment.includes('memberId')) {
    // Could fetch member name from API or context
    return 'Member Details';
  }
  if (segment.includes('claimId')) {
    return 'Claim Details';
  }
  return null; // Use default humanization
}
```

## Examples

### Broker Portal Configuration

```typescript
export const brokerBreadcrumbConfig: BreadcrumbConfig = {
  home: { label: 'Dashboard', href: '/dashboard' },
  ignoredSegments: ['(protected)', '[memberId]', '[claimId]'],
  pathLabels: {
    'member-support': 'Member Support',
    'member-search': 'Member Search',
    'prior-auths': 'Prior Authorizations'
  },
  getDynamicLabel: (segment) => {
    if (segment.includes('memberId')) return 'Member Details';
    if (segment.includes('claimId')) return 'Claim Details';
    return null;
  }
};
```

### Employer Portal Configuration

```typescript
export const employerBreadcrumbConfig: BreadcrumbConfig = {
  home: { label: 'Home', href: '/' },
  ignoredSegments: ['(protected)', '[groupId]', '[employeeId]'],
  pathLabels: {
    'employees': 'Employees',
    'benefits': 'Benefits',
    'enrollment': 'Enrollment'
  },
  maxItems: 5
};
```

## URL Examples

Given the broker portal configuration, here's how URLs would be transformed:

| URL | Breadcrumbs |
|-----|-------------|
| `/dashboard` | Dashboard |
| `/member-support` | Dashboard > Member Support |
| `/member-support/individual` | Dashboard > Member Support > Individual |
| `/member-support/member-search/[123]/claims` | Dashboard > Member Support > Member Search > Member Details > Claims |
| `/(protected)/sales/commission` | Dashboard > Sales > Commission |

## Best Practices

1. **Keep configurations app-specific** - Each app should manage its own breadcrumb config
2. **Use meaningful labels** - Provide human-readable labels for technical path segments
3. **Handle dynamic segments** - Use `getDynamicLabel` to provide context for dynamic routes
4. **Ignore implementation details** - Hide route groups and technical segments from users
5. **Test different routes** - Verify breadcrumbs work correctly across your app's routing structure
6. **Consider max items** - Use `maxItems` to prevent breadcrumb overflow on deep routes

## Troubleshooting

### Breadcrumbs not showing
- Check that `AppBreadcrumbs` is imported correctly
- Verify your configuration is passed to the component
- Ensure you're on a route that would generate breadcrumbs

### Wrong labels appearing
- Check your `pathLabels` configuration
- Verify segment names match your route structure
- Test `getDynamicLabel` function for dynamic segments

### Too many breadcrumb items
- Set `maxItems` in your configuration
- Review your `ignoredSegments` to filter out unnecessary path parts
# @portals/analytics

This package provides a wrapper and standardized interface for analytics tracking across portal applications.

Refer to the main [Enterprise Portal Architecture & Development Standards](../../../README.md) for overall guidelines, particularly the sections on Performance & Caching (for Web Vitals) and Observability.

## Purpose

- Abstract the underlying analytics provider(s) (e.g., Google Analytics, Amplitude, Segment).
- Provide a consistent API for tracking page views, events, user interactions, and custom metrics.
- Standardize the data schema for analytics events.
- Facilitate the reporting of Web Vitals and other performance metrics.

## Key Features (To Be Developed)

- Initialization and configuration of the chosen analytics provider(s).
- Functions for tracking page views (integrating with Next.js router events).
- Functions for tracking custom events with defined payloads.
- Utility for identifying users and setting user properties.
- Automatic Web Vitals reporting (as seen in the main README.md `reportWebVitals` example).
- Developer-friendly API with clear naming and type safety.

## API Design Ideas

```typescript
// Example initialization (in app layout or providers)
// import { initAnalytics } from '@portals/analytics';
// initAnalytics({ provider: 'ga', trackingId: 'UA-XXXXX-Y' });

// Example event tracking
// import { trackEvent } from '@portals/analytics';
// trackEvent('button_click', { buttonName: 'login', page: '/login' });

// Example page view tracking (could be automated)
// import { trackPageView } from '@portals/analytics';
// trackPageView(url);

// Example Web Vitals integration (in app layout)
// export function reportWebVitals(metric) {
//   sendToAnalytics(metric); // sendToAnalytics would be part of this package
// }
```

## Getting Started

This package will be a dependency for applications requiring analytics.

```bash
# Install as a dependency in an app
# pnpm --filter=member-portal add @portals/analytics
```

# Simply Healthcare (SHL) Broker Portal

This application provides tools and resources for brokers working with Simply Healthcare plans.

Refer to the main [Enterprise Portal Architecture & Development Standards](../../../README.md) for overall guidelines.

## Purpose

- Equip Simply Healthcare brokers with the necessary tools to manage clients, access plan information, generate quotes, and facilitate enrollments for SHL products.

## Key Features (To Be Developed)

- Broker Authentication & Profile Management
- Client Management Dashboard
- SHL Plan Information & Comparison Tools
- Quoting Engine
- Enrollment Processing & Tracking
- Commission Information
- Document Library & Sales Materials

## Tech Stack Considerations

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- Components from `@portals/ui` (potentially with SHL theming)
- State management
- Data fetching

## Getting Started

```bash
# Navigate to this app's directory (once populated)
# cd apps/sh-broker-portal

# Install dependencies (from root)
# pnpm install

# Run in development mode (from root, filtering for this app)
# pnpm dev --filter=sh-broker-portal
```

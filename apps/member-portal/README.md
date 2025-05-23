# Member Portal

This application is the primary member-facing portal.

Refer to the main [Enterprise Portal Architecture & Development Standards](../../../README.md) for overall guidelines.

## Purpose

- Provide members with access to their health plan information, benefits, claims, and other self-service tools.

## Key Features (To Be Developed)

- User Authentication & Profile Management
- Benefit Details & Coverage Information
- Claims History & Submission
- ID Card Access
- Provider Search
- Secure Messaging

## Tech Stack Considerations

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- Components from `@portals/ui`
- State management (e.g., Zustand, Jotai, or React Context)
- Data fetching (e.g., React Query, SWR, or Next.js Server Components/Actions)

## Getting Started

```bash
# Navigate to this app's directory (once populated)
# cd apps/member-portal

# Install dependencies (from root)
# pnpm install

# Run in development mode (from root, filtering for this app)
# pnpm dev --filter=member-portal
```

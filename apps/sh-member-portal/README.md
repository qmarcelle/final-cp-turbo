# Simply Healthcare (SHL) Member Portal

This application is the member-facing portal specifically for Simply Healthcare members.

Refer to the main [Enterprise Portal Architecture & Development Standards](../../../README.md) for overall guidelines.

## Purpose

- Provide Simply Healthcare members with access to their health plan information, benefits, claims, and other self-service tools, tailored to SHL specific offerings.

## Key Features (To Be Developed)

- User Authentication & Profile Management (potentially shared with other portals via `@portals/auth`)
- SHL-Specific Benefit Details & Coverage Information
- Claims History & Submission
- Digital ID Card Access
- Provider Search (filtered for SHL network)
- Secure Messaging
- Integration with SHL-specific programs and services

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
# cd apps/sh-member-portal

# Install dependencies (from root)
# pnpm install

# Run in development mode (from root, filtering for this app)
# pnpm dev --filter=sh-member-portal
```

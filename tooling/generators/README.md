# Code Generators

This directory houses custom code generators (scaffolding scripts) to help automate common development tasks and enforce consistency.

Refer to the main [Enterprise Portal Architecture & Development Standards](../../../README.md) for overall guidelines.

## Purpose

- Speed up the creation of new components, modules, packages, or other repetitive code structures.
- Ensure new code adheres to the established file naming conventions, structure, and boilerplate.
- Reduce manual effort and potential for errors.

## Potential Generators (To Be Developed)

- **Component Generator:**
  - Creates a new React component directory with `.tsx`, `.stories.tsx`, `.test.tsx`, `.types.ts`, and `index.ts` files.
  - Example: `pnpm generate:component ui/MyNewButton` or `pnpm generate:component apps/member-portal/features/UserProfile`
- **Package Generator:**
  - Scaffolds a new shared package within the `packages/` directory with a basic `package.json`, `tsconfig.json`, `README.md`, and `src/index.ts`.
  - Example: `pnpm generate:package new-utility-library`
- **Route Generator (for Next.js apps):**
  - Creates a new route directory within a Next.js app, including `page.tsx`, `layout.tsx` (optional), and `loading.tsx` (optional).
  - Example: `pnpm generate:route member-portal/settings/notifications`

## Tooling

- These generators can be built using tools like [Plop.js](https://plopjs.com/), custom Node.js scripts, or integrated with CLI tools like `oclif` or `commander.js`.

## Usage

Define scripts in the root `package.json` to invoke these generators.

```json
// Example in root package.json
"scripts": {
  // ... other scripts
  "generate:component": "node tooling/generators/component-generator.js",
  "generate:package": "node tooling/generators/package-generator.js"
}
```

# @portals/ui

Shared component library for all Consumer Portals applications.

## Overview

A comprehensive UI library built with React, TypeScript, and Tailwind CSS. Components are designed for accessibility, consistency, and reusability across broker and employer portals.

## Quick Start

```bash
# Install in your app
pnpm add @portals/ui
```

```typescript
// Import components
import { Button, Input, FormLayout } from '@portals/ui'

function MyForm() {
  return (
    <FormLayout>
      <Input label="Email" type="email" />
      <Button variant="primary">Submit</Button>
    </FormLayout>
  )
}
```

## Component Categories

### Foundation Components
Basic building blocks and atomic elements:
- **Inputs**: Text fields, checkboxes, radios, selects
- **Buttons**: Primary, secondary, ghost variants  
- **Typography**: Headings, labels, body text
- **Layout**: Containers, spacers, grids

### Composite Components  
Complex components built from foundation elements:
- **Forms**: Multi-step forms, validation, field groups
- **Data Display**: Tables, cards, lists
- **Navigation**: Menus, breadcrumbs, pagination
- **Overlays**: Modals, tooltips, dropdowns

## Development Approach

We're systematically migrating and improving components from our legacy member portal while building new components with [shadcn/ui](https://ui.shadcn.com/) as our foundation.

This gives us:
- **Accessibility**: Built on Radix UI primitives (WCAG 2.1 AA)
- **Consistency**: Tailwind CSS design system
- **Flexibility**: Copy-paste approach, not dependency-heavy
- **Type Safety**: Full TypeScript support

## Component Development

```typescript
// Component template structure
import { cn } from '@/lib/utils'

interface MyComponentProps {
  variant?: 'default' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
}

export function MyComponent({ variant = 'default', className, ...props }) {
  return (
    <div
      className={cn(
        'base-styles',
        { 'variant-styles': variant === 'default' },
        className
      )}
      {...props}
    />
  )
}
```

## Best Practices

- **Single Responsibility**: Each component has one clear purpose
- **Composition**: Build complex components from simpler ones
- **Accessibility**: Follow WCAG guidelines and use semantic HTML
- **Naming**: Use descriptive, domain-specific names (`MemberSearchInput` not `Input`)

## Documentation & Resources

For detailed component documentation, migration guides, and design system principles:

**[→ Development Guide](../../docs/development.md)**

### External Resources
- [shadcn/ui Components](https://ui.shadcn.com/docs/components)
- [Radix UI Primitives](https://www.radix-ui.com/primitives)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

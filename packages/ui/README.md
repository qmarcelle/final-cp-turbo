# UI Component Library

## Overview

This package contains the shared UI component library for Consumer Portals applications. Our
approach focuses on creating reusable, accessible, and consistent components that align with design
system best practices.

## Component Development Strategy

### 1. Component Migration from Member Portal

We are systematically migrating components from the existing member portal component library into
this centralized UI package to:

- **Consolidate component logic** across all portal applications
- **Ensure consistency** in design and behavior
- **Improve maintainability** through single-source-of-truth components
- **Enable better testing** and documentation practices

**Migration Process:**

1. Identify components in
   [`src/components/member_portal_components/`](./src/components/member_portal_components/)
2. Evaluate component quality and reusability
3. Refactor and migrate to appropriate category in [`src/components/`](./src/components/)
4. Update imports across applications
5. Deprecate original member portal components

### 2. Component Architecture

Our component library follows a structured hierarchy:

#### **Foundation Components** [`src/components/foundation/`](./src/components/foundation/)

Basic building blocks and atomic components:

- **Inputs**: Text fields, checkboxes, radio buttons, selects
- **Buttons**: Primary, secondary, ghost variants
- **Typography**: Headings, body text, labels
- **Layout**: Containers, spacers, dividers

#### **Composite Components** [`src/components/composite/`](./src/components/composite/)

Complex components built from foundation elements:

- **Forms**: Multi-step forms, validation, field groups
- **Data Display**: Tables, cards, lists
- **Navigation**: Menus, breadcrumbs, pagination
- **Overlays**: Modals, tooltips, dropdowns

### 3. shadcn/ui Integration Strategy

When building new components that don't exist in our current library, we leverage
[shadcn/ui](https://ui.shadcn.com/) as our foundation:

#### **Why shadcn/ui?**

- **Copy-paste components** rather than dependency-heavy packages
- **Tailwind CSS** based for consistent styling
- **Radix UI primitives** for accessibility
- **TypeScript** first approach
- **Customizable** and extendable

#### **Implementation Process:**

1. **Check Existing Components**

   - Review [`src/components/foundation/`](./src/components/foundation/) and
     [`src/components/composite/`](./src/components/composite/)
   - Check [`src/components/member_portal_components/`](./src/components/member_portal_components/)
     for existing implementations

2. **Select shadcn/ui Component**

   - Browse [shadcn/ui components](https://ui.shadcn.com/docs/components)
   - Copy the base component code
   - Place in appropriate category (foundation vs composite)

3. **Customize for Portal Needs**

   - Add Consumer Portal specific props and styling
   - Implement business logic based on user story requirements
   - Ensure accessibility standards (WCAG 2.1 AA)
   - Add proper TypeScript definitions

4. **Follow Naming Conventions**

   ```typescript
   // ✅ Good: Descriptive and specific
   <MemberSearchInput />
   <ClaimStatusBadge />
   <BenefitSummaryCard />

   // ❌ Avoid: Generic or unclear
   <Input />
   <Badge />
   <Card />
   ```

## Quick Start Guide

### For Developers Building Components

1. **Identify Component Need**

   ```bash
   # Check existing components first
   find src/components -name "*ComponentName*" -type f
   ```

2. **Choose Development Path**

   - **Existing component**: Extend or modify in place
   - **Member portal migration**: Move and refactor
   - **New component**: Start with shadcn/ui base

3. **Development Workflow**

   ```bash
   # Install dependencies
   pnpm install

   # Start development server
   pnpm dev

   # Run tests
   pnpm test

   # Build package
   pnpm build
   ```

### Component Template Structure

```typescript
// src/components/foundation/MyComponent/MyComponent.tsx
import * as React from "react"
import { cn } from "@/lib/utils"

export interface MyComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary"
  size?: "sm" | "md" | "lg"
  // Add portal-specific props based on user stories
}

const MyComponent = React.forwardRef<HTMLDivElement, MyComponentProps>(
  ({ className, variant = "default", size = "md", ...props }, ref) => {
    return (
      <div
        className={cn(
          // Base styles
          "base-component-styles",
          // Variant styles
          {
            "variant-styles": variant === "default",
          },
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
MyComponent.displayName = "MyComponent"

export { MyComponent }
```

## Resources & Documentation

### Internal Documentation

- **Foundation Components**: [`src/components/foundation/`](./src/components/foundation/)
- **Composite Components**: [`src/components/composite/`](./src/components/composite/)
- **Member Portal Components**:
  [`src/components/member_portal_components/`](./src/components/member_portal_components/)
- **Component Documentation**: [Storybook](./docs/) (when available)

### External Resources

- **shadcn/ui Components**: https://ui.shadcn.com/docs/components
- **shadcn/ui Installation**: https://ui.shadcn.com/docs/installation
- **Radix UI Primitives**: https://www.radix-ui.com/primitives
- **Tailwind CSS**: https://tailwindcss.com/docs
- **React Hook Form**: https://react-hook-form.com/ (for form components)

### Accessibility Guidelines

- **WCAG 2.1 Guidelines**: https://www.w3.org/WAI/WCAG21/quickref/
- **Radix UI Accessibility**: https://www.radix-ui.com/primitives/docs/overview/accessibility
- **Testing with jest-axe**: https://github.com/nickcolley/jest-axe

## Best Practices

### Component Design

- **Single Responsibility**: Each component should have one clear purpose
- **Composition over Inheritance**: Build complex components from simpler ones
- **Props Interface**: Use TypeScript for clear, documented component APIs
- **Accessibility First**: ARIA attributes, keyboard navigation, screen reader support

### Code Quality

- **TypeScript**: All components must have proper type definitions
- **Testing**: Unit tests with React Testing Library and jest-axe
- **Documentation**: JSDoc comments and Storybook stories
- **Performance**: Optimize re-renders with React.memo when appropriate

### Styling Guidelines

- **Tailwind CSS**: Use utility classes for consistent styling
- **CSS Variables**: Define design tokens for colors, spacing, typography
- **Responsive Design**: Mobile-first approach with breakpoint consistency
- **Dark Mode**: Support theme switching where applicable

## Contributing

1. **Follow the component development strategy** outlined above
2. **Write comprehensive tests** for all new components
3. **Update documentation** and add Storybook stories
4. **Review accessibility** compliance before submitting
5. **Test cross-browser** compatibility
6. **Update this README** when adding new patterns or approaches

## Questions or Issues?

- **Component Architecture**: Consult the team architect
- **Design System**: Reference the design team guidelines
- **Technical Implementation**: Create an issue in the project repository
- **Accessibility**: Review WCAG guidelines and test with assistive technologies

---

**Remember**: Our goal is to create a cohesive, accessible, and maintainable component library that
serves all Consumer Portal applications effectively.

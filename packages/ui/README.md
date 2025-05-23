# 🎨 @portals/ui - Enterprise Component Library

> A modern, accessible, and performant React component library built on shadcn/ui, providing a comprehensive design system for BCBST portal applications.

## 📖 Table of Contents

- [Philosophy](#philosophy)
- [Quick Start](#quick-start)
- [Architecture](#architecture)
- [Component Standards](#component-standards)
- [Testing Strategy](#testing-strategy)
- [Storybook Guidelines](#storybook-guidelines)
- [Accessibility](#accessibility)
- [Performance](#performance)
- [React 19 Patterns](#react-19-patterns)
- [Contributing](#contributing)

## 🎯 Philosophy

### Why shadcn/ui?

We chose shadcn/ui as our foundation based on several key principles:

1. **Copy-paste, not install** - Components are owned by our codebase, not hidden in node_modules
2. **Accessibility first** - Built on Radix UI primitives with WCAG 2.1 AA compliance
3. **Customization over configuration** - Full control over every line of code
4. **Modern stack** - TypeScript, Tailwind CSS, and React Server Components ready
5. **Zero runtime overhead** - No additional JavaScript bundle for styling

> "The best component library is the one you own" - shadcn

### Design Principles

```typescript
// ✅ CORRECT: Composable, accessible, performant
<Dialog>
  <DialogTrigger asChild>
    <Button variant="outline">Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Accessible by default</DialogTitle>
      <DialogDescription>
        Full keyboard navigation and screen reader support
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>

// ❌ WRONG: Monolithic, inaccessible
<BigModal 
  isOpen={open} 
  onClose={close} 
  title="Old way"
  content="Not composable"
/>
```

## 🚀 Quick Start

### Installation

```bash
# Install the component library in your app
pnpm add @portals/ui

# Install peer dependencies
pnpm add tailwindcss@latest @radix-ui/react-*
```

### Setup

1. **Configure Tailwind CSS**

```javascript
// apps/[your-app]/tailwind.config.js
module.exports = {
  presets: [require('@portals/ui/tailwind-preset')],
  content: [
    './src/**/*.{ts,tsx}',
    '../../packages/ui/src/**/*.{ts,tsx}', // Include UI package
  ],
  theme: {
    extend: {
      // Your app-specific overrides
    },
  },
}
```

2. **Setup Providers**

```tsx
// apps/[your-app]/src/app/providers.tsx
'use client'

import { ThemeProvider, ToastProvider } from '@portals/ui'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ToastProvider>
        {children}
      </ToastProvider>
    </ThemeProvider>
  )
}
```

3. **Use Components**

```tsx
import { Button, Card, DataTable } from '@portals/ui'

export function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome</CardTitle>
      </CardHeader>
      <CardContent>
        <Button>Get Started</Button>
      </CardContent>
    </Card>
  )
}
```

## 🏗️ Architecture

### Component Categories

Our component library follows atomic design principles adapted for our needs:

```
src/
├── lib/
│   ├── primitives/          # Radix UI primitives setup
│   ├── utils/               # Shared utilities (cn, etc.)
│   └── hooks/               # Shared React hooks
├── components/
│   ├── ui/                  # Base shadcn/ui components
│   │   ├── button/
│   │   ├── dialog/
│   │   ├── form/
│   │   └── ...
│   ├── enhanced/            # Extended shadcn components
│   │   ├── data-table/      # Table with sorting, filtering
│   │   ├── command-palette/ # Command with search
│   │   └── multi-select/    # Select with multiple
│   ├── patterns/            # Complex component patterns
│   │   ├── crud-table/      # Full CRUD operations
│   │   ├── wizard/          # Multi-step forms
│   │   └── dashboard-shell/ # Layout patterns
│   ├── candidate/           # Components targeted for refactor & promotion
│   │   └── member-portal/   # Currently specific to Member Portal, migrating to common
│   └── domain/              # Business-specific components (already common or not migrating)
│       ├── member-card/
│       ├── benefits-comparison/
│       └── claims-status/
└── styles/
    ├── globals.css          # Global styles and CSS variables
    └── themes/              # Theme configurations
```

**Layer Definitions & Rationale:**

*   **`lib/`**: Core utilities, hooks, and primitive setups (like Radix) that underpin the component library but are not components themselves.
*   **`components/ui/`**: These are the direct, largely unmodified, "copy-paste" components from shadcn/ui. They form the foundational building blocks. We keep them here to distinguish from our own enhancements or compositions.
*   **`components/enhanced/`**: Components that take a base `ui/` component (or multiple) and add significant new functionality, state management, or integrations, making them more powerful out-of-the-box for common portal needs (e.g., a `DataTable` with built-in sorting, filtering, pagination).
*   **`components/patterns/`**: More complex compositions of multiple `ui/` and `enhanced/` components to solve recurring high-level UI problems or represent entire sections/features (e.g., a `Wizard` for multi-step forms, a `CrudTable` for full create-read-update-delete interfaces).
*   **`components/candidate/`**: This directory houses components that are currently specific to a particular application (e.g., `member-portal/`) and may have originated from legacy code or app-specific needs. They are identified as **candidates for refactoring** according to the new shadcn/ui and design system standards. The goal is to eventually migrate these components (or their refactored equivalents) into the `ui/`, `enhanced/`, or `patterns/` directories once they are generalized and meet the common component standards. This serves as a staging area for progressive enhancement and migration.
*   **`components/domain/`**: These are components that encapsulate specific business logic or represent unique concepts tied directly to the enterprise domain (e.g., healthcare plans, claims). They might be built from `ui/`, `enhanced/`, or `patterns/` components but are highly specialized for business functions. These are generally already considered "common" in terms of their domain specificity across portals.
*   **`styles/`**: Global styles, Tailwind CSS setup, CSS variables, and theme definitions.

### Component Anatomy

Every component follows this structure:

```
button/
├── button.tsx              # Component implementation
├── button.stories.tsx      # Storybook stories
├── button.test.tsx         # Component tests
├── button.types.ts         # TypeScript interfaces
├── button.module.css       # CSS modules (if needed)
├── README.md              # Component documentation
└── index.ts               # Barrel export
```

### Styling Strategy

We use a hybrid approach combining Tailwind CSS with CSS variables for theming:

```css
/* styles/globals.css */
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --primary: 211 100% 50%;    /* BCBST Blue */
    --primary-foreground: 0 0% 100%;
    
    /* Semantic tokens */
    --success: 142 71% 45%;
    --warning: 38 92% 50%;
    --error: 0 84% 60%;
  }
  
  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    /* Dark mode adjustments */
  }
  
  /* Brand themes */
  [data-theme="shl"] {
    --primary: 271 91% 65%;      /* SHL Purple */
    --secondary: 162 63% 46%;    /* SHL Teal */
  }
}
```

## 📐 Component Standards

### 1. Component Template

```typescript
// components/ui/button/button.tsx
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  // Base styles
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Render as child component */
  asChild?: boolean
  /** Loading state */
  loading?: boolean
}

/**
 * Button component with multiple variants and sizes
 * 
 * @example
 * ```tsx
 * <Button variant="outline" size="lg">
 *   Click me
 * </Button>
 * ```
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        aria-busy={loading}
        {...props}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
            <span className="sr-only">Loading...</span>
            {children}
          </>
        ) : (
          children
        )}
      </Comp>
    )
  }
)

Button.displayName = "Button"

export { Button, buttonVariants }
```

### 2. Enhanced Component Example

```typescript
// components/enhanced/data-table/data-table.tsx
import * as React from "react"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table"

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  /** Enable sorting */
  sortable?: boolean
  /** Enable filtering */
  filterable?: boolean
  /** Enable pagination */
  paginated?: boolean
  /** Page size options */
  pageSizeOptions?: number[]
  /** Initial page size */
  initialPageSize?: number
  /** Empty state component */
  emptyState?: React.ReactNode
  /** Loading state */
  loading?: boolean
}

/**
 * Enhanced data table with sorting, filtering, and pagination
 * Built on top of @tanstack/react-table
 */
export function DataTable<TData, TValue>({
  columns,
  data,
  sortable = true,
  filterable = true,
  paginated = true,
  pageSizeOptions = [10, 20, 30, 50],
  initialPageSize = 10,
  emptyState,
  loading,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    ...(sortable && {
      onSortingChange: setSorting,
      getSortedRowModel: getSortedRowModel(),
    }),
    ...(filterable && {
      onColumnFiltersChange: setColumnFilters,
      getFilteredRowModel: getFilteredRowModel(),
    }),
    ...(paginated && {
      getPaginationRowModel: getPaginationRowModel(),
      initialState: {
        pagination: {
          pageSize: initialPageSize,
        },
      },
    }),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
  })

  if (loading) {
    return <DataTableSkeleton columns={columns.length} rows={initialPageSize} />
  }

  return (
    <div className="space-y-4">
      {filterable && <DataTableToolbar table={table} />}
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  {emptyState || "No results."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      {paginated && <DataTablePagination table={table} pageSizeOptions={pageSizeOptions} />}
    </div>
  )
}
```

## 🧪 Testing Strategy

### Testing Philosophy

Based on Kent C. Dodds' Testing Trophy:

```
         🏆 E2E (5%)
        /  \  (Storybook interaction tests)
       /    \
      /  UI  \  Integration (25%)
     / Tests  \ (Component behavior)
    /          \
   /   Unit     \ Unit Tests (70%)
  /    Tests     \ (Utils, hooks, logic)
 /________________\
```

### Component Test Example

```typescript
// button.test.tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { composeStories } from '@storybook/react'
import * as stories from './button.stories'

// Compose all stories for testing
const { Default, Loading, Disabled } = composeStories(stories)

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Default>Click me</Default>)
    expect(screen.getByRole('button')).toHaveTextContent('Click me')
  })

  it('handles click events', async () => {
    const user = userEvent.setup()
    const handleClick = jest.fn()
    
    render(<Default onClick={handleClick}>Click me</Default>)
    
    await user.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('shows loading state', () => {
    render(<Loading>Save</Loading>)
    
    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('aria-busy', 'true')
    expect(button).toBeDisabled()
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('prevents clicks when disabled', async () => {
    const user = userEvent.setup()
    const handleClick = jest.fn()
    
    render(<Disabled onClick={handleClick}>Disabled</Disabled>)
    
    await user.click(screen.getByRole('button'))
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('supports keyboard navigation', async () => {
    const user = userEvent.setup()
    const handleClick = jest.fn()
    
    render(<Default onClick={handleClick}>Press Enter</Default>)
    
    const button = screen.getByRole('button')
    button.focus()
    
    await user.keyboard('{Enter}')
    expect(handleClick).toHaveBeenCalledTimes(1)
    
    await user.keyboard(' ') // Space key
    expect(handleClick).toHaveBeenCalledTimes(2)
  })
})
```

### Visual Regression Testing

```typescript
// button.visual.test.tsx
import { test, expect } from '@playwright/test'

test.describe('Button Visual Regression', () => {
  test('default variants', async ({ page }) => {
    await page.goto('/iframe.html?id=ui-button--all-variants')
    await expect(page).toHaveScreenshot('button-variants.png')
  })

  test('hover states', async ({ page }) => {
    await page.goto('/iframe.html?id=ui-button--default')
    const button = page.locator('button')
    
    await button.hover()
    await expect(page).toHaveScreenshot('button-hover.png')
  })

  test('focus states', async ({ page }) => {
    await page.goto('/iframe.html?id=ui-button--default')
    const button = page.locator('button')
    
    await button.focus()
    await expect(page).toHaveScreenshot('button-focus.png')
  })
})
```

## 📚 Storybook Guidelines

### Story Structure

```typescript
// button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { within, userEvent, expect } from '@storybook/test'
import { Button } from './button'

const meta = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    // Center the component in the Canvas
    layout: 'centered',
    // Autodocs configuration
    docs: {
      description: {
        component: 'Base button component with multiple variants and states.',
      },
    },
  },
  // Default props
  args: {
    variant: 'default',
    size: 'default',
  },
  // Controls configuration
  argTypes: {
    variant: {
      control: { type: 'select' },
      description: 'Visual style variant',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: { type: 'select' },
      description: 'Size variant',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Loading state',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disabled state',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    asChild: {
      control: { type: 'boolean' },
      description: 'Render as child component',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
  // Auto-generate documentation
  tags: ['autodocs'],
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

// Basic stories
export const Default: Story = {
  args: {
    children: 'Button',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary',
  },
}

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Delete',
  },
}

// State stories
export const Loading: Story = {
  args: {
    loading: true,
    children: 'Please wait...',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled',
  },
}

// Interaction tests
export const WithInteraction: Story = {
  args: {
    children: 'Click me',
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole('button')

    // Test initial state
    await expect(button).toBeInTheDocument()
    await expect(button).toHaveTextContent('Click me')

    // Test hover
    await userEvent.hover(button)
    await expect(button).toHaveClass('hover:bg-primary/90')

    // Test click
    await userEvent.click(button)
    // Add assertions for click behavior
  },
}

// Composite story
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button>Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
}

// Real-world example
export const FormActions: Story = {
  name: 'Form Actions Example',
  render: () => (
    <div className="flex gap-4">
      <Button type="submit">Save Changes</Button>
      <Button variant="outline" type="button">Cancel</Button>
      <Button variant="ghost" type="button">Save as Draft</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Common button pattern for form actions.',
      },
    },
  },
}
```

### Storybook Best Practices

1. **Organization**
   - Group related components under the same category
   - Use consistent naming: `Category/ComponentName`
   - Order stories from simple to complex

2. **Documentation**
   - Every component must have a description
   - Document all props with descriptions and default values
   - Include real-world usage examples

3. **Interaction Tests**
   - Test user interactions in the `play` function
   - Cover accessibility scenarios
   - Test keyboard navigation

4. **Visual States**
   - Show all variants and sizes
   - Include hover, focus, and active states
   - Demonstrate loading and error states

## ♿ Accessibility

### Standards

All components meet WCAG 2.1 Level AA standards:

1. **Keyboard Navigation**
   - All interactive elements are keyboard accessible
   - Focus indicators are clearly visible
   - Tab order follows logical flow

2. **Screen Reader Support**
   - Proper ARIA labels and descriptions
   - Live regions for dynamic content
   - Semantic HTML structure

3. **Color Contrast**
   - Minimum 4.5:1 for normal text
   - Minimum 3:1 for large text
   - Color is not the only indicator

### Testing Accessibility

```typescript
// Run automated accessibility tests
import { axe, toHaveNoViolations } from 'jest-axe'

expect.extend(toHaveNoViolations)

it('should not have accessibility violations', async () => {
  const { container } = render(<Button>Accessible Button</Button>)
  const results = await axe(container)
  expect(results).toHaveNoViolations()
})
```

### Manual Testing Checklist

- [ ] Navigate using only keyboard
- [ ] Test with screen reader (NVDA/JAWS on Windows, VoiceOver on Mac)
- [ ] Verify focus indicators are visible
- [ ] Check color contrast ratios
- [ ] Test with browser zoom at 200%
- [ ] Verify touch targets are at least 44x44px

## ⚡ Performance

### Bundle Size Optimization

1. **Tree Shaking**
   - Each component is independently importable
   - No side effects in component files
   - Proper ESM exports

2. **Code Splitting**
   ```typescript
   // ✅ Import only what you need
   import { Button } from '@portals/ui/button'
   
   // ❌ Don't import everything
   import * as UI from '@portals/ui'
   ```

3. **CSS Optimization**
   - Tailwind CSS purges unused styles
   - Critical CSS is inlined
   - Component-specific styles are co-located

### Performance Monitoring

```typescript
// Monitor component render performance
import { Profiler } from 'react'

function onRenderCallback(id, phase, actualDuration) {
  console.log(`${id} (${phase}) took ${actualDuration}ms`)
}

<Profiler id="Button" onRender={onRenderCallback}>
  <Button>Profile Me</Button>
</Profiler>
```

## ⚛️ React 19 Patterns

The `src/components/enhanced/react19-patterns.tsx` file provides advanced component patterns leveraging new React 19 features, including:

- `useActionState` for enhanced form handling and optimistic UI
- `useOptimistic` for immediate UI feedback
- The new `use` hook for async data and Suspense integration
- Enhanced button and resource loader patterns
- Sitecore-ready HOC for CMS integration

**Example usage:**

```tsx
import { EnhancedForm, React19Button, ResourceLoader } from '@portals/ui/enhanced/react19-patterns'

<EnhancedForm action={myAction} optimistic>
  <input name="name" />
  <React19Button type="submit" showPending>Submit</React19Button>
</EnhancedForm>
```

See the file for more advanced usage and documentation.

[View react19-patterns.tsx on GitHub](./src/components/enhanced/react19-patterns.tsx)

## 🤝 Contributing

### Documentation Updates

To suggest improvements to this documentation:

1. **Create an Issue**
   ```markdown
   Title: [DOCS] Improve section on X
   
   ## Current Documentation
   [Link to current section]
   
   ## Suggested Improvement
   [Your suggestion]
   
   ## Rationale
   [Why this change helps]
   ```

2. **Submit a PR**
   - Edit docs directly on GitHub
   - Or clone and edit locally
   - Follow the same PR process
   - **IMPORTANT**: Update `Last Updated` date and increment `Version` if making significant changes

### First-time Contributor?

1. Complete [Quick Start](#quick-start)
2. Try a simple change: Update a typo in docs or add a code comment
3. Run `pnpm build` to verify no breaking changes
4. Submit your first PR!

### Claiming an Issue

- Comment "I'll take this" on the GitHub issue
- Wait for assignment confirmation
- If no response in 24h, proceed with caution

## 📚 Glossary

- **shadcn/ui**: Base component library for copy-paste React components
- **Radix UI**: Accessible React primitives
- **Storybook**: Tool for developing and testing UI components in isolation
- **WCAG**: Web Content Accessibility Guidelines
- **RUM**: Real User Monitoring
- **APM**: Application Performance Monitoring
- **RBAC**: Role-Based Access Control
- **BCBST**: BlueCross BlueShield of Tennessee
- **PRT**: Portal (ticket prefix)

---

**Last Updated**: June 2024
**Maintained By**: BCBST Portal Team
**Version**: 2.1.0
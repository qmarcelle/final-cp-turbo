import type { Meta, StoryObj } from '@storybook/react'
import { Separator } from './Separator'

const meta: Meta<typeof Separator> = {
  title: '⚛️ Foundation/Separator',
  component: Separator,
  parameters: {
    layout: 'centered',
    tags: ['foundation', 'stable'],
    docs: {
      description: {
        component: `
# Separator

Visual divider component for organizing content sections with horizontal and vertical orientations.

## Features
- **Dual orientation**: Horizontal and vertical separator options
- **Accessibility**: Proper ARIA attributes with decorative and semantic roles
- **Flexible sizing**: Adapts to container dimensions
- **Design consistency**: Integrated with design system colors and spacing
- **Semantic meaning**: Optional role for screen readers
- **Lightweight**: Minimal markup and styling footprint

## Usage

\`\`\`tsx
import { Separator } from '@portals/ui';

// Horizontal separator (default)
<Separator />

// Vertical separator
<Separator orientation="vertical" />

// Decorative separator (no semantic meaning)
<Separator decorative />

// In a layout context
<div>
  <section>Content section 1</section>
  <Separator />
  <section>Content section 2</section>
</div>
\`\`\`

## When to use
- Separate content sections visually
- Create clear divisions in layouts
- Break up long content areas
- Organize navigation elements
- Distinguish between different data groups

## Accessibility
- Uses appropriate ARIA separator role by default
- Decorative option removes semantic meaning for pure visual separation
- Works with screen readers to indicate content divisions
- Keyboard navigation respects separator boundaries
        `
      }
    }
  },
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Orientation of the separator line',
      table: {
        type: { summary: 'horizontal | vertical' },
        defaultValue: { summary: 'horizontal' },
      },
    },
    decorative: {
      control: 'boolean',
      description: 'Whether the separator is purely decorative (no semantic meaning)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for custom styling',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
  },
  args: {
    orientation: 'horizontal',
    decorative: false,
  }
}

export default meta
type Story = StoryObj<typeof Separator>

export const Default: Story = {
  render: () => (
    <div className="w-full max-w-md mx-auto space-y-4 p-4">
      <div className="text-sm">
        <p>Content above separator</p>
      </div>
      <Separator />
      <div className="text-sm">
        <p>Content below separator</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Default horizontal separator dividing two content sections.',
      },
    },
  },
}

export const Vertical: Story = {
  render: () => (
    <div className="flex h-20 items-center space-x-4 p-4">
      <div className="text-sm">
        <p>Left content</p>
      </div>
      <Separator orientation="vertical" />
      <div className="text-sm">
        <p>Right content</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Vertical separator for side-by-side content layout.',
      },
    },
  },
}

export const Decorative: Story = {
  render: () => (
    <div className="w-full max-w-md mx-auto space-y-4 p-4">
      <div className="text-sm">
        <p>Visual section one</p>
      </div>
      <Separator decorative />
      <div className="text-sm">
        <p>Visual section two</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Decorative separator with no semantic meaning for screen readers.',
      },
    },
  },
}

export const InLayout: Story = {
  render: () => (
    <div className="max-w-md mx-auto p-6 border rounded-lg space-y-4">
      <div>
        <h3 className="text-lg font-semibold">Section Title</h3>
        <p className="text-sm text-gray-600">Some description text here.</p>
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-semibold">Another Section</h3>
        <p className="text-sm text-gray-600">More content in this section.</p>
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-semibold">Final Section</h3>
        <p className="text-sm text-gray-600">Last bit of content.</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Separators organizing multiple content sections in a card layout.',
      },
    },
  },
}

export const NavigationMenu: Story = {
  render: () => (
    <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
      <a href="#" className="text-sm font-medium hover:text-blue-600">Home</a>
      <Separator orientation="vertical" decorative className="h-4" />
      <a href="#" className="text-sm font-medium hover:text-blue-600">Products</a>
      <Separator orientation="vertical" decorative className="h-4" />
      <a href="#" className="text-sm font-medium hover:text-blue-600">About</a>
      <Separator orientation="vertical" decorative className="h-4" />
      <a href="#" className="text-sm font-medium hover:text-blue-600">Contact</a>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Vertical separators in a navigation menu for visual organization.',
      },
    },
  },
}

export const DataSections: Story = {
  render: () => (
    <div className="max-w-lg mx-auto p-6 bg-white border rounded-lg">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">Total Revenue</span>
          <span className="text-lg font-bold text-green-600">$124,500</span>
        </div>
        
        <Separator />
        
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">Active Users</span>
          <span className="text-lg font-bold text-blue-600">2,847</span>
        </div>
        
        <Separator />
        
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">Conversion Rate</span>
          <span className="text-lg font-bold text-purple-600">3.2%</span>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Separators organizing data metrics in a dashboard-style layout.',
      },
    },
  },
}

import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

const meta = {
  title: '⚛️ Atoms/Button 🔘',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Button Component

A versatile button component that follows BCBST design system guidelines.

## Features
- BCBST brand colors and styling
- Multiple visual variants (primary, secondary, success, etc.)
- Different sizes (sm, md, lg)
- Loading states with spinner
- Icon support (left, right, or icon-only)
- Full width option
- Keyboard accessibility
- Focus management
- Enhanced shadow transitions and hover effects

## Usage

\`\`\`tsx
import { Button } from '@portals/ui';

// Basic usage
<Button variant="primary">Click Me</Button>

// With loading state
<Button variant="primary" loading>Processing...</Button>

// With icons
<Button leftIcon={<Icon />}>With Icon</Button>

// Form submission
<Button type="submit" variant="primary">Submit Form</Button>
\`\`\`

## Accessibility
- Proper ARIA attributes
- Keyboard navigation support
- Loading state announcements
- High contrast ratios for all variants (WCAG 2.1 AA compliant)
- Focus visible indicators with brand colors
`,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'success',
        'warning',
        'error',
        'outline',
        'ghost',
        'destructive',
        'default',
        'link',
      ],
      description: 'The visual style variant of the button',
      table: {
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the button',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    loading: {
      control: 'boolean',
      description: 'Whether the button is in a loading state',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    fullWidth: {
      control: 'boolean',
      description: 'Whether the button should take full width',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
      description: 'The type of the button',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'button' },
      },
    },
    children: {
      control: 'text',
      description: 'The content of the button',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
    onClick: {
      action: 'clicked',
      description: 'Function called when the button is clicked',
    },
    leftIcon: {
      control: 'object',
      description: 'Icon element to show before the button text',
    },
    rightIcon: {
      control: 'object',
      description: 'Icon element to show after the button text',
    },
    icon: {
      control: 'object',
      description: 'Single icon for icon-only buttons',
    },
    iconOnly: {
      control: 'boolean',
      description: 'Whether this is an icon-only button',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

// Interactive States
export const InteractiveStates: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Button States</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Default State */}
          <div className="space-y-2 text-center">
            <Button variant="primary">Default State</Button>
            <p className="text-sm text-gray-600">Normal state</p>
          </div>

          {/* Hover State */}
          <div className="space-y-2 text-center">
            <Button
              variant="primary"
              className="shadow-md -translate-y-0.5 bg-blue-700"
            >
              Hover State
            </Button>
            <p className="text-sm text-gray-600">On hover: elevated & darker</p>
          </div>

          {/* Focus State */}
          <div className="space-y-2 text-center">
            <Button
              variant="primary"
              className="ring-2 ring-blue-500 ring-offset-2"
            >
              Focus State
            </Button>
            <p className="text-sm text-gray-600">Focus ring visible</p>
          </div>

          {/* Active State */}
          <div className="space-y-2 text-center">
            <Button
              variant="primary"
              className="shadow-sm translate-y-0 bg-blue-800 transform scale-[0.98]"
            >
              Active State
            </Button>
            <p className="text-sm text-gray-600">Pressed down & darker</p>
          </div>
        </div>
      </div>

      {/* Disabled State */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Special States</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-2 text-center">
            <Button variant="primary" disabled>
              Disabled State
            </Button>
            <p className="text-sm text-gray-600">Reduced opacity, no hover</p>
          </div>

          <div className="space-y-2 text-center">
            <Button variant="primary" loading>
              Loading State
            </Button>
            <p className="text-sm text-gray-600">With loading spinner</p>
          </div>

          <div className="space-y-2 text-center">
            <Button variant="primary" icon="+" iconOnly aria-label="Add item">
              +
            </Button>
            <p className="text-sm text-gray-600">Icon only variant</p>
          </div>
        </div>
      </div>

      {/* Variant States */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Variant States</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Secondary Button States */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-700">
              Secondary Button
            </h4>
            <div className="flex gap-4">
              <Button variant="secondary">Default</Button>
              <Button
                variant="secondary"
                className="shadow-md -translate-y-0.5 bg-gray-50"
              >
                Hover
              </Button>
              <Button
                variant="secondary"
                className="ring-2 ring-gray-500 ring-offset-2"
              >
                Focus
              </Button>
            </div>
          </div>

          {/* Outline Button States */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-700">
              Outline Button
            </h4>
            <div className="flex gap-4">
              <Button variant="outline">Default</Button>
              <Button
                variant="outline"
                className="shadow-md -translate-y-0.5 bg-primary-blue/10"
              >
                Hover
              </Button>
              <Button
                variant="outline"
                className="ring-2 ring-blue-500 ring-offset-2"
              >
                Focus
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Interactive states including hover, focus, active, and disabled states.',
      },
    },
  },
}

// Brand Colors
export const BrandColors: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Primary Actions</h3>
        <div className="flex gap-4 items-center">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Status Colors</h3>
        <div className="flex gap-4 items-center">
          <Button variant="success">Success</Button>
          <Button variant="warning">Warning</Button>
          <Button variant="error">Error</Button>
          <Button variant="destructive">Destructive</Button>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Button variants using BCBST brand colors with consistent shadow and hover effects.',
      },
    },
  },
}

// Size Variants
export const SizeVariants: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Size Variants</h3>
        <div className="flex gap-4 items-center">
          <Button variant="primary" size="sm">
            Small
          </Button>
          <Button variant="primary" size="md">
            Medium
          </Button>
          <Button variant="primary" size="lg">
            Large
          </Button>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Available button sizes with consistent height, padding, and interactive states.',
      },
    },
  },
}

// State Examples
export const States: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Button States</h3>
        <div className="flex gap-4 items-center">
          <Button variant="primary">Default</Button>
          <Button variant="primary" disabled>
            Disabled
          </Button>
          <Button variant="primary" loading>
            Loading...
          </Button>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Different button states including disabled and loading, with appropriate visual feedback.',
      },
    },
  },
}

// Icon Examples
export const IconExamples: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">With Icons</h3>
        <div className="flex gap-4 items-center">
          <Button variant="primary" leftIcon="←">
            Back
          </Button>
          <Button variant="primary" rightIcon="→">
            Next
          </Button>
          <Button variant="primary" icon="+" iconOnly aria-label="Add item" />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Buttons with different icon placements and consistent hover effects.',
      },
    },
  },
}

// Common Use Cases
export const CommonUseCases: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Form Actions</h3>
        <div className="flex justify-between items-center w-[400px] p-4 bg-gray-50 rounded-lg">
          <Button variant="ghost" leftIcon="←">
            Back
          </Button>
          <div className="flex gap-2">
            <Button variant="secondary">Cancel</Button>
            <Button variant="primary">Submit</Button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Dialog Actions</h3>
        <div className="flex justify-end gap-2 w-[400px] p-4 bg-gray-50 rounded-lg">
          <Button variant="secondary">Cancel</Button>
          <Button variant="destructive">Delete</Button>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Common button usage patterns in forms and dialogs with appropriate visual hierarchy.',
      },
    },
  },
}

// Accessibility Examples
export const AccessibilityExamples: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Accessibility Features
        </h3>
        <div className="flex gap-4 items-center">
          <Button variant="primary" aria-label="Submit form">
            Submit
          </Button>
          <Button
            variant="primary"
            loading
            aria-label="Submitting form, please wait"
          >
            Processing...
          </Button>
          <Button
            variant="primary"
            icon="+"
            iconOnly
            aria-label="Add new item"
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true,
          },
          {
            id: 'keyboard-navigation',
            enabled: true,
          },
        ],
      },
    },
    docs: {
      description: {
        story:
          'Examples demonstrating proper accessibility implementation with visual feedback.',
      },
    },
  },
}

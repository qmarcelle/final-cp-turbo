import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from './Badge'

const meta = {
  title: '⚛️ Atoms/Badge 🏷️',
  component: Badge,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Badge Component

A versatile badge component for status indicators, labels, and counters in the broker portal.

## Features
- Multiple visual variants for different contexts
- Consistent styling with BCBST design system
- Interactive states with hover effects
- Size variations
- Support for icons and dots
- Accessibility-first design
- Smooth transitions and animations

## Usage

\`\`\`tsx
import { Badge } from '@portals/ui'

// Basic usage
<Badge>Default</Badge>

// Status indicator
<Badge variant="success">Active</Badge>

// Interactive badge
<Badge interactive onClick={handleClick}>Click me</Badge>

// With dot indicator
<Badge dot>New</Badge>
\`\`\`
`,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'default',
        'secondary',
        'success',
        'warning',
        'error',
        'outline',
        'ghost',
        'pending',
        'processed',
        'denied',
        'approved',
        'partial-approval',
      ],
      description: 'The visual style variant of the badge',
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon', 'label'],
      description: 'The size of the badge',
    },
    interactive: {
      control: 'boolean',
      description: 'Whether the badge is clickable',
    },
    dot: {
      control: 'boolean',
      description: 'Whether to show a dot before the content',
    },
    children: {
      control: 'text',
      description: 'The content of the badge',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

// Showcase all variants
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Basic Variants</h3>
        <div className="flex flex-wrap gap-4">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="error">Error</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="ghost">Ghost</Badge>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Status Variants</h3>
        <div className="flex flex-wrap gap-4">
          <Badge variant="pending">Pending</Badge>
          <Badge variant="processed">Processed</Badge>
          <Badge variant="approved">Approved</Badge>
          <Badge variant="denied">Denied</Badge>
          <Badge variant="partial-approval">Partial Approval</Badge>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Sizes</h3>
        <div className="flex flex-wrap items-center gap-4">
          <Badge size="sm">Small</Badge>
          <Badge size="default">Default</Badge>
          <Badge size="lg">Large</Badge>
          <Badge size="label">Label</Badge>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Interactive States
        </h3>
        <div className="flex flex-wrap gap-4">
          <Badge interactive>Clickable</Badge>
          <Badge interactive variant="outline">
            Hover me
          </Badge>
          <Badge dot>With dot</Badge>
          <Badge icon="🔔">With icon</Badge>
        </div>
      </div>
    </div>
  ),
}

// Common use cases
export const CommonUseCases: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Member Status</h3>
        <div className="flex gap-4">
          <Badge variant="success">Active</Badge>
          <Badge variant="warning">Pending</Badge>
          <Badge variant="error">Terminated</Badge>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Plan Types</h3>
        <div className="flex gap-4">
          <Badge variant="outline">PPO</Badge>
          <Badge variant="outline">HMO</Badge>
          <Badge variant="outline">HDHP</Badge>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
        <div className="flex gap-4">
          <Badge variant="error" dot>
            3 New Messages
          </Badge>
          <Badge variant="warning" dot>
            Updates Available
          </Badge>
        </div>
      </div>
    </div>
  ),
}

// Real-world examples
export const RealWorldExamples: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-lg border border-gray-200 space-y-4 w-[400px]">
        <div className="flex justify-between items-start">
          <div>
            <h4 className="font-semibold text-gray-900">TechCorp Solutions</h4>
            <p className="text-sm text-gray-500">Group #TC-2024-001</p>
          </div>
          <Badge variant="success">Active</Badge>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline">PPO</Badge>
          <Badge variant="secondary">125 Members</Badge>
          <Badge variant="warning" dot>
            Renewal Due
          </Badge>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-200 w-[400px]">
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <h4 className="font-semibold text-gray-900">Commission Payment</h4>
            <div className="flex gap-2">
              <Badge variant="processed">Processed</Badge>
              <Badge variant="outline">Q1 2024</Badge>
            </div>
          </div>
          <span className="text-lg font-semibold text-gray-900">
            $12,450.00
          </span>
        </div>
      </div>
    </div>
  ),
}

// Interactive examples
export const InteractiveExamples: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Interactive Badges
        </h3>
        <div className="flex gap-4">
          <Badge
            interactive
            onClick={() => window.alert('Clicked!')}
            className="cursor-pointer"
          >
            Click me
          </Badge>
          <Badge
            interactive
            variant="outline"
            onClick={() => window.alert('Viewing details...')}
          >
            View Details
          </Badge>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">
          With Hover Effects
        </h3>
        <div className="flex gap-4">
          <Badge
            interactive
            variant="success"
            className="transform transition-transform hover:scale-105"
          >
            Hover to Scale
          </Badge>
          <Badge
            interactive
            variant="warning"
            className="transition-shadow hover:shadow-md"
          >
            Hover for Shadow
          </Badge>
        </div>
      </div>
    </div>
  ),
}

// Accessibility examples
export const AccessibilityExamples: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Accessible Badges
        </h3>
        <div className="flex gap-4">
          <Badge role="status" aria-label="3 unread messages">
            3
          </Badge>
          <Badge
            variant="warning"
            role="alert"
            aria-label="Action required: Document needs review"
          >
            Action Required
          </Badge>
        </div>
      </div>
    </div>
  ),
}

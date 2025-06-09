import type { Meta, StoryObj } from '@storybook/react'
import { Badge, StatusBadge, CountBadge } from './Badge'

const meta: Meta<typeof Badge> = {
  title: 'Foundation/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A versatile badge component for labels, status indicators, and counts. Built with accessibility and modern UX patterns in mind.',
      },
    },
  },
  tags: ['autodocs'],
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
      ],
      description: 'The visual style variant',
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
      description: 'Size of the badge',
    },
    interactive: {
      control: 'boolean',
      description: 'Whether the badge is interactive',
    },
    dot: {
      control: 'boolean',
      description: 'Show a dot indicator',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Badge',
  },
}

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="error">Error</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="ghost">Ghost</Badge>
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Badge size="sm">Small</Badge>
      <Badge size="default">Default</Badge>
      <Badge size="lg">Large</Badge>
    </div>
  ),
}

export const StatusBadges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <StatusBadge status="success">Completed</StatusBadge>
      <StatusBadge status="warning">Pending</StatusBadge>
      <StatusBadge status="error">Failed</StatusBadge>
      <StatusBadge status="info">Info</StatusBadge>
      <StatusBadge status="neutral">Draft</StatusBadge>
    </div>
  ),
}

export const CountBadges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <div className="relative">
        <div className="h-8 w-8 rounded bg-gray-200"></div>
        <CountBadge
          count={3}
          className="absolute -top-1 -right-1"
          variant="error"
        />
      </div>

      <div className="relative">
        <div className="h-8 w-8 rounded bg-gray-200"></div>
        <CountBadge
          count={99}
          max={99}
          className="absolute -top-1 -right-1"
          variant="error"
        />
      </div>

      <div className="relative">
        <div className="h-8 w-8 rounded bg-gray-200"></div>
        <CountBadge
          count={150}
          max={99}
          className="absolute -top-1 -right-1"
          variant="error"
        />
      </div>
    </div>
  ),
}

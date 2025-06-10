import type { Meta, StoryObj } from '@storybook/react'
import { Badge, StatusBadge, CountBadge } from './Badge'

const meta: Meta<typeof Badge> = {
  title: '⚛️ Foundation/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    tags: ['foundation', 'stable'],
    docs: {
      description: {
        component: `
# Badge

Compact indicators for labels, status, and counts with multiple variants and sizes.

## Features
- **Multiple variants**: Default, secondary, success, warning, error, outline, and ghost styles
- **Flexible sizing**: Small, default, and large sizes plus icon-only variant
- **Status indicators**: Built-in status badges for workflow states
- **Count badges**: Notification counters with overflow handling
- **Interactive states**: Optional interactive/clickable badges
- **Accessibility**: Proper ARIA attributes and keyboard support
- **Design consistency**: Integrated with design system colors and typography

## Usage

\`\`\`tsx
import { Badge, StatusBadge, CountBadge } from '@portals/ui';

// Basic badge
<Badge variant="default">New</Badge>

// Status badge for workflows
<StatusBadge status="success">Completed</StatusBadge>

// Count badge for notifications  
<CountBadge count={12} max={99} variant="error" />

// Interactive badge
<Badge variant="outline" interactive onClick={handleClick}>
  Clickable
</Badge>
\`\`\`

## When to use
- Label content categories or statuses
- Show notification counts or unread items
- Indicate completion states in workflows
- Highlight new or important content
- Group related items visually

## Accessibility
- Includes proper ARIA labels for screen readers
- Color is not the only indicator (uses text/icons)
- Keyboard accessible when interactive
- High contrast ratios for readability
- Screen reader compatible count announcements
        `
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
      ],
      description: 'Visual style variant of the badge',
      table: {
        type: { summary: 'default | secondary | success | warning | error | outline | ghost' },
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
      description: 'Size of the badge',
      table: {
        type: { summary: 'default | sm | lg | icon' },
        defaultValue: { summary: 'default' },
      },
    },
    interactive: {
      control: 'boolean',
      description: 'Whether the badge is interactive/clickable',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    dot: {
      control: 'boolean',
      description: 'Show a dot indicator alongside text',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    children: {
      control: 'text',
      description: 'Badge content text',
      table: {
        type: { summary: 'React.ReactNode' },
      },
    },
    onClick: {
      action: 'clicked',
      description: 'Click handler for interactive badges',
      table: {
        type: { summary: '() => void' },
      },
    },
  },
  args: {
    variant: 'default',
    size: 'default',
    interactive: false,
    dot: false,
    children: 'Badge',
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Default Badge',
  },
  parameters: {
    docs: {
      description: {
        story: 'Default badge styling with neutral colors. Use for general labeling and categorization.',
      },
    },
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
  parameters: {
    docs: {
      description: {
        story: 'All available badge variants. Each variant conveys different semantic meaning through color.',
      },
    },
  },
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Badge size="sm">Small</Badge>
      <Badge size="default">Default</Badge>
      <Badge size="lg">Large</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Badge sizes for different contexts. Use smaller sizes in dense interfaces.',
      },
    },
  },
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
  parameters: {
    docs: {
      description: {
        story: 'Status badges for workflow states and process indicators. Commonly used in task lists and status tracking.',
      },
    },
  },
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
  parameters: {
    docs: {
      description: {
        story: 'Count badges for notifications and counters. Shows overflow with "99+" when count exceeds maximum.',
      },
    },
  },
}

export const Interactive: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="outline" interactive>Clickable</Badge>
      <Badge variant="secondary" interactive>Filter: Active</Badge>
      <Badge variant="ghost" interactive>Remove</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Interactive badges that can be clicked. Useful for filters, tags, and removable labels.',
      },
    },
  },
}

export const WithDots: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="success" dot>Online</Badge>
      <Badge variant="warning" dot>Away</Badge>
      <Badge variant="error" dot>Offline</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Badges with dot indicators. Useful for status indicators and presence states.',
      },
    },
  },
}

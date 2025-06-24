import type { Meta, StoryObj } from '@storybook/react'
import { userEvent, within, expect } from 'storybook/test'
import { Badge } from './Badge'

const meta = {
  title: '⚛️ Atoms/Badge 🏷️',
  component: Badge,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Badge component for status indicators, counters, and labels in the broker portal',
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

// Basic Badge Variants
export const Default: Story = {
  args: {
    children: 'Default',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary',
  },
}

export const Success: Story = {
  args: {
    variant: 'success',
    children: 'Success',
  },
}

export const Warning: Story = {
  args: {
    variant: 'warning',
    children: 'Warning',
  },
}

export const Error: Story = {
  args: {
    variant: 'error',
    children: 'Error',
  },
}

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline',
  },
}

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ghost',
  },
}

// Status Badges for Broker Portal
export const ActiveStatus: Story = {
  args: {
    variant: 'success',
    children: 'Active',
  },
  parameters: {
    docs: {
      description: {
        story: 'Green badge for active members, groups, or brokers',
      },
    },
  },
}

export const PendingStatus: Story = {
  args: {
    variant: 'warning',
    children: 'Pending',
  },
  parameters: {
    docs: {
      description: {
        story: 'Yellow badge for pending applications or processes',
      },
    },
  },
}

export const TerminatedStatus: Story = {
  args: {
    variant: 'error',
    children: 'Terminated',
  },
  parameters: {
    docs: {
      description: {
        story: 'Red badge for terminated coverage or inactive status',
      },
    },
  },
}

export const ProcessingStatus: Story = {
  args: {
    variant: 'secondary',
    children: 'Processing',
  },
  parameters: {
    docs: {
      description: {
        story: 'Gray badge for items being processed',
      },
    },
  },
}

// Plan Type Badges
export const PPOBadge: Story = {
  args: {
    variant: 'outline',
    children: 'PPO',
  },
}

export const HMOBadge: Story = {
  args: {
    variant: 'outline',
    children: 'HMO',
  },
}

export const HDHPBadge: Story = {
  args: {
    variant: 'outline',
    children: 'HDHP',
  },
}

export const EPOBadge: Story = {
  args: {
    variant: 'outline',
    children: 'EPO',
  },
}

// Counter Badges
export const MemberCount: Story = {
  args: {
    variant: 'secondary',
    children: '45',
  },
  parameters: {
    docs: {
      description: {
        story: 'Badge showing member count for a group',
      },
    },
  },
}

export const NewNotifications: Story = {
  args: {
    variant: 'error',
    children: '3',
  },
  parameters: {
    docs: {
      description: {
        story: 'Badge showing number of new notifications',
      },
    },
  },
}

export const PendingApplications: Story = {
  args: {
    variant: 'warning',
    children: '12',
  },
  parameters: {
    docs: {
      description: {
        story: 'Badge showing number of pending applications',
      },
    },
  },
}

// Commission Status Badges
export const PaidCommission: Story = {
  args: {
    variant: 'success',
    children: 'Paid',
  },
  parameters: {
    docs: {
      description: {
        story: 'Badge for commission payment status',
      },
    },
  },
}

export const PendingPayment: Story = {
  args: {
    variant: 'warning',
    children: 'Pending Payment',
  },
}

export const OverduePayment: Story = {
  args: {
    variant: 'error',
    children: 'Overdue',
  },
}

// Size Variations
export const SmallBadge: Story = {
  args: {
    size: 'sm',
    children: 'Small',
  },
}

export const LargeBadge: Story = {
  args: {
    size: 'lg',
    children: 'Large',
  },
}

// Interactive Badge
export const ClickableBadge: Story = {
  args: {
    variant: 'outline',
    children: 'Click me',
    onClick: () => {
      // eslint-disable-next-line no-alert
      window.alert('Badge clicked!')
    },
    className: 'cursor-pointer hover:bg-gray-100',
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement)
    const badge = canvas.getByText('Click me')

    await userEvent.click(badge)
  },
}

// Badge with Tooltip
export const WithTooltip: Story = {
  args: {
    variant: 'warning',
    children: 'Hover for info',
    title: 'This group has pending renewal documents',
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement)
    const badge = canvas.getByText('Hover for info')

    await userEvent.hover(badge)
    // Note: Tooltip testing would depend on your tooltip implementation
  },
}

// Badge Groups
export const StatusGroup: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="success">Active</Badge>
      <Badge variant="warning">Pending</Badge>
      <Badge variant="error">Terminated</Badge>
      <Badge variant="secondary">Processing</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Common status badges used throughout the broker portal',
      },
    },
  },
}

export const PlanTypeGroup: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="outline">PPO</Badge>
      <Badge variant="outline">HMO</Badge>
      <Badge variant="outline">HDHP</Badge>
      <Badge variant="outline">EPO</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Plan type badges for identifying insurance plan types',
      },
    },
  },
}

export const CommissionStatusGroup: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="success">Paid</Badge>
      <Badge variant="warning">Pending</Badge>
      <Badge variant="secondary">Processing</Badge>
      <Badge variant="error">Rejected</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Commission payment status badges',
      },
    },
  },
}

// Real-world Usage Examples
export const GroupStatusCard: Story = {
  render: () => (
    <div className="bg-white p-4 rounded-lg border space-y-3">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-semibold">TechCorp Inc.</h4>
          <p className="text-sm text-gray-600">Group #TC-2024-001</p>
        </div>
        <Badge variant="success">Active</Badge>
      </div>
      <div className="flex gap-2">
        <Badge variant="outline">PPO</Badge>
        <Badge variant="secondary">45 Members</Badge>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example of badges used in a group information card',
      },
    },
  },
}

export const CommissionTableRow: Story = {
  render: () => (
    <div className="bg-white p-4 rounded-lg border">
      <div className="grid grid-cols-4 gap-4 items-center">
        <div>
          <p className="font-medium">Manufacturing Solutions LLC</p>
          <p className="text-sm text-gray-600">MS-2024-002</p>
        </div>
        <div className="text-center">
          <Badge variant="outline">HMO</Badge>
        </div>
        <div className="text-center">
          <p className="font-semibold">$5,616.00</p>
        </div>
        <div className="text-center">
          <Badge variant="success">Paid</Badge>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example of badges used in commission table rows',
      },
    },
  },
}

// Accessibility Test
export const AccessibilityTest: Story = {
  args: {
    variant: 'success',
    children: 'Accessible Badge',
    'aria-label': 'Member status is active',
    role: 'status',
  },

  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement)
    const badge = canvas.getByText('Accessible Badge')

    // Test accessibility attributes
    expect(badge).toHaveAttribute('aria-label')
    expect(badge).toHaveAttribute('role', 'status')
    expect(badge).toBeVisible()

    // Test color contrast (this would be handled by a11y addon)
    expect(badge).toHaveClass('bg-green-100', 'text-green-800')
  },
  parameters: {
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true,
          },
        ],
      },
    },
  },
}

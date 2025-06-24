import type { Meta, StoryObj } from '@storybook/react'
import { userEvent, within } from 'storybook/test'
import { StatBlock } from './StatBlock'
import { getStoryMeta } from '../../utils/getStoryMeta'
import { mockCommissionSummary } from '../../utils/mockData'
import { Button } from '../../atoms/Button/Button'

const meta = {
  title: '🧬 Molecules/📊 StatBlock',
  component: StatBlock,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Statistical data display component for KPIs, commission data, and metrics in the broker portal',
      },
    },
  },
} satisfies Meta<typeof StatBlock>

export default meta
type Story = StoryObj<typeof meta>

// Basic StatBlock Examples
export const Default: Story = {
  args: {
    value: '1,256',
    label: 'Total Members',
  },
}

export const WithIcon: Story = {
  args: {
    value: '47',
    label: 'Active Groups',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
        <path
          fillRule="evenodd"
          d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
}

export const Currency: Story = {
  args: {
    value: 125486.5,
    label: 'YTD Commission',
    format: 'currency',
    variant: 'success',
  },
}

export const Percentage: Story = {
  args: {
    value: 8.2,
    label: 'Average Commission Rate',
    format: 'percentage',
    variant: 'info',
  },
}

export const WithTrend: Story = {
  args: {
    value: 32150.75,
    label: 'Q4 Commission',
    format: 'currency',
    trend: {
      value: 12.5,
      direction: 'up',
      period: 'last quarter',
    },
  },
}

export const WithSubtitle: Story = {
  args: {
    value: '324',
    label: 'New Enrollments',
    subtitle: 'This quarter',
    variant: 'success',
  },
}

export const WithAction: Story = {
  args: {
    value: '12',
    label: 'Pending Applications',
    variant: 'warning',
    action: (
      <Button size="sm" variant="outline">
        Review
      </Button>
    ),
  },
}

// Broker Portal Commission Examples
export const YTDCommission: Story = {
  args: {
    value: mockCommissionSummary[0].totalCommission,
    label: 'Year to Date Commission',
    format: 'currency',
    variant: 'success',
    subtitle: `From ${mockCommissionSummary[0].groupCount} active groups`,
    trend: {
      value: 15.8,
      direction: 'up',
      period: 'last year',
    },
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Main commission dashboard showing year-to-date earnings with trend data',
      },
    },
  },
}

export const PendingCommission: Story = {
  args: {
    value: mockCommissionSummary[0].pendingCommission,
    label: 'Pending Commission',
    format: 'currency',
    variant: 'warning',
    subtitle: 'Awaiting payment processing',
    action: (
      <Button size="sm" variant="outline">
        Details
      </Button>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Commission amount pending payment with action button',
      },
    },
  },
}

export const MemberCount: Story = {
  args: {
    value: mockCommissionSummary[0].memberCount,
    label: 'Total Members',
    format: 'number',
    subtitle: 'Across all active groups',
    trend: {
      value: 8.3,
      direction: 'up',
      period: 'last month',
    },
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
      </svg>
    ),
  },
}

export const GroupCount: Story = {
  args: {
    value: mockCommissionSummary[0].groupCount,
    label: 'Active Groups',
    format: 'number',
    variant: 'info',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v8H4V6z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
}

// Size Variants
export const SmallSize: Story = {
  args: {
    value: '45',
    label: 'New This Month',
    size: 'sm',
  },
}

export const LargeSize: Story = {
  args: {
    value: 125486.5,
    label: 'Annual Commission',
    format: 'currency',
    size: 'lg',
    variant: 'success',
  },
}

// State Examples
export const Loading: Story = {
  args: {
    value: '0',
    label: 'Loading...',
    loading: true,
  },
}

export const Hoverable: Story = {
  args: {
    value: '1,256',
    label: 'Total Members',
    hoverable: true,
    onClick: () => {
      // eslint-disable-next-line no-alert
      //alert('StatBlock clicked!');
    },
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement)
    const statBlock = canvas.getByText('Total Members').closest('div')

    if (statBlock) {
      await userEvent.hover(statBlock)
      await userEvent.click(statBlock)
    }
  },
}

// Trend Direction Examples
export const TrendUp: Story = {
  args: {
    value: 28975.25,
    label: 'Q3 Commission',
    format: 'currency',
    trend: {
      value: 18.7,
      direction: 'up',
      period: 'Q2',
    },
  },
}

export const TrendDown: Story = {
  args: {
    value: 234,
    label: 'Active Members',
    trend: {
      value: 5.2,
      direction: 'down',
      period: 'last month',
    },
    variant: 'warning',
  },
}

export const TrendNeutral: Story = {
  args: {
    value: 15,
    label: 'New Groups',
    trend: {
      value: 0.8,
      direction: 'neutral',
      period: 'last quarter',
    },
  },
}

// Dashboard Grid Example
export const DashboardGrid: Story = {
  args: {
    value: '0',
    label: 'Dashboard Grid Example',
  },
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatBlock
        value={mockCommissionSummary[0].totalCommission}
        label="YTD Commission"
        format="currency"
        variant="success"
        trend={{
          value: 15.8,
          direction: 'up',
          period: 'last year',
        }}
      />
      <StatBlock
        value={mockCommissionSummary[0].paidCommission}
        label="Paid Commission"
        format="currency"
        variant="default"
      />
      <StatBlock
        value={mockCommissionSummary[0].pendingCommission}
        label="Pending Commission"
        format="currency"
        variant="warning"
        action={
          <Button size="sm" variant="outline">
            View
          </Button>
        }
      />
      <StatBlock
        value={mockCommissionSummary[0].groupCount}
        label="Active Groups"
        format="number"
        variant="info"
        trend={{
          value: 8.3,
          direction: 'up',
          period: 'last month',
        }}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example dashboard grid showing key broker portal metrics',
      },
    },
  },
}

// Commission Summary Card
export const CommissionSummaryCard: Story = {
  args: {
    value: '0',
    label: 'Commission Summary Card Example',
  },
  render: () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Commission Summary</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatBlock
          value={mockCommissionSummary[0].totalCommission}
          label="Total Commission"
          subtitle="Year to Date"
          format="currency"
          variant="success"
          size="lg"
          trend={{
            value: 15.8,
            direction: 'up',
            period: 'last year',
          }}
        />
        <StatBlock
          value={mockCommissionSummary[0].averageCommissionRate}
          label="Average Rate"
          subtitle="Across all groups"
          format="percentage"
          variant="info"
        />
        <StatBlock
          value={mockCommissionSummary[0].memberCount}
          label="Total Members"
          subtitle="Active enrollments"
          format="number"
          trend={{
            value: 8.3,
            direction: 'up',
            period: 'last month',
          }}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Commission summary section with multiple related metrics',
      },
    },
  },
}

// Variant Showcase
export const VariantShowcase: Story = {
  args: {
    value: '0',
    label: 'Variant Showcase Example',
  },
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      <StatBlock value="1,234" label="Default" variant="default" />
      <StatBlock value="5,678" label="Success" variant="success" />
      <StatBlock value="890" label="Warning" variant="warning" />
      <StatBlock value="123" label="Error" variant="error" />
      <StatBlock value="456" label="Info" variant="info" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available StatBlock variants and their color schemes',
      },
    },
  },
}

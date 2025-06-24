import type { Meta, StoryObj } from '@storybook/react'
import { userEvent, within } from 'storybook/test'
import { Card } from './Card'
import { getStoryMeta } from '../../utils/getStoryMeta'
import {
  mockGroups,
  mockQuickLinks,
  mockReportCategories,
  type QuickLink,
} from '../../utils/mockData'
import { Button } from '../../atoms/Button/Button'
import { Badge } from '../../atoms/Badge/Badge'

// Get the meta data from the utility function
const meta = {
  title: '🧬 Molecules/Card 🃏',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Card component for organizing content in the broker portal with headers, footers, and various layouts',
      },
    },
  },
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

// Basic Card Variants
export const Default: Story = {
  args: {
    children: (
      <div className="p-4">
        <h3 className="font-semibold mb-2">Default Card</h3>
        <p className="text-gray-600">
          This is a basic card with default styling.
        </p>
      </div>
    ),
  },
}

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: (
      <div className="p-4">
        <h3 className="font-semibold mb-2">Outline Card</h3>
        <p className="text-gray-600">This card has an outline variant.</p>
      </div>
    ),
  },
}

export const Filled: Story = {
  args: {
    variant: 'filled',
    children: (
      <div className="p-4">
        <h3 className="font-semibold mb-2">Filled Card</h3>
        <p className="text-gray-600">This card has a filled background.</p>
      </div>
    ),
  },
}

export const Elevated: Story = {
  args: {
    variant: 'elevated',
    children: (
      <div className="p-4">
        <h3 className="font-semibold mb-2">Elevated Card</h3>
        <p className="text-gray-600">This card has elevated shadow styling.</p>
      </div>
    ),
  },
}

export const Interactive: Story = {
  args: {
    hoverable: true,
    onClick: () => {
      // eslint-disable-next-line no-alert
      window.alert('Card clicked!')
    },
    children: (
      <div className="p-4">
        <h3 className="font-semibold mb-2">Interactive Card</h3>
        <p className="text-gray-600">This card is clickable and hoverable.</p>
      </div>
    ),
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement)
    const card = canvas.getByText('Interactive Card').closest('div')

    if (card) {
      await userEvent.hover(card)
      await userEvent.click(card)
    }
  },
}

// Card with Header and Footer
export const WithHeaderAndFooter: Story = {
  render: () => (
    <Card>
      <Card.Header>
        <div className="flex justify-between items-center">
          <h3 className="font-semibold">Card with Header</h3>
          <Badge variant="success">Active</Badge>
        </div>
      </Card.Header>
      <Card.Content>
        <p className="text-gray-600">
          This card demonstrates the header and footer components with proper
          spacing and layout.
        </p>
      </Card.Content>
      <Card.Footer>
        <div className="flex justify-end gap-2">
          <Button variant="outline" size="sm">
            Cancel
          </Button>
          <Button variant="primary" size="sm">
            Save
          </Button>
        </div>
      </Card.Footer>
    </Card>
  ),
}

// Broker Portal Specific Examples
export const GroupCard: Story = {
  render: () => {
    const group = mockGroups[0]
    return (
      <Card hoverable className="max-w-md">
        <Card.Header>
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold">{group.name}</h3>
              <p className="text-sm text-gray-600">{group.groupNumber}</p>
            </div>
            <Badge variant={group.status === 'active' ? 'success' : 'warning'}>
              {group.status}
            </Badge>
          </div>
        </Card.Header>
        <Card.Content>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Plan Type:</span>
              <Badge variant="outline">{group.planType}</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Members:</span>
              <span className="font-medium">{group.memberCount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Premium:</span>
              <span className="font-medium">
                ${group.premiumAmount.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Renewal:</span>
              <span className="text-sm">
                {new Date(group.renewalDate).toLocaleDateString()}
              </span>
            </div>
          </div>
        </Card.Content>
        <Card.Footer>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1">
              View Details
            </Button>
            <Button variant="primary" size="sm" className="flex-1">
              Manage
            </Button>
          </div>
        </Card.Footer>
      </Card>
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          'Group information card with status, metrics, and action buttons',
      },
    },
  },
}

export const QuickLinkCard: Story = {
  render: () => {
    const quickLink = mockQuickLinks[0]
    return (
      <Card hoverable className="max-w-sm">
        <Card.Content className="text-center p-6">
          <div className="mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          <h3 className="font-semibold mb-2">{quickLink.title}</h3>
          <p className="text-sm text-gray-600 mb-4">{quickLink.description}</p>
          <Button variant="outline" size="sm" className="w-full">
            Access Tool
          </Button>
        </Card.Content>
      </Card>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Quick link card for dashboard tools and resources',
      },
    },
  },
}

export const ReportCategoryCard: Story = {
  render: () => {
    const category = mockReportCategories[0]
    return (
      <Card hoverable className="max-w-sm">
        <Card.Header>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <svg
                className="w-5 h-5 text-green-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">{category.title}</h3>
              <p className="text-xs text-gray-500">
                Last updated:{' '}
                {new Date(category.lastUpdated).toLocaleDateString()}
              </p>
            </div>
          </div>
        </Card.Header>
        <Card.Content>
          <p className="text-sm text-gray-600 mb-3">{category.description}</p>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">
              {category.reportCount} reports available
            </span>
            <Badge variant="secondary">{category.category}</Badge>
          </div>
        </Card.Content>
        <Card.Footer>
          <Button variant="primary" size="sm" className="w-full">
            View Reports
          </Button>
        </Card.Footer>
      </Card>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Report category card showing available reports and metadata',
      },
    },
  },
}

// Commission Summary Card
export const CommissionSummaryCard: Story = {
  render: () => (
    <Card className="max-w-md">
      <Card.Header>
        <div className="flex justify-between items-center">
          <h3 className="font-semibold">Commission Summary</h3>
          <Button variant="ghost" size="sm">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
            </svg>
          </Button>
        </div>
      </Card.Header>
      <Card.Content>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">$125,486</p>
              <p className="text-xs text-gray-500">YTD Total</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">$10,000</p>
              <p className="text-xs text-gray-500">Pending</p>
            </div>
          </div>
          <div className="border-t pt-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Average Rate:</span>
              <span className="font-medium">8.2%</span>
            </div>
            <div className="flex justify-between text-sm mt-1">
              <span className="text-gray-600">Active Groups:</span>
              <span className="font-medium">47</span>
            </div>
          </div>
        </div>
      </Card.Content>
      <Card.Footer>
        <Button variant="outline" size="sm" className="w-full">
          View Detailed Report
        </Button>
      </Card.Footer>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Commission summary card with key metrics and totals',
      },
    },
  },
}

// Card Grid Layout
export const DashboardCardGrid: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {mockQuickLinks.slice(0, 6).map((link: QuickLink, _index: number) => (
        <Card key={link.id} hoverable>
          <Card.Content className="text-center p-6">
            <div className="mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <h3 className="font-semibold mb-2">{link.title}</h3>
            <p className="text-sm text-gray-600 mb-4">{link.description}</p>
            <Button variant="outline" size="sm" className="w-full">
              Access
            </Button>
          </Card.Content>
        </Card>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Grid layout of dashboard cards showing quick access tools',
      },
    },
  },
}

// Loading State
export const LoadingCard: Story = {
  render: () => (
    <Card className="max-w-md">
      <Card.Header>
        <div className="flex justify-between items-center">
          <div className="h-5 bg-gray-200 rounded w-1/3 animate-pulse"></div>
          <div className="h-6 w-16 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </Card.Header>
      <Card.Content>
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </Card.Content>
      <Card.Footer>
        <div className="h-8 bg-gray-200 rounded w-full animate-pulse"></div>
      </Card.Footer>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Loading state card with skeleton placeholders',
      },
    },
  },
}

// Error State
export const ErrorCard: Story = {
  render: () => (
    <Card variant="outline" className="max-w-md border-red-200">
      <Card.Content className="text-center p-6">
        <div className="mb-4">
          <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto">
            <svg
              className="w-6 h-6 text-red-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
        <h3 className="font-semibold mb-2 text-red-700">Failed to Load Data</h3>
        <p className="text-sm text-gray-600 mb-4">
          There was an error loading the commission data. Please try again.
        </p>
        <Button variant="outline" size="sm" className="w-full">
          Retry
        </Button>
      </Card.Content>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Error state card with retry action',
      },
    },
  },
}

// Compact Card
export const CompactCard: Story = {
  render: () => (
    <Card className="max-w-xs">
      <Card.Content className="p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <svg
              className="w-5 h-5 text-blue-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
            </svg>
          </div>
          <div>
            <p className="font-semibold">1,256</p>
            <p className="text-xs text-gray-500">Total Members</p>
          </div>
        </div>
      </Card.Content>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Compact card format for dashboard metrics',
      },
    },
  },
}

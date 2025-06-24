import type { Meta, StoryObj } from '@storybook/react'
import { userEvent, within } from '@storybook/testing-library'
//import { expect } from '@storybook/jest';
import { DashboardLayout } from './DashboardLayout'
import { mockBrokers, mockQuickLinks } from '../../utils/mockData'
import { Button } from '../../atoms/Button/Button'
import { Card } from '../../molecules/Card/Card'
import { StatBlock } from '../../molecules/StatBlock/StatBlock'

const meta = {
  title: '📐 Templates/📊 DashboardLayout',
  component: DashboardLayout,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Complete dashboard layout template with header, sidebar, main content, and footer',
      },
    },
  },
} satisfies Meta<typeof DashboardLayout>

export default meta
type Story = StoryObj<typeof meta>

// Sample user data
const sampleUser = {
  name: mockBrokers[0].name,
  email: mockBrokers[0].email,
  role: 'Licensed Broker',
  agency: mockBrokers[0].agencyName,
}

// Sample sidebar content
const SampleSidebar = () => (
  <div className="space-y-6">
    <div>
      <h3 className="text-sm font-semibold text-gray-900 mb-3">
        Quick Actions
      </h3>
      <nav className="space-y-1">
        {mockQuickLinks.slice(0, 5).map(link => (
          <a
            key={link.id}
            href={link.url}
            className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
          >
            <div className="w-5 h-5 bg-blue-100 rounded flex items-center justify-center">
              <svg
                className="w-3 h-3 text-blue-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v8H4V6z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            {link.title}
          </a>
        ))}
      </nav>
    </div>

    <div>
      <h3 className="text-sm font-semibold text-gray-900 mb-3">
        Recent Groups
      </h3>
      <div className="space-y-2">
        <div className="p-3 bg-gray-50 rounded-md">
          <p className="text-sm font-medium text-gray-900">TechCorp Inc.</p>
          <p className="text-xs text-gray-500">45 members • Active</p>
        </div>
        <div className="p-3 bg-gray-50 rounded-md">
          <p className="text-sm font-medium text-gray-900">
            Manufacturing Solutions
          </p>
          <p className="text-xs text-gray-500">78 members • Active</p>
        </div>
        <div className="p-3 bg-gray-50 rounded-md">
          <p className="text-sm font-medium text-gray-900">
            Local Restaurant Group
          </p>
          <p className="text-xs text-gray-500">23 members • Pending</p>
        </div>
      </div>
    </div>
  </div>
)

// Sample content
const SampleContent = () => (
  <div className="space-y-6">
    {/* Stats Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatBlock
        value={125486.5}
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
        value={47}
        label="Active Groups"
        format="number"
        variant="info"
      />
      <StatBlock
        value={1256}
        label="Total Members"
        format="number"
        trend={{
          value: 8.3,
          direction: 'up',
          period: 'last month',
        }}
      />
      <StatBlock
        value={10000}
        label="Pending Commission"
        format="currency"
        variant="warning"
      />
    </div>

    {/* Cards Grid */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <Card.Header>
          <h3 className="font-semibold">Recent Activity</h3>
        </Card.Header>
        <Card.Content>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-md">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">New member enrolled</p>
                <p className="text-xs text-gray-500">
                  TechCorp Inc. • 2 hours ago
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-md">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Commission processed</p>
                <p className="text-xs text-gray-500">$2,450.00 • 4 hours ago</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-md">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Quote expiring soon</p>
                <p className="text-xs text-gray-500">
                  Manufacturing LLC • 1 day ago
                </p>
              </div>
            </div>
          </div>
        </Card.Content>
        <Card.Footer>
          <Button variant="outline" size="sm" className="w-full">
            View All Activity
          </Button>
        </Card.Footer>
      </Card>

      <Card>
        <Card.Header>
          <h3 className="font-semibold">Quick Tools</h3>
        </Card.Header>
        <Card.Content>
          <div className="grid grid-cols-2 gap-3">
            {mockQuickLinks.slice(0, 4).map(link => (
              <Button
                key={link.id}
                variant="outline"
                size="sm"
                className="h-auto p-4 flex flex-col items-center gap-2"
              >
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v8H4V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="text-xs">{link.title}</span>
              </Button>
            ))}
          </div>
        </Card.Content>
      </Card>
    </div>
  </div>
)

// Basic Layout Examples
export const Default: Story = {
  args: {
    title: 'Broker Dashboard',
    subtitle:
      "Welcome back, John. Here's what's happening with your accounts today.",
    user: sampleUser,
    children: <SampleContent />,
  },
}

export const WithSidebar: Story = {
  args: {
    title: 'Dashboard with Sidebar',
    subtitle: 'Layout with navigation sidebar for quick access',
    user: sampleUser,
    showSidebar: true,
    sidebar: <SampleSidebar />,
    children: <SampleContent />,
  },
}

export const WithBreadcrumbs: Story = {
  args: {
    title: 'Commission Reports',
    subtitle: 'View and download your commission statements',
    user: sampleUser,
    showBreadcrumbs: true,
    breadcrumbs: [
      { label: 'Dashboard', href: '/broker/dashboard' },
      { label: 'Reporting', href: '/broker/reporting' },
      { label: 'Commission Reports' },
    ],
    children: <SampleContent />,
  },
}

export const WithActions: Story = {
  args: {
    title: 'Member Management',
    subtitle: 'Manage member enrollments and information',
    user: sampleUser,
    actions: (
      <div className="flex gap-2">
        <Button variant="outline">Export Data</Button>
        <Button variant="primary">Add Member</Button>
      </div>
    ),
    children: <SampleContent />,
  },
}

// Layout Variants
export const Compact: Story = {
  args: {
    title: 'Quick Quote Tool',
    user: sampleUser,
    compact: true,
    children: (
      <Card>
        <Card.Header>
          <h3 className="font-semibold">Group Information</h3>
        </Card.Header>
        <Card.Content>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Group Name
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Enter group name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Employee Count
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Number of employees"
              />
            </div>
          </div>
        </Card.Content>
        <Card.Footer>
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1">
              Save Draft
            </Button>
            <Button variant="primary" className="flex-1">
              Generate Quote
            </Button>
          </div>
        </Card.Footer>
      </Card>
    ),
  },
}

// State Examples
export const Loading: Story = {
  args: {
    title: 'Loading Dashboard',
    user: sampleUser,
    loading: true,
    children: <div />,
  },
}

export const Error: Story = {
  args: {
    title: 'Dashboard Error',
    user: sampleUser,
    error:
      'Failed to load dashboard data. Please check your connection and try again.',
    children: <div />,
  },
}

// Complex Layout Examples
export const FullFeaturedDashboard: Story = {
  args: {
    title: 'Broker Portal Dashboard',
    subtitle: 'Complete overview of your broker activities and performance',
    user: sampleUser,
    showSidebar: true,
    sidebar: <SampleSidebar />,
    showBreadcrumbs: true,
    breadcrumbs: [{ label: 'Home', href: '/broker' }, { label: 'Dashboard' }],
    actions: (
      <div className="flex gap-2">
        <Button variant="outline" size="sm">
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
          Export Data
        </Button>
        <Button variant="primary" size="sm">
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          New Quote
        </Button>
      </div>
    ),
    notificationCount: 5,
    children: <SampleContent />,
  },
  parameters: {
    docs: {
      description: {
        story: 'Full-featured dashboard with all layout options enabled',
      },
    },
  },
}

// Mobile Responsive
export const MobileView: Story = {
  args: {
    title: 'Mobile Dashboard',
    subtitle: 'Optimized for mobile viewing',
    user: sampleUser,
    showSidebar: true,
    sidebar: <SampleSidebar />,
    children: <SampleContent />,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
  },
}

// Interactive Examples
export const InteractiveSidebar: Story = {
  args: {
    title: 'Interactive Layout',
    user: sampleUser,
    showSidebar: true,
    sidebar: <SampleSidebar />,
    children: <SampleContent />,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // On mobile, test sidebar toggle
    if (window.innerWidth < 1024) {
      const menuButton = canvas.getByLabelText('Toggle mobile menu')
      await userEvent.click(menuButton)

      // Wait a moment for animation
      await new Promise(resolve => setTimeout(resolve, 300))

      // Click overlay to close
      const overlay = canvas.getByRole('button', { hidden: true })
      if (overlay) {
        await userEvent.click(overlay)
      }
    }
  },
}

// Different Content Types
export const ReportingDashboard: Story = {
  args: {
    title: 'Commission Reporting',
    subtitle: 'Track your commission payments and performance metrics',
    user: sampleUser,
    showBreadcrumbs: true,
    breadcrumbs: [
      { label: 'Dashboard', href: '/broker/dashboard' },
      { label: 'Reporting', href: '/broker/reporting' },
      { label: 'Commission Reports' },
    ],
    actions: <Button variant="primary">Download Report</Button>,
    children: (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatBlock
            value={28975.25}
            label="This Quarter"
            format="currency"
            variant="success"
            trend={{
              value: 12.5,
              direction: 'up',
              period: 'last quarter',
            }}
          />
          <StatBlock
            value={10000}
            label="Pending"
            format="currency"
            variant="warning"
          />
          <StatBlock
            value={8.2}
            label="Average Rate"
            format="number"
            variant="info"
          />
        </div>

        <Card>
          <Card.Header>
            <h3 className="font-semibold">Recent Payments</h3>
          </Card.Header>
          <Card.Content>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Date</th>
                    <th className="text-left py-2">Group</th>
                    <th className="text-right py-2">Amount</th>
                    <th className="text-left py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2">Jan 15, 2024</td>
                    <td className="py-2">TechCorp Inc.</td>
                    <td className="py-2 text-right">$4,016.25</td>
                    <td className="py-2">
                      <span className="inline-flex px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                        Paid
                      </span>
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">Jan 15, 2024</td>
                    <td className="py-2">Manufacturing Solutions</td>
                    <td className="py-2 text-right">$5,616.00</td>
                    <td className="py-2">
                      <span className="inline-flex px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                        Paid
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2">Jan 15, 2024</td>
                    <td className="py-2">Local Restaurant Group</td>
                    <td className="py-2 text-right">$1,380.00</td>
                    <td className="py-2">
                      <span className="inline-flex px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                        Pending
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card.Content>
        </Card>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Reporting dashboard with financial data and tables',
      },
    },
  },
}

export const MemberManagement: Story = {
  args: {
    title: 'Member Management',
    subtitle: 'Search and manage member information across all your groups',
    user: sampleUser,
    showBreadcrumbs: true,
    breadcrumbs: [
      { label: 'Dashboard', href: '/broker/dashboard' },
      { label: 'Member Services', href: '/broker/member-services' },
      { label: 'Member Search' },
    ],
    children: (
      <div className="space-y-6">
        <Card>
          <Card.Header>
            <h3 className="font-semibold">Search Members</h3>
          </Card.Header>
          <Card.Content>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Subscriber ID
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="ABC123456"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Smith"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Group Number
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="TC-2024-001"
                />
              </div>
            </div>
          </Card.Content>
          <Card.Footer>
            <div className="flex gap-2">
              <Button variant="outline">Clear</Button>
              <Button variant="primary">Search Members</Button>
            </div>
          </Card.Footer>
        </Card>

        <Card>
          <Card.Header>
            <h3 className="font-semibold">Recent Searches</h3>
          </Card.Header>
          <Card.Content>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <div>
                  <p className="text-sm font-medium">Robert Wilson</p>
                  <p className="text-xs text-gray-500">
                    TC001001 • TechCorp Inc.
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  View
                </Button>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <div>
                  <p className="text-sm font-medium">Lisa Anderson</p>
                  <p className="text-xs text-gray-500">
                    MS002001 • Manufacturing Solutions
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  View
                </Button>
              </div>
            </div>
          </Card.Content>
        </Card>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Member management interface with search functionality',
      },
    },
  },
}

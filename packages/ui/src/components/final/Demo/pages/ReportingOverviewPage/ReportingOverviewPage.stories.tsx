import type { Meta, StoryObj } from '@storybook/react'
import { userEvent, within, expect } from 'storybook/test'
import { ReportingOverviewPage } from './ReportingOverviewPage'
import { getStoryMeta } from '../../utils/getStoryMeta'
import { mockBrokers } from '../../utils/mockData'

const meta = {
  title: '📄 Pages/📊 ReportingOverviewPage',
  component: ReportingOverviewPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Reporting overview page with commission data, report categories, and quick access tools',
      },
    },
  },
} satisfies Meta<typeof ReportingOverviewPage>

export default meta
type Story = StoryObj<typeof meta>

// Sample user data
const sampleUser = {
  name: mockBrokers[0].name,
  email: mockBrokers[0].email,
  role: 'Licensed Broker',
  agency: mockBrokers[0].agencyName,
}

const analystUser = {
  name: 'Sarah Chen',
  email: 'sarah.chen@analytics.com',
  role: 'Business Intelligence Analyst',
  agency: 'Analytics Pro Insurance',
}

const managerUser = {
  name: 'Michael Rodriguez',
  email: 'mrodriguez@management.com',
  role: 'Regional Sales Manager',
  agency: 'Management Solutions Group',
}

// Basic Page States
export const Default: Story = {
  args: {
    user: sampleUser,
    showQuickAccess: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Default reporting overview page with quick access sidebar and all report categories',
      },
    },
  },
}

export const WithoutQuickAccess: Story = {
  args: {
    user: sampleUser,
    showQuickAccess: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Reporting overview without quick access sidebar for focused report browsing',
      },
    },
  },
}

export const WithNotifications: Story = {
  args: {
    user: sampleUser,
    notificationCount: 12,
    showQuickAccess: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Reporting page with notifications indicating new reports or scheduled reports ready',
      },
    },
  },
}

// Featured Categories
export const CommissionFocused: Story = {
  args: {
    user: sampleUser,
    featuredCategories: ['commission'],
    showQuickAccess: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Reporting overview focused on commission-related reports and analytics',
      },
    },
  },
}

export const MemberAnalytics: Story = {
  args: {
    user: analystUser,
    featuredCategories: ['member', 'analytics'],
    showQuickAccess: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Member analytics focused view for business intelligence analysts',
      },
    },
  },
}

export const GroupManagement: Story = {
  args: {
    user: managerUser,
    featuredCategories: ['group', 'analytics'],
    notificationCount: 8,
    showQuickAccess: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Group management reporting view for regional managers and supervisors',
      },
    },
  },
}

// User Role Variations
export const BusinessAnalystView: Story = {
  args: {
    user: analystUser,
    notificationCount: 15,
    showQuickAccess: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Business intelligence analyst view with focus on data analysis and insights',
      },
    },
  },
}

export const RegionalManagerView: Story = {
  args: {
    user: managerUser,
    notificationCount: 6,
    featuredCategories: ['group', 'commission', 'analytics'],
    showQuickAccess: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Regional manager view with comprehensive oversight reporting capabilities',
      },
    },
  },
}

export const ComplianceOfficerView: Story = {
  args: {
    user: {
      name: 'Jennifer Walsh',
      email: 'jwalsh@compliance.com',
      role: 'Compliance Officer',
      agency: 'Compliance Solutions Inc.',
    },
    notificationCount: 3,
    featuredCategories: ['group', 'member'],
    showQuickAccess: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Compliance officer view with focus on regulatory reporting and member data',
      },
    },
  },
}

// State Examples
export const Loading: Story = {
  args: {
    user: sampleUser,
    loading: true,
    showQuickAccess: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Loading state while report categories and data are being fetched',
      },
    },
  },
}

export const Error: Story = {
  args: {
    user: sampleUser,
    error:
      'Unable to load reporting data. The business intelligence service is temporarily unavailable.',
    showQuickAccess: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Error state with helpful message and guidance for users',
      },
    },
  },
}

// Interactive Examples
export const InteractiveFiltering: Story = {
  args: {
    user: sampleUser,
    showQuickAccess: true,
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement)

    // Test search functionality
    const searchInput = canvas.getByPlaceholderText('Search reports...')
    await userEvent.click(searchInput)
    await userEvent.type(searchInput, 'commission')

    // Test category filtering
    const commissionButton = canvas.getByText('Commission')
    await userEvent.click(commissionButton)

    // Wait and reset
    await new Promise(resolve => setTimeout(resolve, 500))

    // Test all categories
    const allButton = canvas.getByText('All Categories')
    await userEvent.click(allButton)

    // Clear search
    await userEvent.clear(searchInput)
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive demonstration of search and filtering capabilities',
      },
    },
  },
}

// Business Scenarios
export const MonthEndReporting: Story = {
  args: {
    user: sampleUser,
    notificationCount: 18,
    showQuickAccess: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Month-end reporting scenario with high activity and multiple scheduled reports',
      },
    },
  },
}

export const QuarterlyReview: Story = {
  args: {
    user: managerUser,
    notificationCount: 25,
    featuredCategories: ['commission', 'group', 'analytics'],
    showQuickAccess: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Quarterly business review with comprehensive reporting needs',
      },
    },
  },
}

export const AnnualAudit: Story = {
  args: {
    user: {
      name: 'Robert Kim',
      email: 'rkim@audit.com',
      role: 'Internal Auditor',
      agency: 'Audit Services LLC',
    },
    notificationCount: 7,
    featuredCategories: ['commission', 'member', 'group'],
    showQuickAccess: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Annual audit preparation with comprehensive data access requirements',
      },
    },
  },
}

// Workflow Examples
export const NewUserOnboarding: Story = {
  args: {
    user: {
      name: 'Lisa Park',
      email: 'lpark@newuser.com',
      role: 'Licensed Broker (New)',
      agency: 'New User Insurance',
    },
    notificationCount: 2,
    showQuickAccess: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'New user experience with guided reporting introduction',
      },
    },
  },
}

export const PowerUserWorkflow: Story = {
  args: {
    user: {
      name: 'David Chen',
      email: 'dchen@poweruser.com',
      role: 'Senior Business Analyst',
      agency: 'Power User Analytics',
    },
    notificationCount: 22,
    featuredCategories: ['analytics', 'commission', 'member', 'group'],
    showQuickAccess: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Power user workflow with extensive reporting needs and customization',
      },
    },
  },
}

// Mobile Responsive
export const MobileView: Story = {
  args: {
    user: sampleUser,
    showQuickAccess: true,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    docs: {
      description: {
        story: 'Mobile-optimized reporting overview with responsive layout',
      },
    },
  },
}

export const TabletView: Story = {
  args: {
    user: sampleUser,
    showQuickAccess: true,
    notificationCount: 5,
  },
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
    docs: {
      description: {
        story: 'Tablet view with optimized layout for medium-sized screens',
      },
    },
  },
}

// Specialized Views
export const ExecutiveDashboard: Story = {
  args: {
    user: {
      name: 'Patricia Williams',
      email: 'pwilliams@executive.com',
      role: 'Vice President of Sales',
      agency: 'Executive Insurance Group',
    },
    notificationCount: 4,
    featuredCategories: ['analytics', 'commission'],
    showQuickAccess: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Executive-level reporting with focus on high-level analytics and performance',
      },
    },
  },
}

export const OperationsView: Story = {
  args: {
    user: {
      name: 'James Thompson',
      email: 'jthompson@operations.com',
      role: 'Operations Manager',
      agency: 'Operations Pro Insurance',
    },
    notificationCount: 14,
    featuredCategories: ['member', 'group'],
    showQuickAccess: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Operations manager view with focus on member and group management reports',
      },
    },
  },
}

export const MarketingAnalytics: Story = {
  args: {
    user: {
      name: 'Maria Garcia',
      email: 'mgarcia@marketing.com',
      role: 'Marketing Analytics Manager',
      agency: 'Marketing Insights Inc.',
    },
    notificationCount: 9,
    featuredCategories: ['analytics', 'member'],
    showQuickAccess: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Marketing analytics view with focus on member insights and trend analysis',
      },
    },
  },
}

// Time-based Scenarios
export const MondayMorningReview: Story = {
  args: {
    user: sampleUser,
    notificationCount: 11,
    showQuickAccess: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Monday morning weekly review with fresh reports and weekend processing results',
      },
    },
  },
}

export const YearEndProcessing: Story = {
  args: {
    user: analystUser,
    notificationCount: 28,
    featuredCategories: ['commission', 'analytics'],
    showQuickAccess: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Year-end processing period with high volume of reports and analytics',
      },
    },
  },
}

// Custom Scenarios
export const ScheduledReportsFocused: Story = {
  args: {
    user: {
      name: 'Kevin Davis',
      email: 'kdavis@scheduler.com',
      role: 'Report Administrator',
      agency: 'Scheduler Pro Services',
    },
    notificationCount: 16,
    showQuickAccess: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Report administrator view with focus on scheduled and automated reporting',
      },
    },
  },
}

// Print/Export Ready
export const PrintableView: Story = {
  args: {
    user: sampleUser,
    showQuickAccess: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Print-friendly view without sidebar for clean report catalog printing',
      },
    },
  },
}

// Accessibility Test
export const AccessibilityTest: Story = {
  args: {
    user: sampleUser,
    showQuickAccess: true,
    notificationCount: 7,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Test keyboard navigation
    await userEvent.tab()
    await userEvent.tab()
    await userEvent.tab()

    // Test search input accessibility
    const searchInput = canvas.getByRole('searchbox')
    expect(searchInput).toBeInTheDocument()
    await userEvent.click(searchInput)

    // Test button accessibility
    const buttons = canvas.getAllByRole('button')
    expect(buttons.length).toBeGreaterThan(0)

    // Test table accessibility
    const table = canvas.getByRole('table')
    expect(table).toBeInTheDocument()

    // Test heading structure
    const headings = canvas.getAllByRole('heading')
    expect(headings.length).toBeGreaterThan(0)

    // Test link accessibility
    const links = canvas.getAllByRole('link')
    expect(links.length).toBeGreaterThan(0)
  },
  parameters: {
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true,
          },
          {
            id: 'heading-order',
            enabled: true,
          },
          {
            id: 'keyboard-navigation',
            enabled: true,
          },
          {
            id: 'table-headers',
            enabled: true,
          },
          {
            id: 'form-labels',
            enabled: true,
          },
        ],
      },
    },
    docs: {
      description: {
        story:
          'Comprehensive accessibility testing for WCAG compliance and assistive technology support',
      },
    },
  },
}

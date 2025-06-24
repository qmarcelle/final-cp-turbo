import type { Meta, StoryObj } from '@storybook/react'
import { SiteHeader } from './SiteHeader'

const meta = {
  title: '🦠 Organisms/🎯 SiteHeader',
  component: SiteHeader,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Main site header with navigation, search, support, and user profile. Features responsive design, dropdown menus, and mobile navigation.',
      },
    },
  },
} satisfies Meta<typeof SiteHeader>

export default meta
type Story = StoryObj<typeof meta>

// Sample user data
const sampleUser = {
  name: 'Kassim Rasoulian',
}

export const Default: Story = {
  args: {
    user: sampleUser,
  },
}

export const WithoutUser: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Header without user profile section',
      },
    },
  },
}

// Different Navigation States
export const SalesQuotingActive: Story = {
  args: {
    user: sampleUser,
    activePath: '/sales-quoting',
  },
}

export const MemberSupportActive: Story = {
  args: {
    user: sampleUser,
    activePath: '/member-support',
  },
}

export const ReportingActive: Story = {
  args: {
    user: sampleUser,
    activePath: '/reporting',
  },
}

export const MaterialsFormsActive: Story = {
  args: {
    user: sampleUser,
    activePath: '/materials-forms',
  },
}

export const LearningCenterActive: Story = {
  args: {
    user: sampleUser,
    activePath: '/learning-center',
  },
}

// Mobile States
export const MobileMenuOpen: Story = {
  args: {
    user: sampleUser,
    showMobileMenu: true,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: 'Mobile view with navigation menu open',
      },
    },
  },
}

export const MobileMenuClosed: Story = {
  args: {
    user: sampleUser,
    showMobileMenu: false,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: 'Mobile view with navigation menu closed',
      },
    },
  },
}

// Custom Navigation
export const CustomNavigation: Story = {
  args: {
    user: sampleUser,
    navigationItems: [
      {
        id: 1,
        title: 'Dashboard',
        url: '/dashboard',
        childPages: [
          {
            id: 11,
            title: 'Overview',
            description: 'Dashboard overview',
            url: '/dashboard/overview',
          },
          {
            id: 12,
            title: 'Analytics',
            description: 'Detailed analytics',
            url: '/dashboard/analytics',
          },
        ],
      },
      {
        id: 2,
        title: 'Reports',
        url: '/reports',
        childPages: [
          {
            id: 21,
            title: 'Sales Reports',
            description: 'Sales performance reports',
            url: '/reports/sales',
          },
          {
            id: 22,
            title: 'Member Reports',
            description: 'Member activity reports',
            url: '/reports/members',
          },
        ],
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Header with custom navigation items',
      },
    },
  },
}

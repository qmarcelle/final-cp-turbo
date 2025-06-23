import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within, expect } from 'storybook/test';
import { SiteHeader } from './SiteHeader';
import { getStoryMeta } from '../../utils/getStoryMeta';
import { mockBrokers } from '../../utils/mockData';

// Get the meta data from the utility function
const metaData = getStoryMeta({
  component: SiteHeader,
  category: 'organisms',
  name: 'SiteHeader',
  description: 'Main site header with navigation, user menu, and broker portal branding',
  parameters: {
    layout: 'fullscreen',
  },
});

// Create the meta object that satisfies Storybook's requirements
const meta = {
  ...metaData,
} satisfies Meta<typeof SiteHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample user data
const sampleUser = {
  name: mockBrokers[0].name,
  email: mockBrokers[0].email,
  role: 'Licensed Broker',
  agency: mockBrokers[0].agencyName,
};

const sampleUserWithAvatar = {
  ...sampleUser,
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
};

// Basic Header States
export const Default: Story = {
  args: {
    user: sampleUser,
  },
};

export const WithAvatar: Story = {
  args: {
    user: sampleUserWithAvatar,
  },
};

export const WithoutUser: Story = {
  args: {
    // No user prop - shows header without user menu
  },
};

export const WithNotifications: Story = {
  args: {
    user: sampleUser,
    showNotifications: true,
    notificationCount: 3,
  },
};

export const ManyNotifications: Story = {
  args: {
    user: sampleUser,
    showNotifications: true,
    notificationCount: 127,
  },
};

export const NoNotifications: Story = {
  args: {
    user: sampleUser,
    showNotifications: false,
  },
};

// Navigation States
export const WithActiveNavigation: Story = {
  args: {
    user: sampleUser,
    activePath: '/broker/sales-quoting',
  },
  parameters: {
    docs: {
      description: {
        story: 'Header with active navigation item highlighted',
      },
    },
  },
};

export const DifferentActivePath: Story = {
  args: {
    user: sampleUser,
    activePath: '/broker/reporting',
  },
};

// Mobile States
export const MobileMenuClosed: Story = {
  args: {
    user: sampleUser,
    showMobileMenu: false,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
  },
};

export const MobileMenuOpen: Story = {
  args: {
    user: sampleUser,
    showMobileMenu: true,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
  },
};

// Layout Variants
export const Compact: Story = {
  args: {
    user: sampleUser,
    compact: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Compact header layout with reduced padding',
      },
    },
  },
};

// Interactive Examples
export const UserMenuInteraction: Story = {
  args: {
    user: sampleUser,
    notificationCount: 5,
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    
    // Find and click the user menu button
    const userMenuButton = canvas.getByLabelText('User menu');
    await userEvent.click(userMenuButton);
    
    // Verify user menu is open
    expect(canvas.getByText('Profile Settings')).toBeInTheDocument();
    expect(canvas.getByText('Sign Out')).toBeInTheDocument();
  },
};

export const NotificationInteraction: Story = {
  args: {
    user: sampleUser,
    showNotifications: true,
    notificationCount: 12,
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    
    // Find and click the notifications button
    const notificationButton = canvas.getByLabelText('Notifications');
    await userEvent.click(notificationButton);
    
    // Verify notification badge is visible
    const badge = canvas.getByText('12');
    expect(badge).toBeInTheDocument();
  },
};

export const MobileMenuInteraction: Story = {
  args: {
    user: sampleUser,
    showMobileMenu: false,
    onMobileMenuToggle: () => {
      // eslint-disable-next-line no-alert
      window.alert('Mobile menu toggled!');
    },
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    
    // Find and click the mobile menu toggle
    const menuButton = canvas.getByLabelText('Toggle mobile menu');
    await userEvent.click(menuButton);
  },
};

// Different User Roles
export const AdminUser: Story = {
  args: {
    user: {
      name: 'Sarah Anderson',
      email: 'sarah.anderson@bcbst.com',
      role: 'Portal Administrator',
      agency: 'BlueCross BlueShield of Tennessee',
    },
    notificationCount: 8,
  },
  parameters: {
    docs: {
      description: {
        story: 'Header displayed for admin users with different role',
      },
    },
  },
};

export const AgencyManager: Story = {
  args: {
    user: {
      name: 'Michael Davis',
      email: 'mdavis@insurance.com',
      role: 'Agency Manager',
      agency: 'Davis Insurance Solutions',
    },
  },
};

// Content States
export const LongAgencyName: Story = {
  args: {
    user: {
      name: 'Jennifer Wilson-Thompson',
      email: 'jennifer.wilson@verylongagencynamehere.com',
      role: 'Senior Licensed Insurance Broker',
      agency: 'Wilson-Thompson Comprehensive Insurance Solutions LLC',
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Header handling long user names and agency names with proper truncation',
      },
    },
  },
};

// Loading State
export const LoadingUser: Story = {
  render: () => (
    <SiteHeader
      user={{
        name: 'Loading...',
        email: '',
        role: '',
      }}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Header in loading state while user data is being fetched',
      },
    },
  },
};

// Custom Navigation
export const CustomNavigation: Story = {
  args: {
    user: sampleUser,
    navigationItems: [
      {
        id: 1,
        title: 'Dashboard',
        description: 'Main dashboard',
        category: '',
        url: '/dashboard',
        showOnMenu: true,
      },
      {
        id: 2,
        title: 'Reports',
        description: 'Reporting tools',
        category: '',
        url: '/reports',
        showOnMenu: true,
      },
      {
        id: 3,
        title: 'Settings',
        description: 'System settings',
        category: '',
        url: '/settings',
        showOnMenu: true,
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Header with custom navigation items instead of default broker portal navigation',
      },
    },
  },
};

// Real-world Usage Examples
export const BrokerDashboard: Story = {
  args: {
    user: sampleUser,
    activePath: '/broker/dashboard',
    notificationCount: 2,
  },
  parameters: {
    docs: {
      description: {
        story: 'Header as it would appear on the main broker dashboard',
      },
    },
  },
};

export const CommissionReporting: Story = {
  args: {
    user: sampleUser,
    activePath: '/broker/reporting/commission-reports',
    notificationCount: 0,
  },
  parameters: {
    docs: {
      description: {
        story: 'Header on commission reporting pages with reporting navigation active',
      },
    },
  },
};

export const MemberSearch: Story = {
  args: {
    user: sampleUser,
    activePath: '/broker/member-services/member-search',
  },
  parameters: {
    docs: {
      description: {
        story: 'Header on member search pages with member services navigation active',
      },
    },
  },
};

// Page Layout Context
export const WithPageContent: Story = {
  render: () => (
    <div className="min-h-screen bg-gray-50">
      <SiteHeader
        user={sampleUser}
        activePath="/broker/dashboard"
        notificationCount={3}
      />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg border p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Dashboard</h1>
          <p className="text-gray-600">
            This demonstrates how the SiteHeader integrates with page content, 
            showing proper spacing and layout behavior.
          </p>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Quick Stats</h3>
              <p className="text-sm text-gray-600">Sample dashboard content</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Recent Activity</h3>
              <p className="text-sm text-gray-600">Recent broker activities</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Quick Actions</h3>
              <p className="text-sm text-gray-600">Common broker tasks</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Complete page layout showing header integration with content',
      },
    },
  },
};

// Accessibility Test
export const AccessibilityTest: Story = {
  args: {
    user: sampleUser,
    notificationCount: 5,
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    
    // Test header structure
    const header = canvas.getByRole('banner');
    expect(header).toBeInTheDocument();
    
    // Test navigation
    const nav = canvas.getByRole('navigation');
    expect(nav).toBeInTheDocument();
    
    // Test user menu button accessibility
    const userMenuButton = canvas.getByLabelText('User menu');
    expect(userMenuButton).toBeInTheDocument();
    expect(userMenuButton).toHaveAttribute('aria-label');
    
    // Test notification button accessibility
    const notificationButton = canvas.getByLabelText('Notifications');
    expect(notificationButton).toBeInTheDocument();
    expect(notificationButton).toHaveAttribute('aria-label');
    
    // Test keyboard navigation
    await userEvent.tab();
    await userEvent.tab();
    
    // Test user menu interaction
    await userEvent.click(userMenuButton);
    const signOutButton = canvas.getByText('Sign Out');
    expect(signOutButton).toBeInTheDocument();
  },
  parameters: {
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true
          },
          {
            id: 'keyboard-navigation',
            enabled: true
          },
          {
            id: 'aria-labels',
            enabled: true
          }
        ]
      }
    }
  }
};
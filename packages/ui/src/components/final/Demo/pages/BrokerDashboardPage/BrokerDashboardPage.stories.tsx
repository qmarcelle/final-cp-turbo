import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within, expect } from 'storybook/test';
import { BrokerDashboardPage } from './BrokerDashboardPage';
import { getStoryMeta } from '../../utils/getStoryMeta';
import { mockBrokers } from '../../utils/mockData';

// Get the meta data from the utility function
const metaData = getStoryMeta({
  component: BrokerDashboardPage,
  category: 'pages',
  name: 'BrokerDashboardPage',
  description: 'Main broker dashboard with commission data, quick actions, and business overview',
  parameters: {
    layout: 'fullscreen',
  },
});

// Create the meta object that satisfies Storybook's requirements
const meta = {
  ...metaData,
} satisfies Meta<typeof BrokerDashboardPage>;

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

// Basic Dashboard States
export const Default: Story = {
  args: {
    user: sampleUser,
  },
  parameters: {
    docs: {
      description: {
        story: 'Default broker dashboard with all standard features and data',
      },
    },
  },
};

export const WithNotifications: Story = {
  args: {
    user: sampleUser,
    notificationCount: 5,
  },
  parameters: {
    docs: {
      description: {
        story: 'Dashboard with unread notifications indicator',
      },
    },
  },
};

export const WithAvatar: Story = {
  args: {
    user: sampleUserWithAvatar,
    notificationCount: 2,
  },
  parameters: {
    docs: {
      description: {
        story: 'Dashboard with user avatar in header',
      },
    },
  },
};

export const WithoutQuickActions: Story = {
  args: {
    user: sampleUser,
    showQuickActions: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Dashboard without the quick actions sidebar for a cleaner layout',
      },
    },
  },
};

export const WithoutWelcome: Story = {
  args: {
    user: sampleUser,
    showWelcome: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Dashboard without welcome message and alerts for focused view',
      },
    },
  },
};

// Custom Welcome Messages
export const CustomWelcome: Story = {
  args: {
    user: sampleUser,
    welcomeMessage: 'Welcome back! You have 3 pending renewals that need attention.',
    notificationCount: 3,
  },
  parameters: {
    docs: {
      description: {
        story: 'Dashboard with custom welcome message for specific scenarios',
      },
    },
  },
};

export const MorningGreeting: Story = {
  args: {
    user: sampleUser,
    welcomeMessage: 'Good morning, John! Start your day with these important updates.',
  },
  parameters: {
    docs: {
      description: {
        story: 'Dashboard with time-specific greeting message',
      },
    },
  },
};

// Different User Types
export const AgencyManager: Story = {
  args: {
    user: {
      name: 'Sarah Johnson',
      email: 'sarah.johnson@benefits.com',
      role: 'Agency Manager',
      agency: 'Johnson Benefits Group',
    },
    notificationCount: 8,
  },
  parameters: {
    docs: {
      description: {
        story: 'Dashboard for agency manager with different role and higher notification count',
      },
    },
  },
};

export const NewBroker: Story = {
  args: {
    user: {
      name: 'Michael Davis',
      email: 'mdavis@newagency.com',
      role: 'Licensed Broker (New)',
      agency: 'Davis Insurance Solutions',
    },
    welcomeMessage: 'Welcome to the Broker Portal, Michael! Let\'s get you started with your first quote.',
    showQuickActions: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Dashboard optimized for new broker onboarding experience',
      },
    },
  },
};

export const SeniorBroker: Story = {
  args: {
    user: {
      name: 'Jennifer Wilson',
      email: 'jennifer.wilson@premiuminsurance.com',
      role: 'Senior Licensed Broker',
      agency: 'Premium Insurance Group',
    },
    notificationCount: 12,
    welcomeMessage: 'Good afternoon, Jennifer. Your portfolio is performing exceptionally well this quarter.',
  },
  parameters: {
    docs: {
      description: {
        story: 'Dashboard for experienced broker with high activity levels',
      },
    },
  },
};

// State Examples
export const Loading: Story = {
  args: {
    user: sampleUser,
    loading: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Dashboard in loading state while data is being fetched',
      },
    },
  },
};

export const Error: Story = {
  args: {
    user: sampleUser,
    error: 'Unable to load dashboard data. Please check your connection and try again.',
  },
  parameters: {
    docs: {
      description: {
        story: 'Dashboard showing error state with retry option',
      },
    },
  },
};

// Interactive Examples
export const InteractiveDashboard: Story = {
  args: {
    user: sampleUser,
    notificationCount: 3,
    showQuickActions: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test notification interaction
    const notificationButton = canvas.getByLabelText('Notifications');
    await userEvent.hover(notificationButton);
    
    // Test user menu interaction
    const userMenuButton = canvas.getByLabelText('User menu');
    await userEvent.click(userMenuButton);
    
    // Wait for menu to appear
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Click away to close menu
    await userEvent.click(canvas.getByText('Broker Dashboard'));
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive dashboard demonstrating user interactions and hover states',
      },
    },
  },
};

// Mobile Responsive
export const MobileView: Story = {
  args: {
    user: sampleUser,
    notificationCount: 2,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    docs: {
      description: {
        story: 'Dashboard optimized for mobile viewing with responsive layout',
      },
    },
  },
};

export const TabletView: Story = {
  args: {
    user: sampleUser,
    showQuickActions: true,
    notificationCount: 4,
  },
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
    docs: {
      description: {
        story: 'Dashboard on tablet devices with sidebar layout',
      },
    },
  },
};

// Time-based Scenarios
export const MondayMorning: Story = {
  args: {
    user: sampleUser,
    welcomeMessage: 'Good morning, John! Here\'s your weekly summary and priorities for the week ahead.',
    notificationCount: 7,
  },
  parameters: {
    docs: {
      description: {
        story: 'Monday morning dashboard with weekly priorities and higher notification count',
      },
    },
  },
};

export const EndOfMonth: Story = {
  args: {
    user: sampleUser,
    welcomeMessage: 'Month-end approaching! Review your pending applications and commission reports.',
    notificationCount: 15,
  },
  parameters: {
    docs: {
      description: {
        story: 'End-of-month dashboard with focus on deadlines and higher activity',
      },
    },
  },
};

export const QuarterEnd: Story = {
  args: {
    user: sampleUser,
    welcomeMessage: 'Q4 is ending strong! Your commission total is 15.8% above last quarter.',
    notificationCount: 3,
  },
  parameters: {
    docs: {
      description: {
        story: 'Quarter-end dashboard highlighting performance achievements',
      },
    },
  },
};

// Performance Scenarios
export const HighPerformer: Story = {
  args: {
    user: {
      ...sampleUser,
      name: 'Top Performer Sarah Chen',
    },
    welcomeMessage: '🎉 Congratulations! You\'ve exceeded your quarterly goals by 25%. Keep up the excellent work!',
    notificationCount: 1,
  },
  parameters: {
    docs: {
      description: {
        story: 'Dashboard for high-performing broker with achievement recognition',
      },
    },
  },
};

export const NewGoals: Story = {
  args: {
    user: sampleUser,
    welcomeMessage: 'New quarterly goals have been set. You\'re off to a great start with 3 new groups this month!',
    notificationCount: 5,
  },
  parameters: {
    docs: {
      description: {
        story: 'Dashboard with new goal setting and progress tracking focus',
      },
    },
  },
};

// Special Alerts Scenarios
export const SystemMaintenance: Story = {
  args: {
    user: sampleUser,
    welcomeMessage: 'System maintenance is scheduled for tonight 2-6 AM EST. Plan accordingly for any urgent tasks.',
    notificationCount: 2,
  },
  parameters: {
    docs: {
      description: {
        story: 'Dashboard with system maintenance notification and planning reminder',
      },
    },
  },
};

export const TrainingReminder: Story = {
  args: {
    user: sampleUser,
    welcomeMessage: 'Don\'t forget: Required compliance training due by Friday. Complete it in the Training Center.',
    notificationCount: 4,
  },
  parameters: {
    docs: {
      description: {
        story: 'Dashboard with training reminder and compliance notification',
      },
    },
  },
};

// Real-world Usage Examples
export const BusyMorning: Story = {
  args: {
    user: sampleUser,
    welcomeMessage: 'Busy morning ahead! You have 2 renewals due today and 3 new quote requests.',
    notificationCount: 9,
    showQuickActions: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'High-activity morning dashboard with multiple urgent items',
      },
    },
  },
};

export const QuietAfternoon: Story = {
  args: {
    user: sampleUser,
    welcomeMessage: 'All caught up! Perfect time to review your pipeline and plan for next week.',
    notificationCount: 0,
  },
  parameters: {
    docs: {
      description: {
        story: 'Low-activity afternoon dashboard when broker is caught up',
      },
    },
  },
};

export const CriticalAlerts: Story = {
  args: {
    user: sampleUser,
    welcomeMessage: 'URGENT: 2 groups have coverage gaps that need immediate attention.',
    notificationCount: 25,
  },
  parameters: {
    docs: {
      description: {
        story: 'Dashboard with critical alerts requiring immediate broker attention',
      },
    },
  },
};

// Accessibility Test
export const AccessibilityTest: Story = {
  args: {
    user: sampleUser,
    notificationCount: 3,
    showQuickActions: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test keyboard navigation through main elements
    await userEvent.tab(); // Focus first interactive element
    await userEvent.tab(); // Move to next element
    await userEvent.tab(); // Continue navigation
    
    // Test heading structure
    const mainHeading = canvas.getByRole('heading', { level: 1 });
    expect(mainHeading).toBeInTheDocument();
    
    // Test button accessibility
    const buttons = canvas.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
    
    // Test navigation accessibility
    const nav = canvas.getByRole('navigation');
    expect(nav).toBeInTheDocument();
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
            id: 'heading-order',
            enabled: true
          },
          {
            id: 'keyboard-navigation',
            enabled: true
          }
        ]
      }
    },
    docs: {
      description: {
        story: 'Dashboard tested for accessibility compliance and keyboard navigation',
      },
    },
  },
};

// Performance Test
export const PerformanceTest: Story = {
  args: {
    user: sampleUser,
    showQuickActions: true,
    notificationCount: 50,
  },
  parameters: {
    docs: {
      description: {
        story: 'Dashboard stress test with high notification count and all features enabled',
      },
    },
  },
};
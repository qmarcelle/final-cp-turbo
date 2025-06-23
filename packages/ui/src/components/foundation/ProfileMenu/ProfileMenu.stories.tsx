import type { Meta, StoryObj } from '@storybook/react'
import { ProfileMenu } from './ProfileMenu'
import { Bell, CreditCard, FileText, Settings, User } from 'lucide-react'

const meta: Meta<typeof ProfileMenu> = {
  title: 'Organisms/ProfileMenu',
  component: ProfileMenu,
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof ProfileMenu>

const mockUser = {
  id: '1',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  avatarUrl: 'https://github.com/shadcn.png',
}

const mockItems = [
  {
    id: 'account',
    label: 'Account',
    description: 'Manage your account settings',
    icon: <User className="h-4 w-4" />,
    children: [
      {
        id: 'profile',
        label: 'Profile',
        description: 'Update your profile information',
        icon: <User className="h-4 w-4" />,
        href: '/profile',
      },
      {
        id: 'billing',
        label: 'Billing',
        description: 'Manage billing and subscriptions',
        icon: <CreditCard className="h-4 w-4" />,
        href: '/billing',
      },
      {
        id: 'notifications',
        label: 'Notifications',
        description: 'Configure notification settings',
        icon: <Bell className="h-4 w-4" />,
        href: '/notifications',
      },
    ],
  },
  {
    id: 'settings',
    label: 'Settings',
    description: 'App preferences and settings',
    icon: <Settings className="h-4 w-4" />,
    href: '/settings',
  },
  {
    id: 'documentation',
    label: 'Documentation',
    description: 'Read our documentation',
    icon: <FileText className="h-4 w-4" />,
    href: '/docs',
  },
]

export const Default: Story = {
  args: {
    user: mockUser,
  },
}

export const WithCustomItems: Story = {
  args: {
    user: mockUser,
    items: mockItems,
  },
}

export const WithoutAvatar: Story = {
  args: {
    user: {
      ...mockUser,
      avatarUrl: undefined,
    },
  },
}

export const LongName: Story = {
  args: {
    user: {
      ...mockUser,
      firstName: 'Christopher Alexander',
      lastName: 'Montgomery-Fitzgerald III',
    },
  },
}

export const WithShortcuts: Story = {
  args: {
    user: mockUser,
    items: mockItems.map((item) => ({
      ...item,
      shortcut: item.id === 'settings' ? '⌘S' : undefined,
    })),
  },
}

export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  args: {
    user: mockUser,
    items: mockItems,
  },
} 
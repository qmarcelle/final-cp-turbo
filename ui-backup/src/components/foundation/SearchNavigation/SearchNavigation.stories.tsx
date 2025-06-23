import type { Meta, StoryObj } from '@storybook/react'
import { SearchNavigation } from './SearchNavigation'
import { FileText, Settings, User } from 'lucide-react'

const meta: Meta<typeof SearchNavigation> = {
  title: 'Organisms/SearchNavigation',
  component: SearchNavigation,
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof SearchNavigation>

const suggestions = [
  {
    id: '1',
    title: 'Profile Settings',
    description: 'Update your profile information',
    category: 'Settings',
    icon: <User className="h-4 w-4" />,
    url: '/settings/profile',
  },
  {
    id: '2',
    title: 'Account Settings',
    description: 'Manage your account preferences',
    category: 'Settings',
    icon: <Settings className="h-4 w-4" />,
    url: '/settings/account',
  },
  {
    id: '3',
    title: 'Documentation',
    description: 'Read our documentation',
    category: 'Help',
    icon: <FileText className="h-4 w-4" />,
    url: '/docs',
  },
]

const recentSearches = [
  'Profile settings',
  'How to update account',
  'Documentation',
  'Billing',
  'Support',
]

export const Default: Story = {
  args: {
    placeholder: 'Search...',
    suggestions,
    recentSearches,
  },
}

export const WithoutRecentSearches: Story = {
  args: {
    placeholder: 'Search...',
    suggestions,
  },
}

export const WithoutSuggestions: Story = {
  args: {
    placeholder: 'Search...',
    recentSearches,
  },
}

export const CustomPlaceholder: Story = {
  args: {
    placeholder: 'Search documentation...',
    suggestions,
    recentSearches,
  },
}

export const Loading: Story = {
  args: {
    placeholder: 'Search...',
    suggestions: [],
    recentSearches: [],
  },
  render: (args) => (
    <div className="w-[400px]">
      <SearchNavigation {...args} />
      <div className="mt-2 text-sm text-muted-foreground">
        Type to search...
      </div>
    </div>
  ),
} 
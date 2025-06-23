import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import { ProfileMenu } from './ProfileMenu'
import { Settings, User } from 'lucide-react'

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}))

describe('ProfileMenu', () => {
  const mockUser = {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    avatarUrl: 'https://github.com/shadcn.png',
  }

  const mockItems = [
    {
      id: 'profile',
      label: 'Profile',
      description: 'Update your profile',
      icon: <User className="h-4 w-4" />,
      href: '/profile',
    },
    {
      id: 'settings',
      label: 'Settings',
      description: 'App preferences',
      icon: <Settings className="h-4 w-4" />,
      href: '/settings',
    },
  ]

  it('renders user information correctly', () => {
    render(<ProfileMenu user={mockUser} />)
    
    const trigger = screen.getByRole('button')
    expect(trigger).toHaveTextContent('John Doe')
    
    // Open menu
    fireEvent.click(trigger)
    
    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument()
  })

  it('renders custom menu items', () => {
    render(<ProfileMenu user={mockUser} items={mockItems} />)
    
    const trigger = screen.getByRole('button')
    fireEvent.click(trigger)
    
    expect(screen.getByText('Profile')).toBeInTheDocument()
    expect(screen.getByText('Settings')).toBeInTheDocument()
    expect(screen.getByText('Update your profile')).toBeInTheDocument()
    expect(screen.getByText('App preferences')).toBeInTheDocument()
  })

  it('handles item click correctly', async () => {
    const onClick = vi.fn()
    const items = [
      {
        id: 'test',
        label: 'Test Item',
        onClick,
      },
    ]

    render(<ProfileMenu user={mockUser} items={items} />)
    
    const trigger = screen.getByRole('button')
    fireEvent.click(trigger)
    
    const item = screen.getByText('Test Item')
    fireEvent.click(item)
    
    expect(onClick).toHaveBeenCalled()
  })

  it('renders sub-menu items correctly', async () => {
    const items = [
      {
        id: 'account',
        label: 'Account',
        children: [
          {
            id: 'profile',
            label: 'Profile',
            href: '/profile',
          },
          {
            id: 'settings',
            label: 'Settings',
            href: '/settings',
          },
        ],
      },
    ]

    render(<ProfileMenu user={mockUser} items={items} />)
    
    const trigger = screen.getByRole('button')
    fireEvent.click(trigger)
    
    const accountItem = screen.getByText('Account')
    fireEvent.mouseEnter(accountItem)
    
    await waitFor(() => {
      expect(screen.getByText('Profile')).toBeInTheDocument()
      expect(screen.getByText('Settings')).toBeInTheDocument()
    })
  })

  it('renders fallback avatar when no avatar URL is provided', () => {
    const userWithoutAvatar = {
      ...mockUser,
      avatarUrl: undefined,
    }

    render(<ProfileMenu user={userWithoutAvatar} />)
    
    const fallback = screen.getByText('JD')
    expect(fallback).toBeInTheDocument()
  })

  it('handles keyboard navigation', async () => {
    render(<ProfileMenu user={mockUser} items={mockItems} />)
    
    const trigger = screen.getByRole('button')
    
    // Open menu with Enter key
    fireEvent.keyDown(trigger, { key: 'Enter' })
    await waitFor(() => {
      expect(screen.getByText('Profile')).toBeVisible()
    })
    
    // Navigate to first item
    fireEvent.keyDown(document.activeElement!, { key: 'ArrowDown' })
    expect(document.activeElement).toHaveTextContent('Profile')
    
    // Navigate to second item
    fireEvent.keyDown(document.activeElement!, { key: 'ArrowDown' })
    expect(document.activeElement).toHaveTextContent('Settings')
  })

  it('closes menu when clicking outside', async () => {
    render(<ProfileMenu user={mockUser} items={mockItems} />)
    
    const trigger = screen.getByRole('button')
    fireEvent.click(trigger)
    
    expect(screen.getByText('Profile')).toBeVisible()
    
    // Click outside
    fireEvent.click(document.body)
    
    await waitFor(() => {
      expect(screen.queryByText('Profile')).not.toBeVisible()
    })
  })

  it('renders shortcut text when provided', () => {
    const itemsWithShortcut = [
      {
        id: 'settings',
        label: 'Settings',
        shortcut: '⌘S',
      },
    ]

    render(<ProfileMenu user={mockUser} items={itemsWithShortcut} />)
    
    const trigger = screen.getByRole('button')
    fireEvent.click(trigger)
    
    expect(screen.getByText('⌘S')).toBeInTheDocument()
  })

  it('handles disabled items correctly', () => {
    const itemsWithDisabled = [
      {
        id: 'disabled',
        label: 'Disabled Item',
        disabled: true,
      },
    ]

    render(<ProfileMenu user={mockUser} items={itemsWithDisabled} />)
    
    const trigger = screen.getByRole('button')
    fireEvent.click(trigger)
    
    const disabledItem = screen.getByText('Disabled Item')
    expect(disabledItem.parentElement).toHaveAttribute('data-disabled')
  })
}) 
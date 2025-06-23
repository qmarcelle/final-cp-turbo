import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import { NavigationSubmenu } from './NavigationSubmenu'
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu'
import { FileText, Settings, User } from 'lucide-react'

const mockItem = {
  id: 'account',
  title: 'Account',
  description: 'Manage your account settings',
  icon: <User data-testid="user-icon" />,
  template: {
    firstCol: 'Quick Links',
    secondCol: 'Settings',
    thirdCol: 'Help',
    fourthCol: '',
  },
  shortLinks: [
    {
      title: 'Profile Settings',
      link: '/settings/profile',
      description: 'Update your profile information',
    },
    {
      title: 'Billing Settings',
      link: '/settings/billing',
      description: 'Manage your billing preferences',
    },
  ],
  childPages: [
    {
      id: '1',
      title: 'Account Settings',
      description: 'Manage your account preferences',
      category: 'Settings',
      url: '/settings/account',
      icon: <Settings data-testid="settings-icon" />,
    },
    {
      id: '2',
      title: 'Documentation',
      description: 'Read our documentation',
      category: 'Help',
      url: '/docs',
      icon: <FileText data-testid="docs-icon" />,
      external: true,
    },
  ],
}

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <NavigationMenuPrimitive.Root>
    <NavigationMenuPrimitive.List>
      {children}
    </NavigationMenuPrimitive.List>
  </NavigationMenuPrimitive.Root>
)

describe('NavigationSubmenu', () => {
  it('renders submenu trigger with correct title', () => {
    render(<NavigationSubmenu item={mockItem} />, { wrapper: Wrapper })
    expect(screen.getByText('Account')).toBeInTheDocument()
  })

  it('shows content when trigger is clicked', async () => {
    render(<NavigationSubmenu item={mockItem} />, { wrapper: Wrapper })
    
    const trigger = screen.getByText('Account')
    fireEvent.click(trigger)
    
    await waitFor(() => {
      expect(screen.getByText('Profile Settings')).toBeInTheDocument()
      expect(screen.getByText('Billing Settings')).toBeInTheDocument()
    })
  })

  it('renders quick tip when template has QT column', async () => {
    const itemWithQuickTip = {
      ...mockItem,
      template: {
        firstCol: 'QT',
        secondCol: 'Settings',
        thirdCol: 'Help',
        fourthCol: '',
      },
      quickTip: {
        title: 'Quick Tip',
        link: '/docs/quick-tip',
        firstParagraph: 'Learn how to customize your account settings.',
        secondParagraph: 'Follow our step-by-step guide.',
        icon: <FileText data-testid="quick-tip-icon" />,
      },
    }

    render(<NavigationSubmenu item={itemWithQuickTip} />, { wrapper: Wrapper })
    
    const trigger = screen.getByText('Account')
    fireEvent.click(trigger)
    
    await waitFor(() => {
      expect(screen.getByText('Quick Tip')).toBeInTheDocument()
      expect(screen.getByText('Learn how to customize your account settings.')).toBeInTheDocument()
    })
  })

  it('renders short links with descriptions', async () => {
    render(<NavigationSubmenu item={mockItem} />, { wrapper: Wrapper })
    
    const trigger = screen.getByText('Account')
    fireEvent.click(trigger)
    
    await waitFor(() => {
      expect(screen.getByText('Profile Settings')).toBeInTheDocument()
      expect(screen.getByText('Update your profile information')).toBeInTheDocument()
      expect(screen.getByText('Billing Settings')).toBeInTheDocument()
      expect(screen.getByText('Manage your billing preferences')).toBeInTheDocument()
    })
  })

  it('renders child pages grouped by category', async () => {
    render(<NavigationSubmenu item={mockItem} />, { wrapper: Wrapper })
    
    const trigger = screen.getByText('Account')
    fireEvent.click(trigger)
    
    await waitFor(() => {
      expect(screen.getByText('Settings')).toBeInTheDocument()
      expect(screen.getByText('Help')).toBeInTheDocument()
      expect(screen.getByText('Account Settings')).toBeInTheDocument()
      expect(screen.getByText('Documentation')).toBeInTheDocument()
    })
  })

  it('handles external links correctly', async () => {
    render(<NavigationSubmenu item={mockItem} />, { wrapper: Wrapper })
    
    const trigger = screen.getByText('Account')
    fireEvent.click(trigger)
    
    await waitFor(() => {
      const docLink = screen.getByText('Documentation').closest('a')
      expect(docLink).toHaveAttribute('target', '_blank')
    })
  })

  it('renders text-only pages without links', async () => {
    const itemWithTextPage = {
      ...mockItem,
      childPages: [
        ...mockItem.childPages!,
        {
          id: '3',
          title: 'Coming Soon',
          description: 'New features coming soon',
          category: 'Help',
          url: '',
          text: true,
        },
      ],
    }

    render(<NavigationSubmenu item={itemWithTextPage} />, { wrapper: Wrapper })
    
    const trigger = screen.getByText('Account')
    fireEvent.click(trigger)
    
    await waitFor(() => {
      const textElement = screen.getByText('Coming Soon')
      expect(textElement.tagName).toBe('DIV')
      expect(textElement).not.toHaveAttribute('href')
    })
  })

  it('calls onClose when link is clicked', async () => {
    const onClose = vi.fn()
    render(<NavigationSubmenu item={mockItem} />, { wrapper: Wrapper })
    
    const trigger = screen.getByText('Account')
    fireEvent.click(trigger)
    
    await waitFor(() => {
      const link = screen.getByText('Profile Settings')
      fireEvent.click(link)
      expect(onClose).toHaveBeenCalled()
    })
  })

  it('renders icons in child pages', async () => {
    render(<NavigationSubmenu item={mockItem} />, { wrapper: Wrapper })
    
    const trigger = screen.getByText('Account')
    fireEvent.click(trigger)
    
    await waitFor(() => {
      expect(screen.getByTestId('settings-icon')).toBeInTheDocument()
      expect(screen.getByTestId('docs-icon')).toBeInTheDocument()
    })
  })
}) 
import type { Meta as StorybookMeta, StoryObj as StorybookStory } from '@storybook/react'
import { within, userEvent, expect } from '@storybook/test';
import { NavigationSubmenu } from './NavigationSubmenu'
import { FileText, Settings, User } from 'lucide-react'
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu'

type Meta = StorybookMeta<typeof NavigationSubmenu>;
type Story = StorybookStory<typeof NavigationSubmenu>;

const meta: Meta = {
  title: 'Molecules/NavigationSubmenu',
  component: NavigationSubmenu,
  parameters: {
    layout: 'centered',
    a11y: {
      config: {
        rules: [
          { id: 'button-name', enabled: true },
          { id: 'color-contrast', enabled: true },
          { id: 'aria-allowed-attr', enabled: true },
          { id: 'nested-interactive', enabled: true },
          { id: 'aria-required-children', enabled: true }
        ]
      }
    }
  },
  decorators: [
    (Story) => (
      <NavigationMenuPrimitive.Root>
        <NavigationMenuPrimitive.List>
          <Story />
        </NavigationMenuPrimitive.List>
      </NavigationMenuPrimitive.Root>
    ),
  ],
}

export default meta

const mockItem = {
  id: 'account',
  title: 'Account',
  description: 'Manage your account settings',
  icon: <User className="h-4 w-4" aria-hidden="true" />,
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
      icon: <Settings className="h-4 w-4" aria-hidden="true" />,
    },
    {
      id: '2',
      title: 'Documentation',
      description: 'Read our documentation',
      category: 'Help',
      url: '/docs',
      icon: <FileText className="h-4 w-4" aria-hidden="true" />,
      external: true,
    },
  ],
}

/**
 * Interactive test demonstrating navigation behavior and keyboard accessibility
 */
export const InteractiveTest: Story = {
  args: {
    item: {
      ...mockItem,
      title: 'Interactive Menu',
    },
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    
    // Get the trigger button
    const trigger = canvas.getByRole('button', { name: /interactive menu/i });
    
    // Test initial state
    await expect(trigger).toBeInTheDocument();
    await expect(trigger).toBeEnabled();
    
    // Open menu
    await userEvent.click(trigger);
    
    // Get menu content
    const menu = document.querySelector('[role="menu"]') as HTMLElement;
    await expect(menu).toBeVisible();
    
    // Test quick links
    const profileLink = within(menu).getByRole('link', { name: /profile settings/i });
    await expect(profileLink).toBeVisible();
    await expect(profileLink).toHaveAttribute('href', '/settings/profile');
    
    // Test keyboard navigation
    await userEvent.tab();
    await expect(profileLink).toHaveFocus();
    
    await userEvent.tab();
    const billingLink = within(menu).getByRole('link', { name: /billing settings/i });
    await expect(billingLink).toHaveFocus();
    
    // Test escape key closes menu
    await userEvent.keyboard('{Escape}');
    await expect(menu).not.toBeVisible();
  }
};

/**
 * Accessibility test suite for navigation menu
 */
export const AccessibilityTest: Story = {
  args: {
    item: {
      ...mockItem,
      title: 'Accessible Menu',
      description: 'Test accessibility features',
    },
  },
  parameters: {
    a11y: {
      config: {
        rules: [
          { id: 'button-name', enabled: true },
          { id: 'color-contrast', enabled: true },
          { id: 'aria-allowed-attr', enabled: true },
          { id: 'nested-interactive', enabled: true },
          { id: 'aria-required-children', enabled: true },
          { id: 'focus-trap-menu', enabled: true }
        ]
      }
    }
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    
    // Test ARIA attributes
    const trigger = canvas.getByRole('button');
    await expect(trigger).toHaveAttribute('aria-haspopup', 'menu');
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    
    // Open menu
    await userEvent.click(trigger);
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    
    // Test menu structure
    const menu = document.querySelector('[role="menu"]') as HTMLElement;
    await expect(menu).toHaveAttribute('aria-labelledby');
    
    // Test links accessibility
    const links = within(menu).getAllByRole('link');
    for (const link of links) {
      await expect(link).toHaveAttribute('aria-describedby');
    }
    
    // Test external link indicators
    const externalLink = within(menu).getByRole('link', { name: /documentation/i });
    await expect(externalLink).toHaveAttribute('target', '_blank');
    await expect(externalLink).toHaveAttribute('rel', 'noopener noreferrer');
  }
};

export const Default: Story = {
  args: {
    item: mockItem,
  },
  parameters: {
    a11y: {
      config: {
        rules: [
          { id: 'button-name', enabled: true },
          { id: 'color-contrast', enabled: true }
        ]
      }
    }
  }
};

export const WithQuickTip: Story = {
  args: {
    item: {
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
        icon: <FileText className="h-4 w-4" aria-hidden="true" />,
      },
    },
  },
  parameters: {
    a11y: {
      config: {
        rules: [
          { id: 'button-name', enabled: true },
          { id: 'color-contrast', enabled: true }
        ]
      }
    }
  }
};

export const WithoutShortLinks: Story = {
  args: {
    item: {
      ...mockItem,
      shortLinks: undefined,
    },
  },
}

export const WithoutChildPages: Story = {
  args: {
    item: {
      ...mockItem,
      childPages: undefined,
    },
  },
}

export const WithTextPages: Story = {
  args: {
    item: {
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
    },
  },
}

export const WithExternalLinks: Story = {
  args: {
    item: {
      ...mockItem,
      childPages: mockItem.childPages!.map(page => ({
        ...page,
        external: true,
        openInNewWindow: true,
      })),
    },
  },
} 
import type { Meta, StoryObj } from '@storybook/react'
import { userEvent, within } from 'storybook/test'
import { Footer, type FooterProps } from './Footer'
import { getStoryMeta } from '../../utils/getStoryMeta'

const meta = {
  title: '🦠 Organisms/👣 Footer',
  component: Footer,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Site footer with links, copyright, and contact information for the broker portal',
      },
    },
  },
} satisfies Meta<typeof Footer>

export default meta
type Story = StoryObj<typeof meta>

// Basic Footer Variants
export const Default: Story = {
  args: {},
}

export const Compact: Story = {
  args: {
    compact: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Compact footer layout for pages with limited space',
      },
    },
  },
}

export const WithoutLogo: Story = {
  args: {
    showLogo: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Footer without the brand logo',
      },
    },
  },
}

export const WithSocialLinks: Story = {
  args: {
    showSocial: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Footer with social media links included',
      },
    },
  },
}

// Custom Content
export const WithCustomLinks: Story = {
  args: {
    customLinks: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Cookie Policy', href: '/cookies' },
      { label: 'Contact Us', href: '/contact' },
      { label: 'Help Center', href: 'https://help.bcbst.com' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Footer with custom link configuration',
      },
    },
  },
}

export const WithCustomCopyright: Story = {
  args: {
    customCopyright:
      '© 2024 Custom Healthcare Solutions. All rights reserved.',
    customAddress: '123 Custom Street, Custom City, ST 12345',
  },
  parameters: {
    docs: {
      description: {
        story: 'Footer with custom copyright text and address',
      },
    },
  },
}

// Additional Sections
export const WithAdditionalSections: Story = {
  args: {
    additionalSections: [
      {
        title: 'Important Notice',
        links: [
          {
            label: 'This portal is for licensed insurance brokers only.',
            href: '#',
          },
          {
            label: 'View Confidentiality Agreement',
            href: '/confidentiality',
          },
        ],
      },
      {
        title: 'Support Hours',
        links: [
          { label: 'Monday - Friday: 8:00 AM - 6:00 PM EST', href: '#' },
          { label: 'Saturday: 9:00 AM - 2:00 PM EST', href: '#' },
          { label: 'Sunday: Closed', href: '#' },
          { label: 'Emergency Support: 24/7', href: '/emergency-support' },
        ],
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Footer with additional custom sections for extra information',
      },
    },
  },
}

// Interactive Examples
export const InteractiveLinks: Story = {
  args: {
    showSocial: true,
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement)

    // Test footer link interaction
    const privacyLink = canvas.getByText('Privacy & Security')
    await userEvent.hover(privacyLink)

    // Test social link interaction (if present)
    const socialLinks = canvas.getAllByLabelText(/Facebook|Twitter|LinkedIn/i)
    if (socialLinks.length > 0) {
      await userEvent.hover(socialLinks[0])
    }
  },
}

// Different Layout Contexts
export const FullPageExample: Story = {
  render: () => (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 p-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-xl font-semibold">Broker Portal</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg border p-6">
            <h2 className="text-lg font-semibold mb-4">Page Content</h2>
            <p className="text-gray-600 mb-4">
              This demonstrates how the footer appears in a full page layout
              with proper spacing and positioning.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Section 1</h3>
                <p className="text-sm text-gray-600">Sample content area</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Section 2</h3>
                <p className="text-sm text-gray-600">More content here</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Section 3</h3>
                <p className="text-sm text-gray-600">Additional content</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer showSocial />
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Footer in complete page layout context with sticky positioning',
      },
    },
  },
}

export const CompactPageExample: Story = {
  render: () => (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 p-3">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-lg font-semibold">Quick Quote Tool</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 py-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg border p-6">
            <h2 className="text-lg font-semibold mb-4">Quote Information</h2>
            <div className="space-y-4">
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
            </div>
          </div>
        </div>
      </main>

      {/* Compact Footer */}
      <Footer compact />
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Compact footer in a focused tool or form page',
      },
    },
  },
}

// Mobile Responsive
export const MobileView: Story = {
  args: {
    showSocial: true,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    docs: {
      description: {
        story: 'Footer responsive behavior on mobile devices',
      },
    },
  },
}

export const TabletView: Story = {
  args: {
    showSocial: true,
  },
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
    docs: {
      description: {
        story: 'Footer responsive behavior on tablet devices',
      },
    },
  },
}

// Content Variations
export const MinimalFooter: Story = {
  args: {
    compact: true,
    showLogo: false,
    customLinks: [
      { label: 'Privacy', href: '/privacy' },
      { label: 'Terms', href: '/terms' },
    ],
    customCopyright: '© 2024 BCBST',
  },
  parameters: {
    docs: {
      description: {
        story: 'Minimal footer configuration for simple pages',
      },
    },
  },
}

export const RichFooter: Story = {
  args: {
    showSocial: true,
    additionalSections: [
      {
        title: 'Contact Information',
        links: [
          { label: 'Broker Support: (800) 555-0123', href: 'tel:8005550123' },
          {
            label: 'Technical Support: (800) 555-0456',
            href: 'tel:8005550456',
          },
          {
            label: 'Email: brokers@bcbst.com',
            href: 'mailto:brokers@bcbst.com',
          },
        ],
      },
      {
        title: 'Business Hours',
        links: [
          { label: 'Monday - Friday: 8:00 AM - 6:00 PM', href: '#' },
          { label: 'Saturday: 9:00 AM - 2:00 PM', href: '#' },
          { label: 'Emergency Support: 24/7', href: '/emergency-support' },
        ],
      },
      {
        title: 'Quick Access',
        links: [
          { label: 'Download Mobile App', href: '/broker/mobile-app' },
          { label: 'API Documentation', href: '/broker/api-access' },
          { label: 'System Status', href: '/broker/system-status' },
        ],
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          'Rich footer with comprehensive information and multiple sections',
      },
    },
  },
}

// Loading State
export const LoadingFooter: Story = {
  render: () => (
    <Footer
      customCopyright="Loading..."
      customLinks={[
        { label: 'Loading...', href: '#' },
        { label: 'Loading...', href: '#' },
        { label: 'Loading...', href: '#' },
      ]}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Footer in loading state while content is being fetched',
      },
    },
  },
}

// Dark Theme Example
export const DarkTheme: Story = {
  render: () => (
    <footer className="bg-gray-900 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-2">
            <div className="mb-4">
              <img
                src="/logos/bcbst-white-logo.svg"
                alt="BCBST Logo"
                className="h-8 w-auto"
              />
            </div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Broker Portal
            </h3>
            <p className="text-sm text-gray-300 mb-4 max-w-md">
              Your trusted partner for health insurance solutions. Access
              comprehensive broker tools, commission reporting, and member
              services all in one place.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wide">
              Quick Links
            </h4>
            <nav className="space-y-2">
              <a
                href="#"
                className="block text-sm text-gray-300 hover:text-white transition-colors"
              >
                Sales & Quoting
              </a>
              <a
                href="#"
                className="block text-sm text-gray-300 hover:text-white transition-colors"
              >
                Member Services
              </a>
              <a
                href="#"
                className="block text-sm text-gray-300 hover:text-white transition-colors"
              >
                Commission Reports
              </a>
            </nav>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wide">
              Support
            </h4>
            <nav className="space-y-2">
              <a
                href="#"
                className="block text-sm text-gray-300 hover:text-white transition-colors"
              >
                Help Center
              </a>
              <a
                href="#"
                className="block text-sm text-gray-300 hover:text-white transition-colors"
              >
                Contact Us
              </a>
              <a
                href="#"
                className="block text-sm text-gray-300 hover:text-white transition-colors"
              >
                System Status
              </a>
            </nav>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700">
          <div className="text-xs text-gray-400 text-center">
            © 2024 BlueCross BlueShield of Tennessee. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  ),
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'dark',
    },
    docs: {
      description: {
        story: 'Dark theme variation of the footer',
      },
    },
  },
}

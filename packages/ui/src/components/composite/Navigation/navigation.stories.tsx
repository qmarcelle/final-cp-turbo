import type { Meta, StoryObj } from '@storybook/react-vite'
import { Navigation, type NavigationItem } from './Navigation'
import { useArgs } from 'storybook/preview-api'

const meta: Meta<typeof Navigation> = {
  title: 'Organisms/Navigation (Experimental)',
  component: Navigation,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Experimental

This component is experimental and pending approval. It should not be used in production.

<hr />
`,
      },
    },
  },
}

export default meta

const navItems: NavigationItem[] = [
  { label: 'Home', href: '/home' },
  {
    label: 'Products',
    href: '/products',
    children: [
      { label: 'Laptops', href: '/products/laptops' },
      { label: 'Monitors', href: '/products/monitors' },
      { label: 'Keyboards', href: '/products/keyboards' },
    ],
  },
  {
    label: 'Services',
    href: '/services',
    children: [
      { label: 'Web Development', href: '/services/web' },
      { label: 'Mobile Development', href: '/services/mobile' },
    ],
  },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export const Default: StoryObj<typeof Navigation> = {
  render: function Render(args) {
    const [{ activeHref }, updateArgs] = useArgs()

    const handleNavigate = (href: string) => {
      updateArgs({ activeHref: href })
    }

    return (
      <div className="bg-blue-600 p-4">
        <Navigation
          {...args}
          activeHref={activeHref}
          onNavigate={handleNavigate}
        />
      </div>
    )
  },
  args: {
    items: navItems,
    activeHref: '/home',
  },
}

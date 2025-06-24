import type { Meta, StoryObj } from '@storybook/react-vite'
import { Navigation } from './Navigation'

const meta: Meta<typeof Navigation> = {
  title: '🧬 Molecules/📊 Navigation',
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

const navItems = [
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
    return (
      <Navigation {...args}>
        <div className="container mx-auto px-4 flex items-center justify-between h-16">
          <div className="flex items-center">
            <span className="text-xl font-bold">Brand</span>
          </div>
          <ul className="hidden md:flex space-x-8">
            {navItems.map(item => (
              <li key={item.href}>
                <a href={item.href} className="hover:text-gray-300">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Navigation>
    )
  },
  args: {},
}

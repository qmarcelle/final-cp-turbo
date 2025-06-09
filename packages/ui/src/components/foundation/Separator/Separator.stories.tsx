import type { Meta, StoryObj } from '@storybook/react'
import { Separator, Divider, SectionSeparator } from './Separator'

const meta = {
  title: 'Foundation/Separator',
  component: Separator,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A separator component for dividing content sections with proper accessibility support.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'The orientation of the separator'
    },
    decorative: {
      control: 'boolean',
      description: 'Whether the separator is decorative (for accessibility)'
    }
  }
} satisfies Meta<typeof Separator>

export default meta
type Story = StoryObj<typeof meta>

// Basic separator
export const Default: Story = {
  render: () => (
    <div className="space-y-4">
      <p>Content above separator</p>
      <Separator />
      <p>Content below separator</p>
    </div>
  )
}

// Vertical separator
export const Vertical: Story = {
  render: () => (
    <div className="flex h-20 items-center space-x-4">
      <div>Left content</div>
      <Separator orientation="vertical" />
      <div>Right content</div>
    </div>
  )
}

// Divider with text
export const WithText: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">Section 1</h3>
        <p>Some content in the first section.</p>
      </div>
      
      <Divider>OR</Divider>
      
      <div>
        <h3 className="text-lg font-semibold">Section 2</h3>
        <p>Some content in the second section.</p>
      </div>
    </div>
  )
}

// Divider positions
export const DividerPositions: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <p>Content before left-aligned divider</p>
        <Divider position="left">Left</Divider>
        <p>Content after left-aligned divider</p>
      </div>
      
      <div>
        <p>Content before center-aligned divider</p>
        <Divider position="center">Center</Divider>
        <p>Content after center-aligned divider</p>
      </div>
      
      <div>
        <p>Content before right-aligned divider</p>
        <Divider position="right">Right</Divider>
        <p>Content after right-aligned divider</p>
      </div>
    </div>
  )
}

// Section separators
export const SectionSeparators: Story = {
  render: () => (
    <div className="space-y-8">
      <SectionSeparator 
        title="User Settings" 
        subtitle="Manage your account preferences"
      />
      
      <div className="grid gap-4">
        <div className="rounded border p-4">
          <h4 className="font-medium">Profile Information</h4>
          <p className="text-sm text-muted-foreground">
            Update your personal details here.
          </p>
        </div>
        
        <div className="rounded border p-4">
          <h4 className="font-medium">Privacy Settings</h4>
          <p className="text-sm text-muted-foreground">
            Control who can see your information.
          </p>
        </div>
      </div>
      
      <SectionSeparator 
        title="Billing & Payments" 
        subtitle="Manage your subscription and payment methods"
      />
      
      <div className="grid gap-4">
        <div className="rounded border p-4">
          <h4 className="font-medium">Current Plan</h4>
          <p className="text-sm text-muted-foreground">
            You're on the Pro plan.
          </p>
        </div>
        
        <div className="rounded border p-4">
          <h4 className="font-medium">Payment Methods</h4>
          <p className="text-sm text-muted-foreground">
            Manage your credit cards and billing info.
          </p>
        </div>
      </div>
    </div>
  )
}

// Real-world navigation example
export const NavigationExample: Story = {
  render: () => (
    <div className="space-y-4">
      {/* Breadcrumb with separators */}
      <nav className="flex items-center space-x-2 text-sm">
        <a href="#" className="text-blue-600 hover:underline">Home</a>
        <Separator orientation="vertical" className="h-4" />
        <a href="#" className="text-blue-600 hover:underline">Products</a>
        <Separator orientation="vertical" className="h-4" />
        <span className="text-muted-foreground">Laptops</span>
      </nav>
      
      <Separator />
      
      {/* Content sections */}
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold">Laptops</h2>
          <p>Browse our collection of high-performance laptops.</p>
        </div>
        
        <Divider>Filters</Divider>
        
        <div className="grid grid-cols-4 gap-4">
          <button className="rounded border p-2 text-sm">Price</button>
          <button className="rounded border p-2 text-sm">Brand</button>
          <button className="rounded border p-2 text-sm">Rating</button>
          <button className="rounded border p-2 text-sm">Features</button>
        </div>
      </div>
    </div>
  )
}

// Form sections example
export const FormSectionsExample: Story = {
  render: () => (
    <form className="space-y-6">
      <SectionSeparator 
        title="Personal Information"
        subtitle="Enter your basic details"
      />
      
      <div className="grid gap-4">
        <div>
          <label className="block text-sm font-medium">First Name</label>
          <input className="mt-1 block w-full rounded border p-2" placeholder="John" />
        </div>
        <div>
          <label className="block text-sm font-medium">Last Name</label>
          <input className="mt-1 block w-full rounded border p-2" placeholder="Doe" />
        </div>
      </div>
      
      <SectionSeparator 
        title="Contact Information"
        subtitle="How can we reach you?"
      />
      
      <div className="grid gap-4">
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input className="mt-1 block w-full rounded border p-2" placeholder="john@example.com" />
        </div>
        <div>
          <label className="block text-sm font-medium">Phone</label>
          <input className="mt-1 block w-full rounded border p-2" placeholder="+1 (555) 123-4567" />
        </div>
      </div>
      
      <Divider />
      
      <div className="flex justify-end space-x-2">
        <button className="rounded border px-4 py-2">Cancel</button>
        <button className="rounded bg-blue-600 px-4 py-2 text-white">Save</button>
      </div>
    </form>
  )
}

// Playground
export const Playground: Story = {
  args: {
    orientation: 'horizontal',
    decorative: true
  },
  render: (args) => (
    <div className="space-y-4">
      <p>Content above separator</p>
      <Separator {...args} />
      <p>Content below separator</p>
    </div>
  )
} 
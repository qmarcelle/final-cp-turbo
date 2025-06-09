import type { Meta, StoryObj } from '@storybook/react'
import { Separator } from './Separator'

const meta: Meta<typeof Separator> = {
  title: '⚛️ Atoms/Separator',
  component: Separator,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Separator Component

A simple separator component for visually dividing content sections.

## Features
- **Horizontal & Vertical**: Support for both orientations
- **Accessibility**: Proper ARIA attributes
- **Customizable**: Easy to style and extend

## Usage
\`\`\`tsx
<Separator />
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Orientation of the separator',
    },
    decorative: {
      control: 'boolean',
      description: 'Whether the separator is decorative',
    },
  },
}

export default meta
type Story = StoryObj<typeof Separator>

export const Default: Story = {
  render: () => (
    <div className="w-full max-w-md mx-auto space-y-4 p-4">
      <div className="text-sm">
        <p>Content above separator</p>
      </div>
      <Separator />
      <div className="text-sm">
        <p>Content below separator</p>
      </div>
    </div>
  ),
}

export const Vertical: Story = {
  render: () => (
    <div className="flex h-20 items-center space-x-4 p-4">
      <div className="text-sm">
        <p>Left content</p>
      </div>
      <Separator orientation="vertical" />
      <div className="text-sm">
        <p>Right content</p>
      </div>
    </div>
  ),
}

export const InLayout: Story = {
  render: () => (
    <div className="max-w-md mx-auto p-6 border rounded-lg space-y-4">
      <div>
        <h3 className="text-lg font-semibold">Section Title</h3>
        <p className="text-sm text-gray-600">Some description text here.</p>
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-semibold">Another Section</h3>
        <p className="text-sm text-gray-600">More content in this section.</p>
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-semibold">Final Section</h3>
        <p className="text-sm text-gray-600">Last bit of content.</p>
      </div>
    </div>
  ),
}

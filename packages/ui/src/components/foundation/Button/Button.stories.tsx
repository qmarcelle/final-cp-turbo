import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'
import type { ButtonProps } from './Button'

/**
 * The Button component is used to trigger an action or event.
 * It follows our design system's principles and supports various states and variants.
 */
const meta = {
  title: 'Foundation/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile button component that supports multiple variants and states.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost'],
      description: 'The visual style of the button',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the button',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
    onClick: {
      action: 'clicked',
      description: 'Function called when the button is clicked',
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

/**
 * The default state of the Button component.
 */
export const Default: Story = {
  args: {
    children: 'Click me',
    variant: 'primary',
    size: 'md',
  },
}

/**
 * The secondary variant of the Button component.
 */
export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary',
    size: 'md',
  },
}

/**
 * A disabled Button component.
 */
export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    variant: 'primary',
    size: 'md',
    disabled: true,
  },
}

/**
 * Different sizes of the Button component.
 */
export const Sizes: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
}

/**
 * All variants of the Button component.
 */
export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  ),
}

export const Primary: Story = {
  name: 'Primary Button',
  args: {
    children: 'Primary Button',
    variant: 'primary',
  },
}

export const Success: Story = {
  name: 'Success Button',
  args: {
    children: 'Success Button',
    variant: 'success',
  },
}

export const Warning: Story = {
  name: 'Warning Button',
  args: {
    children: 'Warning Button',
    variant: 'warning',
  },
}

export const Error: Story = {
  name: 'Error Button',
  args: {
    children: 'Error Button',
    variant: 'error',
  },
}

export const WithIcon: Story = {
  name: 'Button with Icon',
  args: {
    children: (
      <>
        <svg
          className="w-4 h-4 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
        Add Item
      </>
    ),
    variant: 'primary',
    className: 'inline-flex items-center',
  },
}

export const WithCustomClass: Story = {
  name: 'Custom Styled Button',
  args: {
    children: 'Custom Button',
    variant: 'primary',
    className: 'rounded-full',
  },
} 
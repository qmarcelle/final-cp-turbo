import type { Meta, StoryObj } from '@storybook/react'
import { FormButton } from './FormButton'

const meta = {
  title: 'Composite/FormButton',
  component: FormButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'error'],
    },
    disabled: { control: 'boolean' },
    children: { control: 'text' },
  },
} satisfies Meta<typeof FormButton>

export default meta
type Story = StoryObj<typeof FormButton>

export const Primary: Story = {
  args: {
    children: 'Submit',
    variant: 'primary',
  },
}

export const Secondary: Story = {
  args: {
    children: 'Cancel',
    variant: 'secondary',
  },
}

export const Disabled: Story = {
  args: {
    children: 'Submit',
    disabled: true,
  },
}

export const WithCustomClass: Story = {
  args: {
    children: 'Custom Button',
    className: 'w-48',
  },
} 
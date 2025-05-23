import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { FormGroup } from '.'
import { Input  } from '../../foundation/input'
import { TextArea  } from '../../foundation/text-area'
import { Select } from '../../foundation/select'

const meta = {
  title: 'Composite/FormGroup',
  component: FormGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    description: { control: 'text' },
    required: { control: 'boolean' },
    className: { control: 'text' },
  },
} satisfies Meta<typeof FormGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Email',
    children: <Input name="email" placeholder="Enter your email" />,
  },
}

export const WithDescription: Story = {
  args: {
    label: 'Password',
    description: 'Must be at least 8 characters long',
    children: <Input name="password" type="password" placeholder="Enter your password" />,
  },
}

export const Required: Story = {
  args: {
    label: 'Full Name',
    required: true,
    children: <Input name="fullName" placeholder="Enter your full name" />,
  },
}

export const WithCustomClass: Story = {
  args: {
    label: 'Bio',
    className: 'max-w-md bg-gray-50 p-4 rounded-lg',
    children: <TextArea name="bio" placeholder="Tell us about yourself" />,
  },
} 
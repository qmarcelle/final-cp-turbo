import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { FormGroup } from './FormGroup'
import { Input  } from '../../foundation/Input'
import { TextArea  } from '../../foundation/TextArea'

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
    name: { control: 'text' },
  },
} satisfies Meta<typeof FormGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Email',
    name: 'email',
    children: <Input placeholder="Enter your email" />,
  },
}

export const WithDescription: Story = {
  args: {
    label: 'Password',
    name: 'password',
    description: 'Must be at least 8 characters long',
    children: <Input type="password" placeholder="Enter your password" />,
  },
}

export const Required: Story = {
  args: {
    label: 'Full Name',
    name: 'fullName',
    required: true,
    children: <Input placeholder="Enter your full name" />,
  },
}

export const WithCustomClass: Story = {
  args: {
    label: 'Bio',
    name: 'bio',
    className: 'max-w-md bg-gray-50 p-4 rounded-lg',
    children: <TextArea placeholder="Tell us about yourself" />,
  },
} 
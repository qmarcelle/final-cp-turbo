import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { FormGroup } from './FormGroup'
import { Input } from '../../atoms/Input'
import { TextArea } from '../../foundation/TextArea'

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
    error: { control: 'text' },
    'data-cy': { control: 'text' },
  },
} satisfies Meta<typeof FormGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Email',
    children: <Input placeholder="Enter your email" />,
  },
}

export const WithDescription: Story = {
  args: {
    label: 'Email',
    description: 'We will never share your email.',
    children: <Input placeholder="Enter your email" />,
  },
}

export const Required: Story = {
  args: {
    label: 'Email',
    required: true,
    children: <Input placeholder="Enter your email" />,
  },
}

export const WithError: Story = {
  args: {
    label: 'Email',
    error: 'Please enter a valid email address',
    children: <Input placeholder="Enter your email" />,
  },
}

export const WithTextArea: Story = {
  args: {
    label: 'Message',
    children: <Input type="textarea" name="message" placeholder="Enter your message" />,
  },
} 
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { NumberInput } from './NumberInput'

const meta: Meta<typeof NumberInput> = {
  title: 'Foundation/NumberInput',
  component: NumberInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'number' },
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number' },
    placeholder: { control: 'text' },
    allowNegative: { control: 'boolean' },
    showControls: { control: 'boolean' },
    precision: { control: 'number' },
    className: { control: 'text' },
    onChange: { action: 'changed' },
  },
}

export default meta
type Story = StoryObj<typeof NumberInput>

export const Default: Story = {
  args: {
    placeholder: 'Enter a number',
    onChange: (value) => console.log('Value changed:', value),
  },
}

export const WithValue: Story = {
  args: {
    value: 42,
    placeholder: 'Enter a number',
    onChange: (value) => console.log('Value changed:', value),
  },
}

export const WithMinMax: Story = {
  args: {
    min: 0,
    max: 100,
    placeholder: 'Enter a number (0-100)',
    onChange: (value) => console.log('Value changed:', value),
  },
}

export const WithStep: Story = {
  args: {
    step: 5,
    placeholder: 'Enter a number (step: 5)',
    onChange: (value) => console.log('Value changed:', value),
  },
}

export const WithPrecision: Story = {
  args: {
    precision: 2,
    placeholder: 'Enter a decimal number',
    onChange: (value) => console.log('Value changed:', value),
  },
}

export const NoControls: Story = {
  args: {
    showControls: false,
    placeholder: 'No increment/decrement buttons',
    onChange: (value) => console.log('Value changed:', value),
  },
}

export const WithCustomClass: Story = {
  args: {
    className: 'w-32 text-center',
    placeholder: 'Custom style',
    onChange: (value) => console.log('Value changed:', value),
  },
} 
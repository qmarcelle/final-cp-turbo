import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { NumberInput } from './NumberInput'

const meta: Meta<typeof NumberInput> = {
  title: '⚛️ Atoms/NumberInput',
  component: NumberInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# 🔢 NumberInput

A specialized input component for numeric values with increment/decrement controls and validation.

## Features
- **Numeric validation**: Only allows valid numbers
- **Min/Max bounds**: Set minimum and maximum values
- **Step controls**: Define increment/decrement amounts
- **Precision**: Control decimal places
- **Keyboard support**: Arrow keys for increment/decrement
- **Custom controls**: Optional +/- buttons
- **Accessibility**: Screen reader friendly

## Usage
\`\`\`tsx
<NumberInput
  value={quantity}
  onChange={setQuantity}
  min={1}
  max={99}
  step={1}
  placeholder="Enter quantity"
/>
\`\`\`
        `
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    value: { 
      control: 'number',
      description: 'Current numeric value'
    },
    min: { 
      control: 'number',
      description: 'Minimum allowed value'
    },
    max: { 
      control: 'number',
      description: 'Maximum allowed value'
    },
    step: { 
      control: 'number',
      description: 'Increment/decrement step amount'
    },
    placeholder: { 
      control: 'text',
      description: 'Placeholder text'
    },
    allowNegative: { 
      control: 'boolean',
      description: 'Whether negative numbers are allowed'
    },
    showControls: { 
      control: 'boolean',
      description: 'Show increment/decrement buttons'
    },
    precision: { 
      control: 'number',
      description: 'Number of decimal places'
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled'
    },
    className: { 
      control: 'text',
      description: 'Additional CSS classes'
    },
    onChange: { 
      action: 'changed',
      description: 'Called when value changes'
    },
  },
  args: {
    showControls: true,
    allowNegative: true,
    disabled: false,
  }
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
    value: 50,
    placeholder: 'Enter a number (0-100)',
    onChange: (value) => console.log('Value changed:', value),
  },
}

export const WithStep: Story = {
  args: {
    step: 5,
    value: 25,
    placeholder: 'Enter a number (step: 5)',
    onChange: (value) => console.log('Value changed:', value),
  },
}

export const WithPrecision: Story = {
  args: {
    precision: 2,
    value: 3.14,
    step: 0.01,
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

export const Disabled: Story = {
  args: {
    value: 100,
    disabled: true,
    placeholder: 'Disabled input',
    onChange: (value) => console.log('Value changed:', value),
  },
}

export const CurrencyExample: Story = {
  args: {
    value: 99.99,
    min: 0,
    precision: 2,
    step: 0.01,
    placeholder: '$0.00',
    className: 'w-32',
    onChange: (value) => console.log('Price changed:', value),
  },
}

export const QuantityExample: Story = {
  args: {
    value: 1,
    min: 1,
    max: 999,
    step: 1,
    placeholder: 'Qty',
    className: 'w-20 text-center',
    onChange: (value) => console.log('Quantity changed:', value),
  },
}

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <NumberInput placeholder="Default" />
      <NumberInput value={42} placeholder="With value" />
      <NumberInput min={0} max={10} placeholder="With min/max (0-10)" />
      <NumberInput precision={2} placeholder="With precision (2 decimals)" />
      <NumberInput showControls={false} placeholder="No controls" />
      <NumberInput disabled value={100} placeholder="Disabled" />
    </div>
  ),
}
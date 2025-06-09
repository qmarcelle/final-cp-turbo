import React, { useState } from 'react'
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
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'number',
      description: 'Current numeric value',
    },
    min: {
      control: 'number',
      description: 'Minimum allowed value',
    },
    max: {
      control: 'number',
      description: 'Maximum allowed value',
    },
    step: {
      control: 'number',
      description: 'Increment/decrement step amount',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    allowNegative: {
      control: 'boolean',
      description: 'Whether negative numbers are allowed',
    },
    showControls: {
      control: 'boolean',
      description: 'Show increment/decrement buttons',
    },
    precision: {
      control: 'number',
      description: 'Number of decimal places',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
    onChange: {
      action: 'changed',
      description: 'Called when value changes',
    },
  },
  args: {
    showControls: true,
    allowNegative: true,
    disabled: false,
  },
}

export default meta
type Story = StoryObj<typeof NumberInput>

export const Default: Story = {
  render: args => {
    const [value, setValue] = useState<number | undefined>(undefined)
    return (
      <div className="w-64">
        <NumberInput {...args} value={value} onChange={setValue} />
      </div>
    )
  },
  args: {
    placeholder: 'Enter a number',
  },
}

export const WithValue: Story = {
  render: args => {
    const [value, setValue] = useState<number | undefined>(42)
    return (
      <div className="w-64">
        <NumberInput {...args} value={value} onChange={setValue} />
      </div>
    )
  },
  args: {
    placeholder: 'Enter a number',
  },
}

export const WithMinMax: Story = {
  render: args => {
    const [value, setValue] = useState<number | undefined>(50)
    return (
      <div className="w-64">
        <NumberInput {...args} value={value} onChange={setValue} />
      </div>
    )
  },
  args: {
    min: 0,
    max: 100,
    placeholder: 'Enter a number (0-100)',
  },
}

export const WithStep: Story = {
  render: args => {
    const [value, setValue] = useState<number | undefined>(25)
    return (
      <div className="w-64">
        <NumberInput {...args} value={value} onChange={setValue} />
      </div>
    )
  },
  args: {
    step: 5,
    placeholder: 'Enter a number (step: 5)',
  },
}

export const WithPrecision: Story = {
  render: args => {
    const [value, setValue] = useState<number | undefined>(3.14)
    return (
      <div className="w-64">
        <NumberInput {...args} value={value} onChange={setValue} />
      </div>
    )
  },
  args: {
    precision: 2,
    step: 0.01,
    placeholder: 'Enter a decimal number',
  },
}

export const NoControls: Story = {
  render: args => {
    const [value, setValue] = useState<number | undefined>(undefined)
    return (
      <div className="w-64">
        <NumberInput {...args} value={value} onChange={setValue} />
      </div>
    )
  },
  args: {
    showControls: false,
    placeholder: 'No increment/decrement buttons',
  },
}

export const Disabled: Story = {
  render: args => {
    const [value, setValue] = useState<number | undefined>(100)
    return (
      <div className="w-64">
        <NumberInput {...args} value={value} onChange={setValue} />
      </div>
    )
  },
  args: {
    disabled: true,
    placeholder: 'Disabled input',
  },
}

export const CurrencyExample: Story = {
  render: args => {
    const [value, setValue] = useState<number | undefined>(99.99)
    return (
      <div className="w-32">
        <NumberInput {...args} value={value} onChange={setValue} />
      </div>
    )
  },
  args: {
    min: 0,
    precision: 2,
    step: 0.01,
    placeholder: '$0.00',
  },
}

export const QuantityExample: Story = {
  render: args => {
    const [value, setValue] = useState<number | undefined>(1)
    return (
      <div className="w-20">
        <NumberInput {...args} value={value} onChange={setValue} />
      </div>
    )
  },
  args: {
    min: 1,
    max: 999,
    step: 1,
    placeholder: 'Qty',
    className: 'text-center',
  },
}

export const AllStates: Story = {
  render: () => {
    const [value1, setValue1] = useState<number | undefined>(undefined)
    const [value2, setValue2] = useState<number | undefined>(42)
    const [value3, setValue3] = useState<number | undefined>(5)
    const [value4, setValue4] = useState<number | undefined>(3.14)
    const [value5, setValue5] = useState<number | undefined>(undefined)
    const [value6, setValue6] = useState<number | undefined>(100)

    return (
      <div className="flex flex-col gap-4 w-80">
        <NumberInput
          value={value1}
          onChange={setValue1}
          placeholder="Default"
        />
        <NumberInput
          value={value2}
          onChange={setValue2}
          placeholder="With value"
        />
        <NumberInput
          value={value3}
          onChange={setValue3}
          min={0}
          max={10}
          placeholder="With min/max (0-10)"
        />
        <NumberInput
          value={value4}
          onChange={setValue4}
          precision={2}
          placeholder="With precision (2 decimals)"
        />
        <NumberInput
          value={value5}
          onChange={setValue5}
          showControls={false}
          placeholder="No controls"
        />
        <NumberInput
          value={value6}
          onChange={setValue6}
          disabled
          placeholder="Disabled"
        />
      </div>
    )
  },
}

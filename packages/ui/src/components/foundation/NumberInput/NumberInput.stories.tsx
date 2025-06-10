import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { NumberInput } from './NumberInput'

const meta: Meta<typeof NumberInput> = {
  title: '⚛️ Foundation/NumberInput',
  component: NumberInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Number Input

A robust and accessible input component for capturing numeric values. It offers built-in controls for incrementing, decrementing, and validation.

## Features
- **Type-Safe**: Strictly handles numeric values.
- **Bounds and Steps**: Enforce minimum/maximum values and define step increments.
- **Precision Control**: Manage decimal places for floating-point numbers.
- **Keyboard Navigation**: Use arrow keys to adjust values.
- **Optional Controls**: Show or hide increment/decrement buttons.
- **Accessible**: Designed with ARIA attributes for screen reader support.

## When to Use
- For any user input that must be a number, such as quantity, age, or currency.
- When you need to constrain the input to a specific range or step value.
- Ideal for forms where numeric accuracy is critical.

## Accessibility
- The component uses \`role="spinbutton"\` to be identifiable by screen readers.
- \`aria-valuenow\`, \`aria-valuemin\`, and \`aria-valuemax\` provide context about the current value and its bounds.
- The input is fully navigable and operable via the keyboard.
`,
      },
    },
  },
  tags: ['foundation', 'stable', 'autodocs'],
  argTypes: {
    value: {
      control: 'number',
      description: 'The current value of the number input.',
    },
    min: {
      control: 'number',
      description: 'The minimum value allowed.',
    },
    max: {
      control: 'number',
      description: 'The maximum value allowed.',
    },
    step: {
      control: 'number',
      description: 'The amount to increment or decrement by.',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text for when the input is empty.',
    },
    allowNegative: {
      control: 'boolean',
      description: 'If true, allows negative numbers.',
    },
    showControls: {
      control: 'boolean',
      description: 'Toggles the visibility of the increment/decrement buttons.',
    },
    precision: {
      control: 'number',
      description: 'The number of decimal places to allow.',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the input, preventing user interaction.',
    },
    className: {
      control: 'text',
      description: 'Custom CSS classes to apply to the component.',
    },
    onChange: {
      action: 'changed',
      description: 'Callback function that fires when the value changes.',
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

export const HealthcareExamples: Story = {
  name: 'Healthcare Use Cases',
  render: () => {
    const [dosage, setDosage] = useState<number | undefined>(10)
    const [age, setAge] = useState<number | undefined>(45)
    const [claimAmount, setClaimAmount] = useState<number | undefined>(250.75)
    const [daysSupply, setDaysSupply] = useState<number | undefined>(30)

    return (
      <div className="space-y-6 max-w-sm">
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">Dosage (mg)</label>
          <NumberInput
            value={dosage}
            onChange={setDosage}
            min={1}
            max={100}
            step={5}
            placeholder="e.g., 10"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">Patient Age</label>
          <NumberInput
            value={age}
            onChange={setAge}
            min={0}
            max={120}
            placeholder="e.g., 45"
            showControls={false}
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">Insurance Claim Amount ($)</label>
          <NumberInput
            value={claimAmount}
            onChange={setClaimAmount}
            min={0}
            precision={2}
            step={10}
            placeholder="e.g., 250.75"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">Days of Supply</label>
          <NumberInput
            value={daysSupply}
            onChange={setDaysSupply}
            min={7}
            max={90}
            step={1}
            placeholder="e.g., 30"
            className="w-24"
          />
        </div>
      </div>
    )
  },
}

import type { Meta, StoryObj } from '@storybook/react'
import { RadioGroup, Radio } from './RadioGroup'
import { useState } from 'react'
import { useForm, FormProvider, Controller } from 'react-hook-form'
import { cn } from '../../../lib/utils'

const StoryWrapper = ({
  children,
  label,
  error,
  className,
}: {
  children: React.ReactNode
  label?: string
  error?: string
  className?: string
}) => (
  <div className={cn('space-y-2', className)}>
    {label && (
      <label className="text-sm font-medium text-gray-700">{label}</label>
    )}
    {children}
    {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
  </div>
)

const meta: Meta<typeof RadioGroup> = {
  title: '⚛️ Foundation/RadioGroup',
  component: RadioGroup,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Radio Group

A component that allows users to select a single option from a set. It is built to be accessible and form-friendly.

## Features
- **Single Selection**: Ensures only one option can be chosen at a time.
- **Form Integration**: Works seamlessly with libraries like React Hook Form.
- **Layout Options**: Supports both horizontal and vertical layouts.
- **Accessibility**: Follows ARIA standards for radio groups.
- **Customizable**: Can be styled to fit the application's design.

## When to Use
- When users need to select one option from a list of 2-5 items.
- For settings that require a single, clear choice, like plan selection or payment methods.
- Avoid using for long lists where a dropdown/select would be more appropriate.

## Accessibility
- The component uses \`role="radiogroup"\`.
- Each option has \`role="radio"\` and is linked to the group.
- Keyboard navigation (arrow keys) is supported for moving between options.
`,
      },
    },
  },
  tags: ['foundation', 'stable', 'autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'The layout orientation of the radio buttons.',
    },
  },
  args: {
    orientation: 'vertical',
  },
}

export default meta
type Story = StoryObj<typeof RadioGroup>

export const Default: Story = {
  render: args => {
    const [value, setValue] = useState('option2')
    return (
      <StoryWrapper label="Select an option" className="w-64">
        <RadioGroup {...args} value={value} onValueChange={setValue}>
          <Radio value="option1" label="Option 1" id="r1" />
          <Radio value="option2" label="Option 2" id="r2" />
          <Radio value="option3" label="Option 3" id="r3" />
        </RadioGroup>
      </StoryWrapper>
    )
  },
}

export const Horizontal: Story = {
  args: {
    orientation: 'horizontal',
  },
  render: args => {
    const [value, setValue] = useState('standard')
    return (
      <StoryWrapper label="Choose a delivery method" className="w-80">
        <RadioGroup {...args} value={value} onValueChange={setValue}>
          <Radio value="standard" label="Standard" id="h1" />
          <Radio value="express" label="Express" id="h2" />
          <Radio value="overnight" label="Overnight" id="h3" />
        </RadioGroup>
      </StoryWrapper>
    )
  },
}

export const WithError: Story = {
  render: args => {
    const [value, setValue] = useState('')
    return (
      <StoryWrapper
        label="Confirm your choice"
        error="Please select an option to continue."
        className="w-64"
      >
        <RadioGroup {...args} value={value} onValueChange={setValue}>
          <Radio value="yes" label="Yes" id="e1" />
          <Radio value="no" label="No" id="e2" />
        </RadioGroup>
      </StoryWrapper>
    )
  },
}

export const Disabled: Story = {
  render: args => {
    return (
      <StoryWrapper label="Cannot change this setting" className="w-64">
        <RadioGroup {...args} value="approved" disabled>
          <Radio value="approved" label="Approved" id="d1" />
          <Radio value="pending" label="Pending" id="d2" />
        </RadioGroup>
      </StoryWrapper>
    )
  },
}

export const WithReactHookForm: Story = {
  name: 'With React Hook Form',
  render: () => {
    type FormValues = { plan: string }
    const methods = useForm<FormValues>({
      defaultValues: { plan: 'hmo' },
    })
    const {
      control,
      handleSubmit,
      formState: { errors },
    } = methods

    return (
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(data => alert(JSON.stringify(data, null, 2)))}>
          <StoryWrapper
            label="Select a Plan"
            error={errors.plan?.message}
            className="w-64"
          >
            <Controller
              name="plan"
              control={control}
              rules={{ required: 'You must select a plan' }}
              render={({ field }) => (
                <RadioGroup
                  {...field}
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <Radio value="ppo" label="PPO Plan" id="f1" />
                  <Radio value="hmo" label="HMO Plan" id="f2" />
                  <Radio value="hdhp" label="HDHP Plan" id="f3" />
                </RadioGroup>
              )}
            />
          </StoryWrapper>
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
          >
            Submit
          </button>
        </form>
      </FormProvider>
    )
  },
}

export const HealthcareExamples: Story = {
  name: 'Healthcare Use Cases',
  render: () => {
    const [plan, setPlan] = useState('ppo')
    const [payment, setPayment] = useState('card')

    return (
      <div className="space-y-8 max-w-sm">
        <StoryWrapper label="Select Insurance Plan">
          <RadioGroup value={plan} onValueChange={setPlan}>
            <Radio
              value="ppo"
              label="PPO - Preferred Provider Organization"
              id="hc1"
            />
            <Radio
              value="hmo"
              label="HMO - Health Maintenance Organization"
              id="hc2"
            />
            <Radio
              value="hdhp"
              label="HDHP - High-Deductible Health Plan"
              id="hc3"
            />
          </RadioGroup>
        </StoryWrapper>

        <StoryWrapper label="Payment Method for Co-pay">
          <RadioGroup
            value={payment}
            onValueChange={setPayment}
            orientation="horizontal"
          >
            <Radio value="card" label="Credit Card" id="hc4" />
            <Radio value="hsa" label="HSA/FSA" id="hc5" />
            <Radio value="check" label="Check" id="hc6" />
          </RadioGroup>
        </StoryWrapper>
      </div>
    )
  },
} 
import type { Meta, StoryObj } from '@storybook/react'
import { FormInlineGroup } from './FormInlineGroup'
import { Input  } from '../../foundation/Input/Input'
import { useForm, Control, FieldValues } from 'react-hook-form'
import { ReactNode } from 'react'

const meta = {
  title: 'Composite/FormInlineGroup',
  component: FormInlineGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FormInlineGroup>

export default meta
type Story = StoryObj<typeof meta>

interface FormWrapperProps {
  children: (props: { control: Control<FieldValues> }) => ReactNode
}

const FormWrapper = ({ children }: FormWrapperProps) => {
  const form = useForm<FieldValues>()
  return (
    <div className="w-[800px]">
      {children({ control: form.control })}
    </div>
  )
}

const FormInputs = ({ control }: { control: Control<FieldValues> }) => (
  <>
    <Input
      name="firstName"
      control={control}
      placeholder="First name"
    />
    <Input
      name="lastName"
      control={control}
      placeholder="Last name"
    />
  </>
)

export const Default: Story = {
  args: {
    label: 'Name',
    'data-cy': 'name-group',
    children: null,
  },
  render: () => (
    <FormWrapper>
      {({ control }) => (
        <FormInlineGroup
          label="Name"
          data-cy="name-group"
        >
          <FormInputs control={control} />
        </FormInlineGroup>
      )}
    </FormWrapper>
  ),
}

export const Required: Story = {
  args: {
    label: 'Contact Information',
    required: true,
    'data-cy': 'contact-group',
    children: null,
  },
  render: () => (
    <FormWrapper>
      {({ control }) => (
        <FormInlineGroup
          label="Contact Information"
          required
          data-cy="contact-group"
        >
          <Input
            name="email"
            control={control}
            type="email"
            placeholder="Email"
          />
          <Input
            name="phone"
            control={control}
            type="tel"
            placeholder="Phone"
          />
        </FormInlineGroup>
      )}
    </FormWrapper>
  ),
}

export const WithDescription: Story = {
  args: {
    label: 'Address',
    description: 'Please enter your current residential address',
    'data-cy': 'address-group',
    children: null,
  },
  render: () => (
    <FormWrapper>
      {({ control }) => (
        <FormInlineGroup
          label="Address"
          description="Please enter your current residential address"
          data-cy="address-group"
        >
          <Input
            name="street"
            control={control}
            placeholder="Street address"
          />
          <Input
            name="city"
            control={control}
            placeholder="City"
          />
        </FormInlineGroup>
      )}
    </FormWrapper>
  ),
}

export const WithError: Story = {
  args: {
    label: 'Password',
    error: 'Passwords do not match',
    'data-cy': 'password-group',
    children: null,
  },
  render: () => (
    <FormWrapper>
      {({ control }) => (
        <FormInlineGroup
          label="Password"
          error="Passwords do not match"
          data-cy="password-group"
        >
          <Input
            name="password"
            control={control}
            type="password"
            placeholder="Password"
          />
          <Input
            name="confirmPassword"
            control={control}
            type="password"
            placeholder="Confirm password"
          />
        </FormInlineGroup>
      )}
    </FormWrapper>
  ),
} 
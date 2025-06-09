"use client";

import type { Meta, StoryObj } from '@storybook/react'
import { FormColumn } from './FormColumn'
import { Input } from '../../foundation/input'
import { useForm, Control, FieldValues, Controller } from 'react-hook-form'
import { ReactNode } from 'react'

const meta = {
  title: '📐 Layout/FormColumn',
  component: FormColumn,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FormColumn>

export default meta
type Story = StoryObj<typeof meta>

interface FormWrapperProps {
  children: (props: { control: Control<FieldValues> }) => ReactNode
}

const FormWrapper = ({ children }: FormWrapperProps) => {
  const form = useForm<FieldValues>()
  return (
    <div className="w-[600px]">
      {children({ control: form.control })}
    </div>
  )
}

const PersonalInfoForm = ({ control }: { control: Control<FieldValues> }) => (
  <FormColumn data-cy="personal-info">
    <Controller
      name="firstName"
      control={control}
      rules={{ required: 'First name is required' }}
      render={({ field, fieldState: { error } }) => (
        <Input
          {...field}
          label="First Name"
          required
          error={error?.message}
        />
      )}
    />
    <Controller
      name="lastName"
      control={control}
      rules={{ required: 'Last name is required' }}
      render={({ field, fieldState: { error } }) => (
        <Input
          {...field}
          label="Last Name"
          required
          error={error?.message}
        />
      )}
    />
    <Controller
      name="email"
      control={control}
      rules={{ required: 'Email is required' }}
      render={({ field, fieldState: { error } }) => (
        <Input
          {...field}
          label="Email"
          type="email"
          required
          error={error?.message}
        />
      )}
    />
  </FormColumn>
)

export const Default: Story = {
  args: {
    'data-cy': 'personal-info',
    children: null,
  },
  render: () => (
    <FormWrapper>
      {({ control }) => <PersonalInfoForm control={control} />}
    </FormWrapper>
  ),
}

const AddressForm = ({ control }: { control: Control<FieldValues> }) => (
  <FormColumn 
    className="space-y-6"
    data-cy="address-info"
  >
    <Controller
      name="street"
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Input
          {...field}
          label="Street Address"
          error={error?.message}
        />
      )}
    />
    <Controller
      name="city"
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Input
          {...field}
          label="City"
          error={error?.message}
        />
      )}
    />
    <Controller
      name="zipCode"
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Input
          {...field}
          label="ZIP Code"
          error={error?.message}
        />
      )}
    />
  </FormColumn>
)

export const WithCustomSpacing: Story = {
  args: {
    className: 'space-y-6',
    'data-cy': 'address-info',
    children: null,
  },
  render: () => (
    <FormWrapper>
      {({ control }) => <AddressForm control={control} />}
    </FormWrapper>
  ),
}

const ReadOnlyForm = () => {
  const form = useForm<FieldValues>({
    defaultValues: {
      username: 'johndoe',
      role: 'User',
      lastLogin: '2024-03-20',
    },
  })

  return (
    <FormColumn data-cy="readonly-info">
      <Controller
        name="username"
        control={form.control}
        render={({ field, fieldState: { error } }) => (
          <Input
            {...field}
            label="Username"
            disabled
            error={error?.message}
          />
        )}
      />
      <Controller
        name="role"
        control={form.control}
        render={({ field, fieldState: { error } }) => (
          <Input
            {...field}
            label="Role"
            disabled
            error={error?.message}
          />
        )}
      />
      <Controller
        name="lastLogin"
        control={form.control}
        render={({ field, fieldState: { error } }) => (
          <Input
            {...field}
            label="Last Login"
            disabled
            error={error?.message}
          />
        )}
      />
    </FormColumn>
  )
}

export const WithDisabledFields: Story = {
  args: {
    'data-cy': 'readonly-info',
    children: null,
  },
  render: () => (
    <div className="w-[600px]">
      <ReadOnlyForm />
    </div>
  ),
} 
"use client";

import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { FormInlineGroup } from '../FormInlineGroup'
import { Input } from '../../foundation/Input'
import { useForm, Control, FieldValues, Controller } from 'react-hook-form'
import { ReactNode } from 'react'

const meta = {
  title: '🧬 Molecules/FormInlineGroup',
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
    <Controller
      name="firstName"
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Input
          {...field}
          placeholder="First name"
          error={error?.message}
        />
      )}
    />
    <Controller
      name="lastName"
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Input
          {...field}
          placeholder="Last name"
          error={error?.message}
        />
      )}
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
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Input
                {...field}
                type="email"
                placeholder="Email"
                error={error?.message}
              />
            )}
          />
          <Controller
            name="phone"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Input
                {...field}
                type="tel"
                placeholder="Phone"
                error={error?.message}
              />
            )}
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
          <Controller
            name="street"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Input
                {...field}
                placeholder="Street address"
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
                placeholder="City"
                error={error?.message}
              />
            )}
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
          <Controller
            name="password"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Input
                {...field}
                type="password"
                placeholder="Password"
                error={error?.message}
              />
            )}
          />
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Input
                {...field}
                type="password"
                placeholder="Confirm password"
                error={error?.message}
              />
            )}
          />
        </FormInlineGroup>
      )}
    </FormWrapper>
  ),
} 
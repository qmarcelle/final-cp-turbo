import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { FormGrid } from '.'
import { FormGroup  } from '../form-group'
import { Input  } from '../../foundation/input'
import { FormProvider, useForm } from 'react-hook-form'

const meta = {
  title: 'Composite/FormGrid',
  component: FormGrid,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    columns: { control: 'number', min: 1, max: 12 },
    gap: { control: 'number', options: [2, 4, 6, 8, 12, 16] },
    className: { control: 'text' },
  },
} satisfies Meta<typeof FormGrid>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    columns: 2,
    children: (
      <>
        <FormGroup label="First Name" required>
          <Input name="firstName" placeholder="Enter first name" />
        </FormGroup>
        <FormGroup label="Last Name" required>
          <Input name="lastName" placeholder="Enter last name" />
        </FormGroup>
        <FormGroup label="Email">
          <Input name="email" type="email" placeholder="Enter email" />
        </FormGroup>
        <FormGroup label="Phone Number">
          <Input name="phone" type="tel" placeholder="Enter phone number" />
        </FormGroup>
      </>
    ),
  },
}

export const ThreeColumns: Story = {
  args: {
    columns: 3,
    children: (
      <>
        <FormGroup label="Street">
          <Input name="street" placeholder="Enter street" />
        </FormGroup>
        <FormGroup label="City">
          <Input name="city" placeholder="Enter city" />
        </FormGroup>
        <FormGroup label="State">
          <Input name="state" placeholder="Enter state" />
        </FormGroup>
        <FormGroup label="Country">
          <Input name="country" placeholder="Enter country" />
        </FormGroup>
        <FormGroup label="Postal Code">
          <Input name="postalCode" placeholder="Enter postal code" />
        </FormGroup>
      </>
    ),
  },
}

export const CustomGap: Story = {
  args: {
    columns: 2,
    gap: 8,
    children: (
      <>
        <FormGroup label="Username">
          <Input name="username" placeholder="Enter username" />
        </FormGroup>
        <FormGroup label="Password">
          <Input name="password" type="password" placeholder="Enter password" />
        </FormGroup>
      </>
    ),
  },
}

export const WithCustomClass: Story = {
  args: {
    columns: 2,
    className: 'bg-gray-50 p-4 rounded-lg',
    children: (
      <>
        <FormGroup label="Company">
          <Input name="company" placeholder="Enter company name" />
        </FormGroup>
        <FormGroup label="Department">
          <Input name="department" placeholder="Enter department" />
        </FormGroup>
      </>
    ),
  },
}

export const WithDifferentColumns: Story = {
  args: {
    cols: 3, // Example with 3 columns
    children: (
      <>
        <FormGroup label="Address Line 1">
          <Input name="address1" placeholder="Street address" />
        </FormGroup>
        <FormGroup label="Address Line 2">
          <Input name="address2" placeholder="Apartment, suite, etc.
            " />
        </FormGroup>
        <FormGroup label="City">
          <Input name="city" placeholder="City" />
        </FormGroup>
        <FormGroup label="State">
          <Input name="state" placeholder="State" />
        </FormGroup>
        <FormGroup label="Zip Code">
          <Input name="zip" placeholder="Zip code" />
        </FormGroup>
      </>
    ),
  },
} 
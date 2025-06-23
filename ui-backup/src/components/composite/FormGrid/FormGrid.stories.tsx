import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { FormGrid } from './FormGrid'
import { FormGroup  } from '../FormGroup'
import { Input  } from '../../foundation/Input'

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
        <FormGroup name="firstName" label="First Name">
          <Input placeholder="Enter first name" />
        </FormGroup>
        <FormGroup name="lastName" label="Last Name">
          <Input placeholder="Enter last name" />
        </FormGroup>
        <FormGroup name="email" label="Email">
          <Input type="email" placeholder="Enter email" />
        </FormGroup>
        <FormGroup name="phone" label="Phone">
          <Input type="tel" placeholder="Enter phone number" />
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
        <FormGroup name="street" label="Street">
          <Input placeholder="Enter street" />
        </FormGroup>
        <FormGroup name="city" label="City">
          <Input placeholder="Enter city" />
        </FormGroup>
        <FormGroup name="state" label="State">
          <Input placeholder="Enter state" />
        </FormGroup>
        <FormGroup name="country" label="Country">
          <Input placeholder="Enter country" />
        </FormGroup>
        <FormGroup name="postalCode" label="Postal Code">
          <Input placeholder="Enter postal code" />
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
        <FormGroup name="username" label="Username">
          <Input placeholder="Enter username" />
        </FormGroup>
        <FormGroup name="password" label="Password">
          <Input type="password" placeholder="Enter password" />
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
        <FormGroup name="company" label="Company">
          <Input placeholder="Enter company name" />
        </FormGroup>
        <FormGroup name="department" label="Department">
          <Input placeholder="Enter department" />
        </FormGroup>
      </>
    ),
  },
} 
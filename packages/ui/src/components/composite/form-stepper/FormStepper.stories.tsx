import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { FormStepper  } from './form-stepper'
import { FormGroup  } from '../form-group'
import { Input  } from '../../foundation/input'
import { z } from 'zod'
import { FormProvider, useForm } from 'react-hook-form'
import { Button } from '../../foundation/button'

const mockSteps = [
  {
    id: 'personal',
    title: 'Personal Info',
    description: 'Basic information',
    schema: z.object({
      name: z.string(),
      email: z.string().email(),
    }),
    component: (
      <>
        <FormGroup name="name" label="Full Name" required>
          <Input type="text" placeholder="Enter your full name" />
        </FormGroup>
        <FormGroup name="email" label="Email" required>
          <Input type="email" placeholder="Enter your email" />
        </FormGroup>
      </>
    ),
  },
  {
    id: 'address',
    title: 'Address',
    description: 'Your location',
    schema: z.object({
      address: z.string(),
    }),
    component: (
      <FormGroup name="address" label="Street Address" required>
        <Input type="text" placeholder="Enter street address" />
      </FormGroup>
    ),
  },
  {
    id: 'review',
    title: 'Review',
    description: 'Verify information',
    schema: z.object({}),
    component: (
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Please review your information</h3>
        <p className="text-gray-600">
          Make sure all the information you provided is correct before proceeding.
        </p>
      </div>
    ),
  },
]

const meta = {
  title: 'Composite/FormStepper',
  component: FormStepper,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    currentStep: { control: 'number', min: 0, max: 2 },
    className: { control: 'text' },
  },
} satisfies Meta<typeof FormStepper>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    steps: mockSteps,
  },
}

export const CustomCurrentStep: Story = {
  args: {
    steps: mockSteps,
    currentStep: 1,
  },
}

export const WithOptionalStep: Story = {
  args: {
    steps: [
      ...mockSteps.slice(0, 2),
      {
        ...mockSteps[2],
        isOptional: true,
      },
    ],
  },
}

export const WithCustomClass: Story = {
  args: {
    steps: mockSteps,
    className: 'max-w-2xl bg-gray-50 p-6 rounded-lg',
  },
}

export const WithOnComplete: Story = {
  args: {
    steps: mockSteps,
    currentStep: 2,
    onComplete: () => alert('Form completed!'),
  },
} 
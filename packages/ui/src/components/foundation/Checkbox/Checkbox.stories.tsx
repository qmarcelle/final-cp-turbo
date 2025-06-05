import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { useForm, FormProvider } from 'react-hook-form'
import { Checkbox } from './Checkbox'

// Create a wrapper component to provide form context with better styling
const FormWrapper = ({ 
  children,
  defaultValues = { checkbox: false },
  title,
  description,
}: {
  children: React.ReactNode,
  defaultValues?: Record<string, any>,
  title?: string,
  description?: string
}) => {
  const methods = useForm({ defaultValues })
  return (
    <FormProvider {...methods}>
      <div className="storybook-form-container">
        {title && <h3 className="text-lg font-medium text-neutral-800 mb-4">{title}</h3>}
        {children}
        {description && <p className="text-sm text-neutral-600 mt-4">{description}</p>}
      </div>
    </FormProvider>
  )
}

// Define the type for the Checkbox stories
// This separates story-specific props from component props
type CheckboxStoryProps = {
  defaultChecked?: boolean;
  storyTitle?: string;
  description?: string;
}

const meta = {
  title: 'Foundation/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A modern, accessible checkbox component that integrates with React Hook Form. Supports various states including indeterminate.'
      }
    },
    // Controls for specific story props that shouldn't be passed to component
    controls: {
      exclude: ['defaultChecked', 'storyTitle', 'description']
    }
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'text',
      description: 'The name of the form field',
      defaultValue: 'checkbox'
    },
    label: { 
      control: 'text',
      description: 'The label text for the checkbox'
    },
    required: { 
      control: 'boolean',
      description: 'Whether the field is required'
    },
    disabled: { 
      control: 'boolean',
      description: 'Whether the field is disabled'
    },
    indeterminate: { 
      control: 'boolean', 
      description: 'Whether the checkbox is in an indeterminate state'
    },
    className: { 
      control: 'text',
      description: 'Additional classes to apply to the component'
    },
    hint: {
      control: 'text',
      description: 'Hint text to display below the checkbox'
    }
  },
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof Checkbox>;

// Basic checkbox story
export const Default: Story = {
  decorators: [
    (Story) => (
      <FormWrapper 
        title="Default Checkbox"
        description="Basic unchecked checkbox with a label"
      >
        <Story />
      </FormWrapper>
    ),
  ],
  args: {
    name: 'acceptTerms',
    label: 'Accept terms and conditions',
  },
}

// Checked checkbox story
export const Checked: Story = {
  decorators: [
    (Story) => {
      const methods = useForm({
        defaultValues: { acceptTerms: true }
      })
      
      return (
        <FormProvider {...methods}>
          <div className="storybook-form-container">
            <h3 className="text-lg font-medium text-neutral-800 mb-4">Checked Checkbox</h3>
            <Story />
            <p className="text-sm text-neutral-600 mt-4">Checkbox in a checked state</p>
          </div>
        </FormProvider>
      )
    },
  ],
  args: {
    name: 'acceptTerms',
    label: 'Accept terms and conditions',
  },
}

// Checkbox with hint text
export const WithHint: Story = {
  decorators: [
    (Story) => (
      <FormWrapper 
        title="Checkbox with Hint Text"
        description="Checkbox with additional hint text for clarification"
      >
        <Story />
      </FormWrapper>
    ),
  ],
  args: {
    name: 'newsletter',
    label: 'Subscribe to newsletter',
    hint: 'We will send you updates about our products',
  },
}

// Required checkbox
export const Required: Story = {
  decorators: [
    (Story) => (
      <FormWrapper 
        title="Required Checkbox"
        description="Required checkbox with a visual indicator (*)"
      >
        <Story />
      </FormWrapper>
    ),
  ],
  args: {
    name: 'acceptTerms',
    label: 'Accept terms and conditions',
    required: true,
  },
}

// Disabled checkbox
export const Disabled: Story = {
  decorators: [
    (Story) => (
      <FormWrapper 
        title="Disabled Checkbox"
        description="Checkbox in a disabled state"
      >
        <Story />
      </FormWrapper>
    ),
  ],
  args: {
    name: 'acceptTerms',
    label: 'Accept terms and conditions',
    disabled: true,
  },
}

// Disabled and checked checkbox
export const DisabledChecked: Story = {
  decorators: [
    (Story) => {
      const methods = useForm({
        defaultValues: { acceptTerms: true }
      })
      
      return (
        <FormProvider {...methods}>
          <div className="storybook-form-container">
            <h3 className="text-lg font-medium text-neutral-800 mb-4">Disabled and Checked</h3>
            <Story />
            <p className="text-sm text-neutral-600 mt-4">Checkbox that is both disabled and checked</p>
          </div>
        </FormProvider>
      )
    },
  ],
  args: {
    name: 'acceptTerms',
    label: 'Accept terms and conditions',
    disabled: true,
  },
}

// Indeterminate checkbox
export const Indeterminate: Story = {
  decorators: [
    (Story) => (
      <FormWrapper 
        title="Indeterminate Checkbox"
        description="Checkbox in an indeterminate state, indicating a partial selection"
      >
        <Story />
      </FormWrapper>
    ),
  ],
  args: {
    name: 'selectAll',
    label: 'Select all items',
    indeterminate: true,
  },
}

// Checkbox with validation error
export const WithValidationError: Story = {
  decorators: [
    (Story) => {
      const methods = useForm({
        defaultValues: { acceptTerms: false },
        mode: 'onChange',
      })
      
      methods.setError('acceptTerms', {
        type: 'required',
        message: 'You must accept the terms and conditions'
      })
      
      return (
        <FormProvider {...methods}>
          <div className="storybook-form-container">
            <h3 className="text-lg font-medium text-neutral-800 mb-4">Checkbox with Validation Error</h3>
            <Story />
            <p className="text-sm text-neutral-600 mt-4">Checkbox displaying a validation error message</p>
          </div>
        </FormProvider>
      )
    },
  ],
  args: {
    name: 'acceptTerms',
    label: 'Accept terms and conditions',
    required: true,
  },
}

// Group of checkboxes
export const GroupOfCheckboxes: Story = {
  decorators: [
    (Story) => {
      const methods = useForm({
        defaultValues: {
          notification_email: true,
          notification_sms: false,
          notification_push: false,
        }
      })
      
      return (
        <FormProvider {...methods}>
          <div className="storybook-form-container">
            <h3 className="text-lg font-medium text-neutral-800 mb-4">Group of Checkboxes</h3>
            <fieldset className="space-y-3 border border-neutral-200 rounded-md p-4">
              <legend className="text-sm font-medium text-neutral-700 px-2">
                Notification preferences
              </legend>
              <Checkbox 
                name="notification_email" 
                label="Email notifications" 
                control={methods.control} 
              />
              <Checkbox 
                name="notification_sms" 
                label="SMS notifications" 
                control={methods.control} 
              />
              <Checkbox 
                name="notification_push" 
                label="Push notifications" 
                control={methods.control} 
                hint="Receive notifications on your device" 
              />
            </fieldset>
            <p className="text-sm text-neutral-600 mt-4">Multiple checkboxes in a group</p>
          </div>
        </FormProvider>
      )
    },
  ],
  args: {}, // No args needed since we define everything in the decorator
}

// Checkbox with long label
export const WithLongLabel: Story = {
  decorators: [
    (Story) => (
      <FormWrapper 
        title="Checkbox with Long Label"
        description="Checkbox with a long label that wraps to multiple lines"
      >
        <Story />
      </FormWrapper>
    ),
  ],
  args: {
    name: 'marketing',
    label: 'I agree to receive marketing communications and understand I can unsubscribe at any time by clicking the link in the footer of any email.',
  },
}
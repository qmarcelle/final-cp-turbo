import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { useForm, FormProvider } from 'react-hook-form'
import { Toggle } from './Toggle'

// Create a wrapper component to provide form context with better styling
const FormWrapper = ({ 
  children,
  defaultValues = { toggle: false },
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
      <div className="p-6 bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700 max-w-md">
        {title && <h3 className="text-lg font-medium text-neutral-800 dark:text-white mb-4">{title}</h3>}
        {children}
        {description && <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-4">{description}</p>}
      </div>
    </FormProvider>
  )
}

const meta = {
  title: 'Foundation/Toggle',
  component: Toggle,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A modern, accessible toggle switch component that integrates with React Hook Form. Supports various sizes and states.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'text',
      description: 'The name of the form field',
      defaultValue: 'toggle'
    },
    label: { 
      control: 'text',
      description: 'The label text for the toggle'
    },
    required: { 
      control: 'boolean',
      description: 'Whether the field is required'
    },
    disabled: { 
      control: 'boolean',
      description: 'Whether the field is disabled'
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant of the toggle switch'
    },
    className: { 
      control: 'text',
      description: 'Additional classes to apply to the component'
    }
  },
} satisfies Meta<typeof Toggle>

export default meta
type Story = StoryObj<typeof Toggle>;

// Basic toggle story
export const Default: Story = {
  render: (args) => {
    // Define form type for proper typing
    type FormValues = { notifications: boolean };
    const methods = useForm<FormValues>({
      defaultValues: { notifications: false }
    })
    
    return (
      <FormWrapper 
        title="Default Toggle Switch"
        description="Basic unchecked toggle with a label"
      >
        <Toggle<FormValues>
          {...args}
          name="notifications"
          control={methods.control}
          label="Enable notifications"
        />
      </FormWrapper>
    )
  }
}

// Toggle in checked state
export const Checked: Story = {
  render: (args) => {
    type FormValues = { notifications: boolean };
    const methods = useForm<FormValues>({
      defaultValues: { notifications: true }
    })
    
    return (
      <FormProvider {...methods}>
        <div className="p-6 bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700 max-w-md">
          <h3 className="text-lg font-medium text-neutral-800 dark:text-white mb-4">Checked Toggle</h3>
          <Toggle<FormValues>
            {...args}
            name="notifications"
            control={methods.control}
            label="Enable notifications"
          />
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-4">Toggle switch in a checked state</p>
        </div>
      </FormProvider>
    )
  }
}

// Required toggle
export const Required: Story = {
  render: (args) => {
    type FormValues = { termsAccepted: boolean };
    const methods = useForm<FormValues>({
      defaultValues: { termsAccepted: false }
    })
    
    return (
      <FormWrapper 
        title="Required Toggle"
        description="Required toggle with a visual indicator (*)"
      >
        <Toggle<FormValues>
          {...args}
          name="termsAccepted"
          control={methods.control}
          label="Accept terms"
          required
        />
      </FormWrapper>
    )
  }
}

// Disabled toggle
export const Disabled: Story = {
  render: (args) => {
    type FormValues = { premiumFeature: boolean };
    const methods = useForm<FormValues>({
      defaultValues: { premiumFeature: false }
    })
    
    return (
      <FormWrapper 
        title="Disabled Toggle"
        description="Toggle in a disabled state"
      >
        <Toggle<FormValues>
          {...args}
          name="premiumFeature"
          control={methods.control}
          label="Enable premium features"
          disabled
        />
      </FormWrapper>
    )
  }
}

// Disabled and checked toggle
export const DisabledChecked: Story = {
  render: (args) => {
    type FormValues = { premiumFeature: boolean };
    const methods = useForm<FormValues>({
      defaultValues: { premiumFeature: true }
    })
    
    return (
      <FormProvider {...methods}>
        <div className="p-6 bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700 max-w-md">
          <h3 className="text-lg font-medium text-neutral-800 dark:text-white mb-4">Disabled and Checked</h3>
          <Toggle<FormValues>
            {...args}
            name="premiumFeature"
            control={methods.control}
            label="Enable premium features"
            disabled
          />
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-4">Toggle that is both disabled and checked</p>
        </div>
      </FormProvider>
    )
  }
}

// Small toggle
export const Small: Story = {
  render: (args) => {
    type FormValues = { notifications: boolean };
    const methods = useForm<FormValues>({
      defaultValues: { notifications: false }
    })
    
    return (
      <FormWrapper 
        title="Small Toggle"
        description="Toggle with small size variant"
      >
        <Toggle<FormValues>
          {...args}
          name="notifications"
          control={methods.control}
          label="Enable notifications"
          size="sm"
        />
      </FormWrapper>
    )
  }
}

// Large toggle
export const Large: Story = {
  render: (args) => {
    type FormValues = { notifications: boolean };
    const methods = useForm<FormValues>({
      defaultValues: { notifications: false }
    })
    
    return (
      <FormWrapper 
        title="Large Toggle"
        description="Toggle with large size variant"
      >
        <Toggle<FormValues>
          {...args}
          name="notifications"
          control={methods.control}
          label="Enable notifications"
          size="lg"
        />
      </FormWrapper>
    )
  }
}

// Toggle with validation error
export const WithValidationError: Story = {
  render: (args) => {
    type FormValues = { termsAccepted: boolean };
    const methods = useForm<FormValues>({
      defaultValues: { termsAccepted: false },
      mode: 'onChange',
    })
    
    methods.setError('termsAccepted', {
      type: 'required',
      message: 'You must accept the terms and conditions'
    })
    
    return (
      <FormProvider {...methods}>
        <div className="p-6 bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700 max-w-md">
          <h3 className="text-lg font-medium text-neutral-800 dark:text-white mb-4">Toggle with Validation Error</h3>
          <Toggle<FormValues>
            {...args}
            name="termsAccepted"
            control={methods.control}
            label="Accept terms and conditions"
            required
          />
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-4">Toggle displaying a validation error message</p>
        </div>
      </FormProvider>
    )
  }
}

// Group of toggles
export const GroupOfToggles: Story = {
  render: (args) => {
    type FormValues = {
      email_notifications: boolean;
      sms_notifications: boolean;
      push_notifications: boolean;
    };
    
    const methods = useForm<FormValues>({
      defaultValues: {
        email_notifications: true,
        sms_notifications: false,
        push_notifications: false,
      }
    })
    
    return (
      <FormProvider {...methods}>
        <div className="p-6 bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700 max-w-md">
          <h3 className="text-lg font-medium text-neutral-800 dark:text-white mb-4">Group of Toggles</h3>
          <fieldset className="space-y-4 border border-neutral-200 dark:border-neutral-700 rounded-md p-4">
            <legend className="text-sm font-medium text-neutral-700 dark:text-neutral-300 px-2">
              Notification preferences
            </legend>
            <Toggle<FormValues>
              name="email_notifications" 
              label="Email notifications" 
              control={methods.control} 
            />
            <Toggle<FormValues>
              name="sms_notifications" 
              label="SMS notifications" 
              control={methods.control} 
            />
            <Toggle<FormValues>
              name="push_notifications" 
              label="Push notifications" 
              control={methods.control} 
              size="sm"
            />
          </fieldset>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-4">Configure your notification preferences</p>
        </div>
      </FormProvider>
    )
  }
} 
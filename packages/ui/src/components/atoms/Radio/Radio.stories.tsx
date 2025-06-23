import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Radio, RadioGroup } from './Radio'
import type { RadioOption } from './Radio'
import { useForm, FormProvider } from 'react-hook-form'

// Create a wrapper component to provide form context with better styling
const FormWrapper = ({ 
  children,
  defaultValues = { 
    radioField: '', 
    radioGroupField: ''
  },
  title,
  description,
}: {
  children: React.ReactNode,
  defaultValues?: {
    radioField: string,
    radioGroupField: string
  },
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

// Create component wrappers for Radio and RadioGroup to include form context
const RadioWithForm = (props: any) => {
  const { control } = useForm()
  return (
    <Radio 
      name="radioField" 
      control={control}
      data-cy="radio-demo"
      {...props}
    />
  )
}

const RadioGroupWithForm = (props: any) => {
  const { control } = useForm()
  return (
    <RadioGroup 
      name="radioGroupField" 
      control={control}
      data-cy="radio-group-demo"
      {...props}
    />
  )
}

const meta: Meta<typeof RadioWithForm> = {
  title: 'Atoms/Radio',
  component: RadioWithForm,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A modern, accessible radio component that integrates with React Hook Form. Supports single radio buttons and radio button groups.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    value: { control: 'text' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    className: { control: 'text' },
    hint: { control: 'text' },
  },
  decorators: [
    (Story, context) => (
      <FormWrapper 
        title={context.args.storyTitle || 'Radio Input'} 
        description={context.args.description}
      >
        <Story />
      </FormWrapper>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof RadioWithForm>

// Radio stories
export const SingleRadio: Story = {
  args: {
    label: 'Email notifications',
    value: 'email',
    required: false,
    disabled: false,
    storyTitle: 'Single Radio Input',
    description: 'A single radio button for toggling a specific option',
  },
}

export const RadioWithHint: Story = {
  args: {
    label: 'Enroll in Beta Program',
    value: 'beta',
    hint: 'You may receive experimental features',
    storyTitle: 'Radio with Hint Text',
    description: 'Radio button with additional hint text for clarification',
  },
}

export const RequiredRadio: Story = {
  args: {
    label: 'Accept terms and conditions',
    value: 'accept',
    required: true,
    storyTitle: 'Required Radio Input',
    description: 'Required radio button with visual indicator (*)',
  },
}

export const DisabledRadio: Story = {
  args: {
    label: 'SMS notifications (unavailable)',
    value: 'sms',
    disabled: true,
    storyTitle: 'Disabled Radio Input',
    description: 'Radio button in disabled state, preventing user interaction',
  },
}

export const RadioWithValidationError: Story = {
  args: {
    label: 'Agree to privacy policy',
    value: 'agree',
    required: true,
    storyTitle: 'Radio with Validation Error',
    description: 'Radio button displaying a validation error message',
  },
  render: (args) => {
    const methods = useForm({
      defaultValues: { radioField: '' },
      mode: 'onChange',
    })
    
    methods.setError('radioField', {
      type: 'required',
      message: 'You must agree to the privacy policy',
    })
    
    return (
      <FormProvider {...methods}>
        <Radio 
          name="radioField" 
          control={methods.control}
          data-cy="radio-demo"
          {...args}
        />
      </FormProvider>
    )
  },
}

// RadioGroup stories
export const RadioGroupBasic: StoryObj<typeof RadioGroupWithForm> = {
  args: {
    label: 'Preferred Notification Method',
    options: [
      { value: 'email', label: 'Email' },
      { value: 'sms', label: 'SMS' },
      { value: 'push', label: 'Push Notification' },
    ],
    required: false,
    disabled: false,
    storyTitle: 'Basic Radio Group',
    description: 'A group of radio options where only one can be selected at a time',
  },
  render: (args) => <RadioGroupWithForm {...args} />,
}

export const RadioGroupWithDisabledOption: StoryObj<typeof RadioGroupWithForm> = {
  args: {
    label: 'Preferred Notification Method',
    options: [
      { value: 'email', label: 'Email' },
      { value: 'sms', label: 'SMS (unavailable)', disabled: true },
      { value: 'push', label: 'Push Notification' },
    ],
    required: false,
    storyTitle: 'Radio Group with Disabled Option',
    description: 'Radio group with one option disabled, preventing its selection',
  },
  render: (args) => <RadioGroupWithForm {...args} />,
}

export const RadioGroupWithDescription: StoryObj<typeof RadioGroupWithForm> = {
  args: {
    label: 'Preferred Notification Method',
    options: [
      { value: 'email', label: 'Email', description: 'Receive updates in your inbox' },
      { value: 'sms', label: 'SMS', description: 'Get text messages on your phone' },
      { value: 'push', label: 'Push Notification', description: 'Instant updates in your browser' },
    ],
    required: true,
    storyTitle: 'Radio Group with Descriptions',
    description: 'Radio group with descriptive text for each option to provide additional context',
  },
  render: (args) => <RadioGroupWithForm {...args} />,
}

export const RadioGroupWithHint: StoryObj<typeof RadioGroupWithForm> = {
  args: {
    label: 'Subscription Plan',
    options: [
      { value: 'basic', label: 'Basic', description: '$9.99/month' },
      { value: 'premium', label: 'Premium', description: '$19.99/month' },
      { value: 'enterprise', label: 'Enterprise', description: '$49.99/month' },
    ],
    hint: 'You can change your plan at any time',
    storyTitle: 'Radio Group with Hint Text',
    description: 'Radio group with hint text providing additional information about the selection',
  },
  render: (args) => <RadioGroupWithForm {...args} />,
}

export const RadioGroupHorizontal: StoryObj<typeof RadioGroupWithForm> = {
  args: {
    label: 'Rating',
    options: [
      { value: '1', label: 'Poor' },
      { value: '2', label: 'Fair' },
      { value: '3', label: 'Good' },
      { value: '4', label: 'Excellent' },
    ],
    direction: 'horizontal',
    storyTitle: 'Horizontal Radio Group',
    description: 'Radio group with options displayed horizontally instead of vertically',
  },
  render: (args) => <RadioGroupWithForm {...args} />,
}

export const RadioGroupWithValidationError: StoryObj<typeof RadioGroupWithForm> = {
  args: {
    label: 'Select a payment method',
    options: [
      { value: 'credit', label: 'Credit Card' },
      { value: 'debit', label: 'Debit Card' },
      { value: 'paypal', label: 'PayPal' },
    ],
    required: true,
    storyTitle: 'Radio Group with Validation Error',
    description: 'Radio group displaying a validation error when no option is selected',
  },
  render: (args) => {
    const methods = useForm({
      defaultValues: { radioGroupField: '' },
      mode: 'onChange',
    })
    
    methods.setError('radioGroupField', {
      type: 'required',
      message: 'Please select a payment method',
    })
    
    return (
      <FormProvider {...methods}>
        <RadioGroup 
          name="radioGroupField" 
          control={methods.control}
          data-cy="radio-group-demo"
          {...args}
        />
      </FormProvider>
    )
  },
} 
import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react'
import { Input, type InputProps } from './input'
import { useForm, FormProvider, Control, FieldValues } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { EnvelopeIcon, PhoneIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline'
import type { IMaskInput } from 'react-imask'

// Define the mask type based on IMaskInput type
type MaskType = any // Simplified to avoid complex type extraction

export type InputMask = {
  mask: MaskType
  definitions?: { [key: string]: RegExp }
  prepare?: (value: string) => string
  commit?: (value: string) => string
  scale?: number
  signed?: boolean
  thousandsSeparator?: string
  padFractionalZeros?: boolean
  normalizeZeros?: boolean
  radix?: string
}

// Type for form field values
export type FormFieldValues = FieldValues

// Typed control for form fields
export type TypedControl<T extends FormFieldValues> = Control<T>

// Create a wrapper component to provide form context with better styling
interface StoryFormWrapperProps<T extends FormFieldValues = FormFieldValues> {
  children: (props: { control: TypedControl<T> }) => React.ReactNode
  defaultValues?: Partial<T>
  schema?: z.ZodType<T>
  title?: string
  description?: string
}

function FormWrapper<T extends FormFieldValues>({ 
  children, 
  defaultValues, 
  schema,
  title,
  description 
}: StoryFormWrapperProps<T>) {
  const form = useForm<T>({
    defaultValues: defaultValues as T,
    ...(schema && { resolver: zodResolver(schema) })
  })
  
  return (
    <FormProvider {...form}>
      <div className="p-6 bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700 max-w-md">
        {title && <h3 className="text-lg font-medium text-neutral-800 dark:text-white mb-4">{title}</h3>}
        {children({ control: form.control })}
        {description && <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-4">{description}</p>}
      </div>
    </FormProvider>
  )
}

type InputProps<T extends FormFieldValues = FormFieldValues> = {
  name: string
  label?: string
  type?: 'text' | 'email' | 'password' | 'tel' | 'number' | 'textarea'
  required?: boolean
  disabled?: boolean
  placeholder?: string
  maxLength?: number
  showCount?: boolean
  autoResize?: boolean
  debounceMs?: number
  minRows?: number
  maxRows?: number
  control: TypedControl<T>
}

const meta = {
  title: 'Foundation/input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
### Input Component

A versatile form input component that supports various types of text input with validation, error states, masking, and accessibility features.

#### Features
- 🎯 React Hook Form integration
- ✨ Advanced validation with Zod
- 🎭 Input masking
- 🔤 Prefix/suffix support
- 📝 Character count
- ⌨️ Debounced input
- 📱 Auto-resize textarea
- 🌙 Dark mode support
- ♿️ Full accessibility

#### Usage

\`\`\`tsx
import { Input  } from '../Input'
import { useForm } from 'react-hook-form'

// Basic usage with masking
function PhoneInput() {
  const { control } = useForm()
  return (
    <Input
      name="phone"
      control={control}
      label="Phone"
      mask={{
        mask: '+1 (000) 000-0000'
      }}
      prefix={<PhoneIcon className="h-5 w-5" />}
    />
  )
}

// With character count
function MessageInput() {
  const { control } = useForm()
  return (
    <Input
      name="message"
      control={control}
      type="textarea"
      label="Message"
      maxLength={500}
      showCount
      autoResize
    />
  )
}
\`\`\`
`,
      },
    },
  },
  argTypes: {
    name: { control: 'text' },
    label: { control: 'text' },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'tel', 'number', 'textarea'],
    },
    required: { control: 'boolean' },
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
    maxLength: { control: 'number' },
    showCount: { control: 'boolean' },
    autoResize: { control: 'boolean' },
    debounceMs: { control: 'number' },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof Input>

type PhoneFormValues = {
  phone: string
}

export const WithPhoneMask: Story = {
  render: () => {
    const defaultValues = { phone: '' }
    return (
      <FormWrapper 
        defaultValues={defaultValues}
        title="Phone Input with Mask"
        description="Phone input with +1 (XXX) XXX-XXXX formatting mask and icon prefix"
      >
        {({ control }) => (
          <Input
            name="phone"
            control={control}
            label="Phone Number"
            type="tel"
            required
            placeholder="Enter phone number"
            mask={{
              mask: '+1 (000) 000-0000',
              definitions: {
                '0': /[0-9]/,
              },
            }}
            prefix={<PhoneIcon className="h-5 w-5" />}
          />
        )}
      </FormWrapper>
    )
  },
}

type AmountFormValues = {
  amount: string
}

export const WithCurrencyMask: Story = {
  render: () => {
    const defaultValues: AmountFormValues = { amount: '' }
    return (
      <FormWrapper<AmountFormValues> 
        defaultValues={defaultValues}
        title="Currency Input"
        description="Currency input with automatic number formatting, decimal places, and dollar sign"
      >
        {({ control }) => (
          <Input<AmountFormValues>
            name="amount"
            control={control}
            label="Amount"
            required
            placeholder="Enter amount"
            mask={{
              mask: Number,
              scale: 2,
              signed: false,
              thousandsSeparator: ',',
              padFractionalZeros: true,
              normalizeZeros: true,
              radix: '.',
            }}
            prefix={<CurrencyDollarIcon className="h-5 w-5" />}
          />
        )}
      </FormWrapper>
    )
  },
}

type TweetFormValues = {
  tweet: string
}

export const WithCharacterCount: Story = {
  render: () => {
    const defaultValues: TweetFormValues = { tweet: '' }
    return (
      <FormWrapper<TweetFormValues> 
        defaultValues={defaultValues}
        title="Input with Character Counter"
        description="Text input with a character limit counter, perfect for social media posts"
      >
        {({ control }) => (
          <Input
            name="tweet"
            control={control}
            label="Tweet"
            maxLength={280}
            showCount
            placeholder="What's happening?"
          />
        )}
      </FormWrapper>
    )
  },
}

type DescriptionFormValues = {
  description: string
}

export const TextareaAutoResize: Story = {
  render: () => {
    const defaultValues: DescriptionFormValues = { description: '' }
    return (
      <FormWrapper<DescriptionFormValues> 
        defaultValues={defaultValues}
        title="Auto-resizing Textarea"
        description="Textarea that automatically adjusts its height as you type, with a character counter"
      >
        {({ control }) => (
          <Input
            name="description"
            control={control}
            label="Description"
            type="textarea"
            autoResize
            minRows={3}
            maxRows={10}
            showCount
            maxLength={1000}
            placeholder="Start typing to auto-resize..."
          />
        )}
      </FormWrapper>
    )
  },
}

type EmailFormValues = {
  email: string
}

export const WithPrefixSuffix: Story = {
  args: {
    name: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'username',
  },
  render: (args) => (
    <FormWrapper<EmailFormValues>>
      {({ control }) => (
        <Input
          {...args}
          control={control}
          prefix={<EnvelopeIcon className="h-5 w-5" />}
          suffix="@company.com"
        />
      )}
    </FormWrapper>
  ),
}

type SearchFormValues = {
  search: string
}

export const DebouncedInput: Story = {
  args: {
    name: 'search',
    label: 'Search (with 500ms debounce)',
    debounceMs: 500,
    placeholder: 'Start typing...',
  },
  render: (args) => {
    const [value, setValue] = React.useState('')
    
    return (
      <FormWrapper<SearchFormValues>>
        {({ control }) => (
          <div className="space-y-4">
            <Input
              {...args}
              control={control}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
            />
            <div className="text-sm text-gray-500">
              Debounced value: {value}
            </div>
          </div>
        )}
      </FormWrapper>
    )
  },
}

type UsernameFormValues = {
  username: string
}

export const ValidationExample: Story = {
  args: {
    name: 'username',
    label: 'Username',
    required: true,
    placeholder: 'Enter username',
  },
  render: (args) => {
    const schema = z.object({
      username: z.string()
        .min(3, 'Username must be at least 3 characters')
        .max(20, 'Username cannot exceed 20 characters')
        .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
    })

    const form = useForm<UsernameFormValues>({
      resolver: zodResolver(schema),
    })

    return (
      <div className="w-[400px]">
        <Input
          {...args}
          control={form.control}
          validation={{
            pattern: {
              value: /^[a-zA-Z0-9_]+$/,
              message: 'Username can only contain letters, numbers, and underscores',
            },
          }}
        />
      </div>
    )
  },
}

type CompleteFormValues = {
  name: string
  email: string
  phone: string
  amount: string
  message: string
}

// Example of a complete form with multiple input types
export const CompleteFormExample: Story = {
  args: {
    name: 'form',
    label: 'Complete Form Example',
  },
  render: (args) => {
    const schema = z.object({
      name: z.string().min(2, 'Name must be at least 2 characters'),
      email: z.string().email('Invalid email address'),
      phone: z.string().min(10, 'Invalid phone number'),
      amount: z.string().min(1, 'Amount is required'),
      message: z.string().max(500, 'Message cannot exceed 500 characters'),
    })

    const form = useForm<CompleteFormValues>({
      resolver: zodResolver(schema),
    })

    return (
      <div className="w-[500px] space-y-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <Input
          name="name"
          control={form.control}
          label="Full Name"
          required
          placeholder="John Doe"
        />
        
        <Input
          name="email"
          control={form.control}
          label="Email"
          type="email"
          required
          prefix={<EnvelopeIcon className="h-5 w-5" />}
          placeholder="john@example.com"
        />
        
        <Input
          name="phone"
          control={form.control}
          label="Phone"
          required
          mask={{
            mask: '+1 (000) 000-0000',
          }}
          prefix={<PhoneIcon className="h-5 w-5" />}
          placeholder="(555) 555-5555"
        />
        
        <Input
          name="amount"
          control={form.control}
          label="Amount"
          required
          mask={{
            mask: Number,
            scale: 2,
            signed: false,
            thousandsSeparator: ',',
            padFractionalZeros: true,
            normalizeZeros: true,
            radix: '.',
          }}
          prefix={<CurrencyDollarIcon className="h-5 w-5" />}
          placeholder="0.00"
        />
        
        <Input
          name="message"
          control={form.control}
          label="Message"
          type="textarea"
          autoResize
          maxLength={500}
          showCount
          placeholder="Enter your message here..."
        />
        
        <button
          type="submit"
          className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Submit Form
        </button>
      </div>
    )
  },
} 
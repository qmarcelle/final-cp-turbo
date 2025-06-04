import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react'
import { Input } from './Input'
import { useForm, FormProvider, Control, FieldValues } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { EnvelopeIcon, PhoneIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline'
import type { IMaskInput } from 'react-imask'
import { Controller } from 'react-hook-form'

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
  title: 'Foundation/Input',
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
  tweet: string;
};

export const WithCharacterCount: Story = {
  render: () => {
    const defaultValues: TweetFormValues = { tweet: '' };
    return (
      <FormWrapper<TweetFormValues> 
        defaultValues={defaultValues}
        title="Input with Character Counter"
        description="Text input with a character limit counter, perfect for social media posts"
      >
        {({ control }) => (
          <Controller
            name="tweet"
            control={control}
            rules={{ maxLength: { value: 140, message: 'Tweet too long' } }} // Example rule
            render={({ field, fieldState: { error } }) => (
              <Input<TweetFormValues>
                {...field}
                type="textarea"
                label="Tweet"
                placeholder="What's happening?"
                maxLength={140}
                showCount
                error={error?.message}
              />
            )}
          />
        )}
      </FormWrapper>
    );
  },
};

type DescriptionFormValues = {
  description: string;
};

export const WithTextarea: Story = {
  render: () => {
    const defaultValues: DescriptionFormValues = { description: '' };
    return (
      <FormWrapper<DescriptionFormValues>
        defaultValues={defaultValues}
        title="Textarea Input"
        description="A multi-line text input for longer content, like descriptions or comments"
      >
        {({ control }) => (
          <Controller
            name="description"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Input<DescriptionFormValues>
                {...field}
                type="textarea"
                label="Description"
                placeholder="Enter detailed description"
                minRows={3}
                error={error?.message}
              />
            )}
          />
        )}
      </FormWrapper>
    );
  },
};

type EmailFormValues = {
  email: string;
};

export const WithPrefixSuffix: Story = {
  render: () => {
    const defaultValues: EmailFormValues = { email: '' };
    return (
      <FormWrapper<EmailFormValues>
        defaultValues={defaultValues}
        title="Input with Prefix/Suffix"
        description="Enhance inputs with icons or text labels for better context and usability"
      >
        {({ control }) => (
          <Controller
            name="email"
            control={control}
            rules={{ required: 'Email is required' }} // Example rule
            render={({ field, fieldState: { error } }) => (
              <Input<EmailFormValues>
                {...field}
                label="Email Address"
                type="email"
                required
                placeholder="your.email"
                prefix={<EnvelopeIcon className="h-5 w-5 text-neutral-400" />}
                suffix="@example.com"
                error={error?.message}
              />
            )}
          />
        )}
      </FormWrapper>
    );
  },
};

type SearchFormValues = {
  search: string;
};

export const StateValidation: Story = {
  render: () => {
    const schema = z.object({
      search: z.string().min(3, 'Search query must be at least 3 characters'),
    });
    const defaultValues: SearchFormValues = { search: '' };
    return (
      <FormWrapper<SearchFormValues>
        schema={schema}
        defaultValues={defaultValues}
        title="Input with Validation States"
        description="Demonstrates error and success states based on Zod validation schema"
      >
        {({ control }) => (
            <Controller
                name="search"
                control={control}
                render={({ field, fieldState: { error } }) => (
                    <Input<SearchFormValues>
                        {...field}
                        label="Search Query"
                        placeholder="Enter at least 3 characters"
                        error={error?.message} // error message from Zod
                    />
                )}
            />
        )}
      </FormWrapper>
    );
  },
};

// For simple stories like Disabled and ReadOnly, if they use control, they need wrapping too.
// If they just pass props directly without control, they are fine.
// Assuming these simple stories might also be wrapped in FormWrapper for consistency or to show them in a form context.

export const Disabled: Story = {
  render: () => (
    <FormWrapper title="Disabled Input" description="Input field in a disabled state, not interactive">
      {({ control }) => (
        <Controller
          name="disabledInput"
          control={control}
          defaultValue="Cannot change this"
          render={({ field }) => (
            <Input 
              {...field}
              label="Disabled Field"
              disabled 
            />
          )}
        />
      )}
    </FormWrapper>
  )
};

export const ReadOnly: Story = {
    render: () => (
      <FormWrapper title="Read-Only Input" description="Input field in read-only state, value is not editable">
        {({ control }) => (
          <Controller
            name="readOnlyInput"
            control={control}
            defaultValue="This is a read-only value"
            render={({ field }) => (
              <Input 
                {...field}
                label="Read-Only Field" 
                readOnly // Assuming Input supports readOnly, if not, disabled might be used visually
              />
            )}
          />
        )}
      </FormWrapper>
    )
  };


type UsernameFormValues = {
  username: string;
};
export const WithDebounce: Story = {
  render: () => {
    const defaultValues: UsernameFormValues = { username: '' };
    const [debouncedValue, setDebouncedValue] = React.useState('');

    return (
      <FormWrapper<UsernameFormValues>
        defaultValues={defaultValues}
        title="Input with Debounce"
        description={`Demonstrates debounced input. Typed value will reflect after a delay. Debounced: ${debouncedValue}`}
      >
        {({ control }) => (
          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <Input<UsernameFormValues>
                {...field}
                label="Username"
                placeholder="Type to see debounce in action"
                debounceMs={500}
                onChange={(e) => {
                  field.onChange(e); // Important to call RHF's onChange
                  // If Input's onChange prop doesn't pass the event directly, adjust accordingly.
                  // Assuming e.target.value is accessible or field.onChange handles it.
                  // The custom `onChange` for debounce should ideally be handled inside the Input component itself
                  // or the `field.onChange` should be debounced before being passed to the Input component.
                  // For this story, we'll assume the Input handles its own debouncing logic for its internal state if needed
                  // and RHF is updated. The description shows the effect.
                  // A more direct way to show RHF debounced value might involve a debounced version of field.onChange or watch the field and debounce that.
                  // Let's simulate a simple debounce effect for the display string:
                  const val = (e.target as HTMLInputElement).value;
                  setTimeout(() => setDebouncedValue(val), 500);
                }}
              />
            )}
          />
        )}
      </FormWrapper>
    );
  },
};

type MessageFormValues = {
  message: string;
}
export const TextAreaAutoResize: Story = {
  render: () => {
    const defaultValues: MessageFormValues = { message: '' };
    return (
      <FormWrapper<MessageFormValues>
        defaultValues={defaultValues}
        title="Auto-Resizing Textarea"
        description="Textarea that automatically adjusts its height based on content"
      >
        {({ control }) => (
          <Controller
            name="message"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Input<MessageFormValues>
                {...field}
                type="textarea"
                label="Your Message"
                placeholder="Start typing, and the textarea will grow..."
                autoResize
                minRows={2}
                error={error?.message}
              />
            )}
          />
        )}
      </FormWrapper>
    );
  },
};


type CompleteFormValues = {
  name: string;
  email: string;
  phone: string;
  amount: string;
  message: string;
};

export const CompleteFormExample: Story = {
  render: () => {
    const schema = z.object({
      name: z.string().min(1, 'Name is required'),
      email: z.string().email('Invalid email address').min(1, 'Email is required'),
      phone: z.string().regex(/^\+1 \(\d{3}\) \d{3}-\d{4}$/, 'Invalid phone format'),
      amount: z.string().min(1, 'Amount is required'), // Or use a more specific currency validation
      message: z.string().max(500, 'Message too long'),
    });
    const defaultValues: Partial<CompleteFormValues> = { 
        name: '', 
        email: '', 
        phone: '', 
        amount: '', 
        message: '' 
    };

    return (
      <FormWrapper<CompleteFormValues>
        schema={schema}
        defaultValues={defaultValues}
        title="Comprehensive Form Example"
        description="Showcases multiple Input components with various configurations and validation in a single form"
      >
        {({ control }) => (
          <div className="space-y-4">
            <Controller
              name="name"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <Input<CompleteFormValues>
                  {...field}
                  label="Full Name"
                  placeholder="Enter your full name"
                  required
                  error={error?.message}
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <Input<CompleteFormValues>
                  {...field}
                  label="Email Address"
                  type="email"
                  placeholder="your.email@example.com"
                  prefix={<EnvelopeIcon className="h-5 w-5" />}
                  required
                  error={error?.message}
                />
              )}
            />
            <Controller
              name="phone"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <Input<CompleteFormValues>
                  {...field}
                  label="Phone Number"
                  type="tel"
                  placeholder="+1 (XXX) XXX-XXXX"
                  mask={{ mask: '+1 (000) 000-0000' }}
                  prefix={<PhoneIcon className="h-5 w-5" />}
                  error={error?.message}
                />
              )}
            />
            <Controller
              name="amount"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <Input<CompleteFormValues>
                  {...field}
                  label="Donation Amount"
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
                  required
                  error={error?.message}
                />
              )}
            />
            <Controller
              name="message"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <Input<CompleteFormValues>
                  {...field}
                  type="textarea"
                  label="Message (Optional)"
                  placeholder="Enter a brief message"
                  maxLength={500}
                  showCount
                  autoResize
                  minRows={3}
                  error={error?.message}
                />
              )}
            />
          </div>
        )}
      </FormWrapper>
    );
  },
};

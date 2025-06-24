import type { Meta, StoryObj } from '@storybook/react'
import { useForm, FormProvider } from 'react-hook-form'
import { Input } from './Input'

const meta = {
  title: '⚛️ Atoms/⌨️ Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Input field component with validation, icons, and various input types for broker portal forms',
      },
    },
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'search', 'date'],
      description: 'The type of input field',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the input',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
    },
    error: {
      control: 'boolean',
      description: 'Whether the input is in an error state',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
    defaultValue: {
      control: 'text',
      description: 'Default value for the input',
    },
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
}

export const WithLabel: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'Enter your email',
    type: 'email',
  },
}

export const WithError: Story = {
  args: {
    label: 'Password',
    type: 'password',
    error: 'Password must be at least 8 characters',
    placeholder: 'Enter password',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Username',
    disabled: true,
    defaultValue: 'john.doe',
    placeholder: 'Enter username',
  },
}

export const WithIcon: Story = {
  args: {
    label: 'Search',
    type: 'search',
    placeholder: 'Search...',
    leftIcon: (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    ),
  },
}

export const WithValidation: Story = {
  render: () => {
    const form = useForm({
      defaultValues: {
        email: '',
      },
    })

    return (
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(() => {})}>
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            {...form.register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
          />
        </form>
      </FormProvider>
    )
  },
}

export const NumberInput: Story = {
  args: {
    label: 'Age',
    type: 'number',
    placeholder: 'Enter your age',
    min: 0,
    max: 120,
  },
}

export const DateInput: Story = {
  args: {
    label: 'Date of Birth',
    type: 'date',
  },
}

export const ReadOnly: Story = {
  args: {
    label: 'Member ID',
    defaultValue: 'MEM123456',
    readOnly: true,
  },
}

export const WithHelperText: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter password',
    helperText:
      'Must be at least 8 characters with one number and special character',
  },
}

export const Required: Story = {
  args: {
    label: 'Full Name',
    placeholder: 'Enter your full name',
    required: true,
  },
}

export const WithMaxLength: Story = {
  args: {
    label: 'Bio',
    placeholder: 'Tell us about yourself',
    maxLength: 100,
  },
}

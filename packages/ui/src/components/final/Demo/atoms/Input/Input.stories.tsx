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
        component: `
# Input Component

A versatile input component for forms and user input with support for:
- Multiple input types (text, email, password, etc.)
- Form validation
- Icons and decorators
- Error states
- Helper text
- Character count
- Accessible design
- Smooth transitions and shadows
`,
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

// Interactive States
export const InteractiveStates: Story = {
  args: {
    placeholder: 'Enter text...',
  },
  render: args => (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Input States</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Default State */}
          <div className="space-y-2">
            <Input {...args} label="Default State" />
            <p className="text-sm text-gray-500">
              Normal state with subtle shadow
            </p>
          </div>

          {/* Focused State (simulated) */}
          <div className="space-y-2">
            <Input
              {...args}
              label="Focus State"
              className="ring-2 ring-blue-500 border-transparent"
            />
            <p className="text-sm text-gray-500">With focus ring</p>
          </div>

          {/* Disabled State */}
          <div className="space-y-2">
            <Input {...args} label="Disabled State" disabled />
            <p className="text-sm text-gray-500">
              Disabled with reduced opacity
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Validation States
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* With Error */}
          <div className="space-y-2">
            <Input
              {...args}
              label="Error State"
              error="This field is required"
            />
            <p className="text-sm text-gray-500">Error state with message</p>
          </div>

          {/* With Success */}
          <div className="space-y-2">
            <Input
              {...args}
              label="Success State"
              success
              value="Valid input"
            />
            <p className="text-sm text-gray-500">Success state</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">With Icons</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* With Left Icon */}
          <div className="space-y-2">
            <Input
              {...args}
              label="Search Input"
              type="search"
              leftIcon={
                <svg
                  className="w-4 h-4 text-gray-400"
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
              }
            />
            <p className="text-sm text-gray-500">With left icon</p>
          </div>

          {/* With Right Icon */}
          <div className="space-y-2">
            <Input
              {...args}
              label="Password Input"
              type="password"
              rightIcon={
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              }
            />
            <p className="text-sm text-gray-500">With right icon</p>
          </div>
        </div>
      </div>
    </div>
  ),
}

// Form Examples
export const FormExamples: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Member Search
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Member ID" placeholder="Enter member ID" required />
          <Input
            label="Group Number"
            placeholder="Enter group number"
            required
          />
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Contact Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Email Address"
            type="email"
            placeholder="Enter email"
            required
          />
          <Input
            label="Phone Number"
            type="tel"
            placeholder="Enter phone number"
            required
          />
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Notes</h3>
        <Input
          label="Additional Notes"
          type="textarea"
          placeholder="Enter any additional notes"
          rows={4}
          helperText="Maximum 500 characters"
          maxLength={500}
          showCount
        />
      </div>
    </div>
  ),
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

import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Select, type SelectProps, type SelectOption } from './select'
import { useForm, FormProvider } from 'react-hook-form'

const meta: Meta<SelectProps> = {
  title: 'Foundation/select',
  component: Select,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
### Select

A customizable select component that supports single selection with form integration and validation.

#### Usage

\`\`\`tsx
import { Select  } from '../Select'
import { useForm } from 'react-hook-form'

function CountrySelector() {
  const { control } = useForm()
  
  const countries: SelectOption[] = [
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
    { value: 'mx', label: 'Mexico' },
  ]

  return (
    <Select
      name="country"
      control={control}
      label="Select Country"
      options={countries}
      validation={{
        required: 'Please select a country',
      }}
    />
  )
}
\`\`\`

#### Key Features
- Form integration with React Hook Form
- Validation support
- Error state handling
- Disabled options
- Custom styling
- Accessibility compliant
- Focus and hover states
`,
      },
      canvas: { sourceState: 'hidden' },
      story: { 
        inline: true,
        height: '120px',
      },
      controls: { sort: 'requiredFirst' },
      source: { type: 'code' },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    options: {
      control: 'object',
      description: 'Array of options to select from',
    },
    label: {
      control: 'text',
      description: 'Label text displayed above the select',
    },
    description: {
      control: 'text',
      description: 'Helper text displayed below the select',
    },
    error: {
      control: 'text',
      description: 'Error message displayed below the select',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the select is disabled',
      table: {
        defaultValue: { summary: false },
      },
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for styling',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text when no option is selected',
    },
  },
}

export default meta
type Story = StoryObj<SelectProps>
type ControlledStory = StoryObj<SelectProps>

const sampleOptions = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue.js' },
  { value: 'angular', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'nextjs', label: 'Next.js' },
]

export const Default: Story = {
  args: {
    options: sampleOptions,
    placeholder: 'Select a framework',
  },
}

export const WithLabel: Story = {
  args: {
    options: sampleOptions,
    label: 'Framework',
    placeholder: 'Select a framework',
  },
}

export const WithDescription: Story = {
  args: {
    options: sampleOptions,
    label: 'Framework',
    description: 'Choose your preferred JavaScript framework',
    placeholder: 'Select a framework',
  },
}

export const WithError: Story = {
  args: {
    options: sampleOptions,
    label: 'Framework',
    error: 'Please select a framework',
    placeholder: 'Select a framework',
  },
}

export const Disabled: Story = {
  args: {
    options: sampleOptions,
    label: 'Framework',
    disabled: true,
    placeholder: 'Select a framework',
  },
}

export const WithDisabledOptions: Story = {
  args: {
    options: [
      { value: 'react', label: 'React' },
      { value: 'vue', label: 'Vue.js', disabled: true },
      { value: 'angular', label: 'Angular' },
      { value: 'svelte', label: 'Svelte', disabled: true },
      { value: 'nextjs', label: 'Next.js' },
    ],
    label: 'Framework',
    placeholder: 'Select a framework',
  },
}

export const WithCustomStyle: Story = {
  args: {
    options: sampleOptions,
    label: 'Framework',
    className: 'bg-base-200 border-2',
    placeholder: 'Select a framework',
  },
}

// Form-controlled examples
const FormExample = (args: any) => {
  const { control } = useForm({
    defaultValues: {
      field: '',
    },
  })

  return (
    <div className="w-full max-w-md">
      <Select
        name="field"
        control={control}
        {...args}
      />
    </div>
  )
}

export const WithValidation: ControlledStory = {
  render: (args) => <FormExample {...args} />,
  args: {
    label: 'Framework',
    options: sampleOptions,
    placeholder: 'Select a framework',
    validation: {
      required: 'Please select a framework',
    },
  },
}

export const WithCustomValidation: ControlledStory = {
  render: (args) => <FormExample {...args} />,
  args: {
    label: 'Framework',
    options: sampleOptions,
    placeholder: 'Select a framework',
    validation: {
      required: 'Please select a framework',
      validate: (value: string) =>
        value === 'angular' ? 'Sorry, Angular is not supported' : true,
    },
  },
} 
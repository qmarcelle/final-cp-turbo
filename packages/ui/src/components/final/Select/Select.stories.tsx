import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Select } from './Select'
import type { SelectProps } from './Select'
import { useForm, FormProvider } from 'react-hook-form'
import { FieldValues } from 'react-hook-form'

// Form wrapper component to provide form context
const FormExample = (args: Omit<SelectProps, 'name' | 'control'>) => {
  const { control } = useForm({
    defaultValues: {
      field: '',
    },
  })

  return (
    <div className="w-full max-w-md">
      <Select
        {...args}
        name="field"
        control={control}
      />
    </div>
  )
}

const meta = {
  title: '⚛️ Atoms/Select',
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
} satisfies Meta<SelectProps<FieldValues>>

export default meta
type Story = StoryObj<SelectProps<FieldValues>>

const sampleOptions = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue.js' },
  { value: 'angular', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'nextjs', label: 'Next.js' },
]

export const Default: Story = {
  render: (args) => <FormExample {...args} />,
  args: {
    options: sampleOptions,
    placeholder: 'Select a framework',
  },
}

export const WithLabel: Story = {
  render: (args) => <FormExample {...args} />,
  args: {
    options: sampleOptions,
    label: 'Framework',
    placeholder: 'Select a framework',
  },
}

export const WithDescription: Story = {
  render: (args) => <FormExample {...args} />,
  args: {
    options: sampleOptions,
    label: 'Framework',
    placeholder: 'Select a framework',
  },
}

export const WithError: Story = {
  render: (args) => {
    const { control } = useForm({
      defaultValues: {
        field: '',
      },
    })

    return (
      <form onSubmit={(e) => e.preventDefault()}>
        <Select
          {...args}
          name="field"
          control={control}
          rules={{ required: 'Please select a framework' }}
        />
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    )
  },
  args: {
    options: sampleOptions,
    label: 'Framework',
    placeholder: 'Select a framework',
  },
}

export const Disabled: Story = {
  render: (args) => <FormExample {...args} />,
  args: {
    options: sampleOptions,
    label: 'Framework',
    disabled: true,
    placeholder: 'Select a framework',
  },
}

export const WithDisabledOptions: Story = {
  render: (args) => <FormExample {...args} />,
  args: {
    options: [
      { value: 'react', label: 'React' },
      { value: 'vue', label: 'Vue.js' },
      { value: 'angular', label: 'Angular' },
      { value: 'svelte', label: 'Svelte' },
      { value: 'nextjs', label: 'Next.js' },
    ],
    label: 'Framework',
    placeholder: 'Select a framework',
  },
}

export const WithCustomStyle: Story = {
  render: (args) => <FormExample {...args} />,
  args: {
    options: sampleOptions,
    label: 'Framework',
    className: 'bg-base-200 border-2',
    placeholder: 'Select a framework',
  },
}

export const WithValidation: Story = {
  render: (args) => {
    const { control } = useForm({
      defaultValues: {
        field: '',
      },
    })

    return (
      <form onSubmit={(e) => e.preventDefault()}>
        <Select
          {...args}
          name="field"
          control={control}
          rules={{ required: 'Please select a framework' }}
        />
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    )
  },
  args: {
    options: sampleOptions,
    label: 'Framework',
    placeholder: 'Select a framework',
  },
}
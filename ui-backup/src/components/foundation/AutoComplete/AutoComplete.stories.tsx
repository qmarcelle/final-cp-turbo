import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { AutoComplete } from './AutoComplete'
import type { AutoCompleteOption } from './AutoComplete'

const meta = {
  title: 'Foundation/AutoComplete',
  component: AutoComplete,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
### AutoComplete

A combobox component that provides suggestions as users type, with support for both static and async options.

#### Usage

\`\`\`tsx
import { AutoComplete  } from '../AutoComplete'

function CountrySelector() {
  const [selectedCountry, setSelectedCountry] = useState('')
  
  const loadCountries = async (query: string) => {
    // Fetch countries from API based on query
    const response = await fetch(\`/api/countries?search=\${query}\`)
    const data = await response.json()
    return data.map((country: any) => ({
      value: country.code,
      label: country.name,
    }))
  }

  return (
    <AutoComplete
      value={selectedCountry}
      onChange={setSelectedCountry}
      loadOptions={loadCountries}
      placeholder="Select a country..."
    />
  )
}
\`\`\`

#### Key Features
- Dynamic option filtering
- Async option loading
- Keyboard navigation
- Disabled option support
- Customizable appearance
- Accessibility compliant
- Form integration ready
`,
      },
      canvas: { sourceState: 'hidden' },
      story: { 
        inline: true,
        height: '80px',
      },
      controls: { sort: 'requiredFirst' },
      source: { type: 'code' },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    value: { 
      control: 'text',
      description: 'Currently selected option value',
      table: {
        type: { summary: 'string' },
      },
    },
    options: { 
      control: 'object',
      description: 'Array of available options to select from',
      table: {
        type: { summary: 'AutoCompleteOption[]' },
      },
    },
    loadOptions: {
      control: false,
      description: 'Async function to load options based on user input',
      table: {
        type: { summary: '(query: string) => Promise<AutoCompleteOption[]>' },
      },
    },
    placeholder: { 
      control: 'text',
      description: 'Placeholder text when no option is selected',
      table: {
        defaultValue: { summary: 'Select an option' },
      },
    },
    className: { 
      control: 'text',
      description: 'Additional CSS classes for styling',
      table: {
        defaultValue: { summary: '' },
      },
    },
    onChange: { 
      action: 'changed',
      description: 'Called when selection changes with the new value',
      table: {
        type: { summary: '(value: string) => void' },
      },
    },
  },
} satisfies Meta<typeof AutoComplete>

export default meta
type Story = StoryObj<typeof AutoComplete>

const sampleOptions: AutoCompleteOption[] = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue.js' },
  { value: 'angular', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'nextjs', label: 'Next.js' },
]

export const Default: Story = {
  args: {
    value: '',
    options: sampleOptions,
    onChange: (value) => console.log('Selected value:', value),
  },
}

export const WithValue: Story = {
  args: {
    value: 'react',
    options: sampleOptions,
    onChange: (value) => console.log('Selected value:', value),
  },
}

export const WithDisabledOption: Story = {
  args: {
    value: '',
    options: [
      ...sampleOptions.slice(0, 2),
      { ...sampleOptions[2], disabled: true },
      ...sampleOptions.slice(3),
    ],
    onChange: (value) => console.log('Selected value:', value),
  },
}

export const WithCustomPlaceholder: Story = {
  args: {
    value: '',
    options: sampleOptions,
    placeholder: 'Select a framework...',
    onChange: (value) => console.log('Selected value:', value),
  },
}

export const WithAsyncOptions: Story = {
  args: {
    value: '',
    options: sampleOptions,
    loadOptions: async (query) => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      return sampleOptions.filter((option) =>
        option.label.toLowerCase().includes(query.toLowerCase())
      )
    },
    onChange: (value) => console.log('Selected value:', value),
  },
}

export const WithCustomClass: Story = {
  args: {
    value: '',
    options: sampleOptions,
    className: 'w-96 bg-gray-50',
    onChange: (value) => console.log('Selected value:', value),
  },
} 
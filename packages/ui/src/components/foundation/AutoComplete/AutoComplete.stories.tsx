import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { AutoComplete } from './AutoComplete'
import type { AutoCompleteOption } from '../../../types'

const meta = {
  title: '⚛️ Foundation/AutoComplete',
  component: AutoComplete,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# AutoComplete

A powerful combobox component that provides suggestions as users type. It supports both static and asynchronously loaded options.

## Features
- **Dynamic Filtering**: Filters options based on user input.
- **Asynchronous Loading**: Supports fetching options from a remote data source.
- **Accessible**: Fully navigable via keyboard, with ARIA support.
- **Form-Ready**: Designed for easy integration with form libraries.
- **Customizable**: Can be styled to fit any design system.

## When to Use
- When presenting a long list of options that would be cumbersome in a standard dropdown.
- For search inputs that can benefit from suggestions, like searching for providers, medications, or locations.
- When you need to fetch options from an API based on user input.

## Accessibility
- The component uses a combobox pattern with \`role="combobox"\`.
- ARIA attributes like \`aria-autocomplete\`, \`aria-expanded\`, and \`aria-controls\` are managed automatically.
- The list of options is presented with \`role="listbox"\`.
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
  tags: ['foundation', 'stable', 'autodocs'],
  argTypes: {
    value: { 
      control: 'text',
      description: 'The currently selected option value.',
      table: {
        type: { summary: 'string' },
      },
    },
    options: { 
      control: 'object',
      description: 'An array of available options to select from.',
      table: {
        type: { summary: 'AutoCompleteOption[]' },
      },
    },
    loadOptions: {
      control: false,
      description:
        'An asynchronous function to load options based on user input.',
      table: {
        type: { summary: '(query: string) => Promise<AutoCompleteOption[]>' },
      },
    },
    placeholder: { 
      control: 'text',
      description: 'The placeholder text to display when no option is selected.',
      table: {
        defaultValue: { summary: 'Select an option' },
      },
    },
    className: { 
      control: 'text',
      description: 'Custom CSS classes for additional styling.',
      table: {
        defaultValue: { summary: '' },
      },
    },
    onChange: { 
      action: 'changed',
      description:
        'A callback that fires when the selection changes, providing the new value.',
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

export const HealthcareExamples: Story = {
  name: 'Healthcare Use Cases',
  render: () => {
    const [provider, setProvider] = useState('')
    const [medication, setMedication] = useState('')
    const [condition, setCondition] = useState('')

    const providerOptions: AutoCompleteOption[] = [
      { value: 'p1', label: 'Dr. Alice Williams (Cardiology)' },
      { value: 'p2', label: 'Dr. Bob Johnson (Dermatology)' },
      { value: 'p3', label: 'Sunshine Medical Center' },
    ]
    const medicationOptions: AutoCompleteOption[] = [
      { value: 'm1', label: 'Lisinopril 10mg' },
      { value: 'm2', label: 'Metformin 500mg' },
      { value: 'm3', label: 'Atorvastatin 20mg' },
    ]
    const conditionOptions: AutoCompleteOption[] = [
      { value: 'i10', label: 'I10 - Essential (primary) hypertension' },
      { value: 'e11', label: 'E11 - Type 2 diabetes mellitus' },
      { value: 'j45', label: 'J45 - Asthma' },
    ]

    const loadOptions = async (
      query: string,
      options: AutoCompleteOption[]
    ) => {
      await new Promise(resolve => setTimeout(resolve, 300))
      return options.filter(option =>
        option.label.toLowerCase().includes(query.toLowerCase())
      )
    }

    return (
      <div className="space-y-8 max-w-lg">
        <div>
          <h3 className="font-semibold mb-2">Provider Search</h3>
          <AutoComplete
            value={provider}
            onChange={setProvider}
            options={[]}
            loadOptions={query => loadOptions(query, providerOptions)}
            placeholder="Search for a provider or facility..."
          />
        </div>
        <div>
          <h3 className="font-semibold mb-2">Medication Lookup</h3>
          <AutoComplete
            value={medication}
            onChange={setMedication}
            options={[]}
            loadOptions={query => loadOptions(query, medicationOptions)}
            placeholder="Enter a medication name..."
          />
        </div>
        <div>
          <h3 className="font-semibold mb-2">
            Medical Condition (ICD-10)
          </h3>
          <AutoComplete
            value={condition}
            onChange={setCondition}
            options={[]}
            loadOptions={query => loadOptions(query, conditionOptions)}
            placeholder="Search by condition or ICD-10 code..."
          />
        </div>
      </div>
    )
  },
}
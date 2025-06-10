import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { SearchBar } from './SearchBar'
import type { SearchSuggestion } from './SearchBar'

const meta = {
  title: '⚛️ Foundation/SearchBar',
  component: SearchBar,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# Search Bar

A powerful and flexible search component with asynchronous suggestions, advanced search capabilities, and full accessibility support.

## Features
- **Real-time Suggestions**: Provides instant feedback as the user types.
- **Asynchronous Loading**: Fetches suggestions from an API on the fly.
- **Advanced Search**: An optional toggle for more complex search queries.
- **Keyboard Navigation**: Fully navigable using the keyboard.
- **Customizable**: Can be styled and configured to fit various use cases.

## When to Use
- When you need a primary search input for your application.
- Ideal for searching large datasets, such as members, providers, or documents.
- Use asynchronous suggestions to provide a better user experience for large lists.

## Accessibility
- The input has \`role="combobox"\` to support assistive technologies.
- Suggestions are presented in a list with \`role="listbox"\`.
- ARIA attributes like \`aria-expanded\` and \`aria-controls\` are used to manage state.
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
      description: 'The current value of the search input.',
      table: {
        type: { summary: 'string' },
      },
    },
    suggestions: { 
      control: 'object',
      description: 'A static list of search suggestions to display.',
      table: {
        type: { summary: 'SearchSuggestion[]' },
      },
    },
    loadSuggestions: {
      control: false,
      description:
        'An asynchronous function to load suggestions as the user types.',
      table: {
        type: { summary: '(query: string) => Promise<SearchSuggestion[]>' },
      },
    },
    placeholder: { 
      control: 'text',
      description: 'The placeholder text to display when the input is empty.',
      table: {
        defaultValue: { summary: 'Search...' },
      },
    },
    showAdvancedSearch: { 
      control: 'boolean',
      description: 'If true, shows a toggle for an advanced search mode.',
      table: {
        defaultValue: { summary: 'false' },
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
      description: 'Callback fired when the input value changes.',
      table: {
        type: { summary: '(value: string) => void' },
      },
    },
    onSearch: { 
      action: 'searched',
      description:
        'Callback fired when a search is triggered (e.g., Enter key).',
      table: {
        type: { summary: '(value: string) => void' },
      },
    },
  },
} satisfies Meta<typeof SearchBar>

export default meta
type Story = StoryObj<typeof SearchBar>

const sampleSuggestions: SearchSuggestion[] = [
  {
    id: '1',
    label: 'React Components',
    description: 'UI components built with React',
    category: 'Development',
  },
  {
    id: '2',
    label: 'TypeScript Types',
    description: 'Type definitions and interfaces',
    category: 'Development',
  },
  {
    id: '3',
    label: 'API Documentation',
    description: 'REST API endpoints and usage',
    category: 'Documentation',
  },
  {
    id: '4',
    label: 'Deployment Guide',
    description: 'How to deploy the application',
    category: 'Documentation',
  },
]

export const Default: Story = {
  args: {
    value: '',
    onChange: (value) => console.log('Value changed:', value),
    onSearch: (value) => console.log('Search triggered:', value),
  },
}

export const WithValue: Story = {
  args: {
    value: 'React',
    onChange: (value) => console.log('Value changed:', value),
    onSearch: (value) => console.log('Search triggered:', value),
  },
}

export const WithSuggestions: Story = {
  args: {
    value: '',
    suggestions: sampleSuggestions,
    onChange: (value) => console.log('Value changed:', value),
    onSearch: (value) => console.log('Search triggered:', value),
  },
}

export const WithAsyncSuggestions: Story = {
  args: {
    value: '',
    loadSuggestions: async (query) => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      return sampleSuggestions.filter(
        (suggestion) =>
          suggestion.label.toLowerCase().includes(query.toLowerCase()) ||
          suggestion.description?.toLowerCase().includes(query.toLowerCase())
      )
    },
    onChange: (value) => console.log('Value changed:', value),
    onSearch: (value) => console.log('Search triggered:', value),
  },
}

export const WithAdvancedSearch: Story = {
  args: {
    value: '',
    showAdvancedSearch: true,
    onChange: (value) => console.log('Value changed:', value),
    onSearch: (value) => console.log('Search triggered:', value),
  },
}

export const WithCustomPlaceholder: Story = {
  args: {
    value: '',
    placeholder: 'Search documentation...',
    onChange: (value) => console.log('Value changed:', value),
    onSearch: (value) => console.log('Search triggered:', value),
  },
}

export const WithCustomClass: Story = {
  args: {
    value: '',
    className: 'w-96 bg-gray-50',
    onChange: (value) => console.log('Value changed:', value),
    onSearch: (value) => console.log('Search triggered:', value),
  },
}

export const HealthcareExamples: Story = {
  name: 'Healthcare Use Cases',
  render: () => {
    const [providerValue, setProviderValue] = React.useState('')
    const [medicationValue, setMedicationValue] = React.useState('')
    const [memberValue, setMemberValue] = React.useState('')

    const providers = [
      { id: 'p1', label: 'Dr. John Appleseed', description: 'Cardiology' },
      { id: 'p2', label: 'Dr. Jane Doe', description: 'Dermatology' },
      { id: 'p3', label: 'Dr. Peter Jones', description: 'Pediatrics' },
    ]
    const medications = [
      { id: 'm1', label: 'Lisinopril', description: 'Tier 1' },
      { id: 'm2', label: 'Metformin', description: 'Tier 2' },
      { id: 'm3', label: 'Amoxicillin', description: 'Tier 1' },
    ]
    const members = [
      { id: 'mem1', label: 'John Smith (ID: 12345)', description: 'PPO Plan' },
      { id: 'mem2', label: 'Jane Smith (ID: 67890)', description: 'HMO Plan' },
    ]

    const loadProviderSuggestions = async (query: string) => {
      await new Promise(resolve => setTimeout(resolve, 500))
      return providers.filter(p =>
        p.label.toLowerCase().includes(query.toLowerCase())
      )
    }

    const loadMedicationSuggestions = async (query: string) => {
      await new Promise(resolve => setTimeout(resolve, 500))
      return medications.filter(m =>
        m.label.toLowerCase().includes(query.toLowerCase())
      )
    }

    const loadMemberSuggestions = async (query: string) => {
      await new Promise(resolve => setTimeout(resolve, 500))
      return members.filter(m =>
        m.label.toLowerCase().includes(query.toLowerCase())
      )
    }

    return (
      <div className="space-y-8 max-w-lg">
        <div>
          <h3 className="font-semibold mb-2">Provider Search</h3>
          <SearchBar
            value={providerValue}
            onChange={setProviderValue}
            placeholder="Search for a doctor or specialist..."
            loadSuggestions={loadProviderSuggestions}
          />
        </div>
        <div>
          <h3 className="font-semibold mb-2">Medication Formulary Lookup</h3>
          <SearchBar
            value={medicationValue}
            onChange={setMedicationValue}
            placeholder="Search for a medication..."
            loadSuggestions={loadMedicationSuggestions}
          />
        </div>
        <div>
          <h3 className="font-semibold mb-2">Member Search</h3>
          <SearchBar
            value={memberValue}
            onChange={setMemberValue}
            placeholder="Search by member name or ID..."
            loadSuggestions={loadMemberSuggestions}
            showAdvancedSearch
          />
        </div>
      </div>
    )
  },
} 
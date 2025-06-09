import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { SearchBar } from './SearchBar'
import type { SearchSuggestion } from './SearchBar'

const meta = {
  title: '🧬 Molecules/SearchBar',
  component: SearchBar,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
### SearchBar

A versatile search input component with support for suggestions, async loading, and advanced search options.

#### Usage

\`\`\`tsx
import { SearchBar  } from '../SearchBar'

function SearchPage() {
  const handleSearch = (value: string) => {
    // Perform search
  }

  const loadSuggestions = async (query: string) => {
    // Load suggestions from API
    return [
      { id: '1', label: 'Suggestion 1', description: 'Description 1' },
      { id: '2', label: 'Suggestion 2', description: 'Description 2' },
    ]
  }

  return (
    <SearchBar
      value={searchValue}
      onChange={setSearchValue}
      onSearch={handleSearch}
      loadSuggestions={loadSuggestions}
      showAdvancedSearch
    />
  )
}
\`\`\`

#### Key Features
- Real-time suggestions
- Async suggestion loading
- Advanced search toggle
- Keyboard navigation
- Customizable appearance
- Accessibility support
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
      description: 'Current value of the search input',
      table: {
        type: { summary: 'string' },
      },
    },
    suggestions: { 
      control: 'object',
      description: 'Static list of search suggestions to display',
      table: {
        type: { summary: 'SearchSuggestion[]' },
      },
    },
    loadSuggestions: {
      control: false,
      description: 'Async function to load suggestions as user types',
      table: {
        type: { summary: '(query: string) => Promise<SearchSuggestion[]>' },
      },
    },
    placeholder: { 
      control: 'text',
      description: 'Placeholder text when input is empty',
      table: {
        defaultValue: { summary: 'Search...' },
      },
    },
    showAdvancedSearch: { 
      control: 'boolean',
      description: 'Shows or hides the advanced search toggle',
      table: {
        defaultValue: { summary: 'false' },
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
      description: 'Called when input value changes',
      table: {
        type: { summary: '(value: string) => void' },
      },
    },
    onSearch: { 
      action: 'searched',
      description: 'Called when search is triggered (Enter key or search button)',
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
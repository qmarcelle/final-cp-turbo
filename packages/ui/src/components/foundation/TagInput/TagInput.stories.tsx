import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { TagInput } from './TagInput'
import type { Tag } from '../../../types'

const meta = {
  title: '⚛️ Foundation/TagInput',
  component: TagInput,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# Tag Input

A component for inputting and managing a list of tags. It supports suggestions, custom tag creation, and validation.

## Features
- **Tag Suggestions**: Offers a predefined list of tags that can be filtered.
- **Custom Tags**: Allows users to create new tags on the fly.
- **Tag Limits**: Control the maximum number of tags that can be added.
- **Accessible**: Supports keyboard navigation for managing tags.
- **Form-Friendly**: Designed to be integrated into forms.

## When to Use
- When users need to input multiple, distinct values, such as keywords, skills, or medical conditions.
- Ideal for categorization or labeling items.
- Use when the number of potential options is large, and suggestions can help guide the user.

## Accessibility
- The input field is accessible and can be focused.
- Tags can be added and removed using the keyboard (e.g., Enter to add, Backspace to remove).
- Suggestions are displayed in an accessible manner.
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
      control: 'object',
      description: 'An array of the currently selected tags.',
      table: {
        type: { summary: 'Tag[]' },
      },
    },
    suggestions: { 
      control: 'object',
      description: 'A list of predefined tags that users can select from.',
      table: {
        type: { summary: 'Tag[]' },
      },
    },
    maxTags: { 
      control: 'number',
      description: 'The maximum number of tags that can be selected.',
      table: {
        defaultValue: { summary: 'unlimited' },
        type: { summary: 'number' },
      },
    },
    placeholder: { 
      control: 'text',
      description: 'The placeholder text to display when the input is empty.',
      table: {
        defaultValue: { summary: 'Type and press Enter to add tags' },
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
      description: 'A callback that fires when the list of tags changes.',
      table: {
        type: { summary: '(tags: Tag[]) => void' },
      },
    },
  },
} satisfies Meta<typeof TagInput>

export default meta
type Story = StoryObj<typeof TagInput>

const sampleTags: Tag[] = [
  { id: '1', label: 'React' },
  { id: '2', label: 'TypeScript' },
  { id: '3', label: 'JavaScript' },
  { id: '4', label: 'Next.js' },
  { id: '5', label: 'TailwindCSS' },
  { id: '6', label: 'Node.js' },
]

export const Default: Story = {
  args: {
    value: [],
    onChange: (tags) => console.log('Tags changed:', tags),
  },
}

export const WithValue: Story = {
  args: {
    value: sampleTags.slice(0, 2),
    onChange: (tags) => console.log('Tags changed:', tags),
  },
}

export const WithSuggestions: Story = {
  args: {
    value: [],
    suggestions: sampleTags,
    onChange: (tags) => console.log('Tags changed:', tags),
  },
}

export const WithMaxTags: Story = {
  args: {
    value: sampleTags.slice(0, 2),
    maxTags: 3,
    suggestions: sampleTags,
    onChange: (tags) => console.log('Tags changed:', tags),
  },
}

export const WithCustomPlaceholder: Story = {
  args: {
    value: [],
    placeholder: 'Add programming languages...',
    onChange: (tags) => console.log('Tags changed:', tags),
  },
}

export const InteractiveExample: Story = {
  render: () => {
    const [selectedTags, setSelectedTags] = useState<Tag[]>([
      { id: '1', label: 'React' }
    ])

    return (
      <div className="w-96 space-y-4">
        <div>
          <h3 className="text-lg font-medium mb-2">🛠️ Tech Stack</h3>
          <TagInput
            value={selectedTags}
            onChange={setSelectedTags}
            suggestions={sampleTags}
            placeholder="Add technologies..."
            maxTags={6}
          />
        </div>
        
        <div className="text-sm text-gray-600 p-3 bg-gray-50 rounded">
          <strong>Selected ({selectedTags.length}/6):</strong>{' '}
          {selectedTags.length > 0 
            ? selectedTags.map(tag => tag.label).join(', ')
            : 'None'
          }
        </div>
      </div>
    )
  }
}

export const WithCustomClass: Story = {
  args: {
    value: [],
    className: 'w-96 bg-gray-50 rounded-lg',
    onChange: (tags) => console.log('Tags changed:', tags),
  },
}

export const HealthcareExamples: Story = {
  name: 'Healthcare Use Cases',
  render: () => {
    const [conditions, setConditions] = useState<Tag[]>([
      { id: 'hbp', label: 'Hypertension' },
    ])
    const [allergies, setAllergies] = useState<Tag[]>([])
    const [symptoms, setSymptoms] = useState<Tag[]>([
      { id: 'headache', label: 'Headache' },
    ])

    const conditionSuggestions: Tag[] = [
      { id: 'hbp', label: 'Hypertension' },
      { id: 'diabetes', label: 'Diabetes' },
      { id: 'asthma', label: 'Asthma' },
    ]
    const allergySuggestions: Tag[] = [
      { id: 'pollen', label: 'Pollen' },
      { id: 'penicillin', label: 'Penicillin' },
      { id: 'peanuts', label: 'Peanuts' },
    ]
    const symptomSuggestions: Tag[] = [
      { id: 'headache', label: 'Headache' },
      { id: 'fever', label: 'Fever' },
      { id: 'cough', label: 'Cough' },
    ]

    return (
      <div className="space-y-8 max-w-lg">
        <div>
          <h3 className="font-semibold mb-2">Patient Medical Conditions</h3>
          <TagInput
            value={conditions}
            onChange={setConditions}
            suggestions={conditionSuggestions}
            placeholder="Add a medical condition..."
          />
        </div>
        <div>
          <h3 className="font-semibold mb-2">Known Allergies</h3>
          <TagInput
            value={allergies}
            onChange={setAllergies}
            suggestions={allergySuggestions}
            placeholder="Add an allergy..."
          />
        </div>
        <div>
          <h3 className="font-semibold mb-2">Reported Symptoms</h3>
          <TagInput
            value={symptoms}
            onChange={setSymptoms}
            suggestions={symptomSuggestions}
            placeholder="Add a symptom..."
          />
        </div>
      </div>
    )
  },
}
import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { TagInput } from './TagInput'
import type { Tag } from './TagInput'

const meta = {
  title: '🧬 Molecules/TagInput',
  component: TagInput,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# 🏷️ TagInput

A versatile input component for managing multiple tags or labels, with support for suggestions and validation.

## Features
- **Tag suggestions**: Predefined tags with filtering
- **Custom tags**: Create new tags on the fly
- **Maximum limit**: Control the number of tags
- **Keyboard navigation**: Full keyboard accessibility
- **Tag removal**: Easy tag deletion
- **Form integration**: Works with form libraries
- **Validation**: Error states and required fields

## Usage

\`\`\`tsx
import { TagInput } from '@portals/ui'

function SkillsSelector() {
  const [skills, setSkills] = useState<Tag[]>([])
  
  const skillSuggestions: Tag[] = [
    { id: 'react', label: 'React' },
    { id: 'typescript', label: 'TypeScript' },
    { id: 'nodejs', label: 'Node.js' },
  ]

  return (
    <TagInput
      value={skills}
      onChange={setSkills}
      suggestions={skillSuggestions}
      maxTags={5}
      placeholder="Add skills..."
    />
  )
}
\`\`\`
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
      control: 'object',
      description: 'Array of currently selected tags',
      table: {
        type: { summary: 'Tag[]' },
      },
    },
    suggestions: { 
      control: 'object',
      description: 'Predefined tags that can be selected',
      table: {
        type: { summary: 'Tag[]' },
      },
    },
    maxTags: { 
      control: 'number',
      description: 'Maximum number of tags that can be selected',
      table: {
        defaultValue: { summary: 'unlimited' },
        type: { summary: 'number' },
      },
    },
    placeholder: { 
      control: 'text',
      description: 'Placeholder text shown when no tags are selected',
      table: {
        defaultValue: { summary: 'Type and press Enter to add tags' },
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
      description: 'Called when tags are added or removed',
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
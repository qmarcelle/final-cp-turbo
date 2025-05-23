import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { TagInput } from './TagInput'
import type { Tag } from './TagInput'

const meta = {
  title: 'Foundation/TagInput',
  component: TagInput,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
### TagInput

A versatile input component for managing multiple tags or labels, with support for suggestions and validation.

#### Usage

\`\`\`tsx
import { TagInput  } from '../TagInput'

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

#### Key Features
- Tag suggestions with filtering
- Maximum tag limit
- Keyboard navigation
- Tag removal
- Custom tag creation
- Form integration
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
    suggestions: [
      ...sampleTags,
      { id: '4', label: 'Next.js' },
      { id: '5', label: 'TailwindCSS' },
    ],
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

export const WithCustomClass: Story = {
  args: {
    value: [],
    className: 'w-96 bg-gray-50 rounded-lg',
    onChange: (tags) => console.log('Tags changed:', tags),
  },
} 
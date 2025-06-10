import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { TextArea, ControlledTextArea } from './TextArea'
import { useForm } from 'react-hook-form'
import type { ComponentProps } from 'react'

type BaseTextAreaProps = ComponentProps<typeof TextArea>
type ControlledTextAreaProps = ComponentProps<typeof ControlledTextArea>

const meta = {
  title: '⚛️ Foundation/TextArea',
  component: TextArea as any,
  parameters: {
    layout: 'centered',
    tags: ['foundation', 'stable'],
    docs: {
      description: {
        component: `
# TextArea

Multi-line text input component with validation support and form integration for longer content entry.

## Features
- **Multiple variants**: Basic and controlled versions for different use cases
- **Flexible sizing**: Configurable rows and responsive width handling
- **Form integration**: Built-in React Hook Form support with validation
- **Validation states**: Error handling with custom error messages
- **Accessibility**: Full ARIA support and screen reader compatibility
- **Customizable styling**: Supports custom classes and theming
- **Auto-resize**: Optional automatic height adjustment based on content
- **Character limits**: Built-in support for character counting and limits

## Usage

\`\`\`tsx
import { TextArea, ControlledTextArea } from '@portals/ui';

// Basic textarea
<TextArea
  placeholder="Enter your message"
  rows={4}
  onChange={handleChange}
/>

// Controlled with validation
<ControlledTextArea
  name="message"
  control={control}
  label="Your Message"
  placeholder="Type here..."
  validation={{
    required: 'Message is required',
    minLength: { value: 10, message: 'Too short' }
  }}
  rows={6}
/>

// With description and error handling
<ControlledTextArea
  label="Bio"
  description="Tell us about yourself"
  error={errors.bio?.message}
  placeholder="I am..."
/>
\`\`\`

## When to use
- Collect longer text inputs like comments or descriptions
- Multi-line form fields requiring validation
- User feedback and review entry
- Bio or profile description fields
- Any content requiring more than a single line

## Accessibility
- Proper ARIA labels and descriptions
- Clear focus indicators and keyboard navigation
- Screen reader compatible error announcements
- High contrast support for all states
- Proper form association and labeling
        `
      }
    }
  },
  argTypes: {
    rows: {
      control: { type: 'number', min: 2, max: 20 },
      description: 'Number of visible text lines',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '4' },
      },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text when empty',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the textarea is disabled',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    label: {
      control: 'text',
      description: 'Label text for the textarea',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    description: {
      control: 'text',
      description: 'Helper text displayed below the label',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    error: {
      control: 'text',
      description: 'Error message to display',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    'data-cy': {
      control: 'text',
      description: 'Cypress testing attribute',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
  },
} satisfies Meta<BaseTextAreaProps>

export default meta
type Story = StoryObj<BaseTextAreaProps>
type ControlledStory = StoryObj<ControlledTextAreaProps>

// Basic TextArea Stories
export const Default: Story = {
  args: {
    placeholder: 'Enter text here...',
    rows: 4,
    'data-cy': 'default-textarea',
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic textarea with placeholder and default height. Use for simple multi-line text input.',
      },
    },
  },
}

export const Tall: Story = {
  args: {
    placeholder: 'Enter long text here...',
    rows: 8,
    'data-cy': 'tall-textarea',
  },
  parameters: {
    docs: {
      description: {
        story: 'Taller textarea for longer content entry. Ideal for detailed descriptions or comments.',
      },
    },
  },
}

export const WithCustomClass: Story = {
  args: {
    placeholder: 'Custom styled textarea',
    className: 'max-w-md bg-gray-50 dark:bg-gray-800',
    rows: 4,
    'data-cy': 'custom-textarea',
  },
  parameters: {
    docs: {
      description: {
        story: 'Textarea with custom styling classes for specific design requirements.',
      },
    },
  },
}

export const Disabled: Story = {
  args: {
    placeholder: 'This textarea is disabled',
    rows: 4,
    disabled: true,
    'data-cy': 'disabled-textarea',
  },
  parameters: {
    docs: {
      description: {
        story: 'Disabled textarea showing non-interactive state for read-only or unavailable fields.',
      },
    },
  },
}

// Controlled TextArea Stories
const ControlledTextAreaTemplate: ControlledStory = {
  render: function Render(args) {
    const { control } = useForm({
      defaultValues: {
        field: '',
      },
    })

    return (
      <div className="w-96">
        <ControlledTextArea {...args} control={control} name="field" />
      </div>
    )
  },
}

export const WithValidation = {
  ...ControlledTextAreaTemplate,
  args: {
    name: 'field',
    placeholder: 'Enter your message',
    rows: 4,
    'data-cy': 'validation-textarea',
    label: 'Message',
    validation: {
      required: 'Message is required',
      minLength: {
        value: 10,
        message: 'Message must be at least 10 characters',
      },
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Controlled textarea with validation rules. Shows error messages for required fields and minimum length.',
      },
    },
  },
} as ControlledStory

export const WithLabel = {
  ...ControlledTextAreaTemplate,
  args: {
    label: 'Your Message',
    placeholder: 'Type your message here',
    rows: 4,
    'data-cy': 'labeled-textarea',
  },
  parameters: {
    docs: {
      description: {
        story: 'Textarea with a clear label for better user understanding and accessibility.',
      },
    },
  },
} as ControlledStory

export const WithDescription = {
  ...ControlledTextAreaTemplate,
  args: {
    label: 'Bio',
    description: 'Tell us about yourself in a few sentences',
    placeholder: 'I am...',
    rows: 6,
    'data-cy': 'description-textarea',
  },
  parameters: {
    docs: {
      description: {
        story: 'Textarea with helpful description text to guide user input and set expectations.',
      },
    },
  },
} as ControlledStory

export const WithError = {
  ...ControlledTextAreaTemplate,
  args: {
    label: 'Comments',
    error: 'Please provide valid comments',
    placeholder: 'Enter your comments',
    rows: 4,
    'data-cy': 'error-textarea',
  },
  parameters: {
    docs: {
      description: {
        story: 'Textarea in error state showing validation feedback to help users correct their input.',
      },
    },
  },
} as ControlledStory

export const MemberFeedback: Story = {
  render: () => (
    <div className="max-w-lg space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-4">Member Feedback Form</h3>
      </div>
      
      <div className="space-y-4">
        <TextArea
          name="experience"
          placeholder="What did you like about your recent experience?"
          rows={3}
          className="w-full"
        />
        
        <TextArea
          name="improvements"
          placeholder="How can we improve our services?"
          rows={4}
          className="w-full"
        />
        
        <TextArea
          name="additional"
          placeholder="Additional comments or suggestions..."
          rows={5}
          className="w-full"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Multiple textareas in a feedback form showing different heights for various types of input.',
      },
    },
  },
}

export const SizesComparison: Story = {
  render: () => (
    <div className="space-y-4 max-w-lg">
      <div>
        <label className="block text-sm font-medium mb-1">Compact (2 rows)</label>
        <TextArea
          name="compact"
          placeholder="Brief description..."
          rows={2}
          className="w-full"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Standard (4 rows)</label>
        <TextArea
          name="standard"
          placeholder="Standard description..."
          rows={4}
          className="w-full"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Large (8 rows)</label>
        <TextArea
          name="large"
          placeholder="Detailed description..."
          rows={8}
          className="w-full"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comparison of different textarea sizes showing how row count affects the component height.',
      },
    },
  },
} 
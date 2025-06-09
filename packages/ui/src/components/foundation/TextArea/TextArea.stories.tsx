import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { TextArea, ControlledTextArea } from './TextArea'
import { useForm } from 'react-hook-form'
import type { ComponentProps } from 'react'

type BaseTextAreaProps = ComponentProps<typeof TextArea>
type ControlledTextAreaProps = ComponentProps<typeof ControlledTextArea>

const meta = {
  title: '⚛️ Atoms/TextArea',
  component: TextArea as any,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    rows: { control: { type: 'number', min: 2, max: 20 } },
    className: { control: 'text' },
    'data-cy': { control: 'text' },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
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
}

export const Tall: Story = {
  args: {
    placeholder: 'Enter long text here...',
    rows: 8,
    'data-cy': 'tall-textarea',
  },
}

export const WithCustomClass: Story = {
  args: {
    placeholder: 'Custom styled textarea',
    className: 'max-w-md bg-gray-50 dark:bg-gray-800',
    rows: 4,
    'data-cy': 'custom-textarea',
  },
}

export const Disabled: Story = {
  args: {
    placeholder: 'This textarea is disabled',
    rows: 4,
    disabled: true,
    'data-cy': 'disabled-textarea',
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
} as ControlledStory

export const WithLabel = {
  ...ControlledTextAreaTemplate,
  args: {
    label: 'Your Message',
    placeholder: 'Type your message here',
    rows: 4,
    'data-cy': 'labeled-textarea',
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
} as ControlledStory 
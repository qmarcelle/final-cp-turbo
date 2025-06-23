import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { FormActions } from './FormActions'
import { Button } from '../Button/Button'
import type { FormActionsProps } from './FormActions'

const meta = {
  title: '🦠 Organisms/FormActions',
  component: FormActions,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# Form Actions

A flexible container component for form action buttons that handles different alignment patterns.

## Features
- Multiple alignment options (left, center, right, between)
- Consistent button spacing
- Responsive layout
- Customizable styling
- Integration with Button component
- Accessibility support

## Usage

\`\`\`tsx
import { FormActions } from './FormActions';
import { Button } from '../Button';

function MyForm() {
  return (
    <form>
      {/* form fields */}
      <FormActions align="right">
        <Button variant="secondary">Cancel</Button>
        <Button variant="primary">Submit</Button>
      </FormActions>
    </form>
  );
}
\`\`\`
`
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
    align: {
      control: 'select',
      options: ['left', 'center', 'right', 'between'],
      description: 'Controls the horizontal alignment of the action buttons',
      table: {
        defaultValue: { summary: 'right' },
        type: { summary: "'left' | 'center' | 'right' | 'between'" },
      },
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes to customize the container',
      table: {
        defaultValue: { summary: '' },
        type: { summary: 'string' },
      },
    },
    children: {
      control: false,
      description: 'Action buttons or other elements to be rendered',
      table: {
        type: { summary: 'React.ReactNode' },
      },
    },
  },
} satisfies Meta<FormActionsProps>

export default meta
type Story = StoryObj<FormActionsProps>

export const Default: Story = {
  args: {
    children: (
      <>
        <Button variant="secondary">Back</Button>
        <Button variant="primary">Next</Button>
      </>
    ),
  },
}

export const LeftAligned: Story = {
  args: {
    align: 'left',
    children: (
      <>
        <Button variant="secondary">Back</Button>
        <Button>Next</Button>
      </>
    ),
  },
}

export const CenterAligned: Story = {
  args: {
    align: 'center',
    children: (
      <>
        <Button variant="secondary">Reset</Button>
        <Button>Save</Button>
      </>
    ),
  },
}

export const RightAligned: Story = {
  args: {
    align: 'right',
    children: (
      <>
        <Button variant="secondary">Cancel</Button>
        <Button>Confirm</Button>
      </>
    ),
  },
}

export const SpaceBetween: Story = {
  args: {
    align: 'between',
    children: (
      <>
        <Button variant="secondary">Previous Step</Button>
        <Button>Continue</Button>
      </>
    ),
  },
}

export const WithCustomClass: Story = {
  args: {
    className: 'bg-gray-50 p-4 rounded-lg',
    children: (
      <>
        <Button variant="secondary">Cancel</Button>
        <Button variant="primary">Submit</Button>
      </>
    ),
  },
}

export const WithSingleButton: Story = {
  args: {
    children: <Button variant="primary">Submit</Button>,
  },
}

export const WithMultipleButtons: Story = {
  args: {
    children: (
      <>
        <Button variant="secondary">Cancel</Button>
        <Button variant="secondary">Save Draft</Button>
        <Button variant="primary">Submit</Button>
      </>
    ),
  },
}
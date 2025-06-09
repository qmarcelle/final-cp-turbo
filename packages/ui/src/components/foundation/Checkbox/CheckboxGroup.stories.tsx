import type { Meta, StoryObj } from '@storybook/react-vite'
import { CheckboxGroup } from './CheckboxGroup'
import { useState } from 'react'

const meta: Meta<typeof CheckboxGroup> = {
  title: '⚛️ Atoms/CheckboxGroup (Deprecated)',
  component: CheckboxGroup,
  parameters: {
    docs: {
      description: {
        component: '**This component is deprecated and will be removed in a future version.**',
      },
    },
  },
  argTypes: {
    // Hide controls as this component is deprecated
  },
}

export default meta
type Story = StoryObj<typeof CheckboxGroup>

const defaultOptions = [
  { label: 'Option A', value: 'a' },
  { label: 'Option B', value: 'b' },
  { label: 'Option C', value: 'c' },
]

export const Deprecated: Story = {
  render: () => (
    <div className="p-4 border border-red-500 rounded-lg bg-red-50 text-red-700">
      This component is deprecated.
    </div>
  ),
}

export const Default: Story = {
  render: (args) => {
    const [values, setValues] = useState(['b'])
    return (
      <CheckboxGroup
        {...args}
        values={values}
        onChange={setValues}
      />
    )
  },
  args: {
    options: defaultOptions,
  },
}

export const Horizontal: Story = {
  ...Default,
  args: {
    ...Default.args,
    orientation: 'horizontal',
  },
}

export const WithoutSelectAll: Story = {
    ...Default,
    args: {
      ...Default.args,
      selectAllLabel: '',
    },
  } 
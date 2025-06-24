import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { userEvent, within, expect } from 'storybook/test'
import { useForm, FormProvider } from 'react-hook-form'
import { Select } from './Select'
import { getStoryMeta } from '../../utils/getStoryMeta'
import { mockBrokers, mockGroups } from '../../utils/mockData'
import type { SelectProps } from './Select'

interface FormWrapperProps {
  children: React.ReactElement<Omit<SelectProps<any>, 'name' | 'control'>>
  defaultValue?: string
  fieldName?: string
}

// Form wrapper for consistent form context
const FormWrapper: React.FC<FormWrapperProps> = ({
  children,
  defaultValue = '',
  fieldName = 'field',
}) => {
  const methods = useForm({
    defaultValues: {
      [fieldName]: defaultValue,
    },
  })

  return (
    <FormProvider {...methods}>
      {React.cloneElement(children, {
        name: fieldName,
        control: methods.control,
      } as any)}
    </FormProvider>
  )
}

const meta = {
  title: '⚛️ Atoms/📝 Select',
  component: Select,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Select dropdown component with single/multi-select support and broker portal data integration',
      },
    },
  },
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

// Basic Select Examples
export const Default: Story = {
  args: {
    placeholder: 'Select an option...',
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
    ],
  },
  render: args => (
    <FormWrapper>
      <Select {...args} />
    </FormWrapper>
  ),
}

export const WithValue: Story = {
  args: {
    placeholder: 'Select an option...',
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
    ],
  },
  render: args => (
    <FormWrapper defaultValue="option2">
      <Select {...args} />
    </FormWrapper>
  ),
}

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled select',
    disabled: true,
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
    ],
  },
  render: args => (
    <FormWrapper>
      <Select {...args} />
    </FormWrapper>
  ),
}

export const WithError: Story = {
  args: {
    placeholder: 'Select plan type',
    options: [
      { value: 'ppo', label: 'PPO' },
      { value: 'hmo', label: 'HMO' },
      { value: 'hdhp', label: 'HDHP' },
    ],
    rules: { required: 'Please select a plan type' },
  },
  render: args => (
    <div className="space-y-2">
      <label className="text-sm font-medium">Plan Type</label>
      <FormWrapper fieldName="planType">
        <Select {...args} />
      </FormWrapper>
      <p className="text-sm text-red-600">Please select a plan type</p>
    </div>
  ),
}

// Broker Portal Specific Examples
export const BrokerSelect: Story = {
  args: {
    placeholder: 'Select broker...',
    options: mockBrokers.map(broker => ({
      value: broker.id,
      label: `${broker.name} - ${broker.agencyName}`,
    })),
  },
  render: args => (
    <FormWrapper fieldName="broker">
      <Select {...args} />
    </FormWrapper>
  ),
}

export const GroupSelect: Story = {
  args: {
    placeholder: 'Select group...',
    options: mockGroups.map(group => ({
      value: group.id,
      label: `${group.name} (${group.groupNumber})`,
      disabled: group.status === 'terminated',
    })),
  },
  render: args => (
    <div className="space-y-2">
      <label className="text-sm font-medium">Group</label>
      <FormWrapper fieldName="group">
        <Select {...args} />
      </FormWrapper>
      <p className="text-sm text-gray-600">Select the group for this member</p>
    </div>
  ),
}

export const PlanTypeSelect: Story = {
  args: {
    placeholder: 'Select plan type...',
    options: [
      { value: 'ppo', label: 'PPO - Preferred Provider Organization' },
      { value: 'hmo', label: 'HMO - Health Maintenance Organization' },
      { value: 'hdhp', label: 'HDHP - High Deductible Health Plan' },
      { value: 'epo', label: 'EPO - Exclusive Provider Organization' },
    ],
  },
  render: args => (
    <FormWrapper>
      <Select {...args} />
    </FormWrapper>
  ),
}

export const StatusSelect: Story = {
  args: {
    placeholder: 'All statuses',
    options: [
      { value: 'all', label: 'All Statuses' },
      { value: 'active', label: 'Active' },
      { value: 'pending', label: 'Pending' },
      { value: 'terminated', label: 'Terminated' },
    ],
  },
  render: args => (
    <FormWrapper>
      <Select {...args} />
    </FormWrapper>
  ),
}

export const CommissionPeriodSelect: Story = {
  args: {
    placeholder: 'Select period...',
    options: [
      { value: 'ytd', label: 'Year to Date' },
      { value: 'q4', label: 'Q4 2024' },
      { value: 'q3', label: 'Q3 2024' },
      { value: 'q2', label: 'Q2 2024' },
      { value: 'q1', label: 'Q1 2024' },
      { value: 'custom', label: 'Custom Range' },
    ],
  },
  render: args => (
    <FormWrapper>
      <Select {...args} />
    </FormWrapper>
  ),
}

// Grouped Options
export const GroupedOptions: Story = {
  args: {
    placeholder: 'Select report...',
    options: [
      {
        label: 'Commission Reports',
        value: 'commission',
        options: [
          { value: 'commission-summary', label: 'Commission Summary' },
          { value: 'commission-detail', label: 'Commission Detail' },
          { value: 'payment-history', label: 'Payment History' },
        ],
      },
      {
        label: 'Member Reports',
        value: 'member',
        options: [
          { value: 'member-roster', label: 'Member Roster' },
          { value: 'enrollment-report', label: 'Enrollment Report' },
          { value: 'demographic-report', label: 'Demographic Report' },
        ],
      },
      {
        label: 'Group Reports',
        value: 'group',
        options: [
          { value: 'group-summary', label: 'Group Summary' },
          { value: 'renewal-report', label: 'Renewal Report' },
          { value: 'utilization-report', label: 'Utilization Report' },
        ],
      },
    ],
  },
  render: args => (
    <FormWrapper>
      <Select {...args} />
    </FormWrapper>
  ),
}

// Interactive Stories
export const WithSelectionInteraction: Story = {
  args: {
    placeholder: 'Select a broker...',
    options: mockBrokers.slice(0, 3).map(broker => ({
      value: broker.id,
      label: broker.name,
    })),
  },
  render: args => (
    <FormWrapper fieldName="broker">
      <Select {...args} />
    </FormWrapper>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const select = canvas.getByRole('combobox')

    // Open the dropdown
    await userEvent.click(select)

    // Select an option
    const option = canvas.getByText('John Smith')
    await userEvent.click(option)

    // Verify selection
    expect(select).toHaveValue('BRK001')
  },
}

export const WithKeyboardNavigation: Story = {
  args: {
    placeholder: 'Use arrow keys...',
    options: [
      { value: 'ppo', label: 'PPO' },
      { value: 'hmo', label: 'HMO' },
      { value: 'hdhp', label: 'HDHP' },
      { value: 'epo', label: 'EPO' },
    ],
  },
  render: args => (
    <FormWrapper>
      <Select {...args} />
    </FormWrapper>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const select = canvas.getByRole('combobox')

    // Focus the select
    await userEvent.tab()
    expect(select).toHaveFocus()

    // Open with keyboard
    await userEvent.keyboard('{Space}')

    // Navigate with arrows
    await userEvent.keyboard('{ArrowDown}')
    await userEvent.keyboard('{ArrowDown}')

    // Select with Enter
    await userEvent.keyboard('{Enter}')
  },
}

// Multi-Select Example
export const MultiSelect: Story = {
  args: {
    placeholder: 'Select multiple brokers...',
    multiple: true,
    options: mockBrokers.map(broker => ({
      value: broker.id,
      label: broker.name,
    })),
  },
  render: args => (
    <FormWrapper>
      <Select {...args} />
    </FormWrapper>
  ),
}

// Searchable Select
export const SearchableSelect: Story = {
  args: {
    placeholder: 'Search groups...',
    options: mockGroups.map(group => ({
      value: group.id,
      label: `${group.name} - ${group.groupNumber}`,
    })),
  },
  render: args => (
    <FormWrapper>
      <Select {...args} />
    </FormWrapper>
  ),
}

// Form Filter Examples
export const ReportFilters: Story = {
  args: {
    placeholder: 'Select period...',
    options: [
      { value: 'ytd', label: 'Year to Date' },
      { value: 'q4', label: 'Q4 2024' },
      { value: 'q3', label: 'Q3 2024' },
    ],
  },
  render: args => (
    <div className="bg-white p-6 rounded-lg border space-y-4">
      <h3 className="text-lg font-semibold">Report Filters</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Time Period</label>
          <FormWrapper>
            <Select {...args} />
          </FormWrapper>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example of multiple select filters used in reporting forms',
      },
    },
  },
}

// Accessibility Test
export const AccessibilityTest: Story = {
  args: {
    placeholder: 'Accessible select',
    'aria-label': 'Select broker from dropdown',
    options: [
      { value: 'broker1', label: 'Broker 1' },
      { value: 'broker2', label: 'Broker 2' },
    ],
  },
  render: args => (
    <FormWrapper>
      <Select {...args} />
    </FormWrapper>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement)
    const select = canvas.getByRole('combobox')

    // Test accessibility attributes
    expect(select).toHaveAttribute('aria-label')
    expect(select).toBeVisible()
    expect(select).toBeEnabled()

    // Test keyboard navigation
    await userEvent.tab()
    expect(select).toHaveFocus()

    // Test ARIA expanded state
    await userEvent.keyboard('{Space}')
    expect(select).toHaveAttribute('aria-expanded', 'true')
  },
  parameters: {
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true,
          },
          {
            id: 'keyboard-navigation',
            enabled: true,
          },
        ],
      },
    },
  },
}

import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { useForm, FormProvider } from 'react-hook-form'
import { Select } from './Select'
import { mockBrokers, mockGroups } from '../../utils/mockData'

const meta = {
  title: '⚛️ Atoms/📝 Select',
  component: Select,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
# Select Component

A versatile select component for forms and user input with support for:
- Single and multi-select modes
- Form validation with React Hook Form
- Three size variants (sm, default, lg)
- Disabled states and options
- Placeholder text
- Option groups with nested options
- Error states with custom messages
- Required field indication
- Accessible design with ARIA support
- Custom styling via className
- Keyboard navigation
`,
      },
    },
  },
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

// Size Variants Example
export const SizeVariants: Story = {
  args: {
    placeholder: 'Select an option...',
    options: [
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2' },
      { value: '3', label: 'Option 3' },
    ],
  },
  render: args => (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Size Variants</h3>
        <div className="grid grid-cols-1 gap-6">
          <div className="space-y-2">
            <Select {...args} label="Small Size" size="sm" />
            <p className="text-sm text-gray-500">Compact size for dense UIs</p>
          </div>

          <div className="space-y-2">
            <Select {...args} label="Default Size" size="default" />
            <p className="text-sm text-gray-500">
              Standard size for most use cases
            </p>
          </div>

          <div className="space-y-2">
            <Select {...args} label="Large Size" size="lg" />
            <p className="text-sm text-gray-500">
              Large size for improved visibility
            </p>
          </div>
        </div>
      </div>
    </div>
  ),
}

// Interactive States Example
export const InteractiveStates: Story = {
  args: {
    placeholder: 'Select an option...',
    options: [
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2' },
      { value: '3', label: 'Option 3' },
    ],
  },
  render: args => (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Select States</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Default State */}
          <div className="space-y-2">
            <Select {...args} label="Default State" />
            <p className="text-sm text-gray-500">
              Normal state with hover effect
            </p>
          </div>

          {/* Focused State (simulated) */}
          <div className="space-y-2">
            <Select
              {...args}
              label="Focus State"
              className="ring-2 ring-blue-500 border-transparent"
            />
            <p className="text-sm text-gray-500">With focus ring and border</p>
          </div>

          {/* Disabled State */}
          <div className="space-y-2">
            <Select {...args} label="Disabled State" disabled />
            <p className="text-sm text-gray-500">
              Disabled with reduced opacity
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Validation States
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Required Field */}
          <div className="space-y-2">
            <Select {...args} label="Required Field" required />
            <p className="text-sm text-gray-500">Shows required indicator</p>
          </div>

          {/* With Error */}
          <div className="space-y-2">
            <Select
              {...args}
              label="Error State"
              error={{ message: 'Please select an option' }}
            />
            <p className="text-sm text-gray-500">Error state with message</p>
          </div>
        </div>
      </div>
    </div>
  ),
}

// Form Integration Example
export const FormIntegration: Story = {
  args: {
    options: [
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2' },
      { value: '3', label: 'Option 3' },
    ],
  },
  render: () => {
    const methods = useForm({
      defaultValues: {
        broker: '',
        group: '',
      },
    })

    return (
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(data =>
            console.log('Form submitted:', data)
          )}
          className="space-y-8"
        >
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Form Example
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                name="broker"
                control={methods.control}
                label="Select Broker"
                placeholder="Choose a broker..."
                options={mockBrokers.map(broker => ({
                  value: broker.id,
                  label: broker.name,
                }))}
                required
                rules={{ required: 'Please select a broker' }}
              />
              <Select
                name="group"
                control={methods.control}
                label="Select Group"
                placeholder="Choose a group..."
                options={mockGroups.map(group => ({
                  value: group.id,
                  label: group.name,
                  disabled: group.status === 'terminated',
                }))}
                required
                rules={{ required: 'Please select a group' }}
              />
            </div>
            <div className="mt-4 flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </FormProvider>
    )
  },
}

// Grouped Options Example
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
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Grouped Options
      </h3>
      <div className="max-w-md">
        <Select {...args} label="Report Type" />
        <p className="mt-2 text-sm text-gray-500">
          Select with option groups for better organization
        </p>
      </div>
    </div>
  ),
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
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Multi-Select</h3>
      <div className="max-w-md">
        <Select {...args} label="Select Brokers" />
        <p className="mt-2 text-sm text-gray-500">
          Hold Ctrl/Cmd to select multiple options
        </p>
      </div>
    </div>
  ),
}

// Common Use Cases
export const CommonUseCases: Story = {
  args: {
    placeholder: 'Select an option...',
    options: [
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2' },
      { value: '3', label: 'Option 3' },
    ],
  },
  render: args => (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Report Filters
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select
            {...args}
            label="Time Period"
            placeholder="Select period..."
            options={[
              { value: 'ytd', label: 'Year to Date' },
              { value: 'q4', label: 'Q4 2024' },
              { value: 'q3', label: 'Q3 2024' },
            ]}
          />
          <Select
            {...args}
            label="Report Type"
            placeholder="Select type..."
            options={[
              { value: 'commission', label: 'Commission' },
              { value: 'enrollment', label: 'Enrollment' },
              { value: 'claims', label: 'Claims' },
            ]}
          />
          <Select
            {...args}
            label="Format"
            placeholder="Select format..."
            options={[
              { value: 'pdf', label: 'PDF' },
              { value: 'excel', label: 'Excel' },
              { value: 'csv', label: 'CSV' },
            ]}
          />
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Broker Portal Examples
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Select Broker"
            placeholder="Choose a broker..."
            options={mockBrokers.map(broker => ({
              value: broker.id,
              label: `${broker.name} - ${broker.agencyName}`,
            }))}
          />
          <Select
            label="Select Group"
            placeholder="Choose a group..."
            options={mockGroups.map(group => ({
              value: group.id,
              label: `${group.name} (${group.groupNumber})`,
              disabled: group.status === 'terminated',
            }))}
          />
        </div>
      </div>
    </div>
  ),
}

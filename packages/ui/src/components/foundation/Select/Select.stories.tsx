import type { Meta, StoryObj } from '@storybook/react'
import { Select, Dropdown } from './Select'

const meta: Meta<typeof Select> = {
  title: '⚛️ Foundation/Select',
  component: Dropdown,
  parameters: {
    layout: 'centered',
    tags: ['foundation', 'stable'],
    docs: {
      description: {
        component: `
# Select (Dropdown)

Customizable dropdown component for single-option selection with comprehensive styling and state management.

## Features
- **Multiple sizes**: Small, default, and large variants for different contexts
- **Validation states**: Error handling with custom error messages
- **Accessibility**: Full keyboard navigation and screen reader support
- **Customizable options**: Support for complex option objects with values and labels
- **Form integration**: Works seamlessly with form libraries
- **Loading states**: Built-in support for async data loading
- **Search/Filter**: Optional filtering capabilities for large option lists
- **Responsive design**: Adapts to container width and mobile viewports

## Usage

\`\`\`tsx
import { Select, Dropdown } from '@portals/ui';

// Basic dropdown
<Dropdown
  label="Plan Type"
  placeholder="Choose a plan"
  options={[
    { value: 'basic', label: 'Basic Plan' },
    { value: 'premium', label: 'Premium Plan' }
  ]}
  onChange={handleChange}
/>

// With validation
<Dropdown
  label="Required Field"
  placeholder="Select an option"
  error={hasError}
  errorMessage="This field is required"
  options={options}
  required
/>

// Different sizes
<Dropdown size="lg" label="Large Dropdown" options={options} />
\`\`\`

## When to use
- Select from a predefined list of options
- Choose insurance plans, providers, or coverage types
- Filter data by categories or criteria
- Form inputs requiring single-selection
- Navigation menus with structured options

## Accessibility
- Full keyboard navigation (Arrow keys, Enter, Escape)
- Screen reader compatible with proper ARIA attributes
- Focus management and clear focus indicators
- High contrast support for error and selected states
- Proper labeling and description associations
        `
      }
    }
  },
  argTypes: {
    options: {
      control: 'object',
      description: 'Array of option objects with value and label properties',
      table: {
        type: { summary: 'Array<{value: string, label: string}>' },
      },
    },
    value: {
      control: 'text',
      description: 'Currently selected value',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    onChange: {
      action: 'changed',
      description: 'Callback function when selection changes',
      table: {
        type: { summary: '(value: string) => void' },
      },
    },
    size: {
      control: 'radio',
      options: ['sm', 'default', 'lg'],
      description: 'Size variant of the dropdown',
      table: {
        type: { summary: 'sm | default | lg' },
        defaultValue: { summary: 'default' },
      },
    },
    error: {
      control: 'boolean',
      description: 'Whether the dropdown has an error state',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the dropdown is disabled',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    required: {
      control: 'boolean',
      description: 'Whether the field is required',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text when no option is selected',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Select an option' },
      },
    },
    label: {
      control: 'text',
      description: 'Label text for the dropdown',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    errorMessage: {
      control: 'text',
      description: 'Error message to display when in error state',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
  },
  args: {
    size: 'default',
    error: false,
    disabled: false,
    required: false,
    placeholder: 'Select an option',
    label: '',
    errorMessage: '',
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
    ],
  }
}

export default meta
type Story = StoryObj<typeof Dropdown>

export const Default: Story = {
  args: {
    placeholder: 'Choose an option',
    label: 'Plan Type',
    options: [
      { value: 'basic', label: 'Basic Plan' },
      { value: 'standard', label: 'Standard Plan' },
      { value: 'premium', label: 'Premium Plan' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Default dropdown with label and placeholder. Click to see options and select one.',
      },
    },
  },
}

export const WithError: Story = {
  args: {
    placeholder: 'Choose an option',
    label: 'Required Field',
    error: true,
    errorMessage: 'Please select an option',
    required: true,
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Dropdown with error state showing validation message. Used for form validation feedback.',
      },
    },
  },
}

export const AllSizes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4 w-80">
      <Dropdown {...args} size="sm" label="Small" placeholder="Small dropdown" />
      <Dropdown {...args} size="default" label="Default" placeholder="Default dropdown" />
      <Dropdown {...args} size="lg" label="Large" placeholder="Large dropdown" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different dropdown sizes for various UI contexts. Small for compact layouts, large for emphasis.',
      },
    },
  },
}

export const States: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4 w-80">
      <Dropdown {...args} label="Default" placeholder="Default state" />
      <Dropdown {...args} label="Disabled" placeholder="Disabled state" disabled />
      <Dropdown {...args} label="Error" placeholder="Error state" error errorMessage="This field is required" />
      <Dropdown {...args} label="With Value" placeholder="With value" value="option2" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All possible dropdown states including default, disabled, error, and selected value.',
      },
    },
  },
}

export const InsurancePlans: Story = {
  args: {
    label: 'Insurance Plans',
    placeholder: 'Select your plan',
    options: [
      { value: 'medicare-advantage', label: 'Medicare Advantage' },
      { value: 'medicare-supplement', label: 'Medicare Supplement' },
      { value: 'individual-aca', label: 'Individual ACA Plan' },
      { value: 'employer-group', label: 'Employer Group Plan' },
      { value: 'dsnp', label: 'Dual Special Needs Plan (DSNP)' },
      { value: 'dental', label: 'Dental Plan' },
      { value: 'vision', label: 'Vision Plan' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Healthcare-specific dropdown showing insurance plan types commonly used in member portals.',
      },
    },
  },
}

export const ProviderSelection: Story = {
  render: () => (
    <div className="space-y-4 max-w-md">
      <Dropdown
        label="Primary Care Provider"
        placeholder="Select your PCP"
        options={[
          { value: 'dr-smith', label: 'Dr. Sarah Smith - Internal Medicine' },
          { value: 'dr-johnson', label: 'Dr. Michael Johnson - Family Practice' },
          { value: 'dr-chen', label: 'Dr. Lisa Chen - Internal Medicine' },
        ]}
      />
      
      <Dropdown
        label="Preferred Pharmacy"
        placeholder="Choose a pharmacy"
        options={[
          { value: 'cvs-main', label: 'CVS Pharmacy - Main Street' },
          { value: 'walgreens-elm', label: 'Walgreens - Elm Avenue' },
          { value: 'rite-aid-oak', label: 'Rite Aid - Oak Boulevard' },
        ]}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Multiple dropdowns for healthcare provider and pharmacy selection in member enrollment workflows.',
      },
    },
  },
}

export const FormIntegration: Story = {
  render: () => (
    <div className="max-w-md p-6 border rounded-lg bg-white">
      <h3 className="text-lg font-semibold mb-4">Member Information</h3>
      <div className="space-y-4">
        <Dropdown
          label="State"
          placeholder="Select your state"
          required
          options={[
            { value: 'ca', label: 'California' },
            { value: 'tx', label: 'Texas' },
            { value: 'fl', label: 'Florida' },
            { value: 'ny', label: 'New York' },
          ]}
        />
        
        <Dropdown
          label="Coverage Type"
          placeholder="Choose coverage"
          required
          options={[
            { value: 'individual', label: 'Individual Coverage' },
            { value: 'family', label: 'Family Coverage' },
            { value: 'employee', label: 'Employee + Spouse' },
          ]}
        />
        
        <Dropdown
          label="Income Range"
          placeholder="Select income range"
          options={[
            { value: 'under-30k', label: 'Under $30,000' },
            { value: '30k-50k', label: '$30,000 - $50,000' },
            { value: '50k-75k', label: '$50,000 - $75,000' },
            { value: 'over-75k', label: 'Over $75,000' },
          ]}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Dropdowns integrated into a form layout showing real-world usage in member enrollment.',
      },
    },
  },
} 
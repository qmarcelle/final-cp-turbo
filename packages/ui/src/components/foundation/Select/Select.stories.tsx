import type { Meta, StoryObj } from '@storybook/react-vite';
import { Select, Dropdown } from './Select';

const meta: Meta<typeof Select> = {
  title: '⚛️ Atoms/Select',
  component: Dropdown,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Dropdown component allows users to select from a list of options with custom styling and filtering.',
      },
    },
  },
  argTypes: {
    size: {
      control: 'radio',
      options: ['sm', 'default', 'lg'],
      description: 'Size of the dropdown',
    },
    error: {
      control: 'boolean',
      description: 'Whether the dropdown has an error state',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the dropdown is disabled',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    label: {
      control: 'text',
      description: 'Label for the dropdown',
    },
    errorMessage: {
      control: 'text',
      description: 'Error message to display',
    },
  },
  args: {
    size: 'default',
    error: false,
    disabled: false,
    placeholder: 'Select an option',
    label: '',
    errorMessage: '',
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
    ],
  }
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

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
};

export const WithError: Story = {
  args: {
    placeholder: 'Choose an option',
    label: 'Required Field',
    error: true,
    errorMessage: 'Please select an option',
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
    ],
  },
};

export const AllSizes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4 w-80">
      <Dropdown {...args} size="sm" label="Small" placeholder="Small dropdown" />
      <Dropdown {...args} size="default" label="Default" placeholder="Default dropdown" />
      <Dropdown {...args} size="lg" label="Large" placeholder="Large dropdown" />
    </div>
  ),
};

export const States: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4 w-80">
      <Dropdown {...args} label="Default" placeholder="Default state" />
      <Dropdown {...args} label="Disabled" placeholder="Disabled state" disabled />
      <Dropdown {...args} label="Error" placeholder="Error state" error errorMessage="This field is required" />
      <Dropdown {...args} label="With Value" placeholder="With value" value="option2" />
    </div>
  ),
};

export const WithManyOptions: Story = {
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
}; 
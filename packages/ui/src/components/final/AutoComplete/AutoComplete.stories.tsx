import type { Meta, StoryObj } from '@storybook/react';
import { AutoComplete } from './AutoComplete';
import { useForm, FormProvider } from 'react-hook-form';

const meta = {
  title: '🧬 Molecules/AutoComplete',
  component: AutoComplete,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# AutoComplete

An input component that provides suggestions as the user types, with keyboard navigation and selection support.

## Features
- Dynamic suggestions
- Keyboard navigation
- Custom filtering
- Async data loading
- Form integration
- Custom rendering
- Multiple selection

## Usage

\`\`\`tsx
import { AutoComplete } from '@portals/ui';
import { useForm } from 'react-hook-form';

function MyForm() {
  const { control } = useForm();
  
  return (
    <AutoComplete
      name="country"
      control={control}
      label="Country"
      options={countries}
      required
    />
  );
}
\`\`\`
`
      }
    }
  },
  argTypes: {
    options: {
      control: 'object',
      description: 'Array of options to select from',
    },
    loading: {
      control: 'boolean',
      description: 'Loading state for async data',
    },
    multiple: {
      control: 'boolean',
      description: 'Allow multiple selections',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the input',
    },
    required: {
      control: 'boolean',
      description: 'Mark as required',
    },
  },
} satisfies Meta<typeof AutoComplete>;

export default meta;
type Story = StoryObj<typeof AutoComplete>;

const countries = [
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' },
  { value: 'mx', label: 'Mexico' },
  { value: 'br', label: 'Brazil' },
  { value: 'ar', label: 'Argentina' },
  { value: 'co', label: 'Colombia' },
  { value: 'pe', label: 'Peru' },
  { value: 'cl', label: 'Chile' },
];

const FormWrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm();
  return <FormProvider {...methods}>{children}</FormProvider>;
};

export const Default: Story = {
  render: () => (
    <FormWrapper>
      <AutoComplete
        name="country"
        label="Select Country"
        options={countries}
        placeholder="Start typing..."
      />
    </FormWrapper>
  ),
};

export const WithDefaultValue: Story = {
  render: () => (
    <FormWrapper>
      <AutoComplete
        name="country"
        label="Country"
        options={countries}
        defaultValue="us"
      />
    </FormWrapper>
  ),
};

export const MultipleSelection: Story = {
  render: () => (
    <FormWrapper>
      <AutoComplete
        name="countries"
        label="Select Countries"
        options={countries}
        multiple
        placeholder="Select multiple countries"
      />
    </FormWrapper>
  ),
};

export const WithValidation: Story = {
  render: () => (
    <FormWrapper>
      <AutoComplete
        name="required"
        label="Required Field"
        options={countries}
        required
        placeholder="This field is required"
      />
    </FormWrapper>
  ),
};

export const Disabled: Story = {
  render: () => (
    <FormWrapper>
      <AutoComplete
        name="disabled"
        label="Disabled Input"
        options={countries}
        disabled
        defaultValue="us"
      />
    </FormWrapper>
  ),
};

export const Loading: Story = {
  render: () => (
    <FormWrapper>
      <AutoComplete
        name="loading"
        label="Loading State"
        options={[]}
        loading
        placeholder="Loading options..."
      />
    </FormWrapper>
  ),
};

export const WithError: Story = {
  render: () => (
    <FormWrapper>
      <AutoComplete
        name="error"
        label="Error State"
        options={countries}
        error="Please select a valid country"
      />
    </FormWrapper>
  ),
};

export const CustomOption: Story = {
  render: () => (
    <FormWrapper>
      <AutoComplete
        name="custom"
        label="Custom Option Rendering"
        options={countries}
        renderOption={(option) => (
          <div className="flex items-center gap-2">
            <span className="text-lg">
              {option.value === 'us' ? '🇺🇸' :
               option.value === 'ca' ? '🇨🇦' :
               option.value === 'mx' ? '🇲🇽' : '🌎'}
            </span>
            <span>{option.label}</span>
          </div>
        )}
      />
    </FormWrapper>
  ),
};
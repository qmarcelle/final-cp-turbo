import type { Meta, StoryObj } from '@storybook/react';
import { NumberInput } from './NumberInput';
import { useForm, FormProvider } from 'react-hook-form';

const meta = {
  title: '⚛️ Atoms/NumberInput',
  component: NumberInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Number Input

A specialized input component for numerical values with validation, formatting, and step controls.

## Features
- Value constraints (min/max)
- Step controls
- Custom formatting
- Decimal support
- Form integration
- Validation
- Keyboard controls

## Usage

\`\`\`tsx
import { NumberInput } from '@portals/ui';
import { useForm } from 'react-hook-form';

function MyForm() {
  const { control } = useForm();
  
  return (
    <NumberInput
      name="quantity"
      control={control}
      label="Quantity"
      min={0}
      max={100}
      step={1}
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
    min: {
      control: 'number',
      description: 'Minimum allowed value',
    },
    max: {
      control: 'number',
      description: 'Maximum allowed value',
    },
    step: {
      control: 'number',
      description: 'Step value for increment/decrement',
    },
    precision: {
      control: 'number',
      description: 'Number of decimal places',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
    },
    required: {
      control: 'boolean',
      description: 'Whether the field is required',
    },
  },
} satisfies Meta<typeof NumberInput>;

export default meta;
type Story = StoryObj<typeof NumberInput>;

const FormWrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm();
  return <FormProvider {...methods}>{children}</FormProvider>;
};

export const Default: Story = {
  render: () => (
    <FormWrapper>
      <NumberInput
        name="number"
        label="Number Input"
        placeholder="Enter a number"
      />
    </FormWrapper>
  ),
};

export const WithMinMax: Story = {
  render: () => (
    <FormWrapper>
      <NumberInput
        name="quantity"
        label="Quantity"
        min={0}
        max={100}
        placeholder="0-100"
      />
    </FormWrapper>
  ),
};

export const WithStep: Story = {
  render: () => (
    <FormWrapper>
      <NumberInput
        name="amount"
        label="Amount"
        step={0.5}
        precision={1}
        placeholder="Step: 0.5"
      />
    </FormWrapper>
  ),
};

export const WithValidation: Story = {
  render: () => (
    <FormWrapper>
      <NumberInput
        name="required"
        label="Required Field"
        required
        min={0}
        placeholder="Required number"
      />
    </FormWrapper>
  ),
};

export const Disabled: Story = {
  render: () => (
    <FormWrapper>
      <NumberInput
        name="disabled"
        label="Disabled Input"
        disabled
        value={42}
      />
    </FormWrapper>
  ),
};

export const WithError: Story = {
  render: () => (
    <FormWrapper>
      <NumberInput
        name="error"
        label="Error State"
        error="This field has an error"
        value={999}
      />
    </FormWrapper>
  ),
};

export const Currency: Story = {
  render: () => (
    <FormWrapper>
      <NumberInput
        name="price"
        label="Price"
        prefix="$"
        precision={2}
        placeholder="0.00"
      />
    </FormWrapper>
  ),
};

export const Percentage: Story = {
  render: () => (
    <FormWrapper>
      <NumberInput
        name="percent"
        label="Percentage"
        suffix="%"
        min={0}
        max={100}
        placeholder="0-100"
      />
    </FormWrapper>
  ),
};
import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent, expect } from 'storybook/test';
import { Input } from './Input';
import { FormField } from '../FormField/FormField';

const meta = {
  title: '⚛️ Atoms/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile input component that supports various types including text, textarea, password, and more.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'number', 'search', 'tel', 'url', 'textarea'],
      description: 'Input type',
    },
    variant: {
      control: 'select',
      options: ['default', 'error', 'success'],
      description: 'Visual style variant',
    },
    inputSize: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Input size',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    error: {
      control: 'boolean',
      description: 'Error state',
    },
    success: {
      control: 'boolean',
      description: 'Success state',
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

export const WithLabel: Story = {
  render: (args) => (
    <FormField label="Email">
      <Input {...args} placeholder="Enter your email" />
    </FormField>
  ),
};

export const Required: Story = {
  render: (args) => (
    <FormField label="Email" required>
      <Input {...args} placeholder="Enter your email" />
    </FormField>
  ),
};

export const Disabled: Story = {
  render: (args) => (
    <FormField label="Email">
      <Input {...args} placeholder="Enter your email" disabled />
    </FormField>
  ),
};

export const WithError: Story = {
  render: (args) => (
    <FormField label="Email" error="Please enter a valid email address">
      <Input {...args} placeholder="Enter your email" error />
    </FormField>
  ),
};

export const WithHint: Story = {
  render: (args) => (
    <FormField label="Password" hint="Must be at least 8 characters">
      <Input {...args} type="password" placeholder="Enter your password" />
    </FormField>
  ),
};

export const AllTypes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-[300px]">
      <Input type="text" placeholder="Text input" />
      <Input type="password" placeholder="Password input" />
      <Input type="email" placeholder="Email input" />
      <Input type="number" placeholder="Number input" />
      <Input type="search" placeholder="Search input" />
      <Input type="tel" placeholder="Tel input" />
      <Input type="url" placeholder="URL input" />
      <Input type="textarea" placeholder="Textarea input" rows={4} />
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-[300px]">
      <Input inputSize="sm" placeholder="Small input" />
      <Input inputSize="md" placeholder="Medium input" />
      <Input inputSize="lg" placeholder="Large input" />
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-[300px]">
      <Input variant="default" placeholder="Default variant" />
      <Input variant="error" placeholder="Error variant" />
      <Input variant="success" placeholder="Success variant" />
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-[300px]">
      <Input
        leftIcon={<span className="i-heroicons-magnifying-glass-20-solid" />}
        placeholder="Left icon"
      />
      <Input
        rightIcon={<span className="i-heroicons-check-circle-20-solid" />}
        placeholder="Right icon"
      />
      <Input
        leftIcon={<span className="i-heroicons-envelope-20-solid" />}
        rightIcon={<span className="i-heroicons-check-circle-20-solid" />}
        placeholder="Both icons"
      />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-[300px]">
      <Input placeholder="Default state" />
      <Input disabled placeholder="Disabled state" />
      <Input error placeholder="Error state" />
      <Input success placeholder="Success state" />
    </div>
  ),
};

// Interaction test
export const TextInput: Story = {
  args: {
    placeholder: 'Type something...',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText('Type something...');
    
    await expect(input).toBeInTheDocument();
    await userEvent.type(input, 'Hello, World!');
    await expect(input).toHaveValue('Hello, World!');
  },
};

// Accessibility test
export const AccessibilityTest: Story = {
  args: {
    'aria-label': 'Accessible Input',
    placeholder: 'Accessible input field',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText('Accessible Input');
    
    await expect(input).toHaveAccessibleName('Accessible Input');
    await expect(input).toBeEnabled();
  },
};
import type { Meta, StoryObj } from '@storybook/react';
import { Input, TextField } from './Input';

const meta: Meta<typeof Input> = {
  title: '⚛️ Atoms/Input',
  component: TextField,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# 📝 Input Component

Text fields allow users to enter and edit text. Supports validation states and various input types.

## Features
- **Multiple types**: text, email, password, tel, number
- **Responsive sizes**: sm, default, lg
- **Validation states**: error handling with messages
- **Accessibility**: proper labeling and ARIA attributes
- **Design system**: consistent styling with design tokens
- **Form integration**: works with form libraries

## Usage
\`\`\`tsx
<Input 
  label="Email Address"
  type="email"
  placeholder="Enter your email"
  required
  error={hasError}
  errorMessage="Please enter a valid email"
/>
\`\`\`
        `
      },
    },
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'tel', 'number'],
      description: 'Type of input field',
    },
    size: {
      control: 'radio',
      options: ['sm', 'default', 'lg'],
      description: 'Size of the input field',
    },
    error: {
      control: 'boolean',
      description: 'Whether the input has an error state',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
    },
    required: {
      control: 'boolean',
      description: 'Whether the input is required',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    label: {
      control: 'text',
      description: 'Label for the input field',
    },
    hint: {
      control: 'text',
      description: 'Helper text displayed below the input',
    },
    errorMessage: {
      control: 'text',
      description: 'Error message to display',
    },
  },
  args: {
    type: 'text',
    size: 'default',
    error: false,
    disabled: false,
    required: false,
    placeholder: 'Enter text...',
    label: '',
    hint: '',
    errorMessage: '',
  }
};

export default meta;
type Story = StoryObj<typeof TextField>;

export const Default: Story = {
  args: {
    placeholder: 'Enter your name',
    label: 'Full Name',
  },
};

export const WithHint: Story = {
  args: {
    placeholder: 'Enter your email',
    label: 'Email Address',
    hint: 'We will never share your email with anyone',
  },
};

export const Required: Story = {
  args: {
    placeholder: 'Enter your phone number',
    label: 'Phone Number',
    required: true,
  },
};

export const WithError: Story = {
  args: {
    placeholder: 'Enter your email',
    label: 'Email Address',
    error: true,
    errorMessage: 'Please enter a valid email address',
    value: 'invalid-email',
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Cannot edit this field',
    label: 'Disabled Field',
    disabled: true,
    value: 'Read-only value',
  },
};

export const AllSizes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4 w-80">
      <TextField {...args} size="sm" label="Small" placeholder="Small input" />
      <TextField {...args} size="default" label="Default" placeholder="Default input" />
      <TextField {...args} size="lg" label="Large" placeholder="Large input" />
    </div>
  ),
};

export const InputTypes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4 w-80">
      <TextField {...args} type="text" label="Text" placeholder="Enter text" />
      <TextField {...args} type="email" label="Email" placeholder="Enter email" />
      <TextField {...args} type="password" label="Password" placeholder="Enter password" />
      <TextField {...args} type="tel" label="Phone" placeholder="Enter phone number" />
      <TextField {...args} type="number" label="Number" placeholder="Enter number" />
    </div>
  ),
};

export const AllStates: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4 w-80">
      <TextField {...args} label="Default" placeholder="Default state" />
      <TextField {...args} label="With Value" placeholder="With value" value="Sample text" />
      <TextField {...args} label="Required" placeholder="Required field" required />
      <TextField {...args} label="With Hint" placeholder="With helper text" hint="This is helper text" />
      <TextField {...args} label="Disabled" placeholder="Disabled state" disabled />
      <TextField {...args} label="Error" placeholder="Error state" error errorMessage="This field is required" />
    </div>
  ),
};
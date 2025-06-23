import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FormField } from './FormField';
import { Input } from '../../foundation/Input/Input';
import { Select } from '../../foundation/Select';
import { useForm, FormProvider } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  text: z.string().min(2, { message: 'Must be 2 or more characters long' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
  select: z.string().nonempty({ message: 'Please make a selection' }),
});

// Simple form wrapper for stories
const FormStoryWrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: '',
      email: '',
      password: '',
      select: '',
    },
  });

  return (
    <FormProvider {...methods}>
      <form 
        onSubmit={methods.handleSubmit(data => console.log('Form submitted:', data))}
        className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-sm border border-gray-200"
      >
        <h3 className="text-lg font-medium text-gray-900 mb-4">Form Field Example</h3>
        {children}
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Submit
        </button>
      </form>
    </FormProvider>
  );
};

const meta: Meta<typeof FormField> = {
  title: 'Composite/FormField',
  component: FormField,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <FormStoryWrapper>
        <Story />
      </FormStoryWrapper>
    ),
  ],
  argTypes: {
    label: { control: 'text' },
    description: { control: 'text' },
    required: { control: 'boolean' },
    error: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof FormField>;

export const TextField: Story = {
  args: {
    label: 'Text Field',
    description: 'This is a description for the text field.',
    children: <Input name="text" placeholder="Enter some text" />,
  },
};

export const EmailField: Story = {
  args: {
    label: 'Email Field',
    description: 'Please enter a valid email address.',
    required: true,
    children: <Input name="email" type="email" placeholder="email@example.com" />,
  },
};

export const PasswordField: Story = {
  args: {
    label: 'Password Field',
    description: 'Password must be at least 8 characters long.',
    required: true,
    children: <Input name="password" type="password" placeholder="********" />,
  },
};

export const SelectField: Story = {
  args: {
    label: 'Select Field',
    description: 'Please choose one of the options.',
    required: true,
    children: (
      <Select
        name="select"
        options={[
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' },
          { value: 'option3', label: 'Option 3' },
        ]}
        placeholder="Select an option"
      />
    ),
  },
}; 
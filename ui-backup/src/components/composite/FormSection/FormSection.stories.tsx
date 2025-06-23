import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FormSection } from './FormSection';
import { Input } from '../../foundation/Input/Input';

const meta: Meta<typeof FormSection> = {
  title: 'Composite/FormSection',
  component: FormSection,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    isCollapsible: { control: 'boolean' },
    isOptional: { control: 'boolean' },
    defaultExpanded: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Default Form Section',
    description: 'This is a description for the default form section.',
    children: <p>This is the content of the form section.</p>,
  },
};

export const Collapsible: Story = {
  args: {
    title: 'Collapsible Form Section',
    description: 'This is a description for the collapsible form section.',
    isCollapsible: true,
    children: <p>This is the content of the form section.</p>,
  },
};

export const Optional: Story = {
  args: {
    title: 'Optional Form Section',
    description: 'This is a description for the optional form section.',
    isOptional: true,
    children: <p>This is the content of the form section.</p>,
  },
};

export const WithFields: Story = {
  args: {
    title: 'Form Section with Fields',
    description: 'This is a description for the form section with fields.',
    children: (
      <div className="space-y-4">
        <Input placeholder="Enter details" />
        <Input placeholder="Enter more details" />
      </div>
    ),
  },
}; 
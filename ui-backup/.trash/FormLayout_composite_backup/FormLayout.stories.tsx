import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FormLayout } from './FormLayout';

const meta: Meta<typeof FormLayout> = {
  title: 'Composite/FormLayout',
  component: FormLayout,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['grid', 'column', 'inline'],
    },
    columns: {
      control: 'select',
      options: [1, 2, 3, 4, 6, 12],
    },
    gap: {
      control: 'select',
      options: [2, 4, 6, 8, 12, 16],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const storyChildren = (
  <>
    <div className="bg-gray-200 p-4 rounded-lg">Column 1</div>
    <div className="bg-gray-200 p-4 rounded-lg">Column 2</div>
    <div className="bg-gray-200 p-4 rounded-lg">Column 3</div>
    <div className="bg-gray-200 p-4 rounded-lg">Column 4</div>
  </>
);

export const Grid: Story = {
  args: {
    variant: 'grid',
    columns: 2,
    gap: 6,
    children: storyChildren,
  },
};

export const Column: Story = {
  args: {
    variant: 'column',
    gap: 4,
    children: storyChildren,
  },
};

export const Inline: Story = {
  args: {
    variant: 'inline',
    gap: 2,
    children: storyChildren,
  },
}; 
import type { Meta, StoryObj } from '@storybook/react';
import { FormField } from './FormField';

const meta: Meta<typeof FormField> = {
  title: 'Organisms/FormField',
  component: FormField,
};
export default meta;

type Story = StoryObj<typeof FormField>;

export const Default: Story = {
  args: {
    label: 'Label',
    description: 'Description',
    required: true,
    error: '',
    children: 'Form field here',
  },
};

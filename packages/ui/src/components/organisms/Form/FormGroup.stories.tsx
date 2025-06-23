import type { Meta, StoryObj } from '@storybook/react';
import { FormGroup } from './FormGroup';

const meta: Meta<typeof FormGroup> = {
  title: 'Organisms/FormGroup',
  component: FormGroup,
};
export default meta;

type Story = StoryObj<typeof FormGroup>;

export const Default: Story = {
  args: {
    label: 'Label',
    description: 'Description',
    required: true,
    error: '',
    children: 'Form field here',
  },
};

import type { Meta, StoryObj } from '@storybook/react';
import { FormLayout } from './FormLayout';

const meta: Meta<typeof FormLayout> = {
  title: 'Organisms/FormLayout',
  component: FormLayout,
};
export default meta;

type Story = StoryObj<typeof FormLayout>;

export const Default: Story = {
  args: {
    variant: 'grid',
    columns: 2,
    gap: 6,
    children: [
      'Field 1',
      'Field 2',
      'Field 3',
      'Field 4',
    ],
  },
};

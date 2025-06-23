import type { Meta, StoryObj } from '@storybook/react';
import { Calendar } from './Calendar';

const meta: Meta<typeof Calendar> = {
  title: 'Foundation/Calendar',
  component: Calendar,
  tags: ['autodocs'],
  argTypes: {
    mode: {
      control: 'select',
      options: ['single', 'multiple', 'range', 'default'],
    },
    disabled: {
      control: 'object',
    },
    selected: {
      control: 'object',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Calendar>;

export const Default: Story = {
  args: {},
};

export const SelectedDate: Story = {
  args: {
    mode: 'single',
    selected: new Date(),
  },
};

export const DisabledDates: Story = {
  args: {
    mode: 'multiple',
    disabled: [new Date(), { from: new Date('2024-07-10'), to: new Date('2024-07-20') }],
  },
};

export const RangeSelection: Story = {
    args: {
      mode: 'range',
      selected: { from: new Date('2024-07-05'), to: new Date('2024-07-15') },
    },
}; 
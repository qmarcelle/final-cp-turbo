import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { InputGroup } from './InputGroup';
import { Button } from '../Button/Button';

const meta: Meta<typeof InputGroup> = {
  title: 'Foundation/InputGroup',
  component: InputGroup,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: {
      control: 'boolean',
    },
    className: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof InputGroup>;

export const Default: Story = {
  args: {
    placeholder: 'username',
    size: 'md',
    disabled: false,
  },
};

export const InputWithButton: Story = {
  args: {
    placeholder: 'Email',
    suffix: <Button>Subscribe</Button>,
    size: 'md',
    disabled: false,
  },
};

export const InputWithAddon: Story = {
    args: {
        placeholder: 'username',
        prefix: <span className="text-gray-500">@</span>,
        size: 'md',
        disabled: false,
    },
  };

export const InputWithBoth: Story = {
    args: {
        placeholder: 'username',
        prefix: <span className="text-gray-500">@</span>,
        suffix: <Button>Submit</Button>,
        size: 'md',
        disabled: false,
    },
}; 
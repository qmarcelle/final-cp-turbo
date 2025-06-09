import type { Meta, StoryObj } from '@storybook/react-vite';
import { RadioGroup, Radio } from './RadioGroup';
import { useState } from 'react';

const meta: Meta<typeof Radio> = {
  title: '⚛️ Atoms/RadioGroup',
  component: Radio,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    disabled: {
      control: 'boolean',
    },
    label: {
      control: 'text',
    },
  },
  args: {
    label: 'Radio Option',
    value: 'option1',
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof Radio>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState('option1');
    return (
      <RadioGroup value={value} onValueChange={setValue}>
        <Radio {...args} value="option1" label="Option 1" id="r1" />
        <Radio {...args} value="option2" label="Option 2" id="r2" />
        <Radio {...args} value="option3" label="Option 3" id="r3" />
      </RadioGroup>
    );
  },
};

export const Disabled: Story = {
    args: {
        disabled: true,
        label: 'Disabled Radio'
    },
    render: (args) => (
        <RadioGroup>
            <Radio {...args} value="option1" label="Disabled Option" id="r5" />
        </RadioGroup>
    )
}; 
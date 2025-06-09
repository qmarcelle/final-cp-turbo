import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';
// Simple user icon for demo purposes
const UserIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const meta: Meta<typeof Button> = {
  title: '⚛️ Atoms/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Button component for primary and secondary actions.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: ['primary', 'secondary'],
      description: 'Visual variant of the button',
    },
    size: {
      control: 'radio',
      options: ['sm', 'default', 'lg'],
      description: 'Size of the button. "md" is "default".',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
    children: {
      control: 'text',
    },
    icon: {
      table: {
        disable: true
      }
    }
  },
  args: {
    variant: 'primary',
    size: 'default',
    disabled: false,
    children: 'Button',
  }
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
  render: (args) => (
    <div className="flex flex-col gap-4 items-start">
      <Button {...args} />
      <div className="flex gap-4 items-center">
        <Button {...args} size="sm">Small</Button>
        <Button {...args} size="default">Medium</Button>
        <Button {...args} size="lg">Large</Button>
      </div>
      <div className="flex gap-4 items-center">
        <Button {...args}>Default</Button>
        <Button {...args} disabled>Disabled</Button>
        <Button {...args} icon={<UserIcon />}>With Icon</Button>
      </div>
    </div>
  )
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
  render: (args) => (
    <div className="flex flex-col gap-4 items-start">
      <Button {...args} />
      <div className="flex gap-4 items-center">
        <Button {...args} size="sm">Small</Button>
        <Button {...args} size="default">Medium</Button>
        <Button {...args} size="lg">Large</Button>
      </div>
      <div className="flex gap-4 items-center">
        <Button {...args}>Default</Button>
        <Button {...args} disabled>Disabled</Button>
        <Button {...args} icon={<UserIcon />}>With Icon</Button>
      </div>
    </div>
  )
}; 
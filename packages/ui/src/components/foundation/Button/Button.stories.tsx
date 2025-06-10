import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';
// Simple user icon for demo purposes
const UserIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const meta: Meta<typeof Button> = {
  title: '⚛️ Foundation/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    tags: ['foundation', 'stable'],
    docs: {
      description: {
        component: `
# Button

Clickable action trigger for user interactions.

## Features
- **Multiple variants**: Primary and secondary styles
- **Flexible sizing**: Small, default, and large sizes
- **Icon support**: Can include icons alongside text
- **Loading states**: Built-in loading spinner support
- **Accessibility**: Full keyboard navigation and screen reader support
- **Disabled states**: Visual and functional disabled state

## Usage

\`\`\`tsx
import { Button } from '@portals/ui';

// Primary button
<Button variant="primary" size="md" onClick={() => console.log('clicked')}>
  Submit
</Button>

// Secondary button with icon
<Button variant="secondary" icon={<UserIcon />}>
  Cancel
</Button>

// Loading state
<Button variant="primary" loading>
  Processing...
</Button>
\`\`\`

## When to use
- Use primary buttons for the main action on a page
- Use secondary buttons for secondary actions
- Limit to one primary button per page section
- Include loading states for async operations

## Accessibility
- Includes proper ARIA labels and roles
- Supports keyboard navigation (Enter and Space)
- Clear focus indicators
- Screen reader compatible
        `
      },
    },
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: ['primary', 'secondary'],
      description: 'Visual variant of the button',
      table: {
        type: { summary: 'primary | secondary' },
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: 'radio',
      options: ['sm', 'default', 'lg'],
      description: 'Size of the button',
      table: {
        type: { summary: 'sm | default | lg' },
        defaultValue: { summary: 'default' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    loading: {
      control: 'boolean',
      description: 'Whether the button is in loading state',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    children: {
      control: 'text',
      description: 'Button text content',
      table: {
        type: { summary: 'React.ReactNode' },
      },
    },
    icon: {
      control: false,
      description: 'Optional icon element',
      table: {
        type: { summary: 'React.ReactElement' },
      },
    },
    onClick: {
      action: 'clicked',
      description: 'Click handler function',
      table: {
        type: { summary: '() => void' },
      },
    },
  },
  args: {
    variant: 'primary',
    size: 'default',
    disabled: false,
    loading: false,
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
  parameters: {
    docs: {
      description: {
        story: 'Primary buttons are used for the main action on a page. They should be used sparingly - typically only one per page section.',
      },
    },
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
  parameters: {
    docs: {
      description: {
        story: 'Secondary buttons are used for secondary actions. They can be used multiple times on a page.',
      },
    },
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

export const WithIcon: Story = {
  args: {
    variant: 'primary',
    children: 'Button with Icon',
    icon: <UserIcon />,
  },
  parameters: {
    docs: {
      description: {
        story: 'Buttons can include icons to provide additional visual context.',
      },
    },
  },
};

export const AllSizes: Story = {
  render: (args) => (
    <div className="flex gap-4 items-center">
      <Button {...args} size="sm">Small</Button>
      <Button {...args} size="default">Default</Button>
      <Button {...args} size="lg">Large</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Buttons come in three sizes: small (sm), default, and large (lg).',
      },
    },
  },
};

export const AllVariants: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4 items-start">
      <div className="flex gap-4 items-center">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
      </div>
      <div className="flex gap-4 items-center">
        <Button variant="primary" disabled>Primary Disabled</Button>
        <Button variant="secondary" disabled>Secondary Disabled</Button>
      </div>
      <div className="flex gap-4 items-center">
        <Button variant="primary" icon={<UserIcon />}>With Icon</Button>
        <Button variant="secondary" icon={<UserIcon />}>With Icon</Button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Overview of all button variants and states.',
      },
    },
  },
}; 
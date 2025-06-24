import type { Meta, StoryObj } from '@storybook/react'
import { within } from '@storybook/testing-library'
import { userEvent } from '@storybook/testing-library'
import { Button } from './Button'

const meta = {
  title: '⚛️ Atoms/Button 🔘',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Button Component

A versatile button component that supports multiple variants, sizes, and states.

## Features
- Multiple visual variants (primary, secondary, success, etc.)
- Different sizes (sm, md, lg)
- Loading states with spinner
- Icon support (left, right, or icon-only)
- Full width option
- Keyboard accessibility
- Focus management

## Usage

\`\`\`tsx
import { Button } from '@portals/ui';

// Basic usage
<Button variant="primary">Click Me</Button>

// With loading state
<Button variant="primary" loading>Processing...</Button>

// With icons
<Button leftIcon={<Icon />}>With Icon</Button>

// Form submission
<Button type="submit" variant="primary">Submit Form</Button>
\`\`\`

## Accessibility
- Proper ARIA attributes
- Keyboard navigation support
- Loading state announcements
- High contrast ratios for all variants
- Focus visible indicators
`,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'success',
        'warning',
        'error',
        'outline',
        'ghost',
        'destructive',
        'default',
        'link',
      ],
      description: 'The visual style variant of the button',
      table: {
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'md', 'lg'],
      description: 'The size of the button',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    loading: {
      control: 'boolean',
      description: 'Whether the button is in a loading state',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    fullWidth: {
      control: 'boolean',
      description: 'Whether the button should take full width',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
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
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
      description: 'The type of the button',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'button' },
      },
    },
    children: {
      control: 'text',
      description: 'The content of the button',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
    onClick: {
      action: 'clicked',
      description: 'Function called when the button is clicked',
    },
    leftIcon: {
      control: 'object',
      description: 'Icon element to show before the button text',
    },
    rightIcon: {
      control: 'object',
      description: 'Icon element to show after the button text',
    },
    icon: {
      control: 'object',
      description: 'Single icon for icon-only buttons',
    },
    iconOnly: {
      control: 'boolean',
      description: 'Whether this is an icon-only button',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

// Primary Button Stories
export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
  parameters: {
    docs: {
      description: {
        story: 'Primary button for main actions and CTAs.',
      },
    },
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
  parameters: {
    docs: {
      description: {
        story: 'Secondary button for alternative actions.',
      },
    },
  },
}

export const Success: Story = {
  args: {
    variant: 'success',
    children: 'Success Button',
  },
  parameters: {
    docs: {
      description: {
        story: 'Success button for positive actions.',
      },
    },
  },
}

export const Warning: Story = {
  args: {
    variant: 'warning',
    children: 'Warning Button',
  },
  parameters: {
    docs: {
      description: {
        story: 'Warning button for actions that need attention.',
      },
    },
  },
}

export const Error: Story = {
  args: {
    variant: 'error',
    children: 'Error Button',
  },
  parameters: {
    docs: {
      description: {
        story: 'Error button for critical or destructive actions.',
      },
    },
  },
}

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Destructive Button',
  },
  parameters: {
    docs: {
      description: {
        story: 'Destructive button for critical or destructive actions.',
      },
    },
  },
}

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline Button',
  },
  parameters: {
    docs: {
      description: {
        story: 'Outline button for secondary or ghost-like actions.',
      },
    },
  },
}

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ghost Button',
  },
  parameters: {
    docs: {
      description: {
        story: 'Ghost button for subtle actions.',
      },
    },
  },
}

export const Link: Story = {
  args: {
    variant: 'link',
    children: 'Link Button',
  },
  parameters: {
    docs: {
      description: {
        story: 'Link-styled button for navigation-like actions.',
      },
    },
  },
}

// Size Variants
export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Small Button',
  },
  parameters: {
    docs: {
      description: {
        story: 'Small-sized button for compact UIs.',
      },
    },
  },
}

export const Medium: Story = {
  args: {
    size: 'md',
    children: 'Medium Button',
  },
  parameters: {
    docs: {
      description: {
        story: 'Medium-sized button (default).',
      },
    },
  },
}

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Large Button',
  },
  parameters: {
    docs: {
      description: {
        story: 'Large-sized button for emphasis.',
      },
    },
  },
}

// State Examples
export const Loading: Story = {
  args: {
    loading: true,
    children: 'Loading...',
  },
  parameters: {
    docs: {
      description: {
        story: 'Button in loading state with spinner.',
      },
    },
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled Button',
  },
  parameters: {
    docs: {
      description: {
        story: 'Disabled button state.',
      },
    },
  },
}

export const WithIcons: Story = {
  args: {
    leftIcon: '←',
    rightIcon: '→',
    children: 'Navigate',
  },
  parameters: {
    docs: {
      description: {
        story: 'Button with left and right icons.',
      },
    },
  },
}

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    children: 'Full Width Button',
  },
  parameters: {
    docs: {
      description: {
        story: 'Button that takes full width of its container.',
      },
    },
  },
}

// Interactive Examples
export const WithHoverEffect: Story = {
  args: {
    variant: 'primary',
    children: 'Hover Me',
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole('button', { name: /hover me/i })

    // Simulate hover interaction
    await userEvent.hover(button)
    await new Promise(resolve => setTimeout(resolve, 500))
    await userEvent.unhover(button)
  },
}

export const WithClickInteraction: Story = {
  args: {
    variant: 'primary',
    children: 'Click Me',
    onClick: () => console.log('Button clicked!'),
  },
}

// Button Groups
export const ButtonGroup: Story = {
  render: () => (
    <div className="flex gap-2">
      <Button variant="primary">Save</Button>
      <Button variant="outline">Cancel</Button>
      <Button variant="ghost">Reset</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example of button group layout with proper visual hierarchy.',
      },
    },
  },
}

// Broker Portal Specific Examples
export const QuoteBuilder: Story = {
  args: {
    variant: 'primary',
    size: 'lg',
    children: 'Start New Quote',
  },
}

export const MemberSearch: Story = {
  args: {
    variant: 'secondary',
    children: 'Search Members',
  },
}

export const CommissionReport: Story = {
  args: {
    variant: 'outline',
    children: 'Download Report',
  },
}

export const EmergencyAction: Story = {
  args: {
    variant: 'destructive',
    children: 'Terminate Coverage',
  },
}

// Group of Related Actions
export const ActionGroup: Story = {
  render: () => (
    <div className="flex gap-3">
      <Button variant="primary">Save Quote</Button>
      <Button variant="secondary">Save Draft</Button>
      <Button variant="outline">Cancel</Button>
    </div>
  ),
}

// Form Action Buttons
export const FormActions: Story = {
  render: () => (
    <div className="flex justify-between items-center w-[400px]">
      <Button variant="ghost">← Back</Button>
      <div className="flex gap-2">
        <Button variant="outline">Save Draft</Button>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Common form action layout with navigation and submission buttons.',
      },
    },
  },
}

// Accessibility Test
export const AccessibilityTest: Story = {
  args: {
    variant: 'primary',
    children: 'Accessible Button',
    'aria-label': 'Submit form',
    type: 'submit',
  },
  parameters: {
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true,
          },
          {
            id: 'keyboard-navigation',
            enabled: true,
          },
        ],
      },
    },
  },
}

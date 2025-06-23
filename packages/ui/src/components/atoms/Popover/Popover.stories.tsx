import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../Button/Button';
import { Popover } from './Popover';

const meta: Meta<typeof Popover> = {
  title: 'Atoms/Popover',
  component: Popover,
  parameters: {
    layout: 'centered',
    tags: ['atoms', 'stable'],
    docs: {
      description: {
        component: `
# Popover

A floating element that displays contextual information or UI controls when triggered by a button, link, or other interactive element.

## Features
- **Multiple positions**: Top, bottom, left, and right positioning
- **Accessibility**: Full keyboard navigation and screen reader support
- **Auto-positioning**: Smart positioning to stay within viewport bounds
- **Rich content**: Support for any React node as content
- **Customizable**: Various sizes, variants, and alignment options
- **Animations**: Smooth enter/exit animations

## Usage

\`\`\`tsx
import { Popover } from '@portals/ui';

// Basic popover
<Popover 
  trigger={<Button>Open Popover</Button>}
>
  Popover content
</Popover>

// With custom positioning
<Popover 
  trigger={<Button>Settings</Button>}
  contentProps={{
    side: 'right',
    align: 'start',
    size: 'sm'
  }}
>
  Settings menu
</Popover>

// With different variants
<Popover 
  trigger={<Button>More Info</Button>}
  contentProps={{
    variant: 'ghost',
    size: 'lg'
  }}
>
  Detailed information
</Popover>
\`\`\`

## When to use
- Display additional information on hover/click
- Create dropdown menus
- Show form controls in a floating panel
- Present contextual actions
- Display rich tooltips or help text
        `
      }
    }
  },
  argTypes: {
    trigger: {
      control: false,
      description: 'The element that triggers the popover'
    },
    contentProps: {
      control: 'object',
      description: 'Props for the popover content'
    }
  }
};

export default meta;
type Story = StoryObj<typeof Popover>;

export const Default: Story = {
  args: {
    trigger: <Button>Open Popover</Button>,
    children: <div>Basic popover content</div>
  }
};

export const WithCustomPosition: Story = {
  args: {
    trigger: <Button>Settings</Button>,
    contentProps: {
      side: 'right',
      align: 'start',
      size: 'sm'
    },
    children: <div>Settings menu content</div>
  }
};

export const GhostVariant: Story = {
  args: {
    trigger: <Button>More Info</Button>,
    contentProps: {
      variant: 'ghost',
      size: 'lg'
    },
    children: (
      <div className="space-y-2">
        <h3 className="font-medium">Detailed Information</h3>
        <p className="text-sm text-muted-foreground">
          This is a ghost variant popover with larger padding and no shadow.
        </p>
      </div>
    )
  }
};

export const OutlineVariant: Story = {
  args: {
    trigger: <Button variant="outline">Help</Button>,
    contentProps: {
      variant: 'outline',
      side: 'top'
    },
    children: (
      <div className="space-y-2">
        <h3 className="font-medium">Need Help?</h3>
        <p className="text-sm text-muted-foreground">
          This is an outline variant popover with a transparent background.
        </p>
      </div>
    )
  }
}; 
import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import type { ButtonProps } from './Button';

/**
 * Interface extending ButtonProps to include props specific to Storybook documentation or potentially missing from the base type.
 */
interface ButtonStoryProps extends ButtonProps {
  /** URL to navigate to when the button is clicked (renders as link) */
  href?: string;
  /** Deprecated: Use href instead */
  url?: string;
  /** Test attribute (deprecated, use standard data-cy attribute instead) */
  'data-cy'?: string;
}

/**
 * The Button component is used to trigger an action or event, or to navigate to another page.
 * It supports multiple variants, sizes, and states, and can be rendered as either a button or a link.
 */
const meta = {
  title: '⚛️ Atoms/Button',
  component: Button as any, // Cast to any to resolve type conflict
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile button component that supports multiple variants and sizes, with built-in support for rendering as a link when an href is provided.',
      },
    },
  },
  tags: ['autodocs'],
  args: {
    children: 'Button text',
    disabled: false,
    type: 'button',
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'warning', 'error', 'outline', 'ghost', 'destructive', 'default', 'link'],
      description: 'The visual style of the button',
      table: { 
        type: { summary: 'string' },
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'default', 'md', 'lg'],
      description: 'The size of the button',
      table: { 
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the button is disabled',
      table: { 
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    href: {
      control: 'text',
      description: 'URL to navigate to when the button is clicked (renders as link)',
      table: { type: { summary: 'string' } },
    },
    url: {
      control: 'text',
      description: 'Deprecated: Use href instead',
      table: { 
        type: { summary: 'string' },
        deprecated: true,
      },
    },
    onClick: {
      action: 'clicked',
      description: 'Function called when the button is clicked',
      table: { type: { summary: 'function' } },
    },
    type: {
      control: { type: 'select' },
      options: ['button', 'submit', 'reset'],
      description: 'The type of the button',
      table: { 
        type: { summary: 'string' },
        defaultValue: { summary: 'button' },
      },
    },
    className: {
      control: 'text',
      description: 'Additional CSS class names',
      table: { type: { summary: 'string' } },
    },
    children: {
      control: 'text',
      description: 'Button content',
      table: { type: { summary: 'ReactNode' } },
    },
    'data-cy': {
      control: 'text',
      description: 'Test attribute (deprecated, use standard data-cy attribute instead)',
    },
    asChild: {
      control: 'boolean',
      description: 'Whether to render as a child component',
      table: { 
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
} satisfies Meta<ButtonStoryProps>;

export default meta;
type Story = StoryObj<ButtonStoryProps>;

/**
 * The default state of the Button component.
 */
export const Default: Story = {
  args: {
    children: 'Default Button',
  },
};

/**
 * All Button variants in their default size
 */
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 items-start">
      <div className="flex flex-col gap-2 items-center">
        <Button variant="primary">Primary</Button>
        <span className="text-xs text-gray-500">primary</span>
      </div>
      <div className="flex flex-col gap-2 items-center">
        <Button variant="secondary">Secondary</Button>
        <span className="text-xs text-gray-500">secondary</span>
      </div>
      <div className="flex flex-col gap-2 items-center">
        <Button variant="success">Success</Button>
        <span className="text-xs text-gray-500">success</span>
      </div>
      <div className="flex flex-col gap-2 items-center">
        <Button variant="warning">Warning</Button>
        <span className="text-xs text-gray-500">warning</span>
      </div>
      <div className="flex flex-col gap-2 items-center">
        <Button variant="error">Error</Button>
        <span className="text-xs text-gray-500">error</span>
      </div>
      <div className="flex flex-col gap-2 items-center">
        <Button variant="outline">Outline</Button>
        <span className="text-xs text-gray-500">outline</span>
      </div>
      <div className="flex flex-col gap-2 items-center">
        <Button variant="ghost">Ghost</Button>
        <span className="text-xs text-gray-500">ghost</span>
      </div>
      <div className="flex flex-col gap-2 items-center">
        <Button variant="destructive">Destructive</Button>
        <span className="text-xs text-gray-500">destructive</span>
      </div>
      <div className="flex flex-col gap-2 items-center">
        <Button variant="default">Default</Button>
        <span className="text-xs text-gray-500">default</span>
      </div>
      <div className="flex flex-col gap-2 items-center">
        <Button variant="link">Link</Button>
        <span className="text-xs text-gray-500">link</span>
      </div>
    </div>
  )
};

/**
 * All Button sizes with the primary variant
 */
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 items-center">
      <div className="flex flex-col gap-2 items-center">
        <Button variant="primary" size="sm">Small</Button>
        <span className="text-xs text-gray-500">sm</span>
      </div>
      <div className="flex flex-col gap-2 items-center">
        <Button variant="primary" size="default">Default</Button>
        <span className="text-xs text-gray-500">default</span>
      </div>
      <div className="flex flex-col gap-2 items-center">
        <Button variant="primary" size="md">Medium</Button>
        <span className="text-xs text-gray-500">md</span>
      </div>
      <div className="flex flex-col gap-2 items-center">
        <Button variant="primary" size="lg">Large</Button>
        <span className="text-xs text-gray-500">lg</span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available button sizes with the primary variant.',
      },
    },
  },
};

/**
 * Button rendered as a link
 */
export const AsLink: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 items-start">
      <div className="flex flex-col gap-2 items-center">
        <Button variant="primary" href="#">Primary Link</Button>
        <span className="text-xs text-gray-500">primary</span>
      </div>
      <div className="flex flex-col gap-2 items-center">
        <Button variant="secondary" href="#">Secondary Link</Button>
        <span className="text-xs text-gray-500">secondary</span>
      </div>
      <div className="flex flex-col gap-2 items-center">
        <Button variant="outline" href="#">Outline Link</Button>
        <span className="text-xs text-gray-500">outline</span>
      </div>
      <div className="flex flex-col gap-2 items-center">
        <Button variant="link" href="#">Link Style Link</Button>
        <span className="text-xs text-gray-500">link</span>
      </div>
      <div className="flex flex-col gap-2 items-center">
        <Button variant="primary" href="#" disabled>Disabled Link</Button>
        <span className="text-xs text-gray-500">disabled</span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Button rendered as a link using the href property.',
      },
    },
  },
};

/**
 * Button with different types (for forms)
 */
export const ButtonTypes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 items-start">
      <div className="flex flex-col gap-2 items-center">
        <Button type="button">Button Type</Button>
        <span className="text-xs text-gray-500">type="button"</span>
      </div>
      <div className="flex flex-col gap-2 items-center">
        <Button type="submit">Submit Type</Button>
        <span className="text-xs text-gray-500">type="submit"</span>
      </div>
      <div className="flex flex-col gap-2 items-center">
        <Button type="reset">Reset Type</Button>
        <span className="text-xs text-gray-500">type="reset"</span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different button types for use in forms.',
      },
    },
  },
};

/**
 * Button with icons
 */
export const WithIcons: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-4 items-start">
        <div className="flex flex-col gap-2 items-center">
          <Button>
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Icon Left
          </Button>
          <span className="text-xs text-gray-500">icon left</span>
        </div>
        <div className="flex flex-col gap-2 items-center">
          <Button>
            Icon Right
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Button>
          <span className="text-xs text-gray-500">icon right</span>
        </div>
        <div className="flex flex-col gap-2 items-center">
          <Button className="p-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </Button>
          <span className="text-xs text-gray-500">icon only</span>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Button with icons in different positions.',
      },
    },
  },
};

/**
 * Button with custom styling
 */
export const CustomStyling: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 items-start">
      <div className="flex flex-col gap-2 items-center">
        <Button className="rounded-full">
          Rounded Full
        </Button>
        <span className="text-xs text-gray-500">rounded-full</span>
      </div>
      <div className="flex flex-col gap-2 items-center">
        <Button className="shadow-lg">
          With Shadow
        </Button>
        <span className="text-xs text-gray-500">shadow-lg</span>
      </div>
      <div className="flex flex-col gap-2 items-center">
        <Button className="uppercase tracking-wider">
          Uppercase
        </Button>
        <span className="text-xs text-gray-500">uppercase</span>
      </div>
      <div className="flex flex-col gap-2 items-center">
        <Button className="w-36 justify-start">
          Left Aligned
        </Button>
        <span className="text-xs text-gray-500">justify-start</span>
      </div>
      <div className="flex flex-col gap-2 items-center">
        <Button className="w-36 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
          Gradient
        </Button>
        <span className="text-xs text-gray-500">gradient</span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Button with custom styling applied using the className prop.',
      },
    },
  },
};

/**
 * Button group
 */
export const ButtonGroup: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="inline-flex rounded-md shadow-sm" role="group">
        <Button className="rounded-r-none border-r-0">
          Left
        </Button>
        <Button className="rounded-none border-r-0">
          Middle
        </Button>
        <Button className="rounded-l-none">
          Right
        </Button>
      </div>
      
      <div className="inline-flex rounded-md shadow-sm" role="group">
        <Button variant="outline" className="rounded-r-none border-r-0">
          Day
        </Button>
        <Button variant="outline" className="rounded-none border-r-0">
          Week
        </Button>
        <Button variant="outline" className="rounded-none border-r-0">
          Month
        </Button>
        <Button variant="outline" className="rounded-l-none">
          Year
        </Button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Buttons grouped together to form a single control.',
      },
    },
  },
};
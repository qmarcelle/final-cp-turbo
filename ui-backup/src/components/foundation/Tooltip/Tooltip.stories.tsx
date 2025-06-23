import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from './Tooltip';

// Info icon for demos
const InfoIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const meta: Meta<typeof Tooltip> = {
  title: '⚛️ Foundation/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
    tags: ['foundation', 'stable'],
    docs: {
      description: {
        component: `
# Tooltip

Contextual information overlay that appears on hover or focus to provide additional details without cluttering the interface.

## Features
- **Multiple positions**: Top, bottom, left, and right positioning options
- **Accessibility**: Full keyboard navigation and screen reader support
- **Auto-positioning**: Smart positioning to stay within viewport bounds
- **Rich content**: Support for text, formatted content, and custom elements
- **Hover and focus**: Responds to both mouse hover and keyboard focus
- **Customizable timing**: Configurable show/hide delays for better UX
- **Responsive**: Adapts positioning on smaller screens

## Usage

\`\`\`tsx
import { Tooltip } from '@portals/ui';

// Basic tooltip
<Tooltip content="This explains the feature">
  <button>Hover me</button>
</Tooltip>

// With custom positioning
<Tooltip content="Help text" position="top">
  <InfoIcon />
</Tooltip>

// Healthcare terminology help
<Tooltip content="The amount you pay before insurance covers costs">
  <span>Deductible <InfoIcon /></span>
</Tooltip>

// With longer content
<Tooltip content="Detailed explanation that can span multiple lines">
  <button>Complex feature</button>
</Tooltip>
\`\`\`

## When to use
- Explain unfamiliar terminology or concepts
- Provide additional context without cluttering UI
- Offer help text for form fields or icons
- Display detailed information on demand
- Clarify healthcare terms and benefits details

## Accessibility
- Proper ARIA attributes for screen readers
- Keyboard accessible (shows on focus)
- High contrast text and background
- Respects user motion preferences
- Clear focus indicators for trigger elements
        `
      }
    },
  },
  argTypes: {
    content: {
      control: 'text',
      description: 'Content to display in the tooltip',
      table: {
        type: { summary: 'React.ReactNode' },
      },
    },
    position: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Position of the tooltip relative to the trigger element',
      table: {
        type: { summary: 'top | bottom | left | right' },
        defaultValue: { summary: 'bottom' },
      },
    },
    children: {
      control: false,
      description: 'Trigger element that shows the tooltip on hover/focus',
      table: {
        type: { summary: 'React.ReactElement' },
      },
    },


  },
  args: {
    content: 'This is a tooltip',
    position: 'bottom',


  }
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  args: {
    content: 'This is helpful information',
    children: <button className="px-4 py-2 bg-primaryBlue text-white rounded">Hover me</button>,
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic tooltip with default bottom positioning. Hover over the button to see the tooltip.',
      },
    },
  },
};

export const WithIcon: Story = {
  args: {
    content: 'Click for more information about your benefits',
    children: <InfoIcon />,
  },
  parameters: {
    docs: {
      description: {
        story: 'Tooltip on an info icon, commonly used for providing contextual help in forms and data displays.',
      },
    },
  },
};

export const Positions: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-8 items-center justify-center p-16">
      <Tooltip content="Tooltip on top" position="top">
        <button className="px-4 py-2 bg-primaryBlue text-white rounded">Top</button>
      </Tooltip>
      
      <Tooltip content="Tooltip on bottom" position="bottom">
        <button className="px-4 py-2 bg-primaryBlue text-white rounded">Bottom</button>
      </Tooltip>
      
      <Tooltip content="Tooltip on left" position="left">
        <button className="px-4 py-2 bg-primaryBlue text-white rounded">Left</button>
      </Tooltip>
      
      <Tooltip content="Tooltip on right" position="right">
        <button className="px-4 py-2 bg-primaryBlue text-white rounded">Right</button>
      </Tooltip>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All four positioning options for tooltips. Choose based on available space and content layout.',
      },
    },
  },
};

export const LongContent: Story = {
  args: {
    content: 'This is a longer tooltip message that provides more detailed information about the feature or action. It can span multiple lines and wrap appropriately.',
    children: <button className="px-4 py-2 bg-primaryBlue text-white rounded">Hover for long tooltip</button>,
  },
  parameters: {
    docs: {
      description: {
        story: 'Tooltip with longer content that wraps to multiple lines. Use for detailed explanations.',
      },
    },
  },
};

export const HealthcareTerms: Story = {
  render: () => (
    <div className="space-y-4 max-w-md">
      <h3 className="text-lg font-semibold mb-4">Healthcare Benefits Glossary</h3>
      
      <div className="flex items-center gap-2">
        <span className="font-medium">Deductible:</span>
        <Tooltip content="The amount you pay for covered health care services before your insurance plan starts to pay." position="right">
          <InfoIcon />
        </Tooltip>
        <span className="text-gray-600">$1,500</span>
      </div>
      
      <div className="flex items-center gap-2">
        <span className="font-medium">Copayment:</span>
        <Tooltip content="A fixed amount you pay for a covered health care service, usually when you receive the service." position="right">
          <InfoIcon />
        </Tooltip>
        <span className="text-gray-600">$25</span>
      </div>
      
      <div className="flex items-center gap-2">
        <span className="font-medium">Out-of-pocket maximum:</span>
        <Tooltip content="The most you have to pay for covered services in a plan year. After you spend this amount on deductibles, copayments, and coinsurance, your health plan pays 100% of the costs." position="right">
          <InfoIcon />
        </Tooltip>
        <span className="text-gray-600">$8,000</span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tooltips explaining healthcare terminology in a benefits summary. Essential for member education.',
      },
    },
  },
};

export const FormFieldHelp: Story = {
  render: () => (
    <div className="max-w-md space-y-4">
      <h3 className="text-lg font-semibold mb-4">Member Registration</h3>
      
      <div className="space-y-3">
        <div>
          <label className="flex items-center gap-2 text-sm font-medium mb-1">
            Medicare ID Number
            <Tooltip content="Your 11-character Medicare ID found on your Medicare card. Format: 1ABC-DE2-FG34" position="top">
              <InfoIcon />
            </Tooltip>
          </label>
          <input type="text" className="w-full p-2 border rounded" placeholder="1ABC-DE2-FG34" />
        </div>
        
        <div>
          <label className="flex items-center gap-2 text-sm font-medium mb-1">
            Group Number
            <Tooltip content="The group number identifies your employer's insurance plan. Found on your insurance card." position="top">
              <InfoIcon />
            </Tooltip>
          </label>
          <input type="text" className="w-full p-2 border rounded" placeholder="GRP123456" />
        </div>
        
        <div>
          <label className="flex items-center gap-2 text-sm font-medium mb-1">
            Effective Date
            <Tooltip content="The date your insurance coverage begins. This cannot be changed after enrollment." position="top">
              <InfoIcon />
            </Tooltip>
          </label>
          <input type="date" className="w-full p-2 border rounded" />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tooltips providing help text for complex form fields in member registration workflows.',
      },
    },
  },
};

export const InteractiveStates: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <h4 className="font-medium">Normal State</h4>
        <Tooltip content="This tooltip works normally">
          <button className="px-4 py-2 bg-blue-500 text-white rounded">Normal Button</button>
        </Tooltip>
      </div>
      
      <div className="space-y-2">
        <h4 className="font-medium">Disabled Tooltip</h4>
        <Tooltip content="This tooltip is disabled">
          <button className="px-4 py-2 bg-gray-400 text-white rounded">Disabled Tooltip</button>
        </Tooltip>
      </div>
      
      <div className="space-y-2">
        <h4 className="font-medium">Keyboard Accessible</h4>
        <p className="text-sm text-gray-600">Tab to focus the button and see the tooltip</p>
        <Tooltip content="This tooltip appears on keyboard focus">
          <button className="px-4 py-2 bg-green-500 text-white rounded">Focus me with Tab</button>
        </Tooltip>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different tooltip states including normal, disabled, and keyboard accessibility demonstration.',
      },
    },
  },
};
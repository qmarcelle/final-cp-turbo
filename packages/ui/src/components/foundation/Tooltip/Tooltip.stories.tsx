import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tooltip } from './Tooltip';

// Info icon for demos
const InfoIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const meta: Meta<typeof Tooltip> = {
  title: '⚛️ Atoms/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Tooltips provide additional context on hover or focus.',
      },
    },
  },
  argTypes: {
    content: {
      control: 'text',
      description: 'Content to display in the tooltip',
    },
    position: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Position of the tooltip relative to the trigger',
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
};

export const WithIcon: Story = {
  args: {
    content: 'Click for more information about your benefits',
    children: <InfoIcon />,
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
};

export const LongContent: Story = {
  args: {
    content: 'This is a longer tooltip message that provides more detailed information about the feature or action. It can span multiple lines and wrap appropriately.',
    children: <button className="px-4 py-2 bg-primaryBlue text-white rounded">Hover for long tooltip</button>,
  },
};

export const HealthcareExample: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <span>Deductible:</span>
        <Tooltip content="The amount you pay for covered health care services before your insurance plan starts to pay.">
          <InfoIcon />
        </Tooltip>
      </div>
      
      <div className="flex items-center gap-2">
        <span>Copayment:</span>
        <Tooltip content="A fixed amount you pay for a covered health care service, usually when you receive the service.">
          <InfoIcon />
        </Tooltip>
      </div>
      
      <div className="flex items-center gap-2">
        <span>Out-of-pocket maximum:</span>
        <Tooltip content="The most you have to pay for covered services in a plan year. After you spend this amount on deductibles, copayments, and coinsurance, your health plan pays 100% of the costs.">
          <InfoIcon />
        </Tooltip>
      </div>
    </div>
  ),
};
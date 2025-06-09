import type { Meta, StoryObj } from '@storybook/react-vite';
import { StatusLabel } from './StatusLabel';

const meta: Meta<typeof StatusLabel> = {
  title: '⚛️ Atoms/StatusLabel',
  component: StatusLabel,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Status labels indicate the current state of claims, authorizations, and transactions.',
      },
    },
  },
  argTypes: {
    status: {
      control: 'select',
      options: ['pending', 'processed', 'denied', 'approved', 'partial-approval'],
      description: 'Status type to display',
    },
    text: {
      control: 'text',
      description: 'Text to display in the status label',
    },
  },
  args: {
    status: 'pending',
    text: 'Pending',
  }
};

export default meta;
type Story = StoryObj<typeof StatusLabel>;

export const Pending: Story = {
  args: {
    status: 'pending',
    text: 'Pending Review',
  },
};

export const Approved: Story = {
  args: {
    status: 'approved',
    text: 'Approved',
  },
};

export const Denied: Story = {
  args: {
    status: 'denied',
    text: 'Denied',
  },
};

export const Processed: Story = {
  args: {
    status: 'processed',
    text: 'Processed',
  },
};

export const PartialApproval: Story = {
  args: {
    status: 'partial-approval',
    text: 'Partial Approval',
  },
};

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 items-center">
      <StatusLabel status="pending" text="Pending" />
      <StatusLabel status="approved" text="Approved" />
      <StatusLabel status="denied" text="Denied" />
      <StatusLabel status="processed" text="Processed" />
      <StatusLabel status="partial-approval" text="Partial Approval" />
    </div>
  ),
};

export const ClaimExamples: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <span className="w-32 text-sm">Claim #12345:</span>
        <StatusLabel status="approved" text="Paid" />
      </div>
      <div className="flex items-center gap-2">
        <span className="w-32 text-sm">Claim #12346:</span>
        <StatusLabel status="pending" text="Under Review" />
      </div>
      <div className="flex items-center gap-2">
        <span className="w-32 text-sm">Claim #12347:</span>
        <StatusLabel status="denied" text="Denied - Missing Info" />
      </div>
      <div className="flex items-center gap-2">
        <span className="w-32 text-sm">Auth #98765:</span>
        <StatusLabel status="partial-approval" text="Partially Approved" />
      </div>
    </div>
  ),
};
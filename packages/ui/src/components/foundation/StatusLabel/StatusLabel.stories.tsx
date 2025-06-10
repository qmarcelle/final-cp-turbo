import type { Meta, StoryObj } from '@storybook/react';
import { StatusLabel } from './StatusLabel';

const meta: Meta<typeof StatusLabel> = {
  title: '⚛️ Foundation/StatusLabel',
  component: StatusLabel,
  parameters: {
    layout: 'centered',
    tags: ['foundation', 'stable'],
    docs: {
      description: {
        component: `
# StatusLabel

Semantic status indicators for claims, authorizations, transactions, and workflow states.

## Features
- **Semantic states**: Pre-defined status types with consistent meaning across the application
- **Visual clarity**: Color-coded indicators that don't rely solely on color for meaning
- **Healthcare context**: Designed specifically for medical claims and authorization workflows
- **Accessibility**: High contrast ratios and screen reader friendly text
- **Consistency**: Standardized appearance across all status displays
- **Flexible text**: Customizable label text while maintaining semantic meaning

## Usage

\`\`\`tsx
import { StatusLabel } from '@portals/ui';

// Basic status indicators
<StatusLabel status="approved" text="Approved" />
<StatusLabel status="pending" text="Under Review" />
<StatusLabel status="denied" text="Denied" />

// In claim listings
<div className="flex items-center gap-2">
  <span>Claim #12345:</span>
  <StatusLabel status="approved" text="Paid" />
</div>

// Custom text with standard status
<StatusLabel status="partial-approval" text="Partially Covered" />
\`\`\`

## When to use
- Display claim processing status
- Show authorization approval states  
- Indicate transaction completion status
- Communicate workflow progress
- Provide quick status identification in lists and tables

## Status Types
- **Pending**: Items awaiting review or processing
- **Approved**: Fully approved items ready for action
- **Denied**: Items that have been rejected
- **Processed**: Completed items that have been handled
- **Partial Approval**: Items with limited or conditional approval

## Accessibility
- Uses semantic color coding with text labels
- High contrast ratios meet WCAG AA standards
- Screen reader compatible with clear status communication
- Consistent visual patterns for easy recognition
        `
      }
    },
  },
  argTypes: {
    status: {
      control: 'select',
      options: ['pending', 'processed', 'denied', 'approved', 'partial-approval'],
      description: 'Semantic status type determining color and meaning',
      table: {
        type: { summary: 'pending | processed | denied | approved | partial-approval' },
        defaultValue: { summary: 'pending' },
      },
    },
    text: {
      control: 'text',
      description: 'Display text for the status label',
      table: {
        type: { summary: 'string' },
      },
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for custom styling',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
  },
  args: {
    status: 'pending',
    text: 'Pending',
  }
};

export default meta;
type Story = StoryObj<typeof StatusLabel>;

export const Default: Story = {
  args: {
    status: 'pending',
    text: 'Pending Review',
  },
  parameters: {
    docs: {
      description: {
        story: 'Default pending status label commonly used for items awaiting review.',
      },
    },
  },
};

export const Approved: Story = {
  args: {
    status: 'approved',
    text: 'Approved',
  },
  parameters: {
    docs: {
      description: {
        story: 'Approved status indicating successful completion or authorization.',
      },
    },
  },
};

export const Denied: Story = {
  args: {
    status: 'denied',
    text: 'Denied',
  },
  parameters: {
    docs: {
      description: {
        story: 'Denied status for rejected claims or authorization requests.',
      },
    },
  },
};

export const Processed: Story = {
  args: {
    status: 'processed',
    text: 'Processed',
  },
  parameters: {
    docs: {
      description: {
        story: 'Processed status for completed items that have been handled.',
      },
    },
  },
};

export const PartialApproval: Story = {
  args: {
    status: 'partial-approval',
    text: 'Partial Approval',
  },
  parameters: {
    docs: {
      description: {
        story: 'Partial approval status for items with limited or conditional authorization.',
      },
    },
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
  parameters: {
    docs: {
      description: {
        story: 'All available status types showing the complete range of states.',
      },
    },
  },
};

export const ClaimExamples: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <span className="w-32 text-sm font-medium">Claim #12345:</span>
        <StatusLabel status="approved" text="Paid" />
      </div>
      <div className="flex items-center gap-2">
        <span className="w-32 text-sm font-medium">Claim #12346:</span>
        <StatusLabel status="pending" text="Under Review" />
      </div>
      <div className="flex items-center gap-2">
        <span className="w-32 text-sm font-medium">Claim #12347:</span>
        <StatusLabel status="denied" text="Denied - Missing Info" />
      </div>
      <div className="flex items-center gap-2">
        <span className="w-32 text-sm font-medium">Auth #98765:</span>
        <StatusLabel status="partial-approval" text="Partially Approved" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Real-world examples showing status labels in healthcare claim listings.',
      },
    },
  },
};

export const AuthorizationWorkflow: Story = {
  render: () => (
    <div className="max-w-md mx-auto p-4 border rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Prior Authorization Workflow</h3>
      <div className="space-y-3">
        <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
          <span className="text-sm">Initial Request</span>
          <StatusLabel status="processed" text="Submitted" />
        </div>
        <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
          <span className="text-sm">Medical Review</span>
          <StatusLabel status="pending" text="In Progress" />
        </div>
        <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
          <span className="text-sm">Clinical Decision</span>
          <StatusLabel status="pending" text="Awaiting Review" />
        </div>
        <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
          <span className="text-sm">Final Determination</span>
          <StatusLabel status="pending" text="Pending" />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Status labels used in a typical prior authorization workflow showing different stages.',
      },
    },
  },
};

export const CustomLabels: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 items-center">
      <StatusLabel status="approved" text="✓ Covered" />
      <StatusLabel status="pending" text="⏳ Pending Review" />
      <StatusLabel status="denied" text="✗ Not Covered" />
      <StatusLabel status="partial-approval" text="⚠️ Limited Coverage" />
      <StatusLabel status="processed" text="📋 Complete" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Status labels with custom text and emoji icons for enhanced visual communication.',
      },
    },
  },
};
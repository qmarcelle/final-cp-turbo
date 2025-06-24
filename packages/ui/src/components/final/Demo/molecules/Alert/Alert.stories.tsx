import type { Meta, StoryObj } from '@storybook/react'
import { userEvent, within, expect } from 'storybook/test'
import { Alert } from './Alert'
import { Button } from '../../atoms/Button/Button'
import { getStoryMeta } from '../../utils/getStoryMeta'

// Get the meta data from the utility function
const metaData = getStoryMeta({
  title: '🧬 Molecules/Alert⚠️',
  component: Alert,
  tags: ['autodocs'],
  description:
    'Alert component for notifications, warnings, and status messages in the broker portal',
})

// Create the meta object that satisfies Storybook's requirements
const meta = {
  ...metaData,
} satisfies Meta<typeof Alert>

export default meta
type Story = StoryObj<typeof meta>

// Basic Alert Types
export const Info: Story = {
  args: {
    variant: 'info',
    title: 'Information',
    children: 'This is an informational message with important details.',
  },
}

export const Success: Story = {
  args: {
    variant: 'success',
    title: 'Success',
    children: 'Your action was completed successfully.',
  },
}

export const Warning: Story = {
  args: {
    variant: 'warning',
    title: 'Warning',
    children: 'Please review this important warning before proceeding.',
  },
}

export const Error: Story = {
  args: {
    variant: 'error',
    title: 'Error',
    children: 'An error occurred while processing your request.',
  },
}

// Without Title
export const InfoNoTitle: Story = {
  args: {
    variant: 'info',
    children: 'This is an informational message without a title.',
  },
}

export const SuccessNoTitle: Story = {
  args: {
    variant: 'success',
    children: 'Operation completed successfully.',
  },
}

// Dismissible Alerts
export const Dismissible: Story = {
  args: {
    variant: 'info',
    title: 'Dismissible Alert',
    children: 'You can dismiss this alert by clicking the X button.',
    dismissible: true,
    onDismiss: () => {
      // eslint-disable-next-line no-alert
      // alert('Alert dismissed!');
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const dismissButton = canvas.getByRole('button', { name: /dismiss/i })

    // Test dismiss interaction
    await userEvent.click(dismissButton)
  },
}

// Broker Portal Specific Alerts
export const ApplicationSubmitted: Story = {
  args: {
    variant: 'success',
    title: 'Application Submitted',
    children:
      'The member application has been successfully submitted for processing. You will receive a confirmation email shortly.',
    dismissible: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Success alert shown after submitting a member application',
      },
    },
  },
}

export const CommissionProcessing: Story = {
  args: {
    variant: 'info',
    title: 'Commission Processing',
    children:
      'Your commission payment is currently being processed and will be available within 2-3 business days.',
  },
  parameters: {
    docs: {
      description: {
        story: 'Information alert about commission payment status',
      },
    },
  },
}

export const GroupTerminationWarning: Story = {
  args: {
    variant: 'warning',
    title: 'Group Termination Pending',
    children:
      'This group has a pending termination date of March 31, 2024. Please ensure all members are notified and alternative coverage is arranged.',
  },
  parameters: {
    docs: {
      description: {
        story: 'Warning alert for upcoming group termination',
      },
    },
  },
}

export const SystemMaintenance: Story = {
  args: {
    variant: 'warning',
    title: 'Scheduled Maintenance',
    children:
      'The broker portal will be unavailable for scheduled maintenance on Sunday, January 28th from 2:00 AM to 6:00 AM EST.',
  },
  parameters: {
    docs: {
      description: {
        story: 'System maintenance notification alert',
      },
    },
  },
}

export const QuoteExpiration: Story = {
  args: {
    variant: 'warning',
    title: 'Quote Expiring Soon',
    children:
      'Your quote for TechCorp Inc. will expire on January 30, 2024. Please complete the enrollment process to avoid re-quoting.',
  },
  parameters: {
    docs: {
      description: {
        story: 'Alert warning about expiring quotes',
      },
    },
  },
}

export const PaymentError: Story = {
  args: {
    variant: 'error',
    title: 'Payment Processing Error',
    children:
      'There was an error processing the premium payment for Group #TC-2024-001. Please contact support for assistance.',
  },
  parameters: {
    docs: {
      description: {
        story: 'Error alert for payment processing issues',
      },
    },
  },
}

export const ValidationErrors: Story = {
  args: {
    variant: 'error',
    title: 'Validation Errors',
    children: (
      <div>
        <p className="mb-2">Please correct the following errors:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Social Security Number is required</li>
          <li>Date of Birth must be in MM/DD/YYYY format</li>
          <li>Email address is invalid</li>
        </ul>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Error alert showing form validation issues',
      },
    },
  },
}

// Alerts with Actions
export const WithAction: Story = {
  args: {
    variant: 'info',
    title: 'New Commission Statement Available',
    children:
      'Your Q4 2024 commission statement is now available for download.',
    action: (
      <Button variant="outline" size="sm">
        Download Statement
      </Button>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Alert with action button for user interaction',
      },
    },
  },
}

export const WithMultipleActions: Story = {
  args: {
    variant: 'warning',
    title: 'Pending Group Renewal',
    children:
      'The renewal for Manufacturing Solutions LLC is due within 30 days. Please review the renewal terms.',
    action: (
      <div className="flex gap-2">
        <Button variant="outline" size="sm">
          Review Terms
        </Button>
        <Button variant="primary" size="sm">
          Process Renewal
        </Button>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Alert with multiple action buttons',
      },
    },
  },
}

// Complex Content Alert
export const ComplexContent: Story = {
  args: {
    variant: 'info',
    title: 'New Features Available',
    children: (
      <div className="space-y-3">
        <p>
          We've released new features to improve your broker portal experience:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Enhanced commission reporting with trend analysis</li>
          <li>Bulk member enrollment capabilities</li>
          <li>Mobile-responsive dashboard</li>
          <li>Real-time notification system</li>
        </ul>
        <p className="text-sm">
          Visit our{' '}
          <a href="#" className="text-blue-600 hover:underline">
            training center
          </a>{' '}
          to learn more about these features.
        </p>
      </div>
    ),
    dismissible: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Alert with complex content including lists and links',
      },
    },
  },
}

// Alert Banner (Full Width)
export const Banner: Story = {
  render: () => (
    <div className="w-full -m-4">
      <Alert
        variant="warning"
        title="Service Disruption Notice"
        className="rounded-none border-x-0"
      >
        Due to unexpected high volume, some services may experience delays.
        We're working to resolve this as quickly as possible.
      </Alert>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Full-width banner alert for system-wide notifications',
      },
    },
  },
}

// Inline Alert (Compact)
export const Compact: Story = {
  args: {
    variant: 'warning',
    size: 'sm',
    children: 'This field is required',
  },
  parameters: {
    docs: {
      description: {
        story: 'Compact alert for inline form validation',
      },
    },
  },
}

// Alert Stack Example
export const AlertStack: Story = {
  render: () => (
    <div className="space-y-4">
      <Alert
        variant="success"
        title="Application Approved"
        children="John Smith's application has been approved and coverage is now active."
      />
      <Alert variant="warning" title="Renewal Reminder">
        3 groups have renewals due within the next 30 days.
        <div className="mt-2">
          <Button variant="outline" size="sm">
            View Renewals
          </Button>
        </div>
      </Alert>
      <Alert
        variant="info"
        title="Training Available"
        children="New broker training sessions are available for the updated commission structure."
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Multiple alerts stacked vertically as they might appear in a dashboard',
      },
    },
  },
}

// Interactive Examples
export const InteractiveAlert: Story = {
  args: {
    variant: 'warning',
    title: 'Confirm Action',
    children:
      'Are you sure you want to terminate coverage for this group? This action cannot be undone.',
    action: (
      <div className="flex gap-2">
        <Button variant="outline" size="sm">
          Cancel
        </Button>
        <Button variant="destructive" size="sm">
          Confirm Termination
        </Button>
      </div>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const cancelButton = canvas.getByText('Cancel')
    const confirmButton = canvas.getByText('Confirm Termination')

    // Test interaction
    await userEvent.hover(confirmButton)
    await userEvent.click(cancelButton)
  },
}

// Form Validation Context
export const FormValidationExample: Story = {
  render: () => (
    <div className="space-y-4">
      <Alert
        variant="error"
        title="Form Submission Failed"
        children="Please correct the errors below and try again."
      />
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium mb-1">
            Email Address
          </label>
          <input
            type="email"
            className="w-full px-3 py-2 border border-red-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Enter email address"
          />
          <Alert variant="error" className="mt-1">
            Please enter a valid email address
          </Alert>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Phone Number</label>
          <input
            type="tel"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="(423) 555-0123"
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Alert used in form validation context with field-level errors',
      },
    },
  },
}

// Accessibility Test
export const AccessibilityTest: Story = {
  args: {
    variant: 'error',
    title: 'Error Alert',
    children: 'This alert has proper accessibility attributes.',
    role: 'alert',
    'aria-live': 'polite',
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement)
    const alert = canvas.getByRole('alert')

    // Test accessibility attributes
    expect(alert).toHaveAttribute('role', 'alert')
    expect(alert).toHaveAttribute('aria-live')
    expect(alert).toBeVisible()

    // Test content structure
    const title = canvas.getByText('Error Alert')
    expect(title).toBeInTheDocument()
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
            id: 'aria-roles',
            enabled: true,
          },
        ],
      },
    },
  },
}

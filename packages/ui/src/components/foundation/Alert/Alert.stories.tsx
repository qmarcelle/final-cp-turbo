import type { Meta, StoryObj } from '@storybook/react'
import { Alert } from './Alert'
import { useState } from 'react'

const meta: Meta<typeof Alert> = {
  title: '⚛️ Foundation/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
    tags: ['foundation', 'stable'],
    docs: {
      description: {
        component: `
# Alert

Display important information and messages with appropriate severity levels and visual styling.

## Features
- **Multiple variants**: Info, warning, success, and error states with semantic colors
- **Optional titles**: Support for headings to highlight key information
- **Dismissible**: Optional close button for user-controlled dismissal
- **Custom icons**: Default icons per variant with option to override
- **Accessibility**: Full ARIA support with alert role and screen reader compatibility
- **Design consistency**: Integrated with design system colors and spacing
- **Flexible content**: Support for rich content including text, links, and formatting

## Usage

\`\`\`tsx
import { Alert } from '@portals/ui';

// Basic info alert
<Alert variant="info" title="Information">
  This is an informational message for the user.
</Alert>

// Success alert with custom action
<Alert variant="success" title="Success!" onClose={() => setShow(false)}>
  Your changes have been saved successfully.
</Alert>

// Error alert
<Alert variant="error" title="Error">
  Please fix the following errors before continuing.
</Alert>

// Warning without title
<Alert variant="warning">
  This action cannot be undone.
</Alert>
\`\`\`

## When to use
- Communicate important system status changes
- Display validation errors and form feedback
- Show success confirmations for user actions
- Provide contextual information and warnings
- Alert users to critical issues requiring attention

## Accessibility
- Uses proper ARIA alert role for screen readers
- Color is not the only indicator (includes icons and text)
- High contrast ratios meet WCAG requirements
- Keyboard accessible dismiss functionality
- Clear, descriptive content for assistive technologies
        `
      }
    }
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'warning', 'success', 'error'],
      description: 'Alert severity level and visual style',
      table: {
        type: { summary: 'info | warning | success | error' },
        defaultValue: { summary: 'info' },
      },
    },
    title: {
      control: 'text',
      description: 'Optional alert title/heading',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    children: {
      control: 'text',
      description: 'Alert content and message',
      table: {
        type: { summary: 'React.ReactNode' },
      },
    },
    onClose: {
      action: 'close',
      description: 'Callback when alert is dismissed',
      table: {
        type: { summary: '() => void' },
        defaultValue: { summary: 'undefined' },
      },
    },
    icon: {
      control: false,
      description: 'Custom icon component (overrides default)',
      table: {
        type: { summary: 'React.ComponentType<React.SVGProps<SVGSVGElement>>' },
        defaultValue: { summary: 'Auto-selected based on variant' },
      },
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    'data-cy': {
      control: 'text',
      description: 'Cypress testing attribute',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
  },
  args: {
    variant: 'info',
    title: 'Alert Title',
    children: 'This is an alert message.',
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    variant: 'info',
    title: 'Information',
    children: 'This is an informational alert with default styling.',
  },
  parameters: {
    docs: {
      description: {
        story: 'Default info alert with title and message. Use for general information and updates.',
      },
    },
  },
}

export const Variants: Story = {
  render: () => (
    <div className="space-y-4 w-full max-w-lg">
      <Alert variant="info" title="Information">
        This is an informational message for your reference.
      </Alert>
      <Alert variant="success" title="Success">
        Your action completed successfully.
      </Alert>
      <Alert variant="warning" title="Warning">
        Please review this before proceeding.
      </Alert>
      <Alert variant="error" title="Error">
        There was a problem with your request.
      </Alert>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All alert variants showing different severity levels with appropriate colors and icons.',
      },
    },
  },
}

export const WithoutTitle: Story = {
  render: () => (
    <div className="space-y-4 w-full max-w-lg">
      <Alert variant="info">
        Simple informational message without a title.
      </Alert>
      <Alert variant="success">
        Task completed successfully.
      </Alert>
      <Alert variant="warning">
        This action cannot be undone.
      </Alert>
      <Alert variant="error">
        Invalid email address format.
      </Alert>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Alerts without titles for simpler messages and inline feedback.',
      },
    },
  },
}

export const Dismissible: Story = {
  render: () => {
    const [alerts, setAlerts] = useState({
      info: true,
      success: true,
      warning: true,
      error: true,
    })

    const handleClose = (type: keyof typeof alerts) => {
      setAlerts(prev => ({ ...prev, [type]: false }))
    }

    return (
      <div className="space-y-4 w-full max-w-lg">
        {alerts.info && (
          <Alert 
            variant="info" 
            title="Dismissible Info"
            onClose={() => handleClose('info')}
          >
            Click the close button to dismiss this alert.
          </Alert>
        )}
        {alerts.success && (
          <Alert 
            variant="success" 
            title="Task Completed"
            onClose={() => handleClose('success')}
          >
            Your file has been uploaded successfully.
          </Alert>
        )}
        {alerts.warning && (
          <Alert 
            variant="warning" 
            title="Storage Nearly Full"
            onClose={() => handleClose('warning')}
          >
            You have used 90% of your storage quota.
          </Alert>
        )}
        {alerts.error && (
          <Alert 
            variant="error" 
            title="Connection Failed"
            onClose={() => handleClose('error')}
          >
            Unable to connect to the server. Please try again.
          </Alert>
        )}
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Dismissible alerts that users can close. Useful for notifications and non-critical messages.',
      },
    },
  },
}

export const RichContent: Story = {
  render: () => (
    <div className="space-y-4 w-full max-w-lg">
      <Alert variant="success" title="Account Created">
        Welcome to our platform! Your account has been created successfully.{' '}
        <a href="#" className="underline font-medium">
          Complete your profile
        </a>{' '}
        to get started.
      </Alert>
      
      <Alert variant="warning" title="Security Notice">
        <div>
          <p className="mb-2">
            We noticed a login from a new device. If this wasn't you:
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>Change your password immediately</li>
            <li>Review your recent activity</li>
            <li>Enable two-factor authentication</li>
          </ul>
        </div>
      </Alert>
      
      <Alert variant="error" title="Form Validation Errors">
        <div>
          <p className="mb-2">Please fix the following errors:</p>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>Email address is required</li>
            <li>Password must be at least 8 characters</li>
            <li>Phone number format is invalid</li>
          </ul>
        </div>
      </Alert>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Alerts with rich content including links, lists, and formatted text for complex messages.',
      },
    },
  },
}

export const PersistentAlerts: Story = {
  render: () => (
    <div className="space-y-4 w-full max-w-lg">
      <Alert variant="error" title="System Maintenance">
        Scheduled maintenance will begin at 2:00 AM UTC. Some features may be unavailable for up to 30 minutes.
      </Alert>
      
      <Alert variant="warning" title="Beta Feature">
        This feature is currently in beta. Please report any issues to our support team.
      </Alert>
      
      <Alert variant="info" title="New Features Available">
        We've added new collaboration tools to help your team work more efficiently. Check out the updates in your dashboard.
      </Alert>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Non-dismissible alerts for persistent information that users should always see.',
      },
    },
  },
} 
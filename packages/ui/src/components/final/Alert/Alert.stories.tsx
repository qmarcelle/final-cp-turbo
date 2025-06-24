import type { Meta, StoryObj } from '@storybook/react'
import { Alert } from './Alert'

const meta = {
  title: 'Molecules/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Alert

A versatile alert component for displaying important messages, notifications, and feedback to users.

## Features
- Multiple variants (info, success, warning, error)
- Optional icon support
- Dismissible option
- Custom content support
- Accessibility-first design
- Responsive layout

## Usage

\`\`\`tsx
import { Alert } from '@portals/ui';

// Basic usage
<Alert>Important information</Alert>

// With variant
<Alert variant="success">Operation completed successfully</Alert>

// Dismissible
<Alert dismissible onDismiss={() => console.log('dismissed')}>
  Click the X to dismiss
</Alert>

// With custom icon
<Alert icon={<CustomIcon />}>Custom icon alert</Alert>
\`\`\`
`,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error'],
      description: 'The visual style of the alert',
    },
    dismissible: {
      control: 'boolean',
      description: 'Whether the alert can be dismissed',
    },
    icon: {
      control: 'boolean',
      description: 'Whether to show the default icon',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
} satisfies Meta<typeof Alert>

export default meta
type Story = StoryObj<typeof Alert>

export const Default: Story = {
  args: {
    children: 'This is a default alert message.',
  },
}

export const Variants: Story = {
  render: () => (
    <div className="space-y-4 w-[500px]">
      <Alert variant="info">This is an informational message.</Alert>
      <Alert variant="success">Operation completed successfully!</Alert>
      <Alert variant="warning">
        Please review your input before proceeding.
      </Alert>
      <Alert variant="error">
        An error occurred while processing your request.
      </Alert>
    </div>
  ),
}

export const WithIcons: Story = {
  render: () => (
    <div className="space-y-4 w-[500px]">
      <Alert variant="info" icon>
        Information with icon
      </Alert>
      <Alert variant="success" icon>
        Success with icon
      </Alert>
      <Alert variant="warning" icon>
        Warning with icon
      </Alert>
      <Alert variant="error" icon>
        Error with icon
      </Alert>
    </div>
  ),
}

export const Dismissible: Story = {
  args: {
    variant: 'info',
    dismissible: true,
    children: 'Click the X button to dismiss this alert.',
  },
}

export const WithActions: Story = {
  render: () => (
    <div className="space-y-4 w-[500px]">
      <Alert
        variant="warning"
        icon
        action={
          <button className="underline hover:no-underline">
            Review Settings
          </button>
        }
      >
        Your account settings need attention.
      </Alert>
      <Alert
        variant="error"
        icon
        action={
          <button className="underline hover:no-underline">Try Again</button>
        }
      >
        Failed to save changes.
      </Alert>
    </div>
  ),
}

export const WithCustomContent: Story = {
  render: () => (
    <Alert variant="info" className="w-[500px]">
      <h4 className="font-semibold mb-2">Update Available</h4>
      <p className="text-sm">
        A new version of the application is available. Please save your work and
        refresh the page to get the latest features.
      </p>
      <div className="mt-4 flex gap-3">
        <button className="text-sm underline hover:no-underline">
          Learn More
        </button>
        <button className="text-sm underline hover:no-underline">
          Refresh Now
        </button>
      </div>
    </Alert>
  ),
}

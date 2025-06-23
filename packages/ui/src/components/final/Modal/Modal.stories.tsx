import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';
import { Button } from '../Button/Button';
import { useState } from 'react';

const meta = {
  title: '🧬 Molecules/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Modal

A flexible modal dialog component for displaying content that requires user attention or interaction.

## Features
- Multiple sizes
- Custom header and footer
- Backdrop click handling
- Keyboard accessibility (Esc to close)
- Focus management
- Scroll lock when open
- Responsive design

## Usage

\`\`\`tsx
import { Modal } from '@portals/ui';

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Modal Title"
      >
        Modal content goes here
      </Modal>
    </>
  );
}
\`\`\`
`
      }
    }
  },
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Controls the visibility of the modal',
    },
    title: {
      control: 'text',
      description: 'Title displayed in the modal header',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
      description: 'Size of the modal',
    },
    closeOnBackdropClick: {
      control: 'boolean',
      description: 'Whether clicking the backdrop closes the modal',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof Modal>;

const ModalTemplate = ({ isOpen: defaultIsOpen = false, ...args }) => {
  const [isOpen, setIsOpen] = useState(defaultIsOpen);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export const Default: Story = {
  render: (args) => (
    <ModalTemplate
      {...args}
      title="Example Modal"
      children="This is a basic modal with default settings."
    />
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex gap-4">
      <ModalTemplate
        title="Small Modal"
        size="sm"
        children="A small modal for simple content."
      />
      <ModalTemplate
        title="Large Modal"
        size="lg"
        children="A large modal for more complex content."
      />
      <ModalTemplate
        title="Full Screen"
        size="full"
        children="A full screen modal for immersive experiences."
      />
    </div>
  ),
};

export const WithCustomHeader: Story = {
  render: (args) => (
    <ModalTemplate
      {...args}
      title={
        <div className="flex items-center gap-2 text-primary">
          <span>🎉</span>
          <span>Custom Header</span>
        </div>
      }
      children="Modal with a custom header component."
    />
  ),
};

export const WithFooter: Story = {
  render: (args) => (
    <ModalTemplate
      {...args}
      title="Confirmation"
      footer={
        <div className="flex justify-end gap-3">
          <Button variant="secondary">Cancel</Button>
          <Button variant="primary">Confirm</Button>
        </div>
      }
    >
      Are you sure you want to proceed with this action?
    </ModalTemplate>
  ),
};

export const WithScrollContent: Story = {
  render: (args) => (
    <ModalTemplate
      {...args}
      title="Terms of Service"
      size="lg"
    >
      <div className="prose">
        <h2>Terms and Conditions</h2>
        {Array.from({ length: 10 }).map((_, i) => (
          <p key={i}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        ))}
      </div>
    </ModalTemplate>
  ),
};

export const WithForm: Story = {
  render: (args) => (
    <ModalTemplate
      {...args}
      title="Edit Profile"
      size="md"
      footer={
        <div className="flex justify-end gap-3">
          <Button variant="secondary">Cancel</Button>
          <Button variant="primary">Save Changes</Button>
        </div>
      }
    >
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            className="w-full rounded-md border p-2"
            placeholder="Enter your name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            className="w-full rounded-md border p-2"
            placeholder="Enter your email"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Bio</label>
          <textarea
            className="w-full rounded-md border p-2"
            rows={3}
            placeholder="Tell us about yourself"
          />
        </div>
      </form>
    </ModalTemplate>
  ),
};
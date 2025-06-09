import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Modal,
  ModalTrigger,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalTitle,
  ModalDescription,
} from './Modal';
import { Button } from '../../foundation/Button/Button';

const meta: Meta<typeof Modal> = {
  title: '🦠 Organisms/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  render: (args) => (
    <Modal {...args}>
      <ModalTrigger asChild>
        <Button variant="outline">Open Modal</Button>
      </ModalTrigger>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Modal Title</ModalTitle>
          <ModalDescription>
            This is the modal description. You can put any content here.
          </ModalDescription>
        </ModalHeader>
        <div className="py-4">
            This is the body of the modal.
        </div>
        <ModalFooter>
          <Button variant="secondary">Cancel</Button>
          <Button>Confirm</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
}; 
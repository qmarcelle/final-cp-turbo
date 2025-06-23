import type { Meta, StoryObj } from '@storybook/react'
import {
  Modal,
  ModalTrigger,
  ModalHeader,
  ModalFooter,
  ModalTitle,
  ModalDescription,
  ModalBody,
} from './Modal'
import { Button } from '../Button/Button'

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['molecule', 'autodocs'],
  decorators: [
    (Story) => (
      <Modal>
        <Story />
      </Modal>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <>
      <ModalTrigger asChild>
        <Button>Open Modal</Button>
      </ModalTrigger>
      <Modal>
        <ModalHeader>
          <ModalTitle>Example Modal</ModalTitle>
          <ModalDescription>
            This is a basic modal with a title and description.
          </ModalDescription>
        </ModalHeader>
        <ModalBody>
          <p>Modal content goes here.</p>
        </ModalBody>
        <ModalFooter>
          <Button variant="outline">Cancel</Button>
          <Button>Save Changes</Button>
        </ModalFooter>
      </Modal>
    </>
  ),
}

export const Positions: Story = {
  render: () => (
    <div className="flex gap-2">
      {(['center', 'top', 'right', 'bottom', 'left'] as const).map((position) => (
        <Modal key={position} position={position}>
          <ModalTrigger asChild>
            <Button variant="outline">Open {position}</Button>
          </ModalTrigger>
          <ModalHeader>
            <ModalTitle>{position} Modal</ModalTitle>
          </ModalHeader>
          <ModalBody>
            <p>This modal appears from the {position}.</p>
          </ModalBody>
        </Modal>
      ))}
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex gap-2">
      {(['sm', 'md', 'lg', 'xl', '2xl'] as const).map((size) => (
        <Modal key={size} size={size}>
          <ModalTrigger asChild>
            <Button variant="outline">{size.toUpperCase()}</Button>
          </ModalTrigger>
          <ModalHeader>
            <ModalTitle>{size.toUpperCase()} Modal</ModalTitle>
          </ModalHeader>
          <ModalBody>
            <p>This is a {size.toUpperCase()} sized modal.</p>
          </ModalBody>
        </Modal>
      ))}
    </div>
  ),
}

export const WithBlur: Story = {
  render: () => (
    <Modal variant="blur">
      <ModalTrigger asChild>
        <Button>Blur Background</Button>
      </ModalTrigger>
      <ModalHeader>
        <ModalTitle>Blurred Background</ModalTitle>
        <ModalDescription>
          This modal has a blurred backdrop effect.
        </ModalDescription>
      </ModalHeader>
      <ModalBody>
        <p>Content with blurred background overlay.</p>
      </ModalBody>
    </Modal>
  ),
}

export const NoCloseButton: Story = {
  render: () => (
    <Modal showCloseButton={false}>
      <ModalTrigger asChild>
        <Button>No Close Button</Button>
      </ModalTrigger>
      <ModalHeader>
        <ModalTitle>No Close Button</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <p>This modal doesn't show the close button in the corner.</p>
      </ModalBody>
      <ModalFooter>
        <ModalClose asChild>
          <Button>Close</Button>
        </ModalClose>
      </ModalFooter>
    </Modal>
  ),
}

export const LongContent: Story = {
  render: () => (
    <Modal>
      <ModalTrigger asChild>
        <Button>Scrollable Content</Button>
      </ModalTrigger>
      <ModalHeader>
        <ModalTitle>Scrollable Modal</ModalTitle>
      </ModalHeader>
      <ModalBody className="max-h-[400px] overflow-auto">
        {Array.from({ length: 20 }).map((_, i) => (
          <p key={i} className="mb-4">
            Paragraph {i + 1} - Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Sed do eiusmod tempor incididunt ut labore et dolore magna
            aliqua.
          </p>
        ))}
      </ModalBody>
      <ModalFooter>
        <Button>Close</Button>
      </ModalFooter>
    </Modal>
  ),
}

export const NestedModals: Story = {
  render: () => (
    <Modal>
      <ModalTrigger asChild>
        <Button>Open First Modal</Button>
      </ModalTrigger>
      <ModalHeader>
        <ModalTitle>First Modal</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <p>This modal contains another modal.</p>
        <Modal>
          <ModalTrigger asChild>
            <Button className="mt-4">Open Second Modal</Button>
          </ModalTrigger>
          <ModalHeader>
            <ModalTitle>Second Modal</ModalTitle>
          </ModalHeader>
          <ModalBody>
            <p>This is a nested modal!</p>
          </ModalBody>
        </Modal>
      </ModalBody>
    </Modal>
  ),
} 
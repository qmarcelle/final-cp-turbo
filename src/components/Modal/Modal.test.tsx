import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe, toHaveNoViolations } from 'jest-axe'
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

expect.extend(toHaveNoViolations)

const TestModal = ({
  showCloseButton = true,
  position = 'center',
  size = 'md',
  variant = 'default',
}) => (
  <Modal
    showCloseButton={showCloseButton}
    position={position}
    size={size}
    variant={variant}
  >
    <ModalTrigger asChild>
      <Button>Open Modal</Button>
    </ModalTrigger>
    <ModalHeader>
      <ModalTitle>Test Modal</ModalTitle>
      <ModalDescription>Modal Description</ModalDescription>
    </ModalHeader>
    <ModalBody>
      <p>Modal Content</p>
    </ModalBody>
    <ModalFooter>
      <Button>Close</Button>
    </ModalFooter>
  </Modal>
)

describe('Modal', () => {
  it('renders modal trigger button', () => {
    render(<TestModal />)
    expect(screen.getByRole('button', { name: 'Open Modal' })).toBeInTheDocument()
  })

  it('opens modal when trigger is clicked', async () => {
    const user = userEvent.setup()
    render(<TestModal />)
    
    await user.click(screen.getByRole('button', { name: 'Open Modal' }))
    
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText('Test Modal')).toBeInTheDocument()
    expect(screen.getByText('Modal Description')).toBeInTheDocument()
    expect(screen.getByText('Modal Content')).toBeInTheDocument()
  })

  it('closes modal when close button is clicked', async () => {
    const user = userEvent.setup()
    render(<TestModal />)
    
    await user.click(screen.getByRole('button', { name: 'Open Modal' }))
    await user.click(screen.getByRole('button', { name: 'Close' }))
    
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('closes modal when escape key is pressed', async () => {
    const user = userEvent.setup()
    render(<TestModal />)
    
    await user.click(screen.getByRole('button', { name: 'Open Modal' }))
    await user.keyboard('{Escape}')
    
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('closes modal when overlay is clicked', async () => {
    const user = userEvent.setup()
    render(<TestModal />)
    
    await user.click(screen.getByRole('button', { name: 'Open Modal' }))
    
    const dialog = screen.getByRole('dialog')
    await user.click(dialog.parentElement!) // Click overlay
    
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('does not show close button when showCloseButton is false', async () => {
    const user = userEvent.setup()
    render(<TestModal showCloseButton={false} />)
    
    await user.click(screen.getByRole('button', { name: 'Open Modal' }))
    
    expect(screen.queryByRole('button', { name: 'Close' })).not.toBeInTheDocument()
  })

  it('applies correct position classes', async () => {
    const user = userEvent.setup()
    render(<TestModal position="right" />)
    
    await user.click(screen.getByRole('button', { name: 'Open Modal' }))
    
    expect(screen.getByRole('dialog')).toHaveClass('right-0')
  })

  it('applies correct size classes', async () => {
    const user = userEvent.setup()
    render(<TestModal size="lg" />)
    
    await user.click(screen.getByRole('button', { name: 'Open Modal' }))
    
    expect(screen.getByRole('dialog')).toHaveClass('max-w-lg')
  })

  it('applies blur variant class to overlay', async () => {
    const user = userEvent.setup()
    render(<TestModal variant="blur" />)
    
    await user.click(screen.getByRole('button', { name: 'Open Modal' }))
    
    expect(document.querySelector('[class*="backdrop-blur-sm"]')).toBeInTheDocument()
  })

  it('forwards ref to dialog content', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(
      <Modal ref={ref}>
        <ModalBody>Content</ModalBody>
      </Modal>
    )
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })

  it('is accessible', async () => {
    const { container } = render(<TestModal />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
}) 
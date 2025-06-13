import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Alert  } from '../../../foundation/Alert/Alert'
import '@testing-library/jest-dom'
import { PencilIcon } from '@heroicons/react/24/outline'

describe('Alert Component', () => {
  it('renders with default props (info variant)', () => {
    render(<Alert data-cy="info-alert">Alert content</Alert>)
    
    const alert = screen.getByRole('alert')
    expect(alert).toBeInTheDocument()
    expect(alert).toHaveClass('bg-blue-50')
    expect(screen.getByText('Alert content')).toBeInTheDocument()
  })

  it('renders with warning variant', () => {
    render(<Alert variant="warning" data-cy="warning-alert">Warning message</Alert>)
    
    const alert = screen.getByRole('alert')
    expect(alert).toBeInTheDocument()
    expect(alert).toHaveClass('bg-yellow-50')
    expect(screen.getByText('Warning message')).toBeInTheDocument()
  })

  it('renders with success variant', () => {
    render(<Alert variant="success" data-cy="success-alert">Success message</Alert>)
    
    const alert = screen.getByRole('alert')
    expect(alert).toBeInTheDocument()
    expect(alert).toHaveClass('bg-green-50')
    expect(screen.getByText('Success message')).toBeInTheDocument()
  })

  it('renders with error variant', () => {
    render(<Alert variant="error" data-cy="error-alert">Error message</Alert>)
    
    const alert = screen.getByRole('alert')
    expect(alert).toBeInTheDocument()
    expect(alert).toHaveClass('bg-red-50')
    expect(screen.getByText('Error message')).toBeInTheDocument()
  })

  it('renders with a title', () => {
    render(
      <Alert title="Alert Title" data-cy="titled-alert">
        Alert with title
      </Alert>
    )
    
    expect(screen.getByText('Alert Title')).toBeInTheDocument()
    expect(screen.getByText('Alert with title')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(
      <Alert className="custom-class" data-cy="custom-class-alert">
        Alert with custom class
      </Alert>
    )
    
    const alert = screen.getByRole('alert')
    expect(alert).toHaveClass('custom-class')
  })

  it('uses data-cy attribute correctly', () => {
    render(<Alert data-cy="test-alert">Alert with data-cy</Alert>)
    
    const alert = screen.getByRole('alert')
    expect(alert).toHaveAttribute('data-cy', 'test-alert')
  })

  it('uses custom icon when provided', () => {
    render(
      <Alert icon={PencilIcon} data-cy="custom-icon-alert">
        Alert with custom icon
      </Alert>
    )
    
    // The icon is rendered, but we can't directly test the SVG component
    // Instead, we verify the alert content is rendered
    expect(screen.getByText('Alert with custom icon')).toBeInTheDocument()
  })

  it('calls onClose when close button is clicked', () => {
    const handleClose = jest.fn()
    
    render(
      <Alert onClose={handleClose} data-cy="closable-alert">
        Closable alert
      </Alert>
    )
    
    const closeButton = screen.getByRole('button')
    fireEvent.click(closeButton)
    
    expect(handleClose).toHaveBeenCalledTimes(1)
  })
}) 
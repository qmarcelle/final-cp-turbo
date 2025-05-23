/**
 * @jest-environment jsdom
 */
import * as React from 'react'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'
import { expect } from '@jest/globals'
import type { RenderResult } from '@testing-library/react'
import { Button } from '../button'
import type { ButtonProps } from '../button'
import userEvent from '@testing-library/user-event'


describe('Button Component', () => {
  const renderButton = (props: Partial<ButtonProps> = {}): RenderResult => {
    const defaultProps: ButtonProps = {
      children: 'Click me',
      'data-cy': 'test-button',
      ...props,
    }
    return render(<Button {...defaultProps} />)
  }

  it('renders with children', () => {
    renderButton()
    const button = screen.getByText('Click me')
    expect(button).toBeInTheDocument()
  })

  it('handles click events', () => {
    const onClick = jest.fn()
    renderButton({ onClick })
    const button = screen.getByText('Click me')
    fireEvent.click(button)
    expect(onClick).toHaveBeenCalled()
  })

  it('applies variant styles', () => {
    renderButton({ variant: 'primary' })
    const button = screen.getByRole('button')
    expect(button).toHaveClass('btn', 'btn-primary')
  })

  it('applies size styles', () => {
    renderButton({ size: 'sm' })
    const button = screen.getByRole('button')
    expect(button).toHaveClass('btn', 'btn-sm')
  })

  it('handles disabled state', () => {
    renderButton({ disabled: true })
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
    expect(button).toHaveAttribute('aria-disabled', 'true')
    expect(button).toHaveClass('btn-disabled')
  })

  it('applies custom className', () => {
    renderButton({ className: 'custom-class' })
    const button = screen.getByRole('button')
    expect(button).toHaveClass('custom-class')
  })

  it('renders with default props', () => {
    render(<Button data-cy="default-button">Click me</Button>)
    
    const button = screen.getByRole('button', { name: 'Click me' })
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('btn-primary')
    expect(button).toHaveClass('btn-md')
    expect(button).toHaveAttribute('data-cy', 'default-button')
    expect(button).toHaveAttribute('type', 'button')
  })

  it('renders with different variants', () => {
    const variants = ['primary', 'secondary', 'success', 'warning', 'error', 'outline', 'ghost'] as const
    
    variants.forEach((variant) => {
      render(<Button variant={variant} data-cy={`${variant}-button`}>
        {variant} button
      </Button>)
      
      const button = screen.getByRole('button', { name: `${variant} button` })
      expect(button).toHaveClass(`btn-${variant}`)
    })
  })

  it('renders with different sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const
    
    sizes.forEach((size) => {
      render(<Button size={size} data-cy={`${size}-button`}>
        {size} button
      </Button>)
      
      const button = screen.getByRole('button', { name: `${size} button` })
      expect(button).toHaveClass(`btn-${size}`)
    })
  })

  it('applies custom className', () => {
    render(
      <Button className="custom-class" data-cy="custom-class-button">
        Custom class button
      </Button>
    )
    
    const button = screen.getByRole('button', { name: 'Custom class button' })
    expect(button).toHaveClass('custom-class')
  })

  it('renders as disabled when disabled prop is true', () => {
    render(
      <Button disabled data-cy="disabled-button">
        Disabled button
      </Button>
    )
    
    const button = screen.getByRole('button', { name: 'Disabled button' })
    expect(button).toBeDisabled()
    expect(button).toHaveClass('btn-disabled')
  })

  it('renders with custom type attribute', () => {
    render(
      <Button type="submit" data-cy="submit-button">
        Submit button
      </Button>
    )
    
    const button = screen.getByRole('button', { name: 'Submit button' })
    expect(button).toHaveAttribute('type', 'submit')
  })

  it('calls onClick handler when clicked', () => {
    const handleClick = jest.fn()
    
    render(
      <Button onClick={handleClick} data-cy="clickable-button">
        Clickable button
      </Button>
    )
    
    const button = screen.getByRole('button', { name: 'Clickable button' })
    fireEvent.click(button)
    
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('does not call onClick when disabled', () => {
    const handleClick = jest.fn()
    
    render(
      <Button onClick={handleClick} disabled data-cy="disabled-button">
        Disabled button
      </Button>
    )
    
    const button = screen.getByRole('button', { name: 'Disabled button' })
    fireEvent.click(button)
    
    expect(handleClick).not.toHaveBeenCalled()
  })

  describe('Accessibility', () => {
    it('should have correct ARIA attributes when enabled', () => {
      const { container } = render(<Button>Click Me</Button>)
      const button = container.querySelector('button')
      expect(button).toHaveAttribute('role', 'button')
      expect(button).not.toHaveAttribute('aria-disabled')
    })

    it('should have correct ARIA attributes when disabled', () => {
      const { container } = render(<Button disabled>Click Me</Button>)
      const button = container.querySelector('button')
      expect(button).toHaveAttribute('role', 'button')
      expect(button).toHaveAttribute('aria-disabled', 'true')
    })

    it('should be keyboard accessible', () => {
      renderButton()
      const button = screen.getByRole('button')
      button.focus()
      expect(document.activeElement).toBe(button)
    })
  })

  it('forwards ref to the button element', () => {
    const ref = React.createRef<HTMLButtonElement>()
    
    render(
      <Button ref={ref} data-cy="ref-button">
        Button with ref
      </Button>
    )
    
    expect(ref.current).not.toBeNull()
    expect(ref.current?.tagName).toBe('BUTTON')
  })
}) 
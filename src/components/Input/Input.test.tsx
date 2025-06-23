import * as React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe, toHaveNoViolations } from 'jest-axe'
import { Input } from './Input'

expect.extend(toHaveNoViolations)

describe('Input', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  it('renders correctly', () => {
    render(<Input placeholder="Test input" />)
    expect(screen.getByPlaceholderText('Test input')).toBeInTheDocument()
  })

  it('handles value changes', async () => {
    const handleChange = vi.fn()
    render(<Input onChange={handleChange} />)
    
    const input = screen.getByRole('textbox')
    await userEvent.type(input, 'test')
    
    expect(handleChange).toHaveBeenCalledTimes(4)
    expect(input).toHaveValue('test')
  })

  it('applies variant styles correctly', () => {
    const { rerender } = render(<Input variant="error" />)
    expect(screen.getByRole('textbox')).toHaveClass('border-red-500')

    rerender(<Input variant="success" />)
    expect(screen.getByRole('textbox')).toHaveClass('border-green-500')
  })

  it('applies size styles correctly', () => {
    const { rerender } = render(<Input size="sm" />)
    expect(screen.getByRole('textbox')).toHaveClass('h-8')

    rerender(<Input size="lg" />)
    expect(screen.getByRole('textbox')).toHaveClass('h-12')
  })

  it('renders prefix and suffix correctly', () => {
    render(
      <Input
        prefix={<span data-testid="prefix">$</span>}
        suffix={<span data-testid="suffix">.00</span>}
      />
    )
    expect(screen.getByTestId('prefix')).toBeInTheDocument()
    expect(screen.getByTestId('suffix')).toBeInTheDocument()
  })

  it('shows error message', () => {
    render(<Input error="Test error" />)
    expect(screen.getByRole('alert')).toHaveTextContent('Test error')
  })

  it('shows help text when no error', () => {
    render(<Input helpText="Test help" />)
    expect(screen.getByText('Test help')).toBeInTheDocument()
  })

  it('shows character count when enabled', () => {
    render(<Input showCount maxLength={10} value="test" />)
    expect(screen.getByText('4/10')).toBeInTheDocument()
  })

  it('handles debounced changes', async () => {
    const handleDebouncedChange = vi.fn()
    render(
      <Input
        debounceMs={500}
        onDebouncedChange={handleDebouncedChange}
      />
    )

    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'test' } })

    expect(handleDebouncedChange).not.toHaveBeenCalled()

    vi.advanceTimersByTime(500)

    expect(handleDebouncedChange).toHaveBeenCalledWith('test')
  })

  it('cancels debounce timer on unmount', () => {
    const handleDebouncedChange = vi.fn()
    const { unmount } = render(
      <Input
        debounceMs={500}
        onDebouncedChange={handleDebouncedChange}
      />
    )

    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'test' } })

    unmount()
    vi.advanceTimersByTime(500)

    expect(handleDebouncedChange).not.toHaveBeenCalled()
  })

  it('handles controlled value updates', () => {
    const { rerender } = render(<Input value="initial" />)
    expect(screen.getByRole('textbox')).toHaveValue('initial')

    rerender(<Input value="updated" />)
    expect(screen.getByRole('textbox')).toHaveValue('updated')
  })

  it('handles disabled state', () => {
    render(<Input disabled />)
    expect(screen.getByRole('textbox')).toBeDisabled()
  })

  it('handles readonly state', () => {
    render(<Input readOnly value="readonly value" />)
    expect(screen.getByRole('textbox')).toHaveAttribute('readonly')
  })

  it('handles required state', () => {
    render(<Input required />)
    expect(screen.getByRole('textbox')).toBeRequired()
  })

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLInputElement>()
    render(<Input ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLInputElement)
  })

  it('is accessible', async () => {
    const { container } = render(
      <div>
        <Input aria-label="Test input" />
        <Input placeholder="With placeholder" />
        <Input error="With error" />
        <Input prefix="$" suffix=".00" />
      </div>
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
}) 
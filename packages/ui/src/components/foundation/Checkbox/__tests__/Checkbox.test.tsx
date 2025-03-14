/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { useForm } from 'react-hook-form'
import { Checkbox  } from '../../../foundation/Checkbox/Checkbox'
import { axe } from '../../../../../tests/a11y/setup'

describe('Checkbox Component', () => {
  const BasicCheckbox = () => {
    const { control } = useForm({
      defaultValues: {
        test: false,
      },
    })

    return (
      <Checkbox
        name="test"
        control={control}
        label="Test Label"
        data-cy="test-checkbox"
      />
    )
  }

  const CustomClassCheckbox = () => {
    const { control } = useForm()
    return (
      <Checkbox
        name="test"
        control={control}
        label="Test Label"
        className="custom-class"
        data-cy="test-checkbox"
      />
    )
  }

  const DisabledCheckbox = () => {
    const { control } = useForm()
    return (
      <Checkbox
        name="test"
        control={control}
        label="Test Label"
        disabled
        data-cy="test-checkbox"
      />
    )
  }

  const IndeterminateCheckbox = () => {
    const { control } = useForm()
    return (
      <Checkbox
        name="test"
        control={control}
        label="Test Label"
        indeterminate
        data-cy="test-checkbox"
      />
    )
  }

  const ValidationCheckbox = () => {
    const { control } = useForm({
      defaultValues: {
        test: false,
      },
    })

    return (
      <Checkbox
        name="test"
        control={control}
        label="Test Label"
        validation={{ required: 'This field is required' }}
        data-cy="test-checkbox"
      />
    )
  }

  const RequiredCheckbox = () => {
    const { control } = useForm()
    return (
      <Checkbox
        name="test"
        control={control}
        label="Test Label"
        required
        data-cy="test-checkbox"
      />
    )
  }

  it('renders with label', () => {
    render(<BasicCheckbox />)
    const checkbox = screen.getByLabelText('Test Label')
    expect(checkbox).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(<CustomClassCheckbox />)
    const container = screen.getByRole('checkbox').closest('.form-control')
    expect(container).toHaveClass('custom-class')
  })

  it('handles disabled state', () => {
    render(<DisabledCheckbox />)
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toBeDisabled()
    expect(checkbox).toHaveClass('checkbox-disabled')
  })

  it('handles indeterminate state', () => {
    render(<IndeterminateCheckbox />)
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toHaveAttribute('aria-checked', 'mixed')
  })

  it('shows validation error', async () => {
    const ValidationForm = () => {
      const { control, handleSubmit } = useForm({
        defaultValues: {
          test: false,
        },
      })

      const onSubmit = () => {}

      return (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Checkbox
            name="test"
            control={control}
            label="Test Label"
            validation={{ required: 'This field is required' }}
            data-cy="test-checkbox"
          />
          <button type="submit">Submit</button>
        </form>
      )
    }

    render(<ValidationForm />)
    const checkbox = screen.getByRole('checkbox')
    const submitButton = screen.getByRole('button')
    
    fireEvent.submit(submitButton.closest('form')) // Trigger form validation

    const error = await screen.findByText('This field is required')
    expect(error).toBeInTheDocument()
    expect(checkbox).toHaveAttribute('aria-invalid', 'true')
  })

  describe('Accessibility', () => {


    it('should have correct ARIA attributes', () => {
      render(<RequiredCheckbox />)
      const checkbox = screen.getByRole('checkbox')
      expect(checkbox).toHaveAttribute('aria-required', 'true')
    })

    it('should be keyboard accessible', () => {
      render(<BasicCheckbox />)
      const checkbox = screen.getByRole('checkbox')
      checkbox.focus()
      expect(document.activeElement).toBe(checkbox)
    })
  })
}) 
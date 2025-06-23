import React from 'react'
import '@testing-library/jest-dom'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { AutoComplete, ControlledAutoComplete  } from '..'
import { useForm } from 'react-hook-form'
import { FormProvider  } from '../../../composite/FormContext/FormContext'
import { z } from 'zod'

const mockOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3', disabled: true },
]

const schema = z.object({
  testField: z.string(),
})

type TestForm = z.infer<typeof schema>

describe('AutoComplete Component', () => {
  it('renders correctly', () => {
    render(
      <AutoComplete
        options={mockOptions}
        value=""
        onChange={jest.fn()}
        data-cy="test-autocomplete"
      />
    )
    expect(screen.getByTestId('test-autocomplete')).toBeInTheDocument()
  })

  it('filters options based on input', async () => {
    const handleChange = jest.fn()
    render(
      <AutoComplete
        options={mockOptions}
        value=""
        onChange={handleChange}
        data-cy="test-autocomplete"
      />
    )

    const input = screen.getByTestId('test-autocomplete')
    fireEvent.change(input, { target: { value: 'Option 1' } })

    await waitFor(() => {
      const options = screen.getAllByRole('option')
      expect(options).toHaveLength(1)
      expect(options[0]).toHaveTextContent('Option 1')
    })
  })

  it('handles disabled state', () => {
    render(
      <AutoComplete
        options={mockOptions}
        value=""
        onChange={jest.fn()}
        disabled
        data-cy="test-autocomplete"
      />
    )
    expect(screen.getByTestId('test-autocomplete')).toBeDisabled()
  })
})

describe('ControlledAutoComplete Component', () => {
  const TestComponent = () => {
    const { control } = useForm<TestForm>()
    return (
      <FormProvider<TestForm> schema={schema}>
        <ControlledAutoComplete
          name="testField"
          control={control}
          options={mockOptions}
          label="Test Label"
          data-cy="test-autocomplete"
        />
      </FormProvider>
    )
  }

  it('renders with label', () => {
    render(<TestComponent />)
    expect(screen.getByText('Test Label')).toBeInTheDocument()
    expect(screen.getByTestId('test-autocomplete')).toBeInTheDocument()
  })

  it('shows validation error', async () => {
    const TestComponentWithError = () => {
      const { control } = useForm<TestForm>({
        defaultValues: { testField: '' },
        mode: 'onChange',
      })
      return (
        <FormProvider<TestForm> schema={schema}>
          <ControlledAutoComplete
            name="testField"
            control={control}
            options={mockOptions}
            validation={{ required: 'This field is required' }}
            data-cy="test-autocomplete"
          />
        </FormProvider>
      )
    }
    render(<TestComponentWithError />)
    
    const input = screen.getByTestId('test-autocomplete')
    fireEvent.blur(input)
    
    await waitFor(() => {
      expect(screen.getByText('This field is required')).toBeInTheDocument()
    })
  })
}) 
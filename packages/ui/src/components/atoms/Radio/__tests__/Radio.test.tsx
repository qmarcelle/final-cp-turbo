/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { expect } from '@jest/globals'
import { useForm, FormProvider } from 'react-hook-form'
import { Radio  } from '../../Radio'

interface FormValues {
  testField: string
}

describe('Radio Component', () => {
  const BasicRadio = () => {
    const { control } = useForm<FormValues>({
      defaultValues: {
        testField: 'option1'
      }
    })

    return (
      <Radio<FormValues>
        data-cy="test-radio"
        name="testField"
        control={control}
        value="option1"
        label="Test Radio"
      />
    )
  }

  it('renders basic radio correctly', () => {
    render(<BasicRadio />)
    
    const label = screen.getByText('Test Radio')
    expect(label).toBeInTheDocument()
  })
}) 
/**
 * @jest-environment jsdom
 */
/// <reference types="@testing-library/jest-dom" />
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/jest-globals'
import { describe, expect as jestExpect, it } from '@jest/globals'
import { useForm, FormProvider } from 'react-hook-form'
import { Radio } from '../../Radio'

// Create a properly typed expect function
const expect = jestExpect as unknown as jest.Expect;

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
    // @ts-ignore -- jest-dom types aren't properly recognized
    expect(label).toBeInTheDocument()
  })
}) 
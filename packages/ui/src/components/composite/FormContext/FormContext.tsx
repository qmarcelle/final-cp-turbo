'use client'

import * as React from 'react';
import { useForm, UseFormReturn, FieldValues, Path, RegisterOptions, DefaultValues } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { FormProvider as RHFFormProvider } from 'react-hook-form'

interface FormContextProps<T extends FieldValues = FieldValues> {
  form: UseFormReturn<T>
  schema: z.ZodType<T>
}

const FormContext = createContext<FormContextProps<FieldValues> | undefined>(undefined)

const defaultSchema = z.object({}) as z.ZodType<FieldValues>

export interface FormProviderProps<T extends FieldValues> extends UseFormReturn<T> {
  children: React.ReactNode
}

export function FormProvider<T extends FieldValues>({ children, ...methods }: FormProviderProps<T>) {
  return (
    <RHFFormProvider {...methods}>
      {children}
    </RHFFormProvider>
  )
}

export function useFormContext<T extends FieldValues>() {
  const context = useContext(FormContext)
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider')
  }
  return context as FormContextProps<T>
}

interface FieldOptions<T extends FieldValues> {
  required?: boolean | { value: boolean; message: string }
  validate?: RegisterOptions<T>['validate']
}

// Type-safe field registration helper
export function useField<T extends FieldValues>(
  name: Path<T>,
  options?: FieldOptions<T>
) {
  const { form } = useFormContext<T>()
  const error = form.formState.errors[name]

  return {
    field: form.register(name, options),
    error: error?.message as string | undefined,
    isError: !!error,
  }
}

// Example usage:
// const schema = z.object({
//   email: z.string().email(),
//   password: z.string().min(8),
// })
//
// type LoginForm = z.infer<typeof schema>
//
// function LoginForm() {
//   return (
//     <FormProvider<LoginForm>
//       schema={schema}
//       onSubmit={async (data) => {
//         // Handle form submission
//       }}
//     >
//       <FormGroup label="Email">
//         <Input {...useField('email')} />
//       </FormGroup>
//     </FormProvider>
//   )
// } 
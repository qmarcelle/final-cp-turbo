import { CheckIcon } from '@heroicons/react/24/outline'
import { cn } from '../../../utils/cn'
import * as React from 'react';
import { useState, useCallback } from 'react';
import { Control, DefaultValues, FieldValues, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider } from '../FormContext/FormContext'

export interface Step<T extends FieldValues> {
  id: string
  title: string
  description?: string
  shortLabel?: string
  component: (props: { control: Control<T> }) => React.ReactNode
  schema: z.ZodType<T>
  isOptional?: boolean
}

export interface FormStepperProps<T extends FieldValues> {
  steps: Step<T>[]
  currentStep?: number
  onStepChange?: (step: number) => void
  onComplete?: (data: T) => void | Promise<void>
  className?: string
  'data-cy'?: string
}

export function FormStepper<T extends FieldValues>({
  steps,
  currentStep: controlledStep,
  onStepChange,
  onComplete,
  className,
  'data-cy': dataCy,
}: FormStepperProps<T>) {
  const [internalStep, setInternalStep] = useState(0)
  const [formData, setFormData] = useState<Partial<T>>({})
  const currentStep = controlledStep ?? internalStep
  const isLastStep = currentStep === steps.length - 1
  const currentStepData = steps[currentStep]

  const form = useForm<T>({
    resolver: zodResolver(currentStepData.schema),
    defaultValues: formData as DefaultValues<T>,
  })

  const handleStepSubmit = useCallback(async (stepData: Partial<T>) => {
    const updatedData = { ...formData, ...stepData }
    setFormData(updatedData)

    if (isLastStep) {
      await onComplete?.(updatedData as T)
    } else {
      const nextStep = currentStep + 1
      if (onStepChange) {
        onStepChange(nextStep)
      } else {
        setInternalStep(nextStep)
      }
    }
  }, [currentStep, isLastStep, onComplete, onStepChange, formData])

  const handleBack = useCallback(() => {
    const prevStep = currentStep - 1
    if (onStepChange) {
      onStepChange(prevStep)
    } else {
      setInternalStep(prevStep)
    }
  }, [currentStep, onStepChange])

  return (
    <div className={cn('w-full space-y-8', className)} data-cy={dataCy}>
      <nav aria-label="Progress">
        <ol
          role="list"
          className="divide-y divide-gray-200 rounded-md border border-gray-200 md:flex md:divide-y-0 dark:divide-gray-700 dark:border-gray-700"
          data-cy={`${dataCy}-steps`}
        >
          {steps.map((step, index) => {
            const isCurrentStep = index === currentStep
            const isPreviousStep = index < currentStep
            const isNextStep = index > currentStep
            const stepLabel = step.shortLabel || `Step ${index + 1}`

            return (
              <li key={step.id} className="relative md:flex md:flex-1">
                {isPreviousStep && (
                  <button
                    type="button"
                    onClick={() => onStepChange?.(index)}
                    className="group flex w-full flex-col items-center"
                    data-cy={`${dataCy}-step-${step.id}`}
                    aria-label={`${step.title} (completed)`}
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 dark:bg-blue-500">
                      <CheckIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </span>
                    <span className="ml-4 text-sm font-medium text-gray-900 dark:text-white">
                      {step.title}
                    </span>
                    <span className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      {stepLabel}
                    </span>
                  </button>
                )}
                {isCurrentStep && (
                  <div
                    className="flex flex-col items-center px-6 py-4 text-sm font-medium"
                    aria-current="step"
                    data-cy={`${dataCy}-step-${step.id}`}
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-blue-600 dark:border-blue-500">
                      <span className="text-blue-600 dark:text-blue-500">
                        {index + 1}
                      </span>
                    </span>
                    <span className="ml-4 text-sm font-medium text-blue-600 dark:text-blue-500">
                      {step.title}
                    </span>
                    <span className="mt-1 text-xs text-blue-500 dark:text-blue-400">
                      {stepLabel}
                    </span>
                  </div>
                )}
                {isNextStep && (
                  <div
                    className="group flex flex-col items-center"
                    data-cy={`${dataCy}-step-${step.id}`}
                    aria-label={`${step.title} (not completed)`}
                  >
                    <span className="flex items-center px-6 py-4 text-sm font-medium">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-gray-300 dark:border-gray-600">
                        <span className="text-gray-500 dark:text-gray-400">
                          {index + 1}
                        </span>
                      </span>
                      <span className="ml-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                        {step.title}
                      </span>
                    </span>
                    <span className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                      {stepLabel}
                    </span>
                  </div>
                )}

                {!isLastStep && (
                  <div
                    className="absolute right-0 top-0 hidden h-full w-5 md:block"
                    aria-hidden="true"
                  >
                    <svg
                      className="h-full w-full text-gray-300 dark:text-gray-600"
                      viewBox="0 0 22 80"
                      fill="none"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M0 -2L20 40L0 82"
                        vectorEffect="non-scaling-stroke"
                        stroke="currentcolor"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                )}
              </li>
            )
          })}
        </ol>
      </nav>

      <div className="mt-8" data-cy={`${dataCy}-content`}>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(handleStepSubmit)} className="space-y-8">
            {currentStepData.component({ control: form.control })}
            
            <div className="mt-8 flex justify-between">
              <button
                type="button"
                onClick={handleBack}
                disabled={currentStep === 0}
                className={cn(
                  'rounded-lg px-4 py-2 text-sm font-medium',
                  'border border-gray-300 bg-white text-gray-700 shadow-sm hover:bg-gray-50',
                  'dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700',
                  'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
                  'disabled:cursor-not-allowed disabled:opacity-50'
                )}
                data-cy={`${dataCy}-back`}
              >
                Back
              </button>
              <button
                type="submit"
                className={cn(
                  'rounded-lg px-4 py-2 text-sm font-medium',
                  'bg-blue-600 text-white shadow-sm hover:bg-blue-700',
                  'dark:bg-blue-500 dark:hover:bg-blue-600',
                  'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                )}
                data-cy={`${dataCy}-${isLastStep ? 'complete' : 'next'}`}
              >
                {isLastStep ? 'Complete' : 'Next'}
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  )
}

// Example usage:
// const steps: Step<PersonalInfo & Address>[] = [
//   {
//     id: 'personal',
//     title: 'Personal Information',
//     component: <PersonalInfoForm />,
//     schema: personalInfoSchema,
//   },
//   {
//     id: 'address',
//     title: 'Address',
//     component: <AddressForm />,
//     schema: addressSchema,
//   },
// ]
//
// <FormStepper
//   steps={steps}
//   onComplete={async (data) => {
//     // Handle form completion
//     console.log('Form completed:', data)
//   }}
//   data-cy="registration-stepper"
// /> 
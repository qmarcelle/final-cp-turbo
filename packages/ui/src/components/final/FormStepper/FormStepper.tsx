import * as React from 'react'
import { cn } from '../../../utils'

export interface Step {
  title: string
  description?: string
  content?: React.ReactNode
}

export interface FormStepperProps {
  steps: Step[]
  currentStep?: number
  orientation?: 'horizontal' | 'vertical'
  showStepNumbers?: boolean
  icons?: {
    pending?: React.ReactNode
    current?: React.ReactNode
    completed?: React.ReactNode
  }
  onStepChange?: (step: number) => void
  children?: React.ReactNode
  className?: string
}

export const FormStepper = React.forwardRef<HTMLDivElement, FormStepperProps>(
  ({
    steps,
    currentStep = 0,
    orientation = 'horizontal',
    showStepNumbers = false,
    icons = {
      pending: '○',
      current: '●',
      completed: '✓',
    },
    onStepChange,
    children,
    className,
  }, ref) => {
    const isVertical = orientation === 'vertical'

    return (
      <div
        ref={ref}
        className={cn(
          'form-stepper',
          isVertical ? 'flex flex-row gap-8' : 'flex flex-col gap-6',
          className
        )}
      >
        <div
          className={cn(
            'steps',
            isVertical
              ? 'flex flex-col gap-4 min-w-[200px]'
              : 'flex flex-row justify-between'
          )}
        >
          {steps.map((step, index) => {
            const isCompleted = index < currentStep
            const isCurrent = index === currentStep
            const isPending = index > currentStep

            return (
              <div
                key={step.title}
                className={cn(
                  'step-item flex items-center gap-2',
                  isVertical ? 'flex-row' : 'flex-col',
                  isCurrent && 'current',
                  isCompleted && 'completed',
                  isPending && 'pending'
                )}
                onClick={() => onStepChange?.(index)}
                role="button"
                tabIndex={0}
              >
                <div className="step-indicator flex items-center justify-center">
                  {showStepNumbers ? (
                    <span className="step-number">{index + 1}</span>
                  ) : (
                    <span className="step-icon">
                      {isCompleted
                        ? icons.completed
                        : isCurrent
                        ? icons.current
                        : icons.pending}
                    </span>
                  )}
                </div>
                <div className={cn('step-content', isVertical ? 'text-left' : 'text-center')}>
                  <div className="step-title font-medium">{step.title}</div>
                  {step.description && (
                    <div className="step-description text-sm text-gray-500">
                      {step.description}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
        <div className="step-body flex-1">{children}</div>
      </div>
    )
  }
)

FormStepper.displayName = 'FormStepper' 
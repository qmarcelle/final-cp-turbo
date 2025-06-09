import * as React from 'react'
import * as ProgressPrimitive from '@radix-ui/react-progress'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../../lib/utils'

const progressVariants = cva(
  'relative h-2 w-full overflow-hidden rounded-full bg-secondary',
  {
    variants: {
      size: {
        sm: 'h-1',
        md: 'h-2',
        lg: 'h-3',
        xl: 'h-4'
      },
      variant: {
        default: 'bg-secondary',
        success: 'bg-green-100 dark:bg-green-900',
        warning: 'bg-yellow-100 dark:bg-yellow-900',
        error: 'bg-red-100 dark:bg-red-900'
      }
    },
    defaultVariants: {
      size: 'md',
      variant: 'default'
    }
  }
)

const progressIndicatorVariants = cva(
  'h-full w-full flex-1 bg-primary transition-all duration-300 ease-in-out',
  {
    variants: {
      variant: {
        default: 'bg-primary',
        success: 'bg-green-500',
        warning: 'bg-yellow-500',
        error: 'bg-red-500'
      },
      animated: {
        true: 'transition-transform duration-500 ease-out',
        false: ''
      }
    },
    defaultVariants: {
      variant: 'default',
      animated: true
    }
  }
)

export interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>,
    VariantProps<typeof progressVariants> {
  /**
   * The progress value (0-100)
   */
  value?: number
  /**
   * Maximum value for the progress
   */
  max?: number
  /**
   * Size variant of the progress bar
   */
  size?: 'sm' | 'md' | 'lg' | 'xl'
  /**
   * Visual variant of the progress bar
   */
  variant?: 'default' | 'success' | 'warning' | 'error'
  /**
   * Whether to show percentage text
   */
  showPercentage?: boolean
  /**
   * Whether to animate the progress
   */
  animated?: boolean
  /**
   * Custom label for accessibility
   */
  label?: string
  /**
   * Whether the progress is indeterminate (loading state)
   */
  indeterminate?: boolean
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ 
  className, 
  value = 0, 
  max = 100,
  size,
  variant,
  showPercentage,
  animated = true,
  label,
  indeterminate,
  ...props 
}, ref) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)
  
  return (
    <div className="w-full">
      {(label || showPercentage) && (
        <div className="flex justify-between text-sm mb-1">
          {label && <span className="font-medium">{label}</span>}
          {showPercentage && !indeterminate && (
            <span className="text-muted-foreground">{Math.round(percentage)}%</span>
          )}
        </div>
      )}
      
      <ProgressPrimitive.Root
        ref={ref}
        className={cn(progressVariants({ size, variant }), className)}
        value={indeterminate ? undefined : value}
        max={max}
        {...props}
      >
        <ProgressPrimitive.Indicator
          className={cn(
            progressIndicatorVariants({ variant, animated }),
            indeterminate && 'animate-pulse'
          )}
          style={{
            transform: indeterminate 
              ? 'translateX(-100%)' 
              : `translateX(-${100 - percentage}%)`
          }}
        />
      </ProgressPrimitive.Root>
    </div>
  )
})
Progress.displayName = ProgressPrimitive.Root.displayName

// Circular progress variant
export interface CircularProgressProps extends Omit<ProgressProps, 'size'> {
  /**
   * Size of the circular progress
   */
  size?: number
  /**
   * Stroke width of the circle
   */
  strokeWidth?: number
}

const CircularProgress = React.forwardRef<HTMLDivElement, CircularProgressProps>(({
  value = 0,
  max = 100,
  size = 120,
  strokeWidth = 8,
  variant = 'default',
  showPercentage = true,
  label,
  indeterminate,
  className,
  ...props
}, ref) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - (percentage / 100) * circumference
  
  const colorMap = {
    default: '#3b82f6',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444'
  }

  return (
    <div
      ref={ref}
      className={cn('relative inline-flex items-center justify-center', className)}
      style={{ width: size, height: size }}
      {...props}
    >
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          className="text-muted-foreground/20"
        />
        
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={colorMap[variant]}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={indeterminate ? 0 : strokeDashoffset}
          className={cn(
            'transition-all duration-500 ease-out',
            indeterminate && 'animate-spin'
          )}
          style={{
            strokeDasharray: indeterminate ? `${circumference * 0.25} ${circumference}` : strokeDasharray
          }}
        />
      </svg>
      
      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-sm font-medium">
        {showPercentage && !indeterminate && (
          <span className="text-lg font-bold">{Math.round(percentage)}%</span>
        )}
        {label && (
          <span className="text-xs text-muted-foreground mt-1 text-center">{label}</span>
        )}
      </div>
    </div>
  )
})
CircularProgress.displayName = 'CircularProgress'

// Step progress for multi-step workflows
export interface StepProgressProps {
  /**
   * Current step (0-based)
   */
  currentStep: number
  /**
   * Total number of steps
   */
  totalSteps: number
  /**
   * Step labels
   */
  steps?: string[]
  /**
   * Whether to show step numbers
   */
  showNumbers?: boolean
  /**
   * Size variant
   */
  size?: 'sm' | 'md' | 'lg'
  /**
   * Orientation
   */
  orientation?: 'horizontal' | 'vertical'
  className?: string
}

const StepProgress = React.forwardRef<HTMLDivElement, StepProgressProps>(({
  currentStep,
  totalSteps,
  steps,
  showNumbers = true,
  size = 'md',
  orientation = 'horizontal',
  className
}, ref) => {
  const sizeMap = {
    sm: 'h-6 w-6 text-xs',
    md: 'h-8 w-8 text-sm',
    lg: 'h-10 w-10 text-base'
  }

  const isHorizontal = orientation === 'horizontal'

  return (
    <div
      ref={ref}
      className={cn(
        'flex',
        isHorizontal ? 'items-center space-x-4' : 'flex-col space-y-4',
        className
      )}
    >
      {Array.from({ length: totalSteps }, (_, index) => {
        const isCompleted = index < currentStep
        const isCurrent = index === currentStep
        const stepNumber = index + 1
        const stepLabel = steps?.[index]

        return (
          <React.Fragment key={index}>
            <div className={cn('flex items-center', !isHorizontal && 'w-full')}>
              {/* Step circle */}
              <div
                className={cn(
                  'flex items-center justify-center rounded-full border-2 font-medium transition-colors',
                  sizeMap[size],
                  isCompleted
                    ? 'border-primary bg-primary text-primary-foreground'
                    : isCurrent
                    ? 'border-primary bg-background text-primary'
                    : 'border-muted bg-background text-muted-foreground'
                )}
              >
                {showNumbers ? stepNumber : null}
              </div>
              
              {/* Step label */}
              {stepLabel && (
                <span
                  className={cn(
                    'ml-3 text-sm font-medium',
                    isCompleted || isCurrent ? 'text-foreground' : 'text-muted-foreground'
                  )}
                >
                  {stepLabel}
                </span>
              )}
            </div>
            
            {/* Connector line */}
            {index < totalSteps - 1 && (
              <div
                className={cn(
                  'bg-border',
                  isHorizontal ? 'h-0.5 flex-1' : 'w-0.5 h-8 ml-4'
                )}
              />
            )}
          </React.Fragment>
        )
      })}
    </div>
  )
})
StepProgress.displayName = 'StepProgress'

export { Progress, CircularProgress, StepProgress, progressVariants } 
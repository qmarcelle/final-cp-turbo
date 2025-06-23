'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils';
import { Check, Circle } from 'lucide-react';

const stepperVariants = cva(
  'flex items-center',
  {
    variants: {
      orientation: {
        horizontal: 'flex-row',
        vertical: 'flex-col',
      },
      size: {
        sm: 'gap-4',
        md: 'gap-6',
        lg: 'gap-8',
      },
    },
    defaultVariants: {
      orientation: 'horizontal',
      size: 'md',
    },
  }
);

const stepVariants = cva(
  'flex items-center',
  {
    variants: {
      orientation: {
        horizontal: 'flex-row',
        vertical: 'flex-row',
      },
      size: {
        sm: 'gap-2',
        md: 'gap-3',
        lg: 'gap-4',
      },
    },
    defaultVariants: {
      orientation: 'horizontal',
      size: 'md',
    },
  }
);

const stepIconVariants = cva(
  'flex items-center justify-center rounded-full border-2 transition-colors',
  {
    variants: {
      status: {
        complete: 'bg-primary border-primary text-primary-foreground',
        current: 'border-primary text-primary',
        upcoming: 'border-muted-foreground text-muted-foreground',
      },
      size: {
        sm: 'h-6 w-6',
        md: 'h-8 w-8',
        lg: 'h-10 w-10',
      },
    },
    defaultVariants: {
      status: 'upcoming',
      size: 'md',
    },
  }
);

const stepConnectorVariants = cva(
  'flex-1 transition-colors',
  {
    variants: {
      orientation: {
        horizontal: 'h-[2px] mx-2',
        vertical: 'w-[2px] my-2 ml-4',
      },
      status: {
        complete: 'bg-primary',
        incomplete: 'bg-muted',
      },
    },
    defaultVariants: {
      orientation: 'horizontal',
      status: 'incomplete',
    },
  }
);

export interface StepperProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof stepperVariants> {
  activeStep: number;
  steps: {
    label: string;
    description?: string;
    optional?: boolean;
  }[];
}

const Stepper = React.forwardRef<HTMLDivElement, StepperProps>(
  ({
    className,
    orientation,
    size,
    activeStep,
    steps,
    ...props
  }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(stepperVariants({ orientation, size }), className)}
        {...props}
      >
        {steps.map((step, index) => {
          const status = index < activeStep
            ? 'complete'
            : index === activeStep
              ? 'current'
              : 'upcoming';

          return (
            <React.Fragment key={index}>
              <div className={cn(stepVariants({ orientation, size }))}>
                <div className={cn(stepIconVariants({ status, size }))}>
                  {status === 'complete' ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Circle className="h-4 w-4" />
                  )}
                </div>
                <div className="flex flex-col">
                  <span className={cn(
                    'text-sm font-medium',
                    status === 'upcoming' ? 'text-muted-foreground' : 'text-foreground'
                  )}>
                    {step.label}
                    {step.optional && (
                      <span className="text-xs text-muted-foreground ml-1">(Optional)</span>
                    )}
                  </span>
                  {step.description && (
                    <span className="text-xs text-muted-foreground">
                      {step.description}
                    </span>
                  )}
                </div>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    stepConnectorVariants({
                      orientation,
                      status: index < activeStep ? 'complete' : 'incomplete',
                    })
                  )}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    );
  }
);

Stepper.displayName = 'Stepper';

export { Stepper }; 
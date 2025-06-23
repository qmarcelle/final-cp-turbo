'use client';

import * as React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils';

const progressVariants = cva(
  'relative h-2 w-full overflow-hidden rounded-full bg-muted',
  {
    variants: {
      variant: {
        default: '',
        success: 'bg-green-100',
        warning: 'bg-yellow-100',
        error: 'bg-red-100',
      },
      size: {
        sm: 'h-1',
        md: 'h-2',
        lg: 'h-3',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

const progressIndicatorVariants = cva(
  'h-full w-full flex-1 transition-all',
  {
    variants: {
      variant: {
        default: 'bg-primary',
        success: 'bg-green-500',
        warning: 'bg-yellow-500',
        error: 'bg-red-500',
      },
      animated: {
        true: 'transition-transform duration-300',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      animated: true,
    },
  }
);

export interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>,
    VariantProps<typeof progressVariants> {
  value?: number;
  max?: number;
  animated?: boolean;
  indicatorVariant?: VariantProps<typeof progressIndicatorVariants>['variant'];
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({
  className,
  value,
  max = 100,
  variant,
  size,
  animated = true,
  indicatorVariant = variant,
  ...props
}, ref) => {
  const percentage = value != null ? Math.min((value / max) * 100, 100) : null;

  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(progressVariants({ variant, size }), className)}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={cn(
          progressIndicatorVariants({ variant: indicatorVariant, animated }),
          'transition-transform duration-300'
        )}
        style={{
          transform: `translateX(-${100 - (percentage || 0)}%)`,
        }}
      />
    </ProgressPrimitive.Root>
  );
});

Progress.displayName = 'Progress';

export { Progress }; 
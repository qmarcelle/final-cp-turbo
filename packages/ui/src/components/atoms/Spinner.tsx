'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils';
import { Loader2 } from 'lucide-react';

const spinnerVariants = cva(
  'animate-spin',
  {
    variants: {
      variant: {
        default: 'text-muted-foreground',
        primary: 'text-primary',
        secondary: 'text-secondary',
        white: 'text-white',
      },
      size: {
        xs: 'h-3 w-3',
        sm: 'h-4 w-4',
        md: 'h-6 w-6',
        lg: 'h-8 w-8',
        xl: 'h-12 w-12',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface SpinnerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof spinnerVariants> {
  label?: string;
}

const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  ({ className, variant, size, label, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="status"
        className={cn('inline-flex items-center gap-2', className)}
        {...props}
      >
        <Loader2 className={cn(spinnerVariants({ variant, size }))} />
        {label && (
          <span className="sr-only">{label}</span>
        )}
      </div>
    );
  }
);

Spinner.displayName = 'Spinner';

export { Spinner }; 
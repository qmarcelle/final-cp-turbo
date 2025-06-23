'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils';

const stackVariants = cva(
  'flex',
  {
    variants: {
      direction: {
        row: 'flex-row',
        column: 'flex-col',
        'row-reverse': 'flex-row-reverse',
        'column-reverse': 'flex-col-reverse',
      },
      align: {
        start: 'items-start',
        center: 'items-center',
        end: 'items-end',
        baseline: 'items-baseline',
        stretch: 'items-stretch',
      },
      justify: {
        start: 'justify-start',
        center: 'justify-center',
        end: 'justify-end',
        between: 'justify-between',
        around: 'justify-around',
        evenly: 'justify-evenly',
      },
      wrap: {
        nowrap: 'flex-nowrap',
        wrap: 'flex-wrap',
        'wrap-reverse': 'flex-wrap-reverse',
      },
      gap: {
        0: 'gap-0',
        1: 'gap-1',
        2: 'gap-2',
        3: 'gap-3',
        4: 'gap-4',
        5: 'gap-5',
        6: 'gap-6',
        8: 'gap-8',
        10: 'gap-10',
        12: 'gap-12',
      },
      responsive: {
        true: 'flex-col sm:flex-row',
        false: '',
      },
    },
    defaultVariants: {
      direction: 'column',
      align: 'stretch',
      justify: 'start',
      wrap: 'nowrap',
      gap: 4,
      responsive: false,
    },
  }
);

export interface StackProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof stackVariants> {
  as?: React.ElementType;
}

const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  ({
    className,
    direction,
    align,
    justify,
    wrap,
    gap,
    responsive,
    as: Component = 'div',
    ...props
  }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(
          stackVariants({ direction, align, justify, wrap, gap, responsive }),
          className
        )}
        {...props}
      />
    );
  }
);

Stack.displayName = 'Stack';

export { Stack }; 
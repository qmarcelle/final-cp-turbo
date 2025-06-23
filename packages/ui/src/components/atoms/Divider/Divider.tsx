'use client';

import * as React from 'react';
import { cn } from '../../../utils';

interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
  decorative?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  ({ className, orientation = 'horizontal', decorative = true, size = 'md', ...props }, ref) => {
    const sizesMap = {
      sm: orientation === 'horizontal' ? 'h-px' : 'w-px',
      md: orientation === 'horizontal' ? 'h-0.5' : 'w-0.5',
      lg: orientation === 'horizontal' ? 'h-1' : 'w-1',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'shrink-0 bg-border',
          orientation === 'horizontal' ? 'w-full' : 'h-full',
          sizesMap[size],
          className
        )}
        {...props}
        role={decorative ? 'none' : 'separator'}
        aria-orientation={decorative ? undefined : orientation}
      />
    );
  }
);

Divider.displayName = 'Divider';

export type { DividerProps };
export { Divider }; 
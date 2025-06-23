'use client';

import * as React from 'react';
import { cn } from '../../../../utils';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  center?: boolean;
  gutter?: boolean;
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size = 'lg', center = true, gutter = true, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'w-full',
          {
            'mx-auto': center,
            'px-4 sm:px-6 lg:px-8': gutter,
            'max-w-screen-sm': size === 'sm',
            'max-w-screen-md': size === 'md',
            'max-w-screen-lg': size === 'lg',
            'max-w-screen-xl': size === 'xl',
            'max-w-none': size === 'full',
          },
          className
        )}
        {...props}
      />
    );
  }
);

Container.displayName = 'Container';

export type { ContainerProps };
export { Container }; 
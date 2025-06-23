import React from 'react';
import { cn } from '../../../utils';

export interface InputGroupProps {
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export const InputGroup = React.forwardRef<HTMLDivElement, InputGroupProps>(
  ({ prefix, suffix, size = 'md', disabled = false, className, children }, ref) => {
    const sizeClasses = {
      sm: 'h-8',
      md: 'h-10',
      lg: 'h-12',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'flex w-full rounded-md border border-input bg-background',
          sizeClasses[size],
          disabled && 'cursor-not-allowed opacity-50',
          className
        )}
      >
        {prefix && (
          <div className="flex items-center justify-center px-3">
            {prefix}
          </div>
        )}
        {children}
        {suffix && (
          <div className="flex items-center justify-center">
            {suffix}
          </div>
        )}
      </div>
    );
  }
);

InputGroup.displayName = 'InputGroup'; 
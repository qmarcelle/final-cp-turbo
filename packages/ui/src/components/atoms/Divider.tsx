'use client';

import * as React from 'react';
import * as SeparatorPrimitive from '@radix-ui/react-separator';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils';

const dividerVariants = cva(
  'shrink-0 bg-border',
  {
    variants: {
      orientation: {
        horizontal: 'h-[1px] w-full',
        vertical: 'h-full w-[1px]',
      },
      variant: {
        default: 'bg-border',
        muted: 'bg-muted',
        primary: 'bg-primary/20',
      },
      spacing: {
        none: '',
        sm: 'my-2',
        md: 'my-4',
        lg: 'my-6',
      },
    },
    defaultVariants: {
      orientation: 'horizontal',
      variant: 'default',
      spacing: 'md',
    },
  }
);

export interface DividerProps
  extends React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>,
    VariantProps<typeof dividerVariants> {
  label?: string;
  labelPosition?: 'left' | 'center' | 'right';
}

const labelPositionClasses = {
  left: 'justify-start',
  center: 'justify-center',
  right: 'justify-end',
};

const Divider = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  DividerProps
>(({
  className,
  orientation = 'horizontal',
  variant,
  spacing,
  label,
  labelPosition = 'center',
  decorative = true,
  ...props
}, ref) => {
  if (label && orientation === 'horizontal') {
    return (
      <div className={cn('flex items-center', spacing && `my-${spacing}`)}>
        <SeparatorPrimitive.Root
          ref={ref}
          decorative={decorative}
          orientation={orientation}
          className={cn(dividerVariants({ orientation, variant, spacing: 'none' }), 'flex-1')}
          {...props}
        />
        <span className={cn(
          'px-3 text-sm text-muted-foreground whitespace-nowrap',
          labelPositionClasses[labelPosition]
        )}>
          {label}
        </span>
        <SeparatorPrimitive.Root
          decorative={decorative}
          orientation={orientation}
          className={cn(dividerVariants({ orientation, variant, spacing: 'none' }), 'flex-1')}
        />
      </div>
    );
  }

  return (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(dividerVariants({ orientation, variant, spacing }), className)}
      {...props}
    />
  );
});

Divider.displayName = 'Divider';

export { Divider }; 
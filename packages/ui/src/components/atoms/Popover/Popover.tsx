'use client';

import * as React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils';

const popoverContentVariants = cva(
  'z-popover min-w-[8rem] overflow-hidden rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none',
  {
    variants: {
      variant: {
        default: '',
        ghost: 'border-none shadow-none',
        outline: 'bg-transparent',
      },
      size: {
        sm: 'p-2',
        md: 'p-4',
        lg: 'p-6',
      },
      align: {
        start: '',
        center: '',
        end: '',
      },
      side: {
        top: '',
        right: '',
        bottom: '',
        left: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      align: 'center',
      side: 'bottom',
    },
  }
);

export interface PopoverProps extends PopoverPrimitive.PopoverProps {
  trigger: React.ReactNode;
  contentProps?: React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> &
    VariantProps<typeof popoverContentVariants>;
}

const Popover = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  PopoverProps
>(({ children, trigger, contentProps, ...props }, ref) => (
  <PopoverPrimitive.Root {...props}>
    <PopoverPrimitive.Trigger asChild>
      {trigger}
    </PopoverPrimitive.Trigger>
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        ref={ref}
        className={cn(
          popoverContentVariants({
            variant: contentProps?.variant,
            size: contentProps?.size,
            align: contentProps?.align,
            side: contentProps?.side,
          }),
          'data-[state=open]:animate-in data-[state=closed]:animate-out',
          'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
          'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
          'data-[side=bottom]:slide-in-from-top-2',
          'data-[side=left]:slide-in-from-right-2',
          'data-[side=right]:slide-in-from-left-2',
          'data-[side=top]:slide-in-from-bottom-2',
          contentProps?.className
        )}
        {...contentProps}
      >
        {children}
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  </PopoverPrimitive.Root>
));

Popover.displayName = 'Popover';

export { Popover }; 
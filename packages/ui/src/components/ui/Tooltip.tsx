'use client';

import * as React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils';

const tooltipContentVariants = cva(
  'z-50 overflow-hidden rounded-md px-3 py-1.5 text-sm shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
  {
    variants: {
      variant: {
        default: 'bg-popover text-popover-foreground',
        dark: 'bg-secondary text-secondary-foreground',
        error: 'bg-destructive text-destructive-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface TooltipProps extends TooltipPrimitive.TooltipProps {
  content: React.ReactNode;
  contentProps?: React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> &
    VariantProps<typeof tooltipContentVariants>;
  delayDuration?: number;
  disableHoverableContent?: boolean;
}

const Tooltip = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Root>,
  TooltipProps
>(({
  children,
  content,
  contentProps,
  delayDuration,
  disableHoverableContent,
  ...props
}, ref) => (
  <TooltipPrimitive.Provider
    delayDuration={delayDuration}
    disableHoverableContent={disableHoverableContent}
  >
    <TooltipPrimitive.Root {...props}>
      <TooltipPrimitive.Trigger asChild>
        {children}
      </TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          ref={ref}
          className={cn(
            tooltipContentVariants({ variant: contentProps?.variant }),
            contentProps?.className
          )}
          sideOffset={5}
          {...contentProps}
        >
          {content}
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  </TooltipPrimitive.Provider>
));

Tooltip.displayName = 'Tooltip';

export { Tooltip }; 
"use client";

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../lib/utils';

const tooltipVariants = cva(
  "absolute z-tooltip bg-secondaryBlue2 text-white text-xs rounded-md px-6 py-4 pointer-events-none opacity-0 transition-opacity duration-200 whitespace-normal max-w-xs",
  {
    variants: {
      position: {
        top: "bottom-full left-1/2 transform -translate-x-1/2 mb-2",
        bottom: "top-full left-1/2 transform -translate-x-1/2 mt-2",
        left: "right-full top-1/2 transform -translate-y-1/2 mr-2",
        right: "left-full top-1/2 transform -translate-y-1/2 ml-2",
      },
    },
    defaultVariants: {
      position: "bottom",
    },
  }
);

export interface TooltipProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'content'>,
    VariantProps<typeof tooltipVariants> {
  content: string | React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  children: React.ReactNode;
}

/**
 * Tooltip component provides contextual information on hover or focus.
 * 
 * @example
 * ```tsx
 * <Tooltip content="This is helpful information" position="top">
 *   <button>Hover me</button>
 * </Tooltip>
 * ```
 */
export const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
  ({ className, content, position = "bottom", children, ...props }, ref) => {
    const [isVisible, setIsVisible] = React.useState(false);
    const tooltipId = React.useId();

    const showTooltip = () => setIsVisible(true);
    const hideTooltip = () => setIsVisible(false);

    return (
      <div
        className="relative inline-block"
        ref={ref}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onFocus={showTooltip}
        onBlur={hideTooltip}
        {...props}
      >
        <div aria-describedby={tooltipId}>
          {children}
        </div>
        <div
          id={tooltipId}
          role="tooltip"
          className={cn(
            tooltipVariants({ position }),
            isVisible && "opacity-100",
            className
          )}
        >
          {content}
          {/* Arrow */}
          <div
            className={cn(
              "absolute w-2 h-2 bg-secondaryBlue2 transform rotate-45",
              position === "top" && "top-full left-1/2 -translate-x-1/2 -mt-1",
              position === "bottom" && "bottom-full left-1/2 -translate-x-1/2 -mb-1",
              position === "left" && "left-full top-1/2 -translate-y-1/2 -ml-1",
              position === "right" && "right-full top-1/2 -translate-y-1/2 -mr-1"
            )}
          />
        </div>
      </div>
    );
  }
);

Tooltip.displayName = "Tooltip";
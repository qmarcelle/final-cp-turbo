"use client";

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../lib/utils';
import type { StatusLabelProps } from '../../../types';

export const statusLabelVariants = cva(
  "inline-flex items-center px-2 py-1 text-xs font-medium rounded-sm",
  {
    variants: {
      status: {
        pending: "bg-labelNeutral text-tertiaryGray1",
        processed: "bg-labelSuccess text-statusSuccess",
        denied: "bg-labelError text-statusError",
        approved: "bg-labelSuccess text-statusSuccess",
        "partial-approval": "bg-secondaryBlue1Accent text-primaryBlue",
      },
    },
    defaultVariants: {
      status: "pending",
    },
  }
);

/**
 * StatusLabel component for displaying status indicators for claims, authorizations, and transactions.
 * 
 * @example
 * ```tsx
 * <StatusLabel status="approved" text="Approved" />
 * <StatusLabel status="pending" text="Pending Review" />
 * ```
 */
export const StatusLabel = React.forwardRef<HTMLSpanElement, StatusLabelProps>(
  ({ className, status, text, ...props }, ref) => {
    return (
      <span
        className={cn(statusLabelVariants({ status }), className)}
        ref={ref}
        role="status"
        aria-live="polite"
        {...props}
      >
        {text}
      </span>
    );
  }
);

StatusLabel.displayName = "StatusLabel";
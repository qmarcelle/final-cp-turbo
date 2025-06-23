'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils';
import { AlertCircle, AlertTriangle, CheckCircle, Info, X } from 'lucide-react';

const alertVariants = cva(
  'relative w-full rounded-lg border p-4 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7',
  {
    variants: {
      variant: {
        default: 'bg-background text-foreground',
        info: 'border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-200/30 dark:bg-blue-900/30 dark:text-blue-50 [&>svg]:text-blue-500',
        success: 'border-green-200 bg-green-50 text-green-900 dark:border-green-200/30 dark:bg-green-900/30 dark:text-green-50 [&>svg]:text-green-500',
        warning: 'border-yellow-200 bg-yellow-50 text-yellow-900 dark:border-yellow-200/30 dark:bg-yellow-900/30 dark:text-yellow-50 [&>svg]:text-yellow-500',
        error: 'border-red-200 bg-red-50 text-red-900 dark:border-red-200/30 dark:bg-red-900/30 dark:text-red-50 [&>svg]:text-red-500',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const icons = {
  default: AlertCircle,
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  error: AlertCircle,
} as const;

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  title?: string;
  onClose?: () => void;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({
    className,
    variant = 'default',
    title,
    children,
    onClose,
    ...props
  }, ref) => {
    const Icon = icons[variant];

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(alertVariants({ variant }), className)}
        {...props}
      >
        <Icon className="h-4 w-4" />
        <div className="flex-1">
          {title && (
            <h5 className="mb-1 font-medium leading-none tracking-tight">
              {title}
            </h5>
          )}
          {children && (
            <div className="text-sm [&_p]:leading-relaxed">
              {children}
            </div>
          )}
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="absolute right-2 top-2 rounded-md p-1 ring-offset-background transition-opacity hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
        )}
      </div>
    );
  }
);

Alert.displayName = 'Alert';

export { Alert }; 
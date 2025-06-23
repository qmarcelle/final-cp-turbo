import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../utils';
import {
  ExclamationTriangleIcon,
  InformationCircleIcon,
  CheckCircleIcon,
  XCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

const alertVariants = cva(
  'relative w-full rounded-lg border p-4 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7',
  {
    variants: {
      variant: {
        default: 'bg-background text-foreground',
        info: 'border-blue-200 bg-blue-50 text-blue-800 dark:border-blue-800 dark:bg-blue-900/20 dark:text-blue-300 [&>svg]:text-blue-500',
        error: 'border-red-200 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-900/20 dark:text-red-300 [&>svg]:text-red-500',
        warning: 'border-yellow-200 bg-yellow-50 text-yellow-800 dark:border-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300 [&>svg]:text-yellow-500',
        success: 'border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-900/20 dark:text-green-300 [&>svg]:text-green-500',
      },
      size: {
        default: '',
        sm: 'p-3 text-sm',
        lg: 'p-6',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface AlertProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'>,
    VariantProps<typeof alertVariants> {
  /** Title of the alert */
  title?: React.ReactNode;
  /** Description or main content */
  description?: React.ReactNode;
  /** Whether the alert can be dismissed */
  dismissible?: boolean;
  /** Callback when alert is dismissed */
  onDismiss?: () => void;
  /** Custom icon to override default variant icon */
  icon?: React.ReactNode;
  /** Additional action buttons/elements */
  actions?: React.ReactNode;
  /** Whether the alert is visible */
  isVisible?: boolean;
  /** Auto dismiss timeout in ms (0 to disable) */
  autoClose?: number;
  /** Whether to show technical error details in dev mode */
  showDetails?: boolean;
  /** Raw error object for technical details */
  error?: Error | unknown;
  /** @deprecated Use variant="error" instead */
  isError?: boolean;
  /** @deprecated Use title instead */
  heading?: string;
  /** @deprecated Use description instead */
  errorText?: string;
  /** @deprecated Use description instead */
  message?: string;
}

const getIcon = (variant: AlertProps['variant'], customIcon?: React.ReactNode) => {
  if (customIcon) return customIcon;

  switch (variant) {
    case 'info':
      return <InformationCircleIcon className="h-5 w-5" />;
    case 'warning':
      return <ExclamationTriangleIcon className="h-5 w-5" />;
    case 'success':
      return <CheckCircleIcon className="h-5 w-5" />;
    case 'error':
      return <XCircleIcon className="h-5 w-5" />;
    default:
      return null;
  }
};

/**
 * Unified Alert component for displaying notifications, alerts, and status messages.
 * Consolidates functionality from ErrorView, NotificationBanner, AlertBox, and other alert components.
 */
export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      className,
      variant = 'default',
      size,
      title,
      description,
      dismissible = false,
      onDismiss,
      icon,
      actions,
      isVisible = true,
      autoClose = 0,
      showDetails = process.env.NODE_ENV === 'development',
      error,
      // Deprecated props
      isError,
      heading,
      errorText,
      message,
      children,
      ...props
    },
    ref
  ) => {
    // Handle deprecated props
    const finalVariant = isError ? 'error' : variant;
    const finalTitle = title || heading;
    const finalDescription = description || errorText || message || children;

    const [visible, setVisible] = React.useState(isVisible);

    // Handle controlled and uncontrolled visibility
    React.useEffect(() => {
      setVisible(isVisible);
    }, [isVisible]);

    // Handle auto dismiss
    React.useEffect(() => {
      if (autoClose && visible && onDismiss) {
        const timer = setTimeout(() => {
          onDismiss();
        }, autoClose);

        return () => {
          clearTimeout(timer);
        };
      }
    }, [autoClose, visible, onDismiss]);

    if (!visible) {
      return null;
    }

    const handleDismiss = () => {
      setVisible(false);
      onDismiss?.();
    };

    // Handle error message display
    let errorContent: React.ReactNode = null;
    if (showDetails && error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      const errorStack = error instanceof Error ? error.stack : '';

      errorContent = (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded text-xs font-mono overflow-x-auto">
          <div className="font-medium mb-1">Error details:</div>
          <div>{errorMessage}</div>
          {errorStack && (
            <details className="mt-2">
              <summary className="cursor-pointer text-red-700">
                Stack trace
              </summary>
              <pre className="mt-2 whitespace-pre-wrap break-all text-[10px] leading-tight">
                {errorStack}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(alertVariants({ variant: finalVariant, size }), className)}
        {...props}
      >
        {getIcon(finalVariant, icon)}
        <div className="flex flex-col gap-1">
          {finalTitle && (
            <h5 className="font-medium leading-none tracking-tight">
              {finalTitle}
            </h5>
          )}
          {finalDescription && (
            <div className="text-sm [&_p]:leading-relaxed">
              {finalDescription}
            </div>
          )}
          {errorContent}
          {actions && <div className="mt-2">{actions}</div>}
        </div>
        {dismissible && (
          <button
            type="button"
            onClick={handleDismiss}
            className="absolute right-2 top-2 rounded-md p-1 opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            <XMarkIcon className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
        )}
      </div>
    );
  }
);

Alert.displayName = 'Alert'; 
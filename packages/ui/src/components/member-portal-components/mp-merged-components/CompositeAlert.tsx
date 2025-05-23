/**
 * MERGED COMPONENT
 * Consolidates functionality from composite components:
 * - ErrorView
 * - NotificationBanner
 * - AlertBox
 * - Status notifications
 * - Various alert-related components
 */

'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../utils';
import { AlertCircle, AlertTriangle, CheckCircle, Info, X } from 'lucide-react';
import { Button } from './Button';

// Alert container variants
const alertVariants = cva(
  'relative w-full rounded-lg border p-4',
  {
    variants: {
      variant: {
        default: 'bg-background text-foreground',
        primary: 'border-primary/50 bg-primary/5 text-primary',
        error: 'border-destructive/50 bg-destructive/5 text-destructive',
        warning: 'border-yellow-500/50 bg-yellow-50 text-yellow-900',
        success: 'border-green-500/50 bg-green-50 text-green-900',
        info: 'border-blue-500/50 bg-blue-50 text-blue-900',
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

export interface CompositeAlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  /** Optional title for the alert */
  title?: React.ReactNode;
  /** Whether to show an icon based on the variant */
  showIcon?: boolean;
  /** Custom icon to display */
  icon?: React.ReactNode;
  /** Whether the alert can be dismissed */
  dismissible?: boolean;
  /** Callback when the alert is dismissed */
  onDismiss?: () => void;
  /** Whether the alert is currently visible */
  isVisible?: boolean;
  /** Whether the alert has a close button */
  hasCloseButton?: boolean;
}

/**
 * CompositeAlert component for displaying notifications, alerts, and status messages
 */
export const CompositeAlert = React.forwardRef<HTMLDivElement, CompositeAlertProps>(
  (
    {
      className,
      variant,
      size,
      title,
      showIcon = true,
      icon,
      dismissible = false,
      onDismiss,
      isVisible = true,
      hasCloseButton = true,
      children,
      ...props
    },
    ref
  ) => {
    const [visible, setVisible] = React.useState(isVisible);
    
    // Handle controlled and uncontrolled visibility
    React.useEffect(() => {
      setVisible(isVisible);
    }, [isVisible]);
    
    // Don't render if not visible
    if (!visible) {
      return null;
    }
    
    // Get the appropriate icon based on variant
    const getIcon = () => {
      if (icon) return icon;
      
      switch (variant) {
        case 'error':
          return <AlertCircle className="h-5 w-5" />;
        case 'warning':
          return <AlertTriangle className="h-5 w-5" />;
        case 'success':
          return <CheckCircle className="h-5 w-5" />;
        case 'info':
        case 'primary':
          return <Info className="h-5 w-5" />;
        default:
          return null;
      }
    };
    
    // Handle dismiss
    const handleDismiss = () => {
      setVisible(false);
      onDismiss?.();
    };
    
    return (
      <div
        ref={ref}
        role="alert"
        className={cn(alertVariants({ variant, size }), className)}
        {...props}
      >
        <div className="flex">
          {showIcon && (
            <div className="flex-shrink-0 mr-3">
              {getIcon()}
            </div>
          )}
          <div className="flex-grow">
            {title && (
              <div className={cn(
                "font-medium leading-none tracking-tight",
                size === 'sm' ? "text-sm" : "text-base",
                size === 'lg' && "text-lg"
              )}>
                {title}
              </div>
            )}
            {children && (
              <div className={cn(
                "mt-1",
                !title && "pt-0",
                size === 'sm' ? "text-xs" : "text-sm"
              )}>
                {children}
              </div>
            )}
          </div>
          {dismissible && hasCloseButton && (
            <div className="flex-shrink-0 ml-3">
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 rounded-full opacity-70 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background"
                onClick={handleDismiss}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  }
);

CompositeAlert.displayName = 'CompositeAlert';

// Alert description component
export interface AlertDescriptionProps extends React.HTMLAttributes<HTMLDivElement> {}

export const AlertDescription = React.forwardRef<HTMLDivElement, AlertDescriptionProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('text-sm', className)}
      {...props}
    />
  )
);

AlertDescription.displayName = 'AlertDescription';

// Banner alert variant (full width, fixed positioning)
const bannerAlertVariants = cva(
  'w-full p-4 text-center',
  {
    variants: {
      variant: {
        default: 'bg-background text-foreground',
        primary: 'bg-primary text-primary-foreground',
        error: 'bg-destructive text-destructive-foreground',
        warning: 'bg-yellow-500 text-white',
        success: 'bg-green-500 text-white',
        info: 'bg-blue-500 text-white',
      },
      position: {
        top: 'fixed top-0 left-0 right-0 z-50',
        bottom: 'fixed bottom-0 left-0 right-0 z-50',
        static: 'relative',
      },
    },
    defaultVariants: {
      variant: 'info',
      position: 'top',
    },
  }
);

export interface BannerAlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof bannerAlertVariants> {
  /** Whether the banner is dismissible */
  dismissible?: boolean;
  /** Callback when dismissed */
  onDismiss?: () => void;
  /** Whether the banner is visible */
  isVisible?: boolean;
}

/**
 * BannerAlert component for displaying full-width notification banners
 */
export const BannerAlert = React.forwardRef<HTMLDivElement, BannerAlertProps>(
  (
    {
      className,
      variant,
      position,
      dismissible = true,
      onDismiss,
      isVisible = true,
      children,
      ...props
    },
    ref
  ) => {
    const [visible, setVisible] = React.useState(isVisible);
    
    React.useEffect(() => {
      setVisible(isVisible);
    }, [isVisible]);
    
    if (!visible) {
      return null;
    }
    
    return (
      <div
        ref={ref}
        className={cn(bannerAlertVariants({ variant, position }), className)}
        role="alert"
        {...props}
      >
        <div className="container mx-auto flex justify-center items-center">
          <div className="flex-grow">{children}</div>
          {dismissible && (
            <button
              className="ml-4 text-current opacity-70 hover:opacity-100 focus:outline-none"
              onClick={() => {
                setVisible(false);
                onDismiss?.();
              }}
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>
    );
  }
);

BannerAlert.displayName = 'BannerAlert';

// Toast notification variants
const toastVariants = cva(
  'group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-4 pr-8 shadow-lg transition-all',
  {
    variants: {
      variant: {
        default: 'bg-background border',
        error: 'destructive border-destructive bg-destructive text-destructive-foreground',
        success: 'border-green-500 bg-green-500 text-white',
        warning: 'border-yellow-500 bg-yellow-500 text-white',
        info: 'border-blue-500 bg-blue-500 text-white',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface ToastProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof toastVariants> {
  /** Toast title */
  title?: React.ReactNode;
  /** Whether to show an icon */
  showIcon?: boolean;
  /** Custom icon */
  icon?: React.ReactNode;
  /** Whether toast is visible */
  visible?: boolean;
  /** Callback when dismissed */
  onDismiss?: () => void;
  /** Auto dismiss timeout in ms (0 to disable) */
  autoClose?: number;
}

/**
 * Toast component for displaying temporary notifications
 */
export const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  (
    {
      className,
      variant,
      title,
      showIcon = true,
      icon,
      visible = true,
      onDismiss,
      autoClose = 5000,
      children,
      ...props
    },
    ref
  ) => {
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
    
    const getIcon = () => {
      if (icon) return icon;
      
      switch (variant) {
        case 'error':
          return <AlertCircle className="h-5 w-5" />;
        case 'warning':
          return <AlertTriangle className="h-5 w-5" />;
        case 'success':
          return <CheckCircle className="h-5 w-5" />;
        case 'info':
          return <Info className="h-5 w-5" />;
        default:
          return null;
      }
    };
    
    if (!visible) {
      return null;
    }
    
    return (
      <div
        ref={ref}
        className={cn(toastVariants({ variant }), className)}
        {...props}
      >
        <div className="grid gap-1">
          {showIcon && (
            <div className="float-left mr-3">
              {getIcon()}
            </div>
          )}
          {title && <div className="font-medium">{title}</div>}
          {children && <div className="text-sm opacity-90">{children}</div>}
        </div>
        {onDismiss && (
          <button
            className="absolute top-2 right-2 rounded-md p-1 text-foreground/50 opacity-70 transition-opacity hover:text-foreground hover:opacity-100 focus:opacity-100 focus:outline-none"
            onClick={onDismiss}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
        )}
      </div>
    );
  }
);

Toast.displayName = 'Toast';

// ErrorView component for displaying API and application errors
export interface ErrorViewProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Error title */
  title?: string;
  /** Error message */
  message?: string;
  /** Raw error object */
  error?: Error | unknown;
  /** Action button text */
  actionText?: string;
  /** Action button callback */
  onAction?: () => void;
  /** Whether to show technical details (in dev mode) */
  showDetails?: boolean;
}

/**
 * ErrorView component for displaying API and application errors
 */
export const ErrorView: React.FC<ErrorViewProps> = ({
  title = 'An error occurred',
  message = 'Sorry, something went wrong. Please try again later.',
  error,
  actionText = 'Try again',
  onAction,
  showDetails = process.env.NODE_ENV === 'development',
  ...props
}) => {
  const errorMessage = error instanceof Error ? error.message : String(error);
  const errorStack = error instanceof Error ? error.stack : '';
  
  return (
    <CompositeAlert
      variant="error"
      title={title}
      className="max-w-xl mx-auto my-4"
      {...props}
    >
      <p className="mt-2 mb-4">{message}</p>
      
      {showDetails && error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded text-xs font-mono overflow-x-auto">
          <div className="font-medium mb-1">Error details:</div>
          <div>{errorMessage}</div>
          {errorStack && (
            <details className="mt-2">
              <summary className="cursor-pointer text-red-700">Stack trace</summary>
              <pre className="mt-2 whitespace-pre-wrap break-all text-[10px] leading-tight">
                {errorStack}
              </pre>
            </details>
          )}
        </div>
      )}
      
      {onAction && (
        <div className="mt-4">
          <Button onClick={onAction}>{actionText}</Button>
        </div>
      )}
    </CompositeAlert>
  );
};

// Export as a namespace
export const Alert = {
  Root: CompositeAlert,
  Description: AlertDescription,
  Banner: BannerAlert,
  Toast: Toast,
  Error: ErrorView,
};
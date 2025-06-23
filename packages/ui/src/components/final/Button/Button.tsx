import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../utils/cn';

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-primary/90",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        success: "bg-success text-success-foreground hover:bg-success/90",
        warning: "bg-warning text-warning-foreground hover:bg-warning/90",
        error: "bg-error text-error-foreground hover:bg-error/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        link: "underline-offset-4 hover:underline text-primary"
      },
      size: {
        sm: "h-9 px-3",
        default: "h-10 py-2 px-4",
        md: "h-11 px-8",
        lg: "h-12 px-8"
      },
      fullWidth: {
        true: "w-full",
        false: "w-auto",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
      fullWidth: false,
    },
  }
);

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'size' | 'style' | 'type'>,
    VariantProps<typeof buttonVariants> {
  /** Whether to render as a child component */
  asChild?: boolean;
  /** URL for link buttons */
  href?: string;
  /** Loading state */
  loading?: boolean;
  /** Text to show while loading */
  loadingText?: string;
  /** Icon to show before the button text */
  leftIcon?: React.ReactNode;
  /** Icon to show after the button text */
  rightIcon?: React.ReactNode;
  /** Single icon (alternative to leftIcon/rightIcon) */
  icon?: React.ReactNode;
  /** Whether this is an icon-only button */
  iconOnly?: boolean;
  /** Tooltip text */
  tooltip?: string;
  /** Badge content */
  badge?: string | number;
  /** Whether the button is in an active state */
  active?: boolean;
  /** Target for link buttons */
  target?: string;
  /** Whether the button should take full width */
  fullWidth?: boolean;
  /** Button type (submit, reset, button) */
  type?: 'submit' | 'reset' | 'button';

  // Deprecated props
  /** @deprecated Use `href` instead */
  url?: string;
  /** @deprecated Use `children` instead */
  label?: string;
  /** @deprecated Use `onClick` instead */
  callback?: () => void;
  /** @deprecated Use `variant="link"` instead */
  buttonStyle?: 'default' | 'link' | 'button';
  /** @deprecated Use `data-testid` instead */
  'data-cy'?: string;
  /** @deprecated Use `type` instead */
  buttonType?: 'button' | 'submit' | 'reset';
  /** @deprecated Use `tabIndex` instead */
  linkIndex?: number;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, children, type = 'button', fullWidth, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, fullWidth }), className)}
        ref={ref}
        type={type}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button"; 
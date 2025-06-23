import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const buttonVariants = cva(
  "btn",
  {
    variants: {
      variant: {
        primary: "btn-primary",
        secondary: "btn-secondary",
        success: "btn-success",
        warning: "btn-warning",
        error: "btn-error",
        destructive: "btn-error",
        outline: "btn-outline",
        ghost: "btn-ghost",
        link: "btn-link",
        default: "btn-primary"
      },
      size: {
        sm: "btn-sm",
        default: "",
        md: "",
        lg: "btn-lg"
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

/**
 * Button component for actions in the broker portal.
 * 
 * @example
 * ```tsx
 * <Button variant="primary" size="md">
 *   Click Me
 * </Button>
 * ```
 */
export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'size' | 'style'>,
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
  /** Whether the button should take full width */
  fullWidth?: boolean;
}

/**
 * Primary button component for user interactions.
 * Supports various styles, sizes, and states including loading and disabled.
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    children, 
    type = 'button', 
    fullWidth,
    loading,
    loadingText,
    leftIcon,
    rightIcon,
    icon,
    iconOnly,
    ...props 
  }, ref) => {
    const content = (
      <>
        {loading && (
          <svg
            className="mr-2 h-4 w-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {leftIcon && !loading && <span className="mr-2">{leftIcon}</span>}
        {icon && !leftIcon && !rightIcon ? (
          <span className={cn(!iconOnly && "mr-2")}>{icon}</span>
        ) : null}
        {loading ? loadingText || children : children}
        {rightIcon && !loading && <span className="ml-2">{rightIcon}</span>}
      </>
    );

    return (
      <button
        className={cn(buttonVariants({ variant, size, fullWidth }), className)}
        ref={ref}
        type={type}
        disabled={loading || props.disabled}
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = "Button";
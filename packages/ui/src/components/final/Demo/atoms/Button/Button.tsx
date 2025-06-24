import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../utils/cn'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background min-w-0 truncate',
  {
    variants: {
      variant: {
        primary: [
          'bg-blue-600',
          'text-white',
          'hover:bg-blue-700',
          'hover:shadow-md',
          'hover:-translate-y-0.5',
          'active:bg-blue-800',
          'active:shadow-sm',
          'active:translate-y-0',
          'focus-visible:ring-blue-500',
        ].join(' '),
        secondary: [
          'bg-white',
          'text-gray-700',
          'border',
          'border-gray-300',
          'hover:bg-gray-50',
          'hover:shadow-md',
          'hover:-translate-y-0.5',
          'active:bg-gray-100',
          'active:shadow-sm',
          'active:translate-y-0',
          'focus-visible:ring-gray-500',
        ].join(' '),
        success: [
          'bg-status-success',
          'text-white',
          'hover:bg-status-success/90',
          'hover:shadow-md',
          'hover:-translate-y-0.5',
          'active:bg-status-success/80',
          'active:shadow-sm',
          'active:translate-y-0',
          'focus-visible:ring-green-500',
        ].join(' '),
        warning: [
          'bg-status-warning',
          'text-white',
          'hover:bg-status-warning/90',
          'hover:shadow-md',
          'hover:-translate-y-0.5',
          'active:bg-status-warning/80',
          'active:shadow-sm',
          'active:translate-y-0',
          'focus-visible:ring-yellow-500',
        ].join(' '),
        error: [
          'bg-status-error',
          'text-white',
          'hover:bg-status-error/90',
          'hover:shadow-md',
          'hover:-translate-y-0.5',
          'active:bg-status-error/80',
          'active:shadow-sm',
          'active:translate-y-0',
          'focus-visible:ring-red-500',
        ].join(' '),
        destructive: [
          'bg-status-error',
          'text-white',
          'hover:bg-status-error/90',
          'hover:shadow-md',
          'hover:-translate-y-0.5',
          'active:bg-status-error/80',
          'active:shadow-sm',
          'active:translate-y-0',
          'focus-visible:ring-red-500',
        ].join(' '),
        outline: [
          'border-2',
          'border-primary-blue',
          'text-primary-blue',
          'bg-white',
          'hover:bg-primary-blue/10',
          'hover:shadow-md',
          'hover:-translate-y-0.5',
          'active:bg-primary-blue/20',
          'active:shadow-sm',
          'active:translate-y-0',
          'focus-visible:ring-blue-500',
        ].join(' '),
        ghost: [
          'text-primary-blue',
          'hover:bg-primary-blue/10',
          'active:bg-primary-blue/20',
          'focus-visible:ring-blue-500',
          'shadow-none',
          'hover:shadow-none',
        ].join(' '),
        link: [
          'text-primary-blue',
          'underline-offset-4',
          'hover:underline',
          'hover:text-secondary-blue-2',
          'focus-visible:ring-blue-500',
          'shadow-none',
          'hover:shadow-none',
          'active:translate-y-0',
          'hover:-translate-y-0',
        ].join(' '),
        default: [
          'bg-blue-600',
          'text-white',
          'hover:bg-blue-700',
          'hover:shadow-md',
          'hover:-translate-y-0.5',
          'active:bg-blue-800',
          'active:shadow-sm',
          'active:translate-y-0',
          'focus-visible:ring-blue-500',
        ].join(' '),
      },
      size: {
        sm: 'h-8 px-3 py-2 text-xs',
        md: 'h-10 px-4 py-2',
        lg: 'h-12 px-6 py-3 text-base',
      },
      fullWidth: {
        true: 'w-full',
        false: 'w-auto',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'primary',
      fullWidth: false,
    },
  }
)

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
  /** URL for link buttons */
  href?: string
  /** Loading state */
  loading?: boolean
  /** Text to show while loading */
  loadingText?: string
  /** Icon to show before the button text */
  leftIcon?: React.ReactNode
  /** Icon to show after the button text */
  rightIcon?: React.ReactNode
  /** Single icon (alternative to leftIcon/rightIcon) */
  icon?: React.ReactNode
  /** Whether this is an icon-only button */
  iconOnly?: boolean
  /** Whether the button should take full width */
  fullWidth?: boolean
}

/**
 * Primary button component for user interactions.
 * Supports various styles, sizes, and states including loading and disabled.
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      loading = false,
      loadingText,
      leftIcon,
      rightIcon,
      icon,
      iconOnly = false,
      fullWidth = false,
      children,
      ...props
    },
    ref
  ) => {
    // Loading spinner component
    const LoadingSpinner = () => (
      <svg
        className="animate-spin -ml-1 mr-2 h-4 w-4"
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
    )

    // Handle loading state content
    const buttonContent = loading ? (
      <>
        <LoadingSpinner />
        {loadingText || children}
      </>
    ) : (
      <>
        {leftIcon && !iconOnly && (
          <span className="btn-icon-left">{leftIcon}</span>
        )}
        {icon && iconOnly ? icon : children}
        {rightIcon && !iconOnly && (
          <span className="btn-icon-right">{rightIcon}</span>
        )}
      </>
    )

    return (
      <button
        ref={ref}
        className={cn(
          buttonVariants({ variant, size, fullWidth }),
          iconOnly && 'btn-icon-only',
          loading && 'btn-loading',
          className
        )}
        disabled={loading || props.disabled}
        {...props}
      >
        {buttonContent}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button, buttonVariants }

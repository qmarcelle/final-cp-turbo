import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../utils';
import Link from 'next/link';

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-lg font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
        secondary: "bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-gray-500",
        success: "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500",
        warning: "bg-yellow-400 text-gray-900 hover:bg-yellow-500 focus:ring-yellow-500",
        error: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground border-2 border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500",
        ghost: "text-gray-600 hover:bg-gray-100 focus:ring-gray-500",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        link: "underline-offset-4 hover:underline text-primary",
        gradient: "bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700",
        soft: "bg-blue-50 text-blue-600 hover:bg-blue-100",
        info: "bg-blue-500 text-white hover:bg-blue-600",
      },
      size: {
        xs: "h-7 px-2 text-xs",
        sm: "h-9 px-3 py-1 text-sm",
        default: "h-10 py-2 px-4 text-base",
        md: "h-10 py-2 px-4 text-base",
        lg: "h-11 px-6 py-3 text-lg",
        xl: "h-12 px-8 py-4 text-xl",
        'icon': "h-10 w-10 p-2",
        'icon-sm': "h-8 w-8 p-1.5",
        'icon-lg': "h-12 w-12 p-2.5",
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

/**
 * Unified Button component that supports multiple variants, sizes, and behaviors.
 * Can render as either a button or link based on the presence of href prop.
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    className,
    variant,
    size,
    href,
    loading = false,
    loadingText,
    leftIcon,
    rightIcon,
    icon,
    iconOnly = false,
    tooltip,
    badge,
    active,
    target,
    fullWidth,
    disabled,
    children,
    type = "button",
    // Handle deprecated props
    url,
    label,
    callback,
    buttonStyle,
    'data-cy': dataCy,
    buttonType,
    linkIndex,
    onClick,
    ...props
  }, ref) => {
    // Handle deprecated props
    const finalHref = href || url;
    const finalChildren = children || label;
    const finalOnClick = onClick || callback;
    const finalTabIndex = props.tabIndex || linkIndex;
    const finalType = type || buttonType;
    const finalVariant = buttonStyle === 'link' ? 'link' : variant;

    // Combine icons and content
    const content = (
      <>
        {loading && (
          <span className="mr-2 animate-spin">
            {/* Add your loading spinner icon here */}
          </span>
        )}
        {!iconOnly && leftIcon && <span className="mr-2">{leftIcon}</span>}
        {!iconOnly && icon && <span className="mr-2">{icon}</span>}
        {iconOnly ? icon : (loading ? loadingText : finalChildren)}
        {!iconOnly && rightIcon && <span className="ml-2">{rightIcon}</span>}
        {badge && (
          <span className="ml-2 rounded-full bg-white/20 px-2 py-0.5 text-xs">
            {badge}
          </span>
        )}
      </>
    );

    // Handle link variant
    if (finalHref) {
      return (
        <Link
          href={finalHref}
          className={cn(
            buttonVariants({ variant: finalVariant, size, fullWidth }),
            active && "ring-2 ring-offset-2",
            className
          )}
          target={target}
          tabIndex={finalTabIndex}
          aria-disabled={disabled}
          onClick={disabled ? (e) => e.preventDefault() : undefined}
          {...(tooltip ? { 'aria-label': tooltip, title: tooltip } : {})}
          data-testid={dataCy}
        >
          {content}
        </Link>
      );
    }

    // Regular button
    return (
      <button
        ref={ref}
        type={finalType}
        disabled={disabled || loading}
        className={cn(
          buttonVariants({ variant: finalVariant, size, fullWidth }),
          active && "ring-2 ring-offset-2",
          className
        )}
        onClick={finalOnClick}
        tabIndex={finalTabIndex}
        {...(tooltip ? { 'aria-label': tooltip, title: tooltip } : {})}
        data-testid={dataCy}
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = "Button"; 
"use client";

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../lib/utils';
import Link from 'next/link';
import { Slot } from '@radix-ui/react-slot';
import type { ButtonProps, ButtonGroupProps, IconButtonProps } from '../../../types';

// Enhanced button variants using design system tokens
export const buttonVariants = cva(
  "btn inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-bold transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-white border-none hover:bg-secondary-blue2 hover:underline disabled:opacity-40 focus:bg-secondary-blue2 focus:underline focus:ring-secondary-blue2",
        secondary:
          "border border-primary bg-transparent text-primary hover:bg-secondary-blue2 hover:text-white hover:underline disabled:text-primary/70 focus:bg-secondary-blue2 focus:text-white focus:underline focus:ring-secondary-blue2",
        outline:
          "border-2 border-tertiary-gray3 bg-transparent text-tertiary-gray1 shadow-sm hover:bg-tertiary-gray5 hover:text-primary",
        ghost: 
          "bg-transparent text-tertiary-gray1 hover:bg-tertiary-gray5 hover:text-primary",
        link: 
          "text-primary underline-offset-4 hover:underline hover:text-secondary-blue2",
        success:
          "bg-gradient-to-br from-status-success/80 to-status-success text-white font-semibold shadow-md hover:-translate-y-px hover:shadow-lg hover:from-status-success hover:to-status-success/90",
        warning:
          "bg-gradient-to-br from-yellow-400 to-yellow-600 text-tertiary-gray1 font-semibold shadow-md hover:-translate-y-px hover:shadow-lg hover:from-yellow-500 hover:to-yellow-700",
        error:
          "bg-gradient-to-br from-status-error to-status-error/90 text-white font-semibold shadow-md hover:-translate-y-px hover:shadow-lg hover:from-status-error/90 hover:to-status-error",
        info:
          "bg-gradient-to-br from-secondary-blue1 to-secondary-blue3 text-white font-semibold shadow-md hover:-translate-y-px hover:shadow-lg hover:from-secondary-blue1/90 hover:to-secondary-blue3/90",
        gradient:
          "brand-gradient text-white shadow-lg hover:shadow-xl hover:-translate-y-px",
        soft: 
          "bg-secondary-blue1-accent text-primary border border-secondary-blue1 hover:bg-secondary-blue1/10 hover:border-secondary-blue3 hover:shadow-md",
        destructive:
          "bg-status-error text-white shadow-sm hover:bg-status-error/90",
        default:
          "bg-primary text-white shadow-md hover:bg-secondary-blue2",
      },
      size: {
        xs: "h-7 px-2.5 text-xs rounded-md gap-1.5",
        sm: "h-8 px-3 text-xs rounded-md gap-1.5",
        default: "h-10 px-4 text-sm rounded-md gap-2",
        lg: "h-12 px-6 text-base rounded-lg gap-2.5",
        xl: "h-14 px-8 text-lg rounded-lg gap-3",
        icon: "h-10 w-10 rounded-md",
        "icon-sm": "h-8 w-8 rounded-md",
        "icon-lg": "h-12 w-12 rounded-lg",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
      loading: {
        true: "cursor-wait opacity-75",
        false: "",
      },
      active: {
        true: "scale-[0.98] shadow-inner",
        false: "",
      },
    },
    compoundVariants: [
      // Enhanced icon size adjustments
      {
        size: ["xs", "sm"],
        className: "gap-1.5",
      },
      {
        size: ["lg", "xl"],
        className: "gap-3",
      },
      // Enhanced outline variant states
      {
        variant: "outline",
        className: "data-[state=error]:border-status-error data-[state=error]:text-status-error data-[state=error]:bg-label-error data-[state=success]:border-status-success data-[state=success]:text-status-success data-[state=success]:bg-label-success",
      },
      // Enhanced loading states
      {
        loading: true,
        variant: ["primary", "secondary", "success", "warning", "error", "info"],
        className: "shadow-elevated animate-pulse",
      },
      // Enhanced focus states
      {
        variant: "primary",
        className: "focus-visible:ring-primary focus-visible:ring-offset-2",
      },
      {
        variant: "success", 
        className: "focus-visible:ring-status-success focus-visible:ring-offset-2",
      },
      {
        variant: "error",
        className: "focus-visible:ring-status-error focus-visible:ring-offset-2",
      },
    ],
    defaultVariants: {
      variant: "primary",
      size: "default",
      fullWidth: false,
      loading: false,
      active: false,
    },
  }
);

/**
 * Enhanced Button component with BlueCross brand styling and comprehensive features.
 * 
 * ## Variants
 * - **Primary**: Solid background button for main actions using brand primary color
 * - **Secondary**: Outlined button for secondary actions
 * - **Ghost**: Transparent button for subtle actions
 * - **Link**: Text-only button that looks like a link
 * - **Success/Warning/Error**: Semantic variants for specific use cases
 * 
 * ## Features
 * - **Multiple sizes**: xs, sm, default, lg, xl, and icon variants
 * - **Loading states** with spinner and custom text
 * - **Icon support** with left/right positioning
 * - **Full width** and responsive options
 * - **State management** with visual feedback
 * - **Accessibility** with ARIA attributes and keyboard support
 * - **Link rendering** with Next.js Link component
 * - **Design system integration** with CSS custom properties
 * 
 * @example
 * ```tsx
 * <Button variant="primary" size="lg" onClick={() => console.log('clicked')}>
 *   Submit Application
 * </Button>
 * <Button variant="secondary" leftIcon={<IconArrowLeft />}>
 *   Go Back
 * </Button>
 * ```
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    fullWidth,
    asChild = false, 
    href, 
    url, 
    type = "button", 
    disabled, 
    loading = false,
    loadingText = "Loading...",
    leftIcon,
    rightIcon,
    icon,
    iconOnly = false,
    tooltip,
    badge,
    state = 'default',
    children, 
    'aria-describedby': ariaDescribedBy,
    ...props 
  }, ref) => {
    const linkHref = href || url;
    const Comp = asChild ? Slot : "button";
    const isDisabled = disabled || loading;
    const finalLeftIcon = leftIcon || icon;
    
    // Determine if this is an icon-only button
    const isIconOnly = iconOnly || (size?.includes('icon') && !children);

    // Icon size based on button size
    const getIconSize = () => {
      switch (size) {
        case 'xs':
        case 'icon-sm':
          return 'h-3.5 w-3.5';
        case 'sm':
          return 'h-4 w-4';
        case 'lg':
        case 'icon-lg':
          return 'h-5 w-5';
        case 'xl':
          return 'h-6 w-6';
        default:
          return 'h-4 w-4';
      }
    };

    const iconSize = getIconSize();

    // Loading spinner
    const LoadingSpinner = () => (
      <svg
        className={cn(
          "animate-spin",
          size === 'sm' ? 'w-4 h-4' : 'w-5 h-5'
        )}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
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
          d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    );

    // Button content with icons
    const buttonContent = () => {
      if (loading) {
        return (
          <>
            <LoadingSpinner />
            {!isIconOnly && (
              <span className="sr-only">{loadingText}</span>
            )}
            {!isIconOnly && loadingText}
          </>
        );
      }

      return (
        <>
          {finalLeftIcon && (
            <span className={cn(iconSize, "flex-shrink-0")} aria-hidden="true">
              {finalLeftIcon}
            </span>
          )}
          
          {children && !isIconOnly && (
            <span className="truncate">{children}</span>
          )}
          
          {isIconOnly && children && (
            <span className={cn(iconSize, "flex-shrink-0")} aria-hidden="true">
              {children}
            </span>
          )}
          
          {rightIcon && (
            <span className={cn(iconSize, "flex-shrink-0")} aria-hidden="true">
              {rightIcon}
            </span>
          )}

          {badge && (
            <span className="ml-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-medium bg-status-error text-white rounded-full min-w-[1.25rem] h-5">
              {badge}
            </span>
          )}
        </>
      );
    };

    // Common props for both button and link
    const commonProps = {
      className: cn(
        buttonVariants({ variant, size, fullWidth, loading, active: false }),
        className
      ),
      'aria-disabled': isDisabled,
      'aria-busy': loading,
      'aria-describedby': ariaDescribedBy,
      'data-state': state,
      title: tooltip,
      ...(isIconOnly && children && typeof children === 'string' ? { 'aria-label': children } : {}),
    };

    if (linkHref) {
      return (
        <Link
          href={linkHref}
          {...commonProps}
          onClick={isDisabled ? (e: React.MouseEvent) => e.preventDefault() : undefined}
          tabIndex={isDisabled ? -1 : 0}
          ref={ref as React.ForwardedRef<HTMLAnchorElement>}
        >
          {buttonContent()}
        </Link>
      );
    }

    return (
      <Comp
        ref={ref}
        type={!asChild ? type : undefined}
        disabled={isDisabled}
        {...commonProps}
        {...props}
      >
        {buttonContent()}
      </Comp>
    );
  }
);

Button.displayName = "Button";

/**
 * ButtonGroup component for grouping related buttons with consistent spacing and styling.
 * 
 * @example
 * ```tsx
 * <ButtonGroup orientation="horizontal" attached>
 *   <Button variant="secondary">Previous</Button>
 *   <Button variant="primary">Next</Button>
 * </ButtonGroup>
 * ```
 */
export const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ 
    className, 
    size, 
    variant, 
    orientation = 'horizontal', 
    attached = false,
    fullWidth = false,
    children, 
    ...props 
  }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex",
          {
            'flex-col': orientation === 'vertical',
            'flex-row': orientation === 'horizontal',
            'w-full': fullWidth,
            // Attached styling - remove borders between buttons
            '[&>*:not(:first-child)]:ml-px [&>*:not(:first-child)]:rounded-l-none [&>*:not(:last-child)]:rounded-r-none': 
              attached && orientation === 'horizontal',
            '[&>*:not(:first-child)]:mt-px [&>*:not(:first-child)]:rounded-t-none [&>*:not(:last-child)]:rounded-b-none': 
              attached && orientation === 'vertical',
            // Spacing for non-attached
            'gap-2': !attached,
            // Full width children
            '[&>*]:flex-1': fullWidth,
          },
          className
        )}
        role="group"
        {...props}
      >
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child) && child.type === Button) {
            return React.cloneElement(child as React.ReactElement<ButtonProps>, {
              size: (child.props as ButtonProps).size || size,
              variant: (child.props as ButtonProps).variant || variant,
              fullWidth: fullWidth ? true : (child.props as ButtonProps).fullWidth,
            });
          }
          return child;
        })}
      </div>
    );
  }
);

ButtonGroup.displayName = "ButtonGroup";

/**
 * IconButton component for icon-only buttons with proper accessibility.
 * 
 * @example
 * ```tsx
 * <IconButton icon={<IconSettings />} aria-label="Settings" />
 * <IconButton icon={<IconPlus />} aria-label="Add item" variant="outline" />
 * ```
 */
export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, 'aria-label': ariaLabel, size = 'icon', ...props }, ref) => {
    return (
      <Button
        ref={ref}
        size={size}
        iconOnly
        aria-label={ariaLabel}
        {...props}
      >
        {icon}
      </Button>
    );
  }
);

IconButton.displayName = "IconButton";
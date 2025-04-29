/**
 * MERGED COMPONENT
 * Consolidates functionality from:
 * - foundation/Button
 * - foundation/AppLink
 * - Various button implementations from composite components
 */

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../utils/cn';
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
      },
      size: {
        sm: "h-9 px-3 py-1 text-sm",
        default: "h-10 py-2 px-4 text-base",
        md: "h-10 py-2 px-4 text-base",
        lg: "h-11 px-6 py-3 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  href?: string;
  /**
   * @deprecated Use `href` instead
   */
  url?: string;
  /**
   * @deprecated Use data-cy attribute instead
   */
  'data-cy'?: string;
}

/**
 * Button component with support for different variants and sizes
 * Can render as a button or link based on whether href is provided
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, href, url, type = "button", disabled, ...props }, ref) => {
    const linkHref = href || url;

    if (linkHref) {
      return (
        <Link 
          href={linkHref}
          className={cn(buttonVariants({ variant, size }), className)}
          aria-disabled={disabled}
          {...(props as any)}
        >
          {props.children}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        type={type}
        role="button"
        disabled={disabled}
        aria-disabled={disabled}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
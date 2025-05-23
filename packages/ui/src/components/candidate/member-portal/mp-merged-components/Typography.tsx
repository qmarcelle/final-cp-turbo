/**
 * Typography Components
 * 
 * Consolidated implementation combining functionality from:
 * - foundation/Header
 * - foundation/TextBox
 * - Various text display components
 */

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../../utils';
import { Slot } from '@radix-ui/react-slot';

// Typography variants with comprehensive options
const typographyVariants = cva(
  "text-foreground",
  {
    variants: {
      variant: {
        h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
        h2: "scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0",
        h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
        h4: "scroll-m-20 text-xl font-semibold tracking-tight",
        h5: "scroll-m-20 text-lg font-semibold tracking-tight",
        h6: "scroll-m-20 text-base font-semibold tracking-tight",
        p: "leading-7 [&:not(:first-child)]:mt-6",
        blockquote: "mt-6 border-l-2 pl-6 italic",
        subtle: "text-sm text-muted-foreground",
        lead: "text-xl text-muted-foreground",
        large: "text-lg font-semibold",
        small: "text-sm font-medium leading-none",
        muted: "text-sm text-muted-foreground",
        label: "text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        code: "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
      },
      weight: {
        normal: "font-normal",
        medium: "font-medium",
        semibold: "font-semibold",
        bold: "font-bold",
        extrabold: "font-extrabold",
      },
      align: {
        left: "text-left",
        center: "text-center",
        right: "text-right",
        justify: "text-justify",
      },
      decoration: {
        none: "no-underline",
        underline: "underline",
        lineThrough: "line-through",
      },
      transform: {
        normal: "normal-case",
        uppercase: "uppercase",
        lowercase: "lowercase",
        capitalize: "capitalize",
      },
      // Truncate text with ellipsis
      truncate: {
        true: "truncate",
      },
      // Max-width options
      maxWidth: {
        none: "max-w-none",
        xs: "max-w-xs",
        sm: "max-w-sm",
        md: "max-w-md",
        lg: "max-w-lg",
        xl: "max-w-xl",
        "2xl": "max-w-2xl",
        "3xl": "max-w-3xl",
        "4xl": "max-w-4xl",
        "5xl": "max-w-5xl",
        "6xl": "max-w-6xl",
        "7xl": "max-w-7xl",
        prose: "max-w-prose",
      },
      // Color options
      color: {
        default: "text-foreground",
        primary: "text-primary",
        secondary: "text-secondary",
        muted: "text-muted-foreground",
        accent: "text-accent-foreground",
        destructive: "text-destructive",
        success: "text-green-600",
        warning: "text-yellow-600",
        info: "text-blue-600",
      },
      // Responsive variants
      weightSm: {
        normal: "sm:font-normal",
        medium: "sm:font-medium",
        semibold: "sm:font-semibold",
        bold: "sm:font-bold",
        extrabold: "sm:font-extrabold",
      },
      weightMd: {
        normal: "md:font-normal",
        medium: "md:font-medium",
        semibold: "md:font-semibold",
        bold: "md:font-bold",
        extrabold: "md:font-extrabold",
      },
      weightLg: {
        normal: "lg:font-normal",
        medium: "lg:font-medium",
        semibold: "lg:font-semibold",
        bold: "lg:font-bold",
        extrabold: "lg:font-extrabold",
      },
      alignSm: {
        left: "sm:text-left",
        center: "sm:text-center",
        right: "sm:text-right",
        justify: "sm:text-justify",
      },
      alignMd: {
        left: "md:text-left",
        center: "md:text-center",
        right: "md:text-right",
        justify: "md:text-justify",
      },
      alignLg: {
        left: "lg:text-left",
        center: "lg:text-center",
        right: "lg:text-right",
        justify: "lg:text-justify",
      },
    },
    defaultVariants: {
      variant: "p",
      color: "default",
    },
  }
);

export interface TypographyProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'color'>,
    VariantProps<typeof typographyVariants> {
  /** The underlying HTML element to render */
  as?: React.ElementType;
  
  /** Whether to render the text as a child */
  asChild?: boolean;
  
  /** The content to display */
  children: React.ReactNode;
  
  /**
   * Optional testid for testing
   */
  'data-testid'?: string;

  /**
   * Optional data-cy attribute for Cypress testing
   */
  'data-cy'?: string;
}

/**
 * Typography component for consistent text styling across the application
 * Replaces various text and heading components with a unified API
 */
export const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({
    className,
    variant,
    weight,
    weightSm,
    weightMd,
    weightLg,
    align,
    alignSm,
    alignMd,
    alignLg,
    decoration,
    transform,
    truncate,
    maxWidth,
    color,
    as,
    asChild = false,
    children,
    'data-testid': dataTestId,
    'data-cy': dataCy,
    ...props
  }, ref) => {
    const Comp = asChild ? Slot : as || 'p'; // Default to 'p' if 'as' is not provided
    return (
      <Comp
        ref={ref}
        className={cn(
          typographyVariants({
            variant,
            weight,
            weightSm,
            weightMd,
            weightLg,
            align,
            alignSm,
            alignMd,
            alignLg,
            decoration,
            transform,
            truncate,
            maxWidth,
            color,
            className,
          })
        )}
        data-testid={dataTestId}
        data-cy={dataCy}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

Typography.displayName = 'Typography';
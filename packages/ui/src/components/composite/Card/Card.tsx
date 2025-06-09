"use client";

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../lib/utils';

const cardVariants = cva(
  "rounded-md transition-shadow duration-200",
  {
    variants: {
      variant: {
        main: "bg-white border border-tertiaryGray4",
        elevated: "bg-white border border-tertiaryGray4 shadow-elevated",
        highlight: "bg-secondaryBlue1Accent border border-secondaryBlue1Accent",
        neutral: "bg-tertiaryGray5 border border-tertiaryGray4",
        info: "bg-secondaryBlue1Accent border border-secondaryBlue1",
      },
      padding: {
        sm: "p-3",
        md: "p-4",
        lg: "p-6",
      },
    },
    defaultVariants: {
      variant: "main",
      padding: "md",
    },
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  variant?: 'main' | 'elevated' | 'highlight' | 'neutral' | 'info';
  padding?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  hoverable?: boolean;
}

/**
 * Card component contains content and actions about a single subject.
 * Supports multiple variants and padding options.
 * 
 * @example
 * ```tsx
 * <Card variant="elevated" padding="lg">
 *   <h3>Card Title</h3>
 *   <p>Card content goes here</p>
 * </Card>
 * ```
 */
export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, hoverable = false, children, ...props }, ref) => {
    return (
      <div
        className={cn(
          cardVariants({ variant, padding }),
          hoverable && "hover:-translate-y-0.5 hover:shadow-lg cursor-pointer",
          className
        )}
        ref={ref}
        role="region"
        aria-label="Content card"
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

// Card Header Component
export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        className={cn("mb-4", className)}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardHeader.displayName = "CardHeader";

// Card Title Component
export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, children, as: Comp = 'h3', ...props }, ref) => {
    return (
      <Comp
        className={cn("text-lg font-semibold text-tertiaryGray1", className)}
        ref={ref}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

CardTitle.displayName = "CardTitle";

// Card Content Component
export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        className={cn("text-sm text-tertiaryGray3", className)}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardContent.displayName = "CardContent";

// Card Footer Component
export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        className={cn("mt-4 pt-4 border-t border-tertiaryGray4", className)}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardFooter.displayName = "CardFooter";
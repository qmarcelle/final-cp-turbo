/**
 * MERGED COMPONENT
 * Consolidates functionality from:
 * - AccordionListCard
 * - TransactionListCard
 * - RecentClaimSection
 * - GetHelpSection
 * - ListOfDocuments
 * - Various card-based components
 */

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../utils';

// Card container variants
const cardVariants = cva(
  "rounded-lg border bg-card text-card-foreground shadow-sm",
  {
    variants: {
      variant: {
        default: "bg-white",
        outline: "border",
        filled: "bg-muted",
        accent: "border-l-4 border-l-primary",
        info: "border-blue-200 bg-blue-50",
        warning: "border-yellow-200 bg-yellow-50",
        error: "border-red-200 bg-red-50",
        success: "border-green-200 bg-green-50",
      },
      size: {
        sm: "p-3",
        md: "p-4",
        lg: "p-6",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

/**
 * Card component for displaying content in a contained card format
 */
export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(cardVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);

Card.displayName = "Card";

/**
 * Card header component
 */
export const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex flex-col space-y-1.5 p-4", className)}
        {...props}
      />
    );
  }
);

CardHeader.displayName = "CardHeader";

/**
 * Card title component
 */
export const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => {
    return (
      <h3
        ref={ref}
        className={cn("text-xl font-semibold leading-none tracking-tight", className)}
        {...props}
      />
    );
  }
);

CardTitle.displayName = "CardTitle";

/**
 * Card description component
 */
export const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn("text-sm text-muted-foreground", className)}
        {...props}
      />
    );
  }
);

CardDescription.displayName = "CardDescription";

/**
 * Card content component
 */
export const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("p-4 pt-0", className)} {...props} />
    );
  }
);

CardContent.displayName = "CardContent";

/**
 * Card footer component
 */
export const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex items-center p-4 pt-0", className)}
        {...props}
      />
    );
  }
);

CardFooter.displayName = "CardFooter";

// Card list variants
const listVariants = cva(
  "divide-y",
  {
    variants: {
      spacing: {
        default: "divide-y",
        tight: "divide-y-0",
        loose: "divide-y-2",
      },
      hover: {
        true: "[&>*:hover]:bg-muted/50",
        false: "",
      }
    },
    defaultVariants: {
      spacing: "default",
      hover: true,
    },
  }
);

export interface CardListProps
  extends React.HTMLAttributes<HTMLUListElement>,
    VariantProps<typeof listVariants> {}

/**
 * CardList component for displaying lists inside cards
 */
export const CardList = React.forwardRef<HTMLUListElement, CardListProps>(
  ({ className, spacing, hover, ...props }, ref) => {
    return (
      <ul
        ref={ref}
        className={cn(listVariants({ spacing, hover }), className)}
        {...props}
      />
    );
  }
);

CardList.displayName = "CardList";

/**
 * CardListItem component for items in a card list
 */
export const CardListItem = React.forwardRef<HTMLLIElement, React.HTMLAttributes<HTMLLIElement>>(
  ({ className, ...props }, ref) => {
    return (
      <li
        ref={ref}
        className={cn("p-4 transition-colors", className)}
        {...props}
      />
    );
  }
);

CardListItem.displayName = "CardListItem";

/**
 * CardAccordion component for expandable card sections
 */
export interface CardAccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  title: React.ReactNode;
  defaultOpen?: boolean;
  icon?: React.ReactNode;
}

export const CardAccordion = React.forwardRef<HTMLDetailsElement, CardAccordionProps>(
  ({ className, title, children, defaultOpen = false, icon, ...props }, ref) => {
    return (
      <details
        ref={ref}
        className={cn("group", className)}
        open={defaultOpen}
        {...props}
      >
        <summary className="flex cursor-pointer items-center justify-between p-4 list-none">
          <div className="flex items-center gap-2">
            {icon && <div className="shrink-0">{icon}</div>}
            <span className="font-medium">{title}</span>
          </div>
          <svg
            className="h-4 w-4 shrink-0 transition-transform duration-200 group-open:rotate-180"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 9l6 6 6-6"
            />
          </svg>
        </summary>
        <div className="p-4 pt-0">{children}</div>
      </details>
    );
  }
);

CardAccordion.displayName = "CardAccordion";
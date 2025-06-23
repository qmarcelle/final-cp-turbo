"use client";

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../../../utils/cn';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

const cardVariants = cva(
  'rounded-lg border bg-card text-card-foreground',
  {
    variants: {
      variant: {
        default: 'bg-white border-input',
        outline: 'border-2',
        filled: 'bg-muted',
        accent: 'border-l-4 border-l-primary',
        info: 'border-blue-200 bg-blue-50 text-blue-900',
        warning: 'border-yellow-200 bg-yellow-50 text-yellow-900',
        error: 'border-red-200 bg-red-50 text-red-900',
        success: 'border-green-200 bg-green-50 text-green-900',
        elevated: 'bg-white border shadow-md',
        highlight: 'bg-secondary-blue1-accent border-transparent',
        neutral: 'bg-black/5 border-transparent',
      },
      size: {
        sm: 'p-3',
        md: 'p-4',
        lg: 'p-6',
      },
      status: {
        approved: 'border-green-500 bg-green-50',
        pending: 'border-yellow-500 bg-yellow-50',
        denied: 'border-red-500 bg-red-50',
        completed: 'border-blue-500 bg-blue-50',
        default: '',
      },
      hoverable: {
        true: 'transition-all duration-200 hover:border-primary hover:shadow-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
        false: '',
      },
      isCompact: {
        true: 'flex items-center',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      status: 'default',
      hoverable: false,
      isCompact: false,
    },
  }
);

export interface CardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'>,
    VariantProps<typeof cardVariants> {
  /** Title of the card */
  title?: React.ReactNode;
  /** Subtitle or secondary text */
  subtitle?: React.ReactNode;
  /** Icon to display */
  icon?: React.ReactNode;
  /** Action buttons or links */
  actions?: React.ReactNode;
  /** Whether to show a chevron icon */
  showChevron?: boolean;
  /** URL for the entire card to be clickable */
  actionHref?: string;
  /** Text for the action button */
  actionText?: string;
  /** Click handler for the action */
  onAction?: () => void;
  /** Key-value pairs to display as properties */
  properties?: Array<{
    label: string;
    value: React.ReactNode;
  }>;
  /** Date to display */
  date?: string | Date;

  // Deprecated props
  /** @deprecated Use `variant` instead */
  type?: 'main' | 'highlight' | 'neutral' | 'elevated' | 'info' | 'button';
  /** @deprecated Use `variant` instead */
  backgroundColor?: string;
  /** @deprecated Use `title` instead */
  label?: string;
  /** @deprecated Use `children` instead */
  body?: string;
  /** @deprecated Use `icon` instead */
  iconSrc?: string;
  /** @deprecated Use `actionHref` instead */
  link?: string;
  /** @deprecated Use `actions` instead */
  suffix?: React.ReactNode;
  /** @deprecated Use standard props instead */
  documentName?: string;
  /** @deprecated Use `date` instead */
  receivedDate?: string;
  /** @deprecated Use `subtitle` instead */
  memberName?: string;
}

// Map deprecated type values to new variant values
const typeToVariantMap: Record<NonNullable<CardProps['type']>, NonNullable<CardProps['variant']>> = {
  main: 'default',
  highlight: 'highlight',
  neutral: 'neutral',
  elevated: 'elevated',
  info: 'info',
  button: 'default',
};

interface CardComponent extends React.ForwardRefExoticComponent<CardProps & React.RefAttributes<HTMLDivElement>> {
  Header: typeof CardHeader;
  Content: typeof CardContent;
  Footer: typeof CardFooter;
}

/**
 * Unified Card component that supports multiple variants, states, and content layouts.
 * Can be used for information display, actions, and navigation.
 */
const CardBase = React.forwardRef<HTMLDivElement, CardProps>(
  ({
    className,
    variant,
    size,
    status,
    hoverable,
    isCompact,
    title,
    subtitle,
    icon,
    actions,
    showChevron,
    actionHref,
    actionText,
    onAction,
    properties,
    date,
    children,
    // Handle deprecated props
    type,
    backgroundColor,
    label,
    body,
    iconSrc,
    link,
    suffix,
    documentName,
    receivedDate,
    memberName,
    style,
    ...props
  }, ref) => {
    // Handle deprecated props
    const finalVariant = type ? typeToVariantMap[type] : variant;
    const finalTitle = title || label || documentName;
    const finalSubtitle = subtitle || memberName;
    const finalDate = date || receivedDate;
    const finalIcon = icon || (iconSrc && <img src={iconSrc} alt="" />);
    const finalActions = actions || suffix;
    const finalHref = actionHref || link;
    const finalStyle = {
      ...(backgroundColor ? { backgroundColor } : {}),
      ...style,
    };

    // Format date if needed
    const formattedDate = finalDate instanceof Date
      ? finalDate.toLocaleDateString()
      : finalDate;

    // Render card content
    const cardContent = (
      <>
        {(finalIcon || finalTitle || finalSubtitle || formattedDate) && (
          <div className={cn(
            'flex items-start gap-3',
            isCompact ? 'flex-row items-center' : 'flex-col'
          )}>
            {finalIcon && (
              <div className="flex-shrink-0">
                {finalIcon}
              </div>
            )}
            <div className="flex-grow">
              {finalTitle && (
                <h3 className="font-medium">
                  {finalTitle}
                </h3>
              )}
              {finalSubtitle && (
                <p className="mt-1 text-sm text-muted-foreground">
                  {finalSubtitle}
                </p>
              )}
              {formattedDate && (
                <p className="mt-1 text-sm text-muted-foreground">
                  {formattedDate}
                </p>
              )}
            </div>
          </div>
        )}

        {properties && properties.length > 0 && (
          <dl className={cn(
            'mt-4 grid gap-4',
            isCompact ? 'grid-cols-2 sm:grid-cols-4' : 'grid-cols-1 sm:grid-cols-2'
          )}>
            {properties.map(({ label, value }) => (
              <div key={label}>
                <dt className="text-sm font-medium text-muted-foreground">{label}</dt>
                <dd className="mt-1 text-sm">{value}</dd>
              </div>
            ))}
          </dl>
        )}

        {children || body}

        {(finalActions || actionText) && (
          <div className="mt-4 flex items-center justify-end gap-4">
            {finalActions}
            {actionText && (
              <button
                onClick={onAction}
                className="text-sm font-medium text-primary hover:underline"
              >
                {actionText}
              </button>
            )}
          </div>
        )}

        {showChevron && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </div>
        )}
      </>
    );

    // Wrap in link if href is provided
    if (finalHref) {
      return (
        <Link
          href={finalHref}
          className={cn(
            cardVariants({
              variant: finalVariant,
              size,
              status,
              hoverable: true,
              isCompact,
            }),
            'block no-underline',
            className
          )}
          style={finalStyle}
          onClick={onAction}
        >
          {cardContent}
        </Link>
      );
    }

    // Regular card
    return (
      <div
        ref={ref}
        className={cn(
          cardVariants({
            variant: finalVariant,
            size,
            status,
            hoverable,
            isCompact,
          }),
          className
        )}
        style={finalStyle}
        {...props}
      >
        {cardContent}
      </div>
    );
  }
) as CardComponent;

CardBase.displayName = 'Card';

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 pb-4', className)} {...props} />
  )
);
CardHeader.displayName = 'CardHeader';

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
  )
);
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 pt-4', className)} {...props} />
  )
);
CardFooter.displayName = 'CardFooter';

export const Card = Object.assign(CardBase, {
  Header: CardHeader,
  Content: CardContent,
  Footer: CardFooter,
}) as CardComponent;
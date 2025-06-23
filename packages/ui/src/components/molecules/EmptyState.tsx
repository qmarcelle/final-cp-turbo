'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils';
import { Button } from './Button';
import { Link } from './Link';

const emptyStateVariants = cva(
  'flex flex-col items-center justify-center text-center p-8 rounded-lg',
  {
    variants: {
      variant: {
        default: 'bg-muted/50',
        card: 'bg-card border shadow-sm',
        transparent: 'bg-transparent',
      },
      size: {
        sm: 'p-4 gap-3',
        md: 'p-8 gap-4',
        lg: 'p-12 gap-6',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface EmptyStateProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof emptyStateVariants> {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  secondaryAction?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
}

const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({
    className,
    variant,
    size,
    icon,
    title,
    description,
    action,
    secondaryAction,
    ...props
  }, ref) => {
    const ActionComponent = action?.href ? Link : Button;
    const SecondaryActionComponent = secondaryAction?.href ? Link : Button;

    return (
      <div
        ref={ref}
        className={cn(emptyStateVariants({ variant, size }), className)}
        {...props}
      >
        {icon && (
          <div className="text-muted-foreground">
            {icon}
          </div>
        )}
        <h3 className="text-lg font-semibold">{title}</h3>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
        {(action || secondaryAction) && (
          <div className="flex gap-3 mt-2">
            {action && (
              <ActionComponent
                {...(action.href ? { href: action.href } : { onClick: action.onClick })}
                variant={action.href ? 'default' : 'primary'}
              >
                {action.label}
              </ActionComponent>
            )}
            {secondaryAction && (
              <SecondaryActionComponent
                {...(secondaryAction.href
                  ? { href: secondaryAction.href }
                  : { onClick: secondaryAction.onClick }
                )}
                variant="outline"
              >
                {secondaryAction.label}
              </SecondaryActionComponent>
            )}
          </div>
        )}
      </div>
    );
  }
);

EmptyState.displayName = 'EmptyState';

export { EmptyState }; 
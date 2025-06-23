'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils';
import { Card } from '../molecules/Card/Card';
import { Link } from '../atoms/Link';
import { ArrowRight, ArrowUpRight, TrendingDown, TrendingUp } from 'lucide-react';

const dashboardCardVariants = cva(
  '',
  {
    variants: {
      variant: {
        default: '',
        primary: 'border-primary/20 bg-primary/5',
        success: 'border-green-500/20 bg-green-50',
        warning: 'border-yellow-500/20 bg-yellow-50',
        danger: 'border-red-500/20 bg-red-50',
        info: 'border-blue-500/20 bg-blue-50',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface DashboardCardProps
  extends Omit<React.ComponentPropsWithoutRef<typeof Card>, 'variant'>,
    VariantProps<typeof dashboardCardVariants> {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  value?: string | number;
  trend?: {
    value: number;
    direction: 'up' | 'down';
    label?: string;
  };
  actionLink?: string;
  actionText?: string;
  onAction?: () => void;
  isLoading?: boolean;
}

const DashboardCard = React.forwardRef<
  React.ElementRef<typeof Card>,
  DashboardCardProps
>(({
  className,
  variant,
  title,
  description,
  icon,
  value,
  trend,
  actionLink,
  actionText = 'View details',
  onAction,
  isLoading,
  children,
  ...props
}, ref) => {
  const TrendIcon = trend?.direction === 'up' ? TrendingUp : TrendingDown;
  const trendColor = trend?.direction === 'up' ? 'text-green-500' : 'text-red-500';

  return (
    <Card
      ref={ref}
      className={cn(dashboardCardVariants({ variant }), className)}
      {...props}
    >
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {icon && (
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                {icon}
              </div>
            )}
            <div>
              <h3 className="font-semibold">{title}</h3>
              {description && (
                <p className="text-sm text-muted-foreground">
                  {description}
                </p>
              )}
            </div>
          </div>
          {(actionLink || onAction) && (
            <Link
              href={actionLink ?? ''}
              onClick={onAction}
              variant="default"
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          )}
        </div>

        <div className="mt-4">
          {isLoading ? (
            <div className="h-8 w-24 animate-pulse rounded bg-muted" />
          ) : (
            <div className="flex items-baseline space-x-3">
              {value && (
                <span className="text-2xl font-bold tracking-tight">
                  {value}
                </span>
              )}
              {trend && (
                <div className={cn('flex items-center text-sm', trendColor)}>
                  <TrendIcon className="mr-1 h-4 w-4" />
                  <span>{trend.value}%</span>
                  {trend.label && (
                    <span className="ml-1 text-muted-foreground">
                      {trend.label}
                    </span>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {children && (
          <div className="mt-4">
            {children}
          </div>
        )}

        {(actionLink || onAction) && (
          <div className="mt-4 flex items-center">
            <Link
              href={actionLink ?? ''}
              onClick={onAction}
              variant="default"
              className="text-sm font-medium"
            >
              {actionText}
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </Card>
  );
});

DashboardCard.displayName = 'DashboardCard';

export { DashboardCard }; 
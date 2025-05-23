/**
 * MERGED COMPONENT
 * Consolidates functionality from composite components:
 * - DashboardCard
 * - DashboardStatCard
 * - RecentActivitySection
 * - Dashboard sections and layouts
 */

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../utils';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './Card';
import { Typography } from './Typography';
import { Button } from './Button';
import { ArrowRight, ArrowUpRight, TrendingDown, TrendingUp } from 'lucide-react';

// DashboardCard variants
const dashboardCardVariants = cva(
  "",
  {
    variants: {
      variant: {
        default: "",
        primary: "border-primary/20 bg-primary/5",
        success: "border-green-500/20 bg-green-50",
        warning: "border-yellow-500/20 bg-yellow-50",
        danger: "border-red-500/20 bg-red-50",
        info: "border-blue-500/20 bg-blue-50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface DashboardCardProps
  extends React.ComponentPropsWithoutRef<typeof Card>,
    VariantProps<typeof dashboardCardVariants> {
  /** Card title */
  title: string;
  /** Optional description text */
  description?: string;
  /** Optional icon to display */
  icon?: React.ReactNode;
  /** Optional link for "View all" or similar actions */
  actionLink?: string;
  /** Optional action link text */
  actionText?: string;
  /** Optional action onClick handler */
  onAction?: () => void;
  /** Whether the card is in a loading state */
  isLoading?: boolean;
}

/**
 * DashboardCard component for displaying content in a dashboard layout
 */
export const DashboardCard = React.forwardRef<HTMLDivElement, DashboardCardProps>(
  ({ 
    className, 
    variant, 
    title, 
    description, 
    icon,
    actionLink,
    actionText,
    onAction,
    isLoading,
    children,
    ...props 
  }, ref) => {
    return (
      <Card
        ref={ref}
        className={cn(dashboardCardVariants({ variant }), className)}
        {...props}
      >
        <CardHeader className={cn(
          "flex flex-row items-center justify-between space-y-0 pb-2",
          icon ? "pr-6" : ""
        )}>
          <div className="space-y-1">
            <CardTitle>{title}</CardTitle>
            {description && (
              <CardDescription>{description}</CardDescription>
            )}
          </div>
          {icon && (
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-muted">
              {icon}
            </div>
          )}
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="w-full h-24 animate-pulse bg-muted rounded-md" />
          ) : (
            children
          )}
        </CardContent>
        {(actionLink || actionText || onAction) && (
          <CardFooter>
            <Button
              variant="ghost"
              size="sm"
              className="gap-1 p-0 h-auto hover:bg-transparent hover:underline"
              href={actionLink}
              onClick={onAction}
            >
              {actionText || "View all"}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </CardFooter>
        )}
      </Card>
    );
  }
);

DashboardCard.displayName = "DashboardCard";

// StatCard variants
const statCardVariants = cva(
  "",
  {
    variants: {
      trend: {
        up: "border-green-500",
        down: "border-red-500",
        neutral: "border-gray-200",
        none: "",
      },
    },
    defaultVariants: {
      trend: "none",
    },
  }
);

export interface StatCardProps
  extends Omit<React.ComponentPropsWithoutRef<typeof Card>, 'title'>,
    VariantProps<typeof statCardVariants> {
  /** Stat title/label */
  title: string;
  /** The main value to display */
  value: React.ReactNode;
  /** Optional prefix for the value (like $, €, etc.) */
  prefix?: string;
  /** Optional suffix for the value (like %, pts, etc.) */
  suffix?: string;
  /** Optional change value for showing trends (+15%, -10%, etc.) */
  change?: number;
  /** Whether to show the trend indicator */
  showTrend?: boolean;
  /** Optional time period to display */
  period?: string;
  /** Whether the card is in a loading state */
  isLoading?: boolean;
}

/**
 * StatCard component for displaying statistical information
 */
export const StatCard = React.forwardRef<HTMLDivElement, StatCardProps>(
  ({ 
    className, 
    trend, 
    title, 
    value, 
    prefix,
    suffix,
    change,
    showTrend = false,
    period,
    isLoading,
    ...props 
  }, ref) => {
    // Determine trend based on change value if not explicitly provided
    let determinedTrend: 'up' | 'down' | 'neutral' | 'none' = trend || 'none';
    if (change !== undefined && !trend) {
      determinedTrend = change > 0 ? 'up' : change < 0 ? 'down' : 'neutral';
    }
    
    // Format change value with + prefix for positive values
    const formattedChange = change !== undefined 
      ? `${change > 0 ? '+' : ''}${change}${suffix || '%'}`
      : null;
      
    return (
      <Card
        ref={ref}
        className={cn(
          "overflow-hidden",
          determinedTrend !== 'none' && "border-l-4",
          statCardVariants({ trend: determinedTrend }),
          className
        )}
        {...props}
      >
        <CardContent className="p-6">
          {isLoading ? (
            <div className="space-y-2">
              <div className="w-20 h-4 animate-pulse bg-muted rounded-md" />
              <div className="w-32 h-8 animate-pulse bg-muted rounded-md" />
              {showTrend && (
                <div className="w-16 h-4 animate-pulse bg-muted rounded-md" />
              )}
            </div>
          ) : (
            <>
              <Typography variant="muted" className="truncate">
                {title}
              </Typography>
              <div className="flex items-baseline space-x-1 mt-1">
                {prefix && (
                  <Typography variant="large" className="text-muted-foreground">
                    {prefix}
                  </Typography>
                )}
                <Typography variant="h3" className="font-semibold">
                  {value}
                </Typography>
                {suffix && !change && (
                  <Typography variant="large" className="text-muted-foreground">
                    {suffix}
                  </Typography>
                )}
              </div>
              {(showTrend || formattedChange) && (
                <div className="flex items-center mt-2">
                  {determinedTrend === 'up' && (
                    <div className="flex items-center text-green-600">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      <Typography variant="small">
                        {formattedChange}
                      </Typography>
                    </div>
                  )}
                  {determinedTrend === 'down' && (
                    <div className="flex items-center text-red-600">
                      <TrendingDown className="w-4 h-4 mr-1" />
                      <Typography variant="small">
                        {formattedChange}
                      </Typography>
                    </div>
                  )}
                  {period && (
                    <Typography variant="small" className="text-muted-foreground ml-2">
                      {period}
                    </Typography>
                  )}
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    );
  }
);

StatCard.displayName = "StatCard";

// Dashboard grid variants
const dashboardGridVariants = cva(
  "grid gap-4",
  {
    variants: {
      columns: {
        1: "grid-cols-1",
        2: "grid-cols-1 md:grid-cols-2",
        3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
        4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
      },
    },
    defaultVariants: {
      columns: 3,
    },
  }
);

export interface DashboardGridProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dashboardGridVariants> {}

/**
 * DashboardGrid component for arranging dashboard cards in a responsive grid
 */
export const DashboardGrid = React.forwardRef<HTMLDivElement, DashboardGridProps>(
  ({ className, columns, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(dashboardGridVariants({ columns }), className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

DashboardGrid.displayName = "DashboardGrid";

// Dashboard section variants
const sectionVariants = cva(
  "space-y-4",
  {
    variants: {
      spacing: {
        default: "mb-8",
        tight: "mb-4",
        loose: "mb-12",
      },
    },
    defaultVariants: {
      spacing: "default",
    },
  }
);

export interface DashboardSectionProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sectionVariants> {
  /** Section title */
  title?: string;
  /** Optional description */
  description?: string;
  /** Optional action link */
  actionLink?: string;
  /** Optional action text */
  actionText?: string;
  /** Optional action onClick handler */
  onAction?: () => void;
}

/**
 * DashboardSection component for grouping related dashboard content
 */
export const DashboardSection = React.forwardRef<HTMLDivElement, DashboardSectionProps>(
  ({ 
    className, 
    spacing, 
    title, 
    description, 
    actionLink, 
    actionText, 
    onAction, 
    children, 
    ...props 
  }, ref) => {
    return (
      <section
        ref={ref}
        className={cn(sectionVariants({ spacing }), className)}
        {...props}
      >
        {(title || description || actionLink || actionText || onAction) && (
          <div className="flex items-center justify-between mb-4">
            <div>
              {title && (
                <Typography variant="h3" className="font-semibold leading-tight">
                  {title}
                </Typography>
              )}
              {description && (
                <Typography variant="muted" className="mt-1">
                  {description}
                </Typography>
              )}
            </div>
            {(actionLink || actionText || onAction) && (
              <Button
                variant="ghost"
                size="sm"
                className="gap-1"
                href={actionLink}
                onClick={onAction}
              >
                {actionText || "View all"}
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        )}
        <div>
          {children}
        </div>
      </section>
    );
  }
);

DashboardSection.displayName = "DashboardSection";

// Dashboard component composition
export const Dashboard = {
  Card: DashboardCard,
  StatCard: StatCard,
  Grid: DashboardGrid,
  Section: DashboardSection,
};
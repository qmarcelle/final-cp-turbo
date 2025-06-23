import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../../../utils/cn';

const statBlockVariants = cva(
  'bg-white rounded-lg border p-6 transition-all duration-200',
  {
    variants: {
      variant: {
        default: 'border-gray-200 hover:border-gray-300',
        success: 'border-green-200 bg-green-50/50 hover:border-green-300',
        warning: 'border-yellow-200 bg-yellow-50/50 hover:border-yellow-300',
        error: 'border-red-200 bg-red-50/50 hover:border-red-300',
        info: 'border-blue-200 bg-blue-50/50 hover:border-blue-300',
      },
      size: {
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
      },
      hoverable: {
        true: 'hover:shadow-md cursor-pointer',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      hoverable: false,
    },
  }
);

const valueVariants = cva(
  'font-bold',
  {
    variants: {
      size: {
        sm: 'text-xl',
        md: 'text-2xl',
        lg: 'text-3xl',
      },
      variant: {
        default: 'text-gray-900',
        success: 'text-green-700',
        warning: 'text-yellow-700',
        error: 'text-red-700',
        info: 'text-blue-700',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'default',
    },
  }
);

const labelVariants = cva(
  'font-medium',
  {
    variants: {
      size: {
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-base',
      },
      variant: {
        default: 'text-gray-600',
        success: 'text-green-600',
        warning: 'text-yellow-600',
        error: 'text-red-600',
        info: 'text-blue-600',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'default',
    },
  }
);

export interface TrendData {
  value: number;
  direction: 'up' | 'down' | 'neutral';
  period?: string;
}

export interface StatBlockProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statBlockVariants> {
  /** The main value to display */
  value: string | number;
  /** The label/description for the stat */
  label: string;
  /** Optional icon component */
  icon?: React.ReactNode;
  /** Trend information */
  trend?: TrendData;
  /** Format the value (e.g., currency, percentage) */
  format?: 'currency' | 'percentage' | 'number';
  /** Optional subtitle */
  subtitle?: string;
  /** Additional action button or element */
  action?: React.ReactNode;
  /** Loading state */
  loading?: boolean;
}

const formatValue = (value: string | number, format?: StatBlockProps['format']): string => {
  const numValue = typeof value === 'string' ? parseFloat(value) : value;
  
  if (isNaN(numValue)) return value.toString();
  
  switch (format) {
    case 'currency':
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      }).format(numValue);
    case 'percentage':
      return `${numValue.toFixed(1)}%`;
    case 'number':
      return new Intl.NumberFormat('en-US').format(numValue);
    default:
      return value.toString();
  }
};

const TrendIndicator = ({ trend }: { trend: TrendData }) => {
  const getIcon = () => {
    switch (trend.direction) {
      case 'up':
        return (
          <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        );
      case 'down':
        return (
          <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        );
      case 'neutral':
        return (
          <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
        );
    }
  };

  const getColor = () => {
    switch (trend.direction) {
      case 'up':
        return 'text-green-600';
      case 'down':
        return 'text-red-600';
      case 'neutral':
        return 'text-gray-500';
    }
  };

  return (
    <div className={cn('flex items-center gap-1 text-xs', getColor())}>
      {getIcon()}
      <span>{Math.abs(trend.value)}%</span>
      {trend.period && <span className="text-gray-500">vs {trend.period}</span>}
    </div>
  );
};

const StatBlock = React.forwardRef<HTMLDivElement, StatBlockProps>(
  (
    {
      className,
      variant,
      size,
      hoverable,
      value,
      label,
      icon,
      trend,
      format,
      subtitle,
      action,
      loading = false,
      ...props
    },
    ref
  ) => {
    if (loading) {
      return (
        <div
          ref={ref}
          className={cn(statBlockVariants({ variant, size, hoverable }), className)}
          {...props}
        >
          <div className="animate-pulse">
            <div className="flex items-center justify-between mb-2">
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              {icon && <div className="h-6 w-6 bg-gray-200 rounded"></div>}
            </div>
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-1"></div>
            {subtitle && <div className="h-3 bg-gray-200 rounded w-1/2"></div>}
          </div>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(statBlockVariants({ variant, size, hoverable }), className)}
        {...props}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className={cn(labelVariants({ size, variant }))}>{label}</span>
              {icon && <div className="text-gray-400">{icon}</div>}
            </div>
            
            <div className={cn(valueVariants({ size, variant }))}>
              {formatValue(value, format)}
            </div>
            
            {subtitle && (
              <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
            )}
            
            {trend && (
              <div className="mt-2">
                <TrendIndicator trend={trend} />
              </div>
            )}
          </div>
          
          {action && (
            <div className="ml-4">
              {action}
            </div>
          )}
        </div>
      </div>
    );
  }
);

StatBlock.displayName = 'StatBlock';

export { StatBlock, statBlockVariants };
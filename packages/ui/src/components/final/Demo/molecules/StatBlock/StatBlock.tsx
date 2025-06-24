import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../../../../utils/cn'

const statBlockVariants = cva(
  'bg-white rounded-lg border transition-all duration-200',
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
        sm: 'p-sm space-y-xs',
        md: 'p-md space-y-sm',
        lg: 'p-lg space-y-md',
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
)

const valueVariants = cva('font-bold', {
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
})

const labelVariants = cva('font-medium', {
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
})

export interface TrendData {
  value: number
  direction: 'up' | 'down' | 'neutral'
  period?: string
}

export interface StatBlockProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statBlockVariants> {
  /** The value to display */
  value: number
  /** Label for the value */
  label: string
  /** Format for the value (number or currency) */
  format?: 'number' | 'currency'
  /** Subtitle or additional text */
  subtitle?: string
  /** Icon to display */
  icon?: React.ReactNode
  /** Trend data */
  trend?: TrendData
}

const formatValue = (value: number, format?: 'number' | 'currency'): string => {
  if (isNaN(value)) return value.toString()

  switch (format) {
    case 'currency':
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      }).format(value)
    case 'number':
      return new Intl.NumberFormat('en-US').format(value)
    default:
      return value.toString()
  }
}

const _TrendIndicator = ({ trend }: { trend: TrendData }) => {
  const getIcon = () => {
    switch (trend.direction) {
      case 'up':
        return (
          <svg
            className="w-4 h-4 text-green-600"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        )
      case 'down':
        return (
          <svg
            className="w-4 h-4 text-red-600"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        )
      case 'neutral':
        return (
          <svg
            className="w-4 h-4 text-gray-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          </svg>
        )
    }
  }

  const getColor = () => {
    switch (trend.direction) {
      case 'up':
        return 'text-green-600'
      case 'down':
        return 'text-red-600'
      case 'neutral':
        return 'text-gray-500'
    }
  }

  return (
    <div className={cn('flex items-center gap-xs text-xs', getColor())}>
      {getIcon()}
      <span>{Math.abs(trend.value)}%</span>
      {trend.period && <span className="text-gray-500">vs {trend.period}</span>}
    </div>
  )
}

const StatBlock = React.forwardRef<HTMLDivElement, StatBlockProps>(
  (
    {
      className,
      variant,
      size,
      hoverable,
      value,
      label,
      format = 'number',
      subtitle,
      icon,
      trend,
      ...props
    },
    ref
  ) => {
    const formattedValue = formatValue(value, format)

    return (
      <div
        ref={ref}
        className={cn(
          statBlockVariants({ variant, size, hoverable }),
          className
        )}
        {...props}
      >
        <div className="flex items-start justify-between">
          <div className="space-y-xs">
            <div className={cn(valueVariants({ variant, size }))}>
              {formattedValue}
            </div>
            <div className={cn(labelVariants({ variant, size }))}>{label}</div>
            {subtitle && (
              <div className="text-sm text-gray-500 mt-xs">{subtitle}</div>
            )}
          </div>
          {icon && <div className="flex-shrink-0">{icon}</div>}
        </div>

        {trend && (
          <div className="flex items-center gap-xs mt-sm">
            {trend.direction === 'up' ? (
              <span className="text-green-600">↑</span>
            ) : trend.direction === 'down' ? (
              <span className="text-red-600">↓</span>
            ) : (
              <span className="text-gray-600">→</span>
            )}
            <span className="text-sm">
              {trend.value}%
              {trend.period && (
                <span className="text-gray-500 ml-xs">{trend.period}</span>
              )}
            </span>
          </div>
        )}
      </div>
    )
  }
)

StatBlock.displayName = 'StatBlock'

export { StatBlock, statBlockVariants }

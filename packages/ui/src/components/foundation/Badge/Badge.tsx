import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../../lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        success:
          'border-transparent bg-statusSuccess text-white hover:bg-statusSuccess/80',
        warning:
          'border-transparent bg-yellow-500 text-white hover:bg-yellow-500/80',
        error:
          'border-transparent bg-statusError text-white hover:bg-statusError/80',
        outline: 'text-foreground border border-border',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
      },
      size: {
        default: 'px-2.5 py-0.5 text-xs',
        sm: 'px-2 py-0.5 text-xs',
        lg: 'px-3 py-1 text-sm',
        icon: 'h-6 w-6 p-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  interactive?: boolean
  dot?: boolean
}

function Badge({
  className,
  variant,
  size,
  interactive,
  dot,
  children,
  ...props
}: BadgeProps) {
  return (
    <div
      className={cn(
        badgeVariants({ variant, size }),
        interactive && 'cursor-pointer hover:bg-opacity-80',
        className
      )}
      {...props}
    >
      {dot && <span className="mr-1.5 h-2 w-2 rounded-full bg-current" />}
      {children}
    </div>
  )
}

// Status Badge Component
export interface StatusBadgeProps extends Omit<BadgeProps, 'variant'> {
  status: 'success' | 'warning' | 'error' | 'info' | 'neutral'
}

function StatusBadge({ status, ...props }: StatusBadgeProps) {
  const statusVariantMap = {
    success: 'success' as const,
    warning: 'warning' as const,
    error: 'error' as const,
    info: 'secondary' as const,
    neutral: 'outline' as const,
  }

  return <Badge variant={statusVariantMap[status]} {...props} />
}

// Count Badge Component
export interface CountBadgeProps extends Omit<BadgeProps, 'children'> {
  count: number
  max?: number
  showZero?: boolean
}

function CountBadge({
  count,
  max = 99,
  showZero = false,
  ...props
}: CountBadgeProps) {
  if (count === 0 && !showZero) {
    return null
  }

  const displayCount = count > max ? `${max}+` : count.toString()

  return (
    <Badge size="sm" {...props}>
      {displayCount}
    </Badge>
  )
}

export { Badge, StatusBadge, CountBadge, badgeVariants }

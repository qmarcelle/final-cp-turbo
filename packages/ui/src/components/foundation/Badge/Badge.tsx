import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../../lib/utils'

const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        success:
          'border-transparent bg-green-100 text-green-800 hover:bg-green-200',
        warning:
          'border-transparent bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
        error: 'border-transparent bg-red-100 text-red-800 hover:bg-red-200',
        outline:
          'text-foreground border-border bg-background hover:bg-accent hover:text-accent-foreground',
        ghost:
          'border-transparent bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground',
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
  variant?:
    | 'default'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'error'
    | 'outline'
    | 'ghost'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  interactive?: boolean
  onClick?: () => void
  icon?: React.ReactNode
  dot?: boolean
}

const Badge = React.forwardRef<HTMLDivElement | HTMLButtonElement, BadgeProps>(
  (
    {
      className,
      variant,
      size,
      interactive,
      onClick,
      icon,
      dot,
      children,
      ...props
    },
    ref
  ) => {
    const Comp: any = interactive || onClick ? 'button' : 'div'

    return (
      <Comp
        className={cn(
          badgeVariants({ variant, size }),
          interactive &&
            'cursor-pointer hover:scale-105 active:scale-95 transition-transform',
          className
        )}
        ref={ref}
        onClick={onClick}
        {...props}
      >
        {dot && (
          <span className="mr-1 h-2 w-2 rounded-full bg-current opacity-75" />
        )}
        {icon && (
          <span className="mr-1 h-3 w-3" aria-hidden="true">
            {icon}
          </span>
        )}
        {children}
      </Comp>
    )
  }
)

Badge.displayName = 'Badge'

export interface StatusBadgeProps extends Omit<BadgeProps, 'variant'> {
  status: 'success' | 'warning' | 'error' | 'info' | 'neutral'
}

const StatusBadge = React.forwardRef<HTMLDivElement, StatusBadgeProps>(
  ({ status, ...props }, ref) => {
    const variantMap = {
      success: 'success' as const,
      warning: 'warning' as const,
      error: 'error' as const,
      info: 'default' as const,
      neutral: 'outline' as const,
    }

    return <Badge ref={ref} variant={variantMap[status]} {...props} />
  }
)

StatusBadge.displayName = 'StatusBadge'

export interface CountBadgeProps extends Omit<BadgeProps, 'children'> {
  count: number
  max?: number
  showZero?: boolean
}

const CountBadge = React.forwardRef<HTMLDivElement, CountBadgeProps>(
  ({ count, max = 99, showZero = false, ...props }, ref) => {
    if (count === 0 && !showZero) return null

    const displayCount = max && count > max ? `${max}+` : count.toString()

    return (
      <Badge ref={ref} size="sm" {...props}>
        {displayCount}
      </Badge>
    )
  }
)

CountBadge.displayName = 'CountBadge'

export { Badge, StatusBadge, CountBadge, badgeVariants }

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../../../../utils'

const badgeVariants = cva(
  [
    'inline-flex',
    'items-center',
    'justify-center',
    'rounded-md',
    'px-2.5',
    'py-0.5',
    'text-xs',
    'font-medium',
    'transition-colors',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-ring',
    'focus:ring-offset-2',
  ].join(' '),
  {
    variants: {
      variant: {
        default: [
          'bg-primary-blue',
          'text-white',
          'hover:bg-primary-blue/80',
        ].join(' '),
        secondary: [
          'bg-secondary-blue-1',
          'text-white',
          'hover:bg-secondary-blue-1/80',
        ].join(' '),
        success: [
          'bg-status-success',
          'text-white',
          'hover:bg-status-success/80',
        ].join(' '),
        warning: [
          'bg-status-warning',
          'text-white',
          'hover:bg-status-warning/80',
        ].join(' '),
        error: [
          'bg-status-error',
          'text-white',
          'hover:bg-status-error/80',
        ].join(' '),
        outline: [
          'border',
          'border-primary-blue',
          'text-primary-blue',
          'bg-transparent',
          'hover:bg-primary-blue/10',
        ].join(' '),
        ghost: [
          'text-primary-blue',
          'hover:bg-primary-blue/10',
          'border-transparent',
        ].join(' '),
        pending: [
          'bg-tertiary-gray-5',
          'text-tertiary-gray-1',
          'hover:bg-tertiary-gray-5/80',
        ].join(' '),
        processed: [
          'bg-status-success/20',
          'text-status-success',
          'hover:bg-status-success/30',
        ].join(' '),
        denied: [
          'bg-status-error/20',
          'text-status-error',
          'hover:bg-status-error/30',
        ].join(' '),
        approved: [
          'bg-status-success/20',
          'text-status-success',
          'hover:bg-status-success/30',
        ].join(' '),
        'partial-approval': [
          'bg-secondary-blue-1/20',
          'text-primary-blue',
          'hover:bg-secondary-blue-1/30',
        ].join(' '),
      },
      size: {
        default: 'h-6',
        sm: 'h-5 text-xs px-2',
        lg: 'h-7 px-3 py-1 text-sm',
        icon: 'h-6 w-6 p-0',
        label: 'h-6 text-xs font-medium px-2 py-1',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement | HTMLButtonElement>,
    VariantProps<typeof badgeVariants> {
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
            [
              'cursor-pointer',
              'hover:scale-105',
              'active:scale-95',
              'transition-transform',
              'duration-200',
            ].join(' '),
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

export type StatusBadgeStatus =
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'neutral'
type StatusBadgeVariant = Extract<
  NonNullable<BadgeProps['variant']>,
  'success' | 'warning' | 'error' | 'default' | 'outline'
>

export interface StatusBadgeProps extends Omit<BadgeProps, 'variant'> {
  status: StatusBadgeStatus
}

const statusVariantMap: Record<StatusBadgeStatus, StatusBadgeVariant> = {
  success: 'success',
  warning: 'warning',
  error: 'error',
  info: 'default',
  neutral: 'outline',
} as const

const StatusBadge = React.forwardRef<HTMLDivElement, StatusBadgeProps>(
  ({ status, ...props }, ref) => {
    return <Badge ref={ref} variant={statusVariantMap[status]} {...props} />
  }
)

StatusBadge.displayName = 'StatusBadge'

export type StatusLabelStatus =
  | 'pending'
  | 'processed'
  | 'denied'
  | 'approved'
  | 'partial-approval'
type StatusLabelVariant = Extract<
  NonNullable<BadgeProps['variant']>,
  StatusLabelStatus
>

export interface StatusLabelProps extends Omit<BadgeProps, 'variant'> {
  status: StatusLabelStatus
  text: string
}

const StatusLabel = React.forwardRef<HTMLDivElement, StatusLabelProps>(
  ({ status, text, className, ...props }, ref) => {
    return (
      <Badge
        ref={ref}
        variant={status as StatusLabelVariant}
        size="label"
        className={cn('cursor-default', className)}
        role="status"
        aria-live="polite"
        {...props}
      >
        {text}
      </Badge>
    )
  }
)

StatusLabel.displayName = 'StatusLabel'

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

export { Badge, StatusBadge, CountBadge, StatusLabel, badgeVariants }

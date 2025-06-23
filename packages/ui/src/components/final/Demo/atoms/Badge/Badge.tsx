import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../../../../utils'

const badgeVariants = cva(
  'badge',
  {
    variants: {
      variant: {
        default: 'badge-primary',
        secondary: 'badge-secondary',
        success: 'badge-success',
        warning: 'badge-warning',
        error: 'badge-error',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        pending: 'bg-labelNeutral text-tertiaryGray1',
        processed: 'bg-labelSuccess text-statusSuccess',
        denied: 'bg-labelError text-statusError',
        approved: 'bg-labelSuccess text-statusSuccess',
        'partial-approval': 'bg-secondaryBlue1Accent text-primaryBlue',
      },
      size: {
        default: '',
        sm: 'text-xs',
        lg: 'text-sm px-3 py-1',
        icon: 'h-6 w-6 p-0',
        label: 'text-xs font-medium px-2 py-1',
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
  interactive?: boolean;
  onClick?: () => void;
  icon?: React.ReactNode;
  dot?: boolean;
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

export type StatusBadgeStatus = 'success' | 'warning' | 'error' | 'info' | 'neutral';
type StatusBadgeVariant = Extract<NonNullable<BadgeProps['variant']>, 'success' | 'warning' | 'error' | 'default' | 'outline'>;

export interface StatusBadgeProps extends Omit<BadgeProps, 'variant'> {
  status: StatusBadgeStatus;
}

const statusVariantMap: Record<StatusBadgeStatus, StatusBadgeVariant> = {
  success: 'success',
  warning: 'warning',
  error: 'error',
  info: 'default',
  neutral: 'outline',
} as const;

const StatusBadge = React.forwardRef<HTMLDivElement, StatusBadgeProps>(
  ({ status, ...props }, ref) => {
    return <Badge ref={ref} variant={statusVariantMap[status]} {...props} />
  }
)

StatusBadge.displayName = 'StatusBadge'

export type StatusLabelStatus = 'pending' | 'processed' | 'denied' | 'approved' | 'partial-approval';
type StatusLabelVariant = Extract<NonNullable<BadgeProps['variant']>, StatusLabelStatus>;

export interface StatusLabelProps extends Omit<BadgeProps, 'variant'> {
  status: StatusLabelStatus;
  text: string;
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
    );
  }
);

StatusLabel.displayName = 'StatusLabel';

export interface CountBadgeProps extends Omit<BadgeProps, 'children'> {
  count: number;
  max?: number;
  showZero?: boolean;
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
import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const cardVariants = cva(
  'rounded-lg bg-white text-slate-950',
  {
    variants: {
      variant: {
        default: 'border border-slate-200 shadow-sm',
        info: 'border border-slate-200',
        claim: 'border-l-4 border-l-blue-500 border-y border-r',
        auth: 'border-l-4 border-l-green-500 border-y border-r',
        document: 'border-l-4 border-l-amber-500 border-y border-r',
        error: 'border-l-4 border-l-red-500 border-y border-r',
        warning: 'border-l-4 border-l-yellow-500 border-y border-r',
      },
      size: {
        sm: 'p-3',
        md: 'p-4',
        lg: 'p-6',
        xl: 'p-8',
      },
      status: {
        approved: 'bg-green-50',
        pending: 'bg-yellow-50',
        denied: 'bg-red-50',
        completed: 'bg-blue-50',
        default: '',
      },
      isCompact: {
        true: 'flex items-center',
        false: '',
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      status: 'default',
      isCompact: false,
    },
  }
)

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  asChild?: boolean
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, size, status, isCompact, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ variant, size, status, isCompact }), className)}
      {...props}
    />
  )
)
Card.displayName = 'Card'

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    icon?: React.ReactNode
    actions?: React.ReactNode
    isCompact?: boolean
  }
>(({ className, icon, actions, isCompact, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex',
      isCompact ? 'items-center justify-between' : 'flex-col space-y-1.5',
      className
    )}
    {...props}
  >
    <div className={cn(
      'flex',
      isCompact ? 'items-center gap-3 flex-grow' : 'w-full items-start justify-between'
    )}>
      {icon && (
        <div className="shrink-0">
          {icon}
        </div>
      )}
      <div className={isCompact ? 'flex-grow' : 'w-full'}>
        {children}
      </div>
      {actions && (
        <div className={cn(
          'flex',
          isCompact ? 'ml-auto pl-4' : ''
        )}>
          {actions}
        </div>
      )}
    </div>
  </div>
))
CardHeader.displayName = 'CardHeader'

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement> & {
    subtitle?: React.ReactNode
    isCompact?: boolean
  }
>(({ className, subtitle, isCompact, children, ...props }, ref) => (
  <div className={cn(
    'flex',
    isCompact ? 'flex-row items-center gap-2' : 'flex-col gap-1'
  )}>
    <h3
      ref={ref}
      className={cn(
        'font-semibold leading-none tracking-tight',
        isCompact ? 'text-base' : 'text-2xl',
        className
      )}
      {...props}
    >
      {children}
    </h3>
    {subtitle && (
      <p className="text-sm text-slate-500">
        {subtitle}
      </p>
    )}
  </div>
))
CardTitle.displayName = 'CardTitle'

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-slate-500', className)}
    {...props}
  />
))
CardDescription.displayName = 'CardDescription'

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    isCompact?: boolean
  }
>(({ className, isCompact, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      isCompact ? '' : 'pt-0',
      className
    )}
    {...props}
  />
))
CardContent.displayName = 'CardContent'

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center pt-0', className)}
    {...props}
  />
))
CardFooter.displayName = 'CardFooter'

const cardListVariants = cva(
  'flex flex-col',
  {
    variants: {
      spacing: {
        default: 'space-y-4',
        tight: 'space-y-2',
        loose: 'space-y-6',
      },
      dividers: {
        true: 'divide-y divide-slate-200',
        false: '',
      }
    },
    defaultVariants: {
      spacing: 'default',
      dividers: false,
    },
  }
)

export interface CardListProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardListVariants> {}

const CardList = React.forwardRef<HTMLDivElement, CardListProps>(
  ({ className, spacing, dividers, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardListVariants({ spacing, dividers }), className)}
      {...props}
    />
  )
)
CardList.displayName = 'CardList'

export interface CardItemProps {
  label: React.ReactNode
  value: React.ReactNode
  icon?: React.ReactNode
}

const CardItem = React.forwardRef<
  HTMLDivElement,
  CardItemProps & React.HTMLAttributes<HTMLDivElement>
>(({ className, label, value, icon, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center justify-between py-1', className)}
    {...props}
  >
    <div className="flex items-center gap-2">
      {icon && <span className="text-slate-500">{icon}</span>}
      <span className="text-sm text-slate-500">{label}</span>
    </div>
    <span className="text-sm font-medium">{value}</span>
  </div>
))
CardItem.displayName = 'CardItem'

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  CardList,
  CardItem,
} 
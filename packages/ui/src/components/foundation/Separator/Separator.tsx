import * as React from 'react'
import * as SeparatorPrimitive from '@radix-ui/react-separator'
import { cn } from '../../../lib/utils'

export interface SeparatorProps
  extends React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> {
  className?: string
  orientation?: 'horizontal' | 'vertical'
  decorative?: boolean
}

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  SeparatorProps
>(({ className, orientation = 'horizontal', decorative = true, ...props }, ref) => (
  <SeparatorPrimitive.Root
    ref={ref}
    decorative={decorative}
    orientation={orientation}
    className={cn(
      'shrink-0 bg-border',
      orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]',
      className
    )}
    {...props}
  />
))
Separator.displayName = SeparatorPrimitive.Root.displayName

// Divider with text/content
export interface DividerProps extends Omit<SeparatorProps, 'children'> {
  /**
   * Content to display in the center of the divider
   */
  children?: React.ReactNode
  /**
   * Position of the content
   */
  position?: 'left' | 'center' | 'right'
  /**
   * Spacing around the content
   */
  spacing?: 'sm' | 'md' | 'lg'
}

const Divider = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  DividerProps
>(({ 
  className, 
  children, 
  position = 'center', 
  spacing = 'md',
  orientation = 'horizontal',
  ...props 
}, ref) => {
  const spacingMap = {
    sm: 'px-2',
    md: 'px-3',
    lg: 'px-4'
  }

  const justifyMap = {
    left: 'justify-start',
    center: 'justify-center', 
    right: 'justify-end'
  }

  if (!children) {
    return <Separator ref={ref} className={className} orientation={orientation} {...props} />
  }

  if (orientation === 'vertical') {
    return (
      <div className={cn('flex h-full flex-col items-center', justifyMap[position])}>
        <Separator orientation="vertical" className="flex-1" />
        {children && (
          <div className={cn('py-2 text-xs text-muted-foreground', className)}>
            {children}
          </div>
        )}
        <Separator orientation="vertical" className="flex-1" />
      </div>
    )
  }

  return (
    <div className={cn('flex w-full items-center', justifyMap[position])}>
      <Separator className="flex-1" />
      {children && (
        <div className={cn(
          'text-xs text-muted-foreground',
          spacingMap[spacing],
          className
        )}>
          {children}
        </div>
      )}
      <Separator className="flex-1" />
    </div>
  )
})
Divider.displayName = 'Divider'

// Section separator with optional title
export interface SectionSeparatorProps {
  title?: string
  subtitle?: string
  className?: string
}

const SectionSeparator = React.forwardRef<
  HTMLDivElement,
  SectionSeparatorProps
>(({ title, subtitle, className }, ref) => (
  <div ref={ref} className={cn('space-y-2', className)}>
    {title && (
      <h3 className="text-lg font-semibold leading-none tracking-tight">
        {title}
      </h3>
    )}
    {subtitle && (
      <p className="text-sm text-muted-foreground">
        {subtitle}
      </p>
    )}
    <Separator />
  </div>
))
SectionSeparator.displayName = 'SectionSeparator'

export { Separator, Divider, SectionSeparator } 
'use client'

import * as React from 'react'
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import { cn } from '../../../utils'

interface RadioGroupProps extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> {
  orientation?: 'horizontal' | 'vertical'
  error?: string
  description?: string
}

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  RadioGroupProps
>(({ className, orientation = 'vertical', error, description, ...props }, ref) => {
  return (
    <div className="space-y-2">
      <RadioGroupPrimitive.Root
        className={cn(
          'grid',
          orientation === 'horizontal' ? 'grid-flow-col gap-4' : 'gap-2',
          className
        )}
        {...props}
        ref={ref}
      />
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
      {error && (
        <p className="text-sm font-medium text-destructive">{error}</p>
      )}
    </div>
  )
})

RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

interface RadioProps extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> {
  label: string
  description?: string
  size?: 'sm' | 'md' | 'lg'
}

const Radio = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioProps
>(({ className, label, description, size = 'md', ...props }, ref) => {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  }

  const indicatorSizes = {
    sm: 'h-2 w-2',
    md: 'h-2.5 w-2.5',
    lg: 'h-3 w-3',
  }

  return (
    <div className="flex items-start space-x-2">
      <RadioGroupPrimitive.Item
        ref={ref}
        className={cn(
          'aspect-square rounded-full border-2 border-primary bg-background text-primary ring-offset-background',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          'disabled:cursor-not-allowed disabled:opacity-50',
          'hover:border-primary/80',
          'data-[state=checked]:bg-background data-[state=checked]:border-primary',
          sizes[size],
          className
        )}
        {...props}
      >
        <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
          <div className={cn(
            'rounded-full bg-primary',
            indicatorSizes[size]
          )} />
        </RadioGroupPrimitive.Indicator>
      </RadioGroupPrimitive.Item>
      <div>
        <label
          htmlFor={props.id}
          className={cn(
            'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer',
            size === 'lg' && 'text-base'
          )}
        >
          {label}
        </label>
        {description && (
          <p className={cn(
            'text-sm text-muted-foreground',
            size === 'sm' && 'text-xs',
            size === 'lg' && 'text-base'
          )}>
            {description}
          </p>
        )}
      </div>
    </div>
  )
})

Radio.displayName = RadioGroupPrimitive.Item.displayName

export type { RadioGroupProps, RadioProps }
export { RadioGroup, Radio } 
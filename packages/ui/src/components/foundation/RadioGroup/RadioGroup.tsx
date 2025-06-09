'use client'

import * as React from 'react'
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import { cn } from '../../../lib/utils'

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn('grid gap-2', className)}
      {...props}
      ref={ref}
    />
  )
})
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

const Radio = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> & {
    label: string
  }
>(({ className, label, ...props }, ref) => {
  return (
    <div className="flex items-center space-x-2">
      <RadioGroupPrimitive.Item
        ref={ref}
        className={cn(
          'aspect-square h-5 w-5 rounded-full border-2 border-primaryBlue bg-white text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-primaryBlue focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          'hover:border-secondaryBlue2',
          'data-[state=checked]:bg-white data-[state=checked]:border-primaryBlue',
          className
        )}
        {...props}
      >
        <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
          <div className="h-2.5 w-2.5 rounded-full bg-primaryBlue" />
        </RadioGroupPrimitive.Indicator>
      </RadioGroupPrimitive.Item>
      <label
        htmlFor={props.id}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
      >
        {label}
      </label>
    </div>
  )
})
Radio.displayName = RadioGroupPrimitive.Item.displayName

export { RadioGroup, Radio }

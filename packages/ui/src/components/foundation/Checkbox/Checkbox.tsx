'use client'

import * as React from 'react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { CheckIcon, MinusIcon } from '../../../lib/icons'
import { cn } from '../../../lib/utils'

export interface CheckboxProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
    'onChange'
  > {
  label: string
  hint?: string
  required?: boolean
  indeterminate?: boolean
  onChange?: (checked: boolean | 'indeterminate') => void
}

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(
  (
    {
      className,
      label,
      hint,
      required,
      indeterminate,
      onChange,
      checked,
      ...props
    },
    ref
  ) => {
    const handleCheckedChange = (checkedState: boolean | 'indeterminate') => {
      onChange?.(checkedState)
    }

    // Handle indeterminate state properly - pass the correct checked state
    const checkedState = indeterminate ? 'indeterminate' : checked

    return (
      <div className="flex items-start space-x-2">
        <CheckboxPrimitive.Root
          ref={ref}
          className={cn(
            'peer h-5 w-5 shrink-0 rounded-sm border-2 border-primaryBlue bg-white ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primaryBlue focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primaryBlue data-[state=checked]:text-primary-foreground data-[state=indeterminate]:bg-primaryBlue data-[state=indeterminate]:text-primary-foreground relative',
            'hover:border-secondaryBlue2',
            className
          )}
          checked={checkedState}
          onCheckedChange={handleCheckedChange}
          {...props}
        >
          <CheckboxPrimitive.Indicator
            className={cn(
              'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 leading-none'
            )}
          >
            {indeterminate ? (
              <MinusIcon className="h-2.5 w-2.5 text-white block" />
            ) : (
              <CheckIcon className="h-2.5 w-2.5 text-white block" />
            )}
          </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>
        <div className="grid gap-1.5 leading-none">
          <label
            htmlFor={props.id}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer text-tertiary-gray1"
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
          {hint && (
            <p className="text-xs text-tertiary-gray3 leading-relaxed">
              {hint}
            </p>
          )}
        </div>
      </div>
    )
  }
)

Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }

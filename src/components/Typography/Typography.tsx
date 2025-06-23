'use client'

import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const typographyVariants = cva('text-slate-950', {
  variants: {
    variant: {
      h1: 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
      h2: 'scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0',
      h3: 'scroll-m-20 text-2xl font-semibold tracking-tight',
      h4: 'scroll-m-20 text-xl font-semibold tracking-tight',
      h5: 'scroll-m-20 text-lg font-semibold tracking-tight',
      h6: 'scroll-m-20 text-base font-semibold tracking-tight',
      p: 'leading-7 [&:not(:first-child)]:mt-6',
      blockquote: 'mt-6 border-l-2 pl-6 italic',
      code: 'relative rounded bg-slate-100 px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
      lead: 'text-xl text-slate-500',
      large: 'text-lg font-semibold',
      small: 'text-sm font-medium leading-none',
      muted: 'text-sm text-slate-500',
      label: 'text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
    },
    weight: {
      light: 'font-light',
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
      extrabold: 'font-extrabold',
    },
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
      justify: 'text-justify',
    },
    decoration: {
      none: 'no-underline',
      underline: 'underline',
      lineThrough: 'line-through',
    },
    transform: {
      normal: 'normal-case',
      uppercase: 'uppercase',
      lowercase: 'lowercase',
      capitalize: 'capitalize',
    },
    truncate: {
      true: 'truncate',
    },
    // Responsive variants
    weightSm: {
      light: 'sm:font-light',
      normal: 'sm:font-normal',
      medium: 'sm:font-medium',
      semibold: 'sm:font-semibold',
      bold: 'sm:font-bold',
      extrabold: 'sm:font-extrabold',
    },
    weightMd: {
      light: 'md:font-light',
      normal: 'md:font-normal',
      medium: 'md:font-medium',
      semibold: 'md:font-semibold',
      bold: 'md:font-bold',
      extrabold: 'md:font-extrabold',
    },
    weightLg: {
      light: 'lg:font-light',
      normal: 'lg:font-normal',
      medium: 'lg:font-medium',
      semibold: 'lg:font-semibold',
      bold: 'lg:font-bold',
      extrabold: 'lg:font-extrabold',
    },
    alignSm: {
      left: 'sm:text-left',
      center: 'sm:text-center',
      right: 'sm:text-right',
      justify: 'sm:text-justify',
    },
    alignMd: {
      left: 'md:text-left',
      center: 'md:text-center',
      right: 'md:text-right',
      justify: 'md:text-justify',
    },
    alignLg: {
      left: 'lg:text-left',
      center: 'lg:text-center',
      right: 'lg:text-right',
      justify: 'lg:text-justify',
    },
  },
  defaultVariants: {
    variant: 'p',
    weight: 'normal',
    align: 'left',
    decoration: 'none',
    transform: 'normal',
  },
})

type ElementType = keyof JSX.IntrinsicElements | React.ComponentType<any>

export interface TypographyProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'prefix'>,
    VariantProps<typeof typographyVariants> {
  /** The HTML element to render as */
  as?: ElementType
  /** Whether to render children as a slot */
  asChild?: boolean
  /** Optional prefix element */
  prefix?: React.ReactNode
  /** Optional suffix element */
  suffix?: React.ReactNode
}

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  (
    {
      className,
      variant,
      weight,
      weightSm,
      weightMd,
      weightLg,
      align,
      alignSm,
      alignMd,
      alignLg,
      decoration,
      transform,
      truncate,
      as,
      asChild = false,
      prefix,
      suffix,
      children,
      ...props
    },
    ref
  ) => {
    // Determine the component to render
    const Comp = asChild
      ? Slot
      : as || (variant?.startsWith('h') ? variant : 'p')

    return (
      <Comp
        ref={ref}
        className={cn(
          typographyVariants({
            variant,
            weight,
            weightSm,
            weightMd,
            weightLg,
            align,
            alignSm,
            alignMd,
            alignLg,
            decoration,
            transform,
            truncate,
          }),
          className
        )}
        {...props}
      >
        {prefix}
        {children}
        {suffix}
      </Comp>
    )
  }
)
Typography.displayName = 'Typography'

export { Typography, typographyVariants } 
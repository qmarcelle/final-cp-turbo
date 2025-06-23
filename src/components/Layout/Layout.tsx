'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

// Container variants
const containerVariants = cva(
  'mx-auto w-full px-4 sm:px-6 lg:px-8',
  {
    variants: {
      size: {
        sm: 'max-w-screen-sm',
        md: 'max-w-screen-md',
        lg: 'max-w-screen-lg',
        xl: 'max-w-screen-xl',
        '2xl': 'max-w-screen-2xl',
        full: 'max-w-full',
      },
      padding: {
        none: 'px-0',
        sm: 'px-4',
        md: 'px-6',
        lg: 'px-8',
      },
    },
    defaultVariants: {
      size: 'lg',
      padding: 'md',
    },
  }
)

// Flex variants
const flexVariants = cva(
  'flex',
  {
    variants: {
      direction: {
        row: 'flex-row',
        column: 'flex-col',
        rowReverse: 'flex-row-reverse',
        columnReverse: 'flex-col-reverse',
      },
      directionSm: {
        row: 'sm:flex-row',
        column: 'sm:flex-col',
        rowReverse: 'sm:flex-row-reverse',
        columnReverse: 'sm:flex-col-reverse',
      },
      directionMd: {
        row: 'md:flex-row',
        column: 'md:flex-col',
        rowReverse: 'md:flex-row-reverse',
        columnReverse: 'md:flex-col-reverse',
      },
      directionLg: {
        row: 'lg:flex-row',
        column: 'lg:flex-col',
        rowReverse: 'lg:flex-row-reverse',
        columnReverse: 'lg:flex-col-reverse',
      },
      align: {
        start: 'items-start',
        center: 'items-center',
        end: 'items-end',
        baseline: 'items-baseline',
        stretch: 'items-stretch',
      },
      alignSm: {
        start: 'sm:items-start',
        center: 'sm:items-center',
        end: 'sm:items-end',
        baseline: 'sm:items-baseline',
        stretch: 'sm:items-stretch',
      },
      alignMd: {
        start: 'md:items-start',
        center: 'md:items-center',
        end: 'md:items-end',
        baseline: 'md:items-baseline',
        stretch: 'md:items-stretch',
      },
      alignLg: {
        start: 'lg:items-start',
        center: 'lg:items-center',
        end: 'lg:items-end',
        baseline: 'lg:items-baseline',
        stretch: 'lg:items-stretch',
      },
      justify: {
        start: 'justify-start',
        center: 'justify-center',
        end: 'justify-end',
        between: 'justify-between',
        around: 'justify-around',
        evenly: 'justify-evenly',
      },
      justifySm: {
        start: 'sm:justify-start',
        center: 'sm:justify-center',
        end: 'sm:justify-end',
        between: 'sm:justify-between',
        around: 'sm:justify-around',
        evenly: 'sm:justify-evenly',
      },
      justifyMd: {
        start: 'md:justify-start',
        center: 'md:justify-center',
        end: 'md:justify-end',
        between: 'md:justify-between',
        around: 'md:justify-around',
        evenly: 'md:justify-evenly',
      },
      justifyLg: {
        start: 'lg:justify-start',
        center: 'lg:justify-center',
        end: 'lg:justify-end',
        between: 'lg:justify-between',
        around: 'lg:justify-around',
        evenly: 'lg:justify-evenly',
      },
      wrap: {
        wrap: 'flex-wrap',
        nowrap: 'flex-nowrap',
        wrapReverse: 'flex-wrap-reverse',
      },
      gap: {
        0: 'gap-0',
        1: 'gap-1',
        2: 'gap-2',
        3: 'gap-3',
        4: 'gap-4',
        5: 'gap-5',
        6: 'gap-6',
        8: 'gap-8',
        10: 'gap-10',
        12: 'gap-12',
      },
    },
    defaultVariants: {
      direction: 'row',
      align: 'start',
      justify: 'start',
      wrap: 'nowrap',
      gap: 0,
    },
  }
)

// Grid variants
const gridVariants = cva(
  'grid',
  {
    variants: {
      cols: {
        1: 'grid-cols-1',
        2: 'grid-cols-2',
        3: 'grid-cols-3',
        4: 'grid-cols-4',
        5: 'grid-cols-5',
        6: 'grid-cols-6',
        12: 'grid-cols-12',
        auto: 'grid-auto-cols',
        'auto-fit': 'grid-auto-fit',
      },
      colsSm: {
        1: 'sm:grid-cols-1',
        2: 'sm:grid-cols-2',
        3: 'sm:grid-cols-3',
        4: 'sm:grid-cols-4',
        6: 'sm:grid-cols-6',
        12: 'sm:grid-cols-12',
      },
      colsMd: {
        1: 'md:grid-cols-1',
        2: 'md:grid-cols-2',
        3: 'md:grid-cols-3',
        4: 'md:grid-cols-4',
        6: 'md:grid-cols-6',
        12: 'md:grid-cols-12',
      },
      colsLg: {
        1: 'lg:grid-cols-1',
        2: 'lg:grid-cols-2',
        3: 'lg:grid-cols-3',
        4: 'lg:grid-cols-4',
        6: 'lg:grid-cols-6',
        12: 'lg:grid-cols-12',
      },
      gap: {
        0: 'gap-0',
        1: 'gap-1',
        2: 'gap-2',
        3: 'gap-3',
        4: 'gap-4',
        5: 'gap-5',
        6: 'gap-6',
        8: 'gap-8',
        10: 'gap-10',
        12: 'gap-12',
      },
      flow: {
        row: 'grid-flow-row',
        col: 'grid-flow-col',
        dense: 'grid-flow-dense',
        'row-dense': 'grid-flow-row-dense',
        'col-dense': 'grid-flow-col-dense',
      },
    },
    defaultVariants: {
      cols: 1,
      gap: 4,
      flow: 'row',
    },
  }
)

// Base layout props
interface BaseLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType
}

// Container props
export interface ContainerProps
  extends BaseLayoutProps,
    VariantProps<typeof containerVariants> {}

// Flex props
export interface FlexProps
  extends BaseLayoutProps,
    VariantProps<typeof flexVariants> {}

// Grid props
export interface GridProps
  extends BaseLayoutProps,
    VariantProps<typeof gridVariants> {}

// Container component
const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size, padding, as: Component = 'div', ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(containerVariants({ size, padding }), className)}
        {...props}
      />
    )
  }
)
Container.displayName = 'Container'

// Flex component
const Flex = React.forwardRef<HTMLDivElement, FlexProps>(
  (
    {
      className,
      as: Component = 'div',
      direction,
      directionSm,
      directionMd,
      directionLg,
      align,
      alignSm,
      alignMd,
      alignLg,
      justify,
      justifySm,
      justifyMd,
      justifyLg,
      wrap,
      gap,
      ...props
    },
    ref
  ) => {
    return (
      <Component
        ref={ref}
        className={cn(
          flexVariants({
            direction,
            directionSm,
            directionMd,
            directionLg,
            align,
            alignSm,
            alignMd,
            alignLg,
            justify,
            justifySm,
            justifyMd,
            justifyLg,
            wrap,
            gap,
          }),
          className
        )}
        {...props}
      />
    )
  }
)
Flex.displayName = 'Flex'

// Grid component
const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  (
    {
      className,
      as: Component = 'div',
      cols,
      colsSm,
      colsMd,
      colsLg,
      gap,
      flow,
      ...props
    },
    ref
  ) => {
    return (
      <Component
        ref={ref}
        className={cn(
          gridVariants({ cols, colsSm, colsMd, colsLg, gap, flow }),
          className
        )}
        {...props}
      />
    )
  }
)
Grid.displayName = 'Grid'

// Row component - shorthand for Flex with row direction
const Row = React.forwardRef<HTMLDivElement, Omit<FlexProps, 'direction'>>(
  (props, ref) => {
    return <Flex ref={ref} direction="row" {...props} />
  }
)
Row.displayName = 'Row'

// Column component - shorthand for Flex with column direction
const Column = React.forwardRef<HTMLDivElement, Omit<FlexProps, 'direction'>>(
  (props, ref) => {
    return <Flex ref={ref} direction="column" {...props} />
  }
)
Column.displayName = 'Column'

// Export layout elements as standalone and as a namespace
export { Container, Flex, Grid, Row, Column }

export const Layout = {
  Container,
  Flex,
  Grid,
  Row,
  Column,
} 
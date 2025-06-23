"use client";

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../utils';

// Flex component variants
const flexVariants = cva(
  "flex",
  {
    variants: {
      direction: {
        row: "flex-row",
        column: "flex-col",
        rowReverse: "flex-row-reverse",
        columnReverse: "flex-col-reverse",
      },
      // Responsive variants for direction
      directionSm: {
        row: "sm:flex-row",
        column: "sm:flex-col",
        rowReverse: "sm:flex-row-reverse",
        columnReverse: "sm:flex-col-reverse",
      },
      directionMd: {
        row: "md:flex-row",
        column: "md:flex-col",
        rowReverse: "md:flex-row-reverse",
        columnReverse: "md:flex-col-reverse",
      },
      directionLg: {
        row: "lg:flex-row",
        column: "lg:flex-col",
        rowReverse: "lg:flex-row-reverse",
        columnReverse: "lg:flex-col-reverse",
      },
      align: {
        start: "items-start",
        center: "items-center",
        end: "items-end",
        baseline: "items-baseline",
        stretch: "items-stretch",
      },
      // Responsive variants for align
      alignSm: {
        start: "sm:items-start",
        center: "sm:items-center",
        end: "sm:items-end",
        baseline: "sm:items-baseline",
        stretch: "sm:items-stretch",
      },
      alignMd: {
        start: "md:items-start",
        center: "md:items-center",
        end: "md:items-end",
        baseline: "md:items-baseline",
        stretch: "md:items-stretch",
      },
      alignLg: {
        start: "lg:items-start",
        center: "lg:items-center",
        end: "lg:items-end",
        baseline: "lg:items-baseline",
        stretch: "lg:items-stretch",
      },
      justify: {
        start: "justify-start",
        center: "justify-center",
        end: "justify-end",
        between: "justify-between",
        around: "justify-around",
        evenly: "justify-evenly",
      },
      // Responsive variants for justify
      justifySm: {
        start: "sm:justify-start",
        center: "sm:justify-center",
        end: "sm:justify-end",
        between: "sm:justify-between",
        around: "sm:justify-around",
        evenly: "sm:justify-evenly",
      },
      justifyMd: {
        start: "md:justify-start",
        center: "md:justify-center",
        end: "md:justify-end",
        between: "md:justify-between",
        around: "md:justify-around",
        evenly: "md:justify-evenly",
      },
      justifyLg: {
        start: "lg:justify-start",
        center: "lg:justify-center",
        end: "lg:justify-end",
        between: "lg:justify-between",
        around: "lg:justify-around",
        evenly: "lg:justify-evenly",
      },
      wrap: {
        nowrap: "flex-nowrap",
        wrap: "flex-wrap",
        wrapReverse: "flex-wrap-reverse",
      },
      gap: {
        0: "gap-0",
        1: "gap-1",
        2: "gap-2",
        3: "gap-3",
        4: "gap-4",
        5: "gap-5",
        6: "gap-6",
        8: "gap-8",
        10: "gap-10",
        12: "gap-12",
        16: "gap-16",
        20: "gap-20",
      },
      // Responsive variants for gap
      gapSm: {
        0: "sm:gap-0",
        1: "sm:gap-1",
        2: "sm:gap-2",
        3: "sm:gap-3",
        4: "sm:gap-4",
        5: "sm:gap-5",
        6: "sm:gap-6",
        8: "sm:gap-8",
        10: "sm:gap-10",
        12: "sm:gap-12",
        16: "sm:gap-16",
        20: "sm:gap-20",
      },
      gapMd: {
        0: "md:gap-0",
        1: "md:gap-1",
        2: "md:gap-2",
        3: "md:gap-3",
        4: "md:gap-4",
        5: "md:gap-5",
        6: "md:gap-6",
        8: "md:gap-8",
        10: "md:gap-10",
        12: "md:gap-12",
        16: "md:gap-16",
        20: "md:gap-20",
      },
      gapLg: {
        0: "lg:gap-0",
        1: "lg:gap-1",
        2: "lg:gap-2",
        3: "lg:gap-3",
        4: "lg:gap-4",
        5: "lg:gap-5",
        6: "lg:gap-6",
        8: "lg:gap-8",
        10: "lg:gap-10",
        12: "lg:gap-12",
        16: "lg:gap-16",
        20: "lg:gap-20",
      },
      width: {
        full: "w-full",
        auto: "w-auto",
        screen: "w-screen",
        "1/2": "w-1/2",
        "1/3": "w-1/3",
        "2/3": "w-2/3",
        "1/4": "w-1/4",
        "3/4": "w-3/4",
      },
      height: {
        full: "h-full",
        auto: "h-auto",
        screen: "h-screen",
        "1/2": "h-1/2",
        "1/3": "h-1/3",
        "2/3": "h-2/3",
        "1/4": "h-1/4",
        "3/4": "h-3/4",
      },
      grow: {
        0: "flex-grow-0",
        1: "flex-grow",
      },
      shrink: {
        0: "flex-shrink-0",
        1: "flex-shrink",
      },
    },
    defaultVariants: {
      direction: "row",
      align: "start",
      justify: "start",
      wrap: "nowrap",
      gap: 0,
      width: "auto",
      grow: 0,
      shrink: 1,
    },
  }
);

// Grid component variants
const gridVariants = cva(
  "grid",
  {
    variants: {
      cols: {
        1: "grid-cols-1",
        2: "grid-cols-2",
        3: "grid-cols-3",
        4: "grid-cols-4",
        5: "grid-cols-5",
        6: "grid-cols-6",
        12: "grid-cols-12",
        auto: "grid-cols-auto",
        "auto-fit": "grid-cols-auto-fit",
      },
      colsSm: {
        1: "sm:grid-cols-1",
        2: "sm:grid-cols-2",
        3: "sm:grid-cols-3",
        4: "sm:grid-cols-4",
        6: "sm:grid-cols-6",
        12: "sm:grid-cols-12",
      },
      colsMd: {
        1: "md:grid-cols-1",
        2: "md:grid-cols-2",
        3: "md:grid-cols-3",
        4: "md:grid-cols-4",
        6: "md:grid-cols-6",
        12: "md:grid-cols-12",
      },
      colsLg: {
        1: "lg:grid-cols-1",
        2: "lg:grid-cols-2",
        3: "lg:grid-cols-3",
        4: "lg:grid-cols-4",
        6: "lg:grid-cols-6",
        12: "lg:grid-cols-12",
      },
      gap: {
        0: "gap-0",
        1: "gap-1",
        2: "gap-2",
        3: "gap-3",
        4: "gap-4",
        5: "gap-5",
        6: "gap-6",
        8: "gap-8",
        10: "gap-10",
        12: "gap-12",
      },
      flow: {
        row: "grid-flow-row",
        col: "grid-flow-col",
        dense: "grid-flow-dense",
        "row-dense": "grid-flow-row-dense",
        "col-dense": "grid-flow-col-dense",
      },
    },
    defaultVariants: {
      cols: 1,
      gap: 4,
      flow: "row",
    },
  }
);

// Base layout props
interface BaseLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
}

// Flex component props
export interface FlexProps extends BaseLayoutProps, VariantProps<typeof flexVariants> {}

// Grid component props
export interface GridProps extends BaseLayoutProps, VariantProps<typeof gridVariants> {}

// Form layout props
export interface FormLayoutProps extends BaseLayoutProps {
  variant?: 'grid' | 'column' | 'inline';
  columns?: 1 | 2 | 3 | 4 | 6 | 12;
  gap?: 2 | 4 | 6 | 8 | 12 | 16;
}

/**
 * Flex component for creating flexible layouts
 */
export const Flex = React.forwardRef<HTMLDivElement, FlexProps>(
  ({
    className,
    as: Component = "div",
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
    gapSm,
    gapMd,
    gapLg,
    width,
    height,
    grow,
    shrink,
    ...props
  }, ref) => {
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
            gapSm,
            gapMd,
            gapLg,
            width,
            height,
            grow,
            shrink,
          }),
          className
        )}
        {...props}
      />
    );
  }
);

Flex.displayName = "Flex";

/**
 * Grid component for creating grid layouts
 */
export const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({
    className,
    as: Component = "div",
    cols,
    colsSm,
    colsMd,
    colsLg,
    gap,
    flow,
    ...props
  }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(
          gridVariants({ cols, colsSm, colsMd, colsLg, gap, flow }),
          className
        )}
        {...props}
      />
    );
  }
);

Grid.displayName = "Grid";

/**
 * Row component - shorthand for Flex with row direction
 */
export const Row = React.forwardRef<HTMLDivElement, Omit<FlexProps, 'direction'>>(
  (props, ref) => {
    return <Flex ref={ref} direction="row" {...props} />;
  }
);

Row.displayName = "Row";

/**
 * Column component - shorthand for Flex with column direction
 */
export const Column = React.forwardRef<HTMLDivElement, Omit<FlexProps, 'direction'>>(
  (props, ref) => {
    return <Flex ref={ref} direction="column" {...props} />;
  }
);

Column.displayName = "Column";

/**
 * FormLayout component for consistent form layouts
 */
export const FormLayout = React.forwardRef<HTMLDivElement, FormLayoutProps>(
  ({
    className,
    variant = "grid",
    columns = 1,
    gap = 6,
    as: Component = "div",
    ...props
  }, ref) => {
    const gridCols = {
      1: "grid-cols-1",
      2: "grid-cols-1 sm:grid-cols-2",
      3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
      4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
      6: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-6",
      12: "grid-cols-1 sm:grid-cols-3 lg:grid-cols-12",
    }[columns];

    const gridGap = `gap-${gap}`;

    const variantStyles = {
      grid: "",
      column: "max-w-2xl",
      inline: "w-full",
    }[variant];

    return (
      <Component
        ref={ref}
        className={cn(
          "grid",
          gridCols,
          gridGap,
          variantStyles,
          className
        )}
        {...props}
      />
    );
  }
);

FormLayout.displayName = "FormLayout";

// Export layout elements as standalone and as a namespace
export const Layout = {
  Flex,
  Grid,
  Row,
  Column,
  FormLayout,
}; 
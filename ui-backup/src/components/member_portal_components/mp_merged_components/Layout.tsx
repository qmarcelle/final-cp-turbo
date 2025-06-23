/**
 * Layout Components
 * 
 * Consolidated implementation combining functionality from:
 * - foundation/Row
 * - foundation/Column
 * - foundation/Spacer
 */

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../utils';

// Flex component variants with responsive options
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
        wrap: "flex-wrap",
        nowrap: "flex-nowrap",
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

export interface FlexProps 
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof flexVariants> {
  as?: React.ElementType;
  children?: React.ReactNode;
  /**
   * Optional testid for testing
   */
  'data-testid'?: string;

  /**
   * Optional data-cy attribute for Cypress testing
   */
  'data-cy'?: string;
}

/**
 * Flex component for creating flexible layouts
 * Replaces the previous Row and Column components with a more robust implementation
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
    'data-testid': dataTestId,
    'data-cy': dataCy,
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
            shrink
          }),
          className
        )}
        data-testid={dataTestId}
        data-cy={dataCy}
        {...props}
      />
    );
  }
);

Flex.displayName = "Flex";

/**
 * Row component - shorthand for Flex with row direction
 */
export const Row = React.forwardRef<HTMLDivElement, Omit<FlexProps, 'direction'>>(
  (props, ref) => {
    return <Flex direction="row" ref={ref} {...props} />;
  }
);

Row.displayName = "Row";

/**
 * Column component - shorthand for Flex with column direction
 */
export const Column = React.forwardRef<HTMLDivElement, Omit<FlexProps, 'direction'>>(
  (props, ref) => {
    return <Flex direction="column" ref={ref} {...props} />;
  }
);

Column.displayName = "Column";

// Spacer component variants
const spacerVariants = cva(
  "flex-shrink-0",
  {
    variants: {
      size: {
        0: "w-0 h-0",
        1: "w-1 h-1",
        2: "w-2 h-2",
        3: "w-3 h-3",
        4: "w-4 h-4",
        5: "w-5 h-5",
        6: "w-6 h-6",
        8: "w-8 h-8",
        10: "w-10 h-10",
        12: "w-12 h-12",
        16: "w-16 h-16",
        20: "w-20 h-20",
        24: "w-24 h-24",
        32: "w-32 h-32",
        40: "w-40 h-40",
        48: "w-48 h-48",
      },
      direction: {
        both: "",
        horizontal: "h-0",
        vertical: "w-0",
      },
      // Responsive variants
      sizeSm: {
        0: "sm:w-0 sm:h-0",
        1: "sm:w-1 sm:h-1",
        2: "sm:w-2 sm:h-2",
        3: "sm:w-3 sm:h-3",
        4: "sm:w-4 sm:h-4",
        5: "sm:w-5 sm:h-5",
        6: "sm:w-6 sm:h-6",
        8: "sm:w-8 sm:h-8",
        10: "sm:w-10 sm:h-10",
        12: "sm:w-12 sm:h-12",
        16: "sm:w-16 sm:h-16",
        20: "sm:w-20 sm:h-20",
        24: "sm:w-24 sm:h-24",
        32: "sm:w-32 sm:h-32",
        40: "sm:w-40 sm:h-40",
        48: "sm:w-48 sm:h-48",
      },
      sizeMd: {
        0: "md:w-0 md:h-0",
        1: "md:w-1 md:h-1",
        2: "md:w-2 md:h-2",
        3: "md:w-3 md:h-3",
        4: "md:w-4 md:h-4",
        5: "md:w-5 md:h-5",
        6: "md:w-6 md:h-6",
        8: "md:w-8 md:h-8",
        10: "md:w-10 md:h-10",
        12: "md:w-12 md:h-12",
        16: "md:w-16 md:h-16",
        20: "md:w-20 md:h-20",
        24: "md:w-24 md:h-24",
        32: "md:w-32 md:h-32",
        40: "md:w-40 md:h-40",
        48: "md:w-48 md:h-48",
      },
      sizeLg: {
        0: "lg:w-0 lg:h-0",
        1: "lg:w-1 lg:h-1",
        2: "lg:w-2 lg:h-2",
        3: "lg:w-3 lg:h-3",
        4: "lg:w-4 lg:h-4",
        5: "lg:w-5 lg:h-5",
        6: "lg:w-6 lg:h-6",
        8: "lg:w-8 lg:h-8",
        10: "lg:w-10 lg:h-10",
        12: "lg:w-12 lg:h-12",
        16: "lg:w-16 lg:h-16",
        20: "lg:w-20 lg:h-20",
        24: "lg:w-24 lg:h-24",
        32: "lg:w-32 lg:h-32",
        40: "lg:w-40 lg:h-40",
        48: "lg:w-48 lg:h-48",
      },
      directionSm: {
        both: "",
        horizontal: "sm:h-0",
        vertical: "sm:w-0",
      },
      directionMd: {
        both: "",
        horizontal: "md:h-0",
        vertical: "md:w-0",
      },
      directionLg: {
        both: "",
        horizontal: "lg:h-0",
        vertical: "lg:w-0",
      },
    },
    defaultVariants: {
      size: 4,
      direction: "both",
    },
  }
);

export interface SpacerProps 
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof spacerVariants> {
  /**
   * Optional testid for testing
   */
  'data-testid'?: string;

  /**
   * Optional data-cy attribute for Cypress testing
   */
  'data-cy'?: string;
}

/**
 * Spacer component for creating space between elements
 * Enhanced with responsive options
 */
export const Spacer = React.forwardRef<HTMLDivElement, SpacerProps>(
  ({ 
    className, 
    size, 
    sizeSm,
    sizeMd,
    sizeLg,
    direction,
    directionSm,
    directionMd,
    directionLg,
    'data-testid': dataTestId,
    'data-cy': dataCy,
    ...props 
  }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          spacerVariants({ 
            size, 
            sizeSm,
            sizeMd,
            sizeLg,
            direction,
            directionSm,
            directionMd,
            directionLg
          }), 
          className
        )}
        data-testid={dataTestId}
        data-cy={dataCy}
        aria-hidden="true"
        {...props}
      />
    );
  }
);

Spacer.displayName = "Spacer";

// Export layout elements as standalone and as a namespace
export const Layout = {
  Flex,
  Row,
  Column,
  Spacer
};

export { flexVariants, spacerVariants };
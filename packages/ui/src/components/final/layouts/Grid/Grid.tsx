'use client';

import * as React from 'react';
import { cn } from '../../../../utils';

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: number;
  gap?: number;
  rowGap?: number;
  columnGap?: number;
}

const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({ className, columns = 1, gap = 4, rowGap, columnGap, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'grid',
          columns === 2 && 'sm:grid-cols-2',
          columns === 3 && 'sm:grid-cols-3',
          columns === 4 && 'sm:grid-cols-4',
          columns === 6 && 'sm:grid-cols-6',
          columns === 12 && 'sm:grid-cols-12',
          gap && `gap-${gap}`,
          rowGap && `row-gap-${rowGap}`,
          columnGap && `col-gap-${columnGap}`,
          className
        )}
        {...props}
      />
    );
  }
);

Grid.displayName = 'Grid';

interface RowProps extends React.HTMLAttributes<HTMLDivElement> {
  wrap?: boolean;
  reverse?: boolean;
  justify?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';
  align?: 'start' | 'end' | 'center' | 'baseline' | 'stretch';
  gap?: number;
}

const Row = React.forwardRef<HTMLDivElement, RowProps>(
  ({ className, wrap = false, reverse = false, justify = 'start', align = 'stretch', gap = 4, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex',
          wrap && 'flex-wrap',
          reverse && 'flex-row-reverse',
          {
            'justify-start': justify === 'start',
            'justify-end': justify === 'end',
            'justify-center': justify === 'center',
            'justify-between': justify === 'between',
            'justify-around': justify === 'around',
            'justify-evenly': justify === 'evenly',
          },
          {
            'items-start': align === 'start',
            'items-end': align === 'end',
            'items-center': align === 'center',
            'items-baseline': align === 'baseline',
            'items-stretch': align === 'stretch',
          },
          gap && `gap-${gap}`,
          className
        )}
        {...props}
      />
    );
  }
);

Row.displayName = 'Row';

interface ColumnProps extends React.HTMLAttributes<HTMLDivElement> {
  span?: number;
  offset?: number;
  align?: 'start' | 'end' | 'center' | 'baseline' | 'stretch';
}

const Column = React.forwardRef<HTMLDivElement, ColumnProps>(
  ({ className, span = 1, offset, align = 'stretch', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col',
          span === 1 && 'col-span-1',
          span === 2 && 'col-span-2',
          span === 3 && 'col-span-3',
          span === 4 && 'col-span-4',
          span === 6 && 'col-span-6',
          span === 12 && 'col-span-12',
          offset === 1 && 'col-start-2',
          offset === 2 && 'col-start-3',
          offset === 3 && 'col-start-4',
          offset === 4 && 'col-start-5',
          offset === 6 && 'col-start-7',
          offset === 12 && 'col-start-13',
          {
            'items-start': align === 'start',
            'items-end': align === 'end',
            'items-center': align === 'center',
            'items-baseline': align === 'baseline',
            'items-stretch': align === 'stretch',
          },
          className
        )}
        {...props}
      />
    );
  }
);

Column.displayName = 'Column';

interface SpacerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: number;
  axis?: 'horizontal' | 'vertical';
}

const Spacer = React.forwardRef<HTMLDivElement, SpacerProps>(
  ({ className, size = 4, axis = 'vertical', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          axis === 'vertical' ? `h-${size}` : `w-${size}`,
          axis === 'horizontal' && 'inline-block',
          className
        )}
        {...props}
      />
    );
  }
);

Spacer.displayName = 'Spacer';

export type { GridProps, RowProps, ColumnProps, SpacerProps };
export { Grid, Row, Column, Spacer }; 
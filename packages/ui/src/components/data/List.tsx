'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils';

const listVariants = cva(
  'space-y-1',
  {
    variants: {
      variant: {
        default: '',
        separator: '[&>li]:border-b [&>li]:border-border last:[&>li]:border-0',
        card: '[&>li]:rounded-lg [&>li]:border [&>li]:p-4 [&>li]:shadow-sm',
      },
      size: {
        sm: '[&>li]:py-2',
        md: '[&>li]:py-3',
        lg: '[&>li]:py-4',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface ListProps
  extends React.OlHTMLAttributes<HTMLOListElement>,
    VariantProps<typeof listVariants> {
  ordered?: boolean;
}

const List = React.forwardRef<HTMLOListElement, ListProps>(
  ({
    className,
    variant,
    size,
    ordered = false,
    children,
    ...props
  }, ref) => {
    const Component = ordered ? 'ol' : 'ul';

    return (
      <Component
        ref={ref}
        className={cn(listVariants({ variant, size }), className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

List.displayName = 'List';

const ListItem = React.forwardRef<
  HTMLLIElement,
  React.LiHTMLAttributes<HTMLLIElement>
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    className={cn('flex items-center justify-between', className)}
    {...props}
  />
));

ListItem.displayName = 'ListItem';

export { List, ListItem }; 
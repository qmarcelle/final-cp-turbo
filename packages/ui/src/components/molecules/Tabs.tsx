'use client';

import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils';

const tabsListVariants = cva(
  'inline-flex items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground',
  {
    variants: {
      variant: {
        default: '',
        pills: 'bg-transparent p-0 gap-2',
        underline: 'bg-transparent p-0 border-b border-border',
      },
      fullWidth: {
        true: 'w-full',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      fullWidth: false,
    },
  }
);

const tabsTriggerVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'data-[state=active]:bg-background data-[state=active]:text-foreground',
        pills: 'rounded-full border border-transparent hover:bg-muted/50 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground',
        underline: 'rounded-none border-b-2 border-transparent px-4 pb-3 pt-2 hover:text-foreground data-[state=active]:border-primary data-[state=active]:text-foreground',
      },
      fullWidth: {
        true: 'flex-1',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      fullWidth: false,
    },
  }
);

const tabsContentVariants = cva(
  'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        default: '',
        pills: 'mt-4',
        underline: 'mt-4',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface TabsProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root>,
    VariantProps<typeof tabsListVariants> {
  items: {
    value: string;
    label: string;
    content: React.ReactNode;
    disabled?: boolean;
  }[];
}

const Tabs = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Root>,
  TabsProps
>(({
  className,
  variant,
  fullWidth,
  items,
  defaultValue = items[0]?.value,
  ...props
}, ref) => (
  <TabsPrimitive.Root
    ref={ref}
    defaultValue={defaultValue}
    className={cn('w-full', className)}
    {...props}
  >
    <TabsPrimitive.List
      className={cn(tabsListVariants({ variant, fullWidth }))}
    >
      {items.map((item) => (
        <TabsPrimitive.Trigger
          key={item.value}
          value={item.value}
          disabled={item.disabled}
          className={cn(tabsTriggerVariants({ variant, fullWidth }))}
        >
          {item.label}
        </TabsPrimitive.Trigger>
      ))}
    </TabsPrimitive.List>
    {items.map((item) => (
      <TabsPrimitive.Content
        key={item.value}
        value={item.value}
        className={cn(tabsContentVariants({ variant }))}
      >
        {item.content}
      </TabsPrimitive.Content>
    ))}
  </TabsPrimitive.Root>
));

Tabs.displayName = 'Tabs';

export { Tabs }; 
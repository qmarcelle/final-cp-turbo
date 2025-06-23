'use client';

import * as React from 'react';
import { Command as CommandPrimitive } from 'cmdk';
import { Search as SearchIcon, X as XIcon } from 'lucide-react';
import { cn } from '../../../utils';

export interface CommandProps extends React.ComponentPropsWithoutRef<typeof CommandPrimitive> {}

const Command = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  CommandProps
>(({ className, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    className={cn(
      'flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground',
      className
    )}
    {...props}
  />
));

Command.displayName = CommandPrimitive.displayName;

export interface CommandInputProps extends React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  showClearButton?: boolean;
  onClear?: () => void;
}

const CommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  CommandInputProps
>(({ 
  className, 
  leftIcon = <SearchIcon className="h-4 w-4" />,
  rightIcon,
  showClearButton,
  onClear,
  ...props 
}, ref) => (
  <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
    {leftIcon && (
      <div className="mr-2 flex items-center text-muted-foreground">
        {leftIcon}
      </div>
    )}
    <CommandPrimitive.Input
      ref={ref}
      className={cn(
        'flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none',
        'placeholder:text-muted-foreground',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'focus:outline-none focus:ring-0',
        className
      )}
      {...props}
    />
    {(showClearButton || rightIcon) && (
      <div className="ml-2 flex items-center gap-2">
        {showClearButton && props.value && (
          <button
            type="button"
            className={cn(
              'rounded-sm opacity-70 ring-offset-background transition-opacity',
              'hover:opacity-100',
              'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'
            )}
            onClick={onClear}
          >
            <XIcon className="h-4 w-4" />
            <span className="sr-only">Clear search</span>
          </button>
        )}
        {rightIcon && (
          <div className="flex items-center text-muted-foreground">
            {rightIcon}
          </div>
        )}
      </div>
    )}
  </div>
));

CommandInput.displayName = CommandPrimitive.Input.displayName;

export interface CommandListProps extends React.ComponentPropsWithoutRef<typeof CommandPrimitive.List> {}

const CommandList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  CommandListProps
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={cn('max-h-[300px] overflow-y-auto overflow-x-hidden', className)}
    {...props}
  />
));

CommandList.displayName = CommandPrimitive.List.displayName;

export interface CommandEmptyProps extends React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty> {}

const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  CommandEmptyProps
>((props, ref) => (
  <CommandPrimitive.Empty
    ref={ref}
    className="py-6 text-center text-sm text-muted-foreground"
    {...props}
  />
));

CommandEmpty.displayName = CommandPrimitive.Empty.displayName;

export interface CommandGroupProps extends React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group> {
  heading?: string;
}

const CommandGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  CommandGroupProps
>(({ className, heading, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    heading={heading}
    className={cn(
      'overflow-hidden p-1',
      '[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5',
      '[&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium',
      '[&_[cmdk-group-heading]]:text-muted-foreground',
      className
    )}
    {...props}
  />
));

CommandGroup.displayName = CommandPrimitive.Group.displayName;

export interface CommandSeparatorProps extends React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator> {}

const CommandSeparator = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  CommandSeparatorProps
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator
    ref={ref}
    className={cn('-mx-1 h-px bg-border', className)}
    {...props}
  />
));

CommandSeparator.displayName = CommandPrimitive.Separator.displayName;

export interface CommandItemProps extends React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item> {
  icon?: React.ReactNode;
  shortcut?: string;
  selected?: boolean;
}

const CommandItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  CommandItemProps
>(({ className, children, icon, shortcut, selected, disabled, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    disabled={disabled}
    className={cn(
      'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none',
      'aria-selected:bg-accent aria-selected:text-accent-foreground',
      'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      'transition-colors',
      'focus:bg-accent focus:text-accent-foreground',
      className
    )}
    {...props}
  >
    {icon && (
      <span className="mr-2 flex h-4 w-4 items-center justify-center">
        {icon}
      </span>
    )}
    <span className="flex-1">{children}</span>
    {shortcut && (
      <span className="ml-auto text-xs tracking-widest text-muted-foreground">
        {shortcut}
      </span>
    )}
    {selected && (
      <span className="absolute right-2 flex h-4 w-4 items-center justify-center">
        <span className="h-1.5 w-1.5 rounded-full bg-current" />
      </span>
    )}
  </CommandPrimitive.Item>
));

CommandItem.displayName = CommandPrimitive.Item.displayName;

export {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
}; 
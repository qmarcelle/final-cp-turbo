"use client";

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../utils';
import { Slot } from '@radix-ui/react-slot';

const typographyVariants = cva(
  "text-foreground",
  {
    variants: {
      variant: {
        // Headings
        h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
        h2: "scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0",
        h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
        h4: "scroll-m-20 text-xl font-semibold tracking-tight",
        h5: "scroll-m-20 text-lg font-semibold tracking-tight",
        h6: "scroll-m-20 text-base font-semibold tracking-tight",
        // Body text
        p: "leading-7 [&:not(:first-child)]:mt-6",
        lead: "text-xl text-muted-foreground",
        large: "text-lg font-semibold",
        small: "text-sm font-medium leading-none",
        // Special variants
        blockquote: "mt-6 border-l-2 pl-6 italic",
        code: "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
        label: "text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        subtle: "text-sm text-muted-foreground",
        muted: "text-sm text-muted-foreground",
      },
      weight: {
        light: "font-light",
        normal: "font-normal",
        medium: "font-medium",
        semibold: "font-semibold",
        bold: "font-bold",
        extrabold: "font-extrabold",
      },
      align: {
        left: "text-left",
        center: "text-center",
        right: "text-right",
        justify: "text-justify",
      },
      decoration: {
        none: "no-underline",
        underline: "underline",
        lineThrough: "line-through",
      },
      transform: {
        normal: "normal-case",
        uppercase: "uppercase",
        lowercase: "lowercase",
        capitalize: "capitalize",
      },
      truncate: {
        true: "truncate",
        false: "",
      },
      display: {
        block: "block",
        inline: "inline",
        inlineBlock: "inline-block",
      },
    },
    defaultVariants: {
      variant: "p",
      weight: "normal",
      align: "left",
      decoration: "none",
      transform: "normal",
      truncate: false,
      display: "block",
    },
  }
);

type ElementType = 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'div' | 'blockquote' | 'code' | 'label' | React.ComponentType<any>;

export interface TypographyProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'prefix'>,
    VariantProps<typeof typographyVariants> {
  /** The HTML element to render as */
  as?: ElementType;
  /** Whether to render children as a slot */
  asChild?: boolean;
  /** Maximum width of the text */
  maxWidth?: string | number;
  /** Text color */
  color?: string;
  /** Prefix element */
  prefix?: React.ReactNode;
  /** Suffix element */
  suffix?: React.ReactNode;
  /** Click handler */
  onClick?: () => void;

  // Deprecated props
  /** @deprecated Use `children` instead */
  text?: string;
  /** @deprecated Use `variant` instead */
  type?: 'title-1' | 'title-2' | 'title-3' | 'body-1' | 'body-2';
  /** @deprecated Use `tabIndex` instead */
  tabFocus?: number;
  /** @deprecated Use `display` instead */
  displayStyle?: 'block' | 'inline';
  /** @deprecated Use `children` instead */
  spans?: React.ReactNode[];
}

// Map deprecated type values to new variant values
const typeToVariantMap: Record<NonNullable<TypographyProps['type']>, NonNullable<TypographyProps['variant']>> = {
  'title-1': 'h1',
  'title-2': 'h2',
  'title-3': 'h3',
  'body-1': 'p',
  'body-2': 'small',
};

/**
 * Unified Typography component for consistent text styling across the application.
 * Replaces Header, TextBox, RichText, and other text display components.
 */
export const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({
    className,
    variant,
    weight,
    align,
    decoration,
    transform,
    truncate,
    display,
    as,
    asChild = false,
    maxWidth,
    color,
    prefix,
    suffix,
    onClick,
    children,
    // Handle deprecated props
    text,
    type,
    tabFocus,
    displayStyle,
    spans,
    ...props
  }, ref) => {
    // Handle deprecated props
    const finalVariant = type ? typeToVariantMap[type] : variant;
    const finalChildren = children || text || (spans && spans.map((span, i) => <React.Fragment key={i}>{span}</React.Fragment>));
    const finalDisplay = displayStyle ? (displayStyle === 'inline' ? 'inline' : 'block') : display;
    const finalTabIndex = props.tabIndex ?? tabFocus;

    // Determine the component to render
    const Component = asChild ? Slot : (as || (finalVariant?.startsWith('h') ? finalVariant : 'p'));

    // Create the common props
    const commonProps = {
      ref,
      className: cn(
        typographyVariants({
          variant: finalVariant,
          weight,
          align,
          decoration,
          transform,
          truncate,
          display: finalDisplay,
        }),
        className
      ),
      style: {
        ...(maxWidth ? { maxWidth: typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth } : {}),
        ...(color ? { color } : {}),
        ...props.style,
      },
      tabIndex: finalTabIndex,
      onClick,
      ...props,
    };

    return React.createElement(
      Component,
      commonProps,
      <>
        {prefix}
        {finalChildren}
        {suffix}
      </>
    );
  }
);

Typography.displayName = 'Typography'; 
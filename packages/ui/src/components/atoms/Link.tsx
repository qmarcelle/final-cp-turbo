'use client';

import * as React from 'react';
import NextLink from 'next/link';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils';
import { ExternalLink } from 'lucide-react';

const linkVariants = cva(
  'inline-flex items-center gap-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'text-primary hover:text-primary/80',
        muted: 'text-muted-foreground hover:text-foreground',
        destructive: 'text-destructive hover:text-destructive/80',
        header: 'text-foreground hover:text-foreground/80 font-medium',
        nav: 'text-muted-foreground hover:text-foreground font-medium',
      },
      underline: {
        none: 'no-underline',
        hover: 'no-underline hover:underline',
        always: 'underline',
      },
    },
    defaultVariants: {
      variant: 'default',
      underline: 'hover',
    },
  }
);

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof linkVariants> {
  href: string;
  external?: boolean;
  showExternalIcon?: boolean;
  prefetch?: boolean;
  scroll?: boolean;
  replace?: boolean;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({
    className,
    variant,
    underline,
    href,
    external = false,
    showExternalIcon = true,
    prefetch,
    scroll,
    replace,
    onClick,
    children,
    ...props
  }, ref) => {
    const isExternal = external || href.startsWith('http');
    const LinkComponent = isExternal ? 'a' : NextLink;
    const externalProps = isExternal ? {
      rel: 'noopener noreferrer',
      target: '_blank',
    } : {};
    const nextProps = !isExternal ? {
      prefetch,
      scroll,
      replace,
    } : {};

    return (
      <LinkComponent
        ref={ref}
        href={href}
        className={cn(linkVariants({ variant, underline }), className)}
        onClick={onClick}
        {...externalProps}
        {...nextProps}
        {...props}
      >
        {children}
        {isExternal && showExternalIcon && (
          <ExternalLink className="h-4 w-4" />
        )}
      </LinkComponent>
    );
  }
);

Link.displayName = 'Link';

export { Link, linkVariants }; 
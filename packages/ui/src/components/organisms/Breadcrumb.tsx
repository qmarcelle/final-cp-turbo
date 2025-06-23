'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils';
import { ChevronRight, Home } from 'lucide-react';
import { Link } from '../atoms/Link';

const breadcrumbVariants = cva(
  'flex items-center space-x-1 text-sm text-muted-foreground',
  {
    variants: {
      variant: {
        default: '',
        ghost: 'hover:text-foreground/80',
        inverted: 'text-white/60 hover:text-white',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const breadcrumbItemVariants = cva(
  'inline-flex items-center space-x-2',
  {
    variants: {
      variant: {
        default: 'text-muted-foreground hover:text-foreground',
        ghost: 'text-foreground/60 hover:text-foreground',
        inverted: 'text-white/60 hover:text-white',
      },
      current: {
        true: 'text-foreground font-medium pointer-events-none',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      current: false,
    },
  }
);

export interface BreadcrumbProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof breadcrumbVariants> {
  separator?: React.ReactNode;
  showHome?: boolean;
  homeHref?: string;
  items: {
    label: string;
    href?: string;
  }[];
}

const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  ({
    className,
    variant,
    separator = <ChevronRight className="h-4 w-4" />,
    showHome = true,
    homeHref = '/',
    items,
    ...props
  }, ref) => {
    return (
      <nav
        ref={ref}
        className={cn(breadcrumbVariants({ variant }), className)}
        aria-label="Breadcrumb"
        {...props}
      >
        <ol className="flex items-center space-x-1">
          {showHome && (
            <li>
              <Link
                href={homeHref}
                className={cn(
                  breadcrumbItemVariants({ variant }),
                  'hover:text-foreground'
                )}
              >
                <Home className="h-4 w-4" />
                <span className="sr-only">Home</span>
              </Link>
            </li>
          )}
          {items.map((item, index) => {
            const isLast = index === items.length - 1;

            return (
              <React.Fragment key={index}>
                {(showHome || index > 0) && (
                  <li className="text-muted-foreground" aria-hidden="true">
                    {separator}
                  </li>
                )}
                <li>
                  {item.href && !isLast ? (
                    <Link
                      href={item.href}
                      className={cn(breadcrumbItemVariants({ variant }))}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span
                      className={cn(
                        breadcrumbItemVariants({ variant, current: isLast })
                      )}
                      aria-current={isLast ? 'page' : undefined}
                    >
                      {item.label}
                    </span>
                  )}
                </li>
              </React.Fragment>
            );
          })}
        </ol>
      </nav>
    );
  }
);

Breadcrumb.displayName = 'Breadcrumb';

export { Breadcrumb }; 
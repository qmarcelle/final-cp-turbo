'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils';
import { ChevronDown, Menu, X } from 'lucide-react';
import { Button } from '../atoms/Button/Button';
import { Link } from '../atoms/Link';

const navigationVariants = cva(
  'relative bg-background border-b',
  {
    variants: {
      variant: {
        default: 'border-border/40 shadow-sm',
        transparent: 'bg-transparent border-transparent',
        filled: 'bg-primary border-transparent',
      },
      position: {
        static: 'relative',
        sticky: 'sticky top-0 z-40',
        fixed: 'fixed top-0 left-0 right-0 z-40',
      },
    },
    defaultVariants: {
      variant: 'default',
      position: 'static',
    },
  }
);

export interface NavigationProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof navigationVariants> {
  brand?: React.ReactNode;
  items?: {
    label: string;
    href?: string;
    items?: {
      label: string;
      href: string;
      description?: string;
      icon?: React.ReactNode;
    }[];
    onClick?: () => void;
  }[];
  actions?: React.ReactNode;
  collapsible?: boolean;
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  profileMenu?: React.ReactNode;
  breadcrumbs?: React.ReactNode;
  search?: React.ReactNode;
  supportActions?: React.ReactNode;
}

const Navigation = React.forwardRef<HTMLElement, NavigationProps>(
  ({
    className,
    variant,
    position,
    brand,
    items,
    actions,
    collapsible = true,
    collapsed: controlledCollapsed,
    onCollapsedChange,
    profileMenu,
    breadcrumbs,
    search,
    supportActions,
    ...props
  }, ref) => {
    const [uncontrolledCollapsed, setUncontrolledCollapsed] = React.useState(true);
    const collapsed = controlledCollapsed ?? uncontrolledCollapsed;
    const setCollapsed = React.useCallback((value: boolean) => {
      setUncontrolledCollapsed(value);
      onCollapsedChange?.(value);
    }, [onCollapsedChange]);

    return (
      <nav
        ref={ref}
        className={cn(navigationVariants({ variant, position }), className)}
        {...props}
      >
        {breadcrumbs && (
          <div className="bg-background border-b border-border/40 px-4 py-2">
            {breadcrumbs}
          </div>
        )}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              {brand}
            </div>
            {search && (
              <div className="hidden md:flex md:items-center md:mx-6">
                {search}
              </div>
            )}
            <div className="hidden md:flex md:items-center md:space-x-6">
              {items?.map((item, index) => (
                item.items ? (
                  <div key={index} className="relative group">
                    <button
                      className="flex items-center space-x-1 text-sm font-medium text-foreground/80 hover:text-foreground"
                      onClick={item.onClick}
                    >
                      <span>{item.label}</span>
                      <ChevronDown className="h-4 w-4" />
                    </button>
                    <div className="absolute left-0 top-full hidden pt-2 group-hover:block">
                      <div className="w-64 rounded-md bg-popover p-4 shadow-md ring-1 ring-black/5">
                        <div className="grid gap-4">
                          {item.items.map((subItem, subIndex) => (
                            <Link
                              key={subIndex}
                              href={subItem.href ?? ''}
                              variant="nav"
                              className="block"
                            >
                              <div className="flex items-center gap-3">
                                {subItem.icon}
                                <div>
                                  <div className="font-medium">{subItem.label}</div>
                                  {subItem.description && (
                                    <div className="text-sm text-muted-foreground">
                                      {subItem.description}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    key={index}
                    href={item.href ?? ''}
                    variant="nav"
                    onClick={item.onClick}
                  >
                    {item.label}
                  </Link>
                )
              ))}
              {actions && (
                <div className="flex items-center space-x-4">
                  {actions}
                </div>
              )}
              {supportActions && (
                <div className="flex items-center space-x-4">
                  {supportActions}
                </div>
              )}
              {profileMenu && (
                <div className="flex items-center ml-4">
                  {profileMenu}
                </div>
              )}
            </div>
            {collapsible && (
              <div className="flex md:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setCollapsed(!collapsed)}
                >
                  {collapsed ? (
                    <Menu className="h-6 w-6" />
                  ) : (
                    <X className="h-6 w-6" />
                  )}
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </div>
            )}
          </div>
        </div>
        {collapsible && !collapsed && (
          <div className="md:hidden">
            <div className="space-y-1 px-4 pb-3 pt-2">
              {search && (
                <div className="mb-2">
                  {search}
                </div>
              )}
              {items?.map((item, index) => (
                <React.Fragment key={index}>
                  {item.items ? (
                    <>
                      <div className="py-2">
                        <span className="text-sm font-medium text-foreground/80">
                          {item.label}
                        </span>
                      </div>
                      {item.items.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          href={subItem.href ?? ''}
                          variant="nav"
                          className="block py-2"
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </>
                  ) : (
                    <Link
                      href={item.href ?? ''}
                      variant="nav"
                      className="block py-2"
                      onClick={item.onClick}
                    >
                      {item.label}
                    </Link>
                  )}
                </React.Fragment>
              ))}
              {actions && (
                <div className="border-t border-border/40 pt-4">
                  {actions}
                </div>
              )}
              {supportActions && (
                <div className="border-t border-border/40 pt-4">
                  {supportActions}
                </div>
              )}
              {profileMenu && (
                <div className="border-t border-border/40 pt-4">
                  {profileMenu}
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    );
  }
);

Navigation.displayName = 'Navigation';

export { Navigation }; 
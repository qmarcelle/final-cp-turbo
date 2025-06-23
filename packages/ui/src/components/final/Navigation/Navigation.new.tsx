'use client';

import * as React from 'react';
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import * as Collapsible from '@radix-ui/react-collapsible';
import { cva } from 'class-variance-authority';
import { cn } from '../../../utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ChevronDownIcon,
  ChevronRightIcon,
  Bars3Icon,
  XMarkIcon,
} from '../../../lib/icons';
import { motion, AnimatePresence, HTMLMotionProps } from 'framer-motion';
import { Popover } from '../../atoms/Popover/Popover';
import type {
  NavigationProps,
  NavigationContextType,
  NavigationContentProps,
  NavigationBrandProps,
  NavigationToggleProps,
  NavigationMenuProps,
  NavigationItemProps,
  NavigationDropdownProps,
  NavigationDropdownItemProps,
} from '../../../../../types/src/components';

// Navigation container variants
export const navigationVariants = cva(
  "nav-container",
  {
    variants: {
      variant: {
        default: "bg-background border-b border-border shadow-sm",
        transparent: "bg-transparent",
        colored: "bg-primary text-primary-foreground",
      },
      position: {
        fixed: "fixed top-0 left-0 right-0 z-navigation",
        static: "relative",
      },
    },
    defaultVariants: {
      variant: "default",
      position: "static",
    },
  }
);

// Navigation item variants
export const navigationItemVariants = cva(
  "nav-item",
  {
    variants: {
      variant: {
        default: "text-foreground hover:text-primary",
        active: "text-primary font-medium",
        button: "bg-primary text-primary-foreground hover:bg-primary/90",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const NavigationContext = React.createContext<NavigationContextType | undefined>(undefined);

const useNavigationContext = () => {
  const context = React.useContext(NavigationContext);
  if (!context) {
    throw new Error('Navigation compound components must be used within Navigation');
  }
  return context;
};

const NavigationRoot = React.forwardRef<HTMLElement, NavigationProps>(
  ({ className, variant, position, ...props }, ref) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [activeItem, setActiveItem] = React.useState<string | null>(null);
    const [isMobile, setIsMobile] = React.useState(false);

    React.useEffect(() => {
      const checkMobile = () => {
        setIsMobile(window.innerWidth < 768);
      };
      
      checkMobile();
      window.addEventListener('resize', checkMobile);
      
      return () => {
        window.removeEventListener('resize', checkMobile);
      };
    }, []);

    const pathname = usePathname();
    React.useEffect(() => {
      setIsOpen(false);
    }, [pathname]);

    return (
      <NavigationContext.Provider value={{ isOpen, setIsOpen, activeItem, setActiveItem, isMobile }}>
        <nav
          ref={ref}
          role="navigation"
          aria-label="Main navigation"
          className={cn(navigationVariants({ variant, position }), className)}
          {...props}
        />
      </NavigationContext.Provider>
    );
  }
);

NavigationRoot.displayName = "Navigation";

const NavigationContent = React.forwardRef<HTMLDivElement, NavigationContentProps & HTMLMotionProps<"div">>(
  ({ className, ...props }, ref) => {
    const { isOpen, isMobile } = useNavigationContext();
    
    return (
      <AnimatePresence>
        {(isOpen || !isMobile) && (
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "nav-content",
              isMobile && "flex-col space-y-4",
              className
            )}
            {...props}
          />
        )}
      </AnimatePresence>
    );
  }
);

NavigationContent.displayName = "NavigationContent";

const NavigationBrand = React.forwardRef<HTMLDivElement, NavigationBrandProps>(
  ({ className, ...props }, ref) => {
    return (
      <div 
        ref={ref} 
        className={cn("flex items-center h-nav-item", className)}
        {...props}
      />
    );
  }
);

NavigationBrand.displayName = "NavigationBrand";

const NavigationToggle: React.FC<NavigationToggleProps> = ({ 
  className, 
  ...props 
}) => {
  const { isOpen, setIsOpen } = useNavigationContext();
  
  return (
    <Collapsible.Trigger
      asChild
      className={cn(
        "md:hidden fixed right-4 top-4 p-2 rounded-md",
        "hover:bg-muted/80 focus-ring",
        className
      )}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      {...props}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={isOpen ? 'close' : 'open'}
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 90 }}
            transition={{ duration: 0.2 }}
          >
            {isOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </motion.div>
        </AnimatePresence>
      </button>
    </Collapsible.Trigger>
  );
};

NavigationToggle.displayName = "NavigationToggle";

const NavigationMenu = React.forwardRef<HTMLDivElement, NavigationMenuProps>(
  ({ className, children, ...props }, ref) => {
    const { isMobile } = useNavigationContext();
    
    return (
      <NavigationMenuPrimitive.Root
        ref={ref}
        className={cn(
          "relative z-10",
          isMobile ? "w-full" : "flex",
          className
        )}
        {...props}
      >
        <NavigationMenuPrimitive.List
          className={cn(
            "flex gap-nav-gap",
            isMobile ? "flex-col w-full" : "items-center"
          )}
        >
          {children}
        </NavigationMenuPrimitive.List>
      </NavigationMenuPrimitive.Root>
    );
  }
);

NavigationMenu.displayName = "NavigationMenu";

const NavigationItem = React.forwardRef<HTMLLIElement, NavigationItemProps>(
  ({ className, variant, href, active, children, ...props }, ref) => {
    const { isMobile } = useNavigationContext();
    const pathname = usePathname();
    const isActive = active || pathname === href;
    
    return (
      <NavigationMenuPrimitive.Item
        ref={ref}
        className={cn(isMobile && "w-full")}
      >
        <Link 
          href={href}
          className={cn(
            navigationItemVariants({ 
              variant: isActive ? "active" : variant 
            }),
            isMobile && "w-full justify-between",
            className
          )}
          aria-current={isActive ? "page" : undefined}
          {...props}
        >
          {children}
          {isMobile && <ChevronRightIcon className="h-4 w-4" />}
        </Link>
      </NavigationMenuPrimitive.Item>
    );
  }
);

NavigationItem.displayName = "NavigationItem";

const NavigationDropdown = React.forwardRef<HTMLLIElement, NavigationDropdownProps>(
  ({ label, trigger, children, className, ...props }, ref) => {
    const { isMobile } = useNavigationContext();
    const [open, setOpen] = React.useState(false);
    
    return (
      <NavigationMenuPrimitive.Item ref={ref} className={className} {...props}>
        <Popover
          open={open}
          onOpenChange={setOpen}
          trigger={
            <button
              type="button"
              className={cn(
                navigationItemVariants({ variant: "default" }),
                "group flex items-center gap-1",
                isMobile && "w-full justify-between"
              )}
            >
              {label}
              {trigger || (
                <ChevronDownIcon 
                  className={cn(
                    "h-4 w-4 transition-transform duration-normal",
                    "group-data-[state=open]:rotate-180"
                  )} 
                />
              )}
            </button>
          }
          contentProps={{
            align: isMobile ? 'start' : 'center',
            side: isMobile ? 'right' : 'bottom',
            className: cn(
              "w-full sm:w-auto",
              isMobile ? "relative border-t" : "bg-popover shadow-lg rounded-md p-2",
            )
          }}
        >
          {React.Children.map(children, (child) => {
            if (React.isValidElement<NavigationDropdownItemProps>(child) && child.type === NavigationDropdownItem) {
              return React.cloneElement(child, {
                ...child.props,
                onClick: (e: React.MouseEvent<HTMLAnchorElement>) => {
                  child.props.onClick?.(e);
                  setOpen(false);
                },
              });
            }
            return child;
          })}
        </Popover>
      </NavigationMenuPrimitive.Item>
    );
  }
);

NavigationDropdown.displayName = "NavigationDropdown";

const NavigationDropdownItem = React.forwardRef<HTMLAnchorElement, NavigationDropdownItemProps>(
  ({ className, children, href, onClick, onSelect: _, ...props }, ref) => {
    const { isMobile } = useNavigationContext();
    const linkProps = {
      ...props,
      onClick,
      className: cn(
        navigationItemVariants({ variant: "default" }),
        "block w-full no-underline",
        isMobile ? "px-4 py-2" : "px-2 py-1.5",
        "text-sm hover:bg-accent hover:text-accent-foreground",
        "focus:bg-accent focus:text-accent-foreground focus:outline-none",
        className
      )
    };
    
    return (
      <Link
        ref={ref}
        href={href}
        {...linkProps}
      >
        {children}
      </Link>
    );
  }
);

NavigationDropdownItem.displayName = "NavigationDropdownItem";

const NavigationComponent = Object.assign(NavigationRoot, {
  Content: NavigationContent,
  Brand: NavigationBrand,
  Toggle: NavigationToggle,
  Menu: NavigationMenu,
  Item: NavigationItem,
  Dropdown: NavigationDropdown,
  DropdownItem: NavigationDropdownItem,
});

export { NavigationComponent as Navigation }; 
/**
 * MERGED COMPONENT
 * Consolidates functionality from:
 * - SiteHeaderNavSection
 * - SiteHeaderSubNavSection
 * - SiteHeaderSubNavItemSection
 * - SiteHeaderMenuSection
 * - BreadCrumb
 */

'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDownIcon, ChevronRightIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

// Navigation container variants
const navContainerVariants = cva(
  "bg-white",
  {
    variants: {
      variant: {
        default: "border-b shadow-sm",
        transparent: "bg-transparent",
        colored: "bg-primary text-primary-foreground",
      },
      position: {
        fixed: "fixed top-0 left-0 right-0 z-40",
        static: "relative",
      },
    },
    defaultVariants: {
      variant: "default",
      position: "static",
    },
  }
);

export interface NavigationProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof navContainerVariants> {}

interface NavigationContextType {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  activeItem: string | null;
  setActiveItem: React.Dispatch<React.SetStateAction<string | null>>;
  isMobile: boolean;
}

const NavigationContext = React.createContext<NavigationContextType | undefined>(undefined);

/**
 * Navigation root component
 * Manages responsive behavior and mobile menu state
 */
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

    // Close mobile menu when route changes
    const pathname = usePathname();
    React.useEffect(() => {
      setIsOpen(false);
    }, [pathname]);

    return (
      <NavigationContext.Provider value={{ isOpen, setIsOpen, activeItem, setActiveItem, isMobile }}>
        <nav
          ref={ref}
          className={cn(navContainerVariants({ variant, position }), className)}
          {...props}
        />
      </NavigationContext.Provider>
    );
  }
);

NavigationRoot.displayName = "Navigation";

// Use navigation context hook
const useNavigationContext = () => {
  const context = React.useContext(NavigationContext);
  if (!context) {
    throw new Error('Navigation compound components must be used within Navigation');
  }
  return context;
};

/**
 * Container for navigation content
 */
export const NavigationContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { isOpen, isMobile } = useNavigationContext();
    
    return (
      <div 
        ref={ref} 
        className={cn(
          "container mx-auto px-4",
          isMobile && !isOpen && "hidden",
          isMobile && isOpen && "flex flex-col",
          !isMobile && "flex items-center justify-between",
          className
        )}
        {...props} 
      />
    );
  }
);

NavigationContent.displayName = "NavigationContent";

/**
 * Navigation logo/brand component
 */
export const NavigationBrand = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div 
        ref={ref} 
        className={cn("flex items-center h-16", className)}
        {...props}
      />
    );
  }
);

NavigationBrand.displayName = "NavigationBrand";

/**
 * Toggle button for mobile navigation
 */
export const NavigationToggle: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ 
  className, 
  ...props 
}) => {
  const { isOpen, setIsOpen } = useNavigationContext();
  
  return (
    <button
      type="button"
      onClick={() => setIsOpen(!isOpen)}
      className={cn(
        "md:hidden absolute right-4 top-4 p-2 rounded-md",
        "hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary",
        className
      )}
      aria-expanded={isOpen}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      {...props}
    >
      {isOpen ? (
        <XMarkIcon className="h-6 w-6" />
      ) : (
        <Bars3Icon className="h-6 w-6" />
      )}
    </button>
  );
};

NavigationToggle.displayName = "NavigationToggle";

/**
 * Container for navigation links/menu items
 */
export const NavigationMenu = React.forwardRef<HTMLUListElement, React.HTMLAttributes<HTMLUListElement>>(
  ({ className, ...props }, ref) => {
    const { isMobile } = useNavigationContext();
    
    return (
      <ul
        ref={ref}
        className={cn(
          "flex gap-2",
          isMobile ? "flex-col w-full" : "items-center",
          className
        )}
        {...props}
      />
    );
  }
);

NavigationMenu.displayName = "NavigationMenu";

// Item variants
const navItemVariants = cva(
  "transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary",
  {
    variants: {
      variant: {
        default: "text-foreground hover:text-primary",
        active: "text-primary font-medium",
        button: "px-3 py-2 rounded-md hover:bg-muted",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface NavigationItemProps 
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>,
    VariantProps<typeof navItemVariants> {
  href: string;
  active?: boolean;
}

/**
 * Individual navigation item/link
 */
export const NavigationItem = React.forwardRef<HTMLLIElement, NavigationItemProps>(
  ({ className, variant, href, active, children, ...props }, ref) => {
    const { isMobile } = useNavigationContext();
    const pathname = usePathname();
    const isActive = active || pathname === href;
    
    return (
      <li ref={ref} className={cn(isMobile && "w-full")}>
        <Link 
          href={href}
          className={cn(
            navItemVariants({ 
              variant: isActive ? "active" : variant 
            }),
            isMobile && "flex w-full p-3",
            className
          )}
          aria-current={isActive ? "page" : undefined}
          {...props}
        >
          {children}
        </Link>
      </li>
    );
  }
);

NavigationItem.displayName = "NavigationItem";

/**
 * Dropdown menu item
 */
export interface NavigationDropdownProps extends React.HTMLAttributes<HTMLLIElement> {
  label: React.ReactNode;
  id: string;
}

export const NavigationDropdown = React.forwardRef<HTMLLIElement, NavigationDropdownProps>(
  ({ className, children, label, id, ...props }, ref) => {
    const { activeItem, setActiveItem, isMobile } = useNavigationContext();
    const isActive = activeItem === id;
    const dropdownRef = React.useRef<HTMLLIElement>(null);
    
    // Handle click outside to close dropdown
    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setActiveItem(null);
        }
      };
      
      if (isActive) {
        document.addEventListener('mousedown', handleClickOutside);
      }
      
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [isActive, setActiveItem]);
    
    return (
      <li 
        ref={dropdownRef}
        className={cn(
          "relative",
          isMobile && "w-full",
          className
        )}
        {...props}
      >
        <button
          type="button"
          onClick={() => setActiveItem(isActive ? null : id)}
          className={cn(
            navItemVariants({ variant: isActive ? "active" : "default" }),
            "flex items-center gap-1",
            isMobile && "w-full p-3",
          )}
          aria-expanded={isActive}
          aria-controls={`${id}-dropdown`}
        >
          {label}
          {isMobile ? (
            <ChevronRightIcon className={cn(
              "ml-auto h-4 w-4 transition-transform",
              isActive && "transform rotate-90"
            )} />
          ) : (
            <ChevronDownIcon className={cn(
              "h-4 w-4 transition-transform",
              isActive && "transform rotate-180"
            )} />
          )}
        </button>
        
        <div
          id={`${id}-dropdown`}
          className={cn(
            "bg-white z-10 min-w-[12rem] overflow-hidden transition-all duration-200",
            isMobile ? [
              "max-h-0 opacity-0 border-l-2 ml-4",
              isActive && "max-h-96 opacity-100"
            ] : [
              "absolute top-full left-0 shadow-md rounded-md border mt-1 max-h-0 opacity-0",
              isActive && "max-h-96 opacity-100 py-1"
            ]
          )}
        >
          {children}
        </div>
      </li>
    );
  }
);

NavigationDropdown.displayName = "NavigationDropdown";

/**
 * Individual item in dropdown menu
 */
export const NavigationDropdownItem = React.forwardRef<HTMLAnchorElement, NavigationItemProps>(
  ({ className, href, children, ...props }, ref) => {
    const { isMobile } = useNavigationContext();
    const pathname = usePathname();
    const isActive = pathname === href;
    
    return (
      <Link 
        ref={ref}
        href={href}
        className={cn(
          "block px-4 py-2 text-sm hover:bg-muted",
          isActive && "bg-muted/50 font-medium",
          isMobile && "pl-6",
          className
        )}
        aria-current={isActive ? "page" : undefined}
        {...props}
      >
        {children}
      </Link>
    );
  }
);

NavigationDropdownItem.displayName = "NavigationDropdownItem";

/**
 * Breadcrumb container
 */
export const Breadcrumb = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => {
    return (
      <nav
        ref={ref}
        aria-label="Breadcrumb"
        className={cn("py-3 text-sm", className)}
        {...props}
      />
    );
  }
);

Breadcrumb.displayName = "Breadcrumb";

/**
 * Breadcrumb list
 */
export const BreadcrumbList = React.forwardRef<HTMLOListElement, React.OlHTMLAttributes<HTMLOListElement>>(
  ({ className, ...props }, ref) => {
    return (
      <ol
        ref={ref}
        className={cn(
          "flex flex-wrap items-center gap-1.5",
          className
        )}
        {...props}
      />
    );
  }
);

BreadcrumbList.displayName = "BreadcrumbList";

/**
 * Individual breadcrumb item
 */
export interface BreadcrumbItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  href?: string;
  isCurrent?: boolean;
}

export const BreadcrumbItem = React.forwardRef<HTMLLIElement, BreadcrumbItemProps>(
  ({ className, children, href, isCurrent, ...props }, ref) => {
    return (
      <li
        ref={ref}
        className={cn("flex items-center gap-1.5", className)}
        aria-current={isCurrent ? "page" : undefined}
        {...props}
      >
        {href && !isCurrent ? (
          <Link href={href} className="hover:text-primary">
            {children}
          </Link>
        ) : (
          <span className={cn(isCurrent && "font-medium text-foreground")}>
            {children}
          </span>
        )}
        
        {!isCurrent && (
          <ChevronRightIcon className="h-4 w-4 text-muted-foreground" />
        )}
      </li>
    );
  }
);

BreadcrumbItem.displayName = "BreadcrumbItem";

// Export with compound components
const NavigationComponent = NavigationRoot as typeof NavigationRoot & {
  Content: typeof NavigationContent;
  Brand: typeof NavigationBrand;
  Toggle: typeof NavigationToggle;
  Menu: typeof NavigationMenu;
  Item: typeof NavigationItem;
  Dropdown: typeof NavigationDropdown;
  DropdownItem: typeof NavigationDropdownItem;
};

NavigationComponent.Content = NavigationContent;
NavigationComponent.Brand = NavigationBrand;
NavigationComponent.Toggle = NavigationToggle;
NavigationComponent.Menu = NavigationMenu;
NavigationComponent.Item = NavigationItem;
NavigationComponent.Dropdown = NavigationDropdown;
NavigationComponent.DropdownItem = NavigationDropdownItem;

export { NavigationComponent as Navigation };
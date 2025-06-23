import { ReactNode } from 'react'
import { FieldValues, Path, Control, UseFormReturn, RegisterOptions } from 'react-hook-form'
import { z } from 'zod'
import { type VariantProps } from 'class-variance-authority'
import { badgeVariants } from '../components/foundation/Badge'
import * as AvatarPrimitive from '@radix-ui/react-avatar'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import type { DatePickerProps as ReactDatePickerProps } from 'react-datepicker'
import * as ProgressPrimitive from '@radix-ui/react-progress'
import { progressVariants } from '../components/foundation/Progress'
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu'

// ===================================================================
// NAVIGATION COMPONENT TYPES
// ===================================================================

export interface NavigationContextType {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  activeItem: string | null;
  setActiveItem: React.Dispatch<React.SetStateAction<string | null>>;
  isMobile: boolean;
}

export interface NavigationProps extends React.HTMLAttributes<HTMLElement> {
  variant?: 'default' | 'transparent' | 'colored';
  position?: 'fixed' | 'static';
}

export interface NavigationContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface NavigationBrandProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface NavigationToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export interface NavigationMenuProps extends NavigationMenuPrimitive.NavigationMenuProps {}

export interface NavigationItemProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  href: string;
  active?: boolean;
  variant?: 'default' | 'active' | 'button';
}

export interface NavigationDropdownProps extends React.HTMLAttributes<HTMLLIElement> {
  label: ReactNode;
  trigger?: ReactNode;
}

export interface NavigationDropdownItemProps extends Omit<NavigationMenuPrimitive.NavigationMenuLinkProps, 'href'> {
  href: string;
}

export interface BreadcrumbItemProps {
  href?: string;
  label: string;
  isActive?: boolean;
}

export interface BreadcrumbListProps {
  children: ReactNode;
}

export interface BreadcrumbProps {
  children: ReactNode;
} 
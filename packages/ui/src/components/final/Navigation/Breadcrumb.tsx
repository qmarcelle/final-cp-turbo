'use client';

import * as React from 'react';
import { cn } from '../../../utils';
import type { BreadcrumbProps, BreadcrumbItemProps, BreadcrumbListProps } from '../../../../../types/src/components';

export const BreadcrumbItem: React.FC<BreadcrumbItemProps> = ({
  href,
  label,
  isActive = false,
}) => {
  return (
    <li className={cn('inline-flex items-center', isActive ? 'text-primary' : 'text-muted-foreground')}>
      {href ? (
        <a href={href} className="hover:text-primary">{label}</a>
      ) : (
        <span>{label}</span>
      )}
    </li>
  );
};

export const BreadcrumbList: React.FC<BreadcrumbListProps> = ({ children }) => {
  return (
    <ol className="flex items-center space-x-2">
      {children}
    </ol>
  );
};

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ children }) => {
  return (
    <nav aria-label="Breadcrumb">
      {children}
    </nav>
  );
}; 
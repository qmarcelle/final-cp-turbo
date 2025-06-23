import React from 'react';
import { cn } from '../../../utils/cn';

export interface FormLayoutProps {
  children: React.ReactNode;
  variant?: 'grid' | 'column' | 'inline';
  columns?: 1 | 2 | 3 | 4 | 6 | 12;
  gap?: 2 | 4 | 6 | 8 | 12 | 16;
  className?: string;
  'data-cy'?: string;
}

export function FormLayout({
  children,
  variant = 'grid',
  columns = 1,
  gap = 6,
  className,
  'data-cy': dataCy,
}: FormLayoutProps) {
  let layoutClass = '';
  if (variant === 'grid') {
    layoutClass = cn(
      'grid',
      `grid-cols-1`,
      columns >= 2 && `sm:grid-cols-2`,
      columns >= 4 && `lg:grid-cols-4`,
      columns >= 6 && `xl:grid-cols-6`,
      columns >= 12 && `2xl:grid-cols-12`,
      `gap-${gap}`
    );
  } else if (variant === 'column') {
    layoutClass = cn('flex flex-col max-w-2xl gap-' + gap);
  } else if (variant === 'inline') {
    layoutClass = cn('flex flex-row w-full gap-' + gap);
  }
  return (
    <div className={cn(layoutClass, className)} data-cy={dataCy}>
      {children}
    </div>
  );
}

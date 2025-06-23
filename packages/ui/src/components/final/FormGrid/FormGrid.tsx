import React from 'react'
import { cn } from '../../../utils/cn'

export interface FormGridProps {
  children: React.ReactNode
  columns?: 1 | 2 | 3 | 4 | 6 | 12
  gap?: 2 | 4 | 6 | 8 | 12 | 16
  className?: string
  'data-cy'?: string
}

export function FormGrid({
  children,
  columns = 1,
  gap = 6,
  className,
  'data-cy': dataCy,
}: FormGridProps) {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
    6: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-6',
    12: 'grid-cols-1 sm:grid-cols-3 lg:grid-cols-12',
  }[columns]

  const gridGap = {
    2: 'gap-2',
    4: 'gap-4',
    6: 'gap-6',
    8: 'gap-8',
    12: 'gap-12',
    16: 'gap-16',
  }[gap]

  return (
    <div
      className={cn('grid', gridCols, gridGap, className)}
      data-cy={dataCy}
    >
      {children}
    </div>
  )
}
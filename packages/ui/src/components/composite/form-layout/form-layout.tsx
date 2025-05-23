import React from 'react'
import { cn } from '../../../utils/cn'

export type FormLayoutVariant = 'grid' | 'column' | 'inline'
export type FormLayoutColumns = 1 | 2 | 3 | 4 | 6 | 12
export type FormLayoutGap = 2 | 4 | 6 | 8 | 12 | 16

export interface FormLayoutProps {
  children: React.ReactNode
  variant?: FormLayoutVariant
  columns?: FormLayoutColumns
  gap?: FormLayoutGap
  className?: string
  'data-cy'?: string
}

const GRID_COLS = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  6: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-6',
  12: 'grid-cols-1 sm:grid-cols-3 lg:grid-cols-12',
} as const

const GRID_GAPS = {
  2: 'gap-2',
  4: 'gap-4',
  6: 'gap-6',
  8: 'gap-8',
  12: 'gap-12',
  16: 'gap-16',
} as const

const VARIANT_STYLES = {
  grid: '',
  column: 'max-w-2xl',
  inline: 'w-full',
} as const

export function FormLayout({
  children,
  variant = 'grid',
  columns = 1,
  gap = 6,
  className,
  'data-cy': dataCy,
}: FormLayoutProps) {
  const gridCols = GRID_COLS[columns]
  const gridGap = GRID_GAPS[gap]
  const variantStyle = VARIANT_STYLES[variant]

  return (
    <div
      className={cn(
        'grid',
        gridCols,
        gridGap,
        variantStyle,
        className
      )}
      data-cy={dataCy}
    >
      {children}
    </div>
  )
} 
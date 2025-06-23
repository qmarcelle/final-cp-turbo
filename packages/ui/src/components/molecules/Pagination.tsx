'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { Button } from '../ui/Button';

const paginationVariants = cva(
  'flex items-center justify-center space-x-2',
  {
    variants: {
      variant: {
        default: '',
        outline: '',
        ghost: '',
      },
      size: {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface PaginationProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof paginationVariants> {
  page: number;
  totalPages: number;
  siblingCount?: number;
  onPageChange: (page: number) => void;
  showFirstLast?: boolean;
  showPrevNext?: boolean;
  disabled?: boolean;
}

const Pagination = React.forwardRef<HTMLElement, PaginationProps>(
  ({
    className,
    variant,
    size,
    page,
    totalPages,
    siblingCount = 1,
    onPageChange,
    showFirstLast = true,
    showPrevNext = true,
    disabled = false,
    ...props
  }, ref) => {
    const getPageNumbers = () => {
      const totalNumbers = siblingCount * 2 + 3;
      const totalBlocks = totalNumbers + 2;

      if (totalPages <= totalBlocks) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
      }

      const leftSiblingIndex = Math.max(page - siblingCount, 1);
      const rightSiblingIndex = Math.min(page + siblingCount, totalPages);

      const shouldShowLeftDots = leftSiblingIndex > 2;
      const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

      if (!shouldShowLeftDots && shouldShowRightDots) {
        const leftItemCount = 3 + 2 * siblingCount;
        return [
          ...Array.from({ length: leftItemCount }, (_, i) => i + 1),
          'dots',
          totalPages,
        ];
      }

      if (shouldShowLeftDots && !shouldShowRightDots) {
        const rightItemCount = 3 + 2 * siblingCount;
        return [
          1,
          'dots',
          ...Array.from(
            { length: rightItemCount },
            (_, i) => totalPages - rightItemCount + i + 1
          ),
        ];
      }

      return [
        1,
        'dots',
        ...Array.from(
          { length: rightSiblingIndex - leftSiblingIndex + 1 },
          (_, i) => leftSiblingIndex + i
        ),
        'dots',
        totalPages,
      ];
    };

    return (
      <nav
        ref={ref}
        className={cn(paginationVariants({ variant, size }), className)}
        aria-label="Pagination"
        {...props}
      >
        {showFirstLast && (
          <Button
            variant={variant}
            size={size}
            onClick={() => onPageChange(1)}
            disabled={page === 1 || disabled}
            aria-label="Go to first page"
          >
            <ChevronLeft className="h-4 w-4" />
            <ChevronLeft className="h-4 w-4 -ml-2" />
          </Button>
        )}
        {showPrevNext && (
          <Button
            variant={variant}
            size={size}
            onClick={() => onPageChange(page - 1)}
            disabled={page === 1 || disabled}
            aria-label="Go to previous page"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        )}
        {getPageNumbers().map((pageNumber, i) => (
          <React.Fragment key={i}>
            {pageNumber === 'dots' ? (
              <span className="flex items-end h-9 w-9 justify-center">
                <MoreHorizontal className="h-4 w-4" />
              </span>
            ) : (
              <Button
                variant={page === pageNumber ? 'default' : variant}
                size={size}
                onClick={() => onPageChange(pageNumber as number)}
                disabled={disabled}
                aria-label={`Go to page ${pageNumber}`}
                aria-current={page === pageNumber ? 'page' : undefined}
              >
                {pageNumber}
              </Button>
            )}
          </React.Fragment>
        ))}
        {showPrevNext && (
          <Button
            variant={variant}
            size={size}
            onClick={() => onPageChange(page + 1)}
            disabled={page === totalPages || disabled}
            aria-label="Go to next page"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}
        {showFirstLast && (
          <Button
            variant={variant}
            size={size}
            onClick={() => onPageChange(totalPages)}
            disabled={page === totalPages || disabled}
            aria-label="Go to last page"
          >
            <ChevronRight className="h-4 w-4" />
            <ChevronRight className="h-4 w-4 -ml-2" />
          </Button>
        )}
      </nav>
    );
  }
);

Pagination.displayName = 'Pagination';

export { Pagination }; 
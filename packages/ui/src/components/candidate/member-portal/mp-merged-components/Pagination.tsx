/**
 * MERGED COMPONENT
 * Consolidates functionality from:
 * - Pagination
 * - InnerPagination
 * - DesktopPagination
 * - MobilePagination
 */

'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../utils';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { Button } from './Button';

// Pagination container variants
const paginationVariants = cva(
  "flex flex-wrap items-center justify-center gap-1",
  {
    variants: {
      variant: {
        default: "",
        compact: "gap-0",
        outline: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface PaginationProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof paginationVariants> {
  /** Total number of pages */
  pageCount: number;
  /** Current page (1-based) */
  currentPage: number;
  /** Callback when page changes */
  onPageChange: (page: number) => void;
  /** Maximum number of visible page buttons */
  maxVisiblePages?: number;
  /** Whether to show the first/last page buttons */
  showFirstLastButtons?: boolean;
  /** Whether to show previous/next buttons */
  showPrevNextButtons?: boolean;
}

/**
 * Unified Pagination component with responsive design
 */
export const Pagination = React.forwardRef<HTMLDivElement, PaginationProps>(
  ({ 
    className,
    variant,
    pageCount,
    currentPage,
    onPageChange,
    maxVisiblePages = 5,
    showFirstLastButtons = true,
    showPrevNextButtons = true,
    ...props
  }, ref) => {
    // Ensure currentPage is within bounds
    const normalizedCurrentPage = Math.max(1, Math.min(currentPage, pageCount));

    // Calculate visible page range
    const getVisiblePages = () => {
      if (pageCount <= maxVisiblePages) {
        return Array.from({ length: pageCount }, (_, i) => i + 1);
      }

      let startPage = Math.max(
        normalizedCurrentPage - Math.floor(maxVisiblePages / 2),
        1
      );
      let endPage = startPage + maxVisiblePages - 1;

      if (endPage > pageCount) {
        endPage = pageCount;
        startPage = Math.max(endPage - maxVisiblePages + 1, 1);
      }

      const pages = [];

      // First page
      if (showFirstLastButtons && startPage > 1) {
        pages.push(1);
        if (startPage > 2) {
          pages.push('ellipsis-start');
        }
      }

      // Visible pages
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      // Last page
      if (showFirstLastButtons && endPage < pageCount) {
        if (endPage < pageCount - 1) {
          pages.push('ellipsis-end');
        }
        pages.push(pageCount);
      }

      return pages;
    };

    const visiblePages = getVisiblePages();
    
    // Handle page change
    const handlePageChange = (page: number) => {
      if (page !== normalizedCurrentPage && page >= 1 && page <= pageCount) {
        onPageChange(page);
      }
    };

    // Handle previous/next
    const handlePrevious = () => {
      if (normalizedCurrentPage > 1) {
        handlePageChange(normalizedCurrentPage - 1);
      }
    };

    const handleNext = () => {
      if (normalizedCurrentPage < pageCount) {
        handlePageChange(normalizedCurrentPage + 1);
      }
    };

    // Determine if we should render mobile view
    const [isMobile, setIsMobile] = React.useState(false);
    
    React.useEffect(() => {
      const checkMobile = () => {
        setIsMobile(window.innerWidth < 640);
      };
      
      checkMobile();
      window.addEventListener('resize', checkMobile);
      
      return () => {
        window.removeEventListener('resize', checkMobile);
      };
    }, []);

    // If no pages, don't render
    if (pageCount <= 1) {
      return null;
    }

    return (
      <div
        ref={ref}
        className={cn(paginationVariants({ variant }), className)}
        role="navigation"
        aria-label="Pagination"
        {...props}
      >
        {/* Desktop view */}
        <div className={cn("hidden sm:flex items-center gap-1", variant === 'compact' && 'gap-0')}>
          {showPrevNextButtons && (
            <Button
              onClick={handlePrevious}
              disabled={normalizedCurrentPage === 1}
              variant="outline"
              size="sm"
              aria-label="Go to previous page"
              className={cn(
                "px-2.5",
                variant === 'compact' && "rounded-r-none border-r-0"
              )}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous</span>
            </Button>
          )}

          {visiblePages.map((page, index) => {
            if (page === 'ellipsis-start' || page === 'ellipsis-end') {
              return (
                <div
                  key={`ellipsis-${index}`}
                  className="flex h-9 w-9 items-center justify-center text-sm"
                  aria-hidden="true"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </div>
              );
            }

            const isCurrentPage = page === normalizedCurrentPage;

            return (
              <Button
                key={`page-${page}`}
                onClick={() => handlePageChange(page as number)}
                variant={isCurrentPage ? "default" : "outline"}
                size="sm"
                aria-label={`Page ${page}`}
                aria-current={isCurrentPage ? "page" : undefined}
                className={cn(
                  "h-9 w-9 p-0",
                  variant === 'compact' && !isCurrentPage && "rounded-none border-r-0",
                  variant === 'compact' && isCurrentPage && "rounded-none z-10 relative"
                )}
              >
                {page}
              </Button>
            );
          })}

          {showPrevNextButtons && (
            <Button
              onClick={handleNext}
              disabled={normalizedCurrentPage === pageCount}
              variant="outline"
              size="sm"
              aria-label="Go to next page"
              className={cn(
                "px-2.5",
                variant === 'compact' && "rounded-l-none"
              )}
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next</span>
            </Button>
          )}
        </div>
        
        {/* Mobile view */}
        <div className="flex sm:hidden items-center justify-between w-full px-2">
          <Button
            onClick={handlePrevious}
            disabled={normalizedCurrentPage === 1}
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
            aria-label="Previous page"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Previous</span>
          </Button>
          
          <span className="text-sm">
            Page {normalizedCurrentPage} of {pageCount}
          </span>
          
          <Button
            onClick={handleNext}
            disabled={normalizedCurrentPage === pageCount}
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
            aria-label="Next page"
          >
            <span>Next</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }
);

Pagination.displayName = "Pagination";
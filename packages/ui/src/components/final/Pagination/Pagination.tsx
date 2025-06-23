"use client";

import * as React from 'react';
import { cn } from '../../../lib/utils';
import type { PaginationProps } from '../../../types';

/**
 * Pagination component helps users navigate through multiple pages of content.
 * Automatically hides on mobile devices as specified in the design.
 * 
 * @example
 * ```tsx
 * <Pagination 
 *   currentPage={1} 
 *   totalPages={10} 
 *   onPageChange={(page) => console.log(page)} 
 * />
 * ```
 */
export const Pagination = React.forwardRef<HTMLElement, PaginationProps>(
  ({ 
    className, 
    currentPage, 
    totalPages, 
    onPageChange, 
    showFirstLast = true,
    maxVisiblePages = 7,
    ...props 
  }, ref) => {
    // Don't render if there's only one page
    if (totalPages <= 1) return null;

    const getVisiblePages = () => {
      const delta = Math.floor(maxVisiblePages / 2);
      let start = Math.max(1, currentPage - delta);
      let end = Math.min(totalPages, start + maxVisiblePages - 1);
      
      if (end - start + 1 < maxVisiblePages) {
        start = Math.max(1, end - maxVisiblePages + 1);
      }
      
      return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    };

    const visiblePages = getVisiblePages();
    const showStartEllipsis = visiblePages[0] > 2;
    const showEndEllipsis = visiblePages[visiblePages.length - 1] < totalPages - 1;

    const handlePageClick = (page: number) => {
      if (page !== currentPage && page >= 1 && page <= totalPages) {
        onPageChange(page);
      }
    };

    const PaginationItem = ({ 
      page, 
      isActive = false, 
      disabled = false, 
      children 
    }: {
      page?: number;
      isActive?: boolean;
      disabled?: boolean;
      children: React.ReactNode;
    }) => (
      <button
        className={cn(
          "flex items-center justify-center min-w-8 h-8 px-3 text-xs leading-tight transition-colors",
          "border border-tertiaryGray4 rounded-sm",
          isActive 
            ? "bg-primaryBlue text-white border-primaryBlue" 
            : "bg-white text-primaryBlue hover:bg-primaryBlue hover:text-white",
          disabled && "opacity-50 cursor-not-allowed hover:bg-white hover:text-primaryBlue",
          "mx-1"
        )}
        onClick={() => page && handlePageClick(page)}
        disabled={disabled}
        aria-current={isActive ? "page" : undefined}
        aria-label={
          typeof children === 'number' 
            ? `Go to page ${children}` 
            : typeof children === 'string' 
              ? children 
              : undefined
        }
      >
        {children}
      </button>
    );

    return (
      <nav
        className={cn(
          "flex justify-center items-center py-2.5",
          // Hide on mobile as specified in design
          "hidden sm:flex",
          className
        )}
        role="navigation"
        aria-label="Pagination Navigation"
        ref={ref}
        {...props}
      >
        <ul className="flex items-center list-none p-0 m-0">
          {/* First page */}
          {showFirstLast && currentPage > 1 && (
            <li>
              <PaginationItem page={1}>
                First
              </PaginationItem>
            </li>
          )}

          {/* Previous page */}
          <li>
            <PaginationItem 
              page={currentPage - 1} 
              disabled={currentPage <= 1}
            >
              Previous
            </PaginationItem>
          </li>

          {/* First page number if not in visible range */}
          {showStartEllipsis && (
            <>
              <li>
                <PaginationItem page={1}>1</PaginationItem>
              </li>
              <li>
                <span className="flex items-center justify-center min-w-8 h-8 px-3 text-xs text-tertiaryGray3">
                  ...
                </span>
              </li>
            </>
          )}

          {/* Visible page numbers */}
          {visiblePages.map((page) => (
            <li key={page}>
              <PaginationItem 
                page={page} 
                isActive={page === currentPage}
              >
                {page}
              </PaginationItem>
            </li>
          ))}

          {/* Last page number if not in visible range */}
          {showEndEllipsis && (
            <>
              <li>
                <span className="flex items-center justify-center min-w-8 h-8 px-3 text-xs text-tertiaryGray3">
                  ...
                </span>
              </li>
              <li>
                <PaginationItem page={totalPages}>{totalPages}</PaginationItem>
              </li>
            </>
          )}

          {/* Next page */}
          <li>
            <PaginationItem 
              page={currentPage + 1} 
              disabled={currentPage >= totalPages}
            >
              Next
            </PaginationItem>
          </li>

          {/* Last page */}
          {showFirstLast && currentPage < totalPages && (
            <li>
              <PaginationItem page={totalPages}>
                Last
              </PaginationItem>
            </li>
          )}
        </ul>
      </nav>
    );
  }
);

Pagination.displayName = "Pagination";
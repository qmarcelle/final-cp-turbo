/**
 * MERGED COMPONENT
 * Consolidates functionality from composite components:
 * - DataTable
 * - TablePagination
 * - TableSorting
 * - TableFiltering
 * - Various table-related components
 */

'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../utils';
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Search,
  X,
} from 'lucide-react';
import { Button } from './Button';
import { Pagination } from './Pagination';

// Table container variants
const tableContainerVariants = cva('w-full overflow-auto', {
  variants: {
    variant: {
      default: 'rounded-md border',
      card: 'rounded-md border bg-card shadow-sm',
      transparent: '',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export interface CompositeTableProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tableContainerVariants> {
  /** Whether the table has outer borders */
  bordered?: boolean;
  /** Whether table cells have borders */
  cellBorders?: boolean;
  /** Whether table rows have hover state */
  hover?: boolean;
  /** Whether table has zebra striping */
  striped?: boolean;
  /** Whether the table is in a loading state */
  isLoading?: boolean;
  /** Optional loading text */
  loadingText?: string;
  /** Whether the table has no data */
  isEmpty?: boolean;
  /** Optional empty state message */
  emptyMessage?: React.ReactNode;
  /** Whether to show compact sizes */
  compact?: boolean;
}

/**
 * CompositeTable container component
 */
export const CompositeTable = React.forwardRef<HTMLDivElement, CompositeTableProps>(
  (
    {
      className,
      variant,
      bordered = true,
      cellBorders = true,
      hover = true,
      striped = false,
      isLoading = false,
      loadingText = 'Loading data...',
      isEmpty = false,
      emptyMessage = 'No data available',
      compact = false,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(tableContainerVariants({ variant }), className)}
        {...props}
      >
        <div className="relative w-full overflow-auto">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/80 dark:bg-gray-950/80 z-10">
              <div className="text-center space-y-2">
                <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                <p className="text-sm text-muted-foreground">{loadingText}</p>
              </div>
            </div>
          )}
          
          {isEmpty && !isLoading ? (
            <div className="py-12 flex items-center justify-center text-center">
              <div className="space-y-3 max-w-md">
                {typeof emptyMessage === 'string' ? (
                  <p className="text-muted-foreground">{emptyMessage}</p>
                ) : (
                  emptyMessage
                )}
              </div>
            </div>
          ) : (
            <table
              className={cn(
                'w-full caption-bottom text-sm',
                bordered && 'border-separate',
                bordered && !cellBorders && 'border-spacing-0'
              )}
            >
              {children}
            </table>
          )}
        </div>
      </div>
    );
  }
);

CompositeTable.displayName = 'CompositeTable';

// Table header variants
const headerVariants = cva('', {
  variants: {
    sticky: {
      true: 'sticky top-0 z-10',
      false: '',
    },
  },
  defaultVariants: {
    sticky: false,
  },
});

export interface TableHeaderProps
  extends React.HTMLAttributes<HTMLTableSectionElement>,
    VariantProps<typeof headerVariants> {}

/**
 * TableHeader component
 */
export const TableHeader = React.forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  ({ className, sticky, ...props }, ref) => {
    return (
      <thead
        ref={ref}
        className={cn(
          headerVariants({ sticky }),
          sticky && 'bg-card',
          className
        )}
        {...props}
      />
    );
  }
);

TableHeader.displayName = 'TableHeader';

// Table body component
export const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn('', className)}
    {...props}
  />
));

TableBody.displayName = 'TableBody';

// Table footer component
export const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn('border-t bg-muted/50 font-medium', className)}
    {...props}
  />
));

TableFooter.displayName = 'TableFooter';

// Table row variants
const rowVariants = cva('', {
  variants: {
    hover: {
      true: 'hover:bg-muted/50',
      false: '',
    },
    striped: {
      true: 'even:bg-muted/50',
      false: '',
    },
    selected: {
      true: 'bg-muted',
      false: '',
    },
    compact: {
      true: '',
      false: '',
    },
  },
  compoundVariants: [
    {
      hover: true,
      selected: true,
      className: 'hover:bg-muted/80',
    },
  ],
  defaultVariants: {
    hover: true,
    striped: false,
    selected: false,
    compact: false,
  },
});

export interface TableRowProps
  extends React.HTMLAttributes<HTMLTableRowElement>,
    VariantProps<typeof rowVariants> {
  /** Whether this row is clickable */
  clickable?: boolean;
}

/**
 * TableRow component
 */
export const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, hover, striped, selected, compact, clickable, ...props }, ref) => {
    return (
      <tr
        ref={ref}
        className={cn(
          rowVariants({ hover, striped, selected, compact }),
          clickable && 'cursor-pointer',
          className
        )}
        {...props}
      />
    );
  }
);

TableRow.displayName = 'TableRow';

// Table cell variants
const cellVariants = cva('text-left align-middle', {
  variants: {
    bordered: {
      true: 'border',
      false: '',
    },
    compact: {
      true: 'px-2 py-1.5',
      false: 'p-3 lg:p-4',
    },
  },
  defaultVariants: {
    bordered: true,
    compact: false,
  },
});

export interface TableCellProps
  extends React.TdHTMLAttributes<HTMLTableCellElement>,
    VariantProps<typeof cellVariants> {}

/**
 * TableCell component
 */
export const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, bordered, compact, ...props }, ref) => {
    return (
      <td
        ref={ref}
        className={cn(cellVariants({ bordered, compact }), className)}
        {...props}
      />
    );
  }
);

TableCell.displayName = 'TableCell';

// Table header cell variants
export interface TableHeaderCellProps
  extends React.ThHTMLAttributes<HTMLTableCellElement>,
    VariantProps<typeof cellVariants> {
  /** Whether this column is sortable */
  sortable?: boolean;
  /** Current sort direction of this column, if it's sorted */
  sortDirection?: 'asc' | 'desc' | null;
  /** Callback when sort direction changes */
  onSort?: () => void;
}

/**
 * TableHeaderCell component
 */
export const TableHeaderCell = React.forwardRef<HTMLTableCellElement, TableHeaderCellProps>(
  (
    {
      className,
      bordered,
      compact,
      sortable = false,
      sortDirection = null,
      onSort,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <th
        ref={ref}
        className={cn(
          cellVariants({ bordered, compact }),
          'font-medium text-muted-foreground h-10 whitespace-nowrap',
          sortable && 'cursor-pointer select-none',
          className
        )}
        onClick={sortable ? onSort : undefined}
        aria-sort={
          sortDirection === 'asc'
            ? 'ascending'
            : sortDirection === 'desc'
            ? 'descending'
            : undefined
        }
        {...props}
      >
        {sortable ? (
          <div className="flex items-center gap-1.5">
            {children}
            {sortDirection === 'asc' ? (
              <ArrowUp className="h-4 w-4" />
            ) : sortDirection === 'desc' ? (
              <ArrowDown className="h-4 w-4" />
            ) : (
              <ArrowUpDown className="h-4 w-4 opacity-50" />
            )}
          </div>
        ) : (
          children
        )}
      </th>
    );
  }
);

TableHeaderCell.displayName = 'TableHeaderCell';

// Table pagination props
export interface TablePaginationProps {
  /** Current page index (0-based) */
  pageIndex: number;
  /** Number of items per page */
  pageSize: number;
  /** Total number of items */
  totalCount?: number;
  /** Total number of pages */
  pageCount?: number;
  /** Callback when page changes */
  onPageChange: (page: number) => void;
  /** Callback when page size changes */
  onPageSizeChange?: (size: number) => void;
  /** Available page size options */
  pageSizeOptions?: number[];
  /** Whether to show the page size selector */
  showPageSizeSelector?: boolean;
}

/**
 * TablePagination component
 */
export const TablePagination: React.FC<TablePaginationProps> = ({
  pageIndex,
  pageSize,
  totalCount,
  pageCount: propPageCount,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [10, 25, 50, 100],
  showPageSizeSelector = true,
}) => {
  const pageCount = propPageCount ?? (totalCount ? Math.ceil(totalCount / pageSize) : 0);
  
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4">
      <div className="text-sm text-muted-foreground">
        {totalCount !== undefined ? (
          <>
            Showing {pageIndex * pageSize + 1}-
            {Math.min((pageIndex + 1) * pageSize, totalCount)} of {totalCount}
          </>
        ) : (
          <>
            Page {pageIndex + 1} of {pageCount}
          </>
        )}
      </div>
      
      <div className="flex items-center gap-2">
        {showPageSizeSelector && onPageSizeChange && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Show</span>
            <select
              className="h-8 rounded-md border border-input bg-background px-2 py-1 text-sm"
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
            >
              {pageSizeOptions.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        )}
        
        <Pagination 
          pageCount={pageCount} 
          currentPage={pageIndex + 1} 
          onPageChange={(page) => onPageChange(page - 1)} 
          variant="compact"
        />
      </div>
    </div>
  );
};

// Table search/filter props
export interface TableSearchProps {
  /** Current search value */
  value: string;
  /** Callback when search value changes */
  onChange: (value: string) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Debounce delay in ms */
  debounceMs?: number;
}

/**
 * TableSearch component
 */
export const TableSearch: React.FC<TableSearchProps> = ({
  value,
  onChange,
  placeholder = 'Search...',
  debounceMs = 300,
}) => {
  const [localValue, setLocalValue] = React.useState(value);
  
  // Debounce the onChange callback
  React.useEffect(() => {
    const handler = setTimeout(() => {
      if (localValue !== value) {
        onChange(localValue);
      }
    }, debounceMs);
    
    return () => {
      clearTimeout(handler);
    };
  }, [localValue, value, onChange, debounceMs]);
  
  return (
    <div className="relative w-full max-w-sm">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <input
        type="search"
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        className="h-10 w-full rounded-md border border-input bg-background pl-8 pr-8 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        placeholder={placeholder}
      />
      {localValue && (
        <button
          type="button"
          onClick={() => setLocalValue('')}
          className="absolute right-2.5 top-2.5 h-4 w-4 rounded-sm opacity-70 hover:opacity-100"
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

// Table toolbar props
export interface TableToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

/**
 * TableToolbar component
 */
export const TableToolbar = React.forwardRef<HTMLDivElement, TableToolbarProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col sm:flex-row items-center justify-between gap-4 p-4',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

TableToolbar.displayName = 'TableToolbar';

// Export as a namespace pattern
export const Table = {
  Root: CompositeTable,
  Header: TableHeader,
  Body: TableBody,
  Footer: TableFooter,
  Row: TableRow,
  Cell: TableCell,
  HeaderCell: TableHeaderCell,
  Pagination: TablePagination,
  Search: TableSearch,
  Toolbar: TableToolbar
};
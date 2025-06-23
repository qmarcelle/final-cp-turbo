/**
 * Breadcrumb Configuration Types
 * 
 * Defines the interface for app-specific breadcrumb configurations
 */

export interface BreadcrumbConfig {
  /** 
   * Home/root breadcrumb configuration 
   */
  home?: {
    label: string;
    href: string;
  };

  /** 
   * Path segments to ignore when building breadcrumbs
   * Useful for route groups like (protected), dynamic segments like [id], etc.
   */
  ignoredSegments?: string[];

  /** 
   * Custom labels for specific path segments
   * Maps path segment to display label
   */
  pathLabels?: Record<string, string>;

  /** 
   * Whether to show the current page as the last breadcrumb item (non-clickable)
   * @default true
   */
  showCurrentPage?: boolean;

  /** 
   * Maximum number of breadcrumb items to show
   * When exceeded, middle items will be collapsed
   */
  maxItems?: number;

  /** 
   * Custom function to process path segments before building breadcrumbs
   * Useful for complex routing logic or dynamic segment handling
   */
  processPath?: (segments: string[], fullPath: string) => string[];

  /** 
   * Function to generate custom labels for dynamic segments
   * Receives the segment and the full pathname
   */
  getDynamicLabel?: (segment: string, pathname: string) => string | null;
}

export interface BreadcrumbItemData {
  label: string;
  href?: string;
  isCurrent?: boolean;
}
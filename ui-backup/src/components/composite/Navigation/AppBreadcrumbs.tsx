/**
 * App Breadcrumbs Component
 * 
 * A configurable breadcrumb component that uses app-specific configuration
 * to generate breadcrumbs based on the current route.
 */

'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem } from './Navigation';
import { BreadcrumbConfig, BreadcrumbItemData } from './BreadcrumbConfig';

export interface AppBreadcrumbsProps {
  /** App-specific breadcrumb configuration */
  config: BreadcrumbConfig;
  /** Additional CSS classes */
  className?: string;
  /** Override the current pathname (useful for testing) */
  pathname?: string;
}

/**
 * Converts a path segment to a human-readable label
 */
function humanizeSegment(segment: string): string {
  return segment
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Checks if a segment should be ignored based on configuration
 */
function shouldIgnoreSegment(segment: string, ignoredSegments: string[]): boolean {
  return ignoredSegments.some(ignored => {
    // Exact match
    if (ignored === segment) return true;
    
    // Pattern match for dynamic segments like [id], [memberId], etc.
    if (ignored.startsWith('[') && ignored.endsWith(']')) {
      return segment.startsWith('[') && segment.endsWith(']');
    }
    
    // Pattern match for route groups like (protected), (public), etc.
    if (ignored.startsWith('(') && ignored.endsWith(')')) {
      return segment.startsWith('(') && segment.endsWith(')');
    }
    
    return false;
  });
}

/**
 * Builds breadcrumb items from pathname and configuration
 */
function buildBreadcrumbItems(
  pathname: string, 
  config: BreadcrumbConfig
): BreadcrumbItemData[] {
  const items: BreadcrumbItemData[] = [];
  
  // Add home breadcrumb if configured
  if (config.home) {
    items.push({
      label: config.home.label,
      href: config.home.href,
      isCurrent: pathname === config.home.href
    });
  }
  
  // Split pathname into segments, removing empty strings
  let segments = pathname.split('/').filter(Boolean);
  
  // Apply custom path processing if provided
  if (config.processPath) {
    segments = config.processPath(segments, pathname);
  }
  
  // Filter out ignored segments
  const ignoredSegments = config.ignoredSegments || [];
  const filteredSegments = segments.filter(segment => 
    !shouldIgnoreSegment(segment, ignoredSegments)
  );
  
  // Build breadcrumb items for each segment
  let currentPath = '';
  filteredSegments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const isLast = index === filteredSegments.length - 1;
    
    // Get label from config or humanize the segment
    let label = config.pathLabels?.[segment] || humanizeSegment(segment);
    
    // Try to get dynamic label if segment looks dynamic
    if (config.getDynamicLabel && (segment.startsWith('[') || segment.includes('['))) {
      const dynamicLabel = config.getDynamicLabel(segment, pathname);
      if (dynamicLabel) {
        label = dynamicLabel;
      }
    }
    
    // Skip if this would duplicate the home item
    if (config.home && currentPath === config.home.href) {
      return;
    }
    
    // Add the breadcrumb item
    items.push({
      label,
      href: isLast && config.showCurrentPage === false ? undefined : currentPath,
      isCurrent: isLast && (config.showCurrentPage !== false)
    });
  });
  
  // Apply max items limit if configured
  if (config.maxItems && items.length > config.maxItems) {
    const start = items.slice(0, 1); // Keep home
    const end = items.slice(-(config.maxItems - 2)); // Keep last few items
    const collapsed = { label: '...', isCurrent: false };
    return [...start, collapsed, ...end];
  }
  
  return items;
}

/**
 * App Breadcrumbs Component
 * 
 * Renders breadcrumbs based on current pathname and app configuration
 */
export const AppBreadcrumbs: React.FC<AppBreadcrumbsProps> = ({
  config,
  className,
  pathname: overridePathname
}) => {
  const currentPathname = usePathname();
  const pathname = overridePathname || currentPathname;
  
  // Build breadcrumb items
  const items = buildBreadcrumbItems(pathname, config);
  
  // Don't render if no items or only home item
  if (items.length <= 1 && config.home) {
    return null;
  }
  
  return (
    <Breadcrumb className={className}>
      <BreadcrumbList>
        {items.map((item, index) => (
          <BreadcrumbItem
            key={`${item.href || item.label}-${index}`}
            href={item.href}
            isCurrent={item.isCurrent}
          >
            {item.label}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

AppBreadcrumbs.displayName = 'AppBreadcrumbs';
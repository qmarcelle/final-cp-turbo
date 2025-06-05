/**
 * Broker Portal Breadcrumb Configuration
 * 
 * Defines how breadcrumbs should be displayed throughout the broker portal
 */

import { BreadcrumbConfig } from '@portals/ui';

export const brokerBreadcrumbConfig: BreadcrumbConfig = {
  home: {
    label: 'Dashboard',
    href: '/dashboard'
  },

  // Segments to ignore when building breadcrumbs
  ignoredSegments: [
    '(protected)',  // Route group - not user-facing
    '(public)',     // Route group - not user-facing
    '[memberId]',   // Dynamic segment - will be handled by getDynamicLabel
    '[claimId]',    // Dynamic segment - will be handled by getDynamicLabel
    '[priorAuthId]' // Dynamic segment - will be handled by getDynamicLabel
  ],

  // Custom labels for path segments
  pathLabels: {
    // Main sections
    'member-support': 'Member Support',
    'materials-library': 'Materials Library',
    'learning': 'Learning',
    'reporting': 'Reporting',
    'sales': 'Sales',
    'profile': 'Profile',
    'support': 'Support',
    'search': 'Search',
    'inbox': 'Inbox',

    // Member Support subsections
    'dental-cost-estimator': 'Dental Cost Estimator',
    'employer-group': 'Employer Group',
    'networks-and-steerage': 'Networks & Steerage',
    'id-cards': 'ID Cards',
    'individual': 'Individual',
    'medicare-advantage': 'Medicare Advantage',
    'medicare-supplement': 'Medicare Supplement',
    'member-search': 'Member Search',
    'prior-auths': 'Prior Authorizations',
    'other-insurance': 'Other Insurance',
    'benefits': 'Benefits',
    'claims': 'Claims',
    'id-card': 'ID Card',

    // Materials Library
    'search-results': 'Search Results',

    // Learning
    'seminar-videos': 'Seminar Videos',

    // Reporting
    'bob': 'BOB Reports',
    'compensation': 'Compensation',
    'edi': 'EDI',
    'on-off-marketplace-reporting': 'On/Off Marketplace Reporting',

    // Sales
    'commission': 'Commission',

    // Profile
    'admin': 'Admin',
    'security': 'Security',

    // Common terms
    'dsnp': 'DSNP'
  },

  // Show the current page as the last breadcrumb item
  showCurrentPage: true,

  // Maximum breadcrumb items before collapsing
  maxItems: 6,

  // Handle dynamic segments
  getDynamicLabel: (segment: string, pathname: string) => {
    // For member ID, we could potentially fetch the member name
    // For now, we'll just show a generic label
    if (segment.includes('memberId')) {
      return 'Member Details';
    }
    
    if (segment.includes('claimId')) {
      return 'Claim Details';
    }
    
    if (segment.includes('priorAuthId')) {
      return 'Prior Auth Details';
    }
    
    return null; // Let the default humanization handle it
  },

  // Custom path processing for special cases
  processPath: (segments: string[], fullPath: string) => {
    // Handle special routing cases here if needed
    // For example, you might want to reorganize segments or add context
    
    return segments;
  }
};
/**
 * Employer Portal Breadcrumb Configuration
 * 
 * Defines how breadcrumbs should be displayed throughout the employer portal
 */

import { BreadcrumbConfig } from '@portals/ui';

export const employerBreadcrumbConfig: BreadcrumbConfig = {
  home: {
    label: 'Home',
    href: '/'
  },

  // Segments to ignore when building breadcrumbs
  ignoredSegments: [
    '(protected)',  // Route group - not user-facing
    '(public)',     // Route group - not user-facing
    '[groupId]',    // Dynamic segment for employer groups
    '[employeeId]', // Dynamic segment for employees
    '[planId]'      // Dynamic segment for benefit plans
  ],

  // Custom labels for path segments (employer-specific)
  pathLabels: {
    // Main sections for employer portal
    'employees': 'Employees',
    'benefits': 'Benefits',
    'enrollment': 'Enrollment',
    'reports': 'Reports',
    'billing': 'Billing',
    'settings': 'Settings',
    'support': 'Support',

    // Employee management
    'employee-list': 'Employee List',
    'add-employee': 'Add Employee',
    'employee-details': 'Employee Details',

    // Benefits management
    'plan-overview': 'Plan Overview',
    'plan-comparison': 'Plan Comparison',
    'coverage-details': 'Coverage Details',

    // Enrollment
    'open-enrollment': 'Open Enrollment',
    'enrollment-status': 'Enrollment Status',
    'enrollment-reports': 'Enrollment Reports',

    // Billing
    'invoices': 'Invoices',
    'payment-history': 'Payment History',
    'billing-contacts': 'Billing Contacts'
  },

  // Show the current page as the last breadcrumb item
  showCurrentPage: true,

  // Maximum breadcrumb items before collapsing
  maxItems: 5,

  // Handle dynamic segments for employer portal
  getDynamicLabel: (segment: string, pathname: string) => {
    if (segment.includes('groupId')) {
      return 'Group Details';
    }
    
    if (segment.includes('employeeId')) {
      return 'Employee';
    }
    
    if (segment.includes('planId')) {
      return 'Plan Details';
    }
    
    return null;
  }
};
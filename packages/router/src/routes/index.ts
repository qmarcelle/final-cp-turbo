/**
 * Central export of all route definitions
 * This provides a single import point for the application to access all routes
 */
import { authRoutes } from './auth.routes';
import { externalRoutes } from './external.routes';
import { specialRoutes } from './special.routes';
import { createRoute } from '../utils/createRoute';

/**
 * Complete route map for the application
 * Organized by portal type and business domain
 */
export const routes = {
  // External routes are common across portals
  external: externalRoutes,
  
  // Broker portal routes
  broker: {
    auth: authRoutes,
    dashboard: {
      home: createRoute('/broker/home')
    },
    accounts: {
      overview: createRoute('/broker/accounts'),
      details: createRoute('/broker/accounts/:accountId')
    },
    clients: {
      overview: createRoute('/broker/clients'),
      details: createRoute('/broker/clients/:clientId')
    },
    special: specialRoutes
  },
  
  // Employer portal routes
  employer: {
    auth: authRoutes,
    dashboard: {
      home: createRoute('/employer/home')
    },
    employees: {
      overview: createRoute('/employer/employees'),
      details: createRoute('/employer/employees/:employeeId')
    },
    benefits: {
      overview: createRoute('/employer/benefits'),
      plans: createRoute('/employer/benefits/plans')
    },
    special: specialRoutes
  }
};

/**
 * Export individual route modules for direct imports
 */
export {
  authRoutes,
  externalRoutes,
  specialRoutes,
};

// Export route types and utilities
export * from '../utils/createRoute'; 
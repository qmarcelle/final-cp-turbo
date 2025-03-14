/**
 * Special routes - tenant-specific, role-specific, and special state routes
 */
import { createRoute } from '../utils/createRoute';

export const specialRoutes = {
  // Role-specific routes
  admin: {
    dashboard: createRoute('/admin/dashboard'),
    users: createRoute('/admin/users'),
    settings: createRoute('/admin/settings'),
  },
  
  // Tenant-specific routes for brokers
  brokerTenants: {
    blueCross: {
      dashboard: createRoute('/broker/bluecross/home'),
      reports: createRoute('/broker/bluecross/reports'),
    },
    amplifyHealth: {
      dashboard: createRoute('/broker/amplifyhealth/home'),
      advisors: createRoute('/broker/amplifyhealth/advisors'),
    },
  },
  
  // Tenant-specific routes for employers
  employerTenants: {
    blueCross: {
      dashboard: createRoute('/employer/bluecross/home'),
      reports: createRoute('/employer/bluecross/reports'),
    },
    amplifyHealth: {
      dashboard: createRoute('/employer/amplifyhealth/home'),
      benefits: createRoute('/employer/amplifyhealth/benefits'),
    },
  },
  
  // Special states
  inactive: {
    dashboard: createRoute('/inactive/home'),
    contact: createRoute('/inactive/contact'),
  },
}; 
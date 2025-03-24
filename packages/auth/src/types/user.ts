import { BasePermission } from '../models/core';

/**
 * Enum defining user roles in the application
 */
export enum UserRole {
  MEMBER = 'MEMBER',
  ADMIN = 'ADMIN',
  INTERNAL = 'INTERNAL',
  PERSONAL_REP = 'PERSONAL_REP',
}

/**
 * Base session user type
 */
export interface SessionUser {
  id: string;
  role: UserRole;
  permissions: BasePermission[];
}

/**
 * Extended user type for portal functionality
 */
export interface PortalUser extends SessionUser {
  email?: string;
  firstName?: string;
  lastName?: string;
  visibilityRules?: string;
}

/**
 * Base session type without auth.js dependencies
 */
export interface Session {
  user: PortalUser;
  expires: string;
}

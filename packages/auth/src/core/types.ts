/**
 * Core authentication types used throughout the authentication system
 */

export interface User {
  id: string;
  email: string;
  name?: string;
  role: UserRole;
  permissions: Permission[];
  accountInfo?: AccountInfo;
}

export enum UserRole {
  BROKER = 'broker',
  EMPLOYER = 'employer',
  ADMIN = 'admin',
  GUEST = 'guest',
}

export enum Permission {
  VIEW_CLIENTS = 'view:clients',
  MANAGE_CLIENTS = 'manage:clients',
  VIEW_ACCOUNTS = 'view:accounts',
  MANAGE_ACCOUNTS = 'manage:accounts',
  VIEW_EMPLOYEES = 'view:employees',
  MANAGE_EMPLOYEES = 'manage:employees',
  VIEW_BENEFITS = 'view:benefits',
  MANAGE_BENEFITS = 'manage:benefits',
  VIEW_PROFILE = 'view:profile',
  MANAGE_PROFILE = 'manage:profile',
  VIEW_DOCUMENTS = 'view:documents',
  MANAGE_DOCUMENTS = 'manage:documents',
  ADMIN_ACCESS = 'admin:access',
}

export interface AccountInfo {
  accountId: string;
  groupId?: string;
  planType?: string;
  effectiveDate?: string;
  terminationDate?: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: Error | null;
}

export interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  hasPermission: (permission: Permission) => boolean;
}

export interface TokenPayload {
  sub: string; // User ID
  email: string;
  name?: string;
  role: UserRole;
  permissions: Permission[];
  iat: number;
  exp: number;
}

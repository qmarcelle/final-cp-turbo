/**
 * Auth package for Consumer Portals
 *
 * This package provides a uniform authentication configuration and utilities
 * for use with Auth.js (next-auth v5) across portal applications.
 */

'use client';

// Core exports
export { auth, authConfig, signIn, signOut } from './auth';
export type { JWTParams, SessionParams } from './auth';

// Base types from models
export type {
  BaseAuthConfig,
  BaseAuthToken,
  BasePermission,
  BaseSession,
} from './models/core';

export {
  createAuthConfig,
  createSession,
  hasPermission,
  validateToken,
} from './models/core';

// User and session types
export type { PortalUser, Session, SessionUser, UserRole } from './types/user';

// Feature exports
export * from './components';
export * from './hooks';
export * from './services/auth';

// Error constants
export { SERVER_ACTION_NO_SESSION_ERROR } from './auth';

// Export services
export { authServiceImpl } from './services/auth';

// Export storage
export { createTokenStorage, tokenStorage } from './storage/token';
export type { TokenStorage, TokenStorageOptions } from './storage/token';

// Export config types
export type { AuthConfig } from './types/auth';
export type { SessionTimeoutConfig } from './types/session';

// Export component types
export type { AuthProviderProps } from './components/AuthProvider';

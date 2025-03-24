/**
 * Core authentication types and utilities
 */

import { SessionUser } from '../types/user';

/**
 * Base auth token interface
 */
export interface BaseAuthToken {
  userId: string;
  accessToken: string;
  refreshToken?: string;
  expiresAt: number;
  exp: number;
  iat: number;
  permissions: string[];
  user: SessionUser;
}

/**
 * Base permission interface
 */
export interface BasePermission {
  id: string;
  scope: 'global' | 'portal' | 'feature';
  available: boolean;
}

/**
 * Base session interface
 */
export interface BaseSession {
  token: BaseAuthToken;
  expiresAt: number;
}

/**
 * Base configuration interface
 */
export interface BaseAuthConfig {
  sessionDuration: number;
  tokenValidation?: (token: BaseAuthToken) => boolean;
  permissionMapping?: Record<string, string[]>;
}

/**
 * Base middleware configuration
 */
export interface BaseMiddlewareConfig {
  onUnauthorized?: (request: Request) => Response | Promise<Response>;
  onExpired?: (request: Request) => Response | Promise<Response>;
  validateRequest?: (request: Request) => boolean | Promise<boolean>;
}

/**
 * Core permission utilities
 */
export const hasPermission = (
  token: BaseAuthToken,
  permissionId: string,
): boolean => {
  return token.permissions.includes(permissionId);
};

/**
 * Core token utilities
 */
export const validateToken = (token: BaseAuthToken): boolean => {
  const now = Date.now() / 1000;
  return token.exp > now && token.iat <= now;
};

/**
 * Core session utilities
 */
export const createSession = (
  token: BaseAuthToken,
  duration: number,
): BaseSession => {
  return {
    token,
    expiresAt: Date.now() + duration,
  };
};

/**
 * Factory function to create auth configuration
 */
export const createAuthConfig = (
  config: Partial<BaseAuthConfig>,
): BaseAuthConfig => {
  return {
    sessionDuration: 30 * 60 * 1000, // 30 minutes default
    tokenValidation: validateToken,
    ...config,
  };
};

/**
 * Factory function to create middleware configuration
 */
export const createMiddlewareConfig = (
  config: Partial<BaseMiddlewareConfig>,
): BaseMiddlewareConfig => {
  return {
    onUnauthorized: async () => new Response(null, { status: 401 }),
    onExpired: async () => new Response(null, { status: 440 }),
    validateRequest: async () => true,
    ...config,
  };
};

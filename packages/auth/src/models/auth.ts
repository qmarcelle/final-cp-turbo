import { UserRole } from '../types/user';
import { AuthFunction } from './visibility/types';

/**
 * Base auth token interface
 */
export interface AuthToken {
  userId: string;
  username: string;
  roles: string[];
  permissions: string[];
  authFunctions: AuthFunction[];
  exp?: number;
}

/**
 * JWT specific auth token interface
 */
export interface JWTAuthToken extends AuthToken {
  iat: number;
  exp: number;
  iss: string;
  sub: string;
  aud: string[];
  jti: string;
}

export interface AuthContext {
  userId: string;
  role: UserRole;
  permissions: string[];
  visibilityRules?: string;
}

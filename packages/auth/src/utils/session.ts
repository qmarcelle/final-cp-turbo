/**
 * Important: In Auth.js v5, the auth() function needs to be imported from the client app
 * This file provides utility functions to be used with a proper auth() implementation
 */

import { type Session } from '@auth/core/types';

// Define error constant directly rather than importing
export const SERVER_ACTION_NO_SESSION_ERROR = 'Invalid session';

/**
 * Get the user ID from the server-side session
 * @param session The session from auth()
 * @returns User ID string
 * @throws Error if no session is found
 */
export function getUserId(session: Session | null): string {
  if (!session || !session.user) {
    throw SERVER_ACTION_NO_SESSION_ERROR;
  }
  return session.user.id;
}

/**
 * Check if a session represents an authenticated user
 * @param session The session from auth()
 * @returns Boolean indicating if user is authenticated
 */
export function isSessionAuthenticated(session: Session | null): boolean {
  return !!(session && session.user);
}

/**
 * Parse a JWT token
 * @param token JWT token to parse
 * @returns Decoded token payload
 */
export function parseJwt(token: string) {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
}

/**
 * Get token expiration time
 * @param token JWT token
 * @returns Expiration time in milliseconds or null if invalid
 */
export function getTokenExpiration(token: string): number | null {
  const decoded = parseJwt(token);
  return decoded?.exp ? decoded.exp * 1000 : null;
}

/**
 * Check if a token is expired
 * @param token JWT token
 * @returns Boolean indicating if token is expired
 */
export function isTokenExpired(token: string): boolean {
  const expiration = getTokenExpiration(token);
  return expiration ? Date.now() >= expiration : true;
}

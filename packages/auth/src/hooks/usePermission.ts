import { useCallback } from 'react';
import { useAuth } from '../core/AuthContext';
import { Permission } from '../core/types';

/**
 * Hook to check user permissions
 * Provides functions to check if the current user has specific permissions
 */
export function usePermission() {
  const { user } = useAuth();
  
  /**
   * Check if the user has a specific permission
   */
  const hasPermission = useCallback((permission: Permission): boolean => {
    if (!user) return false;
    return user.permissions.includes(permission);
  }, [user]);

  /**
   * Check if the user has all of the specified permissions
   */
  const hasAllPermissions = useCallback((permissions: Permission[]): boolean => {
    if (!user) return false;
    return permissions.every(permission => user.permissions.includes(permission));
  }, [user]);

  /**
   * Check if the user has any of the specified permissions
   */
  const hasAnyPermission = useCallback((permissions: Permission[]): boolean => {
    if (!user) return false;
    return permissions.some(permission => user.permissions.includes(permission));
  }, [user]);

  return {
    hasPermission,
    hasAllPermissions,
    hasAnyPermission,
  };
}

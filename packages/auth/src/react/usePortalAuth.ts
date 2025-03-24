import { useCallback, useEffect, useState } from 'react';
import { BaseAuthToken } from '../models/core';
import { tokenStorage } from '../storage/token';
import { SessionUser } from '../types/user';

/**
 * Hook return type
 */
export interface UsePortalAuthReturn {
  token: BaseAuthToken | null;
  isAuthenticated: boolean;
  hasPermission: (permissionId: string) => boolean;
  getRoutePermissions: (route: string) => string[];
  updateToken: (token: BaseAuthToken) => Promise<void>;
}

/**
 * Hook for managing portal authentication
 */
export const usePortalAuth = (): UsePortalAuthReturn => {
  const [token, setToken] = useState<BaseAuthToken | null>(null);

  useEffect(() => {
    // Load token on mount
    tokenStorage.getToken().then((storedToken) => {
      setToken(storedToken);
    });
  }, []);

  const hasPermission = useCallback(
    (permissionId: string) => {
      if (!token?.user) return false;
      const user = token.user as SessionUser;
      return user.permissions.includes(permissionId);
    },
    [token],
  );

  const getRoutePermissions = useCallback((route: string) => {
    // This would be implemented based on your route permission mapping
    return [];
  }, []);

  const updateToken = useCallback(async (newToken: BaseAuthToken) => {
    await tokenStorage.setToken(newToken);
    setToken(newToken);
  }, []);

  return {
    token,
    isAuthenticated: !!token,
    hasPermission,
    getRoutePermissions,
    updateToken,
  };
};

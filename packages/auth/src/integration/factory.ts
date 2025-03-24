/**
 * Interface for portal integration
 */
export interface PortalIntegration {
  /**
   * Get permissions required for a route
   */
  getRoutePermissions: (route: string) => string[];

  /**
   * Check if a user has a specific permission
   */
  hasPermission: (permissionId: string) => boolean;
}

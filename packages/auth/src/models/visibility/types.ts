/**
 * Auth function interface
 */
export interface AuthFunction {
  functionName: string;
  available: boolean;
}

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
 * Base visibility rules interface
 */
export interface BaseVisibilityRules {
  isAuthenticated: boolean;
  canViewProfile: boolean;
  canUpdateProfile: boolean;
  canAccessAdmin: boolean;
}

/**
 * Check if a token has a specific auth function
 */
export function hasAuthFunction(
  token: AuthToken,
  functionName: string,
): boolean {
  return (
    token.authFunctions?.some(
      (fn) => fn.functionName === functionName && fn.available,
    ) ?? false
  );
}

/**
 * Compute base visibility rules from an auth token
 */
export function computeBaseVisibilityRules(
  token: AuthToken,
): BaseVisibilityRules {
  return {
    isAuthenticated: !!token,
    canViewProfile: hasAuthFunction(token, 'VIEW_PROFILE'),
    canUpdateProfile: hasAuthFunction(token, 'UPDATE_PROFILE'),
    canAccessAdmin: hasAuthFunction(token, 'ADMIN_ACCESS'),
  };
}

/**
 * Type guard to check if a value is an AuthFunction
 */
export function isAuthFunction(value: unknown): value is AuthFunction {
  return (
    typeof value === 'object' &&
    value !== null &&
    'functionName' in value &&
    'available' in value &&
    typeof (value as AuthFunction).functionName === 'string' &&
    typeof (value as AuthFunction).available === 'boolean'
  );
}

/**
 * Utility to create a strongly typed rule checker
 */
export function createRuleChecker<T extends BaseVisibilityRules>() {
  return function checkRule(rules: T, feature: keyof T): boolean {
    return !!rules[feature];
  };
}

/**
 * Type to represent rule requirements for routes
 */
export type RouteRules<T extends BaseVisibilityRules> = {
  [route: string]: Array<keyof T>;
};

export interface VisibilityRules {
  canViewUsers: boolean;
  canEditUsers: boolean;
  canDeleteUsers: boolean;
  canManageRoles: boolean;
  canManagePermissions: boolean;
}

export function getVisibilityRules(token: AuthToken): VisibilityRules {
  return {
    canViewUsers: hasAuthFunction(token, 'VIEW_USERS'),
    canEditUsers: hasAuthFunction(token, 'EDIT_USERS'),
    canDeleteUsers: hasAuthFunction(token, 'DELETE_USERS'),
    canManageRoles: hasAuthFunction(token, 'MANAGE_ROLES'),
    canManagePermissions: hasAuthFunction(token, 'MANAGE_PERMISSIONS'),
  };
}

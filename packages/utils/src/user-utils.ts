/**
 * Member ID and Formatting Utilities
 */

/**
 * Concatenates subscriberId and suffix with proper padding
 */
export const formatMemberId = (
  subscriberId: string,
  suffix: number,
): string => {
  return `${subscriberId}${suffix.toString().padStart(2, '0')}`;
};

/**
 * Gets subscriber ID with suffix (alias for formatMemberId)
 */
export const getSubscriberSuffix = (
  subscriberId: string,
  suffix: number,
): string => {
  return `${subscriberId.trim()}${suffix.toString().padStart(2, '0')}`;
};

/**
 * Member Data Utilities
 */

/**
 * Normalizes gender to M or F
 */
export const getGender = (gender: string): string => {
  return gender.toUpperCase() === 'M' ? 'M' : 'F';
};

/**
 * Gets member relation display text
 */
export const getMemberRelation = (relation: string): string => {
  return relation.toUpperCase() === 'M' ? 'Employee' : 'Dependent';
};

/**
 * Determines organization based on insurance type
 */
export const getOrganization = (
  isOHDFullyInsured: boolean,
  groupId: string,
): string => {
  return isOHDFullyInsured ? 'BCBST-FI' : groupId;
};

/**
 * Role Utilities
 */

// Basic user roles enum
export enum UserRole {
  MEMBER = 'MEMBER',
  AUTHORIZED_USER = 'AUTHORIZED_USER', 
  PERSONAL_REP = 'PERSONAL_REP',
  NON_MEM = 'NON_MEM'
}

/**
 * Returns the display text for viewing as a specific role
 */
export const getViewAsRoleNameFromType = (role: UserRole): string => {
  switch (role) {
    case UserRole.AUTHORIZED_USER:
      return 'View as Authorized User:';
    case UserRole.PERSONAL_REP:
      return 'View as Personal Representative:';
    case UserRole.MEMBER:
    case UserRole.NON_MEM:
      return 'My Profile';
  }
};

/**
 * Converts UserRole enum to display name
 */
export const computeRoleNameFromType = (role: UserRole): string => {
  switch (role) {
    case UserRole.AUTHORIZED_USER:
      return 'Authorized User';
    case UserRole.PERSONAL_REP:
      return 'Personal Representative';
    case UserRole.MEMBER:
    case UserRole.NON_MEM:
      return 'My Profile';
  }
};

/**
 * Checks if user has Personal Representative access
 */
export const checkPersonalRepAccess = (
  userRole: UserRole | undefined,
): boolean => {
  return userRole !== UserRole.PERSONAL_REP;
};

/**
 * Type Guards and Validation
 */

/**
 * Checks if a user role is valid
 */
export const isValidUserRole = (role: string): role is UserRole => {
  return Object.values(UserRole).includes(role as UserRole);
};

/**
 * Checks if user has member access
 */
export const hasMemberAccess = (userRole: UserRole): boolean => {
  return [UserRole.MEMBER, UserRole.AUTHORIZED_USER, UserRole.PERSONAL_REP].includes(userRole);
};

/**
 * Gets user role priority for sorting/display purposes
 */
export const getUserRolePriority = (role: UserRole): number => {
  switch (role) {
    case UserRole.MEMBER:
      return 1;
    case UserRole.AUTHORIZED_USER:
      return 2;
    case UserRole.PERSONAL_REP:
      return 3;
    case UserRole.NON_MEM:
      return 4;
    default:
      return 5;
  }
}; 
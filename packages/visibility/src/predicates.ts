// packages/visibility/src/predicates.ts

/**
 * Custom predicate functions for the visibility engine
 * These functions can be registered as Jexl transforms for complex business logic
 */

/**
 * Checks if a user has a specific role
 * 
 * @param userContext - User context object containing roles array
 * @param role - Role name to check for
 * @returns Boolean indicating if user has the specified role
 */
export function isUserInRole(userContext: any, role: string): boolean {
  console.log('Checking user role:', role, 'for user context:', userContext?.id)
  
  if (!userContext || !Array.isArray(userContext.roles)) {
    return false
  }
  
  return userContext.roles.includes(role)
}

/**
 * Checks if a member has a specific coverage type
 * 
 * @param memberContext - Member context object containing coverage types
 * @param productType - Product type code to check for (e.g., 'M', 'D', 'V')
 * @returns Boolean indicating if member has the specified coverage type
 */
export function hasCoverageType(
  memberContext: any,
  productType: string
): boolean {
  console.log('Checking coverage type:', productType, 'for member:', memberContext?.memberId)
  
  if (!memberContext || !Array.isArray(memberContext.coverageTypes)) {
    return false
  }
  
  return memberContext.coverageTypes.some(
    (c: any) => c.productType === productType
  )
}

/**
 * Register these predicates with Jexl in the PolicyEngine constructor:
 * 
 * this.jexl.addTransform('isUserInRole', (userCtx, role) => isUserInRole(userCtx, role));
 * this.jexl.addTransform('hasCoverageType', (memberCtx, type) => hasCoverageType(memberCtx, type));
 */

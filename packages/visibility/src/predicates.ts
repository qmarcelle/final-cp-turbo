// packages/visibility/src/predicates.ts

// Placeholder for custom predicate functions that could be used by your visibility engine
// For example, if your Jexl expressions needed to call out to more complex TypeScript logic.

export function isUserInRole(userContext: any, role: string): boolean {
  console.log(
    'isUserInRole called with context:',
    userContext,
    'and role:',
    role
  )
  if (!userContext || !Array.isArray(userContext.roles)) {
    return false
  }
  // throw new Error('Not implemented: isUserInRole');
  return userContext.roles.includes(role)
}

export function hasCoverageType(
  memberContext: any,
  productType: string
): boolean {
  console.log(
    'hasCoverageType called with context:',
    memberContext,
    'and productType:',
    productType
  )
  if (!memberContext || !Array.isArray(memberContext.coverageTypes)) {
    return false
  }
  // throw new Error('Not implemented: hasCoverageType');
  return memberContext.coverageTypes.some(
    (c: any) => c.productType === productType
  )
}

// You could register these with Jexl in the PolicyEngine constructor if needed:
// this.jexl.addTransform('isUserInRole', (userCtx, role) => isUserInRole(userCtx, role));
// this.jexl.addTransform('hasCoverageType', (memberCtx, type) => hasCoverageType(memberCtx, type));

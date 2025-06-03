// packages/visibility/src/index.ts

export * from './engine'; // Exports PolicyEngine
export * from './rules.schema';
export * from './hooks'; // Exports VisibilityProvider, useVisibility, useFeatureFlag, Guard
export * from './types'; // Exports VisibilityContextType etc.

// encoding.ts and predicates.ts are not exported by default as they are more internal
// or utility-focused. Export them if they are intended for direct consumption by other packages.
// export * from './encoding';
// export * from './predicates'; 
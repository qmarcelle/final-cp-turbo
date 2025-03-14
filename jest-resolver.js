/**
 * Custom Jest resolver for the monorepo
 * 
 * This resolver helps Jest find packages within the monorepo
 * by resolving path aliases like @cp/package-name.
 */
const path = require('path');
const { createResolver } = require('jest-resolve');

// Map of package name prefixes to their directories
const packageMap = {
  '@cp/auth': path.resolve(__dirname, 'packages/auth/src'),
  '@cp/types': path.resolve(__dirname, 'packages/types/src'),
  '@cp/router': path.resolve(__dirname, 'packages/router/src'),
  '@cp/testing': path.resolve(__dirname, 'packages/testing/src'),
  '@cp/ui': path.resolve(__dirname, 'packages/ui/src'),
};

/**
 * Custom resolver function
 * @param {string} request - The import path being resolved
 * @param {object} options - Jest resolve options
 * @returns {string|null} The resolved path or null
 */
module.exports = (request, options) => {
  // Check if the request starts with one of our package prefixes
  for (const [prefix, packagePath] of Object.entries(packageMap)) {
    if (request.startsWith(prefix)) {
      // Replace the prefix with the actual path
      const relativePath = request.substring(prefix.length);
      const resolvedPath = path.join(packagePath, relativePath);
      return resolvedPath;
    }
  }

  // If not a monorepo package, use the default resolver
  const defaultResolver = createResolver(options);
  return defaultResolver(request, options);
}; 
// @ts-check -- We can use JSDoc for type checking in JS files
/** @type {import('tsup').Options} */
const baseTsupConfig = {
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  minify: false,
  treeshake: true,
  external: ['react', 'react-dom'],
  // Add other common options here
};

module.exports = { baseTsupConfig }; // Export for CJS consumption by tsup configs 
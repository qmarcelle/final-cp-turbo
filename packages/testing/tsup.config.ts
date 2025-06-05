import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  external: [
    // External dependency - should be resolved at runtime
    '@portals/api-client/mocks'
  ]
}) 
import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts', 'src/auth.config.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  sourcemap: true,
}) 
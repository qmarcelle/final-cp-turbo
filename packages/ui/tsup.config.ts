import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  external: ['react'],
  clean: true,
  outDir: 'dist',
  tsconfig: 'tsconfig.json',
  loader: {
    '.svg': 'file',
  },
  esbuildOptions: (options) => {
    // Use esbuild-wasm
    options.platform = 'neutral';
  },
});
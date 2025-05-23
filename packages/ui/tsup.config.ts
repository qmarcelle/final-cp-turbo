import {defineConfig} from 'tsup';

export default defineConfig({
    entry: ['src/index.ts'],
    format: ['cjs', 'esm'],
    dts: false,
    external: ['react'],
    clean: true,
    outDir: 'dist',
    tsconfig: 'tsconfig.json'
})
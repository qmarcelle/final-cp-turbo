import {defineConfig} from 'tsup';

export default defineConfig({
    entry: ['src/index.ts'],
    format: ['cjs', 'esm'],
    dts: true,
    external: ['react'],
    clean: true,
    outDir: 'dist',
    tsconfig: 'tsconfig.json',
    tsBuildInfo:'dist/.tsbuildinfo'
})
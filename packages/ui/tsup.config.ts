import {defineConfig} from 'tsup';

export default defineConfig({
    entry: ['src/index.ts'],
    format: ['cjs', 'esm'],
    dts: true,
    external: ['react', 'react-dom', 'next', 'react-hook-form', 'react-imask', '@radix-ui/react-slot'],
    clean: true,
    outDir: 'dist',
    tsconfig: 'tsconfig.json'
})
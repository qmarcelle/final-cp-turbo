import {defineConfig} from 'tsup';

export default defineConfig({
    entry: {
        index: 'src/index.ts',
        styles: 'src/styles/globals.css'
    },
    format: ['cjs', 'esm'],
    dts: true,
    external: ['react', 'react-dom', 'next', 'react-hook-form', 'react-imask', '@radix-ui/react-slot'],
    clean: true,
    outDir: 'dist',
    tsconfig: 'tsconfig.json',
    // Enable CSS processing
    minify: false,
    sourcemap: true,
    // Inject CSS into JS bundle for easier consumption
    injectStyle: false,
    // Copy CSS files to output
    publicDir: false,
    loader: {
        '.css': 'css'
    }
})
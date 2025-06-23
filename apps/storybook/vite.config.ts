import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Get environment variables we want to pass through
const envVars = {
  NODE_ENV: process.env.NODE_ENV,
  STORYBOOK: true,
  // Add any other env vars your components need
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
};

// Create define object with stringified values
const defineEnvVars = Object.entries(envVars).reduce((acc, [key, value]) => ({
  ...acc,
  [`process.env.${key}`]: JSON.stringify(value),
}), {});

export default defineConfig({
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      '@portals/ui': path.resolve(__dirname, '../../packages/ui/src'),
      '@portals/utils': path.resolve(__dirname, '../../packages/utils/src'),
      '@portals/logger': path.resolve(__dirname, '../../packages/logger/src'),
      '@portals/testing': path.resolve(__dirname, '../../packages/testing/src'),
      '@portals/auth': path.resolve(__dirname, '../../packages/auth/src'),
      '@portals/types': path.resolve(__dirname, '../../packages/types/src'),
      '@portals/tsconfig': path.resolve(__dirname, '../../packages/tsconfig'),
      '@': path.resolve(__dirname, '../../packages/ui/src'),
      '@components': path.resolve(__dirname, '../../packages/ui/src/components'),
      '@features': path.resolve(__dirname, '../../packages/ui/src/features'),
      '@utils': path.resolve(__dirname, '../../packages/ui/src/utils'),
      '@types': path.resolve(__dirname, '../../packages/ui/src/types'),
      '@styles': path.resolve(__dirname, '../../packages/ui/src/styles'),
      'react': path.resolve(__dirname, '../../node_modules/react'),
      'react-dom': path.resolve(__dirname, '../../node_modules/react-dom'),
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.d.ts']
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-hook-form',
      '@portals/ui',
    ],
    exclude: ['@portals/ui'],
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/],
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
    },
  },
  define: {
    ...defineEnvVars,
    // Ensure global is defined for packages that expect it
    global: 'globalThis',
  },
}); 
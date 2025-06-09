import type { StorybookConfig } from '@storybook/react-vite';
import path from 'path';

const config: StorybookConfig = {
  stories: [
    '../../../packages/ui/src/components/**/*.stories.@(js|jsx|ts|tsx|mdx)',
    '../stories/**/*.stories.@(js|jsx|ts|tsx|mdx)'
  ],

  addons: [
    '@storybook/addon-links',
    '@storybook/addon-a11y',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },

  typescript: {
    check: false,
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
  async viteFinal(config, { configType }) {
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@': path.resolve(__dirname, '../../../packages/ui/src'),
        '@/components': path.resolve(__dirname, '../../../packages/ui/src/components'),
        '@/lib': path.resolve(__dirname, '../../../packages/ui/src/lib'),
        '@/styles': path.resolve(__dirname, '../../../packages/ui/src/styles'),
        '@/utils': path.resolve(__dirname, '../../../packages/ui/src/utils'),
        '@/types': path.resolve(__dirname, '../../../packages/ui/src/types'),
      };
    }
    
    // Add process polyfill for Next.js components
    if (!config.define) {
      config.define = {};
    }
    config.define.global = 'globalThis';
    config.define.process = 'globalThis.process';
    
    if (!config.optimizeDeps) {
      config.optimizeDeps = {};
    }
    if (!config.optimizeDeps.include) {
      config.optimizeDeps.include = [];
    }
    config.optimizeDeps.include.push('react-hook-form');
    
    // Vite will automatically pick up postcss.config.js from project root
    return config;
  },
};

export default config;
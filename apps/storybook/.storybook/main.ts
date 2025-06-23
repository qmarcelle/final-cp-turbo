import type { StorybookConfig } from '@storybook/nextjs-vite'
import path from 'path'
import tailwindConfig from '../../../packages/ui/tailwind.config.js'
import { loadEnv } from 'vite'

const config: StorybookConfig = {
  stories: [
    '../../../packages/ui/src/components/final/Demo/**/*.mdx',
    '../../../packages/ui/src/components/final/Demo/**/*.stories.@(js|jsx|ts|tsx)'
  ],

  staticDirs: ['../public'],

  // In Storybook 9, most addons are consolidated into the core package
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-docs'
  ],
  
  framework: {
    name: '@storybook/nextjs-vite',
    options: {
      builder: {
        viteConfigPath: 'vite.config.ts',
      },
    },
  },

  docs: {
    defaultName: 'Documentation',
  },

  core: {
    disableTelemetry: true,
    enableCrashReports: false,
  },

  viteFinal: async (config) => {
    // Resolve paths
    config.resolve = config.resolve || {}
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, '../../../packages/ui/src'),
      '@/components': path.resolve(__dirname, '../../../packages/ui/src/components'),
      '@/lib': path.resolve(__dirname, '../../../packages/ui/src/lib'),
      '@/utils': path.resolve(__dirname, '../../../packages/ui/src/utils'),
      '@/styles': path.resolve(__dirname, '../../../packages/ui/src/styles'),
      '@/types': path.resolve(__dirname, '../../../packages/types/src'),
    }

    // Load environment variables
    const env = loadEnv('', process.cwd(), '')
    config.define = {
      ...config.define,
      ...Object.keys(env).reduce((prev, key) => {
        prev[`process.env.${key}`] = JSON.stringify(env[key])
        return prev
      }, {}),
    }

    // Configure CSS
    config.css = config.css || {}
    config.css.postcss = {
      plugins: [
        require('tailwindcss')(tailwindConfig),
        require('autoprefixer'),
      ],
    }

    return config
  },
}

export default config
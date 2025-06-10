import type { StorybookConfig } from '@storybook/react-vite'
import path from 'path'

const config: StorybookConfig = {
  stories: [
    // Import stories from the built UI package
    '../../../packages/ui/src/**/*.stories.@(js|jsx|ts|tsx|mdx)',
    // Also include any local stories
    '../src/**/*.stories.@(js|jsx|ts|tsx|mdx)',
  ],

  staticDirs: ['../public'],

  addons: ['@storybook/addon-links', '@storybook/addon-a11y'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },

  typescript: {
    check: false,
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: prop =>
        prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
    },
  },
  async viteFinal(config, { configType }) {
    // Import CSS from the UI package
    if (!config.css) {
      config.css = {}
    }

    // Add process polyfill for Next.js components
    if (!config.define) {
      config.define = {}
    }
    config.define.global = 'globalThis'
    config.define.process = 'globalThis.process'

    if (!config.optimizeDeps) {
      config.optimizeDeps = {}
    }
    if (!config.optimizeDeps.include) {
      config.optimizeDeps.include = []
    }
    config.optimizeDeps.include.push('react-hook-form', '@portals/ui')

    return config
  },
}

export default config

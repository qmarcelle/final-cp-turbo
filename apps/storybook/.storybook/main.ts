import type { StorybookConfig } from '@storybook/react-vite'
import path from 'path'
import tailwindConfig from '../../../packages/ui/tailwind.config.js'
import { loadEnv } from 'vite'
import remarkGfm from 'remark-gfm'
import react from '@vitejs/plugin-react'

const config: StorybookConfig = {
  // Keep your exact story paths
  stories: [
    '../../../packages/ui/src/components/final/Demo/**/*.mdx',
    '../../../packages/ui/src/components/final/Demo/**/*.stories.@(js|jsx|ts|tsx)',
  ],

  staticDirs: ['../public'],

  // Storybook 9 addon configuration
  addons: [
    '@storybook/addon-themes',
    '@storybook/addon-a11y',
    {
      name: '@storybook/addon-docs',
      options: {
        transcludeMarkdown: true,
        mdxCompileOptions: {
          providerImportSource: '@mdx-js/react',
        },
      },
    },
  ],

  framework: {
    name: '@storybook/react-vite',
    options: {}, // Let Storybook handle the Vite config
  },

  core: {
    disableTelemetry: true,
    enableCrashReports: false,
  },

  viteFinal: async config => {
    // Path resolution - keeping your exact aliases
    config.resolve = config.resolve || {}
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, '../../../packages/ui/src'),
      '@/components': path.resolve(
        __dirname,
        '../../../packages/ui/src/components'
      ),
      '@/lib': path.resolve(__dirname, '../../../packages/ui/src/lib'),
      '@/utils': path.resolve(__dirname, '../../../packages/ui/src/utils'),
      '@/styles': path.resolve(__dirname, '../../../packages/ui/src/styles'),
      '@/types': path.resolve(__dirname, '../../../packages/types/src'),
    }

    // Environment variables
    const env = loadEnv('', process.cwd(), '')
    config.define = {
      ...config.define,
      ...Object.keys(env).reduce((prev, key) => {
        prev[`process.env.${key}`] = JSON.stringify(env[key])
        return prev
      }, {}),
    }

    // PostCSS configuration for Tailwind
    config.css = config.css || {}
    config.css.postcss = {
      plugins: [
        require('postcss-import'),
        require('postcss-nesting'),
        require('autoprefixer'),
        require('tailwindcss')({
          ...tailwindConfig,
          content: [
            ...(Array.isArray(tailwindConfig.content)
              ? tailwindConfig.content
              : []),
            './.storybook/**/*.{js,ts,jsx,tsx}',
          ],
        }),
      ],
    }

    // CSS preprocessing options
    config.css.preprocessorOptions = {
      scss: {
        charset: false,
      },
    }

    // Enable CSS source maps in development
    config.css.devSourcemap = true

    // Add WebSocket configuration
    config.server = {
      ...config.server,
      hmr: {
        port: 6006,
        protocol: 'ws',
        host: 'localhost',
        clientPort: 6006,
      },
    }

    // Add specific Vite config for MDX
    config.optimizeDeps = {
      ...config.optimizeDeps,
      include: [
        ...(config.optimizeDeps?.include ?? []),
        '@mdx-js/react',
        '@storybook/addon-docs > @mdx-js/react',
      ],
    }

    // Add React plugin
    config.plugins = [
      react(),
      ...(config.plugins || []),
      {
        name: 'mdx-fix',
        enforce: 'pre',
        transform(code, id) {
          if (!id.endsWith('.mdx')) return null
          // Handle MDX files as raw content initially
          return {
            code: `export default ${JSON.stringify(code)}`,
            map: null,
          }
        },
      },
    ]

    return config
  },
}

export default config

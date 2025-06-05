import type { StorybookConfig } from '@storybook/react-vite';
import path from 'path';

const config: StorybookConfig = {
  stories: [
    // Default stories path if any from init (we might remove these later)
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    // Path to your UI package stories
    '../../packages/ui/src/**/*.stories.mdx',
    '../../packages/ui/src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials', // Includes controls, actions, backgrounds, etc.
    '@storybook/addon-interactions', // For play functions and testing interactions
    '@storybook/addon-styling-webpack', // Handles PostCSS, Tailwind
    '@storybook/addon-a11y', // Added accessibility addon
    // Vite specific setup might eventually replace addon-styling-webpack or work with it.
    // For now, addon-styling-webpack is a common way to get PostCSS/Tailwind.
    // We may need to add vite-specific styling setup if this doesn't work out of the box.
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag', // Enables automatic documentation generation
  },
  typescript: {
    // Optional: Enables more type checking within Storybook
    // check: true, 
  },
  async viteFinal(config, { configType }) {
    // Customize the Vite config here
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        // Add aliases if your UI package uses them internally for imports,
        // and they need to be resolved within Storybook.
        // Example: assuming packages/ui/tsconfig.json has baseUrl: "." and paths: {"@/*": ["./src/*"]}
        '@/components': path.resolve(__dirname, '../../packages/ui/src/components'),
        '@/lib': path.resolve(__dirname, '../../packages/ui/src/lib'),
        '@/styles': path.resolve(__dirname, '../../packages/ui/src/styles'),
        // Alias for @portals/ui itself if needed for some story imports
        '@portals/ui': path.resolve(__dirname, '../../packages/ui/src'),
      };
    }
    return config;
  },
};
export default config; 
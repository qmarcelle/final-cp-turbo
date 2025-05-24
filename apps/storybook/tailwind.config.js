// apps/storybook/tailwind.config.js
const uiTailwindConfig = require('../../packages/ui/tailwind.config.base.js'); // Adjust path if needed

module.exports = {
  // Presets from your UI package's Tailwind config
  presets: [uiTailwindConfig],
  // Content paths for Storybook to scan, including your UI package and local stories if any
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}', // Storybook app's own stories/components if any
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}', // Crucial: path to your UI components
  ],
  // You can add other Storybook-specific Tailwind customizations here if needed
  theme: {
    extend: {},
  },
  plugins: [],
}; 
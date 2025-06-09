/** @type {import('tailwindcss').Config} */
module.exports = {
  // Extend from the UI package's Tailwind config
  presets: [require('../../packages/ui/tailwind.config.cjs')],

  content: [
    // Include all stories and storybook files
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './.storybook/**/*.{js,ts,jsx,tsx,mdx}',
    // Include all UI package components and stories
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}',
    // Include specific packages that use Tailwind (avoid node_modules)
    '../../packages/ui/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/api-client/src/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/auth/src/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/testing/src/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/types/src/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/utils/src/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/visibility/src/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/visibility-core/src/**/*.{js,ts,jsx,tsx,mdx}',
    // Include specific app files
    '../../apps/broker-portal/src/**/*.{js,ts,jsx,tsx,mdx}',
    '../../apps/employer-portal/src/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  theme: {
    extend: {
      // Any Storybook-specific overrides can go here
    },
  },
}

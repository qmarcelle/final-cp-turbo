const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    '../../apps/storybook/.storybook/**/*.{js,ts,jsx,tsx}',
    '../../apps/storybook/src/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/lib/**/*.{js,ts,jsx,tsx}',
    './src/styles/**/*.css',
    '../../apps/broker-portal/src/**/*.{js,ts,jsx,tsx}',
    '../../apps/employer-portal/src/**/*.{js,ts,jsx,tsx}',
    '../../apps/storybook/src/**/*.{js,ts,jsx,tsx}',
    '!**/node_modules/**',
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  safelist: [
    // Primary colors
    'text-primary-blue',
    'bg-primary-blue',
    'border-primary-blue',
    'text-primary-blue-inactive',
    'bg-primary-blue-inactive',
    'border-primary-blue-inactive',

    // Secondary colors
    'text-secondary-blue1',
    'bg-secondary-blue1',
    'border-secondary-blue1',
    'text-secondary-blue2',
    'bg-secondary-blue2',
    'border-secondary-blue2',
    'text-secondary-blue3',
    'bg-secondary-blue3',
    'border-secondary-blue3',

    // Status colors
    'text-status-error',
    'bg-status-error',
    'border-status-error',
    'text-status-success',
    'bg-status-success',
    'border-status-success',
    'text-status-warning',
    'bg-status-warning',
    'border-status-warning',

    // Label colors
    'text-label-success',
    'bg-label-success',
    'border-label-success',
    'text-label-error',
    'bg-label-error',
    'border-label-error',
    'text-label-warning',
    'bg-label-warning',
    'border-label-warning',
    'text-label-neutral',
    'bg-label-neutral',
    'border-label-neutral',

    // Gray scale
    'text-tertiary-gray1',
    'bg-tertiary-gray1',
    'border-tertiary-gray1',
    'text-tertiary-gray3',
    'bg-tertiary-gray3',
    'border-tertiary-gray3',
    'text-tertiary-gray4',
    'bg-tertiary-gray4',
    'border-tertiary-gray4',
    'text-tertiary-gray5',
    'bg-tertiary-gray5',
    'border-tertiary-gray5',
    'text-tertiary-gray6',
    'bg-tertiary-gray6',
    'border-tertiary-gray6',
  ],
  theme: {
    extend: {
      colors: {
        'primary-blue': 'var(--color-primary-blue)',
        'primary-blue-inactive': 'var(--color-primary-blue-inactive)',
        'secondary-blue1': 'var(--color-secondary-blue-1)',
        'secondary-blue1-accent': 'var(--color-secondary-blue-1-accent)',
        'secondary-blue2': 'var(--color-secondary-blue-2)',
        'secondary-blue3': 'var(--color-secondary-blue-3)',
        'secondary-blue3-accent': 'var(--color-secondary-blue-3-accent)',
        'tertiary-gray1': 'var(--color-tertiary-gray-1)',
        'tertiary-gray3': 'var(--color-tertiary-gray-3)',
        'tertiary-gray4': 'var(--color-tertiary-gray-4)',
        'tertiary-gray5': 'var(--color-tertiary-gray-5)',
        'tertiary-gray6': 'var(--color-tertiary-gray-6)',
        'status-error': 'var(--color-status-error)',
        'status-success': 'var(--color-status-success)',
        'status-warning': 'var(--color-status-warning)',
        'label-success': 'var(--color-label-success)',
        'label-error': 'var(--color-label-error)',
        'label-warning': 'var(--color-label-warning)',
        'label-neutral': 'var(--color-label-neutral)',
        white: 'var(--color-white)',
        black: 'var(--color-black)',

        primary: {
          DEFAULT: 'var(--color-primary-blue)',
          foreground: 'var(--color-white)',
        },
        secondary: {
          DEFAULT: 'var(--color-secondary-blue-1)',
          foreground: 'var(--color-tertiary-gray-1)',
        },
        muted: {
          DEFAULT: 'var(--color-tertiary-gray-5)',
          foreground: 'var(--color-tertiary-gray-3)',
        },
        accent: {
          DEFAULT: 'var(--color-secondary-blue-1-accent)',
          foreground: 'var(--color-primary-blue)',
        },
        destructive: {
          DEFAULT: 'var(--color-status-error)',
          foreground: 'var(--color-white)',
        },
        border: 'var(--color-tertiary-gray-4)',
        input: 'var(--color-white)',
        ring: 'var(--color-primary-blue)',
        background: 'var(--color-tertiary-gray-6)',
        foreground: 'var(--color-tertiary-gray-1)',
      },
      fontFamily: {
        light: 'var(--font-family-light)',
        regular: 'var(--font-family-regular)',
        bold: 'var(--font-family-bold)',
        sans: [
          'var(--font-family-regular)',
          'Arial',
          'system-ui',
          'sans-serif',
        ],
      },
      spacing: {
        xxs: 'var(--spacing-xxs)',
        xs: 'var(--spacing-xs)',
        sm: 'var(--spacing-sm)',
        md: 'var(--spacing-md)',
        lg: 'var(--spacing-lg)',
        xl: 'var(--spacing-xl)',
        xxl: 'var(--spacing-xxl)',
        xxxl: 'var(--spacing-xxxl)',
      },
      maxWidth: {
        'screen-sm': '608px',
      },
      boxShadow: {
        elevated: 'var(--shadow-elevated)',
        card: 'var(--shadow-card)',
        'focus-blue': 'var(--shadow-focus-blue)',
      },
      zIndex: {
        dropdown: 'var(--z-dropdown)',
        modal: 'var(--z-modal)',
        tooltip: 'var(--z-tooltip)',
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.form-input': {
          '@apply w-full px-3 py-2 border rounded-md transition-colors': {},
          'border-color': 'var(--color-tertiary-gray-3)',
          outline: 'none',
          '&:hover': {
            'border-color': 'var(--color-primary-blue)',
          },
          '&:focus': {
            'border-color': 'var(--color-primary-blue)',
            'box-shadow': 'var(--shadow-focus-blue)',
          },
          '&.error': {
            'border-color': 'var(--color-status-error)',
          },
          '&.error:focus': {
            'border-color': 'var(--color-status-error)',
            'box-shadow': '0px 0px 0px 3px rgba(235, 0, 27, 0.4)',
          },
          '&:disabled': {
            'background-color': 'var(--color-tertiary-gray-5)',
            cursor: 'not-allowed',
            opacity: '0.5',
          },
        },
      })
    }),
  ],
}

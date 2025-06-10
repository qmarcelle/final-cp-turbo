const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/lib/**/*.{js,ts,jsx,tsx}',
    './src/styles/**/*.css',
    '../../apps/broker-portal/src/**/*.{js,ts,jsx,tsx}',
    '../../apps/employer-portal/src/**/*.{js,ts,jsx,tsx}',
    '../../apps/storybook/src/**/*.{js,ts,jsx,tsx}',
    '!**/node_modules/**',
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
        sans: ['var(--font-family-regular)', 'Arial', 'system-ui', 'sans-serif'],
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
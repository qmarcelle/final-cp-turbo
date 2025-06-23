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

        // Design system semantic colors
        primaryBlue: 'var(--color-primary-blue)',
        secondaryBlue2: 'var(--color-secondary-blue-2)',
        
        background: 'var(--color-background)',
        foreground: 'var(--color-foreground)',
        card: {
          DEFAULT: 'var(--color-card)',
          foreground: 'var(--color-card-foreground)',
        },
        popover: {
          DEFAULT: 'var(--color-popover)',
          foreground: 'var(--color-popover-foreground)',
        },
        border: 'var(--color-border)',
        input: 'var(--color-input)',
        focus: 'var(--color-focus)',
        'focus-visible': 'var(--color-focus-visible)',
        primary: {
          DEFAULT: 'var(--color-primary-blue)',
          foreground: 'var(--color-white)',
        },
        secondary: {
          DEFAULT: 'var(--color-secondary-blue-1)',
          foreground: 'var(--color-tertiary-gray-1)',
        },
        muted: {
          DEFAULT: 'var(--color-muted)',
          foreground: 'var(--color-muted-foreground)',
        },
        accent: {
          DEFAULT: 'var(--color-accent)',
          foreground: 'var(--color-accent-foreground)',
        },
        destructive: {
          DEFAULT: 'var(--color-status-error)',
          foreground: 'var(--color-white)',
        },
        ring: 'var(--color-primary-blue)',
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
        'nav-gap': 'var(--nav-gap)',
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
        negative: 'var(--z-negative)',
        0: 'var(--z-0)',
        10: 'var(--z-10)',
        20: 'var(--z-20)',
        30: 'var(--z-30)',
        40: 'var(--z-40)',
        50: 'var(--z-50)',
        popover: 'var(--z-popover)',
        navigation: 'var(--z-navigation)',
        overlay: 'var(--z-overlay)',
        toast: 'var(--z-toast)',
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'slide-down': 'slide-down 0.2s ease-out',
        'slide-up': 'slide-up 0.2s ease-out',
        'fade-in': 'fade-in 0.2s ease-out',
        'fade-out': 'fade-out 0.2s ease-out',
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
        'slide-down': {
          from: { height: '0', opacity: '0' },
          to: { height: 'var(--radix-navigation-menu-content-height)', opacity: '1' },
        },
        'slide-up': {
          from: { height: 'var(--radix-navigation-menu-content-height)', opacity: '1' },
          to: { height: '0', opacity: '0' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'fade-out': {
          from: { opacity: '1' },
          to: { opacity: '0' },
        },
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        full: 'var(--radius-full)',
      },
      transitionDuration: {
        fast: 'var(--duration-fast)',
        normal: 'var(--duration-normal)',
        slow: 'var(--duration-slow)',
      },
      transitionTimingFunction: {
        'ease-in-out': 'var(--ease-in-out)',
        'ease-out': 'var(--ease-out)',
        'ease-in': 'var(--ease-in)',
      },
      height: {
        nav: 'var(--nav-height)',
        'nav-mobile': 'var(--nav-height-mobile)',
        'nav-item': 'var(--nav-item-height)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class',
    }),
    require('@tailwindcss/typography'),
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.form-input': {
          '@apply w-full px-3 py-2 border rounded-md transition-colors': {},
          'border-color': 'var(--color-border)',
          outline: 'none',
          '&:hover': {
            'border-color': 'var(--color-focus)',
          },
          '&:focus': {
            'border-color': 'var(--color-focus)',
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
            'background-color': 'var(--color-muted)',
            cursor: 'not-allowed',
            opacity: 'var(--state-disabled-opacity)',
          },
        },
        '.focus-ring': {
          '@apply focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2': {},
        },
      });
    }),
  ],
}
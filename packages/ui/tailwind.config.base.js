const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/components/foundation/**/*.{js,ts,jsx,tsx}',
    './.storybook/**/*.{js,ts,jsx,tsx}',
    './src/components/foundation/**/*.stories.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      mobile: { min: '0px', max: '767px' },
      sm: { min: '768px', max: '1023px' },
      md: { min: '1024px', max: '1439px' },
      lg: { min: '1440px' },
    },
    extend: {
      colors: {
        // Design System Colors
        primaryBlue: '#005EB9',
        primaryBlueInactive: '#7FAEDC',
        secondaryBlue1: '#5DC1FD',
        secondaryBlue1Accent: '#E7F6FF',
        secondaryBlue2: '#00497E',
        secondaryBlue3: '#067DAC',
        secondaryBlue3Accent: '#008CC9',
        tertiaryGray1: '#333333',
        tertiaryGray3: '#737373',
        tertiaryGray4: '#CCCCCC',
        tertiaryGray5: '#F2F2F2',
        tertiaryGray6: '#FAFAFA',
        statusError: '#EB001B',
        statusSuccess: '#508316',
        labelSuccess: '#E2F0D3',
        labelError: '#EFDDDF',
        labelNeutral: '#F2F2F2',
        white: '#FFFFFF',
        black: '#000000',

        // New shadcn/ui CSS variable colors
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        
        // Legacy brand colors (keep for backward compatibility)
        'primary-legacy': '#0066CC',
        'primary-dark': '#0052A3',
        surface: '#FFFFFF',
        'background-legacy': '#F9FAFB',
        'muted-legacy': '#6B7280',
        'border-legacy': '#E5E7EB',
        'brand-primary': '#005CAB',
        'brand-secondary': '#0072CE',
        'text-primary': '#111827',
        'text-secondary': '#4B5563',
        'text-muted': '#9ca3af',
        footer: '#1F2937',
        'bcbst-blue': '#1e40af',
        'nav-blue': '#2563eb',
        'link-blue': '#3b82f6',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Montserrat', 'sans-serif'],
        light: 'Univers-45',
        regular: 'Univers-55',
        bold: 'Univers-65',
      },
      fontSize: {
        title1: ['40px', '3rem'],
        'title1-mobile': ['32px', '2.5rem'],
        title2: ['24px', '2rem'],
        title3: ['20px', '1.75rem'],
        body1: ['16px', '1.5rem'],
        body2: ['12px', '1rem'],
      },
      borderRadius: {
        lg: '16px',
        md: '8px',
        sm: '4px',
        none: '0px',
        full: '9999px',
        base: '0.375rem',
      },
      boxShadow: {
        sm: '0px 1px 4px rgba(0, 73, 126, 0.24)',
        md: '0px 1px 8px rgba(0, 73, 126, 0.16)',
        lg: '0px 1px 16px rgba(0, 73, 126, 0.32)',
        elevated: '0px 1px 4px rgba(0, 73, 126, 0.24), 0px 1px 8px rgba(0, 73, 126, 0.16)',
      },
      spacing: {
        page: '1.5rem',
        'sidebar-width': '16rem',
        'header-height': '4rem',
        'sidebar-sm': '16rem',
        'sidebar-md': '20rem',
        'container-max': '80rem',
        'height-nav': '3.5rem',
        'height-logo': '2.5rem',
        xxs: '4px',
        xs: '8px',
        sm: '12px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        xxl: '48px',
        xxxl: '64px',
      },
      transitionDuration: {
        fast: '120ms',
        normal: '300ms',
        slow: '500ms',
      },
      transitionTimingFunction: {
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      zIndex: {
        base: '0',
        dropdown: '10',
        sticky: '20',
        modal: '999999999',
        tooltip: '999999999',
        notification: '9999',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.layout-container': { '@apply min-h-screen flex flex-col': {} },
        '.card-base': { '@apply bg-white rounded-lg shadow-sm p-6': {} },
        '.card-elevated': { '@apply bg-white rounded-lg shadow-lg p-8': {} },
        '.page-header': {
          '@apply bg-white shadow-sm p-6 flex justify-between items-center': {},
        },
        '.flex-center': {
          '@apply flex items-center justify-center': {},
        },
        '.text-muted': { '@apply text-sm text-gray-600': {} },
        '.btn-base': {
          '@apply inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed':
            {},
        },
        '.form-input': {
          '@apply rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20':
            {},
        },
        '.layout-wrapper': { '@apply min-h-screen flex flex-col': {} },
        '.main-content': { '@apply flex-1 bg-gray-50': {} },
        '.page-container': { '@apply container mx-auto px-8 py-4': {} },
        '.sidebar-base': { '@apply bg-white border-r p-6': {} },
        '.content-padding': { '@apply flex-1 p-6': {} },
        '.header-section': { '@apply bg-white border-b': {} },
        '.member-info': { '@apply flex items-center gap-4': {} },
        '.section-divider': { '@apply bg-white border-b border-gray-200': {} },
        '.footer-text': { '@apply text-sm text-gray-600': {} },
        '.nav-bar': { '@apply bg-blue-600 text-white': {} },
      })
    }),
  ],
}

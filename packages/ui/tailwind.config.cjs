/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}",
    "../../apps/**/src/**/*.{js,ts,jsx,tsx,mdx}",
    "!**/node_modules/**",
    "!**/dist/**",
    "!**/build/**"
  ],
  theme: {
    extend: {
      // Design System Colors - Using CSS Custom Properties from globals.css
      colors: {
        // Primary Colors - matching component usage (both naming conventions)
        'primary-blue': 'var(--color-primary-blue)',
        'primary-blue-inactive': 'var(--color-primary-blue-inactive)',
        // Legacy camelCase naming for compatibility
        'primaryBlue': 'var(--color-primary-blue)',
        'primaryBlueInactive': 'var(--color-primary-blue-inactive)',
        
        // Secondary Colors - matching component usage (both naming conventions)
        'secondary-blue1': 'var(--color-secondary-blue-1)',
        'secondary-blue1-accent': 'var(--color-secondary-blue-1-accent)',
        'secondary-blue2': 'var(--color-secondary-blue-2)',
        'secondary-blue3': 'var(--color-secondary-blue-3)',
        'secondary-blue3-accent': 'var(--color-secondary-blue-3-accent)',
        // Legacy camelCase naming for compatibility
        'secondaryBlue1': 'var(--color-secondary-blue-1)',
        'secondaryBlue1Accent': 'var(--color-secondary-blue-1-accent)',
        'secondaryBlue2': 'var(--color-secondary-blue-2)',
        'secondaryBlue3': 'var(--color-secondary-blue-3)',
        'secondaryBlue3Accent': 'var(--color-secondary-blue-3-accent)',
        
        // Tertiary Colors (Grays) - matching component usage (both naming conventions)
        'tertiary-gray1': 'var(--color-tertiary-gray-1)',
        'tertiary-gray3': 'var(--color-tertiary-gray-3)',
        'tertiary-gray4': 'var(--color-tertiary-gray-4)',
        'tertiary-gray5': 'var(--color-tertiary-gray-5)',
        'tertiary-gray6': 'var(--color-tertiary-gray-6)',
        // Legacy camelCase naming for compatibility
        'tertiaryGray1': 'var(--color-tertiary-gray-1)',
        'tertiaryGray3': 'var(--color-tertiary-gray-3)',
        'tertiaryGray4': 'var(--color-tertiary-gray-4)',
        'tertiaryGray5': 'var(--color-tertiary-gray-5)',
        'tertiaryGray6': 'var(--color-tertiary-gray-6)',
        
        // Status Colors - matching component usage (both naming conventions)
        'status-error': 'var(--color-status-error)',
        'status-success': 'var(--color-status-success)',
        // Legacy camelCase naming for compatibility
        'statusError': 'var(--color-status-error)',
        'statusSuccess': 'var(--color-status-success)',
        
        // Label Colors - matching component usage (both naming conventions)
        'label-success': 'var(--color-label-success)',
        'label-error': 'var(--color-label-error)',
        'label-neutral': 'var(--color-label-neutral)',
        // Legacy camelCase naming for compatibility
        'labelSuccess': 'var(--color-label-success)',
        'labelError': 'var(--color-label-error)',
        'labelNeutral': 'var(--color-label-neutral)',
        
        // Base Colors
        white: 'var(--color-white)',
        black: 'var(--color-black)',
        
        // Standard aliases for compatibility
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
      
      // Typography using CSS custom properties
      fontFamily: {
        'light': 'var(--font-family-light)',
        'regular': 'var(--font-family-regular)',
        'bold': 'var(--font-family-bold)',
        sans: ['var(--font-family-regular)', 'Arial', 'system-ui', 'sans-serif'],
      },
      
      // Spacing using CSS custom properties
      spacing: {
        'xxs': 'var(--spacing-xxs)',
        'xs': 'var(--spacing-xs)',
        'sm': 'var(--spacing-sm)',
        'md': 'var(--spacing-md)',
        'lg': 'var(--spacing-lg)',
        'xl': 'var(--spacing-xl)',
        'xxl': 'var(--spacing-xxl)',
        'xxxl': 'var(--spacing-xxxl)',
      },
      
      // Box shadows using CSS custom properties
      boxShadow: {
        'elevated': 'var(--shadow-elevated)',
        'card': 'var(--shadow-card)',
        'focus-blue': 'var(--shadow-focus-blue)',
      },
      
      // Z-index layers using CSS custom properties
      zIndex: {
        'dropdown': 'var(--z-dropdown)',
        'modal': 'var(--z-modal)',
        'tooltip': 'var(--z-tooltip)',
      },
      
      // Responsive breakpoints
      screens: {
        'mobile': { 'max': '767px' },
        'small': { 'min': '768px', 'max': '1023px' },
        'medium': { 'min': '1024px', 'max': '1439px' },
        'large': { 'min': '1440px' },
        // Standard Tailwind breakpoints for compatibility
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      
      // Animation and transitions
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.2s ease-in-out',
        'slide-in': 'slide-in 0.3s ease-out',
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
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'slide-in': {
          from: { transform: 'translateX(-100%)' },
          to: { transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    // Custom plugin for component utilities
    // eslint-disable-next-line no-unused-vars
    function({ addUtilities, addComponents, theme }) {
      // Custom utilities for design system
      const utilities = {
        '.text-primary': {
          color: 'var(--color-primary-blue)',
        },
        '.text-secondary': {
          color: 'var(--color-secondary-blue-2)',
        },
        '.text-tertiary': {
          color: 'var(--color-tertiary-gray-3)',
        },
        '.bg-brand-gradient': {
          background: 'radial-gradient(ellipse farthest-corner at right top, #5dc1fd 0%, transparent 60%), linear-gradient(245deg, #067dac 0%, #00497e 70%)',
        },
        '.shadow-focus-blue': {
          boxShadow: 'var(--shadow-focus-blue)',
        },
      };

      // Component styles that work with our design system
      const components = {
        // Button base styles
        '.btn': {
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '0.25rem',
          fontFamily: 'var(--font-family-bold)',
          transition: 'all 0.3s ease-in-out',
          '&:focus': {
            outline: 'none',
            boxShadow: 'var(--shadow-focus-blue)',
          },
          '&:disabled': {
            opacity: '0.5',
            cursor: 'not-allowed',
          },
        },
        
        // Primary button
        '.btn-primary': {
          padding: '8px',
          backgroundColor: 'var(--color-primary-blue)',
          color: 'var(--color-white)',
          '&:hover': {
            backgroundColor: 'var(--color-secondary-blue-2)',
            textDecoration: 'underline solid white',
          },
          '&:focus': {
            backgroundColor: 'var(--color-secondary-blue-2)',
            textDecoration: 'underline solid white',
          },
        },
        
        // Secondary button
        '.btn-secondary': {
          padding: '8px',
          border: '1px solid var(--color-primary-blue)',
          backgroundColor: 'transparent',
          color: 'var(--color-primary-blue)',
          '&:hover': {
            backgroundColor: 'var(--color-secondary-blue-2)',
            color: 'var(--color-white)',
            textDecoration: 'underline solid white',
          },
          '&:focus': {
            backgroundColor: 'var(--color-secondary-blue-2)',
            color: 'var(--color-white)',
            textDecoration: 'underline solid white',
          },
        },
        
        // Form controls
        '.form-control': {
          display: 'flex',
          flexDirection: 'column',
        },
        
        '.form-label': {
          fontSize: '0.875rem',
          fontWeight: '500',
          color: 'var(--color-tertiary-gray-1)',
          marginBottom: '0.25rem',
          
          '&.required::after': {
            content: '" *"',
            color: 'var(--color-status-error)',
          },
        },
        
        '.form-input': {
          width: '100%',
          padding: '0.5rem 0.75rem',
          border: '1px solid var(--color-tertiary-gray-3)',
          borderRadius: '0.25rem',
          fontSize: '1rem',
          outline: 'none',
          
          '&:hover': {
            borderColor: 'var(--color-primary-blue)',
          },
          
          '&:focus': {
            borderColor: 'var(--color-primary-blue)',
            boxShadow: 'var(--shadow-focus-blue)',
          },
          
          '&.error': {
            borderColor: 'var(--color-status-error)',
            '&:focus': {
              borderColor: 'var(--color-status-error)',
              boxShadow: '0px 0px 0px 3px rgba(235, 0, 27, 0.4)',
            },
          },
          
          '&:disabled': {
            backgroundColor: 'var(--color-tertiary-gray-5)',
            cursor: 'not-allowed',
            opacity: '0.5',
          },
        },
        
        '.form-error': {
          fontSize: '0.875rem',
          color: 'var(--color-status-error)',
          marginTop: '0.25rem',
        },
        
        '.form-hint': {
          fontSize: '0.875rem',
          color: 'var(--color-tertiary-gray-3)',
          marginTop: '0.25rem',
        },
      };

      addUtilities(utilities);
      addComponents(components);
    },
  ],
};
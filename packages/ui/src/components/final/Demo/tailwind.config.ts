import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/components/final/Demo/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Primary Colors - BCBST Blue System
        'primary-blue': 'var(--color-primary-blue)',
        'primary-blue-inactive': 'var(--color-primary-blue-inactive)',

        // Secondary Colors
        'secondary-blue-1': 'var(--color-secondary-blue-1)',
        'secondary-blue-1-accent': 'var(--color-secondary-blue-1-accent)',
        'secondary-blue-2': 'var(--color-secondary-blue-2)',
        'secondary-blue-3': 'var(--color-secondary-blue-3)',
        'secondary-blue-3-accent': 'var(--color-secondary-blue-3-accent)',

        // Tertiary Colors (Grays)
        'tertiary-gray': {
          1: 'var(--color-tertiary-gray-1)',
          3: 'var(--color-tertiary-gray-3)',
          4: 'var(--color-tertiary-gray-4)',
          5: 'var(--color-tertiary-gray-5)',
          6: 'var(--color-tertiary-gray-6)',
        },

        // Label Colors
        label: {
          success: 'var(--color-label-success)',
          error: 'var(--color-label-error)',
          warning: 'var(--color-label-warning)',
          neutral: 'var(--color-label-neutral)',
        },

        // Status Colors (Legacy)
        status: {
          error: 'var(--color-status-error)',
          success: 'var(--color-status-success)',
          warning: 'var(--color-status-warning)',
        },

        // Core Modern Design System Colors
        primary: {
          DEFAULT: 'var(--primary)',
          focus: 'var(--primary-focus)',
          light: 'var(--primary-light)',
          ring: 'var(--primary-ring)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          focus: 'var(--secondary-focus)',
          light: 'var(--secondary-light)',
          ring: 'var(--secondary-ring)',
        },

        // Status Colors (Modern)
        success: {
          DEFAULT: 'var(--success)',
          focus: 'var(--success-focus)',
          light: 'var(--success-light)',
          ring: 'var(--success-ring)',
        },
        warning: {
          DEFAULT: 'var(--warning)',
          focus: 'var(--warning-focus)',
          light: 'var(--warning-light)',
          ring: 'var(--warning-ring)',
        },
        error: {
          DEFAULT: 'var(--error)',
          focus: 'var(--error-focus)',
          light: 'var(--error-light)',
          ring: 'var(--error-ring)',
        },
        info: {
          DEFAULT: 'var(--info)',
          focus: 'var(--info-focus)',
          light: 'var(--info-light)',
          ring: 'var(--info-ring)',
        },

        // Base Colors
        white: 'var(--color-white)',
        black: 'var(--color-black)',

        // Component-specific colors
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
        },
        popover: {
          DEFAULT: 'var(--popover)',
          foreground: 'var(--popover-foreground)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
        },
      },
      fontFamily: {
        sans: ['var(--font-family-regular)', 'Arial', 'sans-serif'],
        light: ['var(--font-family-light)', 'Arial', 'sans-serif'],
        bold: ['var(--font-family-bold)', 'Arial', 'sans-serif'],
      },
      fontSize: {
        xs: 'var(--font-size-xs)',
        sm: 'var(--font-size-sm)',
        base: 'var(--font-size-base)',
        lg: 'var(--font-size-lg)',
        xl: 'var(--font-size-xl)',
        '2xl': 'var(--font-size-2xl)',
        '3xl': 'var(--font-size-3xl)',
        '4xl': 'var(--font-size-4xl)',
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
      borderRadius: {
        none: 'var(--radius-none)',
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)',
        '3xl': 'var(--radius-3xl)',
        full: 'var(--radius-full)',
      },
      boxShadow: {
        elevated: 'var(--shadow-elevated)',
        card: 'var(--shadow-card)',
        'focus-blue': 'var(--shadow-focus-blue)',
        xs: 'var(--shadow-xs)',
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        xl: 'var(--shadow-xl)',
        '2xl': 'var(--shadow-2xl)',
        inner: 'var(--shadow-inner)',
        outline: 'var(--shadow-outline)',
      },
      transitionDuration: {
        fastest: 'var(--transition-fastest)',
        fast: 'var(--transition-fast)',
        normal: 'var(--transition-normal)',
        slow: 'var(--transition-slow)',
        slowest: 'var(--transition-slowest)',
      },
      transitionTimingFunction: {
        linear: 'var(--ease-linear)',
        in: 'var(--ease-in)',
        out: 'var(--ease-out)',
        'in-out': 'var(--ease-in-out)',
        bounce: 'var(--ease-bounce)',
      },
      zIndex: {
        base: 'var(--z-base)',
        dropdown: 'var(--z-dropdown)',
        sticky: 'var(--z-sticky)',
        fixed: 'var(--z-fixed)',
        'modal-backdrop': 'var(--z-modal-backdrop)',
        modal: 'var(--z-modal)',
        popover: 'var(--z-popover)',
        tooltip: 'var(--z-tooltip)',
      },
      screens: {
        xs: 'var(--breakpoint-xs)',
        sm: 'var(--breakpoint-sm)',
        md: 'var(--breakpoint-md)',
        lg: 'var(--breakpoint-lg)',
        xl: 'var(--breakpoint-xl)',
        '2xl': 'var(--breakpoint-2xl)',
      },
      // Component-specific variants
      variants: {
        alert: {
          info: {
            bg: 'bg-info-light dark:bg-info-dark/20',
            text: 'text-info-dark dark:text-info-light',
            border: 'border-info dark:border-info-dark',
          },
          success: {
            bg: 'bg-success-light dark:bg-success-dark/20',
            text: 'text-success-dark dark:text-success-light',
            border: 'border-success dark:border-success-dark',
          },
          warning: {
            bg: 'bg-warning-light dark:bg-warning-dark/20',
            text: 'text-warning-dark dark:text-warning-light',
            border: 'border-warning dark:border-warning-dark',
          },
          error: {
            bg: 'bg-error-light dark:bg-error-dark/20',
            text: 'text-error-dark dark:text-error-light',
            border: 'border-error dark:border-error-dark',
          },
        },
        badge: {
          default: 'badge-primary',
          secondary: 'badge-secondary',
          success: 'badge-success',
          warning: 'badge-warning',
          error: 'badge-error',
          outline:
            'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
          ghost: 'hover:bg-accent hover:text-accent-foreground',
          pending: 'bg-labelNeutral text-tertiaryGray1',
          processed: 'bg-labelSuccess text-statusSuccess',
          denied: 'bg-labelError text-statusError',
          approved: 'bg-labelSuccess text-statusSuccess',
          'partial-approval': 'bg-secondaryBlue1Accent text-primaryBlue',
        },
        button: {
          primary: 'btn-primary',
          secondary: 'btn-secondary',
          success: 'btn-success',
          warning: 'btn-warning',
          error: 'btn-error',
          destructive: 'btn-error',
          outline: 'btn-outline',
          ghost: 'btn-ghost',
          link: 'btn-link',
          default: 'btn-primary',
        },
        card: {
          default: 'bg-white border-input',
          outline: 'border-2',
          filled: 'bg-muted',
          accent: 'border-l-4 border-l-primary',
          info: 'border-blue-200 bg-blue-50 text-blue-900',
          warning: 'border-yellow-200 bg-yellow-50 text-yellow-900',
          error: 'border-red-200 bg-red-50 text-red-900',
          success: 'border-green-200 bg-green-50 text-green-900',
          elevated: 'bg-white border shadow-md',
          highlight: 'bg-secondary-blue1-accent border-transparent',
          neutral: 'bg-black/5 border-transparent',
        },
      },
    },
  },
  plugins: [],
}

export default config

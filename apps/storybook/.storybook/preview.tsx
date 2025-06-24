import type { Preview } from '@storybook/react'
import { withThemeByDataAttribute } from '@storybook/addon-themes'
import React from 'react'

// CSS imports - maintaining your exact order
import '../../../packages/ui/src/components/final/Demo/styles/design-system-tokens.css'
import '../../../packages/ui/src/styles/globals.css'
import '../../../packages/ui/src/components/final/Demo/styles/design-system-components.css'
import './storybook.css'

// Next.js polyfill
if (typeof globalThis !== 'undefined' && !globalThis.process) {
  globalThis.process = { env: { NODE_ENV: 'development' } } as any
}

const preview: Preview = {
  parameters: {
    // Layout configuration - centers components in canvas
    layout: 'centered', // Options: 'centered', 'fullscreen', 'padded' (default)

    // Docs configuration - using default container
    docs: {
      // Theme is handled by addon-themes
    },

    // Background configuration
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#FFFFFF' },
        { name: 'dark', value: '#111827' },
        { name: 'gray', value: '#F3F4F6' },
      ],
    },

    // Actions configuration - captures component events
    actions: {
      argTypesRegex: /^on[A-Z].*/, // RegExp, not string!
    },

    // Controls configuration - better prop editing experience
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
      expanded: true, // Shows all controls expanded by default
    },

    // Story sorting for better navigation
    options: {
      storySort: {
        method: 'alphabetical',
        order: [
          'Design System',
          [
            'Overview',
            'Foundation',
            'Atoms',
            'Molecules',
            'Organisms',
            'Templates',
            'Pages',
          ],
          '*',
        ],
      },
    },

    // Accessibility addon configuration
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true,
          },
          {
            id: 'autocomplete-valid',
            enabled: false,
          },
        ],
      },
    },

    // Viewport addon configuration
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: {
            width: '375px',
            height: '667px',
          },
        },
        tablet: {
          name: 'Tablet',
          styles: {
            width: '768px',
            height: '1024px',
          },
        },
        desktop: {
          name: 'Desktop',
          styles: {
            width: '1440px',
            height: '900px',
          },
        },
      },
    },
  },

  // Decorators wrap every story
  decorators: [
    // Theme switching decorator
    withThemeByDataAttribute({
      themes: {
        light: 'light',
        dark: 'dark',
      },
      defaultTheme: 'light',
      attributeName: 'data-theme',
    }) as any, // Type assertion to avoid decorator type issues

    // Global wrapper for consistent spacing/styling
    (Story: any) => (
      <div style={{ padding: '1rem' }}>
        <Story />
      </div>
    ),
  ],

  // Global types for toolbar items
  globalTypes: {
    // Example: Custom toolbar item for locale switching
    locale: {
      name: 'Locale',
      description: 'Internationalization locale',
      defaultValue: 'en',
      toolbar: {
        icon: 'globe',
        items: [
          { value: 'en', title: 'English' },
          { value: 'es', title: 'Spanish' },
        ],
        showName: true,
      },
    },
  },
}

export default preview

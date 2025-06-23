import type { Preview } from '@storybook/react'
import React from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import '../../../packages/ui/src/styles/globals.css'
import '../../../packages/ui/src/components/final/Demo/styles/styles.css'

// Polyfill process for Next.js components
if (typeof global !== 'undefined') {
  ;(global as any).process = { env: { NODE_ENV: 'development' } }
}
if (typeof globalThis !== 'undefined') {
  ;(globalThis as any).process = { env: { NODE_ENV: 'development' } }
}

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    actions: { argTypesRegex: '^on[A-Z].*' },
    options: {
      storySort: {
        order: [
          'Design System',
          ['Introduction', 'Colors', 'Typography', 'Spacing', 'Shadows', '*'],
          '⚛️ Atoms',
          ['Button', 'Input', 'Select', 'Badge', '*'],
          '🧬 Molecules',
          ['Alert', 'Card', 'StatBlock', '*'],
          '🦠 Organisms',
          ['SiteHeader', 'Footer', 'QuickLinksPanel', '*'],
          '📐 Templates',
          ['DashboardLayout', 'ReportingLayout', '*'],
          '📄 Pages',
          ['BrokerDashboardPage', 'BookOfBusinessPage', '*'],
          '*',
        ],
      },
    },
    docs: {
      theme: {
        base: 'light',
        brandTitle: '🎨 BCBST Design System',
        brandUrl: 'https://bcbst.com',
      },
      toc: true,
    },
    // Enable a11y addon by default
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true
          }
        ]
      }
    },
    // Default viewport settings
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

  decorators: [
    (Story, context) => {
      const isFullscreen = context.parameters.layout === 'fullscreen'

      // Check if the story needs React Hook Form context
      const needsFormContext = context.parameters.formContext !== false

      const StoryWrapper = () => {
        if (needsFormContext) {
          const methods = useForm()
          return React.createElement(FormProvider, {
            ...methods,
            children: React.createElement(Story),
          })
        }
        return React.createElement(Story)
      }

      return React.createElement(
        'div',
        {
          className: isFullscreen ? '' : 'p-4',
          style: {
            fontFamily: 'var(--font-family-regular)',
            backgroundColor: isFullscreen
              ? 'transparent'
              : 'var(--color-tertiary-gray-6)',
            minHeight: isFullscreen ? '100vh' : 'auto',
          },
        },
        React.createElement(StoryWrapper)
      )
    },
  ],
}

export default preview
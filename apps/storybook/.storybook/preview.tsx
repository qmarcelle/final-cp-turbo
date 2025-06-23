import React from 'react';
import type { Preview } from '@storybook/react';
import '../../../packages/ui/src/styles/globals.css'; // Import source CSS directly

// Create a wrapper component for all providers
const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <React.StrictMode>
      <div className="min-h-screen bg-background text-foreground antialiased">
        {children}
      </div>
    </React.StrictMode>
  );
};

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    docs: {
      toc: true,
    },
    nextjs: {
      appDirectory: true,
    },
    renderer: {
      name: 'react',
    },
    // Ensure proper viewport settings
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
            width: '1280px',
            height: '800px',
          },
        },
      },
      defaultViewport: 'desktop',
    },
    // Ensure proper backgrounds
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#1a1a1a' },
      ],
    },
  },
  decorators: [
    (Story) => (
      <Providers>
        <div className="p-4">
          <Story />
        </div>
      </Providers>
    ),
  ],
};

export default preview; 
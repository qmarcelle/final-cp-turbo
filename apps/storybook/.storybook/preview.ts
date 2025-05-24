import type { Preview } from '@storybook/react';
import './tailwind-import.css'; // Import Tailwind CSS

// If your UI components rely on global CSS (e.g., from packages/ui or a Tailwind base),
// import it here. The path needs to be resolvable from apps/storybook.
// Example: import '../../packages/ui/src/styles/globals.css'; 
// Or if your Tailwind setup is in a specific app that Storybook should mirror:
// import '../../apps/broker-portal/src/styles/globals.css';

// Tailwind CSS and PostCSS setup for Storybook (using Vite):
// 1. Ensure apps/storybook has a postcss.config.js and tailwind.config.js.
//    These can often be minimal and import from your packages/ui or root configurations.
// 2. Import your main CSS file (e.g., a global.css that includes Tailwind directives)
//    at the top of this preview.ts file.
//    Example: import './tailwind-import.css'; // Create this file in .storybook/

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    actions: { argTypesRegex: '^on[A-Z].*' }, // Corrected regex string
    options: {
      storySort: {
        order: [
          'Introduction',
          'Foundation', [
            'Core',
            'Forms',
            'Navigation', 
            'Layout',
            '*',
          ],
          'Composite', [
            'Core',
            'Forms',
            'Navigation', 
            'Layout',
            '*',
          ],
          'Candidate', [
            'Member Portal', [
                'MP Components',
                'MP Merged Components',
                '*',
            ],
            '*',
          ],
          'Domain Specific',
          'Utils',
          '*',
        ],
      },
    },
  },
  // You can add global decorators here if needed
  // decorators: [
  //   (Story) => (
  //     <YourGlobalProvider>
  //       <Story />
  //     </YourGlobalProvider>
  //   ),
  // ],
};

export default preview; 
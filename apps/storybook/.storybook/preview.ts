import type { Preview } from '@storybook/react';
import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';

// Import Tailwind CSS and design system styles
import '../../../packages/ui/src/styles/globals.css';

// Polyfill process for Next.js components
if (typeof global !== 'undefined') {
  (global as any).process = { env: { NODE_ENV: 'development' } };
}
if (typeof globalThis !== 'undefined') {
  (globalThis as any).process = { env: { NODE_ENV: 'development' } };
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
          '🎨 Design System', [
            'Design Tokens',
            'Colors',
            'Typography', 
            'Spacing',
            'Breakpoints',
            '*',
          ],
          '⚛️ Atoms', [
            'Button',
            'Input',
            'TextField', 
            'Checkbox',
            'Radio',
            'Select',
            'TextArea',
            'Toggle',
            'DatePicker',
            'NumberInput',
            'FileUpload',
            'Alert',
            'StatusLabel',
            'Tooltip',
            '*',
          ],
          '🧬 Molecules', [
            'SearchBar',
            'InputGroup', 
            'TagInput',
            'AutoComplete',
            '*',
          ],
          '🦠 Organisms', [
            'Navigation',
            'Breadcrumb',
            'Card',
            'Accordion',
            'Modal',
            'Pagination',
            'FormLayout',
            '*',
          ],
          '📐 Layout', [
            'FormGrid',
            'FormColumn', 
            'FormLayout',
            'Container',
            'Section',
            '*',
          ],
          '🧪 Experimental', [
            'Pagination (Experimental)',
            '*',
          ],
          '📦 Templates', [
            '*',
          ],
          '📑 Pages', [
            '*',
          ],
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
    },
  },
  
  decorators: [
    (Story, context) => {
      const isFullscreen = context.parameters.layout === 'fullscreen';
      
      // Check if the story needs React Hook Form context
      const needsFormContext = context.parameters.formContext !== false;
      
      const StoryWrapper = () => {
        if (needsFormContext) {
          const methods = useForm();
          return React.createElement(
            FormProvider,
            { ...methods, children: React.createElement(Story) }
          );
        }
        return React.createElement(Story);
      };
      
      return React.createElement(
        'div',
        {
          className: isFullscreen ? '' : 'p-4',
          style: { 
            fontFamily: 'var(--font-family-regular)', 
            backgroundColor: isFullscreen ? 'transparent' : 'var(--color-tertiary-gray-6)',
            minHeight: isFullscreen ? '100vh' : 'auto'
          }
        },
        React.createElement(StoryWrapper)
      );
    },
  ],
};

export default preview;
import { IconType } from '../components/foundation/Icons/Icons';

export interface DesignSystemCategory {
  name: string;
  icon?: IconType;
  description: string;
  path: string;
  children?: DesignSystemCategory[];
}

export const designSystemConfig: DesignSystemCategory[] = [
  {
    name: 'Design System',
    icon: 'palette',
    description: 'Core design system documentation and guidelines',
    path: '/design-system',
    children: [
      {
        name: 'Atoms',
        icon: 'atom',
        description: 'Fundamental building blocks of the interface',
        path: '/atoms',
        children: [
          {
            name: 'Typography',
            description: 'Text styles and formatting',
            path: '/typography'
          },
          {
            name: 'Colors',
            description: 'Color palette and usage',
            path: '/colors'
          },
          {
            name: 'Icons',
            description: 'Icon library and usage',
            path: '/icons'
          },
          {
            name: 'Spacing',
            description: 'Spacing and layout metrics',
            path: '/spacing'
          }
        ]
      },
      {
        name: 'Molecules',
        icon: 'molecule',
        description: 'Simple combinations of atoms that form UI components',
        path: '/molecules',
        children: [
          {
            name: 'Buttons',
            description: 'Button variants and states',
            path: '/buttons'
          },
          {
            name: 'Form Controls',
            description: 'Input fields, checkboxes, radio buttons',
            path: '/form-controls'
          },
          {
            name: 'Cards',
            description: 'Card components and variations',
            path: '/cards'
          }
        ]
      },
      {
        name: 'Organisms',
        icon: 'organism',
        description: 'Complex UI components composed of molecules and atoms',
        path: '/organisms',
        children: [
          {
            name: 'Navigation',
            description: 'Navigation components and patterns',
            path: '/navigation'
          },
          {
            name: 'Forms',
            description: 'Complex form patterns and layouts',
            path: '/forms'
          },
          {
            name: 'Tables',
            description: 'Table components and data display patterns',
            path: '/tables'
          }
        ]
      },
      {
        name: 'Templates',
        icon: 'template',
        description: 'Page-level objects that place components into a layout',
        path: '/templates',
        children: [
          {
            name: 'Layouts',
            description: 'Common page layouts and grids',
            path: '/layouts'
          },
          {
            name: 'Page Templates',
            description: 'Standard page templates',
            path: '/page-templates'
          }
        ]
      },
      {
        name: 'Foundation',
        icon: 'foundation',
        description: 'Core design principles and guidelines',
        path: '/foundation',
        children: [
          {
            name: 'Accessibility',
            description: 'Accessibility standards and practices',
            path: '/accessibility'
          },
          {
            name: 'Responsive Design',
            description: 'Responsive design principles',
            path: '/responsive'
          },
          {
            name: 'Performance',
            description: 'Performance guidelines and best practices',
            path: '/performance'
          }
        ]
      }
    ]
  }
]; 
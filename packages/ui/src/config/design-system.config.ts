export interface UsageContext {
  doList: string[]
  dontList: string[]
  bestPractices: string[]
  accessibility: string[]
}

export interface Examples {
  basic?: string
  advanced?: string
  responsive?: string
}

export interface DesignSystemCategory {
  name: string
  icon?: string
  emoji?: string
  description: string
  path: string
  expandable?: boolean
  displayName?: string
  children?: DesignSystemCategory[]
  usageContext?: UsageContext
  examples?: Examples
}

export const designSystemConfig: DesignSystemCategory[] = [
  {
    name: 'Foundation',
    emoji: '🎨',
    icon: 'palette',
    description: 'Core design principles and guidelines',
    path: '/foundation',
    expandable: true,
    children: [
      {
        name: 'Accessibility',
        emoji: '♿',
        icon: 'accessibility',
        description: 'WCAG guidelines and implementation',
        path: '/accessibility',
        expandable: true,
        children: [
          {
            name: 'Color Contrast',
            emoji: '🎨',
            icon: 'contrast',
            description: 'Guidelines for accessible colors',
            path: '/color-contrast',
          },
          {
            name: 'Keyboard Navigation',
            emoji: '⌨️',
            icon: 'keyboard',
            description: 'Keyboard accessibility patterns',
            path: '/keyboard',
          },
          {
            name: 'Screen Readers',
            emoji: '🔊',
            icon: 'volume-2',
            description: 'Screen reader compatibility',
            path: '/screen-readers',
          },
        ],
      },
      {
        name: 'Navigation Patterns',
        emoji: '🧭',
        icon: 'navigation',
        description: 'Common navigation patterns and implementations',
        path: '/patterns',
        expandable: true,
        children: [
          {
            name: 'Top Navigation',
            emoji: '⬆️',
            icon: 'arrow-up',
            description: 'Header and top bar patterns',
            path: '/top-nav',
            usageContext: {
              doList: [
                'Use for simple websites with few main sections',
                'Keep labels clear and meaningful',
                'Include search functionality',
              ],
              dontList: [
                'Avoid for complex hierarchies',
                'Don\'t use generic labels like "Products"',
              ],
              bestPractices: [
                'Keep menu items concise',
                'Use descriptive labels',
                'Maintain consistent styling',
              ],
              accessibility: [
                'Ensure keyboard navigation',
                'Add ARIA labels',
                'Provide skip links',
              ],
            },
          },
          {
            name: 'Side Navigation',
            emoji: '➡️',
            icon: 'arrow-right',
            description: 'Sidebar navigation patterns',
            path: '/side-nav',
          },
          {
            name: 'Mega Menus',
            emoji: '📑',
            icon: 'menu',
            description: 'Large-scale navigation menus',
            path: '/mega-menus',
          },
        ],
      },
    ],
  },
  {
    name: 'Getting Started',
    emoji: '👋',
    icon: 'home',
    displayName: 'Getting Started 👋',
    description: 'Introduction and overview of the design system',
    path: '/getting-started',
    expandable: true,
    children: [
      {
        name: 'Quick Start',
        emoji: '🚀',
        icon: 'rocket',
        displayName: 'Quick Start 🚀',
        description: 'Get up and running quickly',
        path: '/quick-start',
        usageContext: {
          doList: [
            'Start with the basics',
            'Follow the step-by-step guide',
            'Check prerequisites',
          ],
          dontList: [
            'Skip important setup steps',
            'Ignore version requirements',
          ],
          bestPractices: [
            'Read through all documentation first',
            'Set up your development environment properly',
          ],
          accessibility: [
            'Ensure screen reader compatibility',
            'Check keyboard navigation',
          ],
        },
      },
      {
        name: 'Design Principles',
        emoji: '💡',
        icon: 'lightbulb',
        description: 'Core principles and values',
        path: '/principles',
      },
      {
        name: 'Navigation Guide',
        emoji: '🧭',
        icon: 'compass',
        description: 'How to use this design system',
        path: '/guide',
      },
    ],
  },
  {
    name: 'Atoms',
    emoji: '⚛️',
    icon: 'circle',
    displayName: 'Atoms ⚛️',
    description: 'Fundamental building blocks of the interface',
    path: '/atoms',
    expandable: true,
    children: [
      {
        name: 'Typography',
        emoji: '📝',
        icon: 'type',
        displayName: 'Typography 📝',
        description: 'Text styles and formatting',
        path: '/typography',
        usageContext: {
          doList: [
            'Use consistent type scale',
            'Maintain readable line lengths',
            'Follow hierarchy',
          ],
          dontList: ['Mix too many fonts', 'Use extreme sizes'],
          bestPractices: [
            'Use system fonts for performance',
            'Test readability at different sizes',
          ],
          accessibility: [
            'Ensure sufficient contrast',
            'Use proper heading structure',
          ],
        },
      },
      {
        name: 'Colors',
        emoji: '🎨',
        icon: 'palette',
        displayName: 'Colors 🎨',
        description: 'Color palette and usage',
        path: '/colors',
      },
      {
        name: 'Icons',
        emoji: '🔍',
        icon: 'search',
        displayName: 'Icons 🔍',
        description: 'Icon library and usage',
        path: '/icons',
      },
      {
        name: 'Spacing',
        emoji: '📏',
        icon: 'ruler',
        displayName: 'Spacing 📏',
        description: 'Spacing and layout metrics',
        path: '/spacing',
      },
      {
        name: 'Buttons',
        emoji: '🔘',
        icon: 'square',
        displayName: 'Buttons 🔘',
        description: 'Button variants and states',
        path: '/buttons',
      },
      {
        name: 'Badge',
        emoji: '🏷️',
        icon: 'tag',
        displayName: 'Badge 🏷️',
        description: 'Badge component and variations',
        path: '/badge',
      },
    ],
  },
  {
    name: 'Molecules',
    emoji: '🧬',
    icon: 'grid',
    displayName: 'Molecules 🧬',
    description: 'Simple combinations of atoms that form UI components',
    path: '/molecules',
    expandable: true,
    children: [
      {
        name: 'Form Controls',
        emoji: '📝',
        icon: 'edit-3',
        displayName: 'Form Controls 📝',
        description: 'Input fields, checkboxes, radio buttons',
        path: '/form-controls',
      },
      {
        name: 'Cards',
        emoji: '🗂️',
        icon: 'credit-card',
        displayName: 'Cards 🗂️',
        description: 'Card components and variations',
        path: '/cards',
      },
      {
        name: 'Alert',
        emoji: '⚠️',
        icon: 'alert-triangle',
        displayName: 'Alert ⚠️',
        description: 'Alert and notification components',
        path: '/alert',
      },
    ],
  },
  {
    name: 'Organisms',
    emoji: '🦠',
    icon: 'layers',
    displayName: 'Organisms 🦠',
    description: 'Complex UI components composed of molecules and atoms',
    path: '/organisms',
    expandable: true,
    children: [
      {
        name: 'Navigation',
        emoji: '🧭',
        icon: 'compass',
        displayName: 'Navigation 🧭',
        description: 'Navigation components and patterns',
        path: '/navigation',
      },
      {
        name: 'Forms',
        emoji: '📋',
        icon: 'file-text',
        displayName: 'Forms 📋',
        description: 'Complex form patterns and layouts',
        path: '/forms',
      },
      {
        name: 'Tables',
        emoji: '📊',
        icon: 'table',
        displayName: 'Tables 📊',
        description: 'Table components and data display patterns',
        path: '/tables',
      },
    ],
  },
  {
    name: 'Templates',
    emoji: '📐',
    icon: 'layout',
    displayName: 'Templates 📐',
    description: 'Page-level objects that place components into a layout',
    path: '/templates',
    expandable: true,
    children: [
      {
        name: 'Layouts',
        emoji: '📏',
        icon: 'grid',
        displayName: 'Layouts 📏',
        description: 'Common page layouts and grids',
        path: '/layouts',
      },
      {
        name: 'Page Templates',
        emoji: '📄',
        icon: 'file',
        displayName: 'Page Templates 📄',
        description: 'Standard page templates',
        path: '/page-templates',
      },
    ],
  },
  {
    name: 'Implementation',
    emoji: '🛠️',
    icon: 'tool',
    displayName: 'Implementation 🛠️',
    description: 'Technical guides and testing',
    path: '/implementation',
    expandable: true,
    children: [
      {
        name: 'Usability Testing',
        emoji: '🔍',
        icon: 'search',
        displayName: 'Usability Testing 🔍',
        description: 'How to test navigation patterns',
        path: '/testing',
        usageContext: {
          doList: [
            'Test with real users',
            'Use diverse test groups',
            'Document findings',
          ],
          dontList: ['Skip testing phases', 'Ignore user feedback'],
          bestPractices: [
            'Regular testing cycles',
            'Multiple testing methods',
            'Clear success criteria',
          ],
          accessibility: [
            'Include users with disabilities',
            'Test with assistive technologies',
          ],
        },
      },
      {
        name: 'Accessibility Testing',
        emoji: '✅',
        icon: 'check-circle',
        displayName: 'Accessibility Testing ✅',
        description: 'Ensuring accessible navigation',
        path: '/a11y-testing',
      },
      {
        name: 'Performance',
        emoji: '⚡',
        icon: 'zap',
        displayName: 'Performance ⚡',
        description: 'Navigation performance guidelines',
        path: '/performance',
      },
    ],
  },
]

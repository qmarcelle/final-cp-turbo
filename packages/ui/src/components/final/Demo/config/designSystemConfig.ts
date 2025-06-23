// For now, we'll use string type for icons since we're using emoji icons in the config
export interface DesignSystemCategory {
  name: string;
  icon?: string;
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
        name: 'Foundation',
        icon: 'foundation',
        description: 'Core design principles and guidelines',
        path: '/foundation',
        children: [
          {
            name: 'Colors',
            description: 'Color palette and usage',
            path: '/colors'
          },
          {
            name: 'Typography',
            description: 'Text styles and formatting',
            path: '/typography'
          },
          {
            name: 'Spacing',
            description: 'Spacing and layout metrics',
            path: '/spacing'
          },
          {
            name: 'Shadows',
            description: 'Shadow and elevation system',
            path: '/shadows'
          }
        ]
      },
      {
        name: 'Atoms',
        icon: 'atom',
        description: 'Fundamental building blocks of the interface',
        path: '/atoms',
        children: [
          {
            name: 'Button',
            description: 'Button variants and states',
            path: '/button'
          },
          {
            name: 'Input',
            description: 'Input fields and form controls',
            path: '/input'
          },
          {
            name: 'Select',
            description: 'Dropdown and selection controls',
            path: '/select'
          },
          {
            name: 'Badge',
            description: 'Status badges and counters',
            path: '/badge'
          },
          {
            name: 'Avatar',
            description: 'User avatars and profile images',
            path: '/avatar'
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
            name: 'Card',
            description: 'Card components and variations',
            path: '/card'
          },
          {
            name: 'Alert',
            description: 'Alert and notification messages',
            path: '/alert'
          },
          {
            name: 'StatBlock',
            description: 'Statistical data display blocks',
            path: '/stat-block'
          },
          {
            name: 'SearchForm',
            description: 'Search form components',
            path: '/search-form'
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
            name: 'SiteHeader',
            description: 'Site header and navigation',
            path: '/site-header'
          },
          {
            name: 'Footer',
            description: 'Site footer components',
            path: '/footer'
          },
          {
            name: 'QuickLinksPanel',
            description: 'Quick action panels',
            path: '/quick-links-panel'
          },
          {
            name: 'CommissionTable',
            description: 'Commission data tables',
            path: '/commission-table'
          }
        ]
      },
      {
        name: 'Templates',
        icon: 'template',
        description: 'Page-level layouts and templates',
        path: '/templates',
        children: [
          {
            name: 'DashboardLayout',
            description: 'Dashboard page layout',
            path: '/dashboard-layout'
          },
          {
            name: 'ReportingLayout',
            description: 'Reporting page layout',
            path: '/reporting-layout'
          },
          {
            name: 'BookOfBusinessLayout',
            description: 'Book of business layout',
            path: '/book-of-business-layout'
          }
        ]
      },
      {
        name: 'Pages',
        icon: 'page',
        description: 'Complete page compositions',
        path: '/pages',
        children: [
          {
            name: 'BrokerDashboard',
            description: 'Main broker dashboard page',
            path: '/broker-dashboard'
          },
          {
            name: 'BookOfBusiness',
            description: 'Book of business reporting page',
            path: '/book-of-business'
          },
          {
            name: 'ReportingOverview',
            description: 'Reporting overview page',
            path: '/reporting-overview'
          }
        ]
      }
    ]
  }
];
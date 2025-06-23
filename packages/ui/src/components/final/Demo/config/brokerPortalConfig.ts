export interface NavigationItem {
    id: number;
    title: string;
    description: string;
    category: string;
    url: string;
    showOnMenu: boolean;
    external?: boolean;
    openInNewWindow?: boolean;
    shortLinks?: Array<{ title: string; link: string }>;
    template?: {
      firstCol?: string;
      secondCol?: string;
      thirdCol?: string;
      fourthCol?: string;
    };
    childPages?: NavigationItem[];
  }
  
  export interface PortalConfig {
    name: string;
    basePath: string;
    logo: {
      full: string;
      stacked: string;
      alt: string;
    };
    footer: {
      copyrightText: string;
      address: string;
      links: Array<{
        title: string;
        url: string;
      }>;
    };
    navigation: NavigationItem[];
  }
  
  export const brokerPortalConfig: PortalConfig = {
    name: 'Broker Portal',
    basePath: '/broker',
    logo: {
      full: '/logos/bcbst-blue-logo.svg',
      stacked: '/logos/bcbst-stacked-logo.svg',
      alt: 'BCBST Logo',
    },
    footer: {
      copyrightText: '©1998-[YEAR] BlueCross BlueShield of Tennessee, Inc., an Independent Licensee of the Blue Cross Blue Shield Association. BlueCross BlueShield of Tennessee is a Qualified Health Plan issuer in the Health Insurance Marketplace.',
      address: '1 Cameron Hill Circle, Chattanooga TN 37402-0001',
      links: [
        {
          title: 'Sitemap',
          url: '/broker/sitemap',
        },
        {
          title: 'Privacy & Security',
          url: '/broker/privacy',
        },
        {
          title: 'Legal',
          url: '/broker/legal',
        },
        {
          title: 'Accessibility',
          url: '/broker/accessibility',
        },
      ],
    },
    navigation: [
      {
        id: 1,
        title: 'Sales & Quoting',
        description: 'Access quoting tools and sales resources',
        category: '',
        url: '/broker/sales-quoting',
        showOnMenu: true,
        shortLinks: [
          { title: 'Commission Information', link: '/broker/commission' },
          { title: 'Quick Quote', link: '/broker/quote' },
        ],
        template: {
          firstCol: 'TOOLS',
          secondCol: 'Employer Group',
          thirdCol: 'Individual',
          fourthCol: 'Medicare',
        },
        childPages: [
          {
            id: 11,
            title: 'Group Quote & Enroll',
            description: 'Quote and enroll employer groups',
            category: 'Employer Group',
            url: '/broker/group-quote',
            showOnMenu: true,
            external: true,
            openInNewWindow: false,
          },
          {
            id: 12,
            title: 'Individual Plans',
            description: 'Individual insurance plans',
            category: 'Individual',
            url: '/broker/individual-plans',
            showOnMenu: true,
          },
          {
            id: 13,
            title: 'Medicare Plans',
            description: 'Medicare supplement and advantage plans',
            category: 'Medicare',
            url: '/broker/medicare-plans',
            showOnMenu: true,
          },
        ],
      },
      {
        id: 2,
        title: 'Member Services',
        description: 'Member lookup and service tools',
        category: '',
        url: '/broker/member-services',
        showOnMenu: true,
        shortLinks: [
          { title: 'Member Search', link: '/broker/member-search' },
          { title: 'Claims Lookup', link: '/broker/claims' },
        ],
        childPages: [
          {
            id: 21,
            title: 'Member Search',
            description: 'Search for member information',
            category: 'Tools',
            url: '/broker/member-search',
            showOnMenu: true,
          },
          {
            id: 22,
            title: 'Claims History',
            description: 'View member claims history',
            category: 'Tools',
            url: '/broker/claims-history',
            showOnMenu: true,
          },
        ],
      },
      {
        id: 3,
        title: 'Reporting',
        description: 'Commission reports and analytics',
        category: '',
        url: '/broker/reporting',
        showOnMenu: true,
        shortLinks: [
          { title: 'Commission Reports', link: '/broker/commission-reports' },
          { title: 'Book of Business', link: '/broker/book-of-business' },
        ],
        childPages: [
          {
            id: 31,
            title: 'Commission Reports',
            description: 'View commission statements and reports',
            category: 'Reports',
            url: '/broker/commission-reports',
            showOnMenu: true,
          },
          {
            id: 32,
            title: 'Book of Business',
            description: 'Comprehensive business analytics',
            category: 'Reports',
            url: '/broker/book-of-business',
            showOnMenu: true,
          },
          {
            id: 33,
            title: 'Performance Metrics',
            description: 'Sales performance and metrics',
            category: 'Analytics',
            url: '/broker/performance',
            showOnMenu: true,
          },
        ],
      },
      {
        id: 4,
        title: 'Resources',
        description: 'Marketing materials and resources',
        category: '',
        url: '/broker/resources',
        showOnMenu: true,
        shortLinks: [
          { title: 'Marketing Materials', link: '/broker/marketing' },
          { title: 'Training Center', link: '/broker/training' },
        ],
        childPages: [
          {
            id: 41,
            title: 'Marketing Materials',
            description: 'Download marketing materials and flyers',
            category: 'Materials',
            url: '/broker/marketing-materials',
            showOnMenu: true,
          },
          {
            id: 42,
            title: 'Training Center',
            description: 'Training resources and certification',
            category: 'Training',
            url: '/broker/training-center',
            showOnMenu: true,
          },
          {
            id: 43,
            title: 'Product Information',
            description: 'Detailed product information sheets',
            category: 'Materials',
            url: '/broker/product-info',
            showOnMenu: true,
          },
        ],
      },
    ],
  };
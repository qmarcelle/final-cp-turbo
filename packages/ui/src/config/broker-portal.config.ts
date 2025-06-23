import { PortalConfig } from '@/types/portal';
import {
  bcbstBlueLogo,
  bcbstStackedlogo,
} from '../components/foundation/Icons/Icons';

export const brokerPortalConfig: PortalConfig = {
  name: 'Broker Portal',
  basePath: '/broker',
  logo: {
    full: bcbstBlueLogo,
    stacked: bcbstStackedlogo,
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
    ],
  },
  navigation: [
    {
      id: 1,
      title: 'Sales & Quoting',
      description: 'This is Sales & Quoting',
      category: '',
      url: '',
      showOnMenu: true,
      shortLinks: [
        { title: 'Commission Information', link: '' },
      ],
      template: {
        firstCol: 'LINKS',
        secondCol: 'Employer Group',
        thirdCol: 'Individual',
        fourthCol: 'Medicare',
      },
      childPages: [
        {
          id: 94,
          title: 'Group Quote & Enroll',
          description: 'This is Group Quote & Enroll',
          category: 'Employer Group',
          url: '',
          showOnMenu: true,
          external: true,
          openInNewWindow: false,
        },
        // ... other child pages from menuNavigation.tsx
      ],
    },
    // ... other navigation sections from menuNavigation.tsx
  ],
}; 
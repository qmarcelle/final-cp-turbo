import { SiteHeaderSubNavProps } from '../composite/SiteHeaderSubSection/SiteHeaderSubNavSection';
export const getMenuNavigation = (
): SiteHeaderSubNavProps[] => [
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
        showOnMenu: () => {
          return true;
        },
        external: true,
        openInNewWindow: false,
      },
      {
        id: 93,
        title: 'View Group Sales Resources',
        description: 'View Group Sales Resources',
        category: 'Employer Group',
        url: ``,
        showOnMenu: () => {
          return true;
        },
        external: false,
      },
      {
        id: 88,
        title: 'On-Marketplace Quote & Enroll',
        description: 'This is On-Marketplace Quote & Enroll',
        category: 'Individual',
        url: '',
        showOnMenu: () => {
          return true;
        },
        external: true,
      },
      {
        id: 87,
        title: 'Off-Marketplace Quote & Enroll',
        description: 'This is Off-Marketplace Quote & Enroll',
        category: 'Individual',
        url: '',
        showOnMenu: () => {
          return true;
        },
        external: true,
      },
      {
        id: 86,
        title: 'View Individual Sales Resources',
        description: 'This is View Individual Sales Resources',
        category: 'Individual',
        url: '',
        showOnMenu: () => {
          return true;
        },
        external: false,
      },
      {
        id: 86,
        title: 'Medicare Quote & Enroll',
        description: 'This is Medicare Quote & Enroll',
        category: 'Medicare',
        url: '',
        showOnMenu: () => {
          return true;
        },
        external: true,
      },
      {
        id: 85,
        title: 'View Medicare Sales Resources',
        description: 'This is View Medicare Sales Resources',
        category: 'Medicare',
        url: '',
        showOnMenu: () => {
          return true;
        },
        external: false,
      },
    ],
    activeSubNavId: null,
    closeSubMenu: () => {},
  },
  {
    id: 2,
    title: 'Client Support',
    description: 'This is Client Support',
    category: '',
    showOnMenu: true,
    url: '',
    shortLinks: [
      { title: 'Member Search', link: '' },
      { title: 'Order Bulk ID Cards', link: '' },
      { title: 'Employer Contract Search', link: '' },
    ],
    template: {
      firstCol: 'LINKS',
      secondCol: 'Employer Group',
      thirdCol: 'Individual',
      fourthCol: 'Medicare',
    },
    childPages: [
      {
        id: 102,
        title: 'View plan information, get forms, find care, or estimate costs for Employer Group Plans.',
        description: 'This is View Employer Group Support',
        category: 'Employer Group',
        url: '',
        text: true,
        showOnMenu: () => {
          return true;
        },
        external: false,
      },
      {
        id: 101,
        title: 'View Employer Group Support',
        description: 'This is View Employer Group Support',
        category: 'Employer Group',
        url: '',
        showOnMenu: () => {
          return true;
        },
        external: false,
      },
      {
        id: 100,
        title: 'View plan information, get forms, find care, or estimate costs for Individual Plans.',
        description: 'This is View Individual ',
        category: 'Individual',
        url: '',
        text: true,
        showOnMenu: () => {
          return true;
        },
        external: false,
      },
      {
        id: 99,
        title: 'View Individual Support',
        description: 'This is View Individual Support',
        category: 'Individual',
        url: '',
        showOnMenu: () => {
          return true;
        },
        external: false,
      },
      {
        id: 98,
        title: 'View Medicare Advantage Support',
        description: 'This is Medicare Advantage Support',
        category: 'Medicare',
        url: '',
        showOnMenu: () => {
          return true;
        },
        external: false,
      },{
        id: 97,
        title: 'View Medicare Supplement Support',
        description: 'This is Medicare Supplement Support',
        category: 'Medicare',
        url: '',
        showOnMenu: () => {
          return true;
        },
        external: false,
      },{
        id: 96,
        title: 'View D-SNP Support',
        description: 'This is D-SNP Support',
        category: 'Medicare',
        url: '',
        showOnMenu: () => {
          return true;
        },
        external: false,
      },
    ],
    activeSubNavId: null,
    closeSubMenu: () => {},
  },
  {
    id: 3,
    title: 'Reporting',
    description: 'This is Reporting',
    category: '',
    showOnMenu: true,
    url: '',
    shortLinks: [
      { title: 'Book of Business Reporting', link: '' },
      { title: 'Interactive Report', link: '' },
    ],
    template: {
      firstCol: 'LINKS',
      secondCol: 'Compensation Reports',
      thirdCol: 'Other Reports',
      fourthCol: '',
    },
    childPages: [
      {
        id: 85,
        title: 'Commission Statement',
        description: 'This is Commission Statement',
        category: 'Compensation Reports',
        showOnMenu: () => {
          return true;
        },
        url: ``,
        external: false,
      },
      {
        id: 84,
        title: 'Commission Summary',
        description: 'This is Commission Summary',
        category: 'Compensation Reports',
        showOnMenu: () => {
          return true;
        },
        url: ``,
        external: false,
      },
      {
        id: 103,
        title: 'View All Compensation Reporting',
        description: 'This is View All Compensation Reporting',
        category: 'Compensation Reports',
        showOnMenu: () => {
          return true;
        },
        url: ``,
        external: false,
      },
      {
        id: 83,
        title: 'Delinquency Reports',
        description: 'This is Delinquency Reports',
        category: 'Other Reports',
        showOnMenu: () => {
          return true;
        },
        url: '',
        external: true,
      },
      {
        id: 82,
        title: 'Electronic Data Interface (EDI) Reports',
        description: 'This is Electronic Data Interface (EDI) Reports',
        category: 'Other Reports',
        showOnMenu: () => {
          return true;
        },
        url: '',
        external: false,
      },
      {
        id: 81,
        title: 'Over Age Dependent Report',
        description: 'This is Over Age Dependent Report',
        category: 'Other Reports',
        showOnMenu: () => {
          return true;
        },
        url: '',
        external: true,
      },
      {
        id: 80,
        title: 'View All Reporting',
        description: 'This is View All Reporting',
        category: 'Other Reports',
        showOnMenu: () => {
          return true;
        },
        url: '',
        external: false,
      },
      
    ],
    activeSubNavId: null,
    closeSubMenu: () => {},
  },
  {
    id: 4,
    title: 'Materials & Forms',
    description: 'This is Materials & Forms',
    category: '',
    showOnMenu: true,
    url: '',
    template: {
      firstCol: 'Search by Topic',
      secondCol: 'Search by Business',
      thirdCol: '',
      fourthCol: '',
    },
    childPages: [
      {
        id: 72,
        title: 'Administration',
        description: 'This is Administration',
        category: 'Search by Topic',
        showOnMenu: () => {
          return true;
        },
        url: ``,
        external: false,
      },
      {
        id: 71,
        title: 'Plan Enrollment',
        description: 'This is Plan Enrollment',
        category: 'Search by Topic',
        showOnMenu: () => {
          return true;
        },
        url: ``,
        external: false,
      },
      {
        id: 70,
        title: 'Plan & Product Information',
        description: 'This is Plan & Product Information',
        category: 'Search by Topic',
        showOnMenu: () => {
          return true;
        },
        url: ``,
        external: false,
      },
      {
        id: 100,
        title: 'Employer Group',
        description: 'This is Employer Group',
        category: 'Search by Business',
        showOnMenu: () => {
          return true;
        },
        url: ``,
        external: false,
      },
      {
        id: 69,
        title: 'Individual',
        description: 'This is Individual',
        category: 'Search by Business',
        showOnMenu: () => {
          return true;
        },
        url: ``,
        external: false,
      },
      {
        id: 81,
        title: 'Medicare Advantage',
        description: 'This is Medicare Advantage',
        category: 'Search by Business',
        showOnMenu: () => {
          return true;
        },
        url: ``,
        external: false,
      },
      {
        id: 82,
        title: 'Medicare Supplement',
        description: 'This is Medicare Supplement',
        category: 'Search by Business',
        showOnMenu: () => {
          return true;
        },
        url: ``,
        external: false,
      },
      {
        id: 83,
        title: 'D-SNP',
        description: 'This is D-SNP',
        category: 'Search by Business',
        showOnMenu: () => {
          return true;
        },
        url: ``,
        external: false,
      },
      {
        id: 84,
        title: 'C-SNP',
        description: 'This is C-SNP',
        category: 'Search by Business',
        showOnMenu: () => {
          return true;
        },
        url: ``,
        external: false,
      },
    ],
    activeSubNavId: null,
    closeSubMenu: () => {},
  },
  {
    id: 5,
    title: 'Learning Center',
    description: 'This is Learning Center',
    category: '',
    showOnMenu: true,
    url:'',
    template: {
      firstCol: 'Broker Seminar',
      secondCol: 'Training Material',
      thirdCol: 'Medicare Certification & Resources',
      fourthCol: '',
    },
    childPages: [
      {
        id: 82,
        title: 'Get Latest Seminar Material',
        description: 'Get Latest Seminar Material',
        category: 'Broker Seminar',
        showOnMenu: () => {
          return true;
        },
        url: '',
        external: false,
      },
      {
        id: 83,
        title: 'Seminar Videos',
        description: 'Seminar Videos',
        category: 'Broker Seminar',
        showOnMenu: () => {
          return true;
        },
        url: '',
        external: false,
      },
      {
        id: 84,
        title: 'Enrollment Tutorials',
        description: 'Enrollment Tutorials',
        category: 'Training Material',
        showOnMenu: () => {
          return true;
        },
        url: '',
        external: false,
      },
      {
        id: 85,
        title: 'Report Tutorials',
        description: 'Report Tutorials',
        category: 'Training Material',
        showOnMenu: () => {
          return true;
        },
        url: '',
        external: false,
      },
      {
        id: 86,
        title: 'Group Admin Training',
        description: 'Group Admin Training',
        category: 'Training Material',
        showOnMenu: () => {
          return true;
        },
        url: '',
        external: false,
      },
      {
        id: 87,
        title: 'Get certified for Medicare plans or view CMS guidance',
        description: 'Get certified for Medicare plans or view CMS guidance',
        category: 'Medicare Certification & Resources',
        showOnMenu: () => {
          return true;
        },
        url: '',
        text: true,
        external: false,
      },
      {
        id: 87,
        title: 'View Medicare Resources',
        description: 'View Medicare Resources',
        category: 'Medicare Certification & Resources',
        showOnMenu: () => {
          return true;
        },
        url: '',
        external: false,
      },
    ],
    activeSubNavId: null,
    closeSubMenu: () => {},
  },
];

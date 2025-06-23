export interface PortalShortLink {
  title: string;
  link: string;
}

export interface PortalNavigationTemplate {
  firstCol: string;
  secondCol: string;
  thirdCol: string;
  fourthCol?: string;
}

export interface PortalChildPage {
  id: number;
  title: string;
  description: string;
  category: string;
  url: string;
  text?: boolean;
  showOnMenu?: boolean | (() => boolean);
  external?: boolean;
  openInNewWindow?: boolean;
}

export interface PortalNavigationSection {
  id: number;
  title: string;
  description: string;
  category: string;
  url: string;
  showOnMenu: boolean;
  shortLinks?: PortalShortLink[];
  template: PortalNavigationTemplate;
  childPages: PortalChildPage[];
}

export interface PortalConfig {
  name: string;
  basePath: string; // e.g., '/broker', '/employer', '/member'
  logo: {
    full: string;
    stacked: string;
    alt: string;
  };
  footer: {
    copyrightText: string;
    address: string;
    links: {
      title: string;
      url: string;
    }[];
  };
  navigation: PortalNavigationSection[];
} 
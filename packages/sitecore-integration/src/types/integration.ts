// packages/sitecore-integration/src/types/integration.ts
import type { AppRouter } from 'api-client';
import type { TRPCClientError } from '@trpc/client';

// Sitecore field types
export interface SitecoreField<T = any> {
  value: T;
  editable?: string;
}

export interface SitecoreImageField {
  value: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
  };
  editable?: string;
}

export interface SitecoreLinkField {
  value: {
    href: string;
    text?: string;
    target?: string;
    linktype?: string;
  };
  editable?: string;
}

// Base Sitecore component props
export interface SitecoreComponentProps {
  fields?: Record<string, SitecoreField | SitecoreImageField | SitecoreLinkField>;
  params?: Record<string, string>;
  rendering?: {
    uid?: string;
    componentName?: string;
    dataSource?: string;
  };
}

// Hybrid component props (Sitecore + Portal data)
export interface HybridComponentProps<TPortalData = any> extends SitecoreComponentProps {
  portalData?: TPortalData;
  portalError?: import('@trpc/client').TRPCClientErrorLike<AppRouter>;
  isLoading?: boolean;
}

// Data composition strategy types
export interface DataCompositionStrategy {
  priority: 'sitecore' | 'portal' | 'merge';
  fallback: 'sitecore' | 'portal' | 'default';
  cacheStrategy: 'sitecore' | 'portal' | 'both' | 'none';
} 
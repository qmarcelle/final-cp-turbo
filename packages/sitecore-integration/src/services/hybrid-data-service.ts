import { trpcClient as trpc } from 'api-client';
import type { LayoutServiceData, RestLayoutService } from '@sitecore-jss/sitecore-jss-nextjs';
import type { DataCompositionStrategy } from '../types/integration';

export class HybridDataService {
  constructor(
    private sitecoreService: RestLayoutService,
    private trpcClient: typeof trpc
  ) {}

  async getPageData(path: string, context?: { memberId?: string; groupId?: string }) {
    // Fetch Sitecore layout data
    const sitecorePromise = this.sitecoreService.fetchLayoutData(path);
    
    // Conditionally fetch portal data based on context
    const portalPromises: Record<string, Promise<any>> = {};
    
    if (context?.memberId) {
      portalPromises.member = this.trpcClient.member.getMember.query({
        lookup: 'byMemberCk',
        memberId: context.memberId,
        context: 'employer',
      });

      portalPromises.eligibility = this.trpcClient.member.getEligibility.query({
        lookup: 'byMemberCk',
        memberId: context.memberId,
        context: 'employer',
      });
    }

    if (context?.groupId) {
      // Add group-specific queries
    }

    try {
      const [sitecoreData, portalData] = await Promise.allSettled([
        sitecorePromise,
        Promise.all(Object.entries(portalPromises).map(async ([key, promise]) => [key, await promise]))
      ]);

      return {
        sitecore: sitecoreData.status === 'fulfilled' ? sitecoreData.value : null,
        portal: portalData.status === 'fulfilled' 
          ? Object.fromEntries(portalData.value as [string, any][])
          : {},
        errors: {
          sitecore: sitecoreData.status === 'rejected' ? sitecoreData.reason : null,
          portal: portalData.status === 'rejected' ? portalData.reason : null,
        }
      };
    } catch (error) {
      console.error('Hybrid data service error:', error);
      throw error;
    }
  }

  async getComponentData<T>(
    componentName: string,
    params: {
      sitecoreFields?: Record<string, any>;
      portalQuery?: () => Promise<T>;
      strategy?: DataCompositionStrategy;
    }
  ) {
    const { sitecoreFields, portalQuery, strategy } = params;
    const compositionStrategy: DataCompositionStrategy = {
      priority: 'merge',
      fallback: 'sitecore',
      cacheStrategy: 'both',
      ...strategy,
    };

    let portalData: T | null = null;
    let portalError: Error | null = null;

    // Fetch portal data if query provided
    if (portalQuery) {
      try {
        portalData = await portalQuery();
      } catch (error) {
        portalError = error as Error;
        console.warn(`Portal data fetch failed for ${componentName}:`, error);
      }
    }

    // Compose data based on strategy
    return this.composeData({
      sitecore: sitecoreFields,
      portal: portalData,
      error: portalError,
      strategy: compositionStrategy,
    });
  }

  private composeData({
    sitecore,
    portal,
    error,
    strategy,
  }: {
    sitecore?: Record<string, any>;
    portal?: any;
    error?: Error | null;
    strategy: DataCompositionStrategy;
  }) {
    switch (strategy.priority) {
      case 'portal':
        return {
          data: portal || sitecore,
          source: portal ? 'portal' : 'sitecore',
          error,
          fallback: !portal && sitecore ? 'sitecore' : null,
        };
      
      case 'sitecore':
        return {
          data: sitecore || portal,
          source: sitecore ? 'sitecore' : 'portal',
          error,
          fallback: !sitecore && portal ? 'portal' : null,
        };
      
      case 'merge':
      default:
        return {
          data: { ...sitecore, ...portal },
          source: 'hybrid',
          error,
          sitecore,
          portal,
        };
    }
  }
} 
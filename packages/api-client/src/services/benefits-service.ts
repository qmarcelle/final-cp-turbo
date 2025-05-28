import axios, { AxiosInstance } from 'axios';
import { z } from 'zod';
import type { ContextTypeSchema, LookupTypeSchema, ProductTypeSchema, BenefitDetails, BenefitRequestOptions } from '../trpc/types';

interface ServiceOptions {
  baseUrl: string;
  context: z.infer<typeof ContextTypeSchema>;
  portalLogin: string;
  bearerToken?: string;
  defaultTimeout?: number;
  enableMocks?: boolean;
}

export class BenefitsService {
  protected client: AxiosInstance;
  protected serviceContextPath: string;
  protected enableMocks: boolean;

  constructor(options: ServiceOptions) {
    this.client = axios.create({
      baseURL: options.baseUrl,
      timeout: options.defaultTimeout || 30000,
      headers: {
        'X-Portal-Login': options.portalLogin,
        ...(options.bearerToken && { 'Authorization': `Bearer ${options.bearerToken}` }),
      },
    });
    this.enableMocks = options.enableMocks || false;

    switch (options.context) {
      case 'employer':
        this.serviceContextPath = '/api/employer/v1';
        break;
      case 'broker':
        this.serviceContextPath = '/api/broker/v1';
        break;
      case 'internal':
        this.serviceContextPath = '/api/internal/v1';
        break;
      case 'common':
      default:
        this.serviceContextPath = '/api/v1';
        break;
    }
  }

  async getBenefitDetails(
    lookup: z.infer<typeof LookupTypeSchema>,
    memberId: string,
    productType: z.infer<typeof ProductTypeSchema>,
    planId: string,
    optionsParam?: BenefitRequestOptions
  ): Promise<{ data: BenefitDetails }> {
    if (this.enableMocks) {
      console.log(`Mock BenefitsService.getBenefitDetails called for ${memberId}, plan ${planId}, product ${productType}, options:`, optionsParam);
      throw new Error('Mock for getBenefitDetails not implemented');
    }

    const endpoint = `${this.serviceContextPath}/members/${lookup}/${memberId}/benefits/${productType}/${planId}`;
    
    const queryParameters: any = {};
    if (optionsParam) {
      let displayMode = 0;
      if (optionsParam.groupByServiceClass) displayMode |= 1;
      if (optionsParam.groupByNetworkTier) displayMode |= 2;
      if (optionsParam.autoSort) displayMode |= 4;
      queryParameters.displayMode = displayMode;

      if (optionsParam.indicator) {
        queryParameters.indicator = optionsParam.indicator;
      }
      if (optionsParam.asOfDate) {
        queryParameters.asOfDate = optionsParam.asOfDate;
      }
    }

    try {
      console.log(`BenefitsService.getBenefitDetails: Calling ${endpoint} with params:`, queryParameters);
      const response = await this.client.get<BenefitDetails>(endpoint, { params: queryParameters });
      return { data: response.data };
    } catch (error) {
      console.error(`Error fetching benefit details from ${endpoint}:`, error);
      throw error;
    }
  }
} 
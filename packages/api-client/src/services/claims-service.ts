import axios, { AxiosInstance } from 'axios';
import { z } from 'zod';
import type { ContextTypeSchema, LookupTypeSchema, Member, Claim, ClaimSearchParams } from '../trpc/types';

interface ServiceOptions {
  baseUrl: string;
  context: z.infer<typeof ContextTypeSchema>;
  portalLogin: string;
  bearerToken?: string;
  defaultTimeout?: number;
  enableMocks?: boolean;
}

export class ClaimsService {
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

  async searchClaims(lookup: z.infer<typeof LookupTypeSchema>, memberId: string, params: Omit<ClaimSearchParams, 'context' | 'lookup' | 'memberId'>): Promise<{ data: Claim[] }> {
    if (this.enableMocks) {
      console.log(`Mock ClaimsService.searchClaims called for ${memberId} via ${lookup} with params:`, params);
      throw new Error('Mock for searchClaims not implemented');
    }

    let endpoint = `${this.serviceContextPath}/members/${lookup}/${memberId}/claims`;
    let queryParameters: any = { ...params };

    try {
      console.log(`ClaimsService.searchClaims: Calling ${endpoint} with params:`, queryParameters);
      const response = await this.client.get<Claim[]>(endpoint, { params: queryParameters });
      return { data: response.data };
    } catch (error) {
      console.error(`Error searching claims from ${endpoint}:`, error);
      throw error;
    }
  }

  async getClaimById(lookup: z.infer<typeof LookupTypeSchema>, memberId: string, claimId: string): Promise<{ data: Claim }> {
    if (this.enableMocks) {
      console.log(`Mock ClaimsService.getClaimById called for claim ${claimId}, member ${memberId} via ${lookup}`);
      throw new Error('Mock for getClaimById not implemented');
    }

    const endpoint = `${this.serviceContextPath}/members/${lookup}/${memberId}/claims`;
    const queryParameters = { claimId };

    try {
      console.log(`ClaimsService.getClaimById: Calling ${endpoint} with params:`, queryParameters);
      const response = await this.client.get<Claim>(endpoint, { params: queryParameters });
      return { data: response.data };
    } catch (error) {
      console.error(`Error fetching claim by ID from ${endpoint}:`, error);
      throw error;
    }
  }

  async getClaimLineItems(lookup: z.infer<typeof LookupTypeSchema>, memberId: string, claimType: string, claimId: string): Promise<{ data: any[] }> {
    if (this.enableMocks) {
      console.log(`Mock ClaimsService.getClaimLineItems called for claim ${claimId}, type ${claimType}, member ${memberId} via ${lookup}`);
      throw new Error('Mock for getClaimLineItems not implemented');
    }

    const endpoint = `${this.serviceContextPath}/members/${lookup}/${memberId}/claims/${claimType}/${claimId}/lineItems`;

    try {
      console.log(`ClaimsService.getClaimLineItems: Calling ${endpoint}`);
      const response = await this.client.get<any[]>(endpoint);
      return { data: response.data };
    } catch (error) {
      console.error(`Error fetching claim line items from ${endpoint}:`, error);
      throw error;
    }
  }
} 
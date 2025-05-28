import axios, { AxiosInstance } from 'axios';
import { z } from 'zod';
import type { ContextTypeSchema, LookupTypeSchema, Member, MemberSearchParams, Claim, ClaimSearchParams, BenefitDetails, BenefitRequestOptions } from '../trpc/types'; // Adjusted path

interface ServiceOptions {
  baseUrl: string;
  context: z.infer<typeof ContextTypeSchema>;
  portalLogin: string;
  bearerToken?: string;
  defaultTimeout?: number;
  enableMocks?: boolean;
}

// Define a generic API response structure if your backend is consistent
// For now, we'll let methods define their specific expected data structure.
// interface ApiResponse<T> {
//   data: T;
//   // Add other common response fields like pagination, errors, etc.
// }

export class MemberService {
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
        // Common context might point to a different base or be handled by specific methods
        this.serviceContextPath = '/api/v1'; 
        break;
    }
  }

  async getMember(lookup: z.infer<typeof LookupTypeSchema>, memberId: string): Promise<{ data: Member }> {
    if (this.enableMocks) {
      console.log(`Mock MemberService.getMember called for ${memberId} via ${lookup}`);
      // Implement mock response based on your MemberSchema
      // Example: return Promise.resolve({ data: { memberCk: 'mockCk', subscriberCk: 'mockSubCk', ... } });
      throw new Error('Mock for getMember not implemented');
    }
    // The actual API endpoint construction might need more nuance based on 'lookup' type
    // if it affects the path differently than just being a path parameter.
    const endpoint = `${this.serviceContextPath}/members/${lookup}/${memberId}`;
    try {
      console.log(`MemberService.getMember: Calling ${endpoint}`);
      const response = await this.client.get<Member>(endpoint);
      return { data: response.data }; // Wrap the response to match Promise<{ data: Member }>
    } catch (error) {
      console.error(`Error fetching member from ${endpoint}:`, error);
      // Consider more specific error handling or re-throwing a custom service error
      throw error; // Re-throw for the tRPC router to catch and format
    }
  }

  async getMemberData(lookup: z.infer<typeof LookupTypeSchema>, memberId: string): Promise<{ data: Member }> {
    if (this.enableMocks) {
        console.log(`Mock MemberService.getMemberData called for ${memberId} via ${lookup}`);
        // Example: return Promise.resolve({ data: { memberCk: 'mockCk', subscriberCk: 'mockSubCk', ... } });
        throw new Error('Mock for getMemberData not implemented');
    }
    const endpoint = `${this.serviceContextPath}/members/${lookup}/${memberId}/data`;
    try {
      console.log(`MemberService.getMemberData: Calling ${endpoint}`);
      const response = await this.client.get<Member>(endpoint);
      return { data: response.data }; // Wrap the response
    } catch (error) {
      console.error(`Error fetching member data from ${endpoint}:`, error);
      throw error;
    }
  }

  async searchMembers(params: Omit<MemberSearchParams, 'context'>): Promise<{ data: Member[] }> {
    if (this.enableMocks) {
        console.log('Mock MemberService.searchMembers called with params:', params);
        // Example: return Promise.resolve({ data: [{ memberCk: 'mockCk1', ... }, { memberCk: 'mockCk2', ... }] });
        throw new Error('Mock for searchMembers not implemented');
    }
    const endpoint = `${this.serviceContextPath}/members`;
    try {
      console.log(`MemberService.searchMembers: Calling ${endpoint} with params:`, params);
      // The actual API might return an object like { items: Member[], totalCount: number } 
      // or just Member[]. We're assuming it returns at least an array that can be put into `data`.
      // The tRPC router currently fabricates pagination details.
      const response = await this.client.get<Member[]>(endpoint, { params }); 
      return { data: response.data }; // Assuming API returns Member[] directly or response.data is Member[]
    } catch (error) {
      console.error(`Error searching members from ${endpoint}:`, error);
      throw error;
    }
  }

  async getMemberEligibility(lookup: z.infer<typeof LookupTypeSchema>, memberId: string, asOfDate?: string): Promise<{ data: any }> {
    if (this.enableMocks) {
        console.log(`Mock MemberService.getMemberEligibility called for ${memberId} via ${lookup}, asOfDate: ${asOfDate}`);
        // Example: return Promise.resolve({ data: { memberCk: 'mockCk', eligible: true, ... } });
        throw new Error('Mock for getMemberEligibility not implemented');
    }
    const endpoint = `${this.serviceContextPath}/members/${lookup}/${memberId}/eligibility`;
    const queryParams: { asOfDate?: string } = {};
    if (asOfDate) {
      queryParams.asOfDate = asOfDate;
    }

    try {
      console.log(`MemberService.getMemberEligibility: Calling ${endpoint} with params:`, queryParams);
      const response = await this.client.get<any>(endpoint, { params: queryParams });
      return { data: response.data };
    } catch (error) {
      console.error(`Error fetching member eligibility from ${endpoint}:`, error);
      throw error;
    }
  }
} 
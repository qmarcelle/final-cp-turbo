import { APIClient } from '../core/APIClient';
import { RequestOptions } from '../core/types';
import {
  Claim,
  ClaimDetailsResponse,
  ClaimsListResponse,
  ClaimsQueryParams,
  SubmitAppealRequest
} from './types';

/**
 * API client for interacting with claims endpoints
 */
export class ClaimsAPIClient {
  private readonly client: APIClient;
  private readonly basePath: string;

  constructor(client: APIClient, basePath = '/api/claims') {
    this.client = client;
    this.basePath = basePath;
  }

  /**
   * Get a paginated list of claims for the current member
   */
  public async getClaims(
    params?: ClaimsQueryParams,
    options?: RequestOptions
  ): Promise<ClaimsListResponse> {
    // Convert array parameters to comma-separated strings for API compatibility
    const formattedParams = params ? {
      ...params,
      status: params.status?.join(','),
      type: params.type?.join(','),
    } : undefined;

    const response = await this.client.get<ClaimsListResponse>(
      this.basePath,
      {
        ...options,
        params: formattedParams,
      }
    );
    return response.data;
  }

  /**
   * Get detailed information about a specific claim
   */
  public async getClaimDetails(
    claimId: string,
    options?: RequestOptions
  ): Promise<Claim> {
    const response = await this.client.get<ClaimDetailsResponse>(
      `${this.basePath}/${claimId}`,
      options
    );
    return response.data.claim;
  }

  /**
   * Download an Explanation of Benefits (EOB) document
   * Returns a URL to the document that can be used for download
   */
  public async getEOBDocument(
    claimId: string,
    options?: RequestOptions
  ): Promise<string> {
    const response = await this.client.get<{ url: string }>(
      `${this.basePath}/${claimId}/eob`,
      options
    );
    return response.data.url;
  }

  /**
   * Submit an appeal for a denied claim
   */
  public async submitAppeal(
    appeal: SubmitAppealRequest,
    options?: RequestOptions
  ): Promise<{ appealId: string; status: string }> {
    const response = await this.client.post<{ appealId: string; status: string }>(
      `${this.basePath}/appeals`,
      appeal,
      options
    );
    return response.data;
  }

  /**
   * Get a list of appeals for a specific claim
   */
  public async getAppeals(
    claimId: string,
    options?: RequestOptions
  ): Promise<Array<{ id: string; status: string; submittedDate: string; reason: string }>> {
    const response = await this.client.get<{
      appeals: Array<{ id: string; status: string; submittedDate: string; reason: string }>;
    }>(`${this.basePath}/${claimId}/appeals`, options);
    return response.data.appeals;
  }
}

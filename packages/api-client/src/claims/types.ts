/**
 * Claims-specific API types
 */

export enum ClaimStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  DENIED = 'denied',
  PROCESSING = 'processing',
  APPEALED = 'appealed',
  CANCELLED = 'cancelled',
}

export enum ClaimType {
  MEDICAL = 'medical',
  PHARMACY = 'pharmacy',
  DENTAL = 'dental',
  VISION = 'vision',
  BEHAVIORAL = 'behavioral',
}

export enum ServiceType {
  OFFICE_VISIT = 'office_visit',
  EMERGENCY = 'emergency',
  HOSPITAL = 'hospital',
  PROCEDURE = 'procedure',
  LABORATORY = 'laboratory',
  PREVENTIVE = 'preventive',
  PRESCRIPTION = 'prescription',
  THERAPY = 'therapy',
  IMAGING = 'imaging',
  OTHER = 'other',
}

export interface Provider {
  id: string;
  name: string;
  npi?: string;
  network: 'in' | 'out';
  specialtyCode?: string;
  specialty?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
}

export interface ServiceLine {
  id: string;
  serviceDate: string;
  cpt?: string;
  description: string;
  serviceType: ServiceType;
  billed: number;
  allowed: number;
  memberResponsibility: number;
  planPaid: number;
  remarks?: string[];
}

export interface Claim {
  id: string;
  claimNumber: string;
  status: ClaimStatus;
  type: ClaimType;
  patient: {
    id: string;
    name: string;
    relationship: 'self' | 'spouse' | 'child' | 'other';
  };
  provider: Provider;
  dateOfService: string;
  dateReceived: string;
  dateProcessed?: string;
  totalBilled: number;
  totalAllowed: number;
  totalPaid: number;
  memberResponsibility: number;
  serviceLines: ServiceLine[];
  eob?: {
    id: string;
    url: string;
    dateGenerated: string;
  };
}

export interface ClaimDetailsResponse {
  claim: Claim;
}

export interface ClaimsListResponse {
  claims: Claim[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ClaimsQueryParams {
  page?: number;
  pageSize?: number;
  status?: ClaimStatus[];
  type?: ClaimType[];
  dateFrom?: string;
  dateTo?: string;
  providerId?: string;
  patientId?: string;
  sortBy?: 'dateOfService' | 'dateReceived' | 'dateProcessed' | 'claimNumber' | 'totalBilled';
  sortDirection?: 'asc' | 'desc';
}

export interface SubmitAppealRequest {
  claimId: string;
  reason: string;
  description: string;
  attachmentIds?: string[];
}

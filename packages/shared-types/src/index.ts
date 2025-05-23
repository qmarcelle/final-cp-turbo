/**
 * Common type definitions for use across the application
 */

// Export all form related types
export * from './form';

// User types
export interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  isActive: boolean;
  preferences?: UserPreferences;
}

export type UserRole = 'admin' | 'broker' | 'employer' | 'guest';

export interface UserPreferences {
  theme?: 'light' | 'dark' | 'system';
  notifications?: NotificationPreferences;
  accessibility?: AccessibilityPreferences;
}

export interface NotificationPreferences {
  email: boolean;
  sms: boolean;
  push: boolean;
}

export interface AccessibilityPreferences {
  highContrast: boolean;
  reducedMotion: boolean;
  fontSize: 'small' | 'medium' | 'large';
}

// Claims types
export type ClaimStatus =
  | 'pending'
  | 'in_progress'
  | 'approved'
  | 'denied'
  | 'appealed'
  | 'completed';

export type ClaimType = 
  | 'medical'
  | 'dental'
  | 'vision'
  | 'pharmacy'
  | 'other';

export interface Claim {
  id: string;
  claimNumber: string;
  memberId: string;
  providerId: string;
  providerName: string;
  dateOfService: string;
  dateReceived: string;
  dateProcessed?: string;
  status: ClaimStatus;
  type: ClaimType;
  totalBilled: number;
  totalCovered?: number;
  totalPaid?: number;
  memberResponsibility?: number;
  description?: string;
  services: ClaimService[];
}

export interface ClaimService {
  id: string;
  serviceCode: string;
  description: string;
  dateOfService: string;
  billed: number;
  covered?: number;
  paid?: number;
  memberResponsibility?: number;
  status: ClaimStatus;
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

// API Response types
export interface ApiResponse<T> {
  data: T;
  meta?: {
    page?: number;
    pageSize?: number;
    totalCount?: number;
    totalPages?: number;
  };
  error?: ApiError;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, any>;
}

// UI Component Props
export interface BadgeProps {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  size?: 'small' | 'medium' | 'large';
  label: string;
  className?: string;
}

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'outline' | 'ghost' | 'link';
  size?: 'small' | 'medium' | 'large';
  isLoading?: boolean;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
  children: any;
}

// Add Jest configuration
export interface JestConfig {
  rootDir: string;
  testEnvironment: string;
  setupFilesAfterEnv?: string[];
  testMatch?: string[];
  transform?: Record<string, string>;
  moduleNameMapper?: Record<string, string>;
  collectCoverageFrom?: string[];
  coverageThreshold?: {
    global?: {
      branches?: number;
      functions?: number;
      lines?: number;
      statements?: number;
    };
  };
}

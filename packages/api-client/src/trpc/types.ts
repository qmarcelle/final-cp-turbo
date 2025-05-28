import { z } from 'zod';

// Base schemas
export const LookupTypeSchema = z.enum(['byLoginId', 'byMemberId', 'byMemberCk', 'bySubscriberCk', 'bySubscriberId']);
export const ContextTypeSchema = z.enum(['common', 'employer', 'broker', 'internal']);
export const ProductTypeSchema = z.enum(['M', 'D', 'V', 'F']); // Medical, Dental, Vision, Pharmacy

// Member schemas
export const MemberSchema = z.object({
  memberCk: z.string(),
  subscriberCk: z.string(),
  subscriberId: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  dateOfBirth: z.string(),
  groupId: z.string(),
  suffix: z.string().optional(),
  ssn: z.string().optional(),
  relationship: z.string().optional(),
});

export const MemberSearchParamsSchema = z.object({
  subscriberId: z.string().optional(),
  suffix: z.string().optional(),
  ssn: z.string().optional(),
  groupId: z.string().optional(),
  departmentId: z.string().optional(),
  subGroupId: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  birthDate: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zip: z.string().optional(),
  hicn: z.string().optional(),
  medicaidId: z.string().optional(),
  asOfDate: z.string().optional(),
  page: z.number().min(1).default(1),
  pageSize: z.number().min(1).max(100).default(20),
  relation: z.string().optional(),
});

// Claims schemas
export const ClaimSchema = z.object({
  claimId: z.string(),
  claimType: z.string(),
  serviceDate: z.string(),
  providerName: z.string(),
  claimAmount: z.number(),
  paidAmount: z.number(),
  memberResponsibility: z.number(),
  status: z.string(),
  productType: ProductTypeSchema,
});

export const ClaimSearchParamsSchema = z.object({
  from: z.string().regex(/^\d{2}-\d{2}-\d{4}$/, 'Date must be in MM-DD-YYYY format'),
  to: z.string().regex(/^\d{2}-\d{2}-\d{4}$/, 'Date must be in MM-DD-YYYY format'),
  type: z.string().optional(),
  maxResult: z.number().min(1).max(1000).default(50),
});

// Benefits schemas
export const BenefitDetailSchema = z.object({
  serviceName: z.string(),
  inNetworkCost: z.string(),
  outOfNetworkCost: z.string(),
  deductible: z.string(),
  outOfPocketMax: z.string(),
});

export const ServiceClassSchema = z.object({
  className: z.string(),
  details: z.array(BenefitDetailSchema),
});

export const BenefitSummarySchema = z.object({
  deductible: z.object({
    individual: z.string(),
    family: z.string(),
  }),
  outOfPocketMax: z.object({
    individual: z.string(),
    family: z.string(),
  }),
});

export const BenefitDetailsSchema = z.object({
  planId: z.string(),
  productType: ProductTypeSchema,
  serviceClasses: z.array(ServiceClassSchema),
  summary: BenefitSummarySchema,
});

export const BenefitRequestOptionsSchema = z.object({
  groupByServiceClass: z.boolean().default(false),
  groupByNetworkTier: z.boolean().default(false),
  autoSort: z.boolean().default(false),
  indicator: z.string().optional(),
  asOfDate: z.string().optional(),
});

// Input schemas for procedures
export const GetMemberInputSchema = z.object({
  lookup: LookupTypeSchema,
  memberId: z.string(),
  context: ContextTypeSchema.default('common'),
});

export const SearchMembersInputSchema = MemberSearchParamsSchema.extend({
  context: ContextTypeSchema.default('common'),
});

export const SearchClaimsInputSchema = ClaimSearchParamsSchema.extend({
  lookup: LookupTypeSchema,
  memberId: z.string(),
  context: ContextTypeSchema.default('common'),
});

export const GetBenefitDetailsInputSchema = z.object({
  lookup: LookupTypeSchema,
  memberId: z.string(),
  productType: ProductTypeSchema,
  planId: z.string(),
  context: ContextTypeSchema.default('common'),
  options: BenefitRequestOptionsSchema.optional(),
});

// Type exports
export type Member = z.infer<typeof MemberSchema>;
export type MemberSearchParams = z.infer<typeof MemberSearchParamsSchema>;
export type Claim = z.infer<typeof ClaimSchema>;
export type ClaimSearchParams = z.infer<typeof ClaimSearchParamsSchema>;
export type BenefitDetails = z.infer<typeof BenefitDetailsSchema>;
export type BenefitRequestOptions = z.infer<typeof BenefitRequestOptionsSchema>;

// Export inferred enum types
export type LookupType = z.infer<typeof LookupTypeSchema>;
export type ContextType = z.infer<typeof ContextTypeSchema>;
export type ProductType = z.infer<typeof ProductTypeSchema>; 
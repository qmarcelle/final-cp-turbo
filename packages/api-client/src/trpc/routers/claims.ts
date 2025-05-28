import { z } from 'zod';
import { router, protectedProcedure } from '../context';
import { 
  SearchClaimsInputSchema,
  ClaimSchema,
  GetMemberInputSchema 
} from '../types';
import { ClaimsService } from '../../services/claims-service';

export const claimsRouter = router({
  // Search claims
  searchClaims: protectedProcedure
    .input(SearchClaimsInputSchema)
    .output(z.array(ClaimSchema))
    .query(async ({ input, ctx }) => {
      const service = new ClaimsService({
        baseUrl: ctx.baseUrl,
        context: input.context,
        portalLogin: ctx.portalLogin!,
        defaultTimeout: 30000,
        enableMocks: ctx.enableMocks,
      });

      const { lookup, memberId, context, ...searchParams } = input;
      const result = await service.searchClaims(lookup, memberId, searchParams);
      return result.data;
    }),

  // Get claim by ID
  getClaimById: protectedProcedure
    .input(GetMemberInputSchema.extend({
      claimId: z.string(),
    }))
    .output(ClaimSchema)
    .query(async ({ input, ctx }) => {
      const service = new ClaimsService({
        baseUrl: ctx.baseUrl,
        context: input.context,
        portalLogin: ctx.portalLogin!,
        defaultTimeout: 30000,
        enableMocks: ctx.enableMocks,
      });

      const result = await service.getClaimById(input.lookup, input.memberId, input.claimId);
      return result.data;
    }),

  // Get claim line items
  getClaimLineItems: protectedProcedure
    .input(GetMemberInputSchema.extend({
      claimId: z.string(),
      claimType: z.string(),
    }))
    .output(z.array(z.object({
      lineNumber: z.number(),
      procedureCode: z.string(),
      description: z.string(),
      chargedAmount: z.number(),
      allowedAmount: z.number(),
      paidAmount: z.number(),
      memberResponsibility: z.number(),
    })))
    .query(async ({ input, ctx }) => {
      const service = new ClaimsService({
        baseUrl: ctx.baseUrl,
        context: input.context,
        portalLogin: ctx.portalLogin!,
        defaultTimeout: 30000,
        enableMocks: ctx.enableMocks,
      });

      const result = await service.getClaimLineItems(
        input.lookup, 
        input.memberId, 
        input.claimType, 
        input.claimId
      );
      return result.data;
    }),
}); 
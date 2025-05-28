import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { router, protectedProcedure } from '../context';
import { 
  GetMemberInputSchema, 
  SearchMembersInputSchema,
  MemberSchema,
  MemberSearchParamsSchema 
} from '../types';
import { MemberService } from '../../services/member-service';

export const memberRouter = router({
  // Get member by lookup
  getMember: protectedProcedure
    .input(GetMemberInputSchema)
    .output(MemberSchema)
    .query(async ({ input, ctx }) => {
      try {
        const service = new MemberService({
          baseUrl: ctx.baseUrl,
          context: input.context,
          portalLogin: ctx.portalLogin!,
          defaultTimeout: 30000,
          enableMocks: ctx.enableMocks,
        });

        const result = await service.getMember(input.lookup, input.memberId);
        return result.data;
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to fetch member',
          cause: error,
        });
      }
    }),

  // Get member data (extended info)
  getMemberData: protectedProcedure
    .input(GetMemberInputSchema)
    .output(MemberSchema)
    .query(async ({ input, ctx }) => {
      const service = new MemberService({
        baseUrl: ctx.baseUrl,
        context: input.context,
        portalLogin: ctx.portalLogin!,
        defaultTimeout: 30000,
        enableMocks: ctx.enableMocks,
      });

      const result = await service.getMemberData(input.lookup, input.memberId);
      return result.data;
    }),

  // Search members
  searchMembers: protectedProcedure
    .input(SearchMembersInputSchema)
    .output(z.object({
      data: z.array(MemberSchema),
      pagination: z.object({
        page: z.number(),
        pageSize: z.number(),
        total: z.number(),
        totalPages: z.number(),
      }),
    }))
    .query(async ({ input, ctx }) => {
      const service = new MemberService({
        baseUrl: ctx.baseUrl,
        context: input.context,
        portalLogin: ctx.portalLogin!,
        defaultTimeout: 30000,
        enableMocks: ctx.enableMocks,
      });

      const { context, ...searchParams } = input;
      const result = await service.searchMembers(searchParams);
      
      // Transform to include pagination
      return {
        data: Array.isArray(result.data) ? result.data : [result.data],
        pagination: {
          page: input.page,
          pageSize: input.pageSize,
          total: Array.isArray(result.data) ? result.data.length : 1,
          totalPages: 1,
        },
      };
    }),

  // Get member eligibility
  getEligibility: protectedProcedure
    .input(GetMemberInputSchema.extend({
      asOfDate: z.string().optional(),
    }))
    .output(z.object({
      memberCk: z.string(),
      eligible: z.boolean(),
      coverageStartDate: z.string(),
      coverageEndDate: z.string(),
      plans: z.array(z.object({
        productType: z.string(),
        planId: z.string(),
        planName: z.string(),
        status: z.string(),
      })),
    }))
    .query(async ({ input, ctx }) => {
      const service = new MemberService({
        baseUrl: ctx.baseUrl,
        context: input.context,
        portalLogin: ctx.portalLogin!,
        defaultTimeout: 30000,
        enableMocks: ctx.enableMocks,
      });

      const result = await service.getMemberEligibility(input.lookup, input.memberId, input.asOfDate);
      return result.data;
    }),
}); 
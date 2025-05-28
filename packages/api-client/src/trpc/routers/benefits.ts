import { router, protectedProcedure } from '../context';
import { 
  GetBenefitDetailsInputSchema,
  BenefitDetailsSchema 
} from '../types';
import { BenefitsService } from '../../services/benefits-service';

export const benefitsRouter = router({
  // Get benefit details
  getBenefitDetails: protectedProcedure
    .input(GetBenefitDetailsInputSchema)
    .output(BenefitDetailsSchema)
    .query(async ({ input, ctx }) => {
      const service = new BenefitsService({
        baseUrl: ctx.baseUrl,
        context: input.context,
        portalLogin: ctx.portalLogin!,
        defaultTimeout: 30000,
        enableMocks: ctx.enableMocks,
      });

      const result = await service.getBenefitDetails(
        input.lookup,
        input.memberId,
        input.productType,
        input.planId,
        input.options
      );
      return result.data;
    }),
}); 
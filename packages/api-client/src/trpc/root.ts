import { router } from './context';
import { memberRouter } from './routers/member';
import { claimsRouter } from './routers/claims';
import { benefitsRouter } from './routers/benefits';

export const appRouter = router({
  member: memberRouter,
  claims: claimsRouter,
  benefits: benefitsRouter,
});

export type AppRouter = typeof appRouter; 
import { initTRPC, TRPCError } from '@trpc/server';
import { z } from 'zod';

// Context interface
interface Context {
  portalLogin?: string;
  bearerToken?: string;
  baseUrl: string;
  enableMocks: boolean;
}

// Create context from request headers
export const createContext = ({ req }: { req?: Request }): Context => {
  const portalLogin = req?.headers.get('X-Portal-Login') || undefined;
  const authorization = req?.headers.get('Authorization') || undefined;
  const bearerToken = authorization?.replace('Bearer ', '') || undefined;

  return {
    portalLogin,
    bearerToken,
    baseUrl: process.env.MEMBER_API_BASE_URL || 'https://api.bcbst.com',
    enableMocks: process.env.NODE_ENV === 'development' || process.env.ENABLE_MOCKS === 'true',
  };
};

// Initialize tRPC
const t = initTRPC.context<Context>().create({
  errorFormatter(opts) {
    const { shape, error } = opts;
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError: error.code === 'BAD_REQUEST' && error.cause instanceof z.ZodError 
          ? error.cause.flatten() 
          : null,
      },
    };
  },
});

// Middleware for authentication
const authMiddleware = t.middleware(({ ctx, next }) => {
  if (!ctx.portalLogin) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'X-Portal-Login header is required',
    });
  }

  return next({
    ctx: {
      ...ctx,
      portalLogin: ctx.portalLogin,
    },
  });
});

// Create procedures
export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(authMiddleware); 
'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { createTRPCReact } from '@trpc/react-query';
import { useState } from 'react';
import type { AppRouter } from './root';

export const trpc = createTRPCReact<AppRouter>();

export function TRPCProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 10 * 60 * 1000,   // 10 minutes
      },
    },
  }));

  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: '/api/trpc', // This should be configurable, e.g., from an environment variable
          headers: async () => {
            // Get auth headers from your auth provider
            // This needs to be adapted to your actual auth implementation
            return {
              'X-Portal-Login': await getPortalLogin(),
              'Authorization': await getBearerToken(),
            };
          },
        }),
      ],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </trpc.Provider>
  );
}

// Helper functions for auth (placeholders - implement based on your auth strategy)
// These might live in a separate auth utility file and be imported.
async function getPortalLogin(): Promise<string> {
  // Example: const session = await getNextAuthSession(); return session?.user?.portalLogin || '';
  return 'g100000'; // Placeholder
}

async function getBearerToken(): Promise<string> {
  // Example: const session = await getNextAuthSession(); return session?.accessToken ? `Bearer ${session.accessToken}` : '';
  return 'your-bearer-token'; // Placeholder
} 
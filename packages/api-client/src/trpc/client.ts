import { createTRPCClient, httpBatchLink } from '@trpc/client';
import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from './root';

// For React components
export const trpc = createTRPCReact<AppRouter>();

// For server-side usage
export const trpcClient = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: '/api/trpc', // This will need to be configurable or passed in
      headers: () => {
        // Get headers from context/cookies/etc
        // This logic needs to be adapted to your actual auth implementation
        return {
          'X-Portal-Login': getPortalLogin(),
          'Authorization': getBearerToken(),
        };
      },
    }),
  ],
});

// Utility functions (implement based on your auth strategy)
// These are placeholders and need proper implementation
function getPortalLogin(): string {
  // Implementation depends on how you store portal login
  // Example: return typeof window !== 'undefined' ? localStorage.getItem('portalLogin') || '' : process.env.PORTAL_LOGIN || '';
  return process.env.PORTAL_LOGIN || ''; // Simplified for now
}

function getBearerToken(): string {
  // Implementation depends on your token management
  // Example: return typeof window !== 'undefined' ? `Bearer ${localStorage.getItem('authToken')}` || '' : `Bearer ${process.env.BEARER_TOKEN || ''}`;
  return process.env.BEARER_TOKEN ? `Bearer ${process.env.BEARER_TOKEN}` : ''; // Simplified for now
} 
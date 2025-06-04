import 'next-auth';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    error?: 'RefreshAccessTokenError';
    // You can add other custom properties to the session here, e.g.:
    // user: SessionUser; // If you always want your custom user type directly on session
  }

  // If you also want to add custom properties to the JWT token itself (not just session.user)
  // interface JWT {
  //   customProperty?: string;
  // }
} 
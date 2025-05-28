import NextAuth from 'next-auth';
import { authOptions } from '@portals/auth/src/auth.config'; // Ensure this path is correct relative to your monorepo structure

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }; 
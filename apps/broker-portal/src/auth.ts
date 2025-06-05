import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      id: "mock-broker",
      name: "Mock Broker Login",
      credentials: {
        brokerName: { label: "Broker Name", type: "text" },
        brokerId: { label: "Broker ID", type: "text" }
      },
      async authorize(credentials) {
        // For development, always return a successful login
        if (credentials?.brokerName && credentials?.brokerId) {
          return {
            id: credentials.brokerId as string,
            name: credentials.brokerName as string,
            email: `${credentials.brokerName}@broker.dev`,
            brokerId: credentials.brokerId as string,
            brokerName: credentials.brokerName as string,
          }
        }
        return null
      }
    })
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user && typeof user === 'object') {
        // Safely assign user properties to token
        const userWithBroker = user as any;
        if (userWithBroker.brokerId) {
          token.brokerId = userWithBroker.brokerId;
        }
        if (userWithBroker.brokerName) {
          token.brokerName = userWithBroker.brokerName;
        }
      }
      return token
    },
    async session({ session, token }) {
      if (token && session?.user) {
        // Safely assign token properties to session
        const sessionUser = session.user as any;
        if (token.brokerId) {
          sessionUser.brokerId = token.brokerId;
        }
        if (token.brokerName) {
          sessionUser.brokerName = token.brokerName;
        }
      }
      return session
    }
  },
  session: {
    strategy: "jwt"
  },
  // Add debug logging in development
  debug: process.env.NODE_ENV === 'development'
}) 
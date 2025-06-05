import {
  User as NextAuthUser,
  Account,
  Profile,
  Session as NextAuthSession,
} from 'next-auth'
import type { NextAuthConfig } from 'next-auth'
import type { JWT } from 'next-auth/jwt'
// import { Provider } from 'next-auth/providers'; // Not a standard export path, CredentialsProvider is a Provider
import CredentialsProvider from 'next-auth/providers/credentials'
import { verifyCredentials, getMfaDevices } from './authStore'
import { mapMfaDevices } from './mfaDeviceMapper'
import { refreshTokens } from './tokenRefresh'
import { computeSessionUser } from './userManagement/computeSessionUser'
import { planSwitchServiceAdapter } from './planSwitchServiceAdapter'
import { SessionUser } from './userManagement/models/sessionUser'

// The user object returned by authorize must have an id, other props are optional or added by NextAuth later.
// It will be passed to the `user` property in the `jwt` callback.
interface AuthorizeResponse extends Pick<NextAuthUser, 'id'> {
  name?: string | null // name is part of NextAuthUser, so it's fine here
  email?: string | null // email is part of NextAuthUser
  // Add any other custom properties you need to pass from authorize to jwt callback's user parameter
}

export const authOptions: NextAuthConfig = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
        mfaToken: { label: 'MFA Token', type: 'text' },
      },
      async authorize(
        credentials: Partial<Record<"username" | "password" | "mfaToken", unknown>>
      ): Promise<AuthorizeResponse | null> {
        if (!credentials || !credentials.username) return null

        // Convert unknown to string safely
        const username = credentials.username as string
        const password = credentials.password as string
        const mfaToken = credentials.mfaToken as string

        const credentialsRecord = {
          username,
          password,
          mfaToken
        }

        const userIsValid = await verifyCredentials(credentialsRecord)
        if (!userIsValid) {
          console.error(
            'Invalid primary credentials for:',
            username
          )
          throw new Error('Invalid credentials')
        }

        const mockUserId = username

        const mfaDevices = await getMfaDevices(mockUserId)
        if (mfaDevices && mfaDevices.length > 0) {
          if (
            !mfaToken ||
            !mapMfaDevices(mfaDevices, mfaToken)
          ) {
            console.error('MFA validation failed for:', username)
            throw new Error('Invalid MFA token')
          }
        }
        // Ensure the returned object strictly matches what NextAuth expects or what you define for AuthorizeResponse
        return {
          id: mockUserId,
          name: username,
          email: 'placeholder@example.com',
        }
      },
    }), // CredentialsProvider is already a Provider, no need to cast `as Provider`
  ],
  callbacks: {
    async jwt({
      token,
      user,
      account,
    }: {
      token: JWT
      user?: NextAuthUser | AuthorizeResponse
      account?: Account | null
    }): Promise<JWT> {
      if (user && user.id) {
        // If `user` came from `authorize`, it's `AuthorizeResponse`. We use its `id`.
        const sessionUserData = await computeSessionUser(user.id)
        token.user = sessionUserData // Embed our rich SessionUser object

        if (account) {
          // Typically for OAuth providers
          token.accessToken = account.access_token
          token.refreshToken = account.refresh_token
          token.idToken = account.id_token
          token.expiresAt = account.expires_at
            ? account.expires_at * 1000
            : undefined
        }
      } else {
        // Token exists from previous session/request, check for refresh
        if (
          token.refreshToken &&
          typeof token.expiresAt === 'number' &&
          Date.now() > token.expiresAt
        ) {
          try {
            const refreshed = await refreshTokens(token.refreshToken as string)
            token.accessToken = refreshed.access_token
            if (refreshed.refresh_token)
              token.refreshToken = refreshed.refresh_token
            token.expiresAt = refreshed.expires_at
              ? refreshed.expires_at * 1000
              : undefined
            if (refreshed.id_token) token.idToken = refreshed.id_token // If OIDC
          } catch (error) {
            console.error('Error refreshing token:', error)
            return { ...token, error: 'RefreshAccessTokenError' as const }
          }
        }
      }
      return token
    },
    async session({
      session,
      token,
    }: {
      session: NextAuthSession
      token: JWT
    }): Promise<NextAuthSession> {
      if (token.user) {
        session.user = token.user as SessionUser // Our custom SessionUser object
      }
      if (token.error === 'RefreshAccessTokenError') {
        session.error = 'RefreshAccessTokenError'
      }
      // Make sure to return the session object
      return session
    },
  },
  events: {
    async signIn({
      user,
      account,
      profile,
      isNewUser,
    }: {
      user: NextAuthUser
      account?: Account | null
      profile?: Profile
      isNewUser?: boolean
    }) {
      if (user && user.id) {
        await planSwitchServiceAdapter.handleSignIn({ id: user.id })
      }
    },
  },
  pages: {
    // signIn: '/auth/signin', // Custom sign-in page when needed
  },
  // secret: process.env.NEXTAUTH_SECRET, // MUST be set in .env
  // debug: process.env.NODE_ENV === 'development',
}

// This export is not typically used directly but can be if you have specific needs.
// The [...nextauth] route handler will use authOptions.
// export default NextAuth(authOptions);

import 'next-auth'
import 'next-auth/jwt'

declare module 'next-auth' {
  // eslint-disable-next-line no-unused-vars
  interface User {
    brokerId?: string
    brokerName?: string
  }

  // eslint-disable-next-line no-unused-vars
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
      brokerId?: string
      brokerName?: string
    }
  }
}

declare module 'next-auth/jwt' {
  // eslint-disable-next-line no-unused-vars
  interface JWT {
    brokerId?: string
    brokerName?: string
  }
}

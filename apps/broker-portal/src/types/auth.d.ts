import "next-auth"
import "next-auth/jwt"

declare module "next-auth" {
  interface User {
    brokerId?: string
    brokerName?: string
  }

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

declare module "next-auth/jwt" {
  interface JWT {
    brokerId?: string
    brokerName?: string
  }
} 
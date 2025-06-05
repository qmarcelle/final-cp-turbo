/**
 * SessionUser shapes the NextAuth session.user
 */
export interface SessionUser {
  id: string
  name?: string | null
  email?: string | null
  roles?: string[]
  selectedPlan?: string
  vRules?: Record<string, boolean>
  accessToken?: string // Added based on updated auth.config.ts session callback
}

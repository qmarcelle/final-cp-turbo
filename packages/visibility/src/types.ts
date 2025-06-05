export interface VisibilityContextType {
  vRules: Record<string, boolean>
  isLoading: boolean
  error?: Error | null
}

// Add other shared types here as your package evolves.

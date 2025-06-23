import { colors } from './tokens/colors'
import { breakpoints } from './tokens/breakpoints'
import { shadows } from './tokens/shadows'
import { spacing } from './tokens/spacing'
import { typography } from './tokens/typography'
import { zIndex } from './tokens/zIndex'

// Design Tokens
export const designTokens = {
  colors,
  typography,
  spacing,
  shadows,
  zIndex,
  breakpoints,
} as const

// CSS Custom Properties helper
export const getCSSCustomProperty = (tokenPath: string): string => {
  return `var(--${tokenPath.replace(/\./g, '-').toLowerCase()})`
}

// Utility function to get a design token value by path
export const getDesignToken = (path: string) => {
  return path
    .split('.')
    .reduce((obj: any, key: string) => obj?.[key], designTokens)
}

// Export design tokens as separate objects for convenience
export { colors, typography, spacing, shadows, zIndex, breakpoints }

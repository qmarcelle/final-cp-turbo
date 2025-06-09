// Design Tokens
export const designTokens = {
  colors: {
    // Primary Colors
    primaryBlue: "#005EB9",
    primaryBlueInactive: "#7FAEDC",
    
    // Secondary Colors
    secondaryBlue1: "#5DC1FD",
    secondaryBlue1Accent: "#E7F6FF",
    secondaryBlue2: "#00497E",
    secondaryBlue3: "#067DAC",
    secondaryBlue3Accent: "#008CC9",
    
    // Tertiary Colors (Grays)
    tertiaryGray1: "#333333",
    tertiaryGray3: "#737373",
    tertiaryGray4: "#CCCCCC",
    tertiaryGray5: "#F2F2F2",
    tertiaryGray6: "#FAFAFA",
    
    // Status Colors
    statusError: "#EB001B",
    statusSuccess: "#508316",
    
    // Label Colors
    labelSuccess: "#E2F0D3",
    labelError: "#EFDDDF",
    labelNeutral: "#F2F2F2",
    
    // Base Colors
    white: "#FFFFFF",
    black: "#000000"
  },
  
  typography: {
    fontFamilies: {
      light: "Univers-45",
      regular: "Univers-55",
      bold: "Univers-65"
    },
    sizes: {
      title1: {
        mobile: "32px",
        desktop: "40px"
      },
      title2: {
        mobile: "24px",
        desktop: "24px"
      },
      title3: {
        mobile: "20px",
        desktop: "20px"
      },
      body1: {
        mobile: "16px",
        desktop: "16px"
      },
      body2: {
        mobile: "12px",
        desktop: "12px"
      }
    },
    lineHeights: {
      title1: {
        mobile: "2.5rem",
        desktop: "3rem"
      },
      title2: {
        mobile: "2rem",
        desktop: "2rem"
      },
      title3: {
        mobile: "1.75rem",
        desktop: "1.75rem"
      },
      body1: {
        mobile: "1.5rem",
        desktop: "1.5rem"
      },
      body2: {
        mobile: "1rem",
        desktop: "1rem"
      }
    }
  },
  
  spacing: {
    xxs: "4px",
    xs: "8px",
    sm: "12px",
    md: "16px",
    lg: "24px",
    xl: "32px",
    xxl: "48px",
    xxxl: "64px"
  },
  
  breakpoints: {
    mobile: {
      min: "0px",
      max: "767px"
    },
    small: {
      min: "768px",
      max: "1023px"
    },
    medium: {
      min: "1024px",
      max: "1439px"
    },
    large: {
      min: "1440px"
    }
  }
} as const;

// CSS Custom Properties helper
export const getCSSCustomProperty = (tokenPath: string): string => {
  return `var(--${tokenPath.replace(/\./g, '-').toLowerCase()})`;
};

// Utility function to get design token values
export const getDesignToken = (path: string): any => {
  return path.split('.').reduce((obj, key) => obj?.[key], designTokens);
};

// Export design tokens as separate objects for convenience
export const colors = designTokens.colors;
export const typography = designTokens.typography;
export const spacing = designTokens.spacing;
export const breakpoints = designTokens.breakpoints;
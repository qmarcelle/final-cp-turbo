import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

// Design Token Display Components
const ColorPalette = ({ colors, title }: { colors: Record<string, string>; title: string }) => (
  <div className="mb-8">
    <h3 className="text-xl font-bold mb-4">{title}</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {Object.entries(colors).map(([name, value]) => (
        <div key={name} className="border rounded-lg p-4 bg-white shadow-sm">
          <div
            className="w-full h-16 rounded-md border mb-3"
            style={{ backgroundColor: value }}
          />
          <div className="text-sm">
            <div className="font-semibold text-gray-900">{name}</div>
            <div className="font-mono text-gray-600">{value}</div>
            <div className="font-mono text-xs text-gray-500">
              var(--color-{name.replace(/([A-Z])/g, '-$1').toLowerCase()})
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const TypographyScale = () => {
  const typography = {
    fontFamilies: {
      light: "Univers-45",
      regular: "Univers-55", 
      bold: "Univers-65"
    },
    sizes: {
      title1: { mobile: "32px", desktop: "40px" },
      title2: { mobile: "24px", desktop: "24px" },
      title3: { mobile: "20px", desktop: "20px" },
      body1: { mobile: "16px", desktop: "16px" },
      body2: { mobile: "12px", desktop: "12px" }
    },
    lineHeights: {
      title1: { mobile: "2.5rem", desktop: "3rem" },
      title2: { mobile: "2rem", desktop: "2rem" },
      title3: { mobile: "1.75rem", desktop: "1.75rem" },
      body1: { mobile: "1.5rem", desktop: "1.5rem" },
      body2: { mobile: "1rem", desktop: "1rem" }
    }
  };

  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold mb-4">Typography Scale</h3>
      
      {/* Font Families */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold mb-3">Font Families</h4>
        <div className="grid gap-4">
          {Object.entries(typography.fontFamilies).map(([weight, family]) => (
            <div key={weight} className="border rounded-lg p-4 bg-white shadow-sm">
              <div className="flex items-center justify-between">
                <span 
                  className="text-2xl" 
                  style={{ fontFamily: family }}
                >
                  The quick brown fox jumps over the lazy dog
                </span>
                <div className="text-right text-sm">
                  <div className="font-semibold">{weight}</div>
                  <div className="font-mono text-gray-600">{family}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Type Scale */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold mb-3">Type Scale</h4>
        <div className="grid gap-4">
          {Object.entries(typography.sizes).map(([scale, sizes]) => (
            <div key={scale} className="border rounded-lg p-4 bg-white shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                  <div 
                    className="font-medium"
                    style={{ 
                      fontSize: sizes.desktop,
                      lineHeight: typography.lineHeights[scale as keyof typeof typography.lineHeights].desktop,
                      fontFamily: 'Univers-55'
                    }}
                  >
                    {scale} Sample Text
                  </div>
                </div>
                <div className="text-right text-sm">
                  <div className="font-semibold">{scale}</div>
                  <div className="font-mono text-gray-600">Mobile: {sizes.mobile}</div>
                  <div className="font-mono text-gray-600">Desktop: {sizes.desktop}</div>
                  <div className="font-mono text-gray-500">
                    Line Height: {typography.lineHeights[scale as keyof typeof typography.lineHeights].desktop}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const SpacingScale = () => {
  const spacing = {
    xxs: "4px",
    xs: "8px", 
    sm: "12px",
    md: "16px",
    lg: "24px",
    xl: "32px",
    xxl: "48px",
    xxxl: "64px"
  };

  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold mb-4">Spacing Scale</h3>
      <div className="grid gap-4">
        {Object.entries(spacing).map(([name, value]) => (
          <div key={name} className="border rounded-lg p-4 bg-white shadow-sm">
            <div className="flex items-center gap-4">
              <div
                className="bg-blue-500 rounded"
                style={{ width: value, height: value }}
              />
              <div className="flex-1">
                <div className="font-semibold">{name}</div>
                <div className="font-mono text-gray-600">{value}</div>
                <div className="font-mono text-xs text-gray-500">
                  var(--spacing-{name})
                </div>
              </div>
              <div className="text-right">
                <div className="font-mono text-sm">{value}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const BreakpointsScale = () => {
  const breakpoints = {
    mobile: { min: "0px", max: "767px" },
    small: { min: "768px", max: "1023px" },
    medium: { min: "1024px", max: "1439px" },
    large: { min: "1440px" }
  };

  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold mb-4">Breakpoints</h3>
      <div className="grid gap-4">
        {Object.entries(breakpoints).map(([name, range]) => (
          <div key={name} className="border rounded-lg p-4 bg-white shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold capitalize">{name}</div>
                <div className="text-gray-600">
                  {range.min} {range.max ? `- ${range.max}` : '+'}
                </div>
              </div>
              <div className="text-right text-sm font-mono">
                <div>{range.min}</div>
                {range.max && <div>to {range.max}</div>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main Design Tokens Component
const DesignTokens = () => {
  const colors = {
    // Primary Colors
    primaryBlue: "#005EB9",
    primaryBlueInactive: "#7FAEDC",
    
    // Secondary Blues
    secondaryBlue1: "#5DC1FD",
    secondaryBlue1Accent: "#E7F6FF", 
    secondaryBlue2: "#00497E",
    secondaryBlue3: "#067DAC",
    secondaryBlue3Accent: "#008CC9",
    
    // Tertiary Grays
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
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">🎨 Design Tokens</h1>
          <p className="text-gray-600">
            A comprehensive overview of the design system's foundational elements including colors, typography, spacing, and breakpoints.
          </p>
        </div>

        <ColorPalette colors={colors} title="Color Palette" />
        <TypographyScale />
        <SpacingScale />
        <BreakpointsScale />

        {/* CSS Custom Properties Reference */}
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4">CSS Custom Properties</h3>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
            <pre>{`:root {
  /* Primary Colors */
  --color-primary-blue: #005EB9;
  --color-primary-blue-inactive: #7FAEDC;
  
  /* Secondary Colors */
  --color-secondary-blue-1: #5DC1FD;
  --color-secondary-blue-1-accent: #E7F6FF;
  --color-secondary-blue-2: #00497E;
  --color-secondary-blue-3: #067DAC;
  --color-secondary-blue-3-accent: #008CC9;
  
  /* Tertiary Colors */
  --color-tertiary-gray-1: #333333;
  --color-tertiary-gray-3: #737373;
  --color-tertiary-gray-4: #CCCCCC;
  --color-tertiary-gray-5: #F2F2F2;
  --color-tertiary-gray-6: #FAFAFA;
  
  /* Status Colors */
  --color-status-error: #EB001B;
  --color-status-success: #508316;
  
  /* Label Colors */
  --color-label-success: #E2F0D3;
  --color-label-error: #EFDDDF;
  --color-label-neutral: #F2F2F2;
  
  /* Spacing */
  --spacing-xxs: 4px;
  --spacing-xs: 8px;
  --spacing-sm: 12px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  --spacing-xxl: 48px;
  --spacing-xxxl: 64px;
  
  /* Typography */
  --font-family-light: 'Univers-45';
  --font-family-regular: 'Univers-55';
  --font-family-bold: 'Univers-65';
}`}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};

const meta: Meta<typeof DesignTokens> = {
  title: '🎨 Design System/Design Tokens',
  component: DesignTokens,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# 🎨 Design Tokens

Design tokens are the foundational elements of our design system. They define the visual characteristics of our interface including colors, typography, spacing, and breakpoints.

## Color System

Our color system is built around the BlueCross brand identity with a primary blue palette, complementary secondary blues, functional grays, and semantic status colors.

### Primary Colors
- **Primary Blue (#005EB9)**: Main brand color used for primary actions and navigation
- **Primary Blue Inactive (#7FAEDC)**: Disabled state of primary blue

### Secondary Colors  
- **Secondary Blue 1 (#5DC1FD)**: Accent color for highlights and secondary actions
- **Secondary Blue 2 (#00497E)**: Darker blue for hover states and emphasis
- **Secondary Blue 3 (#067DAC)**: Alternative blue for variety in the palette

### Status Colors
- **Error (#EB001B)**: Destructive actions and error states
- **Success (#508316)**: Success states and positive feedback

## Typography

Typography uses the Univers font family in three weights:
- **Univers-45 (Light)**: For large display text
- **Univers-55 (Regular)**: Standard body text
- **Univers-65 (Bold)**: Emphasis and headings

## Spacing Scale

Consistent spacing using a 4px base unit:
- xxs (4px), xs (8px), sm (12px), md (16px), lg (24px), xl (32px), xxl (48px), xxxl (64px)

## Responsive Breakpoints

- **Mobile**: 0-767px
- **Small**: 768-1023px  
- **Medium**: 1024-1439px
- **Large**: 1440px+
        `
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof DesignTokens>;

export const Overview: Story = {
  render: () => <DesignTokens />
};

export const Colors: Story = {
  render: () => {
    const colors = {
      primaryBlue: "#005EB9",
      primaryBlueInactive: "#7FAEDC",
      secondaryBlue1: "#5DC1FD",
      secondaryBlue1Accent: "#E7F6FF",
      secondaryBlue2: "#00497E",
      secondaryBlue3: "#067DAC",
      secondaryBlue3Accent: "#008CC9",
      tertiaryGray1: "#333333",
      tertiaryGray3: "#737373", 
      tertiaryGray4: "#CCCCCC",
      tertiaryGray5: "#F2F2F2",
      tertiaryGray6: "#FAFAFA",
      statusError: "#EB001B",
      statusSuccess: "#508316",
      labelSuccess: "#E2F0D3",
      labelError: "#EFDDDF",
      labelNeutral: "#F2F2F2",
      white: "#FFFFFF",
      black: "#000000"
    };

    return (
      <div className="p-6">
        <ColorPalette colors={colors} title="Complete Color Palette" />
      </div>
    );
  }
};

export const Typography: Story = {
  render: () => (
    <div className="p-6">
      <TypographyScale />
    </div>
  )
};

export const Spacing: Story = {
  render: () => (
    <div className="p-6">
      <SpacingScale />
    </div>
  )
};

export const Breakpoints: Story = {
  render: () => (
    <div className="p-6">
      <BreakpointsScale />
    </div>
  )
};
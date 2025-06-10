import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import {
  colors,
  typography,
  spacing,
  breakpoints,
  designTokens,
} from './index';

// Helper to convert camelCase to kebab-case
const toKebabCase = (str: string) =>
  str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();

// Design Token Display Components
const ColorPalette = ({
  colorTokens,
  title,
}: {
  colorTokens: Record<string, string>
  title: string
}) => (
  <div className="mb-8">
    <h3 className="text-xl font-bold mb-4">{title}</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {Object.entries(colorTokens).map(([name, value]) => (
        <div key={name} className="border rounded-lg p-4 bg-white shadow-sm">
          <div
            className="w-full h-16 rounded-md border mb-3"
            style={{ backgroundColor: `var(--color-${toKebabCase(name)})` }}
          />
          <div className="text-sm">
            <div className="font-semibold text-gray-900">{name}</div>
            <div className="font-mono text-gray-600">
              {value.startsWith('var')
                ? `var(--color-${toKebabCase(name)})`
                : value}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const TypographyScale = () => (
  <div className="mb-8">
    <h3 className="text-xl font-bold mb-4">Typography Scale</h3>

    <div className="mb-6">
      <h4 className="text-lg font-semibold mb-3">Font Families</h4>
      <div className="grid gap-4">
        {Object.entries(typography.fontFamilies).map(([weight]) => (
          <div key={weight} className="border rounded-lg p-4 bg-white shadow-sm">
            <div className="flex items-center justify-between">
              <span
                className="text-2xl"
                style={{ fontFamily: `var(--font-family-${weight})` }}
              >
                The quick brown fox jumps over the lazy dog
              </span>
              <div className="text-right text-sm">
                <div className="font-semibold">{weight}</div>
                <div className="font-mono text-gray-600">{`var(--font-family-${weight})`}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className="mb-6">
      <h4 className="text-lg font-semibold mb-3">
        Font Sizes & Line Heights
      </h4>
      <div className="grid gap-4">
        {Object.entries(typography.fontSizes).map(([scale, size]) => (
          <div key={scale} className="border rounded-lg p-4 bg-white shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex-1">
                <div
                  className="font-medium"
                  style={{
                    fontSize: size,
                    lineHeight:
                      typography.lineHeights[
                        scale as keyof typeof typography.lineHeights
                      ],
                    fontFamily: 'var(--font-family-regular)',
                  }}
                >
                  {scale} Sample Text
                </div>
              </div>
              <div className="text-right text-sm">
                <div className="font-semibold">{scale}</div>
                <div className="font-mono text-gray-600">Size: {size}</div>
                <div className="font-mono text-gray-500">
                  Line Height:{' '}
                  {
                    typography.lineHeights[
                      scale as keyof typeof typography.lineHeights
                    ]
                  }
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const SpacingScale = () => (
  <div className="mb-8">
    <h3 className="text-xl font-bold mb-4">Spacing Scale</h3>
    <div className="grid gap-4">
      {Object.entries(spacing).map(([name, value]) => (
        <div key={name} className="border rounded-lg p-4 bg-white shadow-sm">
          <div className="flex items-center gap-4">
            <div
              className="bg-blue-500 rounded"
              style={{
                width: `var(--spacing-${name})`,
                height: `var(--spacing-${name})`,
              }}
            />
            <div className="flex-1">
              <div className="font-semibold">{name}</div>
              <div className="font-mono text-gray-600">{value}</div>
              <div className="font-mono text-xs text-gray-500">
                {`var(--spacing-${name})`}
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

const BreakpointsScale = () => {
  const formatRange = (range: { min?: string; max?: string }) => {
    if (range.min && range.max) {
      return `${range.min} - ${range.max}`
    }
    if (range.min) {
      return `${range.min}+`
    }
    if (range.max) {
      return `Up to ${range.max}`
    }
    return ''
  }

  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold mb-4">Breakpoints</h3>
      <div className="grid gap-4">
        {Object.entries(breakpoints).map(([name, range]) => (
          <div key={name} className="border rounded-lg p-4 bg-white shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold capitalize">{name}</div>
                <div className="text-gray-600">{formatRange(range)}</div>
              </div>
              <div className="text-right text-sm font-mono">
                {'min' in range && <div>min: {range.min}</div>}
                {'max' in range && <div>max: {range.max}</div>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const generateCssVariables = (tokens: typeof designTokens) => {
  let cssString = ':root {\n'

  const generateCategory = (
    categoryName: string,
    tokenGroup: object,
    prefix: string,
  ) => {
    cssString += `  /* ${categoryName} */\n`
    Object.entries(tokenGroup).forEach(([key, value]) => {
      if (typeof value === 'string') {
        cssString += `  --${prefix}-${toKebabCase(key)}: ${value};\n`
      }
    })
    cssString += '\n'
  }

  generateCategory('Primary Colors', tokens.colors, 'color')
  generateCategory('Spacing', tokens.spacing, 'spacing')
  generateCategory('Typography', tokens.typography.fontFamilies, 'font-family')
  generateCategory('Shadows', tokens.shadows, 'shadow')
  generateCategory('Z-Index', tokens.zIndex, 'z')

  cssString += '}'
  return cssString
}

const DesignTokensComponent = () => (
  <div className="p-6 bg-gray-50 min-h-screen">
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          🎨 Design Tokens
        </h1>
        <p className="text-gray-600">
          A comprehensive overview of the design system's foundational
          elements, loaded directly from the source of truth.
        </p>
      </div>

      <ColorPalette colorTokens={colors} title="Color Palette" />
      <TypographyScale />
      <SpacingScale />
      <BreakpointsScale />

      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4">Live CSS Custom Properties</h3>
        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
          <pre>{generateCssVariables(designTokens)}</pre>
        </div>
      </div>
    </div>
  </div>
)

const meta: Meta<typeof DesignTokensComponent> = {
  title: '🎨 Design System/Design Tokens',
  component: DesignTokensComponent,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof DesignTokensComponent>

export const Overview: Story = {
  render: () => <DesignTokensComponent />,
}

export const Colors: Story = {
  render: () => (
    <div className="p-6">
      <ColorPalette colorTokens={colors} title="Complete Color Palette" />
    </div>
  ),
}

export const Typography: Story = {
  render: () => (
    <div className="p-6">
      <TypographyScale />
    </div>
  ),
}

export const Spacing: Story = {
  render: () => (
    <div className="p-6">
      <SpacingScale />
    </div>
  ),
}

export const Breakpoints: Story = {
  render: () => (
    <div className="p-6">
      <BreakpointsScale />
    </div>
  ),
}
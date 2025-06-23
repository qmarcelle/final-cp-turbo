import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { colors } from './tokens/colors';

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
      {Object.entries(colorTokens).map(([name, value]) => {
        const cssVarName = value.match(/var\((.*?)\)/)?.[1] || '';
        return (
          <div key={name} className="border rounded-lg p-4 bg-white shadow-sm">
            <div
              className="w-full h-16 rounded-md border mb-3"
              style={{ backgroundColor: `var(${cssVarName})` }}
            />
            <div className="text-sm">
              <div className="font-semibold text-gray-900">{name}</div>
              <div className="font-mono text-gray-600">{cssVarName}</div>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

const meta: Meta = {
  title: '🎨 Design System/Design Tokens',
  component: ColorPalette,
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof ColorPalette>;

export const Colors: Story = {
  args: {
    colorTokens: colors,
    title: 'Color Palette',
  },
}; 
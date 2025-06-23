import type { Meta, StoryObj } from '@storybook/react';
import { getFoundationMeta } from '../../utils/getStoryMeta';

// Get the meta data from the utility function
const metaData = getFoundationMeta(
  'Spacing',
  'Consistent spacing scale and layout principles for the BCBST broker portal design system'
);

// Create the meta object that satisfies Storybook's requirements
const meta = {
  ...metaData,
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Spacing scale data
const spacingScale = [
  { name: 'XXS', value: '2px', rem: '0.125rem', className: 'space-0.5', usage: 'Tight borders, fine adjustments' },
  { name: 'XS', value: '4px', rem: '0.25rem', className: 'space-1', usage: 'Small borders, close elements' },
  { name: 'SM', value: '8px', rem: '0.5rem', className: 'space-2', usage: 'Form field spacing, tight margins' },
  { name: 'MD', value: '12px', rem: '0.75rem', className: 'space-3', usage: 'Default spacing between related elements' },
  { name: 'LG', value: '16px', rem: '1rem', className: 'space-4', usage: 'Standard component spacing' },
  { name: 'XL', value: '20px', rem: '1.25rem', className: 'space-5', usage: 'Generous spacing between components' },
  { name: 'XXL', value: '24px', rem: '1.5rem', className: 'space-6', usage: 'Section spacing, card padding' },
  { name: 'XXXL', value: '32px', rem: '2rem', className: 'space-8', usage: 'Large section breaks, page margins' },
  { name: '4XL', value: '48px', rem: '3rem', className: 'space-12', usage: 'Major section separation' },
  { name: '5XL', value: '64px', rem: '4rem', className: 'space-16', usage: 'Page-level spacing' },
];

const containerSizes = [
  { name: 'SM', maxWidth: '640px', usage: 'Forms, focused content' },
  { name: 'MD', maxWidth: '768px', usage: 'Standard content width' },
  { name: 'LG', maxWidth: '1024px', usage: 'Wide content layouts' },
  { name: 'XL', maxWidth: '1280px', usage: 'Dashboard layouts' },
  { name: '2XL', maxWidth: '1536px', usage: 'Full-width applications' },
];

// Spacing demonstration component
const SpacingDemo = ({ spacing, showLabel = true }: { spacing: typeof spacingScale[0]; showLabel?: boolean }) => (
  <div className="flex items-center gap-4 py-3 border-b border-gray-100 last:border-b-0">
    <div className="w-20 text-right">
      <span className="text-sm font-mono text-gray-600">{spacing.name}</span>
    </div>
    <div className="flex-1 flex items-center gap-4">
      <div
        className="bg-blue-500 h-4"
        style={{ width: spacing.value }}
        title={spacing.value}
      />
      <div className="flex gap-2 text-xs text-gray-500">
        <span className="font-mono">{spacing.value}</span>
        <span className="font-mono">({spacing.rem})</span>
      </div>
    </div>
    {showLabel && (
      <div className="w-64 text-sm text-gray-600">
        {spacing.usage}
      </div>
    )}
  </div>
);

// Stories
export const SpacingScale: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Spacing Scale</h2>
        <p className="text-gray-600 mb-6">
          Consistent spacing units that create visual rhythm and hierarchy throughout the broker portal.
        </p>
      </div>
      
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Base Spacing Units</h3>
        <div className="space-y-1">
          {spacingScale.map((spacing) => (
            <SpacingDemo key={spacing.name} spacing={spacing} />
          ))}
        </div>
      </div>
      
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h4 className="font-medium text-gray-900 mb-3">Implementation</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h5 className="font-medium text-gray-800 mb-2">CSS Classes</h5>
            <div className="font-mono text-gray-600 space-y-1">
              <p>margin: m-{'{size}'}</p>
              <p>padding: p-{'{size}'}</p>
              <p>gap: gap-{'{size}'}</p>
              <p>space-y: space-y-{'{size}'}</p>
            </div>
          </div>
          <div>
            <h5 className="font-medium text-gray-800 mb-2">Examples</h5>
            <div className="font-mono text-gray-600 space-y-1">
              <p>p-4 = 16px padding</p>
              <p>m-6 = 24px margin</p>
              <p>gap-2 = 8px gap</p>
              <p>space-y-3 = 12px vertical spacing</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const LayoutExamples: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Layout Spacing Examples</h2>
        <p className="text-gray-600 mb-6">
          Real-world examples of how spacing creates visual hierarchy and improves usability.
        </p>
      </div>
      
      {/* Card Spacing */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-6">
        <h3 className="text-lg font-semibold text-gray-900">Card Component Spacing</h3>
        
        <div className="border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-base font-semibold text-gray-900">Commission Summary</h4>
            <span className="text-sm text-gray-500">24px bottom margin</span>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-2xl font-bold text-green-600">$125,486</p>
                <p className="text-sm text-gray-500 mt-1">YTD Commission</p>
                <span className="text-xs text-gray-400">16px gap between number and label</span>
              </div>
              <div>
                <p className="text-lg font-medium text-gray-900">47 Groups</p>
                <p className="text-sm text-gray-600 mt-1">Active accounts</p>
              </div>
            </div>
            <div className="pt-4 border-t border-gray-100">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md">
                View Details
              </button>
              <span className="text-xs text-gray-400 ml-2">16px padding top border</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Form Spacing */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-6">
        <h3 className="text-lg font-semibold text-gray-900">Form Spacing Patterns</h3>
        
        <div className="max-w-md">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Member ID
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="ABC123456"
              />
              <p className="text-xs text-gray-500 mt-1">Enter the subscriber ID</p>
              <span className="text-xs text-gray-400">4px margin between input and help text</span>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Smith"
              />
              <span className="text-xs text-gray-400">16px gap between form fields</span>
            </div>
            
            <div className="pt-2">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md mr-3">
                Search
              </button>
              <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md">
                Clear
              </button>
              <span className="text-xs text-gray-400 block mt-2">8px padding top, 12px gap between buttons</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Navigation Spacing */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-6">
        <h3 className="text-lg font-semibold text-gray-900">Navigation Spacing</h3>
        
        <nav className="space-y-1">
          <a href="#" className="block px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md">
            Dashboard
          </a>
          <a href="#" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">
            Commission Reports
          </a>
          <a href="#" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">
            Member Services
          </a>
          <div className="pl-6 space-y-1">
            <a href="#" className="block px-3 py-1 text-sm text-gray-600 hover:bg-gray-50 rounded-md">
              Member Search
            </a>
            <a href="#" className="block px-3 py-1 text-sm text-gray-600 hover:bg-gray-50 rounded-md">
              Claims History
            </a>
          </div>
          <span className="text-xs text-gray-400 block mt-2">
            12px horizontal padding, 8px vertical padding, 24px left indent for subnav
          </span>
        </nav>
      </div>
    </div>
  ),
};

export const ContainerSizes: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Container Sizes</h2>
        <p className="text-gray-600 mb-6">
          Responsive container widths that adapt to different screen sizes and content types.
        </p>
      </div>
      
      <div className="space-y-4">
        {containerSizes.map((container) => (
          <div key={container.name} className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-900">{container.name} Container</h4>
              <span className="text-sm text-gray-500 font-mono">{container.maxWidth}</span>
            </div>
            <div 
              className="bg-blue-100 border border-blue-200 rounded p-3 mx-auto"
              style={{ maxWidth: container.maxWidth }}
            >
              <p className="text-sm text-blue-800">{container.usage}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h4 className="font-medium text-gray-900 mb-3">Responsive Behavior</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
          <div>
            <h5 className="font-medium text-gray-800 mb-2">Breakpoint Usage</h5>
            <ul className="space-y-1">
              <li>• SM: Mobile-first forms</li>
              <li>• MD: Standard content pages</li>
              <li>• LG: Multi-column layouts</li>
              <li>• XL: Dashboard interfaces</li>
              <li>• 2XL: Wide screen applications</li>
            </ul>
          </div>
          <div>
            <h5 className="font-medium text-gray-800 mb-2">Implementation</h5>
            <div className="font-mono text-xs space-y-1">
              <p>max-w-sm (640px)</p>
              <p>max-w-md (768px)</p>
              <p>max-w-lg (1024px)</p>
              <p>max-w-xl (1280px)</p>
              <p>max-w-2xl (1536px)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const VerticalRhythm: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Vertical Rhythm</h2>
        <p className="text-gray-600 mb-6">
          Consistent vertical spacing that creates harmonious content flow and improves readability.
        </p>
      </div>
      
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Page Title</h1>
            <p className="text-lg text-gray-600 mb-6">
              Subtitle or introduction text that provides context for the page content.
            </p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Section Heading</h2>
            <p className="text-base text-gray-700 mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <p className="text-base text-gray-700 mb-4">
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Subsection</h3>
            <ul className="space-y-2 text-gray-700 mb-4">
              <li>• First list item with consistent spacing</li>
              <li>• Second list item maintains rhythm</li>
              <li>• Third item continues the pattern</li>
            </ul>
          </div>
          
          <div className="pt-4 border-t border-gray-200">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md mr-3">
              Primary Action
            </button>
            <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md">
              Secondary Action
            </button>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-2">Spacing Pattern</h4>
          <div className="text-sm text-gray-600 space-y-1">
            <p>• Title to subtitle: 16px (1rem)</p>
            <p>• Subtitle to content: 24px (1.5rem)</p>
            <p>• Between sections: 24px (1.5rem)</p>
            <p>• Heading to content: 12px (0.75rem)</p>
            <p>• Between paragraphs: 16px (1rem)</p>
            <p>• List items: 8px (0.5rem)</p>
            <p>• Before actions: 16px (1rem) + border</p>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const ResponsiveSpacing: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Responsive Spacing</h2>
        <p className="text-gray-600 mb-6">
          How spacing adapts across different screen sizes to maintain optimal user experience.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Desktop Spacing */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Desktop (1024px+)</h3>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gray-100 p-4 rounded">
                <h4 className="font-medium mb-2">Content Block</h4>
                <p className="text-sm text-gray-600">24px gap between columns</p>
              </div>
              <div className="bg-gray-100 p-4 rounded">
                <h4 className="font-medium mb-2">Content Block</h4>
                <p className="text-sm text-gray-600">16px internal padding</p>
              </div>
            </div>
            <div className="bg-blue-50 p-6 rounded">
              <h4 className="font-medium mb-3">Large Section</h4>
              <p className="text-sm text-gray-600">24px internal padding</p>
            </div>
          </div>
        </div>
        
        {/* Mobile Spacing */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h3 className="text-base font-semibold text-gray-900 mb-3">Mobile (&lt; 768px)</h3>
          <div className="space-y-4">
            <div className="bg-gray-100 p-3 rounded">
              <h4 className="font-medium text-sm mb-2">Content Block</h4>
              <p className="text-xs text-gray-600">16px gap between blocks</p>
            </div>
            <div className="bg-gray-100 p-3 rounded">
              <h4 className="font-medium text-sm mb-2">Content Block</h4>
              <p className="text-xs text-gray-600">12px internal padding</p>
            </div>
            <div className="bg-blue-50 p-4 rounded">
              <h4 className="font-medium text-sm mb-2">Section</h4>
              <p className="text-xs text-gray-600">16px internal padding</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h4 className="font-medium text-gray-900 mb-3">Responsive Guidelines</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <h5 className="font-medium text-gray-800 mb-2">Mobile (&lt; 768px)</h5>
            <ul className="text-gray-600 space-y-1">
              <li>• Reduce padding by 25-50%</li>
              <li>• Stack content vertically</li>
              <li>• Increase touch targets</li>
              <li>• Minimize white space</li>
            </ul>
          </div>
          <div>
            <h5 className="font-medium text-gray-800 mb-2">Tablet (768px+)</h5>
            <ul className="text-gray-600 space-y-1">
              <li>• Standard spacing scale</li>
              <li>• 2-column layouts</li>
              <li>• Moderate white space</li>
              <li>• Comfortable touch targets</li>
            </ul>
          </div>
          <div>
            <h5 className="font-medium text-gray-800 mb-2">Desktop (1024px+)</h5>
            <ul className="text-gray-600 space-y-1">
              <li>• Full spacing scale</li>
              <li>• Multi-column layouts</li>
              <li>• Generous white space</li>
              <li>• Hover interactions</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const AccessibilityConsiderations: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Spacing Accessibility</h2>
        <p className="text-gray-600 mb-6">
          Ensuring adequate spacing for users with motor impairments and assistive technologies.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">✓ Accessible Spacing</h3>
          <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-md mr-4 mb-4">
              Large Touch Target
            </button>
            <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-md">
              Adequate Spacing
            </button>
            <p className="text-sm text-gray-600 mt-4">
              44px minimum height for touch targets, 16px gap between interactive elements.
            </p>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">✗ Problematic Spacing</h3>
          <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-2">
            <button className="bg-blue-600 text-white px-2 py-1 text-xs rounded mr-1">
              Too Small
            </button>
            <button className="border border-gray-300 text-gray-700 px-2 py-1 text-xs rounded">
              Cramped
            </button>
            <p className="text-sm text-gray-600 mt-2">
              Small touch targets and insufficient spacing can cause accessibility issues.
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h4 className="font-medium text-blue-900 mb-3">Accessibility Requirements</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
          <div>
            <h5 className="font-medium mb-2">Touch Targets</h5>
            <ul className="space-y-1">
              <li>• Minimum 44x44px (WCAG 2.1 AA)</li>
              <li>• 8px spacing between targets</li>
              <li>• Clear visual boundaries</li>
              <li>• Consistent positioning</li>
            </ul>
          </div>
          <div>
            <h5 className="font-medium mb-2">Content Spacing</h5>
            <ul className="space-y-1">
              <li>• Adequate white space for focus</li>
              <li>• Logical reading order</li>
              <li>• Clear section boundaries</li>
              <li>• Scalable layout (up to 400%)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  ),
};
import type { Meta, StoryObj } from '@storybook/react';
import { getFoundationMeta } from '../../utils/getStoryMeta';

// Get the meta data from the utility function
const metaData = getFoundationMeta(
  'Colors',
  'BCBST brand colors, status colors, and neutral palette with accessibility guidelines'
);

// Create the meta object that satisfies Storybook's requirements
const meta = {
  ...metaData,
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Color palette data
const brandColors = [
  { name: 'Primary Blue', value: '#1E40AF', hex: '#1E40AF', usage: 'Primary actions, links, brand elements' },
  { name: 'Primary Blue Light', value: '#3B82F6', hex: '#3B82F6', usage: 'Hover states, secondary actions' },
  { name: 'Primary Blue Dark', value: '#1E3A8A', hex: '#1E3A8A', usage: 'Active states, emphasis' },
  { name: 'BCBST Blue', value: '#0066CC', hex: '#0066CC', usage: 'Brand identity, logos' },
  { name: 'BCBST Blue Light', value: '#EBF4FF', hex: '#EBF4FF', usage: 'Background tints, subtle highlights' },
];

const statusColors = [
  { name: 'Success', value: '#10B981', hex: '#10B981', usage: 'Success states, positive feedback' },
  { name: 'Success Light', value: '#D1FAE5', hex: '#D1FAE5', usage: 'Success backgrounds' },
  { name: 'Warning', value: '#F59E0B', hex: '#F59E0B', usage: 'Warning states, caution' },
  { name: 'Warning Light', value: '#FEF3C7', hex: '#FEF3C7', usage: 'Warning backgrounds' },
  { name: 'Error', value: '#EF4444', hex: '#EF4444', usage: 'Error states, destructive actions' },
  { name: 'Error Light', value: '#FEE2E2', hex: '#FEE2E2', usage: 'Error backgrounds' },
  { name: 'Info', value: '#3B82F6', hex: '#3B82F6', usage: 'Information, neutral actions' },
  { name: 'Info Light', value: '#DBEAFE', hex: '#DBEAFE', usage: 'Info backgrounds' },
];

const neutralColors = [
  { name: 'Gray 900', value: '#111827', hex: '#111827', usage: 'Primary text, headings' },
  { name: 'Gray 800', value: '#1F2937', hex: '#1F2937', usage: 'Secondary text' },
  { name: 'Gray 700', value: '#374151', hex: '#374151', usage: 'Muted text' },
  { name: 'Gray 600', value: '#4B5563', hex: '#4B5563', usage: 'Placeholder text' },
  { name: 'Gray 500', value: '#6B7280', hex: '#6B7280', usage: 'Disabled text' },
  { name: 'Gray 400', value: '#9CA3AF', hex: '#9CA3AF', usage: 'Border, dividers' },
  { name: 'Gray 300', value: '#D1D5DB', hex: '#D1D5DB', usage: 'Light borders' },
  { name: 'Gray 200', value: '#E5E7EB', hex: '#E5E7EB', usage: 'Background borders' },
  { name: 'Gray 100', value: '#F3F4F6', hex: '#F3F4F6', usage: 'Light backgrounds' },
  { name: 'Gray 50', value: '#F9FAFB', hex: '#F9FAFB', usage: 'Page backgrounds' },
  { name: 'White', value: '#FFFFFF', hex: '#FFFFFF', usage: 'Card backgrounds, content areas' },
];

// Color swatch component
const ColorSwatch = ({ color }: { color: { name: string; value: string; hex: string; usage: string } }) => (
  <div className="group cursor-pointer">
    <div 
      className="w-full h-20 rounded-lg shadow-sm border border-gray-200 mb-3 transition-transform group-hover:scale-105"
      style={{ backgroundColor: color.value }}
      title={`${color.name}: ${color.hex}`}
    />
    <div className="space-y-1">
      <h4 className="font-medium text-sm text-gray-900">{color.name}</h4>
      <p className="text-xs text-gray-600 font-mono">{color.hex}</p>
      <p className="text-xs text-gray-500">{color.usage}</p>
    </div>
  </div>
);

// Accessibility information component
const AccessibilityInfo = () => (
  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 space-y-4">
    <h3 className="font-semibold text-blue-900">Accessibility Guidelines</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
      <div>
        <h4 className="font-medium text-blue-800 mb-2">Contrast Requirements</h4>
        <ul className="space-y-1 text-blue-700">
          <li>• Normal text: 4.5:1 minimum ratio</li>
          <li>• Large text: 3:1 minimum ratio</li>
          <li>• UI elements: 3:1 minimum ratio</li>
          <li>• Enhanced (AAA): 7:1 for normal text</li>
        </ul>
      </div>
      <div>
        <h4 className="font-medium text-blue-800 mb-2">Usage Guidelines</h4>
        <ul className="space-y-1 text-blue-700">
          <li>• Don't rely on color alone for meaning</li>
          <li>• Use consistent color patterns</li>
          <li>• Test with colorblind users</li>
          <li>• Provide alternative indicators</li>
        </ul>
      </div>
    </div>
  </div>
);

// Stories
export const BrandColors: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Brand Colors</h2>
        <p className="text-gray-600 mb-6">
          Primary brand colors representing BlueCross BlueShield of Tennessee identity and values.
        </p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {brandColors.map((color) => (
          <ColorSwatch key={color.name} color={color} />
        ))}
      </div>
      
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h4 className="font-medium text-gray-900 mb-2">Usage Examples</h4>
        <div className="flex flex-wrap gap-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
            Primary Button
          </button>
          <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50 transition-colors">
            Secondary Button
          </button>
          <a href="#" className="text-blue-600 hover:text-blue-800 underline">Primary Link</a>
        </div>
      </div>
    </div>
  ),
};

export const StatusColors: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Status Colors</h2>
        <p className="text-gray-600 mb-6">
          Semantic colors for communicating status, feedback, and state information to users.
        </p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {statusColors.map((color) => (
          <ColorSwatch key={color.name} color={color} />
        ))}
      </div>
      
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-4">
        <h4 className="font-medium text-gray-900 mb-2">Status Examples</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="bg-green-100 border border-green-200 text-green-800 px-3 py-2 rounded-md text-sm">
              ✓ Application approved successfully
            </div>
            <div className="bg-yellow-100 border border-yellow-200 text-yellow-800 px-3 py-2 rounded-md text-sm">
              ⚠ Quote expires in 3 days
            </div>
          </div>
          <div className="space-y-2">
            <div className="bg-red-100 border border-red-200 text-red-800 px-3 py-2 rounded-md text-sm">
              ✕ Payment processing failed
            </div>
            <div className="bg-blue-100 border border-blue-200 text-blue-800 px-3 py-2 rounded-md text-sm">
              ℹ New features available
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const NeutralColors: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Neutral Colors</h2>
        <p className="text-gray-600 mb-6">
          Grayscale palette for text, borders, backgrounds, and structural elements.
        </p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {neutralColors.map((color) => (
          <ColorSwatch key={color.name} color={color} />
        ))}
      </div>
      
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-4">
        <h4 className="font-medium text-gray-900 mb-2">Text Hierarchy Examples</h4>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-gray-900">Primary Heading (Gray 900)</h1>
          <h2 className="text-xl font-semibold text-gray-800">Secondary Heading (Gray 800)</h2>
          <p className="text-gray-700">Body text with good readability (Gray 700)</p>
          <p className="text-gray-600">Secondary text for less important content (Gray 600)</p>
          <p className="text-gray-500">Muted text for captions and metadata (Gray 500)</p>
          <p className="text-gray-400">Disabled or placeholder text (Gray 400)</p>
        </div>
      </div>
    </div>
  ),
};

export const AccessibilityGuidelines: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Color Accessibility</h2>
        <p className="text-gray-600 mb-6">
          Guidelines and examples for accessible color usage in the broker portal.
        </p>
      </div>
      
      <AccessibilityInfo />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">✓ Good Examples</h3>
          <div className="space-y-3">
            <div className="bg-blue-600 text-white px-4 py-3 rounded-md">
              <span className="font-medium">High contrast text (4.5:1+)</span>
            </div>
            <div className="bg-red-100 border-l-4 border-red-500 px-4 py-3">
              <span className="text-red-800">Error with icon and border</span>
              <span className="text-red-600 ml-2">✕</span>
            </div>
            <div className="bg-green-100 border border-green-300 px-4 py-3 rounded-md">
              <span className="text-green-800 font-medium">Success state</span>
              <span className="text-green-600 ml-2">✓</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">✗ Avoid These</h3>
          <div className="space-y-3">
            <div className="bg-gray-200 text-gray-400 px-4 py-3 rounded-md">
              <span>Low contrast text (below 4.5:1)</span>
            </div>
            <div className="bg-red-500 px-4 py-3 rounded-md">
              <span className="text-red-200">Color only for meaning</span>
            </div>
            <div className="bg-yellow-200 text-yellow-400 px-4 py-3 rounded-md">
              <span>Poor color combination</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const ColorCombinations: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Recommended Color Combinations</h2>
        <p className="text-gray-600 mb-6">
          Tested color combinations that meet accessibility standards and brand guidelines.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Primary combinations */}
        <div className="space-y-3">
          <h4 className="font-medium text-gray-900">Primary Combinations</h4>
          <div className="bg-blue-600 text-white p-4 rounded-lg">
            <p className="font-medium">White on Blue 600</p>
            <p className="text-sm opacity-90">Contrast ratio: 8.6:1</p>
          </div>
          <div className="bg-blue-50 text-blue-900 p-4 rounded-lg border border-blue-200">
            <p className="font-medium">Blue 900 on Blue 50</p>
            <p className="text-sm text-blue-700">Contrast ratio: 12.4:1</p>
          </div>
        </div>
        
        {/* Status combinations */}
        <div className="space-y-3">
          <h4 className="font-medium text-gray-900">Status Combinations</h4>
          <div className="bg-green-100 text-green-800 p-4 rounded-lg border border-green-200">
            <p className="font-medium">Success message</p>
            <p className="text-sm">Contrast ratio: 5.9:1</p>
          </div>
          <div className="bg-red-100 text-red-800 p-4 rounded-lg border border-red-200">
            <p className="font-medium">Error message</p>
            <p className="text-sm">Contrast ratio: 6.1:1</p>
          </div>
        </div>
        
        {/* Neutral combinations */}
        <div className="space-y-3">
          <h4 className="font-medium text-gray-900">Neutral Combinations</h4>
          <div className="bg-gray-100 text-gray-900 p-4 rounded-lg border border-gray-200">
            <p className="font-medium">Gray 900 on Gray 100</p>
            <p className="text-sm text-gray-600">Contrast ratio: 16.7:1</p>
          </div>
          <div className="bg-white text-gray-700 p-4 rounded-lg border border-gray-200">
            <p className="font-medium">Gray 700 on White</p>
            <p className="text-sm text-gray-600">Contrast ratio: 8.9:1</p>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const InteractiveStates: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Interactive State Colors</h2>
        <p className="text-gray-600 mb-6">
          Color variations for hover, focus, active, and disabled states.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Button States</h3>
          <div className="space-y-2">
            <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-md transition-colors">
              Normal State
            </button>
            <button className="w-full bg-blue-700 text-white px-4 py-2 rounded-md">
              Hover State (Blue 700)
            </button>
            <button className="w-full bg-blue-800 text-white px-4 py-2 rounded-md">
              Active State (Blue 800)
            </button>
            <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-md ring-2 ring-blue-300 ring-offset-2">
              Focus State (Ring)
            </button>
            <button className="w-full bg-gray-300 text-gray-500 px-4 py-2 rounded-md cursor-not-allowed" disabled>
              Disabled State
            </button>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Link States</h3>
          <div className="space-y-2 text-sm">
            <a href="#" className="block text-blue-600 hover:text-blue-800 underline">
              Normal Link (Blue 600)
            </a>
            <a href="#" className="block text-blue-800 underline">
              Hover State (Blue 800)
            </a>
            <a href="#" className="block text-purple-600 underline">
              Visited State (Purple 600)
            </a>
            <span className="block text-gray-400 line-through">
              Disabled Link (Gray 400)
            </span>
          </div>
        </div>
      </div>
    </div>
  ),
};
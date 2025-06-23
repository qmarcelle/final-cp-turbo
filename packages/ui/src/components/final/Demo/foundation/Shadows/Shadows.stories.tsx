import type { Meta, StoryObj } from '@storybook/react';
import { getFoundationMeta } from '../../utils/getStoryMeta';

// Get the meta data from the utility function
const metaData = getFoundationMeta(
  'Shadows',
  'Elevation and depth system using shadows for the BCBST broker portal interface hierarchy'
);

// Create the meta object that satisfies Storybook's requirements
const meta = {
  ...metaData,
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Shadow scale data
const shadowLevels = [
  { 
    name: 'None', 
    className: 'shadow-none', 
    css: 'box-shadow: none', 
    usage: 'Flat elements, embedded content',
    elevation: '0dp'
  },
  { 
    name: 'XS', 
    className: 'shadow-sm', 
    css: 'box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05)', 
    usage: 'Subtle borders, form fields',
    elevation: '1dp'
  },
  { 
    name: 'SM', 
    className: 'shadow', 
    css: 'box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)', 
    usage: 'Cards, small components',
    elevation: '2dp'
  },
  { 
    name: 'MD', 
    className: 'shadow-md', 
    css: 'box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)', 
    usage: 'Raised cards, buttons hover',
    elevation: '4dp'
  },
  { 
    name: 'LG', 
    className: 'shadow-lg', 
    css: 'box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)', 
    usage: 'Dropdowns, popovers',
    elevation: '8dp'
  },
  { 
    name: 'XL', 
    className: 'shadow-xl', 
    css: 'box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)', 
    usage: 'Modals, overlays',
    elevation: '16dp'
  },
  { 
    name: '2XL', 
    className: 'shadow-2xl', 
    css: 'box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25)', 
    usage: 'High-priority modals',
    elevation: '24dp'
  },
];

const _interactiveShadows = [
  {
    name: 'Button Rest',
    className: 'shadow-sm',
    state: 'Default state for buttons and interactive elements'
  },
  {
    name: 'Button Hover',
    className: 'shadow-md',
    state: 'Hover state showing increased elevation'
  },
  {
    name: 'Button Active',
    className: 'shadow-sm',
    state: 'Active/pressed state with reduced shadow'
  },
  {
    name: 'Card Rest',
    className: 'shadow',
    state: 'Default card elevation'
  },
  {
    name: 'Card Hover',
    className: 'shadow-lg',
    state: 'Interactive card hover state'
  },
];

// Shadow demo component
const ShadowDemo = ({ shadow }: { shadow: typeof shadowLevels[0] }) => (
  <div className="flex flex-col items-center text-center space-y-3">
    <div className={`w-20 h-20 bg-white rounded-lg ${shadow.className} border border-gray-100`} />
    <div>
      <h4 className="font-medium text-gray-900">{shadow.name}</h4>
      <p className="text-xs text-gray-500 mt-1">{shadow.elevation}</p>
      <p className="text-xs text-gray-600 mt-1 max-w-24">{shadow.usage}</p>
    </div>
  </div>
);

// Stories
export const ShadowScale: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Shadow Scale</h2>
        <p className="text-gray-600 mb-6">
          Consistent elevation system that creates depth and hierarchy in the broker portal interface.
        </p>
      </div>
      
      <div className="bg-gray-50 p-8 rounded-lg">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8">
          {shadowLevels.map((shadow) => (
            <ShadowDemo key={shadow.name} shadow={shadow} />
          ))}
        </div>
      </div>
      
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Technical Specifications</h3>
        <div className="space-y-4">
          {shadowLevels.map((shadow) => (
            <div key={shadow.name} className="border-b border-gray-100 pb-4 last:border-b-0">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900">{shadow.name} ({shadow.elevation})</h4>
                <span className="text-sm font-mono text-gray-600">{shadow.className}</span>
              </div>
              <p className="text-sm text-gray-600 mb-2">{shadow.usage}</p>
              <code className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                {shadow.css}
              </code>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};

export const InteractiveStates: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Interactive Shadow States</h2>
        <p className="text-gray-600 mb-6">
          Shadow transitions for interactive elements that provide visual feedback on user actions.
        </p>
      </div>
      
      {/* Button Examples */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Button Shadow States</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center space-y-3">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-md shadow-sm transition-shadow hover:shadow-md active:shadow-sm">
              Default State
            </button>
            <p className="text-sm text-gray-600">Subtle shadow (shadow-sm)</p>
          </div>
          <div className="text-center space-y-3">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-md shadow-md">
              Hover State
            </button>
            <p className="text-sm text-gray-600">Elevated shadow (shadow-md)</p>
          </div>
          <div className="text-center space-y-3">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-md shadow-sm transform scale-95">
              Active State
            </button>
            <p className="text-sm text-gray-600">Reduced shadow + scale</p>
          </div>
        </div>
      </div>
      
      {/* Card Examples */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Card Shadow States</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6 transition-shadow hover:shadow-lg cursor-pointer">
            <h4 className="font-semibold text-gray-900 mb-2">Interactive Card</h4>
            <p className="text-gray-600 text-sm">
              Hover over this card to see the shadow transition effect. 
              The elevation increases to show interactivity.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h4 className="font-semibold text-gray-900 mb-2">Elevated Card</h4>
            <p className="text-gray-600 text-sm">
              This card has a higher default elevation, suitable for 
              important content or active states.
            </p>
          </div>
        </div>
      </div>
      
      {/* Dropdown Example */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Dropdown & Modal Shadows</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative">
            <h4 className="font-medium text-gray-900 mb-3">Dropdown Menu</h4>
            <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4">
              <div className="space-y-2">
                <a href="#" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">
                  Commission Reports
                </a>
                <a href="#" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">
                  Member Search
                </a>
                <a href="#" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">
                  Group Management
                </a>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">Uses shadow-lg for clear separation</p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Modal Overlay</h4>
            <div className="bg-white rounded-lg shadow-2xl p-6 max-w-sm">
              <h5 className="font-semibold text-gray-900 mb-2">Confirm Action</h5>
              <p className="text-sm text-gray-600 mb-4">
                Are you sure you want to terminate this group's coverage?
              </p>
              <div className="flex gap-2">
                <button className="bg-red-600 text-white px-3 py-1 text-sm rounded">
                  Confirm
                </button>
                <button className="border border-gray-300 text-gray-700 px-3 py-1 text-sm rounded">
                  Cancel
                </button>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">Uses shadow-2xl for maximum prominence</p>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const UsageGuidelines: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Shadow Usage Guidelines</h2>
        <p className="text-gray-600 mb-6">
          Best practices for applying shadows to create effective visual hierarchy and depth.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Correct Usage */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">✓ Correct Usage</h3>
          
          <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Consistent Elevation</h4>
              <div className="space-y-3">
                <div className="bg-white shadow-sm border border-gray-100 rounded p-3">
                  <p className="text-sm">Form field (shadow-sm)</p>
                </div>
                <div className="bg-white shadow rounded p-3">
                  <p className="text-sm">Card content (shadow)</p>
                </div>
                <div className="bg-white shadow-lg rounded p-3">
                  <p className="text-sm">Dropdown menu (shadow-lg)</p>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Appropriate Context</h4>
              <div className="bg-gray-50 p-4 rounded">
                <div className="bg-white shadow rounded-lg p-4 mb-3">
                  <h5 className="font-medium mb-1">Commission Summary</h5>
                  <p className="text-sm text-gray-600">Cards elevated above background</p>
                </div>
                <button className="bg-blue-600 text-white px-4 py-2 rounded shadow-sm hover:shadow-md transition-shadow">
                  Interactive button with hover effect
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Incorrect Usage */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">✗ Avoid These</h3>
          
          <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Inconsistent Shadows</h4>
              <div className="space-y-3">
                <div className="bg-white shadow-2xl border border-gray-100 rounded p-3">
                  <p className="text-sm">Overly dramatic for simple content</p>
                </div>
                <div className="bg-white shadow-sm rounded p-3">
                  <p className="text-sm">Too subtle for important actions</p>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Shadow Overuse</h4>
              <div className="bg-gray-50 p-4 rounded space-y-2">
                <div className="bg-white shadow-lg rounded p-2">
                  <div className="bg-white shadow-md rounded p-2">
                    <div className="bg-white shadow rounded p-2">
                      <p className="text-xs">Nested shadows create visual noise</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Guidelines */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h4 className="font-medium text-blue-900 mb-3">Shadow Best Practices</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
          <div>
            <h5 className="font-medium mb-2">Hierarchy Principles</h5>
            <ul className="space-y-1">
              <li>• Use shadows to establish z-index layers</li>
              <li>• Higher elevation = more important content</li>
              <li>• Maintain consistent shadow direction</li>
              <li>• Avoid mixing shadow styles</li>
            </ul>
          </div>
          <div>
            <h5 className="font-medium mb-2">Performance Considerations</h5>
            <ul className="space-y-1">
              <li>• Use CSS transitions for smooth effects</li>
              <li>• Avoid complex multi-layer shadows</li>
              <li>• Test on lower-end devices</li>
              <li>• Consider reduced motion preferences</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const ComponentExamples: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Component Shadow Examples</h2>
        <p className="text-gray-600 mb-6">
          Real-world examples of how shadows are applied to common broker portal components.
        </p>
      </div>
      
      {/* Dashboard Cards */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Dashboard Cards</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-6 cursor-pointer">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-gray-900">YTD Commission</h4>
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582z" />
                </svg>
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">$125,486</p>
            <p className="text-sm text-gray-500 mt-1">15.8% increase</p>
          </div>
          
          <div className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-6 cursor-pointer">
            <h4 className="font-semibold text-gray-900 mb-4">Active Groups</h4>
            <p className="text-2xl font-bold text-gray-900">47</p>
            <p className="text-sm text-gray-500 mt-1">Across 3 territories</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h4 className="font-semibold text-gray-900 mb-4">Pending Actions</h4>
            <p className="text-2xl font-bold text-yellow-600">12</p>
            <p className="text-sm text-gray-500 mt-1">Require attention</p>
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-4">
          Standard cards use shadow, hover states use shadow-md, priority content uses shadow-md by default.
        </p>
      </div>
      
      {/* Navigation Elements */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Navigation & Menus</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Header Navigation</h4>
            <div className="bg-white border-b border-gray-200 shadow-sm p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img src="/api/placeholder/120/32" alt="BCBST Logo" className="h-8" />
                  <nav className="flex gap-4">
                    <a href="#" className="text-sm font-medium text-blue-600">Dashboard</a>
                    <a href="#" className="text-sm text-gray-600">Reports</a>
                    <a href="#" className="text-sm text-gray-600">Members</a>
                  </nav>
                </div>
                <div className="w-8 h-8 bg-blue-100 rounded-full"></div>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">Subtle shadow-sm for fixed header</p>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Dropdown Menu</h4>
            <div className="relative">
              <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-2 w-48">
                <a href="#" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">
                  Commission Reports
                </a>
                <a href="#" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">
                  Payment History
                </a>
                <div className="border-t border-gray-100 my-1"></div>
                <a href="#" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">
                  Settings
                </a>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">Strong shadow-lg for floating menus</p>
          </div>
        </div>
      </div>
      
      {/* Forms and Inputs */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Forms & Input Elements</h3>
        <div className="max-w-md space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Member Search</label>
            <input
              type="text"
              placeholder="Enter subscriber ID"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Group Selection</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Select a group...</option>
              <option>TechCorp Inc.</option>
              <option>Manufacturing Solutions</option>
            </select>
          </div>
          <div className="flex gap-2 pt-2">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-sm hover:shadow-md transition-shadow">
              Search
            </button>
            <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md shadow-sm hover:shadow transition-shadow">
              Clear
            </button>
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-4">
          Form elements use subtle shadow-sm, focus states may enhance shadow slightly.
        </p>
      </div>
    </div>
  ),
};
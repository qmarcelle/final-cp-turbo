import type { Meta, StoryObj } from '@storybook/react';
import { getFoundationMeta } from '../../utils/getStoryMeta';

// Get the meta data from the utility function
const metaData = getFoundationMeta(
  'Typography',
  'Font families, text styles, and typographic hierarchy for the BCBST broker portal'
);

// Create the meta object that satisfies Storybook's requirements
const meta = {
  ...metaData,
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Typography scale data
const headingStyles = [
  { name: 'H1', className: 'text-4xl font-bold', size: '36px', lineHeight: '40px', usage: 'Page titles, main headings' },
  { name: 'H2', className: 'text-3xl font-bold', size: '30px', lineHeight: '36px', usage: 'Section headings' },
  { name: 'H3', className: 'text-2xl font-semibold', size: '24px', lineHeight: '32px', usage: 'Subsection headings' },
  { name: 'H4', className: 'text-xl font-semibold', size: '20px', lineHeight: '28px', usage: 'Card titles, component headings' },
  { name: 'H5', className: 'text-lg font-semibold', size: '18px', lineHeight: '28px', usage: 'Minor headings' },
  { name: 'H6', className: 'text-base font-semibold', size: '16px', lineHeight: '24px', usage: 'Small headings, labels' },
];

const bodyStyles = [
  { name: 'Body Large', className: 'text-lg', size: '18px', lineHeight: '28px', usage: 'Introduction text, key information' },
  { name: 'Body Regular', className: 'text-base', size: '16px', lineHeight: '24px', usage: 'Standard body text' },
  { name: 'Body Small', className: 'text-sm', size: '14px', lineHeight: '20px', usage: 'Supporting text, captions' },
  { name: 'Body Extra Small', className: 'text-xs', size: '12px', lineHeight: '16px', usage: 'Fine print, metadata' },
];

const fontWeights = [
  { name: 'Light', className: 'font-light', weight: '300', usage: 'Rarely used, special emphasis' },
  { name: 'Regular', className: 'font-normal', weight: '400', usage: 'Body text, standard content' },
  { name: 'Medium', className: 'font-medium', weight: '500', usage: 'Emphasis, button text' },
  { name: 'Semibold', className: 'font-semibold', weight: '600', usage: 'Headings, important labels' },
  { name: 'Bold', className: 'font-bold', weight: '700', usage: 'Strong emphasis, major headings' },
];

// Typography examples component
const TypeExample = ({ 
  label, 
  className, 
  children, 
  specs 
}: { 
  label: string; 
  className: string; 
  children: React.ReactNode; 
  specs?: string;
}) => (
  <div className="py-4 border-b border-gray-200 last:border-b-0">
    <div className="flex items-baseline justify-between mb-2">
      <span className="text-sm font-medium text-gray-600 uppercase tracking-wide">{label}</span>
      {specs && <span className="text-xs text-gray-500 font-mono">{specs}</span>}
    </div>
    <div className={className}>
      {children}
    </div>
  </div>
);

// Stories
export const HeadingHierarchy: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Heading Hierarchy</h2>
        <p className="text-gray-600 mb-6">
          Consistent heading styles that establish clear information hierarchy and improve readability.
        </p>
      </div>
      
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        {headingStyles.map((style) => (
          <TypeExample
            key={style.name}
            label={style.name}
            className={`${style.className} text-gray-900`}
            specs={`${style.size} / ${style.lineHeight}`}
          >
            Broker Portal Dashboard
          </TypeExample>
        ))}
      </div>
      
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h4 className="font-medium text-gray-900 mb-2">Usage Guidelines</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Use heading hierarchy logically (H1 → H2 → H3, don't skip levels)</li>
          <li>• Only one H1 per page for main page title</li>
          <li>• H2 for major sections, H3 for subsections</li>
          <li>• H4-H6 for component headings and minor sections</li>
        </ul>
      </div>
    </div>
  ),
};

export const BodyText: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Body Text Styles</h2>
        <p className="text-gray-600 mb-6">
          Text styles for content, supporting information, and user interface elements.
        </p>
      </div>
      
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        {bodyStyles.map((style) => (
          <TypeExample
            key={style.name}
            label={style.name}
            className={`${style.className} text-gray-700`}
            specs={`${style.size} / ${style.lineHeight}`}
          >
            The broker portal provides comprehensive tools for managing health insurance sales, 
            commission tracking, and member services. Access real-time data and streamlined workflows 
            to enhance your productivity and better serve your clients.
          </TypeExample>
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-2">Reading Experience</h4>
          <div className="text-sm text-gray-600 space-y-1">
            <p>• Optimal line length: 45-75 characters</p>
            <p>• Line height: 1.4-1.6x font size</p>
            <p>• Adequate paragraph spacing</p>
            <p>• Sufficient contrast (4.5:1 minimum)</p>
          </div>
        </div>
        
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-2">Content Hierarchy</h4>
          <div className="text-sm text-gray-600 space-y-1">
            <p>• Large: Introduction, key messages</p>
            <p>• Regular: Primary content</p>
            <p>• Small: Supporting details</p>
            <p>• Extra small: Metadata, legal text</p>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const FontWeights: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Font Weights</h2>
        <p className="text-gray-600 mb-6">
          Font weight variations for emphasis, hierarchy, and visual distinction.
        </p>
      </div>
      
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        {fontWeights.map((weight) => (
          <TypeExample
            key={weight.name}
            label={weight.name}
            className={`${weight.className} text-lg text-gray-900`}
            specs={`Weight: ${weight.weight}`}
          >
            Commission Summary Report
          </TypeExample>
        ))}
      </div>
      
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-4">
        <h4 className="font-medium text-gray-900">Font Weight Usage Examples</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="font-bold text-gray-900 mb-2">Bold (700)</p>
            <p className="font-semibold text-gray-900 mb-2">Semibold (600)</p>
            <p className="font-medium text-gray-900 mb-2">Medium (500)</p>
            <p className="font-normal text-gray-900 mb-2">Regular (400)</p>
          </div>
          <div className="text-gray-600">
            <p className="mb-2">Page titles, strong emphasis</p>
            <p className="mb-2">Section headings, card titles</p>
            <p className="mb-2">Button text, labels, emphasis</p>
            <p className="mb-2">Body text, paragraphs</p>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const PracticalExamples: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Real-World Examples</h2>
        <p className="text-gray-600 mb-6">
          Typography in context, showing how styles work together in actual broker portal interfaces.
        </p>
      </div>
      
      {/* Card Example */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Commission Summary Card</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">YTD Performance</h4>
            <div className="space-y-3">
              <div>
                <p className="text-2xl font-bold text-green-600">$125,486.50</p>
                <p className="text-sm text-gray-500">Total Commission Earned</p>
              </div>
              <div>
                <p className="text-lg font-medium text-gray-900">47 Active Groups</p>
                <p className="text-sm text-gray-600">Across 3 territories</p>
              </div>
              <div>
                <p className="text-base text-gray-700">Average commission rate: <span className="font-semibold">8.2%</span></p>
                <p className="text-xs text-gray-500">15.8% increase from last year</p>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Recent Activity</h4>
            <div className="space-y-3">
              <div className="border-l-2 border-green-400 pl-3">
                <p className="text-sm font-medium text-gray-900">New Member Enrolled</p>
                <p className="text-sm text-gray-600">TechCorp Inc. - Robert Wilson</p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
              <div className="border-l-2 border-blue-400 pl-3">
                <p className="text-sm font-medium text-gray-900">Payment Processed</p>
                <p className="text-sm text-gray-600">$2,450.00 commission payment</p>
                <p className="text-xs text-gray-500">4 hours ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Form Example */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Member Search Form</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Subscriber ID
            </label>
            <input
              type="text"
              placeholder="Enter subscriber ID"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">Format: ABC123456</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Name
            </label>
            <input
              type="text"
              placeholder="Enter last name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">Case sensitive</p>
          </div>
        </div>
      </div>
      
      {/* Navigation Example */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Navigation Typography</h3>
        <nav className="space-y-1">
          <a href="#" className="block px-3 py-2 text-base font-medium text-blue-600 bg-blue-50 rounded-md">
            Dashboard
          </a>
          <a href="#" className="block px-3 py-2 text-base text-gray-700 hover:bg-gray-50 rounded-md">
            Commission Reports
          </a>
          <a href="#" className="block px-3 py-2 text-base text-gray-700 hover:bg-gray-50 rounded-md">
            Member Services
          </a>
          <div className="pl-6">
            <a href="#" className="block px-3 py-1 text-sm text-gray-600 hover:bg-gray-50 rounded-md">
              Member Search
            </a>
            <a href="#" className="block px-3 py-1 text-sm text-gray-600 hover:bg-gray-50 rounded-md">
              Claims History
            </a>
          </div>
        </nav>
      </div>
    </div>
  ),
};

export const AccessibilityConsiderations: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Typography Accessibility</h2>
        <p className="text-gray-600 mb-6">
          Ensuring readable and accessible text for all users, including those with visual impairments.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">✓ Accessible Examples</h3>
          <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-4">
            <div>
              <h4 className="text-base font-semibold text-gray-900 mb-2">Good Contrast</h4>
              <p className="text-gray-700">
                Dark text on light background provides excellent readability.
                <span className="text-sm text-gray-500 ml-2">(Contrast: 8.9:1)</span>
              </p>
            </div>
            <div>
              <h4 className="text-base font-semibold text-gray-900 mb-2">Proper Line Height</h4>
              <p className="text-gray-700 leading-relaxed">
                Adequate line spacing (1.5x font size) improves reading comprehension 
                and reduces eye strain for users with dyslexia and other reading difficulties.
              </p>
            </div>
            <div>
              <h4 className="text-base font-semibold text-gray-900 mb-2">Sufficient Font Size</h4>
              <p className="text-base text-gray-700">
                16px minimum for body text ensures readability on all devices.
              </p>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">✗ Avoid These</h3>
          <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-4">
            <div>
              <h4 className="text-base font-semibold text-gray-900 mb-2">Poor Contrast</h4>
              <p className="text-gray-400">
                Light text lacks sufficient contrast for reliable reading.
                <span className="text-xs text-gray-300 ml-2">(Contrast: 2.1:1)</span>
              </p>
            </div>
            <div>
              <h4 className="text-base font-semibold text-gray-900 mb-2">Tight Line Height</h4>
              <p className="text-gray-700 leading-tight">
                Cramped line spacing makes text difficult to read and can cause users to lose their place when reading longer passages.
              </p>
            </div>
            <div>
              <h4 className="text-base font-semibold text-gray-900 mb-2">Too Small</h4>
              <p className="text-xs text-gray-700">
                12px text is too small for comfortable reading on most devices.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h4 className="font-medium text-blue-900 mb-3">Accessibility Checklist</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
          <div>
            <h5 className="font-medium mb-2">Text Requirements</h5>
            <ul className="space-y-1">
              <li>✓ 4.5:1 contrast ratio minimum</li>
              <li>✓ 16px minimum body text size</li>
              <li>✓ 1.4-1.6x line height</li>
              <li>✓ Left-aligned text (avoid justify)</li>
            </ul>
          </div>
          <div>
            <h5 className="font-medium mb-2">User Experience</h5>
            <ul className="space-y-1">
              <li>✓ Consistent heading hierarchy</li>
              <li>✓ Adequate spacing between elements</li>
              <li>✓ Resizable up to 200% without loss of function</li>
              <li>✓ High contrast mode support</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const ResponsiveTypography: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Responsive Typography</h2>
        <p className="text-gray-600 mb-6">
          How typography scales across different screen sizes and devices.
        </p>
      </div>
      
      <div className="space-y-6">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Desktop Typography</h3>
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-gray-900">Main Page Title</h1>
            <h2 className="text-2xl font-semibold text-gray-800">Section Heading</h2>
            <p className="text-base text-gray-700 max-w-3xl">
              On desktop screens, we can use larger text sizes and longer line lengths. 
              This allows for more content per line while maintaining readability. 
              Optimal line length is 65-75 characters for comfortable reading.
            </p>
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h3 className="text-base font-semibold text-gray-900 mb-3">Mobile Typography</h3>
          <div className="space-y-3 max-w-sm">
            <h1 className="text-2xl font-bold text-gray-900">Page Title</h1>
            <h2 className="text-xl font-semibold text-gray-800">Section</h2>
            <p className="text-sm text-gray-700">
              Mobile screens require smaller text sizes and shorter line lengths. 
              We prioritize readability and thumb-friendly interaction zones.
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h4 className="font-medium text-gray-900 mb-3">Responsive Scale Guidelines</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2">Element</th>
                <th className="text-left py-2">Mobile</th>
                <th className="text-left py-2">Tablet</th>
                <th className="text-left py-2">Desktop</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              <tr className="border-b border-gray-100">
                <td className="py-2">H1</td>
                <td className="py-2">24px</td>
                <td className="py-2">30px</td>
                <td className="py-2">36px</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-2">H2</td>
                <td className="py-2">20px</td>
                <td className="py-2">24px</td>
                <td className="py-2">30px</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-2">Body</td>
                <td className="py-2">14px</td>
                <td className="py-2">16px</td>
                <td className="py-2">16px</td>
              </tr>
              <tr>
                <td className="py-2">Small</td>
                <td className="py-2">12px</td>
                <td className="py-2">14px</td>
                <td className="py-2">14px</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  ),
};
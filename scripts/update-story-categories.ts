import * as fs from 'fs';
import * as path from 'path';
import * as glob from 'glob';

type ComponentCategory = 'Atoms' | 'Molecules' | 'Organisms' | 'Layout';

// Component category mapping
const categoryMap: Record<string, ComponentCategory> = {
  // Atoms
  'Button': 'Atoms',
  'Input': 'Atoms',
  'TextArea': 'Atoms',
  'Select': 'Atoms',
  'Checkbox': 'Atoms',
  'Radio': 'Atoms',
  'Toggle': 'Atoms',
  'DatePicker': 'Atoms',
  'FileUpload': 'Atoms',
  'Tag': 'Atoms',
  'Badge': 'Atoms',
  'Avatar': 'Atoms',
  'Progress': 'Atoms',
  'Tooltip': 'Atoms',
  'Alert': 'Atoms',
  'Divider': 'Atoms',
  'Spacer': 'Atoms',
  'StatusLabel': 'Atoms',
  'Icons': 'Atoms',
  'NumberInput': 'Atoms',
  'TextBox': 'Atoms',
  'Command': 'Atoms',
  'Separator': 'Atoms',

  // Molecules
  'InputGroup': 'Molecules',
  'SearchBar': 'Molecules',
  'TagInput': 'Molecules',
  'AutoComplete': 'Molecules',
  'Calendar': 'Molecules',
  'Card': 'Molecules',
  'FormActions': 'Molecules',
  'FormButton': 'Molecules',
  'FormField': 'Molecules',
  'FormGroup': 'Molecules',
  'FormInlineGroup': 'Molecules',
  'ProfileAvatar': 'Molecules',
  'RadioGroup': 'Molecules',
  'SearchField': 'Molecules',
  'Tabs': 'Molecules',
  'Accordion': 'Molecules',

  // Organisms
  'Navigation': 'Organisms',
  'Form': 'Organisms',
  'FormContext': 'Organisms',
  'FormStepper': 'Organisms',
  'Modal': 'Organisms',
  'Pagination': 'Organisms',
  'ProfileHeaderCard': 'Organisms',
  'ProfileMenu': 'Organisms',
  'SearchNavigation': 'Organisms',
  'SiteHeader': 'Organisms',
  'SiteHeaderSubSection': 'Organisms',

  // Layout
  'FormGrid': 'Layout',
  'FormLayout': 'Layout',
  'FormSection': 'Layout',
  'FormColumn': 'Layout',
  'Column': 'Layout',
  'Row': 'Layout',
} as const;

// Find all story files
const storyFiles = glob.sync('packages/ui/src/components/**/*.stories.tsx');

storyFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  
  // Extract component name from file path
  const componentName = path.basename(path.dirname(file));
  const category = categoryMap[componentName as keyof typeof categoryMap];
  
  if (category) {
    // Replace title pattern
    const newContent = content.replace(
      /title:\s*['"](?:Foundation|Components|Composite)\/([^'"]+)['"]/,
      `title: '${category}/${componentName}'`
    );
    
    if (newContent !== content) {
      fs.writeFileSync(file, newContent);
      console.log(`Updated ${file} to use ${category} category`);
    }
  } else {
    console.warn(`No category mapping found for component: ${componentName}`);
  }
});

console.log('Story categories updated successfully!'); 
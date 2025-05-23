# Development Scripts

This directory contains utility scripts to help with development tasks.

## Component Export Fixer

**Script**: `fix-component-exports.js`

This script automatically scans the UI component library and fixes common import/export issues, ensuring consistent patterns across components.

### What it does

1. Scans all foundation and composite components in the UI library
2. Ensures each component has a proper `index.ts` file that exports from the main component file
3. Specifically fixes the TextArea component to include the missing ControlledTextArea export
4. Creates consistent export patterns across all components

### How to use it

```bash
# Using npm script (recommended)
pnpm fix-component-exports

# Or run directly
node scripts/fix-component-exports.js
```

### Example output

```
Component Export Fixer
Fixing component exports in UI library...

Processing Foundation Components:
Processing Alert
  Created index.ts for Alert
Processing Button
  Updated index.ts for Button
Processing TextArea
  Fixed TextArea exports to include ControlledTextArea
  Added missing ControlledTextArea export to TextArea.tsx

Processing Composite Components:
Processing FormGroup
  Updated index.ts for FormGroup

Summary:
Components scanned: 15
Index files created: 2
Files fixed: 3
Errors encountered: 0

All component exports fixed successfully!
```

### Common issues fixed

- Missing `index.ts` files
- Inconsistent export patterns
- Missing exports from component files
- The specific TextArea/ControlledTextArea issue that causes Storybook errors

### When to run it

- After creating new components
- When encountering import/export errors
- When getting Storybook warnings about missing exports 
#!/usr/bin/env node

/**
 * TextArea Export Fixer
 * 
 * This script fixes the TextArea component exports to ensure that
 * the ControlledTextArea component is properly exported and found by Storybook.
 * 
 * Usage:
 * node scripts/fix-exports.js
 */

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

// Paths
const TEXTAREA_INDEX_PATH = path.resolve(__dirname, '../packages/ui/src/components/foundation/TextArea/index.ts');
const TEXTAREA_COMPONENT_PATH = path.resolve(__dirname, '../packages/ui/src/components/foundation/TextArea/TextArea.tsx');

// Log function
function log(message, type = 'info') {
  const colors = {
    info: chalk.blue,
    success: chalk.green,
    warning: chalk.yellow,
    error: chalk.red
  };
  
  console.log(colors[type](`[${type.toUpperCase()}] ${message}`));
}

// Fix TextArea index.ts
function fixTextAreaIndex() {
  try {
    log('Checking TextArea index.ts...');
    
    // Create the fixed content
    const fixedContent = `import { TextArea, ControlledTextArea } from './TextArea';

export { TextArea, ControlledTextArea };
export type { TextAreaProps, ControlledTextAreaProps } from './TextArea';
`;
    
    // Write the file
    fs.writeFileSync(TEXTAREA_INDEX_PATH, fixedContent);
    log('Fixed TextArea index.ts with explicit exports', 'success');
    return true;
  } catch (error) {
    log(`Error fixing TextArea index.ts: ${error.message}`, 'error');
    return false;
  }
}

// Main function
async function main() {
  log(chalk.bold('TextArea Export Fixer'));
  log('Fixing TextArea component exports for Storybook...\n');
  
  // Check if TextArea files exist
  if (!fs.existsSync(TEXTAREA_COMPONENT_PATH)) {
    log('TextArea.tsx not found!', 'error');
    process.exit(1);
  }
  
  // Fix TextArea index.ts
  const indexFixed = fixTextAreaIndex();
  
  if (indexFixed) {
    log(chalk.green('\nTextArea exports fixed successfully!'));
  } else {
    log(chalk.red('\nFailed to fix TextArea exports.'));
    process.exit(1);
  }
}

// Run the script
main().catch(err => {
  log(`Fatal error: ${err.message}`, 'error');
  process.exit(1);
}); 
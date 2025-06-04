#!/usr/bin/env node

/**
 * React Types Fixer
 * 
 * This script scans the codebase for common React type errors and fixes them
 * by updating import statements and type references.
 * 
 * Usage:
 * node scripts/fix-react-types.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const chalk = require('chalk');

// Configuration
const ROOT_DIR = path.resolve(__dirname, '..');
const COMPONENTS_DIR = path.join(ROOT_DIR, 'packages/ui/src/components');

// Counter for stats
const stats = {
  scanned: 0,
  fixed: 0,
  errors: 0
};

// Utility functions
function log(message, type = 'info') {
  const colors = {
    info: chalk.blue,
    success: chalk.green,
    warning: chalk.yellow,
    error: chalk.red
  };
  
  console.log(colors[type](`[${type.toUpperCase()}] ${message}`));
}

/**
 * Fix React imports and types in a file
 */
async function fixReactTypes(filePath) {
  try {
    stats.scanned++;
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Check if this is a TS/TSX file with React imports
    if (!filePath.match(/\.(ts|tsx)$/) || !content.includes('react')) {
      return;
    }
    
    log(`Processing ${path.relative(ROOT_DIR, filePath)}`);
    
    // Create a backup
    fs.writeFileSync(`${filePath}.bak`, content);
    
    // Fix common React import issues
    let updatedContent = content;
    
    // Fix broken React import patterns
    if (
      updatedContent.includes("import React, {") ||
      (updatedContent.includes("import React from 'react'") && 
       updatedContent.match(/React\.(useState|useEffect|useCallback|useMemo|useRef|forwardRef|Ref|ForwardedRef|ChangeEvent)/))
    ) {
      // Replace with import * as React pattern
      updatedContent = updatedContent.replace(
        /import React(,\s*{[^}]+})?\s*from\s*['"]react['"];?/,
        "import * as React from 'react';"
      );
      
      // Remove any separate React component imports that are now redundant
      updatedContent = updatedContent.replace(
        /import\s*{\s*([^}]+)\s*}\s*from\s*['"]react['"];?/g,
        (match, imports) => {
          // Keep this import if it contains non-React standard items
          if (imports.includes('@')) {
            return match;
          }
          return '// Merged into * as React import';
        }
      );
    }
    
    // Fix FormFieldProps imports
    if (updatedContent.includes('FormFieldProps') && !updatedContent.includes('@portals/types')) {
      // Check for relative imports
      if (updatedContent.match(/import [^;]*FormFieldProps[^;]*from\s*['"][^'"]*types\/form['"]/)) {
        updatedContent = updatedContent.replace(
          /(import[^;]*FormFieldProps[^;]*from\s*['"])[^'"]*types\/form(['"])/,
          "$1@portals/types$2"
        );
      }
    }
    
    // Fix common React type issues
    updatedContent = updatedContent
      // Fix forwardRef pattern
      .replace(
        /export\s+const\s+(\w+)\s*=\s*(?:React\.)?forwardRef\(\s*<([^>]+)>\s*\(\s*{([^}]+)}\s*:[^,]+,\s*ref\s*:[^)]+\)\s*=>/,
        (match, componentName, genericType, props) => {
          return `export const ${componentName} = React.forwardRef<\n  HTMLElement,\n  ${componentName}Props<any>\n>(({${props}}, ref) =>`;
        }
      )
      // Fix type imports if needed
      .replace(
        /import\s+type\s*{([^}]*)}\s*from\s*['"]react-hook-form['"];?/,
        (match, imports) => {
          if (!imports.includes('RegisterOptions') && imports.includes('Control')) {
            return match.replace('}', ', RegisterOptions}');
          }
          return match;
        }
      );
    
    // Write updated content if changes were made
    if (updatedContent !== content) {
      fs.writeFileSync(filePath, updatedContent);
      stats.fixed++;
      log(`Fixed React types issues in ${path.relative(ROOT_DIR, filePath)}`, 'success');
    }
    
  } catch (error) {
    stats.errors++;
    log(`Error processing ${path.relative(ROOT_DIR, filePath)}: ${error.message}`, 'error');
  }
}

/**
 * Scan directory recursively
 */
async function scanDirectory(dirPath) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    
    if (entry.isDirectory()) {
      await scanDirectory(fullPath);
    } else if (entry.isFile() && /\.(ts|tsx)$/.test(entry.name)) {
      await fixReactTypes(fullPath);
    }
  }
}

/**
 * Main function
 */
async function main() {
  log(chalk.bold('React Types Fixer'));
  log('Fixing React type issues across the codebase...\n');
  
  try {
    // Scan components directory
    log(chalk.bold('Scanning UI components...'));
    await scanDirectory(COMPONENTS_DIR);
    
    // Report stats
    log(chalk.bold('\nSummary:'));
    log(`Files scanned: ${stats.scanned}`);
    log(`Files fixed: ${stats.fixed}`);
    log(`Errors encountered: ${stats.errors}`);
    
    if (stats.errors > 0) {
      log(chalk.yellow('\nThere were some errors. Please check the logs above.'));
      process.exit(1);
    } else if (stats.fixed > 0) {
      log(chalk.green('\nReact types were fixed successfully!'));
    } else {
      log(chalk.blue('\nNo issues found that needed fixing.'));
    }
    
  } catch (error) {
    log(`Fatal error: ${error.message}`, 'error');
    process.exit(1);
  }
}

// Run the script
main().catch(err => {
  log(`Fatal error: ${err.message}`, 'error');
  process.exit(1);
}); 
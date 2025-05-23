#!/usr/bin/env node

/**
 * Fix Component Import Paths
 * 
 * This script fixes import paths in UI components by replacing path aliases with relative paths.
 * It handles:
 * - @/utils/cn -> ../../../utils/cn or relative path
 * - @/components/... -> relative path to component
 * - @/composite/... -> relative path to composite component
 * - @/foundation/... -> relative path to foundation component
 * 
 * Special handling for story files to maintain compatibility with Storybook
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Base directories
const UI_SRC_DIR = path.resolve(__dirname, '../packages/ui/src');
const COMPONENTS_DIR = path.join(UI_SRC_DIR, 'components');
const COMPOSITE_DIR = path.join(COMPONENTS_DIR, 'composite');
const FOUNDATION_DIR = path.join(COMPONENTS_DIR, 'foundation');
const UTILS_DIR = path.join(UI_SRC_DIR, 'utils');

// Log with colors
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

// Track results
const results = {
  processed: 0,
  updated: 0,
  errors: 0
};

function log(message, color = colors.reset) {
  console.log(color + message + colors.reset);
}

function processFile(filePath) {
  try {
    log(`Processing file: ${filePath}`, colors.blue);
    
    // Read the file
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;
    
    // Check if this is a story file
    const isStoryFile = filePath.includes('.stories.');
    
    // Only process non-story files for import path changes
    if (!isStoryFile) {
      // Get relative paths
      const relativeToUtils = path.relative(path.dirname(filePath), UTILS_DIR).replace(/\\/g, '/');
      const relativeToComponents = path.relative(path.dirname(filePath), COMPONENTS_DIR).replace(/\\/g, '/');
      const relativeToComposite = path.relative(path.dirname(filePath), COMPOSITE_DIR).replace(/\\/g, '/');
      const relativeToFoundation = path.relative(path.dirname(filePath), FOUNDATION_DIR).replace(/\\/g, '/');
      
      // Fix imports
      content = content
        // Fix @/utils/cn imports
        .replace(/import\s+{\s*cn\s*}\s+from\s+['"]@\/utils\/cn['"]/g, 
          `import { cn } from '${relativeToUtils}/cn'`)
        
        // Fix @/components/... imports
        .replace(/import\s+{\s*([^}]+)\s*}\s+from\s+['"]@\/components\/([^'"]+)['"]/g, 
          (match, imports, componentPath) => {
            return `import { ${imports} } from '${relativeToComponents}/${componentPath}'`;
          })
        
        // Fix @composite/... imports
        .replace(/import\s+{\s*([^}]+)\s*}\s+from\s+['"]@composite\/([^'"]+)['"]/g, 
          (match, imports, componentPath) => {
            return `import { ${imports} } from '${relativeToComposite}/${componentPath}'`;
          })
        
        // Fix @foundation/... imports
        .replace(/import\s+{\s*([^}]+)\s*}\s+from\s+['"]@foundation\/([^'"]+)['"]/g, 
          (match, imports, componentPath) => {
            return `import { ${imports} } from '${relativeToFoundation}/${componentPath}'`;
          })
        
        // Fix import types from @/types
        .replace(/import\s+type\s+{\s*([^}]+)\s*}\s+from\s+['"]@\/types\/([^'"]+)['"]/g, 
          (match, imports, typesPath) => {
            return `import type { ${imports} } from '${relativeToUtils}/../types/${typesPath}'`;
          })
        
        // Fix import type from @composite/types
        .replace(/import\s+type\s+{\s*([^}]+)\s*}\s+from\s+['"]@composite\/types['"]/g,
          `import type { $1 } from '${relativeToComposite}/types'`);
      
      // Write back if changed
      if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        log(`✅ Updated imports in: ${filePath}`, colors.green);
        results.updated++;
      } else {
        log(`ℹ️ No changes needed in: ${filePath}`);
      }
    } else {
      log(`🔍 Skipping story file: ${filePath}`, colors.cyan);
    }
    
    results.processed++;
  } catch (error) {
    log(`❌ Error processing ${filePath}: ${error.message}`, colors.red);
    results.errors++;
  }
}

function walkDirectory(directoryPath, fileExtensions = ['.ts', '.tsx']) {
  const entries = fs.readdirSync(directoryPath, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(directoryPath, entry.name);
    
    if (entry.isDirectory()) {
      walkDirectory(fullPath, fileExtensions);
    } else if (entry.isFile() && fileExtensions.includes(path.extname(entry.name))) {
      processFile(fullPath);
    }
  }
}

// Main execution
function main() {
  log('🔍 Starting import path fix script...', colors.blue);
  
  // Fix composite components
  log('\n📂 Processing composite components...', colors.yellow);
  walkDirectory(COMPOSITE_DIR);
  
  // Fix foundation components
  log('\n📂 Processing foundation components...', colors.yellow);
  walkDirectory(FOUNDATION_DIR);
  
  // Report results
  log('\n📊 Results:', colors.blue);
  log(`✅ Files processed: ${results.processed}`, colors.green);
  log(`📝 Files updated: ${results.updated}`, colors.yellow);
  log(`❌ Errors: ${results.errors}`, results.errors > 0 ? colors.red : colors.green);
  
  log('\n🎉 Done!', colors.green);
}

main(); 
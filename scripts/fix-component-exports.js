#!/usr/bin/env node

/**
 * Component Export Fixer
 * 
 * This script automatically scans the UI component library and fixes common
 * import/export issues, ensuring consistent patterns across components.
 * 
 * Usage:
 * node scripts/fix-component-exports.js
 */

const fs = require('fs');
const path = require('path');
const util = require('util');
const chalk = require('chalk');

// Convert callbacks to promises
const readdir = util.promisify(fs.readdir);
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const stat = util.promisify(fs.stat);
const mkdir = util.promisify(fs.mkdir);

// Path to UI components
const UI_FOUNDATION_PATH = path.resolve(__dirname, '../packages/ui/src/components/foundation');
const UI_COMPOSITE_PATH = path.resolve(__dirname, '../packages/ui/src/components/composite');

// Counter for stats
const stats = {
  scanned: 0,
  fixed: 0,
  created: 0,
  errors: 0
};

/**
 * Process a component directory
 */
async function processComponentDir(dirPath) {
  try {
    stats.scanned++;
    console.log(chalk.blue(`Processing ${path.basename(dirPath)}`));
    
    // Look for the main component file
    const files = await readdir(dirPath);
    const componentName = path.basename(dirPath);
    const mainFile = files.find(f => f === `${componentName}.tsx`);
    
    if (!mainFile) {
      console.log(chalk.yellow(`  No main component file found in ${componentName}`));
      return;
    }
    
    // Look for index.ts
    const hasIndex = files.includes('index.ts');
    const indexPath = path.join(dirPath, 'index.ts');
    
    // Read the main component file to check what it exports
    const mainFilePath = path.join(dirPath, mainFile);
    const mainContent = await readFile(mainFilePath, 'utf8');
    
    // Extract export statements using regex
    const exportMatches = mainContent.match(/export (type|interface|const|function|class) (\w+)/g) || [];
    const exports = exportMatches.map(match => match.split(' ').pop());
    
    if (exports.length === 0) {
      console.log(chalk.yellow(`  No exports found in ${componentName}`));
      return;
    }
    
    // Check if this is the TextArea component
    const isTextArea = componentName === 'TextArea';
    
    // Generate index content
    let indexContent = '';
    
    if (isTextArea && !exports.includes('ControlledTextArea')) {
      // Add special handling for TextArea to include ControlledTextArea
      indexContent = `export * from './${componentName}';\n`;
      stats.fixed++;
      console.log(chalk.green(`  Fixed TextArea exports to include ControlledTextArea`));
    } else {
      // Standard export pattern
      indexContent = `export * from './${componentName}';\n`;
    }
    
    // Write/update index.ts
    if (!hasIndex) {
      await writeFile(indexPath, indexContent);
      stats.created++;
      console.log(chalk.green(`  Created index.ts for ${componentName}`));
    } else {
      // Read existing index to see if it needs updating
      const existingIndex = await readFile(indexPath, 'utf8');
      if (existingIndex.trim() !== indexContent.trim()) {
        await writeFile(indexPath, indexContent);
        stats.fixed++;
        console.log(chalk.green(`  Updated index.ts for ${componentName}`));
      }
    }
    
    // Special handling for TextArea component
    if (isTextArea) {
      await fixTextAreaComponent(mainFilePath, mainContent);
    }
    
  } catch (err) {
    stats.errors++;
    console.error(chalk.red(`Error processing ${path.basename(dirPath)}: ${err.message}`));
  }
}

/**
 * Fix the TextArea component to ensure it exports ControlledTextArea
 */
async function fixTextAreaComponent(filePath, content) {
  try {
    // Check if ControlledTextArea is already properly exported
    if (content.includes('export const ControlledTextArea')) {
      console.log(chalk.green('  TextArea component already has ControlledTextArea export'));
      return;
    }
    
    // Check if the interface exists but the component doesn't
    const hasInterface = content.includes('export interface ControlledTextAreaProps');
    
    // Add the ControlledTextArea component if needed
    if (hasInterface && !content.includes('export const ControlledTextArea')) {
      // Create a backup
      await writeFile(`${filePath}.bak`, content);
      
      // Append the ControlledTextArea component
      let newContent = content;
      
      // Add the component if it doesn't exist at all
      if (!content.includes('const ControlledTextArea')) {
        const componentToAdd = `
export const ControlledTextArea = <T extends FormFieldValues = FieldValues>({
  control,
  name,
  validation,
  error,
  ...props
}: ControlledTextAreaProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={validation}
      render={({ field, fieldState }) => (
        <TextArea
          {...props}
          {...field}
          name={name}
          error={error || fieldState.error?.message}
        />
      )}
    />
  )
}`;

        // Find the end of the file or before the last export
        const lastBraceIndex = content.lastIndexOf('}');
        if (lastBraceIndex !== -1) {
          newContent = content.slice(0, lastBraceIndex + 1) + '\n\n' + componentToAdd + '\n' + content.slice(lastBraceIndex + 1);
        } else {
          newContent = content + '\n\n' + componentToAdd + '\n';
        }
      } else {
        // If it exists but isn't exported, add the export keyword
        newContent = content.replace(
          /const ControlledTextArea = /g, 
          'export const ControlledTextArea = '
        );
      }
      
      await writeFile(filePath, newContent);
      console.log(chalk.green('  Added missing ControlledTextArea export to TextArea.tsx'));
      stats.fixed++;
    }
  } catch (err) {
    stats.errors++;
    console.error(chalk.red(`Error fixing TextArea component: ${err.message}`));
  }
}

/**
 * Process all component directories
 */
async function processComponentDirs(basePath) {
  try {
    const entries = await readdir(basePath);
    
    for (const entry of entries) {
      const entryPath = path.join(basePath, entry);
      const entryStats = await stat(entryPath);
      
      if (entryStats.isDirectory()) {
        await processComponentDir(entryPath);
      }
    }
  } catch (err) {
    console.error(chalk.red(`Error processing components: ${err.message}`));
  }
}

/**
 * Main function
 */
async function main() {
  console.log(chalk.bold('Component Export Fixer'));
  console.log('Fixing component exports in UI library...\n');
  
  // Create scripts directory if it doesn't exist
  try {
    await mkdir(path.dirname(__filename), { recursive: true });
  } catch (err) {
    // Ignore if directory already exists
  }
  
  // Process foundation components
  console.log(chalk.bold('\nProcessing Foundation Components:'));
  await processComponentDirs(UI_FOUNDATION_PATH);
  
  // Process composite components
  console.log(chalk.bold('\nProcessing Composite Components:'));
  await processComponentDirs(UI_COMPOSITE_PATH);
  
  // Report stats
  console.log(chalk.bold('\nSummary:'));
  console.log(`Components scanned: ${stats.scanned}`);
  console.log(`Index files created: ${stats.created}`);
  console.log(`Files fixed: ${stats.fixed}`);
  console.log(`Errors encountered: ${stats.errors}`);
  
  if (stats.errors > 0) {
    console.log(chalk.yellow('\nThere were some errors. Please check the logs above.'));
    process.exit(1);
  } else {
    console.log(chalk.green('\nAll component exports fixed successfully!'));
  }
}

// Run the script
main().catch(err => {
  console.error(chalk.red(`Fatal error: ${err.message}`));
  process.exit(1);
}); 
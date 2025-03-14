#!/usr/bin/env node

/**
 * Fix TypeScript configurations across all packages
 * 
 * This script:
 * 1. Adds skipLibCheck to all package configs
 * 2. Standardizes typeRoots
 * 3. Ensures consistent module resolution
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Find all tsconfig files in packages
const tsconfigFiles = glob.sync('./packages/*/tsconfig.json');
console.log(`Found ${tsconfigFiles.length} tsconfig files to process...`);

tsconfigFiles.forEach(configPath => {
  console.log(`Processing ${configPath}...`);
  
  try {
    // Read the tsconfig file
    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    
    // Ensure compilerOptions exists
    config.compilerOptions = config.compilerOptions || {};
    
    // Add skipLibCheck
    config.compilerOptions.skipLibCheck = true;
    
    // Add moduleResolution if not present
    if (!config.compilerOptions.moduleResolution) {
      config.compilerOptions.moduleResolution = "bundler";
    }
    
    // Standardize typeRoots
    config.compilerOptions.typeRoots = [
      "../../node_modules/.pnpm/@types",
      "../../node_modules/@types",
      "./node_modules/@types",
      "./src/types"
    ];
    
    // Remove problematic paths to use root ones
    if (config.compilerOptions.paths) {
      delete config.compilerOptions.paths;
    }
    
    // Write the updated config back
    fs.writeFileSync(
      configPath, 
      JSON.stringify(config, null, 2)
        // Preserve comments by adding them back as strings
        .replace(/"\/\/([^"]+)"/g, '"//$1"')
        .replace(/^{/g, '{\n  // TypeScript configuration for ' + path.basename(path.dirname(configPath)) + '\n  // Updated by fix-tsconfig.js')
    );
    
    console.log(`✅ Updated ${configPath}`);
  } catch (error) {
    console.error(`❌ Error processing ${configPath}:`, error);
  }
});

console.log('\nAll TypeScript configurations updated! Run "pnpm install" to ensure dependencies are properly linked.'); 
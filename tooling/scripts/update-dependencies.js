#!/usr/bin/env node

/**
 * Dependency Management Updater for Web 2025
 * 
 * This script helps update TurboRepo and related dependencies 
 * following best practices for modern web development.
 * 
 * Usage:
 * node scripts/update-dependencies.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const chalk = require('chalk');

// Configuration
const ROOT_DIR = path.resolve(__dirname, '..');
const PACKAGE_JSON_PATH = path.join(ROOT_DIR, 'package.json');
const TURBO_JSON_PATH = path.join(ROOT_DIR, 'turbo.json');

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

function runCommand(command, options = {}) {
  try {
    log(`Running: ${command}`);
    const output = execSync(command, {
      cwd: ROOT_DIR,
      stdio: 'inherit',
      ...options
    });
    return { success: true, output };
  } catch (error) {
    log(`Command failed: ${command}`, 'error');
    log(error.message, 'error');
    return { success: false, error };
  }
}

function updatePackageJson(updates) {
  try {
    const packageJsonContent = fs.readFileSync(PACKAGE_JSON_PATH, 'utf8');
    const packageJson = JSON.parse(packageJsonContent);
    
    // Apply updates
    Object.entries(updates).forEach(([key, value]) => {
      if (typeof value === 'object' && value !== null) {
        packageJson[key] = { ...packageJson[key], ...value };
      } else {
        packageJson[key] = value;
      }
    });
    
    // Write back to file
    fs.writeFileSync(
      PACKAGE_JSON_PATH,
      JSON.stringify(packageJson, null, 2) + '\n',
      'utf8'
    );
    
    log(`Updated package.json with new settings`, 'success');
    return true;
  } catch (error) {
    log(`Failed to update package.json: ${error.message}`, 'error');
    return false;
  }
}

function updateTurboJson(updates) {
  try {
    const turboJsonContent = fs.readFileSync(TURBO_JSON_PATH, 'utf8');
    const turboJson = JSON.parse(turboJsonContent);
    
    // Apply updates
    Object.entries(updates).forEach(([key, value]) => {
      if (typeof value === 'object' && value !== null) {
        turboJson[key] = { ...turboJson[key], ...value };
      } else {
        turboJson[key] = value;
      }
    });
    
    // Write back to file
    fs.writeFileSync(
      TURBO_JSON_PATH,
      JSON.stringify(turboJson, null, 2) + '\n',
      'utf8'
    );
    
    log(`Updated turbo.json with new settings`, 'success');
    return true;
  } catch (error) {
    log(`Failed to update turbo.json: ${error.message}`, 'error');
    return false;
  }
}

// Main function
async function main() {
  log(chalk.bold('TurboRepo Dependency Management Updater for Web 2025'));
  log('Beginning dependency updates...\n');
  
  // Check if running as root or admin
  const isRoot = process.getuid && process.getuid() === 0;
  if (isRoot) {
    log('Running as root is not recommended for dependency updates.', 'warning');
  }
  
  // 1. Update pnpm
  log(chalk.bold('\n1. Updating pnpm to the latest version'));
  runCommand('npm install -g pnpm@latest');
  
  // 2. Update TurboRepo
  log(chalk.bold('\n2. Updating TurboRepo'));
  runCommand('pnpm add -D turbo@latest');
  
  // 3. Update turbo.json with modern configurations
  log(chalk.bold('\n3. Updating turbo.json configurations'));
  const turboUpdates = {
    "$schema": "https://turbo.build/schema.json",
    "globalDependencies": ["**/.env.*local"],
    "pipeline": {
      "build": {
        "dependsOn": ["^build"],
        "outputs": ["dist/**", ".next/**", "!.next/cache/**"],
        "cache": true
      },
      "lint": {
        "outputs": [],
        "cache": true
      },
      "dev": {
        "cache": false,
        "persistent": true,
        "dependsOn": ["^build"]
      },
      "test": {
        "dependsOn": ["^build"],
        "outputs": ["coverage/**"],
        "inputs": ["src/**/*.tsx", "src/**/*.ts", "test/**/*.ts", "test/**/*.tsx"],
        "cache": true
      }
    },
    "globalEnv": [
      "NODE_ENV",
      "CI",
      "VERCEL",
      "PORT",
      "NEXT_PUBLIC_*"
    ]
  };
  
  // Only update if turbo.json has a "tasks" field, otherwise it might be in new format already
  const currentTurboJson = JSON.parse(fs.readFileSync(TURBO_JSON_PATH, 'utf8'));
  if (currentTurboJson.tasks && !currentTurboJson.pipeline) {
    // Convert from old format to new format
    log('Converting from old tasks format to new pipeline format', 'info');
    turboUpdates.pipeline = currentTurboJson.tasks;
    // Delete tasks field explicitly
    if (updateTurboJson(turboUpdates)) {
      // Edit again to remove tasks field if it still exists
      const updatedJson = JSON.parse(fs.readFileSync(TURBO_JSON_PATH, 'utf8'));
      if (updatedJson.tasks) {
        delete updatedJson.tasks;
        fs.writeFileSync(
          TURBO_JSON_PATH,
          JSON.stringify(updatedJson, null, 2) + '\n',
          'utf8'
        );
      }
    }
  } else {
    updateTurboJson(turboUpdates);
  }
  
  // 4. Update package.json configurations
  log(chalk.bold('\n4. Updating package.json configurations'));
  const packageUpdates = {
    "packageManager": "pnpm@latest",
    "engines": {
      "node": ">=18.0.0"
    },
    "scripts": {
      "build": "turbo build",
      "dev": "turbo dev",
      "lint": "turbo lint",
      "test": "turbo test",
      "format": "prettier --write \"**/*.{ts,tsx,md,json}\"",
      "prepare": "husky install",
      "clean": "pnpm -r exec -- rimraf dist .turbo node_modules && rimraf node_modules",
      "clean:install": "pnpm clean && pnpm install",
      "install:fast": "pnpm install --network-concurrency=16 --child-concurrency=16",
      "install:ci": "pnpm install --frozen-lockfile",
      "check-types": "turbo check-types",
      "analyze": "turbo analyze",
      "prune": "turbo prune",
      "gen:workspace": "turbo gen workspace"
    },
    "pnpm": {
      "overrides": {
        "axios": "^1.8.2",
        "esbuild": "^0.25.0",
        "typescript": "^5.4.2",
        "react": "^18.2.0",
        "react-dom": "^18.2.0"
      },
      "peerDependencyRules": {
        "allowedVersions": {
          "react": "18",
          "react-dom": "18"
        }
      }
    }
  };
  
  updatePackageJson(packageUpdates);
  
  // 5. Install additional development dependencies
  log(chalk.bold('\n5. Installing additional helpful development dependencies'));
  runCommand('pnpm add -D @turbo/gen concurrently cross-env rimraf npm-check-updates typescript@latest');
  
  // 6. Run pruning to clean up dependencies
  log(chalk.bold('\n6. Pruning and optimizing dependencies'));
  runCommand('pnpm install');
  
  log(chalk.bold('\nDependency management update completed!'));
  log('Your TurboRepo is now configured with best practices for 2025.');
}

// Run the script
main().catch(err => {
  log(`Fatal error: ${err.message}`, 'error');
  process.exit(1);
}); 
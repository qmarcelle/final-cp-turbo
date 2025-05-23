// packages/ui/scripts/manage-radix-versions.ts
// Script to manage Radix UI versions in shadcn/ui components

import fs from 'fs/promises'
import path from 'path'
import { glob } from 'glob'

interface RadixDependency {
  package: string
  version: string
  component: string
  file: string
}

interface ComponentConfig {
  name: string
  radixPackages: string[] 
  customVersion?: Record<string, string>
  frozen?: boolean // Prevent automatic updates
}

/**
 * Configuration for component-specific Radix versions
 * Allows fine-grained control over which Radix versions to use
 */
const COMPONENT_CONFIGS: ComponentConfig[] = [
  {
    name: 'dialog',
    radixPackages: ['@radix-ui/react-dialog'],
    customVersion: {
      '@radix-ui/react-dialog': '^1.0.5' // Pin to specific version
    },
    frozen: true // Don't auto-update this component
  },
  {
    name: 'select',  
    radixPackages: ['@radix-ui/react-select'],
    customVersion: {
      '@radix-ui/react-select': '^2.0.0' // Use newer version
    }
  },
  {
    name: 'tooltip',
    radixPackages: ['@radix-ui/react-tooltip', '@radix-ui/react-portal'],
    // Use catalog versions for these
  }
]

/**
 * Extract Radix imports from a component file
 */
async function extractRadixImports(filePath: string): Promise<RadixDependency[]> {
  const content = await fs.readFile(filePath, 'utf-8')
  const imports: RadixDependency[] = []
  
  // Match Radix import statements
  const importRegex = /import\s+.*\s+from\s+["'](@radix-ui\/react-[\w-]+)["']/g
  let match
  
  while ((match = importRegex.exec(content)) !== null) {
    const packageName = match[1]
    imports.push({
      package: packageName,
      version: 'detected',
      component: path.basename(filePath, '.tsx'),
      file: filePath
    })
  }
  
  return imports
}

/**
 * Update component with specific Radix versions
 */
async function updateComponentRadixVersions() {
  const componentFiles = await glob('packages/ui/src/components/ui/**/*.tsx')
  
  for (const file of componentFiles) {
    const componentName = path.basename(file, '.tsx')
    const config = COMPONENT_CONFIGS.find(c => c.name === componentName)
    
    if (!config || config.frozen) {
      console.log(`⏭️  Skipping ${componentName} (frozen or no config)`)
      continue
    }
    
    const radixImports = await extractRadixImports(file)
    
    if (radixImports.length > 0) {
      console.log(`🔧 Processing ${componentName}:`)
      
      for (const imp of radixImports) {
        const targetVersion = config.customVersion?.[imp.package] || 'catalog:'
        console.log(`  ${imp.package} → ${targetVersion}`)
      }
    }
  }
}

/**
 * Generate component registry with version tracking
 */
async function generateComponentRegistry() {
  const registry = {
    components: {} as Record<string, {
      file: string
      radixDependencies: RadixDependency[]
      lastUpdated: string
      version: string
    }>,
    generatedAt: new Date().toISOString()
  }
  
  const componentFiles = await glob('packages/ui/src/components/ui/**/*.tsx')
  
  for (const file of componentFiles) {
    const componentName = path.basename(file, '.tsx')
    const radixImports = await extractRadixImports(file)
    
    registry.components[componentName] = {
      file: path.relative(process.cwd(), file),
      radixDependencies: radixImports,
      lastUpdated: new Date().toISOString(),
      version: '1.0.0' // You could extract this from comments or git
    }
  }
  
  await fs.writeFile(
    'packages/ui/component-registry.json', 
    JSON.stringify(registry, null, 2)
  )
  
  console.log('📝 Generated component registry')
}

/**
 * Validate component compatibility with current Radix versions
 */
async function validateCompatibility() {
  const packageJson = JSON.parse(
    await fs.readFile('packages/ui/package.json', 'utf-8')
  )
  
  const installedVersions = {
    ...packageJson.dependencies,
    ...packageJson.devDependencies
  }
  
  const componentFiles = await glob('packages/ui/src/components/ui/**/*.tsx')
  const issues: string[] = []
  
  for (const file of componentFiles) {
    const componentName = path.basename(file, '.tsx')
    const radixImports = await extractRadixImports(file)
    
    for (const imp of radixImports) {
      const installedVersion = installedVersions[imp.package]
      if (!installedVersion) {
        issues.push(`❌ ${componentName}: Missing dependency ${imp.package}`)
      }
    }
  }
  
  if (issues.length > 0) {
    console.log('🚨 Compatibility Issues:')
    issues.forEach(issue => console.log(issue))
    process.exit(1)
  } else {
    console.log('✅ All components compatible with installed Radix versions')
  }
}

// CLI interface
const command = process.argv[2]

switch (command) {
  case 'update':
    updateComponentRadixVersions()
    break
  case 'registry':
    generateComponentRegistry()
    break
  case 'validate':
    validateCompatibility()
    break
  default:
    console.log(`
Usage: pnpm ui:manage <command>

Commands:
  update    - Update components with configured Radix versions
  registry  - Generate component registry with dependencies
  validate  - Validate component compatibility
    `)
}

export {
  extractRadixImports,
  updateComponentRadixVersions,
  generateComponentRegistry,
  validateCompatibility
}
import { defineConfig } from 'tsup';
// @ts-ignore: This will be a .js file, but we want the config object
import { baseTsupConfig } from '@portals/typescript-config/tsup/base';

export default defineConfig({
  ...baseTsupConfig,
  // Add any specific overrides for shared-utils here if needed
  // For example, if it has multiple entry points:
  // entry: ['src/index.ts', 'src/other-entry.ts'],
}); 
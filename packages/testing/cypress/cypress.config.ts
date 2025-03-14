/**
 * Base Cypress configuration for Consumer Portals
 * This serves as the foundation for all portal-specific Cypress configs
 */
import { defineConfig } from 'cypress';

/**
 * Shared Cypress configuration that can be extended by individual portals
 */
export const baseCypressConfig = defineConfig({
  viewportWidth: 1280,
  viewportHeight: 720,
  video: false,
  screenshotOnRunFailure: true,
  
  e2e: {
    setupNodeEvents(on, config) {
      return config;
    },
  },
  
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
  },
});

export default baseCypressConfig; 
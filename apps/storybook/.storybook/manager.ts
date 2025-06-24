import { addons } from 'storybook/manager-api'

// Configure Storybook UI (sidebar, toolbar, etc.)
addons.setConfig({
  // Sidebar configuration
  sidebar: {
    showRoots: true, // Shows root level folders
    collapsedRoots: ['atoms', 'molecules'], // Start with these collapsed
  },

  // Toolbar configuration
  toolbar: {
    title: { hidden: false },
    zoom: { hidden: false },
    eject: { hidden: false },
    copy: { hidden: false },
    fullscreen: { hidden: false },
  },

  // Panel configuration
  panelPosition: 'bottom', // 'bottom' or 'right'

  // Initial state
  initialActive: 'sidebar', // 'sidebar' or 'canvas' or 'addons'

  // Enable keyboard shortcuts
  enableShortcuts: true,

  // Show panel by default
  showPanel: true,

  // Show navigation arrows
  showNav: true,

  // Panel tabs to show
  selectedPanel: 'controls', // Default selected addon panel

  // Theme configuration is now handled by addon-themes
  // Custom branding can still be added here if needed:
  /*
  theme: {
    base: 'light',
    brandTitle: '🎨 BCBST Design System',
    brandUrl: 'https://bcbst.com',
    brandImage: '/assets/bcbst-logo.png',
    brandTarget: '_self',
  },
  */
})

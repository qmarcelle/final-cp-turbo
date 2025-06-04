/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: ['./react.js', 'next/core-web-vitals'],
  rules: {
    // Next.js specific optimizations
    '@next/next/no-img-element': 'error',
    '@next/next/no-html-link-for-pages': 'error',
    '@next/next/no-sync-scripts': 'error',
    '@next/next/no-title-in-document-head': 'error',
    
    // Performance rules
    '@next/next/google-font-display': 'warn',
    '@next/next/google-font-preconnect': 'warn',
    '@next/next/next-script-for-ga': 'warn',
    '@next/next/no-before-interactive-script-outside-document': 'error',
    '@next/next/no-css-tags': 'error',
    '@next/next/no-head-element': 'error',
    '@next/next/no-head-import-in-document': 'error',
    '@next/next/no-script-component-in-head': 'error',
    '@next/next/no-styled-jsx-in-document': 'error',
    '@next/next/no-typos': 'error',
    '@next/next/no-unwanted-polyfillio': 'error',
  },
  env: {
    browser: true,
    node: true,
  },
} 
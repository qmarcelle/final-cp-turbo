/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  env: {
    node: true,
    es2022: true,
    browser: true,
    jest: true,
  },
  extends: [
    'eslint:recommended',
  ],
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
  overrides: [
    {
      // TypeScript files
      files: ['**/*.{ts,tsx}'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
      ],
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      env: {
        browser: true,
        node: true,
        jest: true,
      },
      rules: {
        // Relaxed TypeScript rules for the upgrade
        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/no-unused-vars': ['warn', { 
          'argsIgnorePattern': '^_',
          'varsIgnorePattern': '^_',
          'destructuredArrayIgnorePattern': '^_'
        }],
        '@typescript-eslint/ban-ts-comment': 'warn',
        '@typescript-eslint/no-empty-object-type': 'warn',
        'no-undef': 'off', // TypeScript handles this
      },
    },
    {
      // JavaScript files
      files: ['**/*.{js,jsx}'],
      env: {
        node: true,
        browser: true,
        jest: true,
      },
    },
    {
      // Test files
      files: ['**/*.{test,spec}.{ts,tsx,js,jsx}', '**/__tests__/**/*.{ts,tsx,js,jsx}'],
      env: {
        jest: true,
        node: true,
      },
      globals: {
        describe: 'readonly',
        it: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        jest: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
      },
    },
  ],
  ignorePatterns: [
    'node_modules/',
    'dist/',
    'build/',
    '.next/',
    'out/',
    'storybook-static/',
    '**/*.tsbuildinfo',
    '.turbo/',
    'coverage/',
    'public/',
    'turbo.json',
    'package.json',
    'pnpm-lock.yaml',
    'tsconfig*.json',
    'postcss.config.js',
    'tailwind.config.js',
    'vitest.config.ts',
    'jest.config.js',
    'commitlint.config.js',
  ],
  rules: {
    // Global rules for all file types
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-debugger': 'error',
    'prefer-const': 'error',
    'no-var': 'error',
  },
} 
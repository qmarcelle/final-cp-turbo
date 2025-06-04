/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  env: {
    node: true,
    es2022: true,
  },
  extends: [
    'eslint:recommended',
  ],
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
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
  ],
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      extends: [
        '@typescript-eslint/recommended',
      ],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
      parserOptions: {
        project: './tsconfig.json',
      },
    },
  ],
} 
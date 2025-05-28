/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src', '<rootDir>/tests'],
  moduleNameMapper: {
    // If you have path aliases in tsconfig.json, map them here
    // e.g., "^@/(.*)$": "<rootDir>/src/$1"
    '^@src/(.*)$': '<rootDir>/src/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/tests/setupTests.ts'], // For MSW or other global test setup
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/index.ts', // Usually, index files are just exports
    '!src/types/**', // Or wherever your type definitions are
    '!src/**/mock*.{ts,tsx}' // Exclude mocks
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'json'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  transform: {
    '^.+\.(ts|tsx)?$': ['ts-jest', { /* ts-jest config options */ }],
  },
};

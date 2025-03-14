const path = require('path');
const { createJestConfig } = require('../testing/src');

/** @type {import('jest').Config} */
const config = {
  ...createJestConfig(__dirname),
  displayName: 'types',
  rootDir: '.',
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      tsconfig: path.join(__dirname, 'tsconfig.json'),
    }],
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  setupFilesAfterEnv: [
    path.join(__dirname, 'setupTests.js')
  ]
};

module.exports = config;

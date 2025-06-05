import type { Config } from 'jest';
import { createJestConfig } from '../testing/src/jest/jest.config.base';
import path from 'path';

const config: Config = {
  ...createJestConfig(path.resolve(__dirname)),
  displayName: 'ui',
  setupFilesAfterEnv: [
    '<rootDir>/jest.setup.ts'
  ],
  moduleNameMapper: {
   '\\.svg$': '<rootDir>/packages/ui/src/tests/__mocks__/svg.js',
  },
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  testEnvironment: 'jsdom'
};

export default config; 
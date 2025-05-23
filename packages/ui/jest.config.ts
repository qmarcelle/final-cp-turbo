import type { Config } from 'jest';
import { createJestConfig } from '../testing/src/jest/jest.config.base';
import path from 'path';

const tsConfigForPaths = path.resolve(__dirname, './tsconfig.jest.json');

const config: Config = {
  ...createJestConfig(path.resolve(__dirname), tsConfigForPaths),
  displayName: 'ui',
  setupFilesAfterEnv: [
    '<rootDir>/jest.setup.ts'
  ],
  transform: {
    '^.+\\.(ts|tsx)$' : [
      'ts-jest',
      {
        tsconfig: tsConfigForPaths,
        babelConfig: false,
        diagnostics: {
          ignoreCodes: ['TS151001'] 
        }
      }
    ]
  },
  testEnvironment: 'jsdom'
};

export default config; 
import type { Config } from 'jest';
import { createJestConfig } from '../testing/src/jest/jest.config.base';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config: Config = {
  ...createJestConfig(__dirname),
  displayName: 'ui',
  setupFilesAfterEnv: [
    '<rootDir>/jest.setup.ts'
  ],
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      babelConfig: {
        presets: [
          '@babel/preset-typescript',
          ['@babel/preset-react', { runtime: 'automatic' }],
        ],
      },
    }],
  },
  testEnvironment: 'jsdom'
};

export default config; 
import type { Config } from 'jest';
import { createJestConfig } from '@portals/testing';

const config: Config = {
  ...createJestConfig(),
  displayName: 'utils',
  rootDir: '.',
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};

export default config;

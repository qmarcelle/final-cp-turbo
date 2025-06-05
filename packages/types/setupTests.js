/**
 * Setup file for Jest tests in the types package
 * This file will be run before each test file
 */

// This file is intentionally using CommonJS syntax for compatibility with Jest
require('@testing-library/jest-dom');

// Custom Jest matchers for working with TypeScript types
global.expect = require('expect'); 
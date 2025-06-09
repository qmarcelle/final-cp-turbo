# Storybook 9 Required Packages

This document outlines the primary packages required to set up Storybook 9 in a React component library using Vite within this monorepo.

## Core Dependencies

-   `storybook`: The main Storybook package. In version 9, it includes many addons that were previously separate packages, such as `addon-essentials`, `addon-actions`, `addon-links`, etc.
-   `@storybook/react`: The framework renderer for React.
-   `@storybook/react-vite`: The framework package that integrates Storybook with React and Vite. This replaces the Webpack-specific packages.
-   `eslint-plugin-storybook`: An ESLint plugin that provides linting rules for Storybook stories.
-   `vite`: Storybook for Vite requires Vite as a peer dependency. 
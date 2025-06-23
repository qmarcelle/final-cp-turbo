# Style Architecture Guide

## Overview

This document outlines the centralized style architecture for our monorepo, ensuring consistency, maintainability, and a true design system approach across all applications.

## Core Principle: Single Source of Truth

**All styles should live ONLY in the UI package (`packages/ui`), not in individual apps.**

## Architecture Pattern

```
packages/ui/src/styles/
├── globals.css                 ← Single source of truth for all styles
│   ├── Design system tokens
│   ├── CSS custom properties
│   ├── Component base styles
│   ├── Typography definitions
│   └── Utility classes
└── [No other CSS files needed]

apps/storybook/
├── .storybook/preview.tsx      ← Import: '@portals/ui/styles'
└── [No local styles directory]

apps/broker-portal/
├── src/app/globals.css         ← Import: '@portals/ui/styles' + minimal app-specific overrides
└── [App-specific styles only if absolutely necessary]

apps/employer-portal/
├── src/styles/globals.css      ← Import: '@portals/ui/styles' + minimal app-specific overrides
└── [App-specific styles only if absolutely necessary]
```

## Implementation Details

### UI Package Styles (`packages/ui/src/styles/globals.css`)

This file contains:

1. **Tailwind Directives**
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

2. **Design System CSS Custom Properties**
   - Primary, secondary, tertiary colors
   - Status colors (error, success, warning)
   - Spacing scale
   - Typography definitions
   - Shadows and effects
   - Z-index layers
   - Animation durations and easings

3. **Semantic Color Mappings**
   - Background, foreground, muted colors
   - Card, popover, border colors
   - Focus and accent colors

4. **Font Face Declarations**
   - Custom font loading (Univers family)
   - Proper font-display: swap for performance

5. **Component Base Styles**
   - Navigation components
   - Common UI patterns

6. **Utility Classes**
   - Text shadows
   - Transition helpers

### Storybook Configuration

In `apps/storybook/.storybook/preview.tsx`:

```typescript
import '@portals/ui/styles'; // Single source of truth for all styles
// No other CSS imports needed
```

### Application Configuration

Each app should import the UI styles and add minimal app-specific overrides if needed:

```css
/* apps/[app-name]/src/[styles|app]/globals.css */
@import '@portals/ui/styles';

/* App-specific overrides only if absolutely necessary */
.app-specific-class {
  /* Minimal app-specific styles */
}
```

## Benefits

### 1. **Design System Integrity**
- Storybook shows exactly what consumers get
- No style conflicts or overrides
- True representation of the design system

### 2. **Maintainability**
- Single place to update colors, spacing, typography
- Consistent design tokens across all apps
- Easier to implement design changes

### 3. **Developer Experience**
- No debugging style conflicts
- Clear source of truth for all styling
- Simplified mental model

### 4. **Performance**
- No duplicate CSS loading
- Optimized bundle sizes
- Consistent caching across apps

## Migration Steps

When moving from scattered styles to centralized:

1. **Audit Existing Styles**
   - Identify all CSS files across apps
   - Catalog custom properties and design tokens
   - Note any app-specific styling needs

2. **Consolidate to UI Package**
   - Move all design system styles to `packages/ui/src/styles/globals.css`
   - Ensure comprehensive design token coverage
   - Test component rendering

3. **Update Import Statements**
   - Replace multiple CSS imports with single `@portals/ui/styles` import
   - Remove conflicting CSS files
   - Update Storybook configuration

4. **Validate Consistency**
   - Ensure Storybook matches app rendering
   - Test all components across different apps
   - Verify design system compliance

## Common Anti-Patterns to Avoid

### ❌ Multiple CSS Sources
```typescript
// DON'T DO THIS
import '@portals/ui/styles';
import '../styles/tailwind.css';     // Conflicts with design system
import './component-styles.css';     // Scattered styles
```

### ❌ App-Specific Design Tokens
```css
/* DON'T DO THIS in app-specific CSS */
:root {
  --primary-color: #different-blue;  /* Conflicts with design system */
}
```

### ❌ Duplicate Tailwind Configurations
```css
/* DON'T DO THIS in multiple places */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Best Practices

### ✅ Single Import Pattern
```typescript
// Storybook, apps, and any consumers
import '@portals/ui/styles';
```

### ✅ Minimal App Overrides
```css
/* Only if absolutely necessary */
@import '@portals/ui/styles';

/* Very specific app-only styles */
.app-header-custom-layout {
  /* App-specific positioning only */
}
```

### ✅ Design System Extensions
```css
/* Add to UI package globals.css, not app-specific files */
:root {
  --new-design-token: value;
}
```

## Troubleshooting

### Styles Not Loading in Storybook
1. Verify `@portals/ui/styles` import in preview.tsx
2. Check that no conflicting CSS files are imported
3. Ensure UI package build is up to date

### Style Conflicts Between Apps
1. Remove app-specific CSS custom properties
2. Consolidate conflicting styles to UI package
3. Use CSS specificity carefully for app overrides

### Design System Inconsistencies
1. Audit all CSS files for duplicate design tokens
2. Move all design tokens to UI package
3. Remove redundant CSS custom properties

## Future Considerations

### Dark Mode Support
- All color tokens are prepared for dark mode
- Use CSS custom properties for theme switching
- Maintain single source of truth for both themes

### Component-Specific Styles
- Keep component styles co-located with components
- Use CSS-in-JS or CSS modules for component isolation
- Maintain design system compliance

### Performance Optimization
- Consider CSS splitting for large applications
- Implement critical CSS loading strategies
- Monitor bundle sizes and loading performance

## Conclusion

By maintaining a single source of truth for styles in the UI package, we ensure:
- **Consistency** across all applications
- **Maintainability** through centralized design tokens
- **Accuracy** in Storybook representation
- **Performance** through optimized CSS loading

This architecture supports our design system goals while providing the flexibility needed for a growing monorepo.
# Composite Components Documentation

This directory contains higher-level components that combine foundation components to provide complex functionality and UX patterns.

## Navigation Components

### AppBreadcrumbs Component

#### Current Features
- ✅ Configurable breadcrumb generation from URL paths
- ✅ App-specific configuration support
- ✅ Smart segment filtering (route groups, dynamic segments)
- ✅ Custom label mapping for path segments
- ✅ Dynamic label generation for contextual segments
- ✅ Responsive design with max items limiting
- ✅ Automatic humanization of path segments

#### Configuration Options
- `home`: Define home/root breadcrumb
- `ignoredSegments`: Filter out technical routing segments
- `pathLabels`: Custom display names for path segments
- `showCurrentPage`: Control if current page shows as breadcrumb
- `maxItems`: Limit breadcrumb items to prevent overflow
- `getDynamicLabel`: Generate labels for dynamic route segments
- `processPath`: Custom path processing logic

#### Usage Example
```typescript
import { AppBreadcrumbs } from '@portals/ui';
import { brokerBreadcrumbConfig } from '@/config/breadcrumb.config';

function Layout() {
  return (
    <div>
      <AppBreadcrumbs config={brokerBreadcrumbConfig} />
      {children}
    </div>
  );
}
```

### Navigation Components

#### Current Features
- ✅ Responsive navigation with mobile menu support
- ✅ Compound component architecture
- ✅ Dropdown menu support with keyboard navigation
- ✅ Active state management
- ✅ Accessibility features (ARIA attributes, focus management)
- ✅ Customizable styling with Tailwind CSS

#### Available Components
- `Navigation`: Root navigation container
- `Navigation.Content`: Navigation content wrapper
- `Navigation.Brand`: Logo/brand section
- `Navigation.Toggle`: Mobile menu toggle button
- `Navigation.Menu`: Navigation menu container
- `Navigation.Item`: Individual navigation links
- `Navigation.Dropdown`: Dropdown menu container
- `Navigation.DropdownItem`: Dropdown menu items

#### Breadcrumb Components
- `Breadcrumb`: Breadcrumb container
- `BreadcrumbList`: Breadcrumb list wrapper
- `BreadcrumbItem`: Individual breadcrumb items

#### Recommended Improvements
- [ ] Add keyboard navigation between menu items
- [ ] Add animation support for mobile menu
- [ ] Add mega menu support for complex navigation
- [ ] Add search integration
- [ ] Add user menu patterns
- [ ] Add navigation analytics tracking

#### Documentation
For detailed breadcrumb implementation guide, see: **[Breadcrumbs Guide](../../../docs/ui-breadcrumbs.md)**

# Form Framework Component Recommendations

## FormActions Component

### Current Strengths
- ✅ Clear prop interface with alignment options
- ✅ Proper use of clsx for conditional classes
- ✅ Flexible layout options with justify-between

### Recommended Improvements
- [ ] Add `spacing` prop to control gap between buttons (currently fixed at gap-4)
- [ ] Add support for vertical stacking on mobile
- [ ] Consider adding a `fullWidth` prop for mobile views

## FormButton Component

### Current Strengths
- ✅ Comprehensive variant and size options
- ✅ Loading state with spinner
- ✅ Proper accessibility with focus states
- ✅ Dark mode support

### Recommended Improvements
- [ ] Add `type="submit"` variant for form submission
- [ ] Add `icon` prop for icon-only buttons
- [ ] Consider adding `outline` variant
- [ ] Add keyboard navigation support between buttons

## FormGrid Component

### Current Strengths
- ✅ Flexible column options
- ✅ Responsive breakpoints
- ✅ Configurable gap sizes

### Recommended Improvements
- [ ] Add `rowSpan` support for complex layouts
- [ ] Add `alignItems` and `justifyItems` props
- [ ] Consider adding auto-fit/auto-fill options
- [ ] Add support for custom breakpoints

## FormGroup Component

### Current Strengths
- ✅ Comprehensive error handling
- ✅ Proper form context integration
- ✅ Strong accessibility support
- ✅ Flexible layout options

### Recommended Improvements
- [ ] Add support for help text tooltips
- [ ] Add character count for inputs
- [ ] Add support for field masking
- [ ] Consider adding field validation hints

## FormStepper Component

### Current Strengths
- ✅ Clean step navigation
- ✅ Progress tracking
- ✅ Form state management
- ✅ Flexible step configuration

### Recommended Improvements
- [ ] Add step validation summaries
- [ ] Add support for branching logic
- [ ] Consider adding step persistence
- [ ] Add transition animations

## FormSection Component

### Current Strengths
- ✅ Clean and simple interface with title and description
- ✅ Good use of Tailwind for styling and dark mode support
- ✅ Proper data-cy attributes for testing
- ✅ Consistent border and spacing styles

### Recommended Improvements
- [ ] Add collapsible sections with animation
- [ ] Add section status indicators (error, warning, success)
- [ ] Add custom header actions (edit, delete, etc.)
- [ ] Add section loading state
- [ ] Add section footer support
- [ ] Add section dividers
- [ ] Add section icons
- [ ] Add section badges
- [ ] Add section nesting support
- [ ] Add section expansion/collapse persistence

### Test Coverage
- ✅ Tests for title and description rendering
- ✅ Tests for children rendering
- ✅ Tests for custom className
- ✅ Tests for optional description

### Test Improvements
- [ ] Add tests for section interactions (collapse/expand)
- [ ] Add tests for section status states
- [ ] Add tests for custom actions
- [ ] Add tests for loading states
- [ ] Add tests for keyboard navigation
- [ ] Add tests for screen reader compatibility

## FormContext Component

### Current Strengths
- ✅ Clean integration with React Hook Form
- ✅ Type-safe field registration with useField hook
- ✅ Zod schema validation integration
- ✅ Support for default values and custom submission
- ✅ Error handling and form state management

### Recommended Improvements
- [ ] Add form-level validation state
- [ ] Add form dirty state tracking
- [ ] Add field-level validation state
- [ ] Add form reset functionality
- [ ] Add form submission state management
- [ ] Add form error boundary
- [ ] Add form field dependencies
- [ ] Add form field conditional rendering
- [ ] Add form field array support
- [ ] Add form field watch functionality

### Missing Tests
- [ ] Add tests for form submission
- [ ] Add tests for form validation
- [ ] Add tests for form state management
- [ ] Add tests for error handling
- [ ] Add tests for field registration
- [ ] Add tests for form context hooks
- [ ] Add tests for form reset
- [ ] Add tests for form dirty state
- [ ] Add tests for field dependencies
- [ ] Add tests for field arrays

### Performance Considerations
- [ ] Implement form field memoization
- [ ] Add field-level validation debouncing
- [ ] Optimize form state updates
- [ ] Add form state persistence
- [ ] Consider form field virtualization
- [ ] Add form submission throttling
- [ ] Optimize validation performance
- [ ] Add form state caching

## General Framework Improvements

### Testing
- [ ] Add E2E tests for form flows
- [ ] Add visual regression tests
- [ ] Improve test coverage for edge cases
- [ ] Add performance benchmarking tests

### Accessibility
- [ ] Implement ARIA live regions for dynamic content
- [ ] Add keyboard navigation patterns
- [ ] Improve screen reader support
- [ ] Add high contrast mode support

### Documentation
- [ ] Add interactive Storybook examples
- [ ] Create component API documentation
- [ ] Add usage guidelines and best practices
- [ ] Include performance considerations

### Performance
- [ ] Implement form field memoization
- [ ] Add lazy loading for complex fields
- [ ] Optimize validation performance
- [ ] Add bundle size monitoring

### Security
- [ ] Add input sanitization
- [ ] Implement CSRF protection
- [ ] Add rate limiting for submissions
- [ ] Improve error message security

## Future Considerations

### Integration
- [ ] Add support for third-party form libraries
- [ ] Create adapters for popular backend frameworks
- [ ] Add export/import functionality
- [ ] Consider adding form analytics

### Customization
- [ ] Add theme customization
- [ ] Create plugin system
- [ ] Add custom validation rules
- [ ] Support custom form layouts

### Mobile Support
- [ ] Improve touch interactions
- [ ] Add mobile-specific layouts
- [ ] Implement responsive validation
- [ ] Add offline support

### Internationalization
- [ ] Add RTL support
- [ ] Implement locale-specific validation
- [ ] Add translation support
- [ ] Consider cultural format differences

# Form Framework Component Documentation

## Storybook 8.5.x Integration Guide

### Component Documentation Structure
Each composite component should follow this documentation structure in Storybook:

```typescript
// [ComponentName].stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { [ComponentName] } from './[ComponentName]'

const meta: Meta<typeof [ComponentName]> = {
  title: 'Composite/[ComponentName]',
  component: [ComponentName],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Description of the component and its usage'
      }
    },
    a11y: {
      config: {
        rules: [
          {
            id: 'form-field-group',
            enabled: true
          }
        ]
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    // Component specific arg types
  }
}
```

### Testing Guidelines

#### 1. Interaction Testing
Each composite component should include comprehensive interaction tests:

```typescript
export const WithInteractions: Story = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)
    
    // Test form group interactions
    await step('Fill form fields', async () => {
      await userEvent.type(canvas.getByLabelText(/email/i), 'test@example.com')
    })

    // Test validation feedback
    await step('Submit form', async () => {
      await userEvent.click(canvas.getByRole('button', { name: /submit/i }))
    })
  }
}
```

#### 2. Accessibility Testing
Enable real-time accessibility testing:

```typescript
parameters: {
  a11y: {
    config: {
      rules: [
        { id: 'form-field-group', enabled: true },
        { id: 'label', enabled: true },
        { id: 'aria-required-children', enabled: true }
      ]
    },
    options: {
      runOnly: {
        type: 'tag',
        values: ['wcag2a', 'wcag2aa']
      }
    }
  }
}
```

#### 3. Visual Testing
Configure visual regression testing:

```typescript
parameters: {
  chromatic: {
    viewports: [375, 768, 1024],
    diffThreshold: 0.2
  }
}
```

### Component-Specific Guidelines

#### FormContext
- Test state management
- Validate form submission flows
- Test error handling
- Verify context propagation

#### FormGroup
- Test field validation
- Verify error state display
- Test help text visibility
- Validate accessibility markup

#### FormStepper
- Test navigation between steps
- Verify state persistence
- Test validation per step
- Validate progress indication

#### FormSection
- Test collapsible behavior
- Verify section state management
- Test nested sections
- Validate section headers

#### FormGrid
- Test responsive layouts
- Verify grid alignment
- Test spacing consistency
- Validate mobile layouts

#### FormButton
- Test loading states
- Verify disabled states
- Test click handlers
- Validate keyboard navigation

#### FormActions
- Test button alignment
- Verify spacing consistency
- Test mobile responsiveness
- Validate button order

### Performance Monitoring

```typescript
parameters: {
  performance: {
    maxDuration: 300,
    measurements: ['fp', 'fcp', 'lcp']
  }
}
```

### Coverage Requirements
- Unit Tests: >90%
- Integration Tests: >80%
- Accessibility Tests: 100%
- Visual Regression: All viewports
- Performance Metrics: Within thresholds

### Best Practices Checklist
- [ ] Component has comprehensive stories
- [ ] Interaction tests implemented
- [ ] Accessibility tests configured
- [ ] Visual tests set up
- [ ] Performance monitoring enabled
- [ ] Documentation complete
- [ ] Props documented
- [ ] Examples provided
- [ ] Edge cases covered
- [ ] Mobile responsiveness tested 
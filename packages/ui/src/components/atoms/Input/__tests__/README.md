# Input Component Test Plan

## Basic Rendering Tests
```typescript
describe('Input Component - Basic Rendering', () => {
  test('renders without crashing')
  test('renders with default type="text"')
  test('renders with correct displayName')
  test('applies default className')
  test('forwards ref correctly')
  test('renders with custom className')
  test('renders with data-cy attribute')
})
```

## Label Tests
```typescript
describe('Input Component - Label', () => {
  test('renders without label when not provided')
  test('renders label when provided')
  test('renders required asterisk when required=true')
  test('applies correct styling to label')
  test('links label to input via htmlFor')
  test('renders label with dark mode styles')
  test('renders disabled label with correct opacity')
})
```

## Input Types Tests
```typescript
describe('Input Component - Input Types', () => {
  test('renders text input correctly')
  test('renders email input correctly')
  test('renders password input correctly')
  test('renders tel input correctly')
  test('renders number input correctly')
  test('renders textarea correctly')
  test('handles type changes correctly')
})
```

## Form Integration Tests
```typescript
describe('Input Component - Form Integration', () => {
  test('integrates with react-hook-form')
  test('handles form submission correctly')
  test('validates required fields')
  test('displays error messages from form validation')
  test('updates form values correctly')
  test('handles form reset correctly')
  test('maintains field state during form lifecycle')
})
```

## Value Management Tests
```typescript
describe('Input Component - Value Management', () => {
  test('handles initial values correctly')
  test('updates value on change')
  test('handles empty values')
  test('handles null/undefined values')
  test('triggers onChange callback')
  test('triggers onBlur callback')
  test('maintains cursor position during updates')
})
```

## Mask Input Tests
```typescript
describe('Input Component - Mask Input', () => {
  test('applies string mask correctly')
  test('applies RegExp mask correctly')
  test('handles custom mask definitions')
  test('processes prepare function')
  test('processes commit function')
  test('handles number formatting with scale')
  test('handles signed numbers')
  test('applies thousand separator')
  test('handles decimal padding')
  test('normalizes zeros correctly')
  test('uses custom radix point')
  test('maintains mask during value updates')
})
```

## Character Count Tests
```typescript
describe('Input Component - Character Count', () => {
  test('shows character count when showCount=true')
  test('updates character count on input')
  test('shows maxLength limit when provided')
  test('enforces maxLength restriction')
  test('handles character count with mask input')
  test('positions counter correctly in layout')
})
```

## TextArea Specific Tests
```typescript
describe('Input Component - TextArea', () => {
  test('renders with correct number of initial rows')
  test('auto-resizes based on content')
  test('respects minRows constraint')
  test('respects maxRows constraint')
  test('handles line breaks correctly')
  test('maintains scroll position during resize')
})
```

## Prefix/Suffix Tests
```typescript
describe('Input Component - Prefix/Suffix', () => {
  test('renders prefix correctly')
  test('renders suffix correctly')
  test('applies correct styling with prefix')
  test('applies correct styling with suffix')
  test('handles React nodes as prefix/suffix')
  test('maintains layout with long prefix/suffix')
})
```

## Debounce Tests
```typescript
describe('Input Component - Debounce', () => {
  test('debounces onChange when debounceMs > 0')
  test('calls onChange immediately when debounceMs = 0')
  test('cancels debounce on unmount')
  test('maintains value consistency during debounce')
  test('handles rapid value changes')
})
```

## Accessibility Tests
```typescript
describe('Input Component - Accessibility', () => {
  test('sets aria-invalid on error')
  test('sets aria-describedby with error message')
  test('maintains focus management')
  test('handles keyboard navigation')
  test('provides error feedback to screen readers')
  test('has sufficient color contrast')
  test('preserves functionality with keyboard only')
})
```

## Style Tests
```typescript
describe('Input Component - Styling', () => {
  test('applies base styles correctly')
  test('applies error styles')
  test('applies disabled styles')
  test('applies dark mode styles')
  test('handles custom className overrides')
  test('applies focus styles')
  test('maintains style consistency with mask input')
})
```

## Error Handling Tests
```typescript
describe('Input Component - Error Handling', () => {
  test('displays error message correctly')
  test('styles input on error')
  test('handles multiple errors')
  test('clears errors appropriately')
  test('positions error message correctly')
  test('maintains layout stability when error appears/disappears')
})
```

## Edge Cases Tests
```typescript
describe('Input Component - Edge Cases', () => {
  test('handles extremely long input values')
  test('handles rapid input changes')
  test('handles concurrent mask and validation')
  test('performs under heavy re-rendering')
  test('handles browser auto-fill')
  test('manages memory during rapid mount/unmount')
})
```

## Implementation Example

Here's an example of how to implement one of these test cases:

```typescript
import { render, screen, fireEvent } from '@testing-library/react'
import { Input } from '../Input'
import { useForm, FormProvider } from 'react-hook-form'

describe('Input Component - Basic Rendering', () => {
  const defaultProps = {
    name: 'test-input',
    control: useForm().control,
  }

  test('renders without crashing', () => {
    render(<Input {...defaultProps} />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  test('renders with default type="text"', () => {
    render(<Input {...defaultProps} />)
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'text')
  })
})
```

## Test Coverage Goals

- Line Coverage: 100%
- Branch Coverage: 100%
- Function Coverage: 100%
- Statement Coverage: 100%

## Running Tests

```bash
# Run all tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run tests in watch mode
npm test -- --watch

# Run specific test file
npm test -- Input.test.tsx
```

## Best Practices

1. Use meaningful test descriptions
2. Test one thing per test
3. Use appropriate matchers
4. Mock external dependencies
5. Clean up after each test
6. Use realistic test data
7. Test both success and failure cases
8. Maintain test isolation 
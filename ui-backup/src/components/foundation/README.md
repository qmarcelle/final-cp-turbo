# Foundation Components Recommendations

## Input Component

### Current Strengths
- ✅ Clean base and controlled input implementations
- ✅ Strong integration with React Hook Form
- ✅ Comprehensive state handling (default, error, disabled)
- ✅ Proper accessibility attributes
- ✅ Flexible styling with Tailwind
- ✅ Dark mode support
- ✅ Type-safe form control integration
- ✅ Zod schema validation support

### Recommended Improvements
- [ ] Add input masking support
- [ ] Add character counter
- [ ] Add clear button option
- [ ] Add copy-to-clipboard option
- [ ] Add password strength indicator
- [ ] Add input addons (prefix/suffix)
- [ ] Add input size variants
- [ ] Add input validation icons
- [ ] Add input loading state
- [ ] Add input debounce option

### Test Coverage
- ✅ Basic input functionality
- ✅ Controlled input behavior
- ✅ Form validation integration
- ✅ Input group rendering

### Test Improvements
- [ ] Add tests for input masking
- [ ] Add tests for character limits
- [ ] Add tests for clipboard operations
- [ ] Add tests for password strength
- [ ] Add tests for input addons
- [ ] Add tests for debounced input
- [ ] Add tests for accessibility
- [ ] Add tests for keyboard navigation

### Accessibility Improvements
- [ ] Add ARIA labels for input states
- [ ] Add screen reader announcements for validation
- [ ] Add keyboard navigation support
- [ ] Add high contrast mode support
- [ ] Add focus trap for complex inputs
- [ ] Add live region for dynamic content

### Performance Considerations
- [ ] Implement input debouncing
- [ ] Optimize validation performance
- [ ] Memoize complex input transformations
- [ ] Lazy load input addons
- [ ] Add input event throttling
- [ ] Optimize re-renders

### Type System & Form Integration

#### ControlledInput Component
The `ControlledInput` component provides type-safe form integration:

```typescript
// Type Definitions
interface ControlledInputProps<T extends FieldValues = FieldValues> {
  name: Path<T>                 // Type-safe field path
  control: Control<T>           // Form control with correct type
  validation?: Omit<           // Type-safe validation rules
    RegisterOptions<T>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs'
  >
  schema?: z.ZodType<unknown>   // Optional Zod schema
}

// Usage Example
type LoginForm = {
  email: string
  password: string
}

function LoginForm() {
  const { control } = useForm<LoginForm>()
  
  return (
    <ControlledInput<LoginForm>
      name="email"              // Type-checked against LoginForm
      control={control}         // Properly typed control
      validation={{            // Type-safe validation
        required: 'Required'
      }}
      schema={z.string().email()}
    />
  )
}
```

#### Key Features
- 🔒 Type-safe field paths using `Path<T>`
- 📝 Generic type parameter for form data shape
- 🎯 Proper type inference with React Hook Form
- ✨ Integration with Zod schema validation
- 🚦 Type-safe validation rules
- 🔄 Automatic error handling and display

#### Implementation Notes
- Uses `useController` from React Hook Form for form state management
- Combines refs properly for external ref handling
- Handles both sync and async validation
- Supports custom validation through Zod schemas
- Preserves all base Input component features

## Select Component

### Current Strengths
- ✅ Clean base and controlled select implementations
- ✅ Strong integration with React Hook Form
- ✅ Proper option type definitions
- ✅ Custom dropdown indicator
- ✅ Comprehensive state handling
- ✅ Dark mode support

### Recommended Improvements
- [ ] Add multi-select support
- [ ] Add option groups
- [ ] Add search/filter functionality
- [ ] Add custom option rendering
- [ ] Add async option loading
- [ ] Add virtualization for large lists
- [ ] Add keyboard type-to-select
- [ ] Add option descriptions
- [ ] Add option icons/images
- [ ] Add loading states

### Test Coverage Needed
- [ ] Add tests for option selection
- [ ] Add tests for disabled states
- [ ] Add tests for keyboard navigation
- [ ] Add tests for form integration
- [ ] Add tests for custom rendering
- [ ] Add tests for async loading
- [ ] Add tests for virtualization
- [ ] Add tests for accessibility

### Accessibility Improvements
- [ ] Add ARIA labels for select states
- [ ] Add screen reader support for options
- [ ] Add keyboard navigation patterns
- [ ] Add live region for async updates
- [ ] Add focus management
- [ ] Add ARIA role descriptions

### Performance Considerations
- [ ] Implement option virtualization
- [ ] Optimize option rendering
- [ ] Add option caching
- [ ] Optimize async loading
- [ ] Implement search debouncing
- [ ] Optimize re-renders

## DatePicker Component

### Current Strengths
- ✅ Comprehensive date selection functionality
- ✅ Support for date ranges
- ✅ Time selection capability
- ✅ Min/max date constraints
- ✅ Form integration with React Hook Form
- ✅ Keyboard navigation support
- ✅ Dark mode support
- ✅ Accessible popover implementation

### Recommended Improvements
- [ ] Add date presets (Today, Yesterday, Last Week, etc.)
- [ ] Add multiple calendar views
- [ ] Add year and month quick selection
- [ ] Add custom date formats
- [ ] Add timezone support
- [ ] Add date comparison mode
- [ ] Add date highlighting (holidays, events)
- [ ] Add date disabling (weekends, specific dates)
- [ ] Add relative date selection
- [ ] Add drag selection for ranges

### Test Coverage Needed
- [ ] Add tests for date selection
- [ ] Add tests for range selection
- [ ] Add tests for time selection
- [ ] Add tests for keyboard navigation
- [ ] Add tests for min/max constraints
- [ ] Add tests for form integration
- [ ] Add tests for date formatting
- [ ] Add tests for accessibility
- [ ] Add tests for timezone handling
- [ ] Add tests for date constraints

### Accessibility Improvements
- [ ] Add ARIA labels for calendar navigation
- [ ] Add screen reader announcements for selection
- [ ] Add keyboard shortcuts for date navigation
- [ ] Add focus management for calendar cells
- [ ] Add live region for date updates
- [ ] Add role descriptions for calendar parts

### Performance Considerations
- [ ] Optimize calendar generation
- [ ] Implement date memoization
- [ ] Optimize range calculations
- [ ] Add date caching
- [ ] Optimize re-renders
- [ ] Implement lazy loading for distant dates

## NumberInput Component

### Current Strengths
- ✅ Comprehensive number handling with precision control
- ✅ Support for min/max constraints
- ✅ Step increment/decrement controls
- ✅ Keyboard navigation (arrow keys)
- ✅ Number formatting with Intl.NumberFormat
- ✅ Form integration with React Hook Form
- ✅ Support for negative numbers toggle
- ✅ Dark mode support

### Recommended Improvements
- [ ] Add unit display (currency, percentage, etc.)
- [ ] Add thousands separators toggle
- [ ] Add scientific notation support
- [ ] Add custom increment/decrement steps
- [ ] Add value rounding modes
- [ ] Add input size variants
- [ ] Add prefix/suffix support
- [ ] Add number range slider
- [ ] Add custom format patterns
- [ ] Add number validation rules

### Test Coverage Needed
- [ ] Add tests for number formatting
- [ ] Add tests for keyboard controls
- [ ] Add tests for min/max constraints
- [ ] Add tests for step increments
- [ ] Add tests for precision handling
- [ ] Add tests for negative numbers
- [ ] Add tests for form integration
- [ ] Add tests for accessibility
- [ ] Add tests for custom formats
- [ ] Add tests for validation rules

### Accessibility Improvements
- [ ] Add ARIA labels for controls
- [ ] Add screen reader number announcements
- [ ] Add keyboard shortcuts
- [ ] Add focus management
- [ ] Add live region for updates
- [ ] Add role descriptions

### Performance Considerations
- [ ] Optimize number formatting
- [ ] Implement input debouncing
- [ ] Memoize format options
- [ ] Optimize validation checks
- [ ] Cache parsed numbers
- [ ] Optimize re-renders

## SearchBar Component

### Current Strengths
- ✅ Comprehensive search functionality
- ✅ Async suggestion loading
- ✅ Keyboard navigation support
- ✅ Category-based suggestions
- ✅ Clear button functionality
- ✅ Loading state handling
- ✅ Form integration with React Hook Form
- ✅ Dark mode support

### Recommended Improvements
- [ ] Add search history
- [ ] Add search filters
- [ ] Add voice search
- [ ] Add search shortcuts
- [ ] Add search analytics
- [ ] Add search highlighting
- [ ] Add search debouncing
- [ ] Add search results preview
- [ ] Add search categories
- [ ] Add recent searches

### Test Coverage Needed
- [ ] Add tests for suggestion loading
- [ ] Add tests for keyboard navigation
- [ ] Add tests for search submission
- [ ] Add tests for clear functionality
- [ ] Add tests for loading states
- [ ] Add tests for form integration
- [ ] Add tests for accessibility
- [ ] Add tests for async operations
- [ ] Add tests for error handling
- [ ] Add tests for category filtering

### Accessibility Improvements
- [ ] Add ARIA labels for search states
- [ ] Add screen reader announcements
- [ ] Add keyboard shortcuts
- [ ] Add focus management
- [ ] Add live region for results
- [ ] Add role descriptions

### Performance Considerations
- [ ] Implement search debouncing
- [ ] Optimize suggestion rendering
- [ ] Cache search results
- [ ] Implement virtual scrolling
- [ ] Optimize async operations
- [ ] Optimize re-renders

## Checkbox Component

### Current Strengths
- ✅ Clean base and controlled checkbox implementations
- ✅ Strong integration with React Hook Form
- ✅ Support for label and description
- ✅ Proper error state handling
- ✅ Accessible focus states
- ✅ Dark mode support
- ✅ Proper forwarded ref handling
- ✅ Comprehensive styling with Tailwind

### Recommended Improvements
- [ ] Add indeterminate state support
- [ ] Add checkbox groups
- [ ] Add custom checkbox icons
- [ ] Add animation support
- [ ] Add size variants
- [ ] Add color variants
- [ ] Add toggle switch variant
- [ ] Add checkbox list with select all
- [ ] Add nested checkboxes
- [ ] Add custom layout options

### Test Coverage Needed
- [ ] Add tests for checkbox states
- [ ] Add tests for form integration
- [ ] Add tests for keyboard interaction
- [ ] Add tests for error states
- [ ] Add tests for accessibility
- [ ] Add tests for indeterminate state
- [ ] Add tests for group behavior
- [ ] Add tests for nested checkboxes
- [ ] Add tests for custom icons
- [ ] Add tests for animations

### Accessibility Improvements
- [ ] Add ARIA labels for states
- [ ] Add screen reader announcements
- [ ] Add keyboard navigation for groups
- [ ] Add focus management
- [ ] Add role descriptions
- [ ] Add state announcements

### Performance Considerations
- [ ] Optimize group state management
- [ ] Implement checkbox memoization
- [ ] Optimize icon rendering
- [ ] Cache checkbox states
- [ ] Optimize re-renders
- [ ] Implement lazy loading for groups

## TextArea Component

### Current Strengths
- ✅ Clean base and controlled textarea implementations
- ✅ Strong integration with React Hook Form
- ✅ Proper error state handling
- ✅ Configurable rows
- ✅ Accessible focus states
- ✅ Dark mode support
- ✅ Proper forwarded ref handling
- ✅ Comprehensive styling with Tailwind
- ✅ Resizable by default

### Recommended Improvements
- [ ] Add auto-resize functionality
- [ ] Add character/word count
- [ ] Add max length indicator
- [ ] Add markdown support
- [ ] Add rich text editing
- [ ] Add placeholder animations
- [ ] Add syntax highlighting
- [ ] Add file paste support
- [ ] Add mention support
- [ ] Add emoji picker

### Test Coverage Needed
- [ ] Add tests for auto-resize
- [ ] Add tests for character counting
- [ ] Add tests for form integration
- [ ] Add tests for keyboard shortcuts
- [ ] Add tests for paste handling
- [ ] Add tests for markdown preview
- [ ] Add tests for rich text features
- [ ] Add tests for accessibility
- [ ] Add tests for error states
- [ ] Add tests for validation rules

### Accessibility Improvements
- [ ] Add ARIA labels for character count
- [ ] Add screen reader announcements
- [ ] Add keyboard shortcuts
- [ ] Add focus management
- [ ] Add live region for updates
- [ ] Add role descriptions

### Performance Considerations
- [ ] Optimize auto-resize calculations
- [ ] Implement content debouncing
- [ ] Optimize markdown parsing
- [ ] Cache rich text state
- [ ] Optimize re-renders
- [ ] Implement lazy loading for features

## TagInput Component

### Current Strengths
- ✅ Clean base and controlled tag input implementations
- ✅ Strong integration with React Hook Form
- ✅ Support for tag suggestions
- ✅ Keyboard navigation support
- ✅ Tag limit functionality
- ✅ Tag removal support
- ✅ Proper error state handling
- ✅ Dark mode support
- ✅ Accessible focus states

### Recommended Improvements
- [ ] Add drag and drop reordering
- [ ] Add tag categories/colors
- [ ] Add tag validation rules
- [ ] Add tag creation rules
- [ ] Add tag templates
- [ ] Add tag autocomplete
- [ ] Add tag groups
- [ ] Add tag search/filter
- [ ] Add tag persistence
- [ ] Add tag analytics

### Test Coverage Needed
- [ ] Add tests for tag addition
- [ ] Add tests for tag removal
- [ ] Add tests for keyboard navigation
- [ ] Add tests for suggestion selection
- [ ] Add tests for max tags limit
- [ ] Add tests for form integration
- [ ] Add tests for accessibility
- [ ] Add tests for validation rules
- [ ] Add tests for tag persistence
- [ ] Add tests for error states

### Accessibility Improvements
- [ ] Add ARIA labels for tags
- [ ] Add screen reader announcements
- [ ] Add keyboard shortcuts
- [ ] Add focus management
- [ ] Add live region for updates
- [ ] Add role descriptions

### Performance Considerations
- [ ] Optimize tag rendering
- [ ] Implement tag virtualization
- [ ] Cache tag suggestions
- [ ] Optimize validation
- [ ] Optimize re-renders
- [ ] Implement lazy loading

## AutoComplete Component

### Current Strengths
- ✅ Clean base and controlled combobox implementations
- ✅ Strong integration with React Hook Form
- ✅ Async option loading support
- ✅ Client-side filtering
- ✅ Loading state handling
- ✅ Disabled option support
- ✅ Keyboard navigation
- ✅ Dark mode support
- ✅ Comprehensive styling with Tailwind
- ✅ Accessible using Headless UI

### Recommended Improvements
- [ ] Add multi-select support
- [ ] Add option grouping
- [ ] Add custom option rendering
- [ ] Add option highlighting
- [ ] Add infinite scrolling
- [ ] Add selection persistence
- [ ] Add clear button
- [ ] Add custom filtering logic
- [ ] Add option creation
- [ ] Add option tooltips

### Test Coverage Needed
- [ ] Add tests for async loading
- [ ] Add tests for keyboard navigation
- [ ] Add tests for option filtering
- [ ] Add tests for form integration
- [ ] Add tests for disabled states
- [ ] Add tests for loading states
- [ ] Add tests for error handling
- [ ] Add tests for accessibility
- [ ] Add tests for custom rendering
- [ ] Add tests for dark mode

### Accessibility Improvements
- [ ] Add ARIA labels for states
- [ ] Add screen reader announcements
- [ ] Add keyboard shortcuts
- [ ] Add focus management
- [ ] Add live region for results
- [ ] Add role descriptions

### Performance Considerations
- [ ] Implement option virtualization
- [ ] Optimize option rendering
- [ ] Add option caching
- [ ] Optimize async loading
- [ ] Implement search debouncing
- [ ] Optimize re-renders

## FileUpload Component

### Current Strengths
- ✅ Comprehensive file upload handling with drag and drop
- ✅ Strong integration with React Hook Form
- ✅ File type validation with accept prop
- ✅ File size validation
- ✅ Multiple file support with maxFiles limit
- ✅ Image preview capability
- ✅ Upload progress indication
- ✅ Error state handling
- ✅ Dark mode support
- ✅ Clean file list UI with size formatting

### Recommended Improvements
- [ ] Add chunked file upload support
- [ ] Add file compression options
- [ ] Add directory upload support
- [ ] Add file sorting capabilities
- [ ] Add file type icons
- [ ] Add upload queue management
- [ ] Add retry mechanism for failed uploads
- [ ] Add upload pause/resume
- [ ] Add file metadata editing
- [ ] Add upload speed indicator

### Test Coverage Needed
- [ ] Add tests for drag and drop
- [ ] Add tests for file validation
- [ ] Add tests for multiple file handling
- [ ] Add tests for progress tracking
- [ ] Add tests for error scenarios
- [ ] Add tests for preview generation
- [ ] Add tests for file removal
- [ ] Add tests for accessibility
- [ ] Add tests for form integration
- [ ] Add tests for dark mode

### Accessibility Improvements
- [ ] Add ARIA labels for drop zone
- [ ] Add screen reader announcements
- [ ] Add keyboard navigation
- [ ] Add focus management
- [ ] Add live region for upload status
- [ ] Add role descriptions

### Performance Considerations
- [ ] Implement chunked uploads
- [ ] Optimize preview generation
- [ ] Add upload queue throttling
- [ ] Implement lazy loading for previews
- [ ] Optimize progress updates
- [ ] Cache file validations

## Radio Component

### Current Strengths
- ✅ Clean base and controlled radio implementations
- ✅ Strong integration with React Hook Form
- ✅ Support for option descriptions
- ✅ Disabled state handling
- ✅ Proper error state handling
- ✅ Accessible using Headless UI
- ✅ Dark mode support
- ✅ Clean option list UI with descriptions
- ✅ Visual feedback for active/checked states
- ✅ Comprehensive styling with Tailwind

### Recommended Improvements
- [ ] Add radio button groups
- [ ] Add custom radio icons
- [ ] Add animation support
- [ ] Add size variants
- [ ] Add color variants
- [ ] Add layout options (horizontal/vertical)
- [ ] Add image support for options
- [ ] Add nested radio options
- [ ] Add option categories
- [ ] Add form section integration

### Test Coverage Needed
- [ ] Add tests for option selection
- [ ] Add tests for disabled states
- [ ] Add tests for keyboard navigation
- [ ] Add tests for form integration
- [ ] Add tests for error states
- [ ] Add tests for group behavior
- [ ] Add tests for accessibility
- [ ] Add tests for dark mode
- [ ] Add tests for custom styling
- [ ] Add tests for descriptions

### Accessibility Improvements
- [ ] Add ARIA labels for options
- [ ] Add screen reader announcements
- [ ] Add keyboard navigation patterns
- [ ] Add focus management
- [ ] Add live region for updates
- [ ] Add role descriptions

### Performance Considerations
- [ ] Optimize option rendering
- [ ] Implement radio memoization
- [ ] Cache option states
- [ ] Optimize group management
- [ ] Optimize re-renders
- [ ] Implement lazy loading for nested options

## InputGroup Component

### Current Strengths
- ✅ Clean base and controlled input group implementations
- ✅ Strong integration with React Hook Form
- ✅ Support for prefix and suffix elements
- ✅ Unit display support
- ✅ Proper error state handling
- ✅ Flexible input type support
- ✅ Dark mode support
- ✅ Clean UI with consistent spacing
- ✅ Proper forwarded ref handling
- ✅ Comprehensive styling with Tailwind

### Recommended Improvements
- [ ] Add input group sizes
- [ ] Add input group variants
- [ ] Add input group validation states
- [ ] Add input group icons
- [ ] Add input group buttons
- [ ] Add input group dropdowns
- [ ] Add input group tooltips
- [ ] Add input group copy button
- [ ] Add input group clear button
- [ ] Add input group loading state

### Test Coverage Needed
- [ ] Add tests for prefix/suffix rendering
- [ ] Add tests for unit display
- [ ] Add tests for input types
- [ ] Add tests for form integration
- [ ] Add tests for error states
- [ ] Add tests for keyboard interaction
- [ ] Add tests for accessibility
- [ ] Add tests for dark mode
- [ ] Add tests for ref forwarding
- [ ] Add tests for custom styling

### Accessibility Improvements
- [ ] Add ARIA labels for addons
- [ ] Add screen reader announcements
- [ ] Add keyboard navigation
- [ ] Add focus management
- [ ] Add live region for updates
- [ ] Add role descriptions

### Performance Considerations
- [ ] Optimize addon rendering
- [ ] Implement input group memoization
- [ ] Cache input states
- [ ] Optimize validation
- [ ] Optimize re-renders
- [ ] Implement lazy loading for complex addons

# Foundation Components Documentation

## Storybook 8.5.x Integration Guide

### Component Documentation Structure
Each foundation component should follow this documentation structure in Storybook:

```typescript
// [ComponentName].stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { [ComponentName] } from './[ComponentName]'

const meta: Meta<typeof [ComponentName]> = {
  title: 'Foundation/[ComponentName]',
  component: [ComponentName],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Foundation component description'
      }
    },
    a11y: {
      config: {
        rules: [
          {
            id: 'interactive-element',
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
Each foundation component should include comprehensive interaction tests:

```typescript
export const WithInteractions: Story = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)
    
    // Test component states
    await step('Test default state', async () => {
      const element = canvas.getByRole('button')
      await expect(element).toBeEnabled()
    })

    // Test user interactions
    await step('Test click behavior', async () => {
      await userEvent.click(canvas.getByRole('button'))
      // Verify state changes
    })
  }
}
```

#### 2. Accessibility Testing
Enable real-time accessibility testing with specific rules for foundation components:

```typescript
parameters: {
  a11y: {
    config: {
      rules: [
        { id: 'button-name', enabled: true },
        { id: 'color-contrast', enabled: true },
        { id: 'label', enabled: true },
        { id: 'focusable-content', enabled: true }
      ]
    },
    options: {
      runOnly: {
        type: 'tag',
        values: ['wcag2a', 'wcag2aa', 'wcag21a']
      }
    }
  }
}
```

#### 3. Visual Testing
Configure visual regression testing for foundation components:

```typescript
parameters: {
  chromatic: {
    viewports: [375, 768, 1024, 1440],
    diffThreshold: 0.1,
    modes: {
      dark: {
        className: 'dark'
      }
    }
  }
}
```

### Component-Specific Testing Requirements

#### Input Components (Input, NumberInput, TextArea)
- Test value changes
- Validate input masking
- Test form integration
- Verify error states
- Test keyboard interaction
- Validate focus management

#### Selection Components (Select, AutoComplete, Radio, Checkbox)
- Test option selection
- Verify multi-select behavior
- Test keyboard navigation
- Validate option groups
- Test disabled states
- Verify selected state persistence

#### Complex Components (DatePicker, FileUpload, TagInput)
- Test data entry
- Verify validation rules
- Test async operations
- Validate preview functionality
- Test drag-and-drop
- Verify error handling

#### Layout Components (InputGroup, Button)
- Test responsive behavior
- Verify spacing consistency
- Test alignment options
- Validate icon integration
- Test loading states
- Verify tooltip behavior

### Performance Testing

```typescript
parameters: {
  performance: {
    maxDuration: 200, // Stricter for foundation components
    measurements: ['fp', 'fcp', 'lcp', 'cls'],
    budget: {
      fp: 500,
      fcp: 1000,
      lcp: 2500
    }
  }
}
```

### Coverage Requirements
- Unit Tests: >95%
- Integration Tests: >90%
- Accessibility Tests: 100%
- Visual Regression: All viewports + dark mode
- Performance Metrics: Within strict thresholds

### Best Practices Checklist
- [ ] Component has comprehensive stories
- [ ] All states documented (default, hover, focus, active, disabled)
- [ ] Dark mode support tested
- [ ] Mobile responsiveness verified
- [ ] Keyboard navigation implemented
- [ ] Screen reader compatibility tested
- [ ] Performance benchmarks established
- [ ] Props fully documented
- [ ] Controlled and uncontrolled versions tested
- [ ] Form integration verified

### Story Templates

#### Basic Component Story
```typescript
export const Default: Story = {
  args: {
    // Default props
  }
}

export const WithError: Story = {
  args: {
    error: 'Error message'
  }
}

export const Disabled: Story = {
  args: {
    disabled: true
  }
}

export const Loading: Story = {
  args: {
    loading: true
  }
}

export const WithCustomStyles: Story = {
  args: {
    className: 'custom-styles'
  }
}
```

#### Interactive Story Template
```typescript
export const Interactive: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    
    // Interaction steps
    await userEvent.type(canvas.getByRole('textbox'), 'Test input')
    await userEvent.tab()
    await expect(canvas.getByRole('textbox')).toHaveFocus()
  }
}
```

Would you like me to continue reviewing other foundation components? 
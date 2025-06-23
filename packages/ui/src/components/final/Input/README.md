# Input Component

A versatile input component that supports various types of input fields including text, password, email, number, search, tel, url, and textarea.

## Features

- Multiple input types (text, password, email, number, search, tel, url, textarea)
- Different sizes (sm, md, lg)
- Various states (default, error, success, disabled)
- Icon support (left and right icons)
- Character count
- Debounced input
- Input masking
- Accessibility support
- Customizable styling
- Form integration
- TypeScript support

## Usage

```tsx
import { Input } from './Input';

// Basic usage
<Input placeholder="Enter text..." />

// With type and size
<Input type="email" inputSize="lg" placeholder="Enter email..." />

// With icons
<Input
  leftIcon={<Icon />}
  rightIcon={<Icon />}
  placeholder="Search..."
/>

// With error state
<Input error placeholder="Invalid input" />

// As textarea
<Input type="textarea" rows={4} placeholder="Enter description..." />

// With character count
<Input showCount maxLength={100} placeholder="Limited input..." />

// With debounce
<Input debounceMs={300} placeholder="Debounced input..." />

// With mask
<Input
  mask={{
    mask: '(000) 000-0000'
  }}
  placeholder="Phone number..."
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| type | 'text' \| 'password' \| 'email' \| 'number' \| 'search' \| 'tel' \| 'url' \| 'textarea' | 'text' | Type of input |
| variant | 'default' \| 'error' \| 'success' | 'default' | Visual style variant |
| inputSize | 'sm' \| 'md' \| 'lg' | 'md' | Size of the input |
| leftIcon | ReactNode | - | Icon to display on the left |
| rightIcon | ReactNode | - | Icon to display on the right |
| error | boolean | false | Error state |
| success | boolean | false | Success state |
| rows | number | 4 | Number of rows for textarea |
| resize | boolean | true | Whether textarea can be resized |
| showCount | boolean | false | Whether to show character count |
| maxLength | number | - | Maximum length of input |
| debounceMs | number | - | Debounce delay in milliseconds |
| mask | { mask: string \| RegExp } | - | Input mask configuration |

## Accessibility

- Supports all ARIA attributes
- Proper focus management
- Keyboard navigation
- Screen reader friendly
- No accessibility violations (tested with jest-axe)

## Testing

The component includes comprehensive tests covering:
- Basic rendering
- Different variants and sizes
- Input types
- State management
- Event handling
- Icon rendering
- Accessibility
- Ref forwarding
- Class merging
- Form integration
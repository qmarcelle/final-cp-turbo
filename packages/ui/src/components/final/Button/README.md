# Button Component

A versatile button component that supports multiple variants, sizes, and states. It can be rendered as either a button or a link.

## Features

- Multiple variants (primary, secondary, success, warning, error, outline, ghost, destructive, default, link)
- Different sizes (sm, default, md, lg)
- Support for icons (left, right, or icon-only)
- Loading state with custom loading text
- Full width option
- Accessibility support
- Keyboard navigation
- Form submission support
- Custom styling through className

## Usage

```tsx
import { Button } from './Button';

// Basic usage
<Button>Click me</Button>

// With variant and size
<Button variant="primary" size="lg">Large Primary Button</Button>

// As a link
<Button href="/some-path">Navigate</Button>

// With icons
<Button leftIcon={<Icon />}>With Icon</Button>

// Loading state
<Button loading loadingText="Processing...">Submit</Button>

// Full width
<Button fullWidth>Full Width Button</Button>

// Custom styling
<Button className="custom-class">Custom Styled Button</Button>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | 'primary' \| 'secondary' \| 'success' \| 'warning' \| 'error' \| 'outline' \| 'ghost' \| 'destructive' \| 'default' \| 'link' | 'primary' | The visual style of the button |
| size | 'sm' \| 'default' \| 'md' \| 'lg' | 'default' | The size of the button |
| disabled | boolean | false | Whether the button is disabled |
| href | string | undefined | URL to navigate to when clicked (renders as link) |
| loading | boolean | false | Loading state |
| loadingText | string | undefined | Text to show while loading |
| leftIcon | ReactNode | undefined | Icon to show before the button text |
| rightIcon | ReactNode | undefined | Icon to show after the button text |
| icon | ReactNode | undefined | Single icon (alternative to leftIcon/rightIcon) |
| iconOnly | boolean | false | Whether this is an icon-only button |
| tooltip | string | undefined | Tooltip text |
| badge | string \| number | undefined | Badge content |
| active | boolean | false | Whether the button is in an active state |
| target | string | undefined | Target for link buttons |
| fullWidth | boolean | false | Whether the button should take full width |
| type | 'submit' \| 'reset' \| 'button' | 'button' | Button type |
| className | string | undefined | Additional CSS class names |

## Accessibility

The Button component follows accessibility best practices:

- Uses semantic HTML button element
- Supports keyboard navigation
- Includes proper ARIA attributes
- Maintains focus states
- Handles disabled states correctly

## Testing

The component includes comprehensive tests covering:

- Rendering with different variants and sizes
- Click event handling
- Disabled state behavior
- Custom class application
- Accessibility requirements
- Keyboard navigation
- Ref forwarding

## Notes

- When using as a link, prefer the `href` prop over the deprecated `url` prop
- For icon-only buttons, consider adding a tooltip for better accessibility
- The component automatically handles proper button vs link rendering based on props
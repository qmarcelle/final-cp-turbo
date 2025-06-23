# Form Grid Component

A flexible and responsive grid layout component designed for organizing form fields and content in a structured grid system.

## Features

- Multiple column configurations (1-12 columns)
- Responsive breakpoints
- Customizable gap spacing
- Semantic markup
- Accessibility support
- Easy integration with form components
- TypeScript support

## Usage

```tsx
import { FormGrid } from './FormGrid';
import { FormGroup } from '../FormGroup';
import { Input } from '../Input';

// Basic two-column layout
<FormGrid columns={2} gap={6}>
  <FormGroup name="firstName" label="First Name">
    <Input placeholder="Enter first name" />
  </FormGroup>
  <FormGroup name="lastName" label="Last Name">
    <Input placeholder="Enter last name" />
  </FormGroup>
</FormGrid>

// Three-column layout with custom gap
<FormGrid columns={3} gap={8}>
  <FormGroup name="street" label="Street">
    <Input placeholder="Enter street" />
  </FormGroup>
  <FormGroup name="city" label="City">
    <Input placeholder="Enter city" />
  </FormGroup>
  <FormGroup name="state" label="State">
    <Input placeholder="Enter state" />
  </FormGroup>
</FormGrid>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | ReactNode | - | Grid content |
| columns | 1 \| 2 \| 3 \| 4 \| 6 \| 12 | 1 | Number of grid columns |
| gap | 2 \| 4 \| 6 \| 8 \| 12 \| 16 | 6 | Gap size between grid items |
| className | string | - | Additional CSS classes |
| data-cy | string | - | Cypress test attribute |

## Column Configurations

The grid system uses responsive breakpoints:

- 1 column: Single column at all breakpoints
- 2 columns: 1 column on mobile, 2 columns on tablet and up
- 3 columns: 1 column on mobile, 2 columns on tablet, 3 columns on desktop
- 4 columns: 1 column on mobile, 2 columns on tablet, 4 columns on desktop
- 6 columns: 1 column on mobile, 2 columns on tablet, 6 columns on desktop
- 12 columns: 1 column on mobile, 3 columns on tablet, 12 columns on desktop

## Gap Sizes

Available gap sizes in pixels (using Tailwind's spacing scale):

- 2: 0.5rem (8px)
- 4: 1rem (16px)
- 6: 1.5rem (24px)
- 8: 2rem (32px)
- 12: 3rem (48px)
- 16: 4rem (64px)

## Best Practices

1. Choose appropriate columns:
   - Use 1-2 columns for mobile-first designs
   - Use 3-4 columns for forms with many fields
   - Use 6-12 columns for complex layouts

2. Consider field sizes:
   - Group related fields together
   - Align labels and inputs consistently
   - Use full width for important fields

3. Responsive design:
   - Test layouts at all breakpoints
   - Ensure readability on mobile
   - Maintain proper spacing

4. Accessibility:
   - Maintain logical tab order
   - Group related fields semantically
   - Test with screen readers

## Examples

### Contact Form

```tsx
<FormGrid columns={2} gap={6}>
  <FormGroup name="firstName" label="First Name">
    <Input required />
  </FormGroup>
  <FormGroup name="lastName" label="Last Name">
    <Input required />
  </FormGroup>
  <FormGroup name="email" label="Email" className="col-span-2">
    <Input type="email" required />
  </FormGroup>
  <FormGroup name="phone" label="Phone">
    <Input type="tel" />
  </FormGroup>
  <FormGroup name="company" label="Company">
    <Input />
  </FormGroup>
</FormGrid>
```

### Address Form

```tsx
<FormGrid columns={3} gap={4}>
  <FormGroup name="street" label="Street" className="col-span-3">
    <Input required />
  </FormGroup>
  <FormGroup name="city" label="City">
    <Input required />
  </FormGroup>
  <FormGroup name="state" label="State">
    <Input required />
  </FormGroup>
  <FormGroup name="zipCode" label="ZIP Code">
    <Input required />
  </FormGroup>
</FormGrid>
```

### Custom Styling

```tsx
<FormGrid
  columns={2}
  gap={8}
  className="bg-gray-50 p-6 rounded-lg shadow-sm"
>
  {/* Grid content */}
</FormGrid>
```
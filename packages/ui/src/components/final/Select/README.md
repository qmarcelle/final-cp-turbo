# Select Component

A customizable select component that supports single selection with form integration and validation.

## Features

- Form integration with React Hook Form
- Comprehensive validation support
- Error state handling
- Disabled options support
- Custom styling capabilities
- Accessibility compliant
- Focus and hover states
- Placeholder support
- Required field indication
- Custom class support
- Data-cy attribute for testing

## Usage

```tsx
import { Select } from './Select';
import { useForm } from 'react-hook-form';

function CountrySelector() {
  const { control } = useForm();
  
  const countries = [
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
    { value: 'mx', label: 'Mexico' },
  ];

  return (
    <Select
      name="country"
      control={control}
      label="Select Country"
      options={countries}
      required
      rules={{ required: 'Please select a country' }}
    />
  );
}
```

## Props

| Prop | Type | Description |
|------|------|-------------|
| name | string | Field name for form integration |
| control | Control | React Hook Form control object |
| label | string | Optional label text |
| options | Array<{value: string, label: string}> | Array of options |
| required | boolean | Whether the field is required |
| disabled | boolean | Whether the select is disabled |
| placeholder | string | Placeholder text |
| className | string | Additional CSS classes |
| data-cy | string | Cypress test attribute |
| rules | object | React Hook Form validation rules |

## Accessibility

- Uses semantic `<select>` element
- Proper label association with `htmlFor`
- Required field indication
- Error message association with `aria-describedby`
- Disabled state handling
- Focus management
- Screen reader support

## Testing

The component includes comprehensive tests covering:
- Basic rendering
- Label rendering
- Placeholder functionality
- Options rendering
- Disabled state
- Required field indication
- Custom class application
- Value changes
- Form validation
- Error message display

## Best Practices

1. Always provide meaningful labels
2. Use clear and concise placeholder text
3. Include validation rules for required fields
4. Handle error states appropriately
5. Consider mobile usability
6. Test thoroughly with screen readers
7. Maintain consistent styling with design system
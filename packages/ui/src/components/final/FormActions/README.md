# Form Actions Component

A flexible container component for form action buttons that handles different alignment patterns and spacing.

## Features

- Multiple alignment options
- Consistent button spacing
- Responsive layout
- Customizable styling
- Integration with Button component
- Accessibility support
- TypeScript support

## Usage

```tsx
import { FormActions } from './FormActions';
import { Button } from '../Button';

function MyForm() {
  return (
    <form>
      {/* form fields */}
      <FormActions align="right">
        <Button variant="secondary">Cancel</Button>
        <Button variant="primary">Submit</Button>
      </FormActions>
    </form>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| align | 'left' \| 'center' \| 'right' \| 'between' | 'right' | Button alignment |
| children | ReactNode | - | Action buttons |
| className | string | - | Additional CSS classes |
| data-cy | string | - | Cypress test attribute |

## Alignment Options

- **left**: Aligns buttons to the left
- **center**: Centers buttons horizontally
- **right**: Aligns buttons to the right (default)
- **between**: Distributes buttons with equal space between

## Best Practices

1. Button Order
   - Place primary action on the right
   - Place secondary/cancel action on the left
   - Keep consistent order across forms

2. Button Spacing
   - Maintain consistent gap between buttons
   - Use appropriate spacing for button size
   - Consider mobile responsiveness

3. Visual Hierarchy
   - Use variant prop to distinguish actions
   - Primary action should be prominent
   - Consider disabled states

4. Accessibility
   - Use semantic button elements
   - Maintain tab order
   - Provide clear button labels

## Examples

### Standard Form Actions

```tsx
<FormActions>
  <Button variant="secondary">Cancel</Button>
  <Button variant="primary">Submit</Button>
</FormActions>
```

### Multi-Step Form

```tsx
<FormActions align="between">
  <Button variant="secondary">Previous</Button>
  <Button variant="primary">Next</Button>
</FormActions>
```

### Centered Actions

```tsx
<FormActions align="center">
  <Button variant="secondary">Reset</Button>
  <Button variant="primary">Save</Button>
</FormActions>
```

### Multiple Actions

```tsx
<FormActions>
  <Button variant="secondary">Cancel</Button>
  <Button variant="secondary">Save Draft</Button>
  <Button variant="primary">Submit</Button>
</FormActions>
```

### Custom Styling

```tsx
<FormActions className="bg-gray-50 p-4 rounded-lg">
  <Button variant="secondary">Cancel</Button>
  <Button variant="primary">Submit</Button>
</FormActions>
```

## Integration with Forms

The component works well with various form libraries:

### React Hook Form

```tsx
import { useForm } from 'react-hook-form';

function MyForm() {
  const { handleSubmit } = useForm();

  const onSubmit = (data) => {
    // Handle form submission
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* form fields */}
      <FormActions>
        <Button type="button" variant="secondary">
          Cancel
        </Button>
        <Button type="submit" variant="primary">
          Submit
        </Button>
      </FormActions>
    </form>
  );
}
```

### With Loading State

```tsx
function MyForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <form>
      {/* form fields */}
      <FormActions>
        <Button
          type="button"
          variant="secondary"
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
          loading={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </Button>
      </FormActions>
    </form>
  );
}
```

## Styling

The component uses Tailwind CSS for styling:

```tsx
// Default styling
<FormActions>
  {/* buttons */}
</FormActions>

// Custom background and padding
<FormActions className="bg-gray-50 p-4 rounded-lg">
  {/* buttons */}
</FormActions>

// Full width on mobile
<FormActions className="w-full flex-col sm:flex-row">
  {/* buttons */}
</FormActions>
```
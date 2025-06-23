# Form Column Component

A layout component that arranges form fields in a single column with consistent spacing and styling.

## Features

- Single column layout
- Consistent vertical spacing
- Customizable gap sizes
- Form field integration
- Responsive design
- Accessibility support
- TypeScript support

## Usage

```tsx
import { FormColumn } from './FormColumn';
import { Input } from '../Input';
import { useForm } from 'react-hook-form';

function PersonalInfoForm() {
  const { control } = useForm();
  
  return (
    <FormColumn>
      <Input
        name="firstName"
        label="First Name"
        control={control}
        required
      />
      <Input
        name="lastName"
        label="Last Name"
        control={control}
        required
      />
      <Input
        name="email"
        label="Email"
        type="email"
        control={control}
        required
      />
    </FormColumn>
  );
}
```

## Props

| Prop | Type | Description |
|------|------|-------------|
| children | ReactNode | Form fields or other content |
| className | string | Additional CSS classes |
| data-cy | string | Cypress test attribute |

## Best Practices

1. Form Field Organization
   - Group related fields together
   - Order fields logically
   - Use consistent spacing
   - Consider field dependencies

2. Spacing and Layout
   - Use consistent gap sizes
   - Consider mobile responsiveness
   - Maintain readable line lengths
   - Handle field overflow properly

3. Accessibility
   - Maintain logical tab order
   - Group related fields semantically
   - Use proper ARIA attributes
   - Test with screen readers

4. Form Integration
   - Use with form libraries
   - Handle validation states
   - Support field dependencies
   - Manage form context

## Examples

### Personal Information Form

```tsx
<FormColumn>
  <Input
    name="firstName"
    label="First Name"
    control={control}
    required
  />
  <Input
    name="lastName"
    label="Last Name"
    control={control}
    required
  />
  <Input
    name="email"
    label="Email"
    type="email"
    control={control}
    required
  />
</FormColumn>
```

### Custom Spacing

```tsx
<FormColumn className="space-y-6">
  <Input
    name="street"
    label="Street Address"
    control={control}
  />
  <Input
    name="city"
    label="City"
    control={control}
  />
  <Input
    name="zipCode"
    label="ZIP Code"
    control={control}
  />
</FormColumn>
```

### Read-Only Fields

```tsx
<FormColumn>
  <Input
    name="username"
    label="Username"
    control={control}
    disabled
  />
  <Input
    name="role"
    label="Role"
    control={control}
    disabled
  />
  <Input
    name="lastLogin"
    label="Last Login"
    control={control}
    disabled
  />
</FormColumn>
```

## Integration with Form Libraries

The FormColumn component works seamlessly with form libraries like React Hook Form:

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const schema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
});

function ValidatedForm() {
  const { control } = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <FormColumn>
      <Input
        name="firstName"
        label="First Name"
        control={control}
        required
      />
      <Input
        name="lastName"
        label="Last Name"
        control={control}
        required
      />
      <Input
        name="email"
        label="Email"
        type="email"
        control={control}
        required
      />
    </FormColumn>
  );
}
```

## Styling

The component uses CSS Grid for layout and can be customized using Tailwind classes:

```tsx
// Default spacing
<FormColumn>
  {/* Fields */}
</FormColumn>

// Custom spacing
<FormColumn className="space-y-6">
  {/* Fields */}
</FormColumn>

// With background and padding
<FormColumn className="bg-gray-50 p-6 rounded-lg">
  {/* Fields */}
</FormColumn>
```
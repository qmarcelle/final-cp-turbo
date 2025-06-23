# Avatar Component

A versatile avatar component system for displaying user profile images with fallback support and multiple size options.

## Features

- Multiple size variants (sm, md, lg, xl)
- Image loading with fallback support
- Automatic initials generation
- Accessible image alternatives
- Smooth transitions and animations
- Composable sub-components
- Profile-specific variant
- Customizable styling

## Components

### Avatar

The base container component that provides sizing and layout.

```tsx
import { Avatar } from './Avatar';

<Avatar size="md">
  {/* Avatar content */}
</Avatar>
```

### AvatarImage

Handles the image display with loading states.

```tsx
import { AvatarImage } from './Avatar';

<AvatarImage
  src="/path/to/image.jpg"
  alt="User Name"
/>
```

### AvatarFallback

Displays when the image is unavailable or loading.

```tsx
import { AvatarFallback } from './Avatar';

<AvatarFallback>JD</AvatarFallback>
// or
<AvatarFallback name="John Doe" />
```

### ProfileAvatar

A convenience component that combines all features for user profiles.

```tsx
import { ProfileAvatar } from './Avatar';

<ProfileAvatar
  user={{
    firstName: 'John',
    lastName: 'Doe',
    avatarUrl: '/profile.jpg'
  }}
  size="lg"
/>
```

## Props

### Avatar Props

| Prop | Type | Description |
|------|------|-------------|
| size | 'sm' \| 'md' \| 'lg' \| 'xl' | Size variant of the avatar |
| className | string | Additional CSS classes |
| children | ReactNode | Avatar content components |

### AvatarImage Props

| Prop | Type | Description |
|------|------|-------------|
| src | string | Image source URL |
| alt | string | Alternative text for accessibility |
| className | string | Additional CSS classes |

### AvatarFallback Props

| Prop | Type | Description |
|------|------|-------------|
| name | string | Full name to generate initials from |
| children | ReactNode | Custom fallback content |
| className | string | Additional CSS classes |

### ProfileAvatar Props

| Prop | Type | Description |
|------|------|-------------|
| user | { firstName?: string; lastName?: string; avatarUrl?: string } | User data |
| size | AvatarSize | Size variant |
| fallback | string | Custom fallback text |
| className | string | Additional CSS classes |

## Size Variants

- `sm`: 32px (h-8 w-8)
- `md`: 40px (h-10 w-10)
- `lg`: 48px (h-12 w-12)
- `xl`: 64px (h-16 w-16)

## Accessibility

- Uses semantic HTML structure
- Provides alt text for images
- Handles focus states
- Screen reader friendly
- ARIA attributes for states

## Best Practices

1. Always provide alt text for images
2. Use appropriate size for context
3. Implement proper error handling
4. Consider loading states
5. Test with missing data
6. Maintain consistent styling
7. Use meaningful fallbacks
8. Consider mobile display

## Examples

### Basic Usage

```tsx
<Avatar>
  <AvatarImage src="/user.jpg" alt="John Doe" />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>
```

### Profile Display

```tsx
<ProfileAvatar
  user={{
    firstName: 'John',
    lastName: 'Doe',
    avatarUrl: '/profile.jpg'
  }}
  size="lg"
  className="border-2 border-primary"
/>
```

### Team List

```tsx
<div className="flex space-x-2">
  <Avatar size="sm">
    <AvatarImage src="/user1.jpg" alt="Team Member 1" />
    <AvatarFallback>TM</AvatarFallback>
  </Avatar>
  <Avatar size="sm">
    <AvatarImage src="/user2.jpg" alt="Team Member 2" />
    <AvatarFallback>TM</AvatarFallback>
  </Avatar>
  <Avatar size="sm" className="bg-gray-100">
    <AvatarFallback>+3</AvatarFallback>
  </Avatar>
</div>
```
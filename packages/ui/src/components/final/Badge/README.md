# Badge Component

A versatile badge component that supports multiple variants, sizes, and use cases including status indicators, counters, and interactive labels.

## Features

- Multiple variants (default, secondary, success, warning, error, outline, ghost)
- Flexible sizing (sm, default, lg, icon)
- Status badges for workflow states
- Count badges for notifications
- Interactive badges for actions
- Dot indicators for status
- Icon support
- Accessibility support
- Customizable styling

## Components

### Badge

The base badge component with support for all variants and features.

```tsx
import { Badge } from './Badge';

// Basic usage
<Badge>New</Badge>

// With variant and size
<Badge variant="success" size="lg">Complete</Badge>

// Interactive badge
<Badge variant="outline" interactive onClick={handleClick}>
  Remove
</Badge>

// With icon and dot
<Badge icon={<Icon />} dot>Status</Badge>
```

### StatusBadge

A specialized badge for displaying status information.

```tsx
import { StatusBadge } from './Badge';

<StatusBadge status="success">Complete</StatusBadge>
<StatusBadge status="warning">Pending</StatusBadge>
<StatusBadge status="error">Failed</StatusBadge>
```

### CountBadge

A badge for displaying numerical values with overflow handling.

```tsx
import { CountBadge } from './Badge';

<CountBadge count={5} />
<CountBadge count={150} max={99} /> // Shows as "99+"
<CountBadge count={0} showZero /> // Optional zero state
```

### StatusLabel

A label-style badge for workflow status indication.

```tsx
import { StatusLabel } from './Badge';

<StatusLabel status="pending" text="In Progress" />
<StatusLabel status="approved" text="Approved" />
<StatusLabel status="denied" text="Denied" />
```

## Props

### Badge Props

| Prop | Type | Description |
|------|------|-------------|
| variant | 'default' \| 'secondary' \| 'success' \| 'warning' \| 'error' \| 'outline' \| 'ghost' | Visual style variant |
| size | 'default' \| 'sm' \| 'lg' \| 'icon' | Size of the badge |
| interactive | boolean | Whether the badge is clickable |
| onClick | () => void | Click handler for interactive badges |
| icon | ReactNode | Optional icon element |
| dot | boolean | Show a dot indicator |
| className | string | Additional CSS classes |

### StatusBadge Props

| Prop | Type | Description |
|------|------|-------------|
| status | 'success' \| 'warning' \| 'error' \| 'info' \| 'neutral' | Status type |
| children | ReactNode | Badge content |

### CountBadge Props

| Prop | Type | Description |
|------|------|-------------|
| count | number | The number to display |
| max | number | Maximum value before showing overflow |
| showZero | boolean | Whether to show zero state |
| variant | BadgeVariant | Visual style variant |

### StatusLabel Props

| Prop | Type | Description |
|------|------|-------------|
| status | 'pending' \| 'processed' \| 'denied' \| 'approved' \| 'partial-approval' | Status type |
| text | string | Label text |

## Accessibility

- Uses semantic HTML elements
- Interactive badges use button elements
- Status badges include role="status"
- Proper ARIA attributes for live regions
- High contrast color combinations
- Screen reader support

## Best Practices

1. Use appropriate variants for semantic meaning
2. Keep badge text concise
3. Use interactive badges sparingly
4. Ensure sufficient color contrast
5. Include descriptive aria-labels
6. Test with screen readers
7. Consider mobile touch targets
8. Use consistent styling within context
# Progress Components

A comprehensive suite of progress indicators including linear, circular, and step-based components for various use cases.

## Components

### Linear Progress

Standard horizontal progress bar for simple progress tracking.

```tsx
import { Progress } from './Progress';

<Progress
  value={75}
  max={100}
  variant="success"
  size="md"
  showPercentage
  label="Uploading..."
/>
```

### Circular Progress

Circular progress indicator for more visual impact.

```tsx
import { CircularProgress } from './Progress';

<CircularProgress
  value={80}
  size={120}
  strokeWidth={8}
  variant="success"
  label="CPU Usage"
/>
```

### Step Progress

Multi-step progress indicator for workflows.

```tsx
import { StepProgress } from './Progress';

<StepProgress
  currentStep={2}
  totalSteps={4}
  steps={['Account', 'Details', 'Review', 'Submit']}
  orientation="horizontal"
/>
```

## Props

### Linear Progress Props

| Prop | Type | Description |
|------|------|-------------|
| value | number | Current progress value |
| max | number | Maximum progress value |
| size | 'sm' \| 'md' \| 'lg' \| 'xl' | Size variant |
| variant | 'default' \| 'success' \| 'warning' \| 'error' | Visual style |
| showPercentage | boolean | Show percentage text |
| animated | boolean | Enable animations |
| label | string | Descriptive label |
| indeterminate | boolean | Show loading state |
| className | string | Additional CSS classes |

### Circular Progress Props

| Prop | Type | Description |
|------|------|-------------|
| value | number | Current progress value |
| max | number | Maximum progress value |
| size | number | Diameter in pixels |
| strokeWidth | number | Circle stroke width |
| variant | 'default' \| 'success' \| 'warning' \| 'error' | Visual style |
| showPercentage | boolean | Show percentage text |
| label | string | Descriptive label |
| indeterminate | boolean | Show loading state |
| className | string | Additional CSS classes |

### Step Progress Props

| Prop | Type | Description |
|------|------|-------------|
| currentStep | number | Current step index |
| totalSteps | number | Total number of steps |
| steps | string[] | Array of step labels |
| showNumbers | boolean | Show step numbers |
| size | 'sm' \| 'md' \| 'lg' | Size variant |
| orientation | 'horizontal' \| 'vertical' | Layout direction |
| className | string | Additional CSS classes |

## Features

### Linear Progress
- Multiple size variants
- Color variants for different states
- Percentage display
- Labels and descriptions
- Indeterminate state
- Smooth animations
- Accessibility support

### Circular Progress
- Customizable size and stroke width
- Percentage display
- Center label support
- Color variants
- Smooth animations
- Indeterminate state
- SVG-based rendering

### Step Progress
- Horizontal and vertical layouts
- Multiple size options
- Step labels
- Optional step numbers
- Completed/current/upcoming states
- Connector lines
- Responsive design

## Accessibility

- ARIA roles and attributes
- Progress value announcements
- State descriptions
- Keyboard navigation
- High contrast support
- Screen reader compatibility

## Best Practices

1. Choose appropriate component type:
   - Linear: Simple progress tracking
   - Circular: Visual stats and completion
   - Step: Multi-stage workflows

2. Use clear labels and descriptions

3. Consider mobile responsiveness:
   - Adjust sizes for touch targets
   - Use appropriate orientations
   - Test on different screens

4. Implement proper error states:
   - Handle edge cases
   - Show meaningful messages
   - Provide recovery options

5. Follow accessibility guidelines:
   - Include ARIA labels
   - Test with screen readers
   - Ensure keyboard navigation

## Examples

### File Upload Progress

```tsx
<Progress
  value={75}
  label="Uploading file.pdf"
  showPercentage
  size="sm"
  variant="success"
/>
```

### System Status

```tsx
<CircularProgress
  value={85}
  size={160}
  label="CPU Usage"
  variant="warning"
  showPercentage
/>
```

### Registration Flow

```tsx
<StepProgress
  currentStep={2}
  totalSteps={4}
  steps={[
    'Account Setup',
    'Personal Info',
    'Verification',
    'Complete'
  ]}
  size="lg"
/>
```
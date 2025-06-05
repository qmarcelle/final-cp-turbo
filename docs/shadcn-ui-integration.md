# 🎨 shadcn/ui Integration Guide

*How to use and customize our design system components*

## What is shadcn/ui?

shadcn/ui is our chosen approach for building consistent, beautiful user interfaces. Unlike traditional component libraries, you **copy the source code** into your project, giving you complete control over styling and behavior.

> **Think of it like this:** Instead of renting furniture (traditional library), you buy the blueprints and build it yourself (shadcn/ui). You own it, modify it, and make it perfect for your needs.

## Why We Chose shadcn/ui

### ✅ Benefits
- **Full control**: You own the code, customize anything
- **No version conflicts**: No dependency hell
- **Excellent design**: Beautiful, accessible components out of the box
- **TypeScript-first**: Perfect integration with our tech stack
- **Copy-paste friendly**: Just grab what you need

### 🏗️ Built on Solid Foundations
- **Tailwind CSS**: For styling and design tokens
- **Radix UI**: For accessibility and behavior
- **CVA (Class Variance Authority)**: For component variants
- **TypeScript**: For type safety

## Getting Started

### 1. Basic Setup (Already Done for You)

Our projects are already configured with shadcn/ui. Here's what we have:

```bash
# Already installed in our packages/ui
components/ui/          # shadcn/ui components
lib/utils.ts           # Utility functions (cn helper)
```

### 2. Using Components in Your App

```tsx
// Import from our shared UI package
import { Button, Input, Card } from '@portals/ui';

function LoginForm() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Welcome Back</CardTitle>
        <CardDescription>Sign in to your account</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input placeholder="Email" type="email" />
        <Input placeholder="Password" type="password" />
      </CardContent>
      <CardFooter>
        <Button className="w-full">Sign In</Button>
      </CardFooter>
    </Card>
  );
}
```

## Available Components

### Form Components
```tsx
import {
  Button,
  Input,
  Label,
  Textarea,
  Select,
  Checkbox,
  RadioGroup,
  Switch,
} from '@portals/ui';

function ContactForm() {
  return (
    <form className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" placeholder="Your name" />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" placeholder="Your message..." />
      </div>
      
      <div className="flex items-center space-x-2">
        <Checkbox id="newsletter" />
        <Label htmlFor="newsletter">Subscribe to newsletter</Label>
      </div>
      
      <Button type="submit">Send Message</Button>
    </form>
  );
}
```

### Layout Components
```tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Separator,
  Badge,
} from '@portals/ui';

function UserProfile({ user }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{user.name}</CardTitle>
          <Badge variant={user.isActive ? 'default' : 'secondary'}>
            {user.isActive ? 'Active' : 'Inactive'}
          </Badge>
        </div>
        <CardDescription>{user.email}</CardDescription>
      </CardHeader>
      
      <Separator />
      
      <CardContent className="pt-6">
        <p>Role: {user.role}</p>
        <p>Last login: {user.lastLogin}</p>
      </CardContent>
      
      <CardFooter>
        <Button variant="outline">Edit Profile</Button>
      </CardFooter>
    </Card>
  );
}
```

### Interactive Components
```tsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  AlertDialog,
  Popover,
  Tooltip,
} from '@portals/ui';

function DeleteUserButton({ userId, userName }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Delete User</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete {userName}'s account. 
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => deleteUser(userId)}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
```

## Component Variants

Most components come with built-in variants:

### Button Variants
```tsx
<Button variant="default">Default</Button>
<Button variant="destructive">Delete</Button>
<Button variant="outline">Outline</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>

{/* Sizes */}
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon">📧</Button>
```

### Badge Variants
```tsx
<Badge variant="default">Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="destructive">Error</Badge>
<Badge variant="outline">Outline</Badge>
```

### Alert Variants
```tsx
<Alert>
  <AlertCircle className="h-4 w-4" />
  <AlertTitle>Info</AlertTitle>
  <AlertDescription>This is an informational message.</AlertDescription>
</Alert>

<Alert variant="destructive">
  <AlertCircle className="h-4 w-4" />
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>Something went wrong.</AlertDescription>
</Alert>
```

## Customizing Components

Since you own the code, you can customize anything:

### 1. Modifying Existing Variants

```tsx
// packages/ui/src/components/ui/button.tsx
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        // Add your custom variant
        brand: "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700",
      },
    },
  }
);
```

### 2. Creating Custom Components

```tsx
// packages/ui/src/components/ui/status-badge.tsx
import { cn } from '@portals/ui/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const statusBadgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
  {
    variants: {
      status: {
        active: 'bg-green-100 text-green-800',
        inactive: 'bg-gray-100 text-gray-800',
        pending: 'bg-yellow-100 text-yellow-800',
        error: 'bg-red-100 text-red-800',
      },
    },
    defaultVariants: {
      status: 'inactive',
    },
  }
);

interface StatusBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statusBadgeVariants> {}

export function StatusBadge({ className, status, ...props }: StatusBadgeProps) {
  return (
    <div
      className={cn(statusBadgeVariants({ status }), className)}
      {...props}
    />
  );
}
```

## Best Practices

### 1. Use the `cn` Helper Function

Always use the `cn` utility for combining classes:

```tsx
import { cn } from '@portals/ui/lib/utils';

// ✅ Good
<Button className={cn('w-full', isLoading && 'opacity-50')} />

// ❌ Avoid
<Button className={`w-full ${isLoading ? 'opacity-50' : ''}`} />
```

### 2. Consistent Spacing

Use Tailwind's spacing scale consistently:

```tsx
// ✅ Good - Consistent spacing
<div className="space-y-4">
  <Input />
  <Input />
  <Button />
</div>

// ✅ Good - Responsive spacing
<div className="space-y-2 md:space-y-4">
  <Input />
  <Input />
</div>
```

### 3. Component Composition

Build complex UIs by composing simple components:

```tsx
function UserCard({ user }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src={user.avatar} />
            <AvatarFallback>{user.initials}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>{user.name}</CardTitle>
            <CardDescription>{user.email}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2">
          <StatusBadge status={user.status} />
          <span className="text-sm text-muted-foreground">
            Last active: {user.lastActive}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
```

## Form Patterns

### 1. Basic Form with Validation

```tsx
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Button,
  Input,
  Label,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Alert,
  AlertDescription,
} from '@portals/ui';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
});

export function UserForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
    },
  });
  
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await createUser(data);
    } catch (error) {
      // Handle error
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>Create User</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              {...form.register('name')}
              placeholder="Enter name"
            />
            {form.formState.errors.name && (
              <p className="text-sm text-destructive">
                {form.formState.errors.name.message}
              </p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              {...form.register('email')}
              placeholder="Enter email"
            />
            {form.formState.errors.email && (
              <p className="text-sm text-destructive">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>
          
          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? 'Creating...' : 'Create User'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
```

### 2. Form with React 19 Actions

```tsx
'use client';

import { useFormStatus } from 'react-dom';
import {
  Button,
  Input,
  Label,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@portals/ui';

function SubmitButton() {
  const { pending } = useFormStatus();
  
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? 'Creating...' : 'Create User'}
    </Button>
  );
}

async function createUser(formData: FormData) {
  'use server';
  
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  
  // Process form data
  await db.user.create({ data: { name, email } });
}

export function UserForm() {
  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>Create User</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={createUser} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" placeholder="Enter name" required />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="Enter email" required />
          </div>
          
          <SubmitButton />
        </form>
      </CardContent>
    </Card>
  );
}
```

## Data Display Patterns

### 1. Data Table

```tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Badge,
  Button,
} from '@portals/ui';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
}

interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (userId: string) => void;
}

export function UserTable({ users, onEdit, onDelete }: UserTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.role}</TableCell>
            <TableCell>
              <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                {user.status}
              </Badge>
            </TableCell>
            <TableCell>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={() => onEdit(user)}>
                  Edit
                </Button>
                <Button variant="destructive" size="sm" onClick={() => onDelete(user.id)}>
                  Delete
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
```

### 2. Loading States

```tsx
import { Skeleton, Card, CardContent, CardHeader } from '@portals/ui';

export function UserCardSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-[80%]" />
        </div>
      </CardContent>
    </Card>
  );
}

export function UserList({ users, isLoading }) {
  if (isLoading) {
    return (
      <div className="grid gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <UserCardSkeleton key={i} />
        ))}
      </div>
    );
  }
  
  return (
    <div className="grid gap-4">
      {users.map(user => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}
```

## Dark Mode Support

All components automatically support dark mode:

```tsx
// Add this to your root layout
<html className={isDarkMode ? 'dark' : ''}>
  <body>
    {/* Your app */}
  </body>
</html>
```

Components will automatically use the correct colors in dark mode.

## Adding New Components

When you need a component that doesn't exist:

### 1. Check if shadcn/ui has it

```bash
# See what's available
npx shadcn-ui@latest add --help

# Add a new component
npx shadcn-ui@latest add calendar
```

### 2. Create custom components

Follow the same patterns as existing components:

```tsx
// packages/ui/src/components/ui/my-component.tsx
import { cn } from '@portals/ui/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const myComponentVariants = cva(
  'base-styles',
  {
    variants: {
      variant: {
        default: 'default-styles',
        alternate: 'alternate-styles',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

interface MyComponentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof myComponentVariants> {}

export function MyComponent({ className, variant, ...props }: MyComponentProps) {
  return (
    <div
      className={cn(myComponentVariants({ variant }), className)}
      {...props}
    />
  );
}
```

### 3. Export from the main package

```tsx
// packages/ui/src/index.ts
export { MyComponent } from './components/ui/my-component';
```

## Troubleshooting

### Common Issues

#### 1. Styles not applying
- Make sure Tailwind CSS is configured correctly
- Check if the component is properly imported
- Verify CSS imports are in the correct order

#### 2. TypeScript errors
- Ensure all props are properly typed
- Check that you're using the correct variant names
- Import types from the correct location

#### 3. Components not found
- Check the import path: `import { Button } from '@portals/ui'`
- Ensure the component is exported from the main index file
- Verify the component exists in the ui package

### Getting Help

1. **Check the shadcn/ui docs**: [ui.shadcn.com](https://ui.shadcn.com/)
2. **Look at existing components**: See how similar components are implemented
3. **Ask the team**: Use Teams or email for specific questions
4. **Check Tailwind docs**: [tailwindcss.com](https://tailwindcss.com/docs)

## Resources

- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Radix UI Documentation](https://www.radix-ui.com/primitives)
- [CVA Documentation](https://cva.style/docs)
- [React Hook Form](https://react-hook-form.com/) (for complex forms)

---

**Remember:** You own the components, so don't be afraid to customize them to fit your needs! 🎨
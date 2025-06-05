# 🌟 Developer-Friendly Guide: Complete Stack Overview

*A comprehensive guide for developers new to our tech stack*

Welcome! This guide is designed specifically for developers who are new to some or all of the technologies we use. We'll walk through each technology with clear explanations, practical examples, and links to help you get up to speed quickly.

## 🎯 What You'll Learn

By the end of this guide, you'll understand:
- **TurboRepo**: Why we use it and how it works
- **Next.js 15**: Modern React framework features
- **AuthJS (NextAuth.js)**: Authentication made simple
- **React 19**: Latest React features we use
- **Zustand**: Simple state management
- **shadcn/ui**: Modern component library approach

---

## 📚 Table of Contents

1. [TurboRepo: Making Monorepos Simple](#-turborepo-making-monorepos-simple)
2. [Next.js 15: Full-Stack React Framework](#-nextjs-15-full-stack-react-framework)
3. [AuthJS: Authentication System](#-authjs-authentication-system)
4. [React 19: Modern React Features](#-react-19-modern-react-features)
5. [Zustand: Simple State Management](#-zustand-simple-state-management)
6. [shadcn/ui: Component Library Approach](#-shadcnui-component-library-approach)
7. [How Everything Works Together](#-how-everything-works-together)

---

## 🏗️ TurboRepo: Making Monorepos Simple

### What is TurboRepo?

Think of TurboRepo as a "smart build system" for projects with multiple apps and packages. Instead of building everything every time, it only builds what actually changed.

**Why we use it:**
- **Speed**: Only rebuilds what changed
- **Sharing**: Common code lives in shared packages
- **Consistency**: Same tools and configs across all projects

### Key Concepts

#### 1. Workspaces
```
cp_turbo_skeleton/
├── apps/           ← Your applications (websites)
│   ├── broker-portal/
│   └── employer-portal/
└── packages/       ← Shared code
    ├── ui/         ← Components everyone can use
    ├── auth/       ← Login/logout logic
    └── api-client/ ← Talk to backend services
```

#### 2. How Dependencies Work
```json
// In broker-portal/package.json
{
  "dependencies": {
    "@portals/ui": "workspace:*",     // ← Uses our shared UI
    "@portals/auth": "workspace:*"    // ← Uses our shared auth
  }
}
```

#### 3. Common Commands
```bash
# Start everything in development
pnpm dev

# Build everything
pnpm build

# Run tests everywhere
pnpm test

# Work on just one app
pnpm dev --filter=broker-portal
```

### What Makes It "Smart"?

**Traditional approach:**
- Change one file → rebuild everything (slow)
- Each project has its own slightly different setup

**TurboRepo approach:**
- Change one file → only rebuild affected packages (fast)
- Shared configuration ensures consistency

**Example:**
```bash
# You change something in @portals/ui
pnpm build

# TurboRepo thinks:
# "UI changed → broker-portal uses UI → rebuild broker-portal"
# "UI didn't affect API → skip rebuilding API"
```

### Learn More
- [TurboRepo Documentation](https://turbo.build/repo/docs)
- [Monorepo Benefits Explained](https://turbo.build/repo/docs/handbook/what-is-a-monorepo)

---

## ⚛️ Next.js 15: Full-Stack React Framework

### What is Next.js?

Next.js is React with superpowers. While React handles the UI, Next.js adds:
- **Routing** (no need for React Router)
- **Server-side rendering** (faster page loads)
- **API routes** (build your backend right alongside your frontend)
- **Automatic optimization** (images, fonts, bundles)

### Key Features We Use

#### 1. App Router (File-Based Routing)
Instead of configuring routes, you create files:

```
app/
├── page.tsx              ← Home page (/)
├── dashboard/
│   └── page.tsx         ← Dashboard page (/dashboard)
├── users/
│   ├── page.tsx         ← Users list (/users)
│   └── [id]/
│       └── page.tsx     ← User detail (/users/123)
```

#### 2. Server vs Client Components

**Server Components (default)**
```tsx
// This runs on the server
async function UserList() {
  const users = await fetch('/api/users'); // ← Happens server-side
  
  return (
    <div>
      {users.map(user => <div key={user.id}>{user.name}</div>)}
    </div>
  );
}
```

**Client Components (when you need interactivity)**
```tsx
'use client'; // ← This tells Next.js "run this in browser"

import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

#### 3. Route Groups and Layouts
Organize routes without affecting URLs:

```
app/
├── (public)/           ← Route group (doesn't show in URL)
│   ├── layout.tsx      ← Layout for public pages
│   ├── login/
│   └── signup/
├── (protected)/        ← Another route group
│   ├── layout.tsx      ← Layout for protected pages
│   ├── dashboard/
│   └── profile/
```

#### 4. Loading and Error States
```tsx
// app/users/loading.tsx - Shows while loading
export default function Loading() {
  return <div>Loading users...</div>;
}

// app/users/error.tsx - Shows if something goes wrong
export default function Error({ error }: { error: Error }) {
  return <div>Oops! {error.message}</div>;
}
```

### Practical Example: Building a User Page

```tsx
// app/users/[id]/page.tsx
interface Props {
  params: { id: string };
}

// This is a Server Component - it runs on the server
export default async function UserPage({ params }: Props) {
  // This fetch happens on the server
  const user = await fetch(`/api/users/${params.id}`).then(r => r.json());
  
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
      {/* This button needs interactivity, so it's a Client Component */}
      <EditButton userId={user.id} />
    </div>
  );
}
```

```tsx
// components/EditButton.tsx
'use client'; // ← Client Component for interactivity

import { useState } from 'react';

interface Props {
  userId: string;
}

export function EditButton({ userId }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  
  return (
    <button onClick={() => setIsEditing(!isEditing)}>
      {isEditing ? 'Cancel' : 'Edit'}
    </button>
  );
}
```

### Learn More
- [Next.js 15 Documentation](https://nextjs.org/docs)
- [App Router Migration Guide](https://nextjs.org/docs/app/building-your-application/upgrading/app-router-migration)
- [Server vs Client Components](https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns)

---

## 🔐 AuthJS: Authentication System

### What is AuthJS (NextAuth.js)?

AuthJS makes authentication simple. Instead of building login/logout from scratch, it handles:
- **Social logins** (Google, GitHub, etc.)
- **Email/password** authentication
- **JWT tokens** and sessions
- **Security** (CSRF protection, etc.)

### How It Works

#### 1. Basic Setup
```typescript
// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: '/login',      // Custom login page
    error: '/auth/error',  // Error page
  },
  callbacks: {
    // Customize what data gets stored in the session
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.sub;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
```

#### 2. Using Authentication in Components

**Client Components:**
```tsx
'use client';

import { useSession, signIn, signOut } from 'next-auth/react';

export function LoginButton() {
  const { data: session, status } = useSession();
  
  if (status === 'loading') return <p>Loading...</p>;
  
  if (session) {
    return (
      <div>
        <p>Welcome, {session.user?.name}!</p>
        <button onClick={() => signOut()}>Sign Out</button>
      </div>
    );
  }
  
  return <button onClick={() => signIn()}>Sign In</button>;
}
```

**Server Components:**
```tsx
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return <div>Please log in to view this page.</div>;
  }
  
  return <div>Welcome to your dashboard, {session.user?.name}!</div>;
}
```

#### 3. Protecting Routes with Middleware

```typescript
// middleware.ts
import { withAuth } from 'next-auth/middleware';

export default withAuth(
  function middleware(req) {
    // Additional logic if needed
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Check if user has permission for this route
        if (req.nextUrl.pathname.startsWith('/admin')) {
          return token?.role === 'admin';
        }
        return !!token; // Just check if logged in
      },
    },
  }
);

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*'], // Protect these routes
};
```

### Real-World Example: User Profile

```tsx
// app/profile/page.tsx
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function ProfilePage() {
  const session = await getServerSession();
  
  if (!session) {
    redirect('/login');
  }
  
  return (
    <div>
      <h1>Your Profile</h1>
      <img src={session.user?.image} alt="Profile" />
      <p>Name: {session.user?.name}</p>
      <p>Email: {session.user?.email}</p>
    </div>
  );
}
```

### Learn More
- [NextAuth.js Documentation](https://next-auth.js.org/)
- [AuthJS v5 Migration Guide](https://authjs.dev/guides/upgrade-to-v5)
- [Authentication Patterns](https://nextjs.org/docs/app/building-your-application/authentication)

---

## ⚛️ React 19: Modern React Features

### What's New in React 19?

React 19 brings several improvements that make development easier and apps faster.

### Key Features We Use

#### 1. Actions (No More useState for Forms)

**Old way:**
```tsx
function ContactForm() {
  const [isPending, setIsPending] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);
    
    try {
      await submitForm(new FormData(e.target));
    } catch (error) {
      // Handle error
    } finally {
      setIsPending(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input name="email" />
      <button disabled={isPending}>
        {isPending ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}
```

**New way with Actions:**
```tsx
import { useFormStatus } from 'react-dom';

async function submitForm(formData: FormData) {
  'use server'; // ← This runs on the server
  
  const email = formData.get('email');
  // Process form...
}

function SubmitButton() {
  const { pending } = useFormStatus(); // ← Built-in pending state
  
  return (
    <button disabled={pending}>
      {pending ? 'Submitting...' : 'Submit'}
    </button>
  );
}

function ContactForm() {
  return (
    <form action={submitForm}> {/* ← Just pass the action */}
      <input name="email" />
      <SubmitButton />
    </form>
  );
}
```

#### 2. useOptimistic (Instant UI Updates)

Make your UI feel instant while waiting for server responses:

```tsx
import { useOptimistic, useTransition } from 'react';

function TodoList({ todos }: { todos: Todo[] }) {
  const [optimisticTodos, addOptimistic] = useOptimistic(
    todos,
    (state, newTodo: Todo) => [...state, newTodo]
  );
  
  const [isPending, startTransition] = useTransition();
  
  const addTodo = async (text: string) => {
    const newTodo = { id: Date.now(), text, completed: false };
    
    startTransition(() => {
      addOptimistic(newTodo); // ← Shows immediately in UI
    });
    
    await saveTodo(newTodo); // ← Actually saves to server
  };
  
  return (
    <div>
      {optimisticTodos.map(todo => (
        <div key={todo.id} style={{ opacity: isPending ? 0.7 : 1 }}>
          {todo.text}
        </div>
      ))}
    </div>
  );
}
```

#### 3. use() Hook (Better Data Fetching)

```tsx
import { use } from 'react';

function UserProfile({ userPromise }: { userPromise: Promise<User> }) {
  const user = use(userPromise); // ← Unwrap the promise
  
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}

// Usage
function App() {
  const userPromise = fetchUser('123');
  
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UserProfile userPromise={userPromise} />
    </Suspense>
  );
}
```

### Learn More
- [React 19 Release Notes](https://react.dev/blog/2024/04/25/react-19)
- [React Actions Documentation](https://react.dev/learn/keeping-components-pure#detecting-impure-calculations-with-strict-mode)

---

## 🐻 Zustand: Simple State Management

### What is Zustand?

Zustand is like a simplified version of Redux. It lets you share state between components without prop drilling.

**Why we chose it:**
- **Simple**: Less boilerplate than Redux
- **TypeScript-friendly**: Great type support
- **Flexible**: Use it anywhere, not just React
- **Small**: Tiny bundle size

### Basic Usage

#### 1. Create a Store
```typescript
// stores/userStore.ts
import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  email: string;
}

interface UserState {
  user: User | null;
  isLoading: boolean;
  setUser: (user: User) => void;
  clearUser: () => void;
  fetchUser: (id: string) => Promise<void>;
}

export const useUserStore = create<UserState>((set, get) => ({
  user: null,
  isLoading: false,
  
  setUser: (user) => set({ user }),
  
  clearUser: () => set({ user: null }),
  
  fetchUser: async (id) => {
    set({ isLoading: true });
    try {
      const user = await api.getUser(id);
      set({ user, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      // Handle error
    }
  },
}));
```

#### 2. Use in Components
```tsx
// components/UserProfile.tsx
import { useUserStore } from '@/stores/userStore';

export function UserProfile() {
  const { user, isLoading, fetchUser } = useUserStore();
  
  useEffect(() => {
    if (!user) {
      fetchUser('current-user-id');
    }
  }, [user, fetchUser]);
  
  if (isLoading) return <div>Loading...</div>;
  if (!user) return <div>No user found</div>;
  
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}
```

#### 3. Use Only What You Need (Prevents Unnecessary Re-renders)
```tsx
// Only subscribes to the user, not isLoading
function UserName() {
  const userName = useUserStore((state) => state.user?.name);
  return <h1>{userName}</h1>;
}

// Only subscribes to isLoading
function LoadingSpinner() {
  const isLoading = useUserStore((state) => state.isLoading);
  return isLoading ? <div>Loading...</div> : null;
}
```

### Advanced Patterns

#### 1. Persist State (Automatically Save to localStorage)
```typescript
import { persist } from 'zustand/middleware';

export const useSettingsStore = create(
  persist<SettingsState>(
    (set) => ({
      theme: 'light',
      language: 'en',
      setTheme: (theme) => set({ theme }),
      setLanguage: (language) => set({ language }),
    }),
    {
      name: 'app-settings', // ← localStorage key
    }
  )
);
```

#### 2. Async Actions with Error Handling
```typescript
interface TodoState {
  todos: Todo[];
  error: string | null;
  isLoading: boolean;
  addTodo: (text: string) => Promise<void>;
}

export const useTodoStore = create<TodoState>((set, get) => ({
  todos: [],
  error: null,
  isLoading: false,
  
  addTodo: async (text) => {
    set({ isLoading: true, error: null });
    
    try {
      const newTodo = await api.createTodo({ text });
      set((state) => ({
        todos: [...state.todos, newTodo],
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error.message,
        isLoading: false,
      });
    }
  },
}));
```

### Zustand vs Other State Management

| Feature | Zustand | Redux Toolkit | Context API |
|---------|---------|---------------|------------|
| **Boilerplate** | Minimal | Medium | Minimal |
| **TypeScript** | Excellent | Good | Good |
| **DevTools** | Yes | Yes | No |
| **Bundle Size** | 1.4KB | ~9KB | Built-in |
| **Learning Curve** | Easy | Medium | Easy |

### Learn More
- [Zustand Documentation](https://zustand-demo.pmnd.rs/)
- [Zustand Best Practices](https://github.com/pmndrs/zustand#best-practices)

---

## 🎨 shadcn/ui: Component Library Approach

### What is shadcn/ui?

shadcn/ui is not a traditional component library. Instead of installing components as dependencies, you copy the source code into your project.

**Benefits:**
- **Full control**: You own the code, customize anything
- **No version conflicts**: No dependency hell
- **Excellent design**: Beautiful, accessible components
- **Copy-paste friendly**: Just grab what you need

### How It Works

#### 1. Install and Setup
```bash
# Install the CLI
pnpm dlx shadcn-ui@latest init

# Add components you need
pnpm dlx shadcn-ui@latest add button
pnpm dlx shadcn-ui@latest add input
pnpm dlx shadcn-ui@latest add dialog
```

This copies component files to your project:
```
components/
└── ui/
    ├── button.tsx      ← Copied from shadcn/ui
    ├── input.tsx       ← You can modify these
    └── dialog.tsx      ← They're yours now
```

#### 2. Using Components
```tsx
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export function ContactDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Contact Us</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Get in Touch</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input placeholder="Your name" />
          <Input placeholder="Your email" type="email" />
          <Button>Send Message</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
```

#### 3. Customizing Components

Since you own the code, you can modify anything:

```tsx
// components/ui/button.tsx - Modify as needed
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        // Add your own variant
        custom: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white',
      },
    },
  }
);

export function Button({ className, variant, ...props }) {
  return (
    <button
      className={cn(buttonVariants({ variant }), className)}
      {...props}
    />
  );
}
```

### Key Technologies shadcn/ui Uses

#### 1. Tailwind CSS
```tsx
// shadcn/ui components use Tailwind classes
<button className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
  Click me
</button>
```

#### 2. Radix UI (For Complex Components)
```tsx
// shadcn/ui builds on top of Radix primitives
import * as DialogPrimitive from '@radix-ui/react-dialog';

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPrimitive.Content
    ref={ref}
    className={cn(
      'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg',
      className
    )}
    {...props}
  >
    {children}
  </DialogPrimitive.Content>
));
```

#### 3. CVA (Class Variance Authority)
Manages component variants:

```tsx
import { cva } from 'class-variance-authority';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md', // base styles
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground',
        secondary: 'bg-secondary text-secondary-foreground',
        destructive: 'bg-destructive text-destructive-foreground',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);
```

### Real-World Example: Building a User Form

```tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

export function UserForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    
    try {
      // Submit form
      toast({
        title: 'Success!',
        description: 'User has been created successfully.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>Create User</CardTitle>
        <CardDescription>
          Add a new user to your organization.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="John Doe" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="john@example.com" required />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" type="button">
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Creating...' : 'Create User'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
```

### Learn More
- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Radix UI Documentation](https://www.radix-ui.com/primitives)

---

## 🔗 How Everything Works Together

Now let's see how all these technologies work together in a real application.

### Example: User Management Feature

#### 1. File Structure
```
app/
├── (protected)/
│   └── users/
│       ├── page.tsx           ← User list page (Next.js)
│       ├── [id]/
│       │   └── page.tsx       ← User detail page (Next.js)
│       └── components/
│           ├── UserForm.tsx   ← Form component (React 19 + shadcn/ui)
│           └── UserList.tsx   ← List component (Zustand + shadcn/ui)
stores/
└── userStore.ts               ← State management (Zustand)
```

#### 2. The Store (Zustand)
```typescript
// stores/userStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

interface UserState {
  users: User[];
  selectedUser: User | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchUsers: () => Promise<void>;
  selectUser: (user: User) => void;
  addUser: (userData: Omit<User, 'id'>) => Promise<void>;
  updateUser: (id: string, userData: Partial<User>) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      users: [],
      selectedUser: null,
      isLoading: false,
      error: null,
      
      fetchUsers: async () => {
        set({ isLoading: true, error: null });
        try {
          const response = await fetch('/api/users');
          const users = await response.json();
          set({ users, isLoading: false });
        } catch (error) {
          set({ error: 'Failed to fetch users', isLoading: false });
        }
      },
      
      selectUser: (user) => set({ selectedUser: user }),
      
      addUser: async (userData) => {
        set({ isLoading: true });
        try {
          const response = await fetch('/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
          });
          const newUser = await response.json();
          set((state) => ({
            users: [...state.users, newUser],
            isLoading: false,
          }));
        } catch (error) {
          set({ error: 'Failed to add user', isLoading: false });
        }
      },
      
      // ... other actions
    }),
    {
      name: 'user-store',
      partialize: (state) => ({ selectedUser: state.selectedUser }), // Only persist selected user
    }
  )
);
```

#### 3. The API Route (Next.js)
```typescript
// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  // Fetch users from database
  const users = await db.user.findMany();
  return NextResponse.json(users);
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  
  const userData = await request.json();
  const newUser = await db.user.create({ data: userData });
  return NextResponse.json(newUser);
}
```

#### 4. The Page Component (Next.js + AuthJS)
```tsx
// app/(protected)/users/page.tsx
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { UserList } from './components/UserList';
import { AddUserDialog } from './components/AddUserDialog';

export default async function UsersPage() {
  const session = await getServerSession();
  
  if (!session) {
    redirect('/login');
  }
  
  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Users</h1>
        {session.user.role === 'admin' && <AddUserDialog />}
      </div>
      <UserList />
    </div>
  );
}
```

#### 5. The List Component (React 19 + Zustand + shadcn/ui)
```tsx
// app/(protected)/users/components/UserList.tsx
'use client';

import { useEffect } from 'react';
import { useUserStore } from '@/stores/userStore';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';

export function UserList() {
  const { users, isLoading, error, fetchUsers, deleteUser } = useUserStore();
  const { toast } = useToast();
  
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);
  
  const handleDelete = async (id: string) => {
    try {
      await deleteUser(id);
      toast({
        title: 'Success',
        description: 'User deleted successfully.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete user.',
        variant: 'destructive',
      });
    }
  };
  
  if (isLoading) {
    return <div className="flex justify-center py-8">Loading users...</div>;
  }
  
  if (error) {
    return <div className="text-red-500 py-8">Error: {error}</div>;
  }
  
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>
              <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                {user.role}
              </Badge>
            </TableCell>
            <TableCell>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDelete(user.id)}
              >
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
```

#### 6. The Form Component (React 19 Actions + shadcn/ui)
```tsx
// app/(protected)/users/components/AddUserDialog.tsx
'use client';

import { useState } from 'react';
import { useFormStatus } from 'react-dom';
import { useUserStore } from '@/stores/userStore';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';

function SubmitButton() {
  const { pending } = useFormStatus();
  
  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Creating...' : 'Create User'}
    </Button>
  );
}

export function AddUserDialog() {
  const [open, setOpen] = useState(false);
  const { addUser } = useUserStore();
  const { toast } = useToast();
  
  async function createUser(formData: FormData) {
    const userData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      role: formData.get('role') as 'admin' | 'user',
    };
    
    try {
      await addUser(userData);
      setOpen(false);
      toast({
        title: 'Success',
        description: 'User created successfully.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create user.',
        variant: 'destructive',
      });
    }
  }
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add User</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
        </DialogHeader>
        <form action={createUser} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select name="role" required>
              <SelectTrigger>
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <SubmitButton />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
```

### What's Happening Here?

1. **TurboRepo** manages the monorepo and builds
2. **Next.js** handles routing, server-side rendering, and API routes
3. **AuthJS** protects routes and manages user sessions
4. **React 19** provides modern features like form actions and useFormStatus
5. **Zustand** manages client-side state across components
6. **shadcn/ui** provides beautiful, accessible UI components

### The Flow
1. User visits `/users` page
2. Next.js middleware checks authentication (AuthJS)
3. Server component renders with user session data
4. Client components connect to Zustand store
5. Components use shadcn/ui for consistent styling
6. Form submissions use React 19 actions
7. TurboRepo ensures fast builds and caching

---

## 🎓 Learning Path Recommendations

### Week 1: Foundations
1. **Next.js basics**: Pages, routing, layouts
2. **React 19**: New hooks and patterns
3. **TurboRepo**: Understand monorepo concepts

### Week 2: State & Auth
1. **Zustand**: State management patterns
2. **AuthJS**: Authentication setup and usage
3. **Integration**: Connect auth with state management

### Week 3: UI & Styling
1. **shadcn/ui**: Component usage and customization
2. **Tailwind CSS**: Utility-first styling
3. **Design patterns**: Consistent UI patterns

### Week 4: Advanced Topics
1. **Performance**: Optimization techniques
2. **Testing**: Component and integration testing
3. **Deployment**: Build and deployment strategies

## 📚 Additional Resources

### Documentation
- [Next.js Learn Course](https://nextjs.org/learn) - Interactive tutorial
- [React Beta Docs](https://react.dev/) - Latest React documentation
- [TurboRepo Handbook](https://turbo.build/repo/docs/handbook) - Best practices
- [Zustand Examples](https://github.com/pmndrs/zustand/tree/main/examples) - Real-world patterns

### Video Tutorials
- [Next.js 15 Crash Course](https://www.youtube.com/watch?v=ZVnjOPwW4ZA)
- [React 19 New Features](https://www.youtube.com/watch?v=81uW6pXtGEM)
- [Zustand State Management](https://www.youtube.com/watch?v=sqTPGMipjHk)

### Community
- [Next.js Discord](https://discord.gg/nextjs)
- [React Community Discord](https://discord.gg/react)
- [TurboRepo GitHub Discussions](https://github.com/vercel/turbo/discussions)

---

## 🤝 Getting Help

### Internal Resources
- **Microsoft Teams**: Consumer Portals team channel
- **Email**: consumerportals@groups.bcbst.com
- **Documentation**: This guide and other docs in `/docs`

### When You're Stuck
1. **Check the docs**: Most questions are answered in official documentation
2. **Search the codebase**: Look for similar patterns in existing code
3. **Ask the team**: Don't hesitate to reach out via Teams
4. **Create examples**: Build small test cases to understand concepts

### Contributing Back
- **Update this guide**: Found something confusing? Help improve it!
- **Share patterns**: Document useful patterns you discover
- **Help others**: Answer questions from new team members

---

**Happy coding! 🚀**

*Remember: Every expert was once a beginner. Don't be afraid to ask questions and experiment with the code.*
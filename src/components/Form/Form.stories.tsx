import type { Meta, StoryObj } from '@storybook/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormSection,
  FormGrid,
  FormActions,
} from './Form'
import { Input } from '../Input/Input'
import { Button } from '../Button/Button'

const meta: Meta = {
  title: 'Components/Form',
  parameters: {
    layout: 'padded',
  },
  tags: ['organism', 'autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

const formSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  bio: z.string().max(160).optional(),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
})

export const Default: Story = {
  render: () => {
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        username: '',
        email: '',
      },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
      console.log(values)
    }

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="johndoe" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="john@example.com" {...field} />
                </FormControl>
                <FormDescription>
                  We'll never share your email with anyone else.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    )
  },
}

export const WithSections: Story = {
  render: () => {
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
    })

    return (
      <Form {...form}>
        <form className="space-y-6">
          <FormSection>
            <h3 className="text-lg font-medium">Personal Information</h3>
            <p className="text-sm text-slate-500">Update your personal details here.</p>
            <FormGrid columns={2}>
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </FormGrid>
          </FormSection>

          <FormSection>
            <h3 className="text-lg font-medium">Account Settings</h3>
            <p className="text-sm text-slate-500">Manage your account preferences.</p>
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    Choose a unique username.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </FormSection>

          <FormActions>
            <Button variant="outline">Cancel</Button>
            <Button type="submit">Save Changes</Button>
          </FormActions>
        </form>
      </Form>
    )
  },
}

export const GridLayout: Story = {
  render: () => {
    const form = useForm()

    return (
      <Form {...form}>
        <form className="space-y-6">
          <FormGrid columns={3}>
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input />
              </FormControl>
            </FormItem>
            <FormItem>
              <FormLabel>Middle Name</FormLabel>
              <FormControl>
                <Input />
              </FormControl>
            </FormItem>
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input />
              </FormControl>
            </FormItem>
          </FormGrid>
          <FormGrid columns={2}>
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" />
              </FormControl>
            </FormItem>
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input type="tel" />
              </FormControl>
            </FormItem>
          </FormGrid>
          <FormActions>
            <Button type="submit">Submit</Button>
          </FormActions>
        </form>
      </Form>
    )
  },
}

export const ValidationStates: Story = {
  render: () => {
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      mode: 'onChange',
    })

    return (
      <Form {...form}>
        <form className="space-y-6">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username (with error)</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>
                  Minimum 2 characters required.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email (with error)</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormDescription>
                  Must be a valid email address.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormActions>
            <Button
              type="button"
              onClick={() => form.trigger()}
              variant="outline"
            >
              Trigger Validation
            </Button>
          </FormActions>
        </form>
      </Form>
    )
  },
} 
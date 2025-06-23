import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { axe, toHaveNoViolations } from 'jest-axe'
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

expect.extend(toHaveNoViolations)

const TestForm = ({ onSubmit }: { onSubmit?: (data: any) => void }) => {
  const schema = z.object({
    username: z.string().min(2, 'Username must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
  })

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: '',
      email: '',
    },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit || (() => {}))}>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>Your username</FormDescription>
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
        <FormActions>
          <Button type="submit">Submit</Button>
        </FormActions>
      </form>
    </Form>
  )
}

describe('Form Components', () => {
  describe('Form', () => {
    it('renders form fields correctly', () => {
      render(<TestForm />)
      expect(screen.getByLabelText('Username')).toBeInTheDocument()
      expect(screen.getByLabelText('Email')).toBeInTheDocument()
      expect(screen.getByText('Your username')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument()
    })

    it('handles form submission', async () => {
      const user = userEvent.setup()
      const handleSubmit = vi.fn()
      render(<TestForm onSubmit={handleSubmit} />)

      await user.type(screen.getByLabelText('Username'), 'johndoe')
      await user.type(screen.getByLabelText('Email'), 'john@example.com')
      await user.click(screen.getByRole('button', { name: 'Submit' }))

      expect(handleSubmit).toHaveBeenCalledWith({
        username: 'johndoe',
        email: 'john@example.com',
      })
    })

    it('displays validation errors', async () => {
      const user = userEvent.setup()
      render(<TestForm />)

      await user.type(screen.getByLabelText('Username'), 'j')
      await user.tab()
      expect(await screen.findByText('Username must be at least 2 characters')).toBeInTheDocument()

      await user.type(screen.getByLabelText('Email'), 'invalid-email')
      await user.tab()
      expect(await screen.findByText('Invalid email address')).toBeInTheDocument()
    })
  })

  describe('FormSection', () => {
    it('renders section with content', () => {
      render(
        <FormSection>
          <h3>Section Title</h3>
          <p>Section content</p>
        </FormSection>
      )
      expect(screen.getByText('Section Title')).toBeInTheDocument()
      expect(screen.getByText('Section content')).toBeInTheDocument()
    })

    it('applies custom className', () => {
      render(
        <FormSection className="custom-class">
          <p>Content</p>
        </FormSection>
      )
      expect(screen.getByText('Content').parentElement).toHaveClass('custom-class')
    })
  })

  describe('FormGrid', () => {
    it('renders grid with correct column classes', () => {
      const { rerender } = render(
        <FormGrid columns={2}>
          <div>Item 1</div>
          <div>Item 2</div>
        </FormGrid>
      )
      expect(screen.getByText('Item 1').parentElement).toHaveClass('md:grid-cols-2')

      rerender(
        <FormGrid columns={4}>
          <div>Item 1</div>
          <div>Item 2</div>
        </FormGrid>
      )
      expect(screen.getByText('Item 1').parentElement).toHaveClass('lg:grid-cols-4')
    })
  })

  describe('FormActions', () => {
    it('renders actions with correct alignment', () => {
      render(
        <FormActions>
          <button>Cancel</button>
          <button>Submit</button>
        </FormActions>
      )
      expect(screen.getByRole('button', { name: 'Cancel' }).parentElement).toHaveClass('justify-end')
    })

    it('maintains button order', () => {
      render(
        <FormActions>
          <button>First</button>
          <button>Second</button>
        </FormActions>
      )
      const buttons = screen.getAllByRole('button')
      expect(buttons[0]).toHaveTextContent('First')
      expect(buttons[1]).toHaveTextContent('Second')
    })
  })

  it('is accessible', async () => {
    const { container } = render(<TestForm />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
}) 
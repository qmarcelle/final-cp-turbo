import type { Meta, StoryObj } from '@storybook/react'
import { FormColumn } from './FormColumn'
import { Input  } from '../../foundation/Input/Input'
import { useForm, Control, FieldValues } from 'react-hook-form'
import { ReactNode } from 'react'

const meta = {
  title: 'Composite/FormColumn',
  component: FormColumn,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FormColumn>

export default meta
type Story = StoryObj<typeof meta>

interface FormWrapperProps {
  children: (props: { control: Control<FieldValues> }) => ReactNode
}

const FormWrapper = ({ children }: FormWrapperProps) => {
  const form = useForm<FieldValues>()
  return (
    <div className="w-[600px]">
      {children({ control: form.control })}
    </div>
  )
}

const PersonalInfoForm = ({ control }: { control: Control<FieldValues> }) => (
  <FormColumn data-cy="personal-info">
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
)

export const Default: Story = {
  args: {
    'data-cy': 'personal-info',
    children: null,
  },
  render: () => (
    <FormWrapper>
      {({ control }) => <PersonalInfoForm control={control} />}
    </FormWrapper>
  ),
}

const AddressForm = ({ control }: { control: Control<FieldValues> }) => (
  <FormColumn 
    className="space-y-6"
    data-cy="address-info"
  >
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
)

export const WithCustomSpacing: Story = {
  args: {
    className: 'space-y-6',
    'data-cy': 'address-info',
    children: null,
  },
  render: () => (
    <FormWrapper>
      {({ control }) => <AddressForm control={control} />}
    </FormWrapper>
  ),
}

const ReadOnlyForm = () => {
  const form = useForm<FieldValues>({
    defaultValues: {
      username: 'johndoe',
      role: 'User',
      lastLogin: '2024-03-20',
    },
  })

  return (
    <FormColumn data-cy="readonly-info">
      <Input
        name="username"
        label="Username"
        control={form.control}
        disabled
      />
      <Input
        name="role"
        label="Role"
        control={form.control}
        disabled
      />
      <Input
        name="lastLogin"
        label="Last Login"
        control={form.control}
        disabled
      />
    </FormColumn>
  )
}

export const WithDisabledFields: Story = {
  args: {
    'data-cy': 'readonly-info',
    children: null,
  },
  render: () => (
    <div className="w-[600px]">
      <ReadOnlyForm />
    </div>
  ),
} 
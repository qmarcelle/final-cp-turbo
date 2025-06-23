import type { Meta, StoryObj } from '@storybook/react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { Button } from '../../foundation/Button';
import { Input } from '../../foundation/Input';

const meta: Meta = {
  title: 'Composite/Form/FormContext',
  tags: ['autodocs'],
  decorators: [
    (Story) => {
      const methods = useForm({
        defaultValues: {
          firstName: 'John',
          lastName: 'Doe',
        },
      });
      return (
        <FormProvider {...methods}>
          <Story />
        </FormProvider>
      );
    },
  ],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => {
    const { register, formState: { errors } } = useFormContext();

    return (
      <div className="space-y-4 p-4 border rounded-lg">
        <h3 className="text-lg font-medium">Form with Context</h3>
        <p className="text-sm text-muted-foreground">
          This form demonstrates using FormContext to manage state.
        </p>
        <div>
          <label htmlFor="firstName">First Name</label>
          <Input {...register("firstName")} />
          {errors.firstName && <p className="text-red-500 text-xs">{errors.firstName.message as string}</p>}
        </div>
        <div>
          <label htmlFor="lastName">Last Name</label>
          <Input {...register("lastName")} />
          {errors.lastName && <p className="text-red-500 text-xs">{errors.lastName.message as string}</p>}
        </div>
        <Button type="submit">Submit</Button>
      </div>
    );
  },
}; 
import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Input } from '../../atoms/Input'
import { FormLayout } from '../../foundation/Layout/Layout'
import { FormField } from '../../molecules/FormField'
import type { Control, FieldValues } from 'react-hook-form'
import { cn } from '../../../utils/cn'

const schema = z.object({
  beneficiary: z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    dateOfBirth: z.string().min(1, 'Date of birth is required'),
    medicareNumber: z.string().min(1, 'Medicare number is required'),
    phone: z.string().min(1, 'Phone number is required'),
    email: z.string().email('Invalid email address'),
  }),
  service: z.object({
    serviceDate: z.string().min(1, 'Service date is required'),
    serviceDescription: z.string().min(1, 'Service description is required'),
    reasonForRedetermination: z.string().min(1, 'Reason is required'),
  }),
})

type RedeterminationFormData = z.infer<typeof schema>

export function MedicareRedeterminationForm() {
  const methods = useForm<RedeterminationFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      beneficiary: {
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        medicareNumber: '',
        phone: '',
        email: ''
      },
      service: {
        serviceDate: '',
        serviceDescription: '',
        reasonForRedetermination: ''
      }
    }
  })

  const onSubmit = (data: RedeterminationFormData) => {
    console.log(data)
  }

  const control = methods.control as Control<RedeterminationFormData, FieldValues>

  return (
    <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
      <FormLayout gap={6}>
        <FormField name="beneficiaryInfo" label="Beneficiary Information">
          <FormLayout columns={2}>
            <FormField name="firstName" label="First Name" required>
              <Controller
                name="beneficiary.firstName"
                control={control}
                render={({ field }) => (
                  <Input {...field} placeholder="Enter first name" />
                )}
              />
            </FormField>
            <FormField name="lastName" label="Last Name" required>
              <Controller
                name="beneficiary.lastName"
                control={control}
                render={({ field }) => (
                  <Input {...field} placeholder="Enter last name" />
                )}
              />
            </FormField>
            <FormField name="dateOfBirth" label="Date of Birth" required>
              <Controller
                name="beneficiary.dateOfBirth"
                control={control}
                render={({ field }) => (
                  <Input {...field} placeholder="Enter date of birth" />
                )}
              />
            </FormField>
          </FormLayout>
        </FormField>

        <FormField name="medicareInfo" label="Medicare Information">
          <FormLayout columns={2}>
            <FormField name="medicareNumber" label="Medicare Number" required>
              <Controller
                name="beneficiary.medicareNumber"
                control={control}
                render={({ field }) => (
                  <Input {...field} placeholder="Enter Medicare number" />
                )}
              />
            </FormField>
          </FormLayout>
        </FormField>

        <FormField name="contactInfo" label="Contact Information">
          <FormLayout columns={2}>
            <FormField name="phone" label="Phone Number" required>
              <Controller
                name="beneficiary.phone"
                control={control}
                render={({ field }) => (
                  <Input {...field} placeholder="Enter phone number" />
                )}
              />
            </FormField>
            <FormField name="email" label="Email Address" required>
              <Controller
                name="beneficiary.email"
                control={control}
                render={({ field }) => (
                  <Input {...field} placeholder="Enter email address" />
                )}
              />
            </FormField>
          </FormLayout>
        </FormField>

        <FormField name="serviceInfo" label="Service Information">
          <FormLayout columns={2}>
            <FormField name="serviceDate" label="Service Date" required>
              <Controller
                name="service.serviceDate"
                control={control}
                render={({ field }) => (
                  <Input {...field} placeholder="Enter service date" />
                )}
              />
            </FormField>
            <FormField name="serviceDescription" label="Service Description" required>
              <Controller
                name="service.serviceDescription"
                control={control}
                render={({ field }) => (
                  <Input {...field} placeholder="Enter service description" />
                )}
              />
            </FormField>
          </FormLayout>
        </FormField>

        <FormField name="reasonForRedetermination" label="Reason for Redetermination" required className="mt-6">
          <Controller
            name="service.reasonForRedetermination"
            control={control}
            render={({ field }) => (
              <Input
                type="textarea"
                {...field}
                placeholder="Enter reason for redetermination"
              />
            )}
          />
        </FormField>
      </FormLayout>

      <div className="flex justify-end">
        <button
          type="submit"
          className={cn(
            'px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md',
            'hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
            'disabled:opacity-50 disabled:cursor-not-allowed'
          )}
          disabled={methods.formState.isSubmitting}
        >
          {methods.formState.isSubmitting ? 'Submitting...' : 'Submit Redetermination'}
        </button>
      </div>
    </form>
  )
} 
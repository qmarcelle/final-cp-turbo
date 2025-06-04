import React from 'react'
import { useForm, Controller, Control } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Input  } from '../../foundation/input'
import { TextArea  } from '../../foundation/TextArea'
import { FormLayout  } from '../../composite/FormLayout'
import { FormField  } from '../../composite/FormField'
import { cn } from '../../../utils/cn'

const beneficiarySchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  medicareNumber: z.string().min(1, 'Medicare number is required')
})

const serviceSchema = z.object({
  serviceDate: z.string().min(1, 'Service date is required'),
  serviceDescription: z.string().min(1, 'Service description is required'),
  reasonForRedetermination: z.string().min(1, 'Reason for redetermination is required')
})

const redeterminationSchema = z.object({
  beneficiary: beneficiarySchema,
  service: serviceSchema
})

type RedeterminationFormData = z.infer<typeof redeterminationSchema>

export function MedicareRedeterminationForm() {
  const methods = useForm<RedeterminationFormData>({
    resolver: zodResolver(redeterminationSchema),
    defaultValues: {
      beneficiary: {
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        medicareNumber: ''
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

  const control = methods.control as Control<RedeterminationFormData>

  return (
    <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
      <FormLayout gap={6}>
        <FormField label="Beneficiary Information">
          <FormLayout columns={2}>
            <FormField label="First Name" required>
              <Controller
                name="beneficiary.firstName"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Enter first name"
                  />
                )}
              />
            </FormField>
            <FormField label="Last Name" required>
              <Controller
                name="beneficiary.lastName"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Enter last name"
                  />
                )}
              />
            </FormField>
            <FormField label="Date of Birth" required>
              <Controller
                name="beneficiary.dateOfBirth"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    placeholder="MM/DD/YYYY"
                  />
                )}
              />
            </FormField>
            <FormField label="Medicare Number" required>
              <Controller
                name="beneficiary.medicareNumber"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Enter Medicare number"
                  />
                )}
              />
            </FormField>
          </FormLayout>
        </FormField>

        <FormField label="Service Information">
          <FormLayout columns={2}>
            <FormField label="Service Date" required>
              <Controller
                name="service.serviceDate"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    placeholder="MM/DD/YYYY"
                  />
                )}
              />
            </FormField>
            <FormField label="Service Description" required>
              <Controller
                name="service.serviceDescription"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Enter service description"
                  />
                )}
              />
            </FormField>
            <FormField label="Reason for Redetermination" required className="col-span-2">
              <Controller
                name="service.reasonForRedetermination"
                control={control}
                render={({ field }) => (
                  <TextArea
                    {...field}
                    placeholder="Enter reason for redetermination"
                  />
                )}
              />
            </FormField>
          </FormLayout>
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
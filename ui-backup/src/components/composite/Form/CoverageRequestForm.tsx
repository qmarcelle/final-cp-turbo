import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Input  } from '../../foundation/Input'
import { FormLayout  } from '../FormLayout/FormLayout'
import { FormField  } from '../FormField/FormField'
import { fieldBuilders } from '../../../utils/form-validation'
import type { FormFieldValues  } from '../../../utils/types/form'

const enrolleeSchema = z.object({
  ...fieldBuilders.name('Enrollee'),
  ...fieldBuilders.contact('Enrollee'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  memberId: z.string().min(1, 'Member ID is required'),
})

const requestorSchema = z.object({
  ...fieldBuilders.name('Requestor'),
  ...fieldBuilders.address('Requestor'),
  ...fieldBuilders.contact('Requestor'),
  relationship: z.string().min(1, 'Relationship is required'),
})

const drugSchema = z.object({
  name: z.string().min(1, 'Drug name is required'),
  strength: z.string().optional(),
  quantity: z.number().optional(),
})

const prescriberSchema = z.object({
  name: z.string().min(1, 'Prescriber name is required'),
  npi: z.string().min(1, 'NPI is required'),
})

const coverageRequestSchema = z.object({
  enrollee: enrolleeSchema,
  requestor: requestorSchema,
  drug: drugSchema,
  prescriber: prescriberSchema,
})

type CoverageRequestFormData = z.infer<typeof coverageRequestSchema>

export default function CoverageRequestForm() {
  const methods = useForm<CoverageRequestFormData & FormFieldValues>({
    resolver: zodResolver(coverageRequestSchema),
  })

  const onSubmit = (data: CoverageRequestFormData) => {
    console.log(data)
  }

  return (
    <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-8">
      <section>
        <h2 className="text-xl font-semibold mb-4">Enrollee Information</h2>
        <FormLayout variant="grid" columns={3} gap={4}>
          <FormField label="First Name" required>
            <Input
              name="enrollee.firstName"
              control={methods.control}
            />
          </FormField>
          <FormField label="Middle Initial">
            <Input
              name="enrollee.middleInitial"
              control={methods.control}
            />
          </FormField>
          <FormField label="Last Name" required>
            <Input
              name="enrollee.lastName"
              control={methods.control}
            />
          </FormField>
          <FormField label="Date of Birth" required>
            <Input
              name="enrollee.dateOfBirth"
              control={methods.control}
              type="text"
              placeholder="MM/DD/YYYY"
            />
          </FormField>
          <FormField label="Member ID" required>
            <Input
              name="enrollee.memberId"
              control={methods.control}
            />
          </FormField>
          <FormField label="Phone">
            <Input
              name="enrollee.phone"
              control={methods.control}
              type="tel"
            />
          </FormField>
        </FormLayout>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Requestor Information</h2>
        <FormLayout variant="grid" columns={3} gap={4}>
          <FormField label="First Name" required>
            <Input
              name="requestor.firstName"
              control={methods.control}
            />
          </FormField>
          <FormField label="Middle Initial">
            <Input
              name="requestor.middleInitial"
              control={methods.control}
            />
          </FormField>
          <FormField label="Last Name" required>
            <Input
              name="requestor.lastName"
              control={methods.control}
            />
          </FormField>
          <FormField label="Relationship to Enrollee" required>
            <Input
              name="requestor.relationship"
              control={methods.control}
            />
          </FormField>
          <FormField label="Phone">
            <Input
              name="requestor.phone"
              control={methods.control}
              type="tel"
            />
          </FormField>
          <FormField label="Email">
            <Input
              name="requestor.email"
              control={methods.control}
              type="email"
            />
          </FormField>
        </FormLayout>

        <FormLayout variant="grid" columns={1} gap={4} className="mt-4">
          <FormField label="Address 1" required>
            <Input
              name="requestor.address1"
              control={methods.control}
            />
          </FormField>
          <FormField label="Address 2">
            <Input
              name="requestor.address2"
              control={methods.control}
            />
          </FormField>
        </FormLayout>

        <FormLayout variant="grid" columns={3} gap={4} className="mt-4">
          <FormField label="City" required>
            <Input
              name="requestor.city"
              control={methods.control}
            />
          </FormField>
          <FormField label="State" required>
            <Input
              name="requestor.state"
              control={methods.control}
            />
          </FormField>
          <FormField label="Zip Code" required>
            <Input
              name="requestor.zipCode"
              control={methods.control}
            />
          </FormField>
        </FormLayout>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Drug Information</h2>
        <FormLayout variant="grid" columns={3} gap={4}>
          <FormField label="Drug Name" required>
            <Input
              name="drug.name"
              control={methods.control}
            />
          </FormField>
          <FormField label="Strength">
            <Input
              name="drug.strength"
              control={methods.control}
            />
          </FormField>
          <FormField label="Quantity">
            <Input
              name="drug.quantity"
              control={methods.control}
              type="number"
            />
          </FormField>
        </FormLayout>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Prescriber Information</h2>
        <FormLayout variant="grid" columns={2} gap={4}>
          <FormField label="Prescriber Name" required>
            <Input
              name="prescriber.name"
              control={methods.control}
            />
          </FormField>
          <FormField label="NPI" required>
            <Input
              name="prescriber.npi"
              control={methods.control}
            />
          </FormField>
        </FormLayout>
      </section>

      <FormLayout variant="grid" columns={1} gap={4}>
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          Submit Request
        </button>
      </FormLayout>
    </form>
  )
} 
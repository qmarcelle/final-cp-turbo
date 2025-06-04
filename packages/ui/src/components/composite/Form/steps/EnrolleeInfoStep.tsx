"use client";

import { FieldValues, Controller, Control } from 'react-hook-form'
import { Input } from '../../../foundation/input'
import { BaseStep, type BaseStepProps, getFieldName } from './BaseStep'
import { FormSection } from '../FormSection'
import { FormLayout } from '../../../composite/FormLayout'
import { FormField } from '../../../composite/FormField'

interface EnrolleeInfoProps<T extends FieldValues> extends BaseStepProps<T> {
  fieldPrefix?: string;
  required?: boolean;
  control: Control<T>;
}

export function EnrolleeInfoStep<T extends FieldValues>({
  control,
  fieldPrefix = 'enrollee',
  required = true,
  isValid,
  ...props
}: EnrolleeInfoProps<T>) {
  const getField = (field: string) => getFieldName<T>(fieldPrefix, field)

  return (
    <BaseStep<T>
      control={control}
      fieldPrefix={fieldPrefix}
      required={required}
      isValid={isValid}
      {...props}
    >
      <div className="space-y-8">
        {/* Name & Identification */}
        <FormSection
          title="Name & Identification"
          description="Please provide your full name and identification details"
        >
          <FormLayout variant="grid" columns={3} gap={4}>
            <FormField label="First Name" required={required}>
              <Controller
                name={getField('firstName')}
                control={control}
                rules={{ required: required ? 'First name is required' : false }}
                render={({ field, fieldState: { error } }) => (
                  <Input
                    {...field}
                    placeholder="Enter your legal first name"
                    error={error?.message}
                  />
                )}
              />
            </FormField>
            <FormField label="Middle Initial">
              <Controller
                name={getField('middleInitial')}
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <Input
                    {...field}
                    placeholder="Optional"
                    error={error?.message}
                  />
                )}
              />
            </FormField>
            <FormField label="Last Name" required={required}>
              <Controller
                name={getField('lastName')}
                control={control}
                rules={{ required: required ? 'Last name is required' : false }}
                render={({ field, fieldState: { error } }) => (
                  <Input
                    {...field}
                    placeholder="Enter your legal last name"
                    error={error?.message}
                  />
                )}
              />
            </FormField>
          </FormLayout>
          
          <FormLayout variant="grid" columns={2} gap={4} className="mt-4">
            <FormField label="Date of Birth" required={required}>
              <Controller
                name={getField('dateOfBirth')}
                control={control}
                rules={{ required: required ? 'Date of birth is required' : false }}
                render={({ field, fieldState: { error } }) => (
                  <Input
                    {...field}
                    type="text"
                    placeholder="MM/DD/YYYY"
                    mask={{ mask: '00/00/0000' }}
                    error={error?.message}
                  />
                )}
              />
            </FormField>
            <FormField label="Member ID Number" required={required}>
              <Controller
                name={getField('memberId')}
                control={control}
                rules={{ required: required ? 'Member ID is required' : false }}
                render={({ field, fieldState: { error } }) => (
                  <Input
                    {...field}
                    placeholder="Enter your member identification number"
                    error={error?.message}
                  />
                )}
              />
            </FormField>
          </FormLayout>
        </FormSection>

        {/* Contact Information */}
        <FormSection
          title="Contact Information"
          description="How can we reach you?"
        >
          <FormLayout variant="grid" columns={2} gap={4}>
            <FormField label="Phone Number" required={required}>
              <Controller
                name={getField('phone')}
                control={control}
                rules={{ required: required ? 'Phone number is required' : false }}
                render={({ field, fieldState: { error } }) => (
                  <Input
                    {...field}
                    type="tel"
                    placeholder="(XXX) XXX-XXXX"
                    mask={{ mask: '(000) 000-0000' }}
                    error={error?.message}
                  />
                )}
              />
            </FormField>
            <FormField label="Email Address">
              <Controller
                name={getField('email')}
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <Input
                    {...field}
                    type="email"
                    placeholder="Optional - Enter your email address for notifications"
                    error={error?.message}
                  />
                )}
              />
            </FormField>
          </FormLayout>
        </FormSection>

        {/* Address */}
        <FormSection
          title="Mailing Address"
          description="Where should we send correspondence?"
        >
          <FormLayout variant="grid" columns={1} gap={4}>
            <FormField label="Street Address" required={required}>
              <Controller
                name={getField('address1')}
                control={control}
                rules={{ required: required ? 'Street address is required' : false }}
                render={({ field, fieldState: { error } }) => (
                  <Input
                    {...field}
                    placeholder="Enter your street address"
                    error={error?.message}
                  />
                )}
              />
            </FormField>
            <FormField label="Apt/Suite/Unit">
              <Controller
                name={getField('address2')}
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <Input
                    {...field}
                    placeholder="Optional - Enter additional address information"
                    error={error?.message}
                  />
                )}
              />
            </FormField>
          </FormLayout>

          <FormLayout variant="grid" columns={3} gap={4} className="mt-4">
            <FormField label="City" required={required}>
              <Controller
                name={getField('city')}
                control={control}
                rules={{ required: required ? 'City is required' : false }}
                render={({ field, fieldState: { error } }) => (
                  <Input
                    {...field}
                    placeholder="Enter city"
                    error={error?.message}
                  />
                )}
              />
            </FormField>
            <FormField label="State" required={required}>
              <Controller
                name={getField('state')}
                control={control}
                rules={{ required: required ? 'State is required' : false }}
                render={({ field, fieldState: { error } }) => (
                  <Input
                    {...field}
                    placeholder="Enter state"
                    error={error?.message}
                  />
                )}
              />
            </FormField>
            <FormField label="ZIP Code" required={required}>
              <Controller
                name={getField('zipCode')}
                control={control}
                rules={{ required: required ? 'ZIP code is required' : false }}
                render={({ field, fieldState: { error } }) => (
                  <Input
                    {...field}
                    placeholder="Enter 5-digit ZIP code"
                    mask={{ mask: '00000' }}
                    error={error?.message}
                  />
                )}
              />
            </FormField>
          </FormLayout>
        </FormSection>
      </div>
    </BaseStep>
  )
} 
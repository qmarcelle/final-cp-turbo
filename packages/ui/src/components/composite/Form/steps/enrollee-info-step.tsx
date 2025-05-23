import { FieldValues } from 'react-hook-form'
import { Input  } from '../../../foundation/input/input'
import { BaseStep, type BaseStepProps, getFieldName } from './base-step'
import { FormSection } from '../form-section'
import { FormLayout  } from '../../../composite/form-layout'
import { FormField  } from '../../../composite/form-field'

interface EnrolleeInfoProps<T extends FieldValues> extends BaseStepProps<T> {
  fieldPrefix?: string;
  required?: boolean;
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
              <Input
                name={getField('firstName')}
                control={control}
                placeholder="Enter your legal first name"
              />
            </FormField>
            <FormField label="Middle Initial">
              <Input
                name={getField('middleInitial')}
                control={control}
                placeholder="Optional"
              />
            </FormField>
            <FormField label="Last Name" required={required}>
              <Input
                name={getField('lastName')}
                control={control}
                placeholder="Enter your legal last name"
              />
            </FormField>
          </FormLayout>
          
          <FormLayout variant="grid" columns={2} gap={4} className="mt-4">
            <FormField label="Date of Birth" required={required}>
              <Input
                name={getField('dateOfBirth')}
                control={control}
                type="text"
                placeholder="MM/DD/YYYY"
                mask={{ mask: '00/00/0000' }}
              />
            </FormField>
            <FormField label="Member ID Number" required={required}>
              <Input
                name={getField('memberId')}
                control={control}
                placeholder="Enter your member identification number"
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
              <Input
                name={getField('phone')}
                control={control}
                type="tel"
                placeholder="(XXX) XXX-XXXX"
                mask={{ mask: '(000) 000-0000' }}
              />
            </FormField>
            <FormField label="Email Address">
              <Input
                name={getField('email')}
                control={control}
                type="email"
                placeholder="Optional - Enter your email address for notifications"
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
              <Input
                name={getField('address1')}
                control={control}
                placeholder="Enter your street address"
              />
            </FormField>
            <FormField label="Apt/Suite/Unit">
              <Input
                name={getField('address2')}
                control={control}
                placeholder="Optional - Enter additional address information"
              />
            </FormField>
          </FormLayout>

          <FormLayout variant="grid" columns={3} gap={4} className="mt-4">
            <FormField label="City" required={required}>
              <Input
                name={getField('city')}
                control={control}
                placeholder="Enter city"
              />
            </FormField>
            <FormField label="State" required={required}>
              <Input
                name={getField('state')}
                control={control}
                placeholder="Enter state"
              />
            </FormField>
            <FormField label="ZIP Code" required={required}>
              <Input
                name={getField('zipCode')}
                control={control}
                placeholder="Enter 5-digit ZIP code"
                mask={{ mask: '00000' }}
              />
            </FormField>
          </FormLayout>
        </FormSection>
      </div>
    </BaseStep>
  )
} 
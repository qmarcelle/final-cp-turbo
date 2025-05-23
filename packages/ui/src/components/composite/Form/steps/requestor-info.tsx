import { Control, FieldValues, Path } from 'react-hook-form';
import { Input } from '@/components/foundation/input';
import { BaseStep, type BaseStepProps, getFieldName } from './base-step';
import { FormSection } from '../form-section';

interface RequestorInfoProps<T extends FieldValues = FieldValues> extends BaseStepProps<T> {
  fieldPrefix?: string;
  required?: boolean;
}

export function RequestorInfoStep<T extends FieldValues = FieldValues>({
  control,
  fieldPrefix = 'requestor',
  required = false,
  isValid,
  ...props
}: RequestorInfoProps<T>) {
  const getField = (field: string) => getFieldName<T>(fieldPrefix, field) as Path<T>;

  return (
    <BaseStep<T>
      control={control}
      fieldPrefix={fieldPrefix}
      required={required}
      isValid={isValid}
      {...props}
    >
      <div className="space-y-8">
        <div className="rounded-lg bg-blue-50 p-4">
          <p className="text-sm text-blue-700">
            Complete this section ONLY if the person making this request is not the enrollee or prescriber.
          </p>
        </div>

        {/* Personal Information */}
        <FormSection
          title="Personal Information"
          description="Please provide information about the person making this request"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              name={getField('firstName')}
              control={control}
              label="First Name"
              required={required}
              helpText="Enter your legal first name"
            />
            <Input
              name={getField('middleInitial')}
              control={control}
              label="Middle Initial"
              helpText="Optional"
            />
            <Input
              name={getField('lastName')}
              control={control}
              label="Last Name"
              required={required}
              helpText="Enter your legal last name"
            />
          </div>
        </FormSection>

        {/* Contact Information */}
        <FormSection
          title="Contact Information"
          description="How can we reach you?"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              name={getField('relationship')}
              control={control}
              label="Relationship to Enrollee"
              required={required}
              helpText="Specify your relationship to the enrollee (e.g., family member, attorney, physician)"
            />
            <Input
              name={getField('phone')}
              control={control}
              label="Phone Number"
              type="tel"
              required={required}
              helpText="Enter your primary phone number"
              placeholder="(XXX) XXX-XXXX"
            />
          </div>
        </FormSection>

        {/* Address */}
        <FormSection
          title="Mailing Address"
          description="Where should we send correspondence?"
        >
          <div className="space-y-4">
            <Input
              name={getField('address1')}
              control={control}
              label="Street Address"
              required={required}
              helpText="Enter your street address"
            />
            <Input
              name={getField('address2')}
              control={control}
              label="Apt/Suite/Unit"
              helpText="Optional - Enter additional address information"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                name={getField('city')}
                control={control}
                label="City"
                required={required}
              />
              <Input
                name={getField('state')}
                control={control}
                label="State"
                required={required}
              />
              <Input
                name={getField('zipCode')}
                control={control}
                label="ZIP Code"
                required={required}
                helpText="Enter your 5-digit ZIP code"
              />
            </div>
          </div>
        </FormSection>
      </div>
    </BaseStep>
  );
} 
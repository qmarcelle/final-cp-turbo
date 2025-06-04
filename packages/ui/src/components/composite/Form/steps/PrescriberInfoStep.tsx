import { FieldValues } from 'react-hook-form';
import { Input } from '../../../foundation/input';
import { BaseStep, type BaseStepProps, getFieldName } from './BaseStep';
import { FormSection } from '../FormSection';
import { FormLayout  } from '../../../composite/FormLayout/FormLayout';
import { FormField  } from '../../../composite/FormField/FormField';

interface PrescriberInfoProps<T extends FieldValues> extends BaseStepProps<T> {
  fieldPrefix?: string;
  required?: boolean;
}

export function PrescriberInfoStep<T extends FieldValues>({
  control,
  fieldPrefix = 'prescriber',
  required = true,
  isValid,
  ...props
}: PrescriberInfoProps<T>) {
  const getField = (field: string) => getFieldName<T>(fieldPrefix, field);

  return (
    <BaseStep<T>
      control={control}
      fieldPrefix={fieldPrefix}
      required={required}
      isValid={isValid}
      {...props}
    >
      <div className="space-y-8">
        {/* Prescriber Identification */}
        <FormSection
          title="Prescriber Identification"
          description="Please provide the prescriber's information"
        >
          <FormLayout variant="grid" columns={2} gap={4}>
            <FormField label="Prescriber Name" required={required}>
              <Input
                name={getField('name')}
                control={control}
                placeholder="Enter prescriber's full name"
              />
            </FormField>
            <FormField label="NPI Number" required={required}>
              <Input
                name={getField('npi')}
                control={control}
                placeholder="Enter 10-digit NPI number"
                mask={{ mask: '0000000000' }}
              />
            </FormField>
          </FormLayout>
        </FormSection>

        {/* Contact Information */}
        <FormSection
          title="Contact Information"
          description="How can we reach the prescriber's office?"
        >
          <FormLayout variant="grid" columns={2} gap={4}>
            <FormField label="Office Phone" required={required}>
              <Input
                name={getField('phone')}
                control={control}
                type="tel"
                placeholder="(XXX) XXX-XXXX"
                mask={{ mask: '(000) 000-0000' }}
              />
            </FormField>
            <FormField label="Office Fax">
              <Input
                name={getField('fax')}
                control={control}
                type="tel"
                placeholder="(XXX) XXX-XXXX"
                mask={{ mask: '(000) 000-0000' }}
              />
            </FormField>
          </FormLayout>
        </FormSection>

        {/* Office Address */}
        <FormSection
          title="Office Address"
          description="Where is the prescriber's office located?"
        >
          <FormLayout variant="grid" columns={1} gap={4}>
            <FormField label="Street Address" required={required}>
              <Input
                name={getField('address1')}
                control={control}
                placeholder="Enter office street address"
              />
            </FormField>
            <FormField label="Suite/Unit">
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
  );
} 
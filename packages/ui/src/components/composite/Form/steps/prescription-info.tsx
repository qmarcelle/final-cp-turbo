import { FieldValues } from 'react-hook-form';
import { Input } from '@/components/foundation/input';
import { RadioGroup } from '@/components/foundation/radio';
import { BaseStep, type BaseStepProps, getFieldName } from './base-step';
import { FormSection } from '../form-section';

const requestTypeOptions = [
  { value: "NOT_ON_LIST", label: "I need a drug that is not on the plan's list of covered drugs (formulary exception)." },
  { value: "TRIED_DRUG_NOT_WORKING", label: "I have been using a drug that was previously included on the plan's list of covered drugs, but is being removed or was removed from this list during the plan year." },
  { value: "AUTHORIZATION_NEEDED", label: "I request prior authorization for the drug my prescriber has prescribed." },
  { value: "EXCEPTION_NEEDED", label: "I request an exception to the requirement that I try another drug before I get the drug my prescriber prescribed." },
  { value: "QUANTITY_LIMIT", label: "I request an exception to the plan's limit on the number of pills I can receive." },
  { value: "TIER_EXCEPTION", label: "My drug plan charges a higher copayment for the drug my prescriber prescribed than it charges for another drug that treats my condition." },
  { value: "PREVIOUSLY_INCLUDED", label: "I have been using a drug that was previously included on a lower copayment tier, but is being moved to or was moved to a higher copayment tier." },
  { value: "HIGHER_COPAYMENT", label: "My drug plan charged me a higher copayment for a drug than it should have." },
  { value: "OUT_OF_POCKET", label: "I want to be reimbursed for a covered prescription drug that I paid for out of pocket." }
];

interface PrescriptionInfoProps<T extends FieldValues> extends BaseStepProps<T> {
  fieldPrefix?: string;
  required?: boolean;
}

export function PrescriptionInfo<T extends FieldValues>({
  control,
  fieldPrefix = 'prescription',
  required = true,
  isValid,
  ...props
}: PrescriptionInfoProps<T>) {
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
        {/* Drug Information */}
        <FormSection
          title="Drug Information"
          description="Please provide details about the prescription medication"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <Input
                name={getField('name')}
                control={control}
                label="Drug Name"
                required={required}
                placeholder="Enter the name of the medication as it appears on your prescription"
              />
            </div>
            <Input
              name={getField('strength')}
              control={control}
              label="Drug Strength"
              required={required}
              placeholder="Enter the strength (e.g., 50mg, 100mg)"
            />
            <Input
              name={getField('quantityPerMonth')}
              control={control}
              label="Quantity per Month"
              required={required}
              placeholder="Enter the number of pills/units needed per month"
              type="number"
            />
          </div>
        </FormSection>

        {/* Request Type */}
        <FormSection
          title="Type of Coverage Determination Request"
          description="Please select the reason for your request"
        >
          <div className="rounded-lg border border-gray-200 bg-gray-50/50 p-4">
            <RadioGroup
              name={getField('requestType')}
              control={control}
              options={requestTypeOptions}
              required={required}
              direction="vertical"
            />
          </div>
        </FormSection>

        {/* Additional Information */}
        <FormSection
          title="Additional Information"
          description="Please provide any additional details that may help us process your request"
        >
          <Input
            name={getField('additionalInformation')}
            control={control}
            type="textarea"
            label="Additional Details"
            placeholder="Enter any additional information that may be important for your request"
            minRows={3}
            maxRows={10}
            autoResize
          />
        </FormSection>
      </div>
    </BaseStep>
  );
} 
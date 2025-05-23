import type { FieldValues, Path } from 'react-hook-form';
import { Input } from '@/components/foundation/input';
import { RadioGroup } from '@/components/foundation/radio';
import { Checkbox } from '@/components/foundation/checkbox';
import { BaseStepProps } from '../base-form';

interface RepresentativeStepProps<T extends FieldValues> extends BaseStepProps<T> {
  fieldPrefix?: string;
  required?: boolean;
  showPartyType?: boolean;
  showProofUpload?: boolean;
}

const partyTypeOptions = [
  { value: 'enrollee', label: 'I am the enrollee' },
  { value: 'representative', label: 'I am a representative of the enrollee' },
];

export function RepresentativeStep<T extends FieldValues>({
  control,
  fieldPrefix = 'representative',
  required = false,
  showPartyType = false,
  showProofUpload = false,
}: RepresentativeStepProps<T>) {
  const getFieldName = (field: string): Path<T> => 
    `${fieldPrefix}.${field}` as Path<T>;

  return (
    <div className="space-y-6">
      {showPartyType && (
        <div className="mb-6">
          <RadioGroup<T>
            name={'partyType' as Path<T>}
            control={control}
            options={partyTypeOptions}
            label="Who is submitting this request?"
            required
          />
        </div>
      )}

      <div>
        <Checkbox
          name={getFieldName('isRepresentative')}
          control={control}
          label="I am helping the enrollee with this request"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          name={getFieldName('firstName')}
          control={control}
          label="First Name"
          required={required}
        />
        <Input
          name={getFieldName('middleInitial')}
          control={control}
          label="Middle Initial"
        />
        <Input
          name={getFieldName('lastName')}
          control={control}
          label="Last Name"
          required={required}
        />
        <Input
          name={getFieldName('relationship')}
          control={control}
          label="Relationship to Enrollee"
          required={required}
        />
        <Input
          name={getFieldName('phone')}
          control={control}
          label="Phone"
          type="tel"
          required={required}
        />
        <div className="md:col-span-3">
          <Input
            name={getFieldName('address1')}
            control={control}
            label="Address 1"
            required={required}
          />
        </div>
        <div className="md:col-span-3">
          <Input
            name={getFieldName('address2')}
            control={control}
            label="Address 2"
          />
        </div>
        <Input
          name={getFieldName('city')}
          control={control}
          label="City"
          required={required}
        />
        <Input
          name={getFieldName('state')}
          control={control}
          label="State"
          required={required}
        />
        <Input
          name={getFieldName('zipCode')}
          control={control}
          label="Zip Code"
          required={required}
        />
      </div>

      {showProofUpload && (
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700">
            Proof of Representation
          </label>
          <p className="text-sm text-gray-600 mt-1">
            Please upload documentation showing your authority to represent the enrollee (e.g., Power of Attorney)
          </p>
          <input
            type="file"
            className="mt-2 block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />
        </div>
      )}
    </div>
  );
} 
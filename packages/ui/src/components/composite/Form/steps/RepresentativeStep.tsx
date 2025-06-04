"use client";

import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import { Input } from '../../../foundation/input';
import { RadioGroup } from '../../../foundation/radio';
import { Checkbox } from '../../../foundation/checkbox';
import { BaseStepProps } from '../BaseForm';

interface RepresentativeStepProps<T extends FieldValues> extends BaseStepProps<T> {
  fieldPrefix?: string;
  required?: boolean;
  showPartyType?: boolean;
  showProofUpload?: boolean;
  control: Control<T>;
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
        <Checkbox<T>
          name={getFieldName('isRepresentative')}
          control={control}
          label="I am helping the enrollee with this request"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Controller
          name={getFieldName('firstName')}
          control={control}
          rules={{ required }}
          render={({ field, fieldState: { error } }) => (
            <Input {...field} label="First Name" required={required} error={error?.message} />
          )}
        />
        <Controller
          name={getFieldName('middleInitial')}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <Input {...field} label="Middle Initial" error={error?.message} />
          )}
        />
        <Controller
          name={getFieldName('lastName')}
          control={control}
          rules={{ required }}
          render={({ field, fieldState: { error } }) => (
            <Input {...field} label="Last Name" required={required} error={error?.message} />
          )}
        />
        <Controller
          name={getFieldName('relationship')}
          control={control}
          rules={{ required }}
          render={({ field, fieldState: { error } }) => (
            <Input {...field} label="Relationship to Enrollee" required={required} error={error?.message} />
          )}
        />
        <Controller
          name={getFieldName('phone')}
          control={control}
          rules={{ required }}
          render={({ field, fieldState: { error } }) => (
            <Input {...field} label="Phone" type="tel" required={required} error={error?.message} />
          )}
        />
        <div className="md:col-span-3">
          <Controller
            name={getFieldName('address1')}
            control={control}
            rules={{ required }}
            render={({ field, fieldState: { error } }) => (
              <Input {...field} label="Address 1" required={required} error={error?.message} />
            )}
          />
        </div>
        <div className="md:col-span-3">
          <Controller
            name={getFieldName('address2')}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Input {...field} label="Address 2" error={error?.message} />
            )}
          />
        </div>
        <Controller
          name={getFieldName('city')}
          control={control}
          rules={{ required }}
          render={({ field, fieldState: { error } }) => (
            <Input {...field} label="City" required={required} error={error?.message} />
          )}
        />
        <Controller
          name={getFieldName('state')}
          control={control}
          rules={{ required }}
          render={({ field, fieldState: { error } }) => (
            <Input {...field} label="State" required={required} error={error?.message} />
          )}
        />
        <Controller
          name={getFieldName('zipCode')}
          control={control}
          rules={{ required }}
          render={({ field, fieldState: { error } }) => (
            <Input {...field} label="Zip Code" required={required} error={error?.message} />
          )}
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
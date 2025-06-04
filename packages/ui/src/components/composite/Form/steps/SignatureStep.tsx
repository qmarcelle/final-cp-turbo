"use client";

import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import { Input } from '../../../foundation/input';
import { BaseStepProps } from '../BaseForm';

interface SignatureStepProps<T extends FieldValues> extends BaseStepProps<T> {
  fieldPrefix?: string;
  required?: boolean;
  showRepresentativeNote?: boolean;
  title?: string;
  description?: string;
  control: Control<T>;
}

export function SignatureStep<T extends FieldValues>({
  control,
  fieldPrefix = 'signature',
  required = true,
  showRepresentativeNote = false,
  title = 'Review and Sign',
  description = 'By signing below, you confirm that the information provided is accurate and true to the best of your knowledge.',
}: SignatureStepProps<T>) {
  const getFieldName = (field: string): Path<T> => 
    `${fieldPrefix}.${field}` as Path<T>;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">{title}</h3>
        <p className="text-sm text-gray-600 mb-6">
          {description}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Controller
          name={getFieldName('signatureData')}
          control={control}
          rules={{ required }}
          render={({ field, fieldState: { error } }) => (
            <Input 
              {...field} 
              label="Signature" 
              required={required} 
              placeholder="Type your full name" 
              error={error?.message}
            />
          )}
        />
        <Controller
          name={getFieldName('date')}
          control={control}
          rules={{ required }}
          render={({ field, fieldState: { error } }) => (
            <Input 
              {...field} 
              label="Date" 
              type="text" 
              placeholder="MM/DD/YYYY" 
              required={required} 
              error={error?.message}
            />
          )}
        />
      </div>

      {showRepresentativeNote && (
        <div className="mt-8">
          <p className="text-sm text-gray-600">
            Note: If you are a representative helping the enrollee with this request, you must provide proof of representation.
          </p>
        </div>
      )}
    </div>
  );
} 
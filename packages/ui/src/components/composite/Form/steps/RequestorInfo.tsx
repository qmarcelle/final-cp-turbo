"use client";

import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import { Input } from '../../../foundation/input';
import { BaseStep, type BaseStepProps, getFieldName } from './BaseStep';
import { FormSection } from '../FormSection';

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
            <Controller
              name={getField('firstName')}
              control={control}
              rules={{ required: required ? 'First name is required' : false }}
              render={({ field, fieldState: { error } }) => (
                <Input
                  {...field}
                  label="First Name"
                  required={required}
                  placeholder="Enter your legal first name"
                  error={error?.message}
                  helpText="Enter your legal first name"
                  data-cy="requestor-firstName"
                />
              )}
            />
            <Controller
              name={getField('middleInitial')}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <Input
                  {...field}
                  label="Middle Initial"
                  placeholder="Optional"
                  error={error?.message}
                  helpText="Optional"
                  data-cy="requestor-middleInitial"
                />
              )}
            />
            <Controller
              name={getField('lastName')}
              control={control}
              rules={{ required: required ? 'Last name is required' : false }}
              render={({ field, fieldState: { error } }) => (
                <Input
                  {...field}
                  label="Last Name"
                  required={required}
                  placeholder="Enter your legal last name"
                  error={error?.message}
                  helpText="Enter your legal last name"
                  data-cy="requestor-lastName"
                />
              )}
            />
          </div>
        </FormSection>

        {/* Contact Information */}
        <FormSection
          title="Contact Information"
          description="How can we reach you?"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Controller
              name={getField('relationship')}
              control={control}
              rules={{ required: required ? 'Relationship to Enrollee is required' : false }}
              render={({ field, fieldState: { error } }) => (
                <Input
                  {...field}
                  label="Relationship to Enrollee"
                  required={required}
                  placeholder="Specify your relationship"
                  error={error?.message}
                  helpText="Specify your relationship to the enrollee (e.g., family member, attorney, physician)"
                  data-cy="requestor-relationship"
                />
              )}
            />
            <Controller
              name={getField('phone')}
              control={control}
              rules={{ required: required ? 'Phone number is required' : false }}
              render={({ field, fieldState: { error } }) => (
                <Input
                  {...field}
                  label="Phone Number"
                  type="tel"
                  required={required}
                  placeholder="(XXX) XXX-XXXX"
                  error={error?.message}
                  helpText="Enter your primary phone number"
                  data-cy="requestor-phone"
                />
              )}
            />
          </div>
        </FormSection>

        {/* Address */}
        <FormSection
          title="Mailing Address"
          description="Where should we send correspondence?"
        >
          <div className="space-y-4">
            <Controller
              name={getField('address1')}
              control={control}
              rules={{ required: required ? 'Street address is required' : false }}
              render={({ field, fieldState: { error } }) => (
                <Input
                  {...field}
                  label="Street Address"
                  required={required}
                  placeholder="Enter your street address"
                  error={error?.message}
                  helpText="Enter your street address"
                  data-cy="requestor-address1"
                />
              )}
            />
            <Controller
              name={getField('address2')}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <Input
                  {...field}
                  label="Apt/Suite/Unit"
                  placeholder="Optional"
                  error={error?.message}
                  helpText="Optional - Enter additional address information"
                  data-cy="requestor-address2"
                />
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Controller
                name={getField('city')}
                control={control}
                rules={{ required: required ? 'City is required' : false }}
                render={({ field, fieldState: { error } }) => (
                  <Input
                    {...field}
                    label="City"
                    required={required}
                    placeholder="Enter city"
                    error={error?.message}
                    data-cy="requestor-city"
                  />
                )}
              />
              <Controller
                name={getField('state')}
                control={control}
                rules={{ required: required ? 'State is required' : false }}
                render={({ field, fieldState: { error } }) => (
                  <Input
                    {...field}
                    label="State"
                    required={required}
                    placeholder="Enter state"
                    error={error?.message}
                    data-cy="requestor-state"
                  />
                )}
              />
              <Controller
                name={getField('zipCode')}
                control={control}
                rules={{ required: required ? 'ZIP code is required' : false }}
                render={({ field, fieldState: { error } }) => (
                  <Input
                    {...field}
                    label="ZIP Code"
                    required={required}
                    placeholder="Enter 5-digit ZIP code"
                    error={error?.message}
                    helpText="Enter your 5-digit ZIP code"
                    data-cy="requestor-zipCode"
                  />
                )}
              />
            </div>
          </div>
        </FormSection>
      </div>
    </BaseStep>
  );
} 
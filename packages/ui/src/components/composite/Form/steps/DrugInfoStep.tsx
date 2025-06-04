"use client";

import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import { Input } from '../../../foundation/input';
import { RadioGroup } from '../../../foundation/radio';
import { Checkbox } from '../../../foundation/checkbox';
import { BaseStepProps } from '../BaseForm';

interface DrugInfoStepProps<T extends FieldValues> extends BaseStepProps<T> {
  fieldPrefix?: string;
  required?: boolean;
  showRequestType?: boolean;
  showPurchaseInfo?: boolean;
  showQuantityPerMonth?: boolean;
  control: Control<T>; 
}

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

export function DrugInfoStep<T extends FieldValues>({
  control,
  fieldPrefix = 'prescription',
  required = true,
  showRequestType = false,
  showPurchaseInfo = false,
  showQuantityPerMonth = false,
}: DrugInfoStepProps<T>) {
  const getFieldName = (field: string): Path<T> => 
    `${fieldPrefix}.${field}` as Path<T>;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <Controller
            name={getFieldName('name')}
            control={control}
            rules={{ required: required ? 'Drug name is required' : false }}
            render={({ field, fieldState: { error } }) => (
              <Input
                {...field}
                label="Drug Name"
                required={required}
                error={error?.message}
              />
            )}
          />
        </div>
        <Controller
          name={getFieldName('strength')}
          control={control}
          rules={{ required: required ? 'Drug strength is required' : false }}
          render={({ field, fieldState: { error } }) => (
            <Input
              {...field}
              label="Drug Strength"
              required={required}
              error={error?.message}
            />
          )}
        />
        <Controller
          name={getFieldName('quantity')}
          control={control}
          rules={{ required: required ? 'Quantity is required' : false }}
          render={({ field, fieldState: { error } }) => (
            <Input
              {...field}
              label="Quantity"
              required={required}
              error={error?.message}
            />
          )}
        />
        {showQuantityPerMonth && (
          <Controller
            name={getFieldName('quantityPerMonth')}
            control={control}
            rules={{ required: required ? 'Quantity per month is required' : false }}
            render={({ field, fieldState: { error } }) => (
              <Input
                {...field}
                label="Quantity Requested per Month"
                required={required}
                error={error?.message}
              />
            )}
          />
        )}
      </div>

      {showPurchaseInfo && (
        <div className="space-y-4">
          <Checkbox<T> 
            name={getFieldName('purchasedPending')}
            control={control}
            label="Have you already purchased this drug?"
          />
          <Controller
            name={getFieldName('datePurchased')}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Input
                {...field}
                type="text"
                placeholder="MM/DD/YYYY"
                label="Date Purchased"
                error={error?.message}
              />
            )}
          />
          <Controller
            name={getFieldName('amountPaid')}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Input
                {...field}
                type="text"
                label="Amount Paid"
                error={error?.message}
              />
            )}
          />
          <Controller
            name={getFieldName('pharmacyInfo')}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Input
                {...field}
                label="Pharmacy Information"
                type="textarea"
                placeholder="Please provide the pharmacy name, address, and any other relevant information"
                error={error?.message}
              />
            )}
          />
        </div>
      )}

      {showRequestType && (
        <div className="mt-8">
          <h3 className="text-lg font-medium mb-4">Type of Coverage Determination Request</h3>
          <RadioGroup<T>
            name={'requestType' as Path<T>}
            control={control}
            options={requestTypeOptions}
            required={required}
          />
        </div>
      )}
    </div>
  );
} 
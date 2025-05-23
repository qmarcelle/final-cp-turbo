import { FieldValues, Path } from 'react-hook-form';
import { Input, InputProps } from '@/components/foundation/input';
import { RadioGroup } from '@/components/foundation/radio';
import { Checkbox } from '@/components/foundation/checkbox';
import { BaseStepProps } from '../base-form';

interface DrugInfoStepProps<T extends FieldValues> extends BaseStepProps<T> {
  fieldPrefix?: string;
  required?: boolean;
  showRequestType?: boolean;
  showPurchaseInfo?: boolean;
  showQuantityPerMonth?: boolean;
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
          <Input
            name={getFieldName('name')}
            control={control}
            label="Drug Name"
            required={required}
          />
        </div>
        <Input
          name={getFieldName('strength')}
          control={control}
          label="Drug Strength"
          required={required}
        />
        <Input
          name={getFieldName('quantity')}
          control={control}
          label="Quantity"
          required={required}
        />
        {showQuantityPerMonth && (
          <Input
            name={getFieldName('quantityPerMonth')}
            control={control}
            label="Quantity Requested per Month"
            required={required}
          />
        )}
      </div>

      {showPurchaseInfo && (
        <div className="space-y-4">
          <Checkbox
            name={getFieldName('purchasedPending')}
            control={control}
            label="Have you already purchased this drug?"
          />
          <Input
            name={getFieldName('datePurchased')}
            control={control}
            type="text"
            placeholder="MM/DD/YYYY"
            label="Date Purchased"
          />
          <Input
            name={getFieldName('amountPaid')}
            control={control}
            type="text"
            label="Amount Paid"
          />
          <Input
            name={getFieldName('pharmacyInfo')}
            control={control}
            label="Pharmacy Information"
            type="textarea"
            placeholder="Please provide the pharmacy name, address, and any other relevant information"
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
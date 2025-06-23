import { FieldValues } from 'react-hook-form';
import { Checkbox  } from '../../../foundation/Checkbox';
import { BaseStep, type BaseStepProps, getFieldName } from './BaseStep';
import { FormSection } from '../FormSection';

interface UrgencyInfoProps<T extends FieldValues> extends BaseStepProps<T> {
  fieldPrefix?: string;
  required?: boolean;
}

export function UrgencyInfoStep<T extends FieldValues>({
  control,
  fieldPrefix = 'urgencyInfo',
  required = false,
  isValid,
  ...props
}: UrgencyInfoProps<T>) {
  const getField = (field: string) => getFieldName<T>(fieldPrefix, field);

  return (
    <BaseStep<T>
      control={control}
      fieldPrefix={fieldPrefix}
      required={required}
      isValid={isValid}
      {...props}
    >
      <div className="space-y-6">
        <FormSection
          title="Expedited Review Request"
          description="Please indicate if you need an expedited review of your request"
        >
          <div className="rounded-lg border-2 border-yellow-200 bg-yellow-50 p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    name={getField('expeditedDecision')}
                    control={control}
                    label="CHECK THIS BOX IF YOU BELIEVE YOU NEED A DECISION WITHIN 24 HOURS"
                    className="font-medium text-yellow-800"
                  />
                </div>
                <p className="text-sm text-yellow-700">
                  If you or your prescriber believe that waiting 72 hours for a standard decision could seriously harm your life, health, or ability to regain maximum function, you can ask for an expedited (fast) decision.
                </p>
                <div className="mt-4 rounded-lg bg-yellow-100 p-4">
                  <p className="text-sm font-medium text-yellow-800">
                    Important Note:
                  </p>
                  <p className="mt-2 text-sm text-yellow-700">
                    Your prescriber may be contacted to support the expedited request. Decisions are typically made within 24 hours of receiving your prescriber&apos;s supporting statement.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </FormSection>
      </div>
    </BaseStep>
  );
} 
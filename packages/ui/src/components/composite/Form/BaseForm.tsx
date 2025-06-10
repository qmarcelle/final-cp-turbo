import { ReactNode } from 'react';
import { Control, FieldValues } from 'react-hook-form';
import { z } from 'zod';
import { MultiStepFormTemplate, FormStep } from '@/app/forms/components/MultiStepFormTemplate';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { StepProgress } from './StepProgress';
import { useState } from 'react';

export interface BaseFormProps<T extends z.ZodType> {
  schema: T;
  defaultValues: z.infer<T>;
  steps: FormStep<z.infer<T>>[];
  onSubmit: (data: z.infer<T>) => void;
  title: string;
  submitLabel?: string;
  backLabel?: string;
  nextLabel?: string;
  children?: ReactNode;
}

export interface BaseStepProps<T extends FieldValues> {
  control: Control<T>;
}

export function BaseForm<T extends z.ZodType>({
  schema,
  defaultValues,
  steps,
  onSubmit,
  title,
  submitLabel = 'Submit',
  backLabel = 'Back',
  nextLabel = 'Next',
  children,
}: BaseFormProps<T>) {
  const [currentStep, setCurrentStep] = useState(0);
  const form = useForm<z.infer<T>>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: 'onChange'
  });

  const { handleSubmit, control, trigger, formState: { isValid, errors } } = form;
  
  // Guard against empty steps array or invalid currentStep
  if (!steps || steps.length === 0) {
    return (
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          <p className="mt-2 text-sm text-red-600">
            No steps configured for this form.
          </p>
        </div>
      </div>
    );
  }

  if (currentStep >= steps.length) {
    setCurrentStep(0);
    return null; // Will re-render with correct step
  }

  const step = steps[currentStep];

  const handleNext = async () => {
    const stepFields = step.fields || [];
    const isStepValid = await trigger(stepFields as any);
    
    if (isStepValid && currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        <p className="mt-2 text-sm text-gray-600">
          Step {currentStep + 1} of {steps.length}: {step.title}
        </p>
      </div>

      <StepProgress
        steps={steps}
        currentStep={currentStep}
        className="mb-8"
      />

      <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
        <div className="p-6">
          {/* Step Description */}
          {step.description && (
            <div className="mb-6">
              <p className="text-sm text-gray-600">{step.description}</p>
            </div>
          )}

          {/* Step Content */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {step.component({ control })}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={handleBack}
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  currentStep === 0
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                }`}
                disabled={currentStep === 0}
              >
                {backLabel}
              </button>

              {currentStep === steps.length - 1 ? (
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!isValid}
                >
                  {submitLabel}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!isValid}
                >
                  {nextLabel}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 
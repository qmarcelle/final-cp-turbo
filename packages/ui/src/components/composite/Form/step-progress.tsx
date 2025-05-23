import { FormStep } from '@/app/forms/components/MultiStepFormTemplate';
import { FieldValues } from 'react-hook-form';

interface StepProgressProps<T extends FieldValues> {
  steps: FormStep<T>[];
  currentStep: number;
  className?: string;
}

export function StepProgress<T extends FieldValues>({ steps, currentStep, className = '' }: StepProgressProps<T>) {
  return (
    <div className={`mb-8 ${className}`}>
      {/* Progress Bar */}
      <div className="relative pt-2">
        <div className="overflow-hidden rounded-full bg-gray-200">
          <div
            className="h-2 rounded-full bg-blue-600 transition-all duration-300 ease-in-out"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
        
        {/* Step Indicators */}
        <div className="relative">
          <div className="absolute -top-[14px] flex w-full items-center justify-between px-2">
            {steps.map((step, index) => {
              const isCompleted = index < currentStep;
              const isCurrent = index === currentStep;
              
              return (
                <div
                  key={step.id}
                  className={`
                    flex h-7 w-7 items-center justify-center rounded-full border-2 
                    ${isCompleted ? 'border-blue-600 bg-blue-600 text-white' : 
                      isCurrent ? 'border-blue-600 bg-white text-blue-600' : 
                      'border-gray-300 bg-white text-gray-500'}
                  `}
                >
                  <span className="text-xs font-medium">{index + 1}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Step Labels */}
      <div className="mt-4 flex justify-between px-2 text-sm">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className={`flex flex-col items-center ${
              index === currentStep
                ? 'font-medium text-blue-600'
                : index < currentStep
                ? 'text-gray-600'
                : 'text-gray-400'
            }`}
            style={{ width: `${100 / steps.length}%` }}
          >
            <span className="text-center">{step.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
} 
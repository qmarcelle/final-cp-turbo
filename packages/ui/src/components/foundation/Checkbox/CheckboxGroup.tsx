import * as React from 'react';

export interface CheckboxGroupProps {
  options?: Array<{ label: string; value: string }>;
  values?: string[];
  onChange?: (values: string[]) => void;
  orientation?: 'horizontal' | 'vertical';
  selectAllLabel?: string;
}

/**
 * @deprecated This component is deprecated and will be removed in a future version.
 * Use multiple Checkbox components or a custom implementation instead.
 */
export function CheckboxGroup({
  options = [],
  values = [],
  onChange,
  orientation = 'vertical',
  selectAllLabel,
}: CheckboxGroupProps) {
  return (
    <div className="p-4 border border-yellow-500 rounded-lg bg-yellow-50 text-yellow-700">
      <h3 className="font-medium mb-2">⚠️ Deprecated Component</h3>
      <p className="text-sm">
        CheckboxGroup is deprecated and will be removed in a future version.
        Use individual Checkbox components instead.
      </p>
    </div>
  );
}
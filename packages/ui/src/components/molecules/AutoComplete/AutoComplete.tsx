'use client';

import * as React from 'react';
import { Combobox } from '@headlessui/react';
import { ChevronUpDownIcon, CheckIcon } from '@heroicons/react/24/outline';
import { cn } from '../../../utils';

export interface AutoCompleteOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface AutoCompleteProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  value?: string;
  onChange?: (value: string) => void;
  options: AutoCompleteOption[];
  loadOptions?: (query: string) => Promise<AutoCompleteOption[]>;
  error?: string;
  description?: string;
}

const AutoComplete = React.forwardRef<HTMLInputElement, AutoCompleteProps>(
  ({
    className,
    value,
    onChange,
    options: initialOptions,
    loadOptions,
    placeholder = 'Select an option',
    error,
    description,
    disabled,
    id,
    ...props
  }, ref) => {
    const [query, setQuery] = React.useState('');
    const [options, setOptions] = React.useState(initialOptions);
    const [isLoading, setIsLoading] = React.useState(false);
    const uniqueId = React.useId();
    const inputId = id || uniqueId;

    const filteredOptions = React.useMemo(() => {
      return query === ''
        ? options
        : options.filter((option) =>
            option.label
              .toLowerCase()
              .replace(/\s+/g, '')
              .includes(query.toLowerCase().replace(/\s+/g, ''))
          );
    }, [query, options]);

    const handleSearch = React.useCallback(
      async (searchQuery: string) => {
        setQuery(searchQuery);
        if (loadOptions) {
          setIsLoading(true);
          try {
            const newOptions = await loadOptions(searchQuery);
            setOptions(newOptions);
          } finally {
            setIsLoading(false);
          }
        }
      },
      [loadOptions]
    );

    return (
      <div className="space-y-2">
        <Combobox
          value={value}
          onChange={onChange}
          disabled={disabled}
          nullable
        >
          <div className="relative">
            <div
              className={cn(
                'relative w-full rounded-md border bg-background shadow-sm transition-colors',
                error && 'border-destructive',
                disabled && 'cursor-not-allowed opacity-50',
                'focus-within:border-ring focus-within:ring-2 focus-within:ring-ring',
                className
              )}
            >
              <Combobox.Input
                ref={ref}
                id={inputId}
                className={cn(
                  'w-full border-none bg-transparent py-2 pl-3 pr-10 text-sm placeholder:text-muted-foreground',
                  'focus:outline-none focus:ring-0',
                  'disabled:cursor-not-allowed'
                )}
                displayValue={(value: string) => 
                  options.find((option) => option.value === value)?.label ?? ''
                }
                onChange={(event) => handleSearch(event.target.value)}
                placeholder={placeholder}
                disabled={disabled}
                {...props}
              />
              <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                  className={cn(
                    'h-5 w-5 text-muted-foreground/60',
                    disabled && 'opacity-50'
                  )}
                  aria-hidden="true"
                />
              </Combobox.Button>
            </div>
            <Combobox.Options
              className={cn(
                'absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-popover text-popover-foreground shadow-md',
                'animate-in fade-in-0 zoom-in-95'
              )}
            >
              <div className="p-1">
                {isLoading && (
                  <div className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm">
                    Loading...
                  </div>
                )}
                {filteredOptions.length === 0 && !isLoading && (
                  <div className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm">
                    Nothing found.
                  </div>
                )}
                {filteredOptions.map((option) => (
                  <Combobox.Option
                    key={option.value}
                    value={option.value}
                    disabled={option.disabled}
                    className={({ active, disabled }) =>
                      cn(
                        'relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none',
                        'transition-colors',
                        active && 'bg-accent text-accent-foreground',
                        !disabled && 'hover:bg-accent hover:text-accent-foreground',
                        disabled && 'cursor-not-allowed opacity-50'
                      )
                    }
                  >
                    {({ selected }) => (
                      <>
                        <span className={cn('flex-1', selected && 'font-medium')}>
                          {option.label}
                        </span>
                        {selected && (
                          <CheckIcon className="ml-2 h-4 w-4" aria-hidden="true" />
                        )}
                      </>
                    )}
                  </Combobox.Option>
                ))}
              </div>
            </Combobox.Options>
          </div>
        </Combobox>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
        {error && (
          <p className="text-sm font-medium text-destructive">{error}</p>
        )}
      </div>
    );
  }
);

AutoComplete.displayName = 'AutoComplete';

export { AutoComplete }; 
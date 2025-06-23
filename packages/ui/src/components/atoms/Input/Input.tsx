'use client'

import * as React from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form'
import { cn } from '../../../utils/cn'
import { debounce } from 'lodash'
import { IMaskInput } from 'react-imask'
import { z } from 'zod'
import { cva } from 'class-variance-authority'
import { ChevronUpIcon, ChevronDownIcon, MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline'

// Define base input props
type BaseInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>,
  'onChange' | 'prefix' | 'suffix' | 'value'
>;

// Define the mask options schema
export const maskOptionsSchema = z.object({
  mask: z.union([z.string(), z.instanceof(RegExp), z.any()]), // Using any for complex mask types
  definitions: z.record(z.instanceof(RegExp)).optional(),
  prepare: z.function().args(z.string()).returns(z.string()).optional(),
  commit: z.function().args(z.string()).returns(z.string()).optional(),
  scale: z.number().optional(),
  signed: z.boolean().optional(),
  thousandsSeparator: z.string().optional(),
  padFractionalZeros: z.boolean().optional(),
  normalizeZeros: z.boolean().optional(),
  radix: z.string().optional()
})

export type InputMask = z.infer<typeof maskOptionsSchema>

const inputVariants = cva(
  'flex w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'border-input',
        error: 'border-destructive',
        success: 'border-green-500',
        warning: 'border-yellow-500',
      },
      size: {
        sm: 'h-8 px-2 text-xs',
        default: 'h-10',
        lg: 'h-12 px-4 text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface InputProps extends BaseInputProps {
  name: string;
  type?: 'text' | 'email' | 'password' | 'tel' | 'number' | 'textarea' | 'search' | 'url';
  label?: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  maxLength?: number;
  showCount?: boolean;
  autoResize?: boolean;
  debounceMs?: number;
  minRows?: number;
  maxRows?: number;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  mask?: InputMask;
  className?: string;
  'data-cy'?: string;
  onBlur?: () => void;
  onChange?: (value: string) => void;
  value?: string | number;
  error?: string;
  helpText?: string;
  min?: number;
  max?: number;
  step?: number;
  precision?: number;
  showControls?: boolean;
  numberFormat?: {
    locale?: string;
    options?: Intl.NumberFormatOptions;
  };
  validateNumber?: (num: number) => number | undefined;
  onNumberChange?: (value: number | undefined) => void;
  register?: UseFormRegister<FieldValues>;
  resize?: boolean | 'none' | 'both' | 'horizontal' | 'vertical';
  description?: string;
  rows?: number;
  onSearch?: (value: string) => void;
  onClear?: () => void;
  showSearchButton?: boolean;
  showClearButton?: boolean;
  suggestions?: Array<{
    id: string;
    label: string;
    description?: string;
    category?: string;
  }>;
  loadSuggestions?: (query: string) => Promise<Array<{
    id: string;
    label: string;
    description?: string;
    category?: string;
  }>>;
  showAdvancedSearch?: boolean;
  onAdvancedSearch?: () => void;
}

export const Input = React.forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>((props, ref) => {
  const {
    name,
    type = 'text',
    label,
    required,
    disabled,
    placeholder,
    maxLength,
    showCount = false,
    autoResize = false,
    debounceMs = 0,
    minRows = 3,
    maxRows = 10,
    prefix,
    suffix,
    mask,
    className,
    'data-cy': dataCy,
    onBlur,
    onChange,
    value: controlledValue,
    error,
    helpText,
    min,
    max,
    step,
    precision = 0,
    showControls = false,
    numberFormat,
    validateNumber,
    onNumberChange,
    register,
    resize,
    description,
    rows = 4,
    onSearch,
    onClear,
    showSearchButton = false,
    showClearButton = false,
    suggestions = [],
    loadSuggestions,
    showAdvancedSearch = false,
    onAdvancedSearch,
    ...rest
  } = props;

  const [value, setValue] = React.useState<string>(
    controlledValue !== undefined ? String(controlledValue) : ''
  );
  const [charCount, setCharCount] = React.useState(0);
  const [currentRows, setCurrentRows] = React.useState(rows);
  const [numericValue, setNumericValue] = React.useState<number | undefined>(
    typeof controlledValue === 'number' ? controlledValue : undefined
  );

  // Search specific state
  const [showSuggestions, setShowSuggestions] = React.useState(false);
  const [activeSuggestion, setActiveSuggestion] = React.useState(-1);
  const [isLoading, setIsLoading] = React.useState(false);
  const [localSuggestions, setLocalSuggestions] = React.useState(suggestions);

  // Debounced onChange handler
  const debouncedOnChange = React.useMemo(
    () => debounceMs > 0 ? debounce(onChange || (() => {}), debounceMs) : onChange,
    [onChange, debounceMs]
  ) as ReturnType<typeof debounce>

  const handleRef = React.useCallback((node: HTMLInputElement | HTMLTextAreaElement | null) => {
    // Handle forwarded ref
    if (node) {
      if (typeof ref === 'function') ref(node);
      else if (ref) ref.current = node;
    }

    // Handle react-hook-form ref
    if (register) {
      register(name).ref(node);
    }
  }, [ref, register, name]);

  const handleBlur = React.useCallback((e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onBlur?.();
    if (register) {
      register(name).onBlur(e);
    }
  }, [onBlur, register, name]);

  const handleInputChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    onChange?.(newValue);
    if (register) {
      register(name).onChange(e);
    }
  }, [onChange, register, name]);

  // Handle value changes with correct event types
  const handleChange = React.useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newValue = e.target.value
    setValue(newValue)
    setCharCount(newValue.length)
    
    if (autoResize && type === 'textarea') {
      const textRows = newValue.split('\n').length
      const newRows = Math.min(Math.max(textRows, minRows), maxRows)
      setCurrentRows(newRows)
    }

    debouncedOnChange?.(newValue)
  }, [debouncedOnChange, autoResize, type, minRows, maxRows])

  // Handle numeric value formatting
  const formatNumber = React.useCallback((num: number) => {
    if (numberFormat) {
      return new Intl.NumberFormat(
        numberFormat.locale || 'en-US',
        numberFormat.options
      ).format(num)
    }
    return precision ? num.toFixed(precision) : num.toString()
  }, [numberFormat, precision])

  // Enhanced change handler for numbers with correct event types
  const handleNumericChange = React.useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const val = e.target.value
    setValue(val)

    if (type === 'number') {
      if (val === '' || val === '-') {
        setNumericValue(undefined)
        onNumberChange?.(undefined)
        return
      }

      const num = parseFloat(val)
      if (!isNaN(num)) {
        const validatedNum = validateNumber ? validateNumber(num) : num
        if (validatedNum !== undefined) {
          const finalNum = Number(validatedNum.toFixed(precision))
          setNumericValue(finalNum)
          onNumberChange?.(finalNum)
        }
      }
    }

    handleChange(e)
  }, [type, precision, validateNumber, onNumberChange, handleChange])

  // Number increment/decrement handlers
  const handleIncrement = React.useCallback(() => {
    if (type !== 'number' || disabled) return
    const currentValue = numericValue ?? 0
    const newValue = currentValue + (step ?? 1)
    const validatedNum = validateNumber ? validateNumber(newValue) : newValue
    if (validatedNum !== undefined) {
      const finalNum = Number(validatedNum.toFixed(precision))
      setNumericValue(finalNum)
      setValue(formatNumber(finalNum))
      onNumberChange?.(finalNum)
    }
  }, [type, disabled, numericValue, step, validateNumber, precision, formatNumber, onNumberChange])

  const handleDecrement = React.useCallback(() => {
    if (type !== 'number' || disabled) return
    const currentValue = numericValue ?? 0
    const newValue = currentValue - (step ?? 1)
    const validatedNum = validateNumber ? validateNumber(newValue) : newValue
    if (validatedNum !== undefined) {
      const finalNum = Number(validatedNum.toFixed(precision))
      setNumericValue(finalNum)
      setValue(formatNumber(finalNum))
      onNumberChange?.(finalNum)
    }
  }, [type, disabled, numericValue, step, validateNumber, precision, formatNumber, onNumberChange])

  // Handle search
  const handleSearch = React.useCallback(() => {
    onSearch?.(value);
    setShowSuggestions(false);
    setActiveSuggestion(-1);
  }, [onSearch, value]);

  // Handle clear
  const handleClear = React.useCallback(() => {
    setValue('');
    setCharCount(0);
    onClear?.();
    if (ref && 'current' in ref && ref.current) {
      ref.current.focus();
    }
  }, [onClear]);

  // Handle suggestions
  const handleKeyDown = React.useCallback((e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (type === 'search' && suggestions.length > 0) {
      if (e.key === 'Enter') {
        e.preventDefault();
        if (activeSuggestion >= 0 && localSuggestions[activeSuggestion]) {
          const suggestion = localSuggestions[activeSuggestion];
          setValue(suggestion.label);
          setCharCount(suggestion.label.length);
          handleSearch();
        } else {
          handleSearch();
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveSuggestion(prev => 
          prev < localSuggestions.length - 1 ? prev + 1 : prev
        );
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveSuggestion(prev => prev > 0 ? prev - 1 : prev);
      } else if (e.key === 'Escape') {
        setShowSuggestions(false);
        setActiveSuggestion(-1);
      }
    }
  }, [type, localSuggestions, activeSuggestion, handleSearch]);

  // Load suggestions
  const loadSuggestionsDebounced = React.useCallback(
    async (query: string) => {
      if (loadSuggestions) {
        setIsLoading(true);
        try {
          const newSuggestions = await loadSuggestions(query);
          setLocalSuggestions(newSuggestions);
          setShowSuggestions(true);
        } finally {
          setIsLoading(false);
        }
      }
    },
    [loadSuggestions]
  );

  // Update suggestions when value changes
  React.useEffect(() => {
    if (type === 'search' && loadSuggestions) {
      const timer = setTimeout(() => {
        loadSuggestionsDebounced(value);
      }, debounceMs);
      return () => clearTimeout(timer);
    }
  }, [type, value, debounceMs, loadSuggestionsDebounced]);

  // Render search suggestions
  const renderSuggestions = () => {
    if (!showSuggestions || (!isLoading && localSuggestions.length === 0)) {
      return null;
    }

    return (
      <div
        className={cn(
          'absolute z-10 mt-1 w-full overflow-hidden rounded-md',
          'bg-white shadow-lg dark:bg-neutral-800',
          'text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'
        )}
      >
        {isLoading ? (
          <div className="px-4 py-2 text-sm text-neutral-500 dark:text-neutral-400">
            Loading...
          </div>
        ) : (
          <div className="max-h-60 overflow-auto py-1">
            {localSuggestions.map((suggestion, index) => (
              <div
                key={suggestion.id}
                onClick={() => {
                  setValue(suggestion.label);
                  setCharCount(suggestion.label.length);
                  handleSearch();
                }}
                className={cn(
                  'relative cursor-pointer select-none px-4 py-2',
                  activeSuggestion === index
                    ? 'bg-primary-100 text-primary-900 dark:bg-primary-900 dark:text-primary-100'
                    : 'text-neutral-950 hover:bg-neutral-50 dark:text-white dark:hover:bg-neutral-700'
                )}
              >
                {suggestion.category && (
                  <span className="mb-1 block text-xs font-medium text-neutral-500 dark:text-neutral-400">
                    {suggestion.category}
                  </span>
                )}
                <div className="font-medium">{suggestion.label}</div>
                {suggestion.description && (
                  <div className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                    {suggestion.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        {showAdvancedSearch && (
          <div className="border-t border-neutral-100 px-4 py-2 dark:border-neutral-700">
            <button
              type="button"
              onClick={onAdvancedSearch}
              className="text-sm font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
            >
              Advanced Search
            </button>
          </div>
        )}
      </div>
    );
  };

  // Cleanup debounced function
  React.useEffect(() => {
    return () => {
      if (debounceMs > 0 && debouncedOnChange?.cancel) {
        debouncedOnChange.cancel()
      }
    }
  }, [debouncedOnChange, debounceMs])

  // Update controlled value
  React.useEffect(() => {
    if (controlledValue !== undefined) {
      const stringValue = String(controlledValue);
      setValue(stringValue);
      setCharCount(stringValue.length);
    }
  }, [controlledValue]);

  const inputClassName = cn(
    inputVariants({ variant: error ? 'error' : 'default' }),
    className
  )

  const commonProps = {
    id: name,
    name,
    placeholder,
    disabled,
    autoComplete: 'off',
    'data-cy': dataCy || name,
    className: inputClassName,
    'aria-required': required,
    maxLength,
    onChange: type === 'number' ? handleNumericChange : handleInputChange,
    value,
    onBlur: handleBlur,
    ref: handleRef,
    ...rest
  }

  const renderInput = () => {
    if (type === 'textarea') {
      return (
        <textarea
          {...commonProps}
          rows={currentRows}
          onChange={handleChange}
          className={cn(
            commonProps.className,
            'min-h-[80px] w-full',
            typeof resize === 'boolean'
              ? resize ? 'resize' : 'resize-none'
              : resize === 'none'
              ? 'resize-none'
              : `resize-${resize}`,
            error && 'border-destructive focus-visible:ring-destructive'
          )}
          aria-invalid={!!error}
          aria-describedby={
            error
              ? `${name}-error`
              : description
              ? `${name}-description`
              : undefined
          }
        />
      )
    }

    if (type === 'number' && showControls) {
      return (
        <div className="relative flex w-full">
          <input
            {...commonProps}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            onChange={handleNumericChange}
          />
          <div className="absolute right-0 top-0 flex h-full flex-col">
            <button
              type="button"
              onClick={handleIncrement}
              disabled={disabled || (max !== undefined && numericValue !== undefined && numericValue >= max)}
              className={cn(
                'flex h-1/2 w-6 items-center justify-center border-l',
                'hover:bg-accent hover:text-accent-foreground',
                'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
                disabled && 'cursor-not-allowed opacity-50'
              )}
              tabIndex={-1}
            >
              <ChevronUpIcon className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={handleDecrement}
              disabled={disabled || (min !== undefined && numericValue !== undefined && numericValue <= min)}
              className={cn(
                'flex h-1/2 w-6 items-center justify-center border-l border-t',
                'hover:bg-accent hover:text-accent-foreground',
                'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
                disabled && 'cursor-not-allowed opacity-50'
              )}
              tabIndex={-1}
            >
              <ChevronDownIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      )
    }

    if (type === 'search') {
      return (
        <div className="relative">
          <div className="relative flex">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <MagnifyingGlassIcon className="h-5 w-5 text-neutral-400" aria-hidden="true" />
            </div>
            <input
              {...commonProps}
              type="search"
              className={cn(
                commonProps.className,
                'pl-10',
                (showSearchButton || showClearButton) && 'pr-10'
              )}
              onKeyDown={handleKeyDown}
            />
            {value && showClearButton && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute inset-y-0 right-0 flex items-center pr-3"
              >
                <XMarkIcon className="h-5 w-5 text-neutral-400 hover:text-neutral-500" aria-hidden="true" />
              </button>
            )}
            {showSearchButton && !showClearButton && (
              <button
                type="button"
                onClick={handleSearch}
                className="absolute inset-y-0 right-0 flex items-center pr-3"
              >
                <MagnifyingGlassIcon className="h-5 w-5 text-neutral-400 hover:text-neutral-500" aria-hidden="true" />
              </button>
            )}
          </div>
          {renderSuggestions()}
        </div>
      );
    }

    if (mask) {
      const { onChange: _, ...maskProps } = commonProps
      return (
        <IMaskInput
          {...maskProps}
          mask={mask.mask}
          onAccept={(value: string) => {
            setValue(value);
            onChange?.(value);
          }}
          inputRef={handleRef}
          scale={mask.scale}
          thousandsSeparator={mask.thousandsSeparator}
          padFractionalZeros={mask.padFractionalZeros}
          normalizeZeros={mask.normalizeZeros}
          radix={mask.radix}
          definitions={mask.definitions}
          prepare={mask.prepare}
          commit={mask.commit}
          {...(mask.signed !== undefined && { signed: mask.signed })}
        />
      )
    }

    return (
      <input
        {...commonProps}
        type={type}
      />
    )
  }

  return (
    <div className={cn('flex flex-col gap-1', name)}>
      {label && (
        <label
          htmlFor={name}
          className={cn(
            'text-sm font-medium text-neutral-700 dark:text-neutral-200',
            'transition-colors duration-200',
            required && 'after:ml-0.5 after:text-error-500 after:content-["*"]',
            disabled && 'opacity-50'
          )}
        >
          {label}
        </label>
      )}
      <div className="relative flex group">
        {prefix && (
          <div className={cn(
            'inline-flex items-center rounded-l-md border border-r-0 bg-neutral-50 px-3 text-neutral-500',
            'transition-colors duration-200',
            'group-hover:border-neutral-400',
            'dark:bg-neutral-800 dark:text-neutral-400',
            error ? [
              'border-error-500',
              'dark:border-error-500'
            ] : [
              'border-neutral-300',
              'dark:border-neutral-700'
            ]
          )}>
            {prefix}
          </div>
        )}
        {renderInput()}
        {suffix && (
          <div className={cn(
            'inline-flex items-center rounded-r-md border border-l-0 bg-neutral-50 px-3 text-neutral-500',
            'transition-colors duration-200',
            'group-hover:border-neutral-400',
            'dark:bg-neutral-800 dark:text-neutral-400',
            error ? [
              'border-error-500',
              'dark:border-error-500'
            ] : [
              'border-neutral-300',
              'dark:border-neutral-700'
            ]
          )}>
            {suffix}
          </div>
        )}
      </div>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          {error && (
            <p 
              data-cy={`${dataCy || name}-error`}
              className="text-xs text-error-500 dark:text-error-400 mt-1"
              role="alert"
              id={`${name}-error`}
            >
              {error}
            </p>
          )}
          {!error && (description || helpText) && (
            <p 
              className="text-xs text-neutral-500 dark:text-neutral-400 mt-1"
              id={`${name}-description`}
            >
              {description || helpText}
            </p>
          )}
        </div>
        {showCount && maxLength && (
          <p className="text-xs text-neutral-500 dark:text-neutral-400 ml-2">
            {charCount}/{maxLength}
          </p>
        )}
      </div>
    </div>
  )
})

Input.displayName = 'Input' 
import { Combobox } from '@headlessui/react'
import { ChevronUpDownIcon, CheckIcon } from '../../../lib/icons'
import { cn as clsx } from '../../../lib/utils'
import * as React from 'react';
import { useState } from 'react';
import { useController, FieldValues } from 'react-hook-form'
import type { AutoCompleteOption, AutoCompleteProps } from '../../../types'

export function ControlledAutoComplete<T extends FieldValues>({
  name,
  control,
  options: initialOptions,
  label,
  className,
  placeholder = 'Select an option',
  loadOptions,
  validation,
  'data-cy': dataCy,
  ...props
}: AutoCompleteProps<T>) {
  const [query, setQuery] = useState('')
  const [options, setOptions] = useState(initialOptions)
  const [isLoading, setIsLoading] = useState(false)

  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    rules: validation,
  })

  const filteredOptions = query === ''
    ? options
    : options.filter((option) =>
        option.label
          .toLowerCase()
          .replace(/\s+/g, '')
          .includes(query.toLowerCase().replace(/\s+/g, ''))
      )

  const handleSearch = async (value: string) => {
    setQuery(value)
    if (loadOptions) {
      setIsLoading(true)
      try {
        const newOptions = await loadOptions(value)
        setOptions(newOptions)
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={name}
          className="mb-2 block text-sm font-medium text-tertiaryGray1"
          data-cy={`${dataCy || name}-label`}
        >
          {label}
        </label>
      )}
      <Combobox
        value={field.value}
        onChange={field.onChange}
        {...props}
      >
        <div className="relative">
          <div className={clsx(
            'relative w-full cursor-default overflow-hidden rounded-md text-left',
            'border border-tertiaryGray3 bg-white',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-primaryBlue/40',
            error && 'border-statusError',
            className
          )}>
            <Combobox.Input
              className={clsx(
                'w-full border-none py-2.5 pl-3 pr-10',
                'text-sm text-tertiaryGray1 bg-white',
                'focus:outline-none focus:ring-0 placeholder:text-tertiaryGray3'
              )}
              displayValue={(value: string) => 
                options.find((option) => option.value === value)?.label ?? ''
              }
              onChange={(event) => handleSearch(event.target.value)}
              placeholder={placeholder}
              data-cy={dataCy || name}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-tertiaryGray3"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Combobox.Options
            className={clsx(
              'absolute z-dropdown mt-1 max-h-60 w-full overflow-auto rounded-md',
              'bg-white py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'
            )}
          >
            {isLoading && (
              <div className="relative cursor-default select-none px-4 py-2 text-tertiaryGray3">
                Loading...
              </div>
            )}
            {filteredOptions.length === 0 && !isLoading && (
              <div className="relative cursor-default select-none px-4 py-2 text-tertiaryGray3">
                Nothing found.
              </div>
            )}
            {filteredOptions.map((option) => (
              <Combobox.Option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
                className={({ active, disabled }) =>
                  clsx(
                    'relative cursor-pointer select-none py-2 pl-10 pr-4',
                    active ? 'bg-secondaryBlue1Accent text-primaryBlue' : 'text-tertiaryGray1',
                    disabled ? 'cursor-not-allowed opacity-50' : ''
                  )
                }
                data-cy={`${dataCy || name}-option-${option.value}`}
              >
                {({ selected, active }) => (
                  <>
                    <span
                      className={clsx(
                        'block truncate',
                        selected ? 'font-medium' : 'font-normal'
                      )}
                    >
                      {option.label}
                    </span>
                    {selected && (
                      <span
                        className={clsx(
                          'absolute inset-y-0 left-0 flex items-center pl-3',
                          active ? 'text-primaryBlue' : 'text-primaryBlue'
                        )}
                      >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        </div>
      </Combobox>
      {error && (
        <p
          className="mt-2 text-sm text-statusError"
          data-cy={`${dataCy || name}-error`}
        >
          {error.message}
        </p>
      )}
    </div>
  )
}

// Basic AutoComplete component without form control
export function AutoComplete({
  options,
  value,
  onChange,
  className,
  placeholder = 'Select an option',
  loadOptions,
  disabled,
  'data-cy': dataCy,
  ...props
}: {
  options: AutoCompleteOption[]
  value: string
  onChange: (value: string) => void
  className?: string
  placeholder?: string
  disabled?: boolean
  loadOptions?: (query: string) => Promise<AutoCompleteOption[]>
  'data-cy'?: string
}) {
  const [query, setQuery] = useState('')
  const [localOptions, setLocalOptions] = useState(options)
  const [isLoading, setIsLoading] = useState(false)

  const filteredOptions = query === ''
    ? localOptions
    : localOptions.filter((option) =>
        option.label
          .toLowerCase()
          .replace(/\s+/g, '')
          .includes(query.toLowerCase().replace(/\s+/g, ''))
      )

  const handleSearch = async (value: string) => {
    setQuery(value)
    if (loadOptions) {
      setIsLoading(true)
      try {
        const newOptions = await loadOptions(value)
        setLocalOptions(newOptions)
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <Combobox value={value} onChange={onChange} disabled={disabled} {...props}>
      <div className="relative">
        <div className={clsx(
          'relative w-full cursor-default overflow-hidden rounded-md text-left',
          'border border-tertiaryGray3 bg-white',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-primaryBlue/40',
          disabled && 'opacity-50 cursor-not-allowed',
          className
        )}>
          <Combobox.Input
            className={clsx(
              'w-full border-none py-2.5 pl-3 pr-10',
              'text-sm text-tertiaryGray1 bg-white',
              'focus:outline-none focus:ring-0 placeholder:text-tertiaryGray3',
              disabled && 'cursor-not-allowed'
            )}
            displayValue={(value: string) => 
              options.find((option) => option.value === value)?.label ?? ''
            }
            onChange={(event) => handleSearch(event.target.value)}
            placeholder={placeholder}
            disabled={disabled}
            data-cy={dataCy}
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon
              className={clsx(
                'h-5 w-5 text-tertiaryGray3',
                disabled && 'opacity-50'
              )}
              aria-hidden="true"
            />
          </Combobox.Button>
        </div>
        <Combobox.Options
          className={clsx(
            'absolute z-dropdown mt-1 max-h-60 w-full overflow-auto rounded-md',
            'bg-white py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'
          )}
        >
          {isLoading && (
            <div className="relative cursor-default select-none px-4 py-2 text-tertiaryGray3">
              Loading...
            </div>
          )}
          {filteredOptions.length === 0 && !isLoading && (
            <div className="relative cursor-default select-none px-4 py-2 text-tertiaryGray3">
              Nothing found.
            </div>
          )}
          {filteredOptions.map((option) => (
            <Combobox.Option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
              className={({ active, disabled }) =>
                clsx(
                  'relative cursor-pointer select-none py-2 pl-10 pr-4',
                  active ? 'bg-secondaryBlue1Accent text-primaryBlue' : 'text-tertiaryGray1',
                  disabled ? 'cursor-not-allowed opacity-50' : ''
                )
              }
              data-cy={`${dataCy}-option-${option.value}`}
            >
              {({ selected, active }) => (
                <>
                  <span
                    className={clsx(
                      'block truncate',
                      selected ? 'font-medium' : 'font-normal'
                    )}
                  >
                    {option.label}
                  </span>
                  {selected && (
                    <span
                      className={clsx(
                        'absolute inset-y-0 left-0 flex items-center pl-3',
                        active ? 'text-primaryBlue' : 'text-primaryBlue'
                      )}
                    >
                      <CheckIcon className="h-5 w-5" aria-hidden="true" />
                    </span>
                  )}
                </>
              )}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </div>
    </Combobox>
  )
}
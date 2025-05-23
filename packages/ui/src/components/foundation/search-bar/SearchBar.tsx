import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import React, { useState, useRef, useCallback } from 'react';
import { useController, Control, FieldValues, Path } from 'react-hook-form'

export interface SearchSuggestion {
  id: string
  label: string
  description?: string
  category?: string
}

export interface SearchBarProps<T extends FieldValues = FieldValues> {
  name: Path<T>
  control: Control<T>
  label?: string
  className?: string
  placeholder?: string
  suggestions?: SearchSuggestion[]
  loadSuggestions?: (query: string) => Promise<SearchSuggestion[]>
  onSearch?: (value: string) => void
  showAdvancedSearch?: boolean
  validation?: Record<string, any>
  'data-cy'?: string
}

export function ControlledSearchBar<T extends FieldValues>({
  name,
  control,
  label,
  className,
  placeholder = 'Search...',
  suggestions = [],
  loadSuggestions,
  onSearch,
  showAdvancedSearch = false,
  validation,
  'data-cy': dataCy,
  ...props
}: SearchBarProps<T>) {
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [activeSuggestion, setActiveSuggestion] = useState(-1)
  const [isLoading, setIsLoading] = useState(false)
  const [localSuggestions, setLocalSuggestions] = useState(suggestions)
  const inputRef = useRef<HTMLInputElement>(null)

  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    rules: validation,
  })

  const handleSearch = useCallback(
    (value: string) => {
      if (onSearch) {
        onSearch(value)
      }
      setShowSuggestions(false)
      setActiveSuggestion(-1)
    },
    [onSearch]
  )

  const handleInputChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      field.onChange(value)

      if (loadSuggestions) {
        setIsLoading(true)
        try {
          const newSuggestions = await loadSuggestions(value)
          setLocalSuggestions(newSuggestions)
        } finally {
          setIsLoading(false)
        }
      }

      setShowSuggestions(true)
      setActiveSuggestion(-1)
    },
    [field, loadSuggestions]
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault()
        if (activeSuggestion >= 0 && localSuggestions[activeSuggestion]) {
          field.onChange(localSuggestions[activeSuggestion].label)
          handleSearch(localSuggestions[activeSuggestion].label)
        } else {
          handleSearch(field.value)
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        setActiveSuggestion((prev) =>
          prev < localSuggestions.length - 1 ? prev + 1 : prev
        )
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setActiveSuggestion((prev) => (prev > 0 ? prev - 1 : prev))
      } else if (e.key === 'Escape') {
        setShowSuggestions(false)
        setActiveSuggestion(-1)
      }
    },
    [field, localSuggestions, activeSuggestion, handleSearch]
  )

  const handleInputFocus = useCallback(() => {
    setShowSuggestions(true)
  }, [])

  const handleInputBlur = useCallback(() => {
    // Delay hiding suggestions to allow clicking them
    setTimeout(() => {
      setShowSuggestions(false)
      setActiveSuggestion(-1)
    }, 200)
  }, [])

  const clearSearch = useCallback(() => {
    field.onChange('')
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [field])

  const handleSuggestionClick = useCallback(
    (suggestion: SearchSuggestion) => {
      field.onChange(suggestion.label)
      handleSearch(suggestion.label)
    },
    [field, handleSearch]
  )

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={name}
          className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200"
          data-cy={`${dataCy || name}-label`}
        >
          {label}
        </label>
      )}
      <div className="relative">
        <div
          className={clsx(
            'group relative flex rounded-lg shadow-sm',
            error && 'shadow-red-500/10',
            className
          )}
        >
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <MagnifyingGlassIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </div>
          <input
            {...field}
            {...props}
            ref={inputRef}
            id={name}
            type="search"
            placeholder={placeholder}
            onKeyDown={handleKeyDown}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            className={clsx(
              'block w-full rounded-lg pl-10 pr-10',
              'px-[calc(--spacing(3.5)-1px)] py-[calc(--spacing(2.5)-1px)] sm:px-[calc(--spacing(3)-1px)] sm:py-[calc(--spacing(1.5)-1px)]',
              'text-base/6 text-zinc-950 placeholder:text-zinc-500 sm:text-sm/6 dark:text-white',
              'border border-zinc-950/10 data-hover:border-zinc-950/20 dark:border-white/10 dark:data-hover:border-white/20',
              'bg-transparent dark:bg-white/5',
              'focus:outline-none focus:ring-2 focus:ring-blue-500',
              error && 'border-red-500'
            )}
            data-cy={dataCy || name}
          />
          {field.value && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute inset-y-0 right-0 flex items-center pr-3"
              data-cy={`${dataCy || name}-clear`}
            >
              <XMarkIcon
                className="h-5 w-5 text-gray-400 hover:text-gray-500"
                aria-hidden="true"
              />
            </button>
          )}
        </div>
        {showSuggestions && (localSuggestions.length > 0 || isLoading) && (
          <div
            className={clsx(
              'absolute z-10 mt-1 w-full overflow-hidden rounded-md',
              'bg-white shadow-lg dark:bg-zinc-800',
              'text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'
            )}
            data-cy={`${dataCy || name}-suggestions`}
          >
            {isLoading ? (
              <div className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
                Loading...
              </div>
            ) : (
              <div className="max-h-60 overflow-auto py-1">
                {localSuggestions.map((suggestion, index) => (
                  <div
                    key={suggestion.id}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className={clsx(
                      'relative cursor-pointer select-none px-4 py-2',
                      activeSuggestion === index
                        ? 'bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-100'
                        : 'text-zinc-950 hover:bg-zinc-50 dark:text-white dark:hover:bg-zinc-700'
                    )}
                    data-cy={`${dataCy || name}-suggestion-${suggestion.id}`}
                  >
                    {suggestion.category && (
                      <span className="mb-1 block text-xs font-medium text-zinc-500 dark:text-zinc-400">
                        {suggestion.category}
                      </span>
                    )}
                    <div className="font-medium">{suggestion.label}</div>
                    {suggestion.description && (
                      <div className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                        {suggestion.description}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
            {showAdvancedSearch && (
              <div className="border-t border-zinc-100 px-4 py-2 dark:border-zinc-700">
                <button
                  type="button"
                  onClick={() => handleSearch(field.value)}
                  className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                  data-cy={`${dataCy || name}-advanced-search`}
                >
                  Advanced Search
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      {error && (
        <p
          className="mt-2 text-sm text-red-600 dark:text-red-500"
          data-cy={`${dataCy || name}-error`}
        >
          {error.message}
        </p>
      )}
    </div>
  )
}

// Basic SearchBar component without form control
export function SearchBar({
  value,
  onChange,
  className,
  placeholder = 'Search...',
  suggestions = [],
  loadSuggestions,
  onSearch,
  showAdvancedSearch = false,
  'data-cy': dataCy,
  ...props
}: {
  value: string
  onChange: (value: string) => void
  className?: string
  placeholder?: string
  suggestions?: SearchSuggestion[]
  loadSuggestions?: (query: string) => Promise<SearchSuggestion[]>
  onSearch?: (value: string) => void
  showAdvancedSearch?: boolean
  'data-cy'?: string
}) {
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [activeSuggestion, setActiveSuggestion] = useState(-1)
  const [isLoading, setIsLoading] = useState(false)
  const [localSuggestions, setLocalSuggestions] = useState(suggestions)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSearch = useCallback(
    (searchValue: string) => {
      if (onSearch) {
        onSearch(searchValue)
      }
      setShowSuggestions(false)
      setActiveSuggestion(-1)
    },
    [onSearch]
  )

  const handleInputChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value
      onChange(newValue)

      if (loadSuggestions) {
        setIsLoading(true)
        try {
          const newSuggestions = await loadSuggestions(newValue)
          setLocalSuggestions(newSuggestions)
        } finally {
          setIsLoading(false)
        }
      }

      setShowSuggestions(true)
      setActiveSuggestion(-1)
    },
    [onChange, loadSuggestions]
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault()
        if (activeSuggestion >= 0 && localSuggestions[activeSuggestion]) {
          onChange(localSuggestions[activeSuggestion].label)
          handleSearch(localSuggestions[activeSuggestion].label)
        } else {
          handleSearch(value)
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        setActiveSuggestion((prev) =>
          prev < localSuggestions.length - 1 ? prev + 1 : prev
        )
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setActiveSuggestion((prev) => (prev > 0 ? prev - 1 : prev))
      } else if (e.key === 'Escape') {
        setShowSuggestions(false)
        setActiveSuggestion(-1)
      }
    },
    [value, localSuggestions, activeSuggestion, onChange, handleSearch]
  )

  const handleInputFocus = useCallback(() => {
    setShowSuggestions(true)
  }, [])

  const handleInputBlur = useCallback(() => {
    // Delay hiding suggestions to allow clicking them
    setTimeout(() => {
      setShowSuggestions(false)
      setActiveSuggestion(-1)
    }, 200)
  }, [])

  const clearSearch = useCallback(() => {
    onChange('')
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [onChange])

  const handleSuggestionClick = useCallback(
    (suggestion: SearchSuggestion) => {
      onChange(suggestion.label)
      handleSearch(suggestion.label)
    },
    [onChange, handleSearch]
  )

  return (
    <div className="relative">
      <div
        className={clsx(
          'group relative flex rounded-lg shadow-sm',
          className
        )}
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <MagnifyingGlassIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </div>
        <input
          ref={inputRef}
          type="search"
          value={value}
          placeholder={placeholder}
          onKeyDown={handleKeyDown}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          className={clsx(
            'block w-full rounded-lg pl-10 pr-10',
            'px-[calc(--spacing(3.5)-1px)] py-[calc(--spacing(2.5)-1px)] sm:px-[calc(--spacing(3)-1px)] sm:py-[calc(--spacing(1.5)-1px)]',
            'text-base/6 text-zinc-950 placeholder:text-zinc-500 sm:text-sm/6 dark:text-white',
            'border border-zinc-950/10 data-hover:border-zinc-950/20 dark:border-white/10 dark:data-hover:border-white/20',
            'bg-transparent dark:bg-white/5',
            'focus:outline-none focus:ring-2 focus:ring-blue-500'
          )}
          data-cy={dataCy}
          {...props}
        />
        {value && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute inset-y-0 right-0 flex items-center pr-3"
            data-cy={`${dataCy}-clear`}
          >
            <XMarkIcon
              className="h-5 w-5 text-gray-400 hover:text-gray-500"
              aria-hidden="true"
            />
          </button>
        )}
      </div>
      {showSuggestions && (localSuggestions.length > 0 || isLoading) && (
        <div
          className={clsx(
            'absolute z-10 mt-1 w-full overflow-hidden rounded-md',
            'bg-white shadow-lg dark:bg-zinc-800',
            'text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'
          )}
          data-cy={`${dataCy}-suggestions`}
        >
          {isLoading ? (
            <div className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
              Loading...
            </div>
          ) : (
            <div className="max-h-60 overflow-auto py-1">
              {localSuggestions.map((suggestion, index) => (
                <div
                  key={suggestion.id}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className={clsx(
                    'relative cursor-pointer select-none px-4 py-2',
                    activeSuggestion === index
                      ? 'bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-100'
                      : 'text-zinc-950 hover:bg-zinc-50 dark:text-white dark:hover:bg-zinc-700'
                  )}
                  data-cy={`${dataCy}-suggestion-${suggestion.id}`}
                >
                  {suggestion.category && (
                    <span className="mb-1 block text-xs font-medium text-zinc-500 dark:text-zinc-400">
                      {suggestion.category}
                    </span>
                  )}
                  <div className="font-medium">{suggestion.label}</div>
                  {suggestion.description && (
                    <div className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                      {suggestion.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
          {showAdvancedSearch && (
            <div className="border-t border-zinc-100 px-4 py-2 dark:border-zinc-700">
              <button
                type="button"
                onClick={() => handleSearch(value)}
                className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                data-cy={`${dataCy}-advanced-search`}
              >
                Advanced Search
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
} 
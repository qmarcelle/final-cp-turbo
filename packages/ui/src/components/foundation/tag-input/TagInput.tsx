import { XMarkIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import * as React from 'react';
import { useController, Control, FieldValues, Path } from 'react-hook-form'

export interface Tag {
  id: string
  label: string
}

export interface TagInputProps<T extends FieldValues = FieldValues> {
  name: Path<T>
  control: Control<T>
  label?: string
  className?: string
  placeholder?: string
  suggestions?: Tag[]
  maxTags?: number
  validation?: Record<string, any>
  'data-cy'?: string
}

function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

export function ControlledTagInput<T extends FieldValues>({
  name,
  control,
  label,
  className,
  placeholder = 'Type and press Enter to add tags',
  suggestions = [],
  maxTags,
  validation,
  'data-cy': dataCy,
  ...props
}: TagInputProps<T>) {
  const [inputValue, setInputValue] = useState('')
  const [activeSuggestion, setActiveSuggestion] = useState(-1)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    rules: validation,
  })

  const tags = field.value || []

  const filteredSuggestions = suggestions.filter(
    (suggestion) =>
      suggestion.label.toLowerCase().includes(inputValue.toLowerCase()) &&
      !tags.some((tag: Tag) => tag.id === suggestion.id)
  )

  const addTag = useCallback(
    (tagToAdd: string | Tag) => {
      if (maxTags && tags.length >= maxTags) return

      let newTag: Tag
      if (typeof tagToAdd === 'string') {
        const trimmed = tagToAdd.trim()
        if (!trimmed) return
        if (tags.some((tag: Tag) => tag.label.toLowerCase() === trimmed.toLowerCase())) return

        newTag = {
          id: generateId(),
          label: trimmed,
        }
      } else {
        if (tags.some((tag: Tag) => tag.id === tagToAdd.id)) return
        newTag = tagToAdd
      }

      field.onChange([...tags, newTag])
      setInputValue('')
      setActiveSuggestion(-1)
      setShowSuggestions(false)
    },
    [field, tags, maxTags]
  )

  const removeTag = useCallback(
    (tagToRemove: Tag) => {
      field.onChange(tags.filter((tag: Tag) => tag.id !== tagToRemove.id))
    },
    [field, tags]
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault()
        if (activeSuggestion >= 0 && filteredSuggestions[activeSuggestion]) {
          addTag(filteredSuggestions[activeSuggestion])
        } else {
          addTag(inputValue)
        }
      } else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
        removeTag(tags[tags.length - 1])
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        setActiveSuggestion((prev) =>
          prev < filteredSuggestions.length - 1 ? prev + 1 : prev
        )
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setActiveSuggestion((prev) => (prev > 0 ? prev - 1 : prev))
      } else if (e.key === 'Escape') {
        setShowSuggestions(false)
        setActiveSuggestion(-1)
      }
    },
    [inputValue, tags, activeSuggestion, filteredSuggestions, addTag, removeTag]
  )

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      setInputValue(value)
      setShowSuggestions(true)
      setActiveSuggestion(-1)
    },
    []
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
      <div
        className={clsx(
          'relative rounded-lg border border-zinc-950/10 dark:border-white/10 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500',
          error && 'border-red-500',
          className
        )}
      >
        <div className="flex flex-wrap gap-2 p-2">
          {tags.map((tag: Tag) => (
            <span
              key={tag.id}
              className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200"
              data-cy={`${dataCy || name}-tag-${tag.id}`}
            >
              {tag.label}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="ml-1 inline-flex h-4 w-4 items-center justify-center rounded-full text-blue-400 hover:bg-blue-200 hover:text-blue-600 focus:outline-none dark:text-blue-300 dark:hover:bg-blue-800 dark:hover:text-blue-200"
                data-cy={`${dataCy || name}-remove-${tag.id}`}
              >
                <XMarkIcon className="h-3 w-3" />
              </button>
            </span>
          ))}
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            placeholder={maxTags && tags.length >= maxTags ? '' : placeholder}
            disabled={!!(maxTags && tags.length >= maxTags)}
            className={clsx(
              'flex-1 border-0 bg-transparent p-0.5 text-base/6 text-zinc-950 placeholder:text-zinc-500 focus:outline-none focus:ring-0 dark:text-white dark:placeholder:text-zinc-400',
              'disabled:cursor-not-allowed disabled:opacity-50'
            )}
            data-cy={dataCy || name}
            {...props}
          />
        </div>
        {showSuggestions && filteredSuggestions.length > 0 && (
          <ul
            className={clsx(
              'absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md',
              'bg-white py-1 dark:bg-zinc-800',
              'text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'
            )}
            data-cy={`${dataCy || name}-suggestions`}
          >
            {filteredSuggestions.map((suggestion, index) => (
              <li
                key={suggestion.id}
                onClick={() => addTag(suggestion)}
                className={clsx(
                  'relative cursor-pointer select-none py-2 pl-3 pr-9',
                  activeSuggestion === index
                    ? 'bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-100'
                    : 'text-zinc-950 hover:bg-zinc-50 dark:text-white dark:hover:bg-zinc-700'
                )}
                data-cy={`${dataCy || name}-suggestion-${suggestion.id}`}
              >
                {suggestion.label}
              </li>
            ))}
          </ul>
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

// Basic TagInput component without form control
export function TagInput({
  value,
  onChange,
  className,
  placeholder = 'Type and press Enter to add tags',
  suggestions = [],
  maxTags,
  'data-cy': dataCy,
  ...props
}: {
  value: Tag[]
  onChange: (tags: Tag[]) => void
  className?: string
  placeholder?: string
  suggestions?: Tag[]
  maxTags?: number
  'data-cy'?: string
}) {
  const [inputValue, setInputValue] = useState('')
  const [activeSuggestion, setActiveSuggestion] = useState(-1)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const filteredSuggestions = suggestions.filter(
    (suggestion) =>
      suggestion.label.toLowerCase().includes(inputValue.toLowerCase()) &&
      !value.some((tag) => tag.id === suggestion.id)
  )

  const addTag = useCallback(
    (tagToAdd: string | Tag) => {
      if (maxTags && value.length >= maxTags) return

      let newTag: Tag
      if (typeof tagToAdd === 'string') {
        const trimmed = tagToAdd.trim()
        if (!trimmed) return
        if (value.some((tag) => tag.label.toLowerCase() === trimmed.toLowerCase())) return

        newTag = {
          id: generateId(),
          label: trimmed,
        }
      } else {
        if (value.some((tag) => tag.id === tagToAdd.id)) return
        newTag = tagToAdd
      }

      onChange([...value, newTag])
      setInputValue('')
      setActiveSuggestion(-1)
      setShowSuggestions(false)
    },
    [value, onChange, maxTags]
  )

  const removeTag = useCallback(
    (tagToRemove: Tag) => {
      onChange(value.filter((tag) => tag.id !== tagToRemove.id))
    },
    [value, onChange]
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault()
        if (activeSuggestion >= 0 && filteredSuggestions[activeSuggestion]) {
          addTag(filteredSuggestions[activeSuggestion])
        } else {
          addTag(inputValue)
        }
      } else if (e.key === 'Backspace' && !inputValue && value.length > 0) {
        removeTag(value[value.length - 1])
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        setActiveSuggestion((prev) =>
          prev < filteredSuggestions.length - 1 ? prev + 1 : prev
        )
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setActiveSuggestion((prev) => (prev > 0 ? prev - 1 : prev))
      } else if (e.key === 'Escape') {
        setShowSuggestions(false)
        setActiveSuggestion(-1)
      }
    },
    [inputValue, value, activeSuggestion, filteredSuggestions, addTag, removeTag]
  )

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      setInputValue(value)
      setShowSuggestions(true)
      setActiveSuggestion(-1)
    },
    []
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

  return (
    <div
      className={clsx(
        'relative rounded-lg border border-zinc-950/10 dark:border-white/10 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500',
        className
      )}
    >
      <div className="flex flex-wrap gap-2 p-2">
        {value.map((tag) => (
          <span
            key={tag.id}
            className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200"
            data-cy={`${dataCy}-tag-${tag.id}`}
          >
            {tag.label}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="ml-1 inline-flex h-4 w-4 items-center justify-center rounded-full text-blue-400 hover:bg-blue-200 hover:text-blue-600 focus:outline-none dark:text-blue-300 dark:hover:bg-blue-800 dark:hover:text-blue-200"
              data-cy={`${dataCy}-remove-${tag.id}`}
            >
              <XMarkIcon className="h-3 w-3" />
            </button>
          </span>
        ))}
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          placeholder={maxTags && value.length >= maxTags ? '' : placeholder}
          disabled={!!(maxTags && value.length >= maxTags)}
          className={clsx(
            'flex-1 border-0 bg-transparent p-0.5 text-base/6 text-zinc-950 placeholder:text-zinc-500 focus:outline-none focus:ring-0 dark:text-white dark:placeholder:text-zinc-400',
            'disabled:cursor-not-allowed disabled:opacity-50'
          )}
          data-cy={dataCy}
          {...props}
        />
      </div>
      {showSuggestions && filteredSuggestions.length > 0 && (
        <ul
          className={clsx(
            'absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md',
            'bg-white py-1 dark:bg-zinc-800',
            'text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'
          )}
          data-cy={`${dataCy}-suggestions`}
        >
          {filteredSuggestions.map((suggestion, index) => (
            <li
              key={suggestion.id}
              onClick={() => addTag(suggestion)}
              className={clsx(
                'relative cursor-pointer select-none py-2 pl-3 pr-9',
                activeSuggestion === index
                  ? 'bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-100'
                  : 'text-zinc-950 hover:bg-zinc-50 dark:text-white dark:hover:bg-zinc-700'
              )}
              data-cy={`${dataCy}-suggestion-${suggestion.id}`}
            >
              {suggestion.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
} 
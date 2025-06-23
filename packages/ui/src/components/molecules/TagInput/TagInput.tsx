'use client';

import * as React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { cn } from '../../../utils';

export interface Tag {
  id: string;
  label: string;
}

export interface TagInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  value?: Tag[];
  onChange?: (tags: Tag[]) => void;
  onTagAdd?: (tag: Tag) => void;
  onTagRemove?: (tag: Tag) => void;
  suggestions?: Tag[];
  maxTags?: number;
  error?: string;
  description?: string;
}

function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

function useFormField() {
  const id = React.useId();
  return {
    id,
    name: id,
  };
}

const TagInput = React.forwardRef<HTMLInputElement, TagInputProps>(
  ({
    className,
    value = [],
    onChange,
    onTagAdd,
    onTagRemove,
    suggestions = [],
    maxTags,
    placeholder = 'Type and press Enter to add tags',
    error,
    description,
    disabled,
    ...props
  }, ref) => {
    const [inputValue, setInputValue] = React.useState('');
    const [activeSuggestion, setActiveSuggestion] = React.useState(-1);
    const [showSuggestions, setShowSuggestions] = React.useState(false);
    const inputRef = React.useRef<HTMLInputElement>(null);
    const { id, name } = useFormField();

    const filteredSuggestions = React.useMemo(() => {
      return suggestions.filter(
        (suggestion) =>
          suggestion.label.toLowerCase().includes(inputValue.toLowerCase()) &&
          !value.some((tag) => tag.id === suggestion.id)
      );
    }, [suggestions, inputValue, value]);

    const addTag = React.useCallback(
      (tagToAdd: string | Tag) => {
        if (disabled || (maxTags && value.length >= maxTags)) return;

        let newTag: Tag;
        if (typeof tagToAdd === 'string') {
          const trimmed = tagToAdd.trim();
          if (!trimmed) return;
          if (value.some((tag) => tag.label.toLowerCase() === trimmed.toLowerCase())) return;

          newTag = {
            id: generateId(),
            label: trimmed,
          };
        } else {
          if (value.some((tag) => tag.id === tagToAdd.id)) return;
          newTag = tagToAdd;
        }

        onChange?.([...value, newTag]);
        onTagAdd?.(newTag);
        setInputValue('');
        setActiveSuggestion(-1);
        setShowSuggestions(false);
      },
      [disabled, maxTags, value, onChange, onTagAdd]
    );

    const removeTag = React.useCallback(
      (tagToRemove: Tag) => {
        if (disabled) return;
        onChange?.(value.filter((tag) => tag.id !== tagToRemove.id));
        onTagRemove?.(tagToRemove);
      },
      [disabled, value, onChange, onTagRemove]
    );

    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          if (activeSuggestion >= 0 && filteredSuggestions[activeSuggestion]) {
            addTag(filteredSuggestions[activeSuggestion]);
          } else {
            addTag(inputValue);
          }
        } else if (e.key === 'Backspace' && !inputValue && value.length > 0) {
          removeTag(value[value.length - 1]);
        } else if (e.key === 'ArrowDown') {
          e.preventDefault();
          setActiveSuggestion((prev) =>
            prev < filteredSuggestions.length - 1 ? prev + 1 : prev
          );
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          setActiveSuggestion((prev) => (prev > 0 ? prev - 1 : prev));
        } else if (e.key === 'Escape') {
          setShowSuggestions(false);
          setActiveSuggestion(-1);
        }
      },
      [inputValue, value, activeSuggestion, filteredSuggestions, addTag, removeTag]
    );

    const handleInputChange = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value);
        setShowSuggestions(true);
        setActiveSuggestion(-1);
      },
      []
    );

    const handleInputFocus = React.useCallback(() => {
      setShowSuggestions(true);
    }, []);

    const handleInputBlur = React.useCallback(() => {
      // Delay hiding suggestions to allow clicking them
      setTimeout(() => {
        setShowSuggestions(false);
        setActiveSuggestion(-1);
      }, 200);
    }, []);

    const isMaxTagsReached = maxTags ? value.length >= maxTags : false;

    return (
      <div className="space-y-2">
        <div
          className={cn(
            'relative rounded-md border bg-background shadow-sm transition-colors',
            error && 'border-destructive',
            disabled && 'cursor-not-allowed opacity-50',
            'focus-within:border-ring focus-within:ring-2 focus-within:ring-ring',
            className
          )}
        >
          <div className="flex flex-wrap gap-2 p-2">
            {value.map((tag) => (
              <span
                key={tag.id}
                className={cn(
                  'inline-flex items-center rounded-full px-2.5 py-0.5 text-sm font-medium',
                  'bg-primary/10 text-primary',
                  'dark:bg-primary/20'
                )}
              >
                {tag.label}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className={cn(
                    'ml-1 inline-flex h-4 w-4 items-center justify-center rounded-full',
                    'text-primary/60 hover:bg-primary/20 hover:text-primary',
                    'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'
                  )}
                  disabled={disabled}
                >
                  <span className="sr-only">Remove {tag.label}</span>
                  <XMarkIcon className="h-3 w-3" />
                </button>
              </span>
            ))}
            <input
              ref={ref || inputRef}
              type="text"
              id={id}
              name={name}
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              placeholder={isMaxTagsReached ? '' : placeholder}
              disabled={disabled || isMaxTagsReached}
              className={cn(
                'flex-1 bg-transparent p-0.5 text-sm placeholder:text-muted-foreground',
                'focus:outline-none focus:ring-0',
                'disabled:cursor-not-allowed'
              )}
              {...props}
            />
          </div>
          {showSuggestions && filteredSuggestions.length > 0 && (
            <div
              className={cn(
                'absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-popover text-popover-foreground shadow-md',
                'animate-in fade-in-0 zoom-in-95'
              )}
            >
              <div className="p-1">
                {filteredSuggestions.map((suggestion, index) => (
                  <div
                    key={suggestion.id}
                    onClick={() => addTag(suggestion)}
                    onMouseEnter={() => setActiveSuggestion(index)}
                    className={cn(
                      'relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none',
                      'transition-colors',
                      activeSuggestion === index && 'bg-accent text-accent-foreground',
                      !disabled && 'hover:bg-accent hover:text-accent-foreground',
                      disabled && 'cursor-not-allowed opacity-50'
                    )}
                  >
                    {suggestion.label}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
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

TagInput.displayName = 'TagInput';

export { TagInput }; 
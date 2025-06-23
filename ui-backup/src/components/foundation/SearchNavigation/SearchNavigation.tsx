'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { Clock, Search as SearchIcon } from 'lucide-react'
import { cn } from '../../../utils'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '../Command/Command'
import type { SearchNavigationProps, SearchSuggestion } from '@/types/components'

export const SearchNavigation = React.forwardRef<HTMLDivElement, SearchNavigationProps>(
  ({
    className,
    placeholder = 'Search...',
    onSearch,
    onSelect,
    suggestions = [],
    recentSearches = [],
    maxRecentSearches = 5,
    ...props
  }, ref) => {
    const router = useRouter()
    const [isOpen, setIsOpen] = React.useState(false)
    const [query, setQuery] = React.useState('')

    // Group suggestions by category
    const groupedSuggestions = React.useMemo(() => {
      return suggestions.reduce((acc, suggestion) => {
        const category = suggestion.category || 'Other'
        if (!acc[category]) {
          acc[category] = []
        }
        acc[category].push(suggestion)
        return acc
      }, {} as Record<string, SearchSuggestion[]>)
    }, [suggestions])

    const handleSelect = React.useCallback((suggestion: SearchSuggestion) => {
      if (suggestion.url) {
        router.push(suggestion.url)
      } else if (suggestion.action) {
        suggestion.action()
      }
      onSelect?.(suggestion.id)
      setIsOpen(false)
    }, [router, onSelect])

    return (
      <Command
        ref={ref}
        className={cn(
          'relative rounded-lg border shadow-none transition-colors',
          isOpen && 'bg-popover',
          className
        )}
        {...props}
      >
        <CommandInput
          value={query}
          onValueChange={(value) => {
            setQuery(value)
            onSearch?.(value)
          }}
          placeholder={placeholder}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
          leftIcon={<SearchIcon className="h-4 w-4" />}
          className="h-10"
        />
        {isOpen && (
          <div className="absolute top-full z-50 w-full rounded-b-lg border border-t-0 bg-popover shadow-lg">
            <CommandList>
              {query.length > 0 && (
                <>
                  {Object.entries(groupedSuggestions).map(([category, items]) => (
                    <CommandGroup key={category} heading={category}>
                      {items.map((suggestion) => (
                        <CommandItem
                          key={suggestion.id}
                          onSelect={() => handleSelect(suggestion)}
                          icon={suggestion.icon}
                        >
                          <div className="flex flex-col">
                            <span>{suggestion.title}</span>
                            {suggestion.description && (
                              <span className="text-xs text-muted-foreground">
                                {suggestion.description}
                              </span>
                            )}
                          </div>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  ))}
                  {Object.keys(groupedSuggestions).length === 0 && (
                    <CommandEmpty>No results found.</CommandEmpty>
                  )}
                </>
              )}

              {query.length === 0 && recentSearches.length > 0 && (
                <>
                  <CommandGroup heading="Recent Searches">
                    {recentSearches.slice(0, maxRecentSearches).map((search, index) => (
                      <CommandItem
                        key={index}
                        onSelect={() => {
                          setQuery(search)
                          onSearch?.(search)
                        }}
                        icon={<Clock className="h-4 w-4" />}
                      >
                        {search}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                  <CommandSeparator />
                </>
              )}
            </CommandList>
          </div>
        )}
      </Command>
    )
  }
)

SearchNavigation.displayName = 'SearchNavigation' 
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import { SearchNavigation } from './SearchNavigation'
import { FileText, Settings, User } from 'lucide-react'

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}))

describe('SearchNavigation', () => {
  const suggestions = [
    {
      id: '1',
      title: 'Profile Settings',
      description: 'Update your profile information',
      category: 'Settings',
      icon: <User />,
      url: '/settings/profile',
    },
    {
      id: '2',
      title: 'Account Settings',
      description: 'Manage your account preferences',
      category: 'Settings',
      icon: <Settings />,
      url: '/settings/account',
    },
    {
      id: '3',
      title: 'Documentation',
      description: 'Read our documentation',
      category: 'Help',
      icon: <FileText />,
      url: '/docs',
    },
  ]

  const recentSearches = [
    'Profile settings',
    'How to update account',
    'Documentation',
  ]

  it('renders with default placeholder', () => {
    render(<SearchNavigation />)
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument()
  })

  it('renders with custom placeholder', () => {
    render(<SearchNavigation placeholder="Custom placeholder" />)
    expect(screen.getByPlaceholderText('Custom placeholder')).toBeInTheDocument()
  })

  it('shows suggestions when focused', async () => {
    render(<SearchNavigation suggestions={suggestions} />)
    
    const input = screen.getByRole('combobox')
    fireEvent.focus(input)
    
    await waitFor(() => {
      expect(screen.getByText('Profile Settings')).toBeInTheDocument()
      expect(screen.getByText('Account Settings')).toBeInTheDocument()
      expect(screen.getByText('Documentation')).toBeInTheDocument()
    })
  })

  it('shows recent searches when focused and no query', async () => {
    render(<SearchNavigation recentSearches={recentSearches} />)
    
    const input = screen.getByRole('combobox')
    fireEvent.focus(input)
    
    await waitFor(() => {
      expect(screen.getByText('Recent Searches')).toBeInTheDocument()
      recentSearches.forEach(search => {
        expect(screen.getByText(search)).toBeInTheDocument()
      })
    })
  })

  it('filters suggestions based on query', async () => {
    render(<SearchNavigation suggestions={suggestions} />)
    
    const input = screen.getByRole('combobox')
    fireEvent.focus(input)
    fireEvent.change(input, { target: { value: 'profile' } })
    
    await waitFor(() => {
      expect(screen.getByText('Profile Settings')).toBeInTheDocument()
      expect(screen.queryByText('Documentation')).not.toBeInTheDocument()
    })
  })

  it('calls onSearch when typing', async () => {
    const onSearch = vi.fn()
    render(<SearchNavigation onSearch={onSearch} />)
    
    const input = screen.getByRole('combobox')
    fireEvent.change(input, { target: { value: 'test' } })
    
    await waitFor(() => {
      expect(onSearch).toHaveBeenCalledWith('test')
    })
  })

  it('calls onSelect when selecting a suggestion', async () => {
    const onSelect = vi.fn()
    render(<SearchNavigation suggestions={suggestions} onSelect={onSelect} />)
    
    const input = screen.getByRole('combobox')
    fireEvent.focus(input)
    
    await waitFor(() => {
      const suggestion = screen.getByText('Profile Settings')
      fireEvent.click(suggestion)
      expect(onSelect).toHaveBeenCalledWith('1')
    })
  })

  it('shows no results message when no matches found', async () => {
    render(<SearchNavigation suggestions={suggestions} />)
    
    const input = screen.getByRole('combobox')
    fireEvent.focus(input)
    fireEvent.change(input, { target: { value: 'nonexistent' } })
    
    await waitFor(() => {
      expect(screen.getByText('No results found.')).toBeInTheDocument()
    })
  })

  it('groups suggestions by category', async () => {
    render(<SearchNavigation suggestions={suggestions} />)
    
    const input = screen.getByRole('combobox')
    fireEvent.focus(input)
    
    await waitFor(() => {
      expect(screen.getByText('Settings')).toBeInTheDocument()
      expect(screen.getByText('Help')).toBeInTheDocument()
    })
  })

  it('limits recent searches to maxRecentSearches', async () => {
    const maxRecentSearches = 2
    render(
      <SearchNavigation 
        recentSearches={recentSearches} 
        maxRecentSearches={maxRecentSearches} 
      />
    )
    
    const input = screen.getByRole('combobox')
    fireEvent.focus(input)
    
    await waitFor(() => {
      expect(screen.getByText(recentSearches[0])).toBeInTheDocument()
      expect(screen.getByText(recentSearches[1])).toBeInTheDocument()
      expect(screen.queryByText(recentSearches[2])).not.toBeInTheDocument()
    })
  })
}) 
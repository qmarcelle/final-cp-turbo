import { invokeSmartSearch } from '@/actions/smartSearch';
import { SearchDetails } from '@/models/app/searchDetails';
import { transformSearchResponseToDetails } from '@/utils/fusion_search_response_mapper';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { IComponent } from '../IComponent';
import { Input } from '../../../components/atoms/Input';
import { SearchTypeAhead } from '../foundation/SearchTypeAhead';
import { Spacer } from '../foundation/Spacer';

export const SearchNavigation = ({ className }: IComponent) => {
  const [searchText, setSearchText] = useState<string>('');
  const [searchResults, setSearchResults] = useState<SearchDetails[] | null>(null);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [showSearchSuggestion, setShowSearchSuggestion] = useState(false);

  const router = useRouter();

  function gotoSearchPage() {
    router.push(`/searchResults?searchTerm=${searchText}`);
    closeSearch();
  }

  useEffect(() => {
    if (searchText.length === 0) {
      setShowSearchSuggestion(false);
      setSearchResults(null);
      return;
    }

    if (searchText.length >= 3) {
      const getSearchResults = setTimeout(async () => {
        try {
          const result = await invokeSmartSearch(searchText);
          if (result.status === 200) {
            const transformedResults = transformSearchResponseToDetails(result.data!);
            setSearchResults(transformedResults);
            setShowSearchSuggestion(true);
          }
        } catch (error) {
          console.error('Search error:', error);
        }
      }, 500);

      return () => clearTimeout(getSearchResults);
    }
  }, [searchText]);

  function closeSearch() {
    setShowSearchBar(false);
    setShowSearchSuggestion(false);
    setSearchText('');
  }

  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  return (
    <div className={`flex flex-row items-center ${className ?? ''}`}>
      <div className="flex flex-col flex-grow relative">
        <Input
          type="search"
          name="search"
          value={searchText}
          placeholder="Search..."
          showSearchButton
          showClearButton
          onSearch={gotoSearchPage}
          onClear={closeSearch}
          onChange={handleSearch}
          debounceMs={500}
          loadSuggestions={async (query) => {
            if (query.length < 3) return [];
            try {
              const result = await invokeSmartSearch(query);
              if (result.status === 200) {
                const transformedResults = transformSearchResponseToDetails(result.data!);
                return transformedResults.map(group => 
                  group.content.map(item => ({
                    id: item.id,
                    label: item.title,
                    description: item.description,
                    category: group.header,
                  }))
                ).flat();
              }
            } catch (error) {
              console.error('Search error:', error);
            }
            return [];
          }}
          aria-label="Search"
        />
        {showSearchSuggestion && searchResults && (
          <SearchTypeAhead
            searchDetails={searchResults}
            searchText={searchText}
          />
        )}
      </div>
      <Spacer size={8} axis="horizontal" />
    </div>
  );
};

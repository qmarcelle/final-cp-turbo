import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import CloseIcon from '../../../../assets/close.svg';
import searchIcon from '../../../../assets/search.svg';
import { IComponent } from '../../IComponent';
import SearchField from '../../composite/SiteHeaderSubSection/SearchField';
import { Spacer } from '../../foundation/Spacer';
import { TextBox } from '../../foundation/TextBox';

export const SearchNavigation = ({ className }: IComponent) => {
  const [searchText, setSearchText] = useState<string>('');
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [showSearchSuggestion, setShowSearchSuggestion] = useState(false);
  const [searchError, setSearchError] = useState(false);

  const router = useRouter();

  // function gotoSearchPage() {
  //   router.push(`/searchResults?searchTerm=${searchText}`);
  //   closeSearch();
  // }

  function closeSearch() {
    setShowSearchBar(false);
    setShowSearchSuggestion(false);
    setSearchText('');
  }

  const handleSearch = (searchVal: string) => {
    setSearchText(searchVal);
    if (searchVal.length >= 3) {
      setShowSearchSuggestion(true);
    }
  };

  const SearchBar = () => {
    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key == 'Enter') {
          closeSearch();
        }

        if (event.key == 'Escape') {
          closeSearch();
        }
      };

      window.addEventListener('keydown', handleKeyDown);

      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    });

    return (
      <div
        className={`flex flex-row align-top m-2 hover:bg-white w-full ${className}`}
      >
        <div className="flex flex-col flex-grow relative" onClick={() => {}}>
          <SearchField
            classValue="search-textfield-input"
            searchText={searchText}
            onSearch={handleSearch}
            hint="Search for claims, documents, and more..."
            autoFocus={true}
          ></SearchField>
        </div>
        <Spacer size={8} axis="horizontal" />
        <div
          className="flex flex-col"
          onClick={() => {
            closeSearch();
          }}
        >
          <Spacer size={14} axis="vertical" />
          <Image
            src={CloseIcon}
            className=""
            height={12}
            width={12}
            alt={'CloseIcon'}
          />
        </div>
        <Spacer size={8} axis="horizontal" />
      </div>
    );
  };

  function renderSearch() {
    return showSearchBar ? (
      <SearchBar />
    ) : (
      <div className="flex flex-row align-top">
        <div
          tabIndex={0}
          className="flex flex-row rounded-[4px] m-4 box-border items-end focus:outline-none focus:ring-2 focus:ring-primary-color"
          onClick={() => {
            setShowSearchBar(true);
          }}
        >
          <a>
            <TextBox className="link-row-head" text="Search" />
          </a>
          <Spacer size={8} />
          <Image
            src={searchIcon}
            className="icon items-end ml-1"
            alt="Search"
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex font-bold focus:outline-none hover:bg-secondary-focus focus:ring-2 focus:ring-primary-color ${showSearchBar ? 'w-full' : 'w-fit'}`}
    >
      {renderSearch()}
    </div>
  );
};

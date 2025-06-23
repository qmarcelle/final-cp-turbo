import Image from 'next/image';
import { useState } from 'react';
import CloseIcon from '../../../../assets/close.svg';
import searchIcon from '../../../../assets/search.svg';
import { IComponent } from '../../IComponent';
import { Spacer } from '../../foundation/Spacer';
import { TextBox } from '../../foundation/TextBox';
import { Input } from '../../foundation/Input/Input';

export const SearchNavigation = ({ className }: IComponent) => {
  const [searchText, setSearchText] = useState<string>('');
  const [showSearchBar, setShowSearchBar] = useState(false);

  // function gotoSearchPage() {
  //   router.push(`/searchResults?searchTerm=${searchText}`);
  //   closeSearch();
  // }

  function closeSearch() {
    setShowSearchBar(false);
    setSearchText('');
  }

  const handleSearch = (searchVal: string) => {
    setSearchText(searchVal);
  };

  function renderSearch() {
    return showSearchBar ? (
      <div className={`flex flex-row align-top m-2 hover:bg-white w-full ${className}`}>
        <div className="flex flex-col flex-grow relative">
          <Input
            type="search"
            name="search"
            value={searchText}
            placeholder="Search for claims, documents, and more..."
            showSearchButton
            showClearButton
            onSearch={handleSearch}
            onClear={closeSearch}
            autoFocus={true}
            aria-label="Search"
          />
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

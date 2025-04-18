import { SearchBarBase } from "@/components/uiBase/SearchBarBase";
import pawwSearch from "../../assets/icons/pawwSearch.svg";
import { TicketX } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useList } from "@/context/ListContext";

export const SearchBarPanel = ({ delay = 1000, ...props }) => {
  const {
    handleSearch,
    searchValue: contextSearchValue,
    clearSearchBar,
  } = useList();
  
  const [searchValue, setSearchValue] = useState(contextSearchValue);
  const lastSentValue = useRef(contextSearchValue);

  useEffect(() => {
    const trimmedValue = searchValue.trim();

    if (lastSentValue.current === trimmedValue) return;

    const safeSearch = encodeURIComponent(trimmedValue);

    const timeout = setTimeout(() => {
      handleSearch(safeSearch);
      lastSentValue.current = trimmedValue;
    }, delay);

    return () => clearTimeout(timeout);
  }, [searchValue, delay, handleSearch]);

  const handleSearchClear = () => {
    setSearchValue("");
    handleSearch("");
    lastSentValue.current = "";
  };

const previousClear = useRef(clearSearchBar)

  useEffect(() => {
    if (previousClear.current !== clearSearchBar) {
    setSearchValue("");
    previousClear.current = clearSearchBar
    lastSentValue.current = ""
    }
  }, [clearSearchBar]);

  return (
    <div className=" w-4/10 xs:w-3/10 relative">
      <SearchBarBase
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value);
        }}
        icon={false}
        {...props}
      />

      <img
        src={pawwSearch}
        alt="pawwSearch"
        className="absolute left-1.5 top-1/2 -translate-y-1/2 transition w-3.5 sm:w-4 md:w-4.5 lg:w-5 animate-bounce"
      />
      <button
        type="button"
        onClick={handleSearchClear}
        className="absolute right-3 top-1/2 -translate-y-1/2 "
      >
        <TicketX className="hover:text-red-800 text-info-content transition w-3 sm:w-3.5 md:w-4 lg:w-4.5" />
      </button>
    </div>
  );
};

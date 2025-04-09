import { SearchBarBase } from "@/components/uiBase/SearchBarBase";
import pawwSearch from "../../assets/icons/pawwSearch.svg";
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useList } from "@/context/ListContext";

export const SearchBarPanel = ({ delay = 1000, ...props }) => {
  
  const { handleSearch, searchValue: contextSearchValue } = useList();
  const [searchValue, setSearchValue] = useState(contextSearchValue);
  const lastSentValue = useRef(contextSearchValue);

  useEffect(() => {
    const trimmedValue = searchValue.trim();

    if (lastSentValue.current === trimmedValue) return;

    const safeSearch = encodeURIComponent(trimmedValue)

    const timeout = setTimeout(() => {
      handleSearch(safeSearch);
      lastSentValue.current = trimmedValue;
    }, delay);

    return () => clearTimeout(timeout);
  }, [searchValue, delay, handleSearch]);

  const handleClear = () => {
    setSearchValue("");
    handleSearch("");
    lastSentValue.current = "";
  };

  return (
    <div >
      <SearchBarBase
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value);
        }}
        icon={false}
        {...props}
      />
      <div className="relative">
          <img
            src={pawwSearch}
            alt="pawwSearch"
            className="absolute left-0 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-destructive transition w-4 h-4"
          />
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-destructive transition"
          >
            <X className="w-4 h-4" />
          </button>
      </div>
    </div>
  );
};

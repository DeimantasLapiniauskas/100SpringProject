import { SearchBarBase } from "@/components/uiBase/SearchBarBase";
import pawwSearch from "../../assets/icons/pawwSearch.svg"
import { X } from "lucide-react";
import { useEffect, useState } from "react";

export const SearchBar = ({onDebouncedSearch,
    delay = 500,
    ...props
}) => {

    const [searchValue, setSearchValue] = useState("")

    useEffect(() => {
        const timeout = setTimeout(() => {
            onDebouncedSearch(searchValue)
        }, delay);

        return () => clearTimeout(timeout);
    }, [searchValue, delay, onDebouncedSearch])

    const handleClear = () => {
        searchValue("")
        onDebouncedSearch("");
    }

    return (

        <div className="relative w-full">
            <SearchBarBase 
            value={value}
            onChange={(e) => {
                setSearchValue(e.target.value)
            }}
            icon={false}
            {...props}/>
            <img src={pawwSearch} alt="pawwSearch" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-destructive transition" />
            <button type="button"
            onClick={}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-destructive transition">
                <X className="w-4 h-4" />
            </button>
        </div>
    )
}
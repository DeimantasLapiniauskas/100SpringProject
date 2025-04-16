import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/uiBase/filtering";
import { useList } from "@/context/ListContext";
import { FilterIcon } from "@/assets/icons/FilterIcon";

export const FilterPanel = ({sortFields}) => {
  const { sorted, onSortBy } = useList();

  return (
    <div className="flex items-center gap-1 md:gap-2">
      <Select
        value={sorted}
        onValueChange={(value) => onSortBy({ target: { value } })}
      >
        <p className="text-[8px] sm:text-[10px] md:text-xs text-info-content">
          Filter by:
        </p>
        <SelectTrigger className="focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-blue-500 rounded-full">
          <FilterIcon />
        </SelectTrigger>
        <SelectContent>
          {sortFields.map((postType) => (
            <SelectItem
              key={postType}
              value={postType}
              className={`
                cursor-pointer font-semibold
             text-[8px] px-2 py-1
            sm:text-[10px] sm:px-2.5 sm:py-1.25
            md:text-xs md:px-4 md:py-1.5
             lg:px-5 lg:py-1.75
                hover:bg-blue-300
                data-[state=checked]:font-semibold
                text-info-content focus:font-semibold rounded-sm ${
                  postType === "Sale"
                    ? `text-red-700 animate-pulse`
                    : postType === "Blog"
                    ? `text-[#006666]`
                    : postType === "News"
                    ? `text-[#004C99]` : "text-info-content"
                } 
              `}
            >
              {postType === "Sale" ? postType + " !" : postType}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

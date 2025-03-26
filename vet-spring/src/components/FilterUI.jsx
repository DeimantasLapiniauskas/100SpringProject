import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/filtering";
import { usePagination } from "@/context/PaginationContext";
import { FilterIcon } from "@/assets/icons/FilterIcon";

export const FilterUI = () => {
  const { sorted, onSortBy } = usePagination();

  return (
    <div className="flex items-center gap-1 md:gap-2">
      <Select
        value={sorted}
        onValueChange={(value) => onSortBy({ target: { value } })}
      >
        <SelectTrigger>
              <FilterIcon />
        </SelectTrigger>
        <SelectContent>
          {["Content", "News", "Sale", "Blog"].map((postType) => (
            <SelectItem
              key={postType}
              value={postType}
              className={`
                cursor-pointer
             text-[8px] px-2 py-1
            sm:text-[10px] sm:px-2.5 sm:py-1.25
            md:text-xs md:px-4 md:py-1.5
             lg:px-5 lg:py-1.75
                hover:bg-blue-300
                data-[state=checked]:font-semibold
                text-info-content focus:font-semibold rounded-sm  
              `}
            >
              {postType}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

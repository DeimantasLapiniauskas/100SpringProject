import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/uiBase/filtering";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
// } from "@/components/uiBase/selectBase";
import { useList } from "@/context/ListContext";
import { FilterIcon } from "@/assets/icons/FilterIcon";

export const FilterPanel = ({ filterFields }) => {
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
        <SelectContent className="z-50 w-[85px] sm:w-[105px] md:w-[125px] lg:w-[130px] overflow-auto rounded-md border border-blue-400 bg-gradient-to-br from-blue-300 via-sky-300 to-indigo-300 shadow-lg relative right-8 xs:right-8.5 sm:right-9 md:right-10.5 lg:right-12">
          {filterFields.map((field) => (
            <SelectItem
              key={field.value}
              value={field.value}
              className={`relative flex w-full  select-none items-center outline-none  data-[disabled]:pointer-events-none data-[disabled]:opacity-50 cusor-pointer font-semibold text-[8px] px-1 py-1 sm:text-[10px] sm:px-1.5 sm:py-1.25 md:text-xs md:px-2 md:py-1.5 lg:px-2.5 lg:py-1.75 hover:bg-blue-400 data-[state=checked]:font-semibold
                text-info-content focus:font-semibold rounded-[10px] ${
                  field.label === "Sale"
                    ? `text-red-700 animate-pulse`
                    : field.label === "Blog"
                    ? `text-[#006666]`
                    : field.label === "News"
                    ? `text-[#004C99]`
                    : "text-info-content"
                } 
              `}
            >
              {field.label === "Sale" ? field.label + " !" : field.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

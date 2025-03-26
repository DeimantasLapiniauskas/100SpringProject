import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useList } from "@/context/ListContext";

export const SelectUI = () => {
  const { pageSize, onPageSizeChange } = useList();

  return (
    <div className="flex items-center gap-1 md:gap-2">
      <label className="text-[8px] sm:text-[10px] md:text-xs text-info-content">Page size:</label>
      <Select
        value={String(pageSize)}
        onValueChange={(value) => onPageSizeChange({ target: { value } })}
      >
        <SelectTrigger
          className={`
            w-[80px] sm:w-[100px] md:w-[120px] lg:w-[130px]
            text-[8px] px-2 py-1
            sm:text-[10px] sm:px-2.5 sm:py-1.25
            md:text-xs md:px-3 md:py-1.5
             lg:px-4 lg:py-1.75
            border text-info-content font-semibold border-blue-500
            hover:bg-blue-200 focus:ring-1 focus:ring-blue-400
            transition duration-150 ease-in-out
          `}
        >
          <SelectValue placeholder="Per page" />
        </SelectTrigger>
        <SelectContent>
          {[6, 9, 12].map((num) => (
            <SelectItem
              key={num}
              value={String(num)}
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
              {num} per page
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

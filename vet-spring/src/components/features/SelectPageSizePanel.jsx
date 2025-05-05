import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/uiBase/selectBase";
import { useList } from "@/context/ListContext";

export const SelectPageSizePanel = ({ pageSizes }) => {

  const { pageSize, onPageSizeChange } = useList();

  return (
    <div className="flex items-center gap-1 md:gap-2 ">
      <label className="text-[10px] md:text-xs text-info-content">
        Page size:
      </label>
      <Select
        value={String(pageSize)}
        onValueChange={(value) => onPageSizeChange({ target: { value } })}
      >
        <SelectTrigger
          variant="new"
          size="selectPageSize"
          intent="blueGradient"
          className=" w-[100px] md:w-[121px] lg:w-[130px]"
        >
          <SelectValue placeholder="Per page" />
        </SelectTrigger>
        <SelectContent variant="blueGradient">
          {pageSizes.map((num) => (
            <SelectItem key={num} value={String(num)}>
              {num} per page
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

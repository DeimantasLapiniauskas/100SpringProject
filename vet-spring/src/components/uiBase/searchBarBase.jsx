import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { Search } from "lucide-react";

const searchBarVariants = cva(
  "flex items-center w-full rounded-xl transition-all border shadow-sm",
  {
    variants: {
      intent: {
        default: "border-gray-300 bg-white",
        filled: "border-none bg-gray-100",
        subtle: "border-transparent bg-transparent",
        info: "border-blue-500 bg-blue-50",
      },
      size: {
        sm: "text-sm px-3 py-1.5",
        md: "text-base px-4 py-2",
        lg: "text-lg px-5 py-3",
      },
      radius: {
        default: "rounded-xl",
        full: "rounded-full",
        none: "rounded-none",
      },
    },
    defaultVariants: {
      intent: "default",
      size: "md",
      radius: "default",
    },
  }
);

export const SearchBarBase = ({
  className,
  variantIntent,
  size,
  radius,
  placeholder = "Search...",
  value,
  onChange,
  onSubmit,
  icon = true,
  ...props
}) => {
  return (
    <form
      onSubmit={onSubmit}
      className={cn("relative", className)}
    >
      {icon && (
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
      )}
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={cn(
          searchBarVariants({
            intent: variantIntent,
            size,
            radius,
          }),
          icon && "pl-10"
        )}
        {...props}
      />
    </form>
  );
};

export {searchBarVariants}
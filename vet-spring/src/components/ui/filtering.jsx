import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { Check, ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"

const Select = SelectPrimitive.Root
const SelectGroup = SelectPrimitive.Group
const SelectValue = SelectPrimitive.Value

const SelectTrigger = React.forwardRef(({ className, children, ...props }, ref) => {
  const [open, setOpen] = React.useState(false);

  return (
    <SelectPrimitive.Trigger
  ref={ref}
  onClick={() => setOpen(!open)}
  className={cn(
    "outline-none ring-0 focus:ring-0 focus:outline-none focus-visible:outline-none focus-visible:ring-0",
    className
  )}
  {...props}
>

      {children}
      {open ? (
        <ChevronUp className="h-2 w-2 sm:h-3 sm:w-3 md:h-4 md:w-4 opacity-80 text-info-content" />
      ) : (
        <span className="absolute left-[52px] bottom-[614px] sm:bottom-[598px] md:bottom-[581px] lg:bottom-[569px]" >
          <ChevronDown className="h-2 w-2 sm:h-3 sm:w-3 md:h-4 md:w-4 opacity-80 text-white font-semibold" />
        </span>
      )}
    </SelectPrimitive.Trigger>
  );
});
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const SelectContent = React.forwardRef(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Portal>
  <SelectPrimitive.Content
  ref={ref}
  position="popper"
  sideOffset={5}
  className={cn(
    "z-50 w-[80px] sm:w-[100px] md:w-[120px] lg:w-[130px] overflow-auto rounded-md border border-blue-500 hover:bg-blue-200 shadow-lg", className
  )}
  {...props}
>
      <SelectPrimitive.Viewport
        className="p-1"
      >
        {children}
      </SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
SelectContent.displayName = SelectPrimitive.Content.displayName

const SelectLabel = React.forwardRef(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("px-2 py-1.5 text-sm font-semibold text-foreground", className)}
    {...props}
  />
))
SelectLabel.displayName = SelectPrimitive.Label.displayName

const SelectItem = React.forwardRef(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center outline-none   data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute right-0 sm:right-1 md:right-1.5 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-2 w-2 sm:h-3 sm:w-3 md:h-4 md:w-4 text-info-content" />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName

const SelectSeparator = React.forwardRef(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("my-1 h-px bg-muted", className)}
    {...props}
  />
))
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
}

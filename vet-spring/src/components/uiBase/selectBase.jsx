// 1. SelectBase.js (final refined version, reusable and RHF-safe)
import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

const selectTriggerVariants = cva(
  "flex items-center justify-between rounded border focus:outline-none focus:ring-1 focus:ring-offset-1 md:focus:ring-2 md:focus:ring-offset-2 transition",
  {
    variants: {
      size: {
        sm: "text-xs h-7",
        md: "text-sm h-9",
        lg: "text-base h-11",
        responsive:
          "text-[10px] sm:text-xs md:text-sm px-2 py-1 md:px-3 md:py-1.5 lg:px-4 lg:py-1.75 h-7 sm:h-9 md:h-11 text-info-content",
        selectPageSize:
          "text-[8px] sm:text-[10px] md:text-xs px-2 py-1 md:px-3 md:py-1.5 lg:px-4 lg:py-1.75",
      },
      variant: {
        new: "gap-1 sm:gap-1.5 md:gap-2 rounded-md border border-input focus:outline-none  disabled:cursor-not-allowed disabled:opacity-50",
        default: "shadow-lg"
      },
      intent: {
        default: "border-blue-500 focus:ring-blue-500",
        blueGradient:
          "border-white text-white bg-gradient-to-br from-blue-400 via-blue-500 to-indigo-600 hover:bg-gradient-to-tl hover:from-indigo-600 hover:via-blue-500 hover:to-blue-400 focus:ring-blue-500",
        error: "border-red-500 focus:ring-red-500",
        success: "border-green-500 focus:ring-green-500",
      },
    },
    defaultVariants: {
      intent: "default",
      size: "responsive",
      variant: "default"
    },
  }
);

const selectItemVariants = cva(
  "relative flex cursor-pointer items-center rounded-sm outline-none justify-between ",
  {
    variants: {
      size: {
        sm: "text-xs px-2 py-1",
        md: "text-sm px-3 py-1.5",
        lg: "text-base px-4 py-2",
        selectPageSize:
          "text-[8px] px-2 py-1 sm:text-[10px] sm:px-3 sm:py-1.25 md:text-xs md:px-4 md:py-1.5 lg:px-5 lg:py-1.75",
        postRegForm:
          "text-[10px] px-2 py-1 sm:text-xs sm:px-2.5 sm:py-1.25 md:text-sm md:px-4 md:py-1.5 lg:px-5 lg:py-1.75 ",
      },
      intent: {
        blue: " text-info-content hover:bg-blue-300 data-[state=checked]:font-semibold text-info-content focus:font-semibold rounded-sm outline-none rounded-[10px] ",
      },
    },
    defaultVariants: {
      size: "selectPageSize",
      intent: "blue",
    },
  }
);

const selectContentVariants = cva(
  "z-50 overflow-auto rounded border bg-white shadow-md",
  {
    variants: {
      variant: {
        default: "border-blue-500 bg-white",
        blueSoft:
          " z-50 overflow-auto border-blue-500 bg-blue-200 shadow-lg rounded-md",
      },
      size: {}
    },
    defaultVariants: {
      variant: "blueSoft",
    },
  }
);

const Select = ({ value, onValueChange, children, ...props }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const safeToReceiveIsOpen = ["SelectTrigger"];

  return (
    <SelectPrimitive.Root
      value={value}
      onValueChange={onValueChange}
      onOpenChange={setIsOpen}
      {...props}
    >
      {typeof children === "function"
        ? children({ isOpen })
        : React.Children.map(children, (child) => {
            if (
              React.isValidElement(child) &&
              typeof child.type !== "string" &&
              safeToReceiveIsOpen.includes(child.type.displayName)
            ) {
              return React.cloneElement(child, { isOpen });
            }

            return child;
          })}
    </SelectPrimitive.Root>
  );
};

const SelectTrigger = React.forwardRef(
  ( props = {} , ref) => {
    const {  className,
      children,
      size,
      intent,
      variant,
      isOpen,
      ...rest} = props

    return (
      <SelectPrimitive.Trigger
        ref={ref}
        className={cn(
          selectTriggerVariants({ size, intent, variant }),
          className
        )}
        {...rest}
      >
        <div className="flex-1 text-left">{children}</div>
        {isOpen ? (
          <ChevronUp className=" h-2 w-2 sm:h-3 sm:w-3 md:h-4 md:w-4 text-white" />
        ) : (
          <ChevronDown className=" h-2 w-2 sm:h-3 sm:w-3 md:h-4 md:w-4 text-white" />
        )}
      </SelectPrimitive.Trigger>
    );
  }
);
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectContent = React.forwardRef(
  ({ className, variant, size, ...props }, ref) => (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        ref={ref}
        side="bottom"
        position="popper"
        style={{ width: "var(--radix-select-trigger-width)" }}
        className={cn(selectContentVariants({ variant, size }), className)}
        {...props}
      >
        <SelectPrimitive.Viewport>{props.children}</SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
);
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectItem = React.forwardRef(
  ({ className, size, children, ...props }, ref) => (
    <SelectPrimitive.Item
      ref={ref}
      className={cn(selectItemVariants({ size }), className)}
      {...props}
    >
      <span className="absolute right-1.5 sm:right-2.5 md:right-3.5 flex h-3.5 w-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <Check className="h-2 w-2 sm:h-3 sm:w-3 md:h-4 md:w-4 text-info-content" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
);
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = ({ className, ...props }) => (
  <SelectPrimitive.Value className={cn("truncate", className)} {...props} />
);

const SelectLabel = React.forwardRef(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("px-2 py-1.5 text-sm font-medium", className)}
    {...props}
  />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectSeparator = React.forwardRef(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectValue,
  SelectLabel,
  SelectSeparator,
};

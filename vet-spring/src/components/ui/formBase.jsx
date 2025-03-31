
import { useFormContext, Controller } from "react-hook-form"
import { cn } from "@/lib/utils"
import { cva } from "class-variance-authority"

export function Form({ className, ...props }) {
  return <form className={cn("space-y-1 md:space-y-2", className)} {...props} />
}

export function FormField({ name, control, render, ...props }) {
  const methods = useFormContext();
  return (
    <Controller
      name={name}
      control={control ?? methods.control}
      render={render}
      {...props}
    />
  );
}

export function FormItem({ className, ...props }) {
  return <div className={cn(" space-y-2", className)} {...props} />
}

const formLabelVariants = cva("text-sm font-medium", {
  variants: {
    intent: {
      default: "text-info-content",
      error: "text-red-500",
      success: "text-green-600",
      muted: "text-muted-foreground",
    },
    size: {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
      responsive : "text-xs sm:text-sm md:text-base  "
    },
  },
  defaultVariants: {
    intent: "default",
    size: "responsive",
  },
})

export function FormLabel({ className, intent, size, ...props }) {
  return (
    <label
      className={cn(formLabelVariants({ intent, size }), className)}
      {...props}
    />
  )
}

export function FormControl({ className, ...props }) {
  return <div className={cn("", className)} {...props} />
}

const formMessageVariants = cva("text-sm", {
  variants: {
    intent: {
      default: "text-muted-foreground",
      error: "text-red-500",
      success: "text-green-600",
      info: "text-blue-500",
    },
  },
  defaultVariants: {
    intent: "error",
  },
})

export function FormMessage({ children, className, intent = "error" }) {
  return <p className={cn(formMessageVariants({ intent }), className)}>{children}</p>
}

export { formLabelVariants, formMessageVariants}

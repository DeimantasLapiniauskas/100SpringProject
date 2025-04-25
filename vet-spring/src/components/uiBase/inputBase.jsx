import * as React from "react"
import { cn } from "@/lib/utils"
import { cva } from "class-variance-authority"

const inputVariants = cva(
  "flex w-full rounded border px-3 py-2 shadow-lg  placeholder:text-muted-foregroundfocus:outline-none focus:ring-2 focus:ring-offset-2",
  {
    variants: {
      size: {
        sm: "h-8 text-sm",
        md: "h-10 text-sm",
        lg: "h-12 text-base",
        responsive : "text-[10px] sm:text-xs md:text-sm lg:text-base h-7 sm:h-9 md:h-11 text-info-content"
      },
      intent: {
        default: "border-blue-500 focus:ring-blue-500",
        error: "border-red-500 focus:ring-red-500",
        success: "border-green-500 focus:ring-green-500",
      },
      variant: {
        default: "bg-white/80"
      }
    },
    defaultVariants: {
      size: "responsive",
      intent: "default",
    },
  }
)

export const Input = React.forwardRef(({ className, size, intent, variant, ...props }, ref) => {
  return (
    <input
      className={cn(inputVariants({ size, intent, variant }), className)}
      ref={ref}
      {...props}
    />
  )
})
Input.displayName = "Input"

export { inputVariants }
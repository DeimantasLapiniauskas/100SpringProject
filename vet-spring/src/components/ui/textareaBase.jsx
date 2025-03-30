import * as React from "react"
import { cn } from "@/lib/utils"
import { cva } from "class-variance-authority"

const textareaVariants = cva(
  "flex w-full  rounded border px-3 py-2 shadow-lg placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      size: {
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg ",
        responsive : "text-[10px] sm:text-xs md:text-sm lg:text-base h-[100px] sm:h-[125px] md:h-[150px]"
      },
      intent: {
        default: "border-blue-500 focus:ring-blue-500",
        error: "border-red-500 focus:ring-red-500",
        success: "border-green-500 focus:ring-green-500",
      },
    },
    defaultVariants: {
      size: "responsive",
      intent: "default",
    },
  }
)

export const Textarea = React.forwardRef(({ className, size, intent, ...props }, ref) => {
  return (
    <textarea
      className={cn(textareaVariants({ size, intent }), className)}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

export { textareaVariants }

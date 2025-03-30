
import { cn } from "@/lib/utils"
import { cva } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center px-5 justify-center rounded font-medium transition",
  {
    variants: {
      size: {
        sm: "h-8 px-3",
        md: "h-10 px-4",
        lg: "h-12 px-6",
        responsive : "text-[10px] sm:text-xs md:text-sm lg:text-base h-7 sm:h-9 md:h-11"
      },
      variant: {
        default: "bg-primary text-white",
        outline: "border border-input text-foreground bg-transparent",
        primary: "bg-gradient-to-br from-blue-400 to-indigo-600 hover:scale-105 transform transition duration-700 text-info-content"
      },
    },
    defaultVariants: {
      size: "responsive",
      variant: "primary",
    },
  }
);

export const Button = ({ className, size, variant, ...props }) => {
  return (
    <button
      className={cn(buttonVariants({ size, variant }), className)}
      {...props}
    />
  );
};
Button.displayName = "Button"

export { buttonVariants }

import { cn } from "@/lib/utils"
import { cva } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center px-5 justify-center rounded font-medium transition",
  {
    variants: {
      size: {
        sm: "h-5 sm: h-6 md:h-8 px-3 sm:px-4 md:px-6 text-[10px] sm:text-xs md:text-sm",
        md: "h-10 px-4",
        lg: "h-12 px-6",
        responsive : "text-[10px] sm:text-xs md:text-sm lg:text-base h-7 sm:h-8 md:h-10",
        responsive2 : "text-xs px-2 sm:px-3 md:px-4 sm:text-sm md:text-base text-info-content font-semibold "
      },
      variant: {
        default: "bg-primary text-white",
        outline: "border border-input text-foreground bg-transparent",
        primary: "bg-gradient-to-br from-blue-400 to-indigo-600 hover:scale-105 transform transition duration-500 text-info-content",
        permanent: "border-1 border-blue-200 rounded-[5px] cursor-pointer",
        cancel: "text-white border hover:text-info hover:border-info bg-info hover:bg-white",
        danger: "w-full text-black text-red-600 border-1 bg-black"
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

export {buttonVariants}
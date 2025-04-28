import { cn } from "@/lib/utils"
import { cva } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded font-medium  cursor-pointer",
  {
    variants: {
      size: {
        none: "p-0",
        xs: "text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs h-4 sm:h-5 md:h-6 px-1 sm:px-2 md:px-3",
        sm: "text-[9px] sm:text-[10px] md:text-xs lg:text-sm h-5 sm:h-6 md:h-7 px-2 sm:px-3 md:px-4",
        md: "text-[10px] sm:text-xs md:text-sm lg:text-base h-7 sm:h-8 md:h-9 px-3 sm:px-4 md:px-5",
        responsive2 : "text-xs px-2 sm:px-3 md:px-4 sm:text-sm md:text-base text-info-content font-semibold "
      },
      variant: {
        default: "bg-primary text-white",
        outline: "border border-input text-foreground bg-transparent",
        primary: "bg-gradient-to-br from-blue-400 via-blue-500 to-indigo-600  text-info-content",
        permanent: "border-1 border-blue-200 rounded-[5px] cursor-pointer",
        cancel: "text-white border hover:text-info hover:border-info bg-info hover:bg-white",
        danger: "w-full text-black text-red-600 border-1 bg-black",
        review: "bg-gradient-to-r from-yellow-300 via-yellow-400 to-amber-500 border border-amber-500 text-amber-800",
        transparent: "bg-transparent"
      },
      intent: {
        default: " hover:scale-105 transition-transform duration-500",
        review: " opacity-75 hover:shadow-amber-600 hover:text-amber-900 hover:opacity-100 shadow-sm",
        faded: "opacity-75 hover:opacity-100 border border-info hover:shadow-sm hover:shadow-info"
      }
    },
    defaultVariants: {
      size: "md",
      variant: "primary",
      intent: "default"
    },
  }
);

export const Button = ({ className, size, variant, intent, ...props }) => {
  return (
    <button
      className={cn(buttonVariants({ size, variant, intent }), className)}
      {...props}
    />
  );
};
Button.displayName = "Button"

export {buttonVariants}
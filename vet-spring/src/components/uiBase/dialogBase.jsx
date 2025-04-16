import * as Dialog from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

const dialogVariants = cva(
  "fixed z-50 w-full max-w-sm sm:max-w-md md:max-w-lg rounded-xl border bg-white  shadow-lg",
  {
    variants: {
      size: {
        sm: "p-4",
        md: "px-8 pt-6 pb-13",
        lg: "p-8",
      },
      centered: {
        true: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
        false: "top-10 left-1/2 -translate-x-1/2",
      },
      variant: {
        primary: "bg-gradient-to-br from-blue-400 to-indigo-600 border-info shadow-lg shadow-info"
      }
    },
    defaultVariants: {
      size: "md",
      centered: true,
      variant: "primary"
    },
  }
);

const dialogHeaderVariants = cva("mb-2 flex flex-col space-y-2", {
  variants: {
    variant: {
      default: "text-center",
      warning: "bg-yellow-100 text-yellow-800 p-4 rounded",
      danger: "bg-red-100 text-red-800 p-4 rounded",
      info: "bg-blue-100 text-blue-800 p-4 rounded",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const dialogTitleVariants = cva("text-lg font-semibold ", {
  variants: {
    variant: {
      default: "text-black text-sm sm:text-base md:text-lg m-1",
      danger: "text-red-600 text-sm sm:text-base md:text-lg m-1",
      info: "text-blue-600",
      success: "text-green-600",
    },
  },
  defaultVariants: {
    variant: "danger",
  },
});

const dialogDescriptionVariants = cva("text-sm break-words whitespace-pre-wrap", {
  variants: {
    variant: {
      default: "text-info-content font-semibold text-xs sm:text-sm md:text-base",
      danger: "text-red-500",
      info: "text-blue-500",
      success: "text-green-500",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const dialogFooterVariants = cva("mt-2 sm:mt-2.5 md:mt-3 flex justify-end gap-2", {
  variants: {
    variant: {
      default: "",
      center: "justify-center",
      left: "justify-start",
      spaced: "justify-between",
    },
  },
  defaultVariants: {
    variant: "center",
  },
});

export const DialogRoot = Dialog.Root;
export const DialogTrigger = Dialog.Trigger;
export const DialogPortal = Dialog.Portal;
export const DialogClose = Dialog.Close;

export const DialogOverlay = ({ className, ...props }) => (
  <Dialog.Overlay
    className={cn("fixed inset-0 bg-black/50 backdrop-blur-sm", className)}
    {...props}
  />
);

export const DialogContent = ({
  className,
  size,
  centered,
  children,
  onPointerDownOutside = (e) => e.preventDefault(),
  onInteractOutside = (e) => e.preventDefault(),
  onEscapeKeyDown = (e) => e.preventDefault(),
  ...props
}) => (
  <Dialog.Portal>
    <DialogOverlay />
    <Dialog.Content
      onPointerDownOutside={onPointerDownOutside}
      onInteractOutside={onInteractOutside}
      onEscapeKeyDown={onEscapeKeyDown}
      className={cn(dialogVariants({ size, centered }), className)}
      {...props}
    >
      {children}
    </Dialog.Content>
  </Dialog.Portal>
);

export const DialogHeader = ({ className, variant, children, ...props }) => (
  <div className={cn(dialogHeaderVariants({variant}) , className)} {...props}>{children}</div>
);
export const DialogTitle = ({ className, variant, children, ...props }) => (
  <Dialog.Title className={cn(dialogTitleVariants({ variant }), className)} {...props}>
    {children}
  </Dialog.Title>
);
export const DialogDescription = ({ className, variant, children, ...props }) => (
  <Dialog.Description className={cn(dialogDescriptionVariants({ variant }), className)} {...props}>
    {children}
  </Dialog.Description>
);
export const DialogFooter = ({ className, variant, children, ...props }) => (
  <div className={cn(dialogFooterVariants({ variant }), className)} {...props}>
    {children}
  </div>
  
);


export { dialogVariants };

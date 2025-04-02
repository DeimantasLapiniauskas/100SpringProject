import * as Dialog from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

const dialogVariants = cva(
  "fixed z-50 w-full max-w-lg rounded-xl border bg-white p-6 shadow-lg",
  {
    variants: {
      size: {
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
      },
      centered: {
        true: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
        false: "top-10 left-1/2 -translate-x-1/2",
      },
      variant: {
        primary: "bg-gradient-to-br from-blue-400 to-indigo-600"
      }
    },
    defaultVariants: {
      size: "lg",
      centered: true,
      variant: "primary"
    },
  }
);

const dialogHeaderVariants = cva("mb-4 flex flex-col space-y-2", {
  variants: {
    variant: {
      default: "",
      warning: "bg-yellow-100 text-yellow-800 p-4 rounded",
      danger: "bg-red-100 text-red-800 p-4 rounded",
      info: "bg-blue-100 text-blue-800 p-4 rounded",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const dialogTitleVariants = cva("text-lg font-semibold", {
  variants: {
    variant: {
      default: "text-black",
      danger: "text-red-600",
      info: "text-blue-600",
      success: "text-green-600",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const dialogDescriptionVariants = cva("text-sm", {
  variants: {
    variant: {
      default: "text-gray-600",
      danger: "text-red-500",
      info: "text-blue-500",
      success: "text-green-500",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const dialogFooterVariants = cva("mt-4 flex justify-end gap-2", {
  variants: {
    variant: {
      default: "",
      center: "justify-center",
      left: "justify-start",
      spaced: "justify-between",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export const DialogRoot = Dialog.Root;
export const DialogTrigger = Dialog.Trigger;
export const DialogPortal = Dialog.Portal;

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
  ...props
}) => (
  <Dialog.Portal>
    <DialogOverlay />
    <Dialog.Content
      className={cn(
        dialogVariants({ size, centered }),
        className
      )}
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

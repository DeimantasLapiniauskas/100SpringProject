import * as React from "react"
import { useFormContext, Controller } from "react-hook-form"
import { cn } from "@/lib/utils"
import { cva } from "class-variance-authority"
import { useDropzone } from "react-dropzone"

export function Form({ className, ...props }) {
  return <form className={cn("space-y-6", className)} {...props} />
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
  return <div className={cn("space-y-2", className)} {...props} />
}

const formLabelVariants = cva("text-sm font-medium", {
  variants: {
    intent: {
      default: "text-foreground",
      error: "text-red-500",
      success: "text-green-600",
      muted: "text-muted-foreground",
    },
    size: {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
    },
  },
  defaultVariants: {
    intent: "default",
    size: "md",
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

export function Dropzone({ onDrop, previewUrl, error }) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        onDrop(acceptedFiles[0]);
      }
    },
    accept: { 'image/*': [] },
    multiple: false,
  });

  return (
    <div {...getRootProps()} className={cn(
      "border-dashed border-2 rounded-xl p-6 text-center transition cursor-pointer",
      isDragActive ? "bg-muted" : "bg-background"
    )}>
      <input {...getInputProps()} />
      {previewUrl ? (
        <img
          src={previewUrl}
          alt="Preview"
          className="mx-auto max-h-48 object-contain"
        />
      ) : (
        <p>Drag & drop an image here or click to upload</p>
      )}
      {error && (
        <p className="text-sm text-red-500 mt-2">{error}</p>
      )}
    </div>
  );
}

export { formLabelVariants, formMessageVariants }

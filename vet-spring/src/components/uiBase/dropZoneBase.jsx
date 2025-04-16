import { useDropzone } from "react-dropzone"
import { cn } from "@/lib/utils"
import { cva } from "class-variance-authority"

 const dropzoneVariants = cva(
  "border-dashed border-2 rounded-xl p-6 text-center transition cursor-pointer shadow-lg",
  {
    variants: {
      intent: {
        default: "bg-background border-blue-500 focus:ring-blue-500",
        error: "border-red-500 bg-red-50",
        success: "border-green-500 bg-green-50",
      },
      size: {
        sm: "p-4 text-sm",
        md: "p-6 text-base",
        lg: "p-8 text-lg",
        responsive : "text-[10px] sm:text-xs md:text-sm lg:text-base h-[100px] sm:h-[125px] md:h-[150px] text-info-content"
      },
    },
    defaultVariants: {
      intent: "default",
      size: "responsive",
    },
  }
)

export function Dropzone({ onDrop, previewUrl, error, className, size, intent }) {
  const maxSizeMB = 5;
  const maxSizeBytes = maxSizeMB * 1024 * 1024;

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (!file) return;

      const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
      if (!allowedTypes.includes(file.type)) {
        alert("Only image files (.jpg, .png, .webp, .gif) are allowed.");
        return;
      }

      if (file.size > maxSizeBytes) {
        alert(`File is too large. Max size is ${maxSizeMB}MB.`);
        return;
      }
      onDrop && onDrop(file);
    },
    accept: { 'image/*': [] },
    multiple: false,
  });

  return (
    <div {...getRootProps()} className={cn(
      dropzoneVariants({ intent, size }),
      className,
      isDragActive ? "bg-muted" : "bg-background",
      "relative w-full overflow-hidden flex items-center justify-center"
    )}>
      <input {...getInputProps()} />
      {previewUrl ? (
        <img
        src={previewUrl}
        alt="Preview"
        className="absolute inset-0 w-full h-full object-cover rounded-xl"
        onError={(e) => {
          e.target.style.border = "2px solid red"; 
        }}
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
export {dropzoneVariants}

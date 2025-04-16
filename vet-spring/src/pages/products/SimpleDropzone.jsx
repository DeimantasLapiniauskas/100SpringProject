import { useDropzone } from "react-dropzone";

export function SimpleDropzone({ onDrop, previewUrl, error }) {
  const maxSizeMB = 5;
  const maxSizeBytes = maxSizeMB * 1024 * 1024;

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (!file) {
        onDrop(null, null);
        return;
      }

      const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
      if (!allowedTypes.includes(file.type)) {
        onDrop(null, "Only image files (.jpg, .png, .webp, .gif) are allowed.");
        return;
      }

      if (file.size > maxSizeBytes) {
        onDrop(null, `File is too large. Max size is ${maxSizeMB}MB.`);
        return;
      }

      onDrop(file, null)
    },
    accept: { "image/*": [] },
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-4 text-center w-full ${
        isDragActive ? "bg-gray-200" : "bg-white"
      } ${error ? "border-red-500" : "border-gray-400"}`}
    >
      <input {...getInputProps()} />
      {previewUrl ? (
        <img
          src={previewUrl}
          alt="Preview"
          className="w-full h-32 object-cover rounded-lg mx-auto"
        />
      ) : (
        <p className="text-gray-500">
          Drag & drop an image here or click to upload
        </p>
      )}
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
}
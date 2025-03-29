import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/inputBase";
import { Textarea } from "@/components/ui/textareaBase";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/selectBase";
import { Button } from "@/components/ui/buttonBase";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/formBase";
import { useState } from "react";

const postSchema = z.object({
  title: z.string().min(3),
  postType: z.enum(["News", "Blog", "Sale"]),
  description: z.string().min(10),
  imageFile: z.any().refine((file) => file instanceof File || file === null, {
    message: "Image is required",
  }),
});

export const PostRegister = () => {
  const form = useForm({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      postType: "",
      description: "",
      imageFile: null,
    },
  });

  const [previewUrl, setPreviewUrl] = useState(null);
  const { setValue } = form;

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setValue("imageFile", file);
      const reader = new FileReader();
      reader.onload = () => setPreviewUrl(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit((data) => console.log(data))}
        className="space-y-6"
      >
        <FormField
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  intent={form.formState.errors.title ? "error" : "default"}
                  placeholder="Enter post title"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="postType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Post Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="News">News</SelectItem>
                  <SelectItem value="Blog">Blog</SelectItem>
                  <SelectItem value="Sale">Sale</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  intent={
                    form.formState.errors.description ? "error" : "default"
                  }
                  placeholder="Write a description..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormItem>
          <FormLabel>Image</FormLabel>
          <div
            onClick={() => document.getElementById("fileInput").click()}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className="border-dashed border-2 rounded-xl p-6 text-center transition bg-background hover:bg-muted cursor-pointer"
          >
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Preview"
                className="mx-auto max-h-48 object-contain"
              />
            ) : (
              <p>Drag & drop an image here or click to upload</p>
            )}
          </div>
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setValue("imageFile", file);
                const reader = new FileReader();
                reader.onload = () => setPreviewUrl(reader.result);
                reader.readAsDataURL(file);
              }
            }}
          />
          {form.formState.errors.imageFile && (
            <p className="text-sm text-red-500 mt-2">
              {form.formState.errors.imageFile.message}
            </p>
          )}
        </FormItem>
        <Button type="submit">Submit</Button>
      </form>
    </FormProvider>
  );
};

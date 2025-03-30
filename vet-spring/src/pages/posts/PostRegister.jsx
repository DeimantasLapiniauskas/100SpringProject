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
import { Dropzone } from "@/components/ui/dropZoneBase";
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
    mode: "onChange",
    defaultValues: {
      title: "",
      postType: "",
      description: "",
      imageFile: null,
    },
  });

  const [previewUrl, setPreviewUrl] = useState(null);
  //   const { setValue } = form;

  //   const handleDrop = (event) => {
  //     event.preventDefault();
  //     const file = event.dataTransfer.files[0];
  //     if (file && file.type.startsWith("image/")) {
  //       setValue("imageFile", file);
  //       const reader = new FileReader();
  //       reader.onload = () => setPreviewUrl(reader.result);
  //       reader.readAsDataURL(file);
  //     }
  //   };

  return (
    <div className="w-1/2 p-2 sm:p-4 md:p-6">
      <FormProvider {...form}>
        <Form onSubmit={form.handleSubmit((data) => console.log(data))}>
          <FormField
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    intent={
                      form.formState.errors.title
                        ? "error"
                        : field.value && !form.formState.errors.title
                        ? "success"
                        : "default"
                    }
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
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger
                      intent={
                        form.formState.errors.postType
                          ? "error"
                          : field.value && !form.formState.errors.postType
                          ? "success"
                          : "default"
                      }
                      className="w-full"
                    >
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
                      form.formState.errors.description
                        ? "error"
                        : field.value && !form.formState.errors.description
                        ? "success"
                        : "default"
                    }
                    placeholder="Write a description..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="imageFile"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <Dropzone
                  onDrop={(file) => {
                    field.onChange(file);
                    const reader = new FileReader();
                    reader.onload = () => setPreviewUrl(reader.result);
                    reader.readAsDataURL(file);
                  }}
                  previewUrl={previewUrl}
                  error={form.formState.errors.imageFile?.message}
                />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </Form>
      </FormProvider>
    </div>
  );
};

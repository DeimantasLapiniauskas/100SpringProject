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
import { useState, useEffect } from "react";
import { useUI } from "@/context/UIContext";
import { UIStatus } from "@/constants/UIStatus";
import { postPost, updatePost, uploadImage } from "@/utils/helpers/posts";
import { Controller } from "react-hook-form";
import toast from "react-hot-toast";

const postSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be atleast 3 characters long" })
    .max(60, { message: "Title must not exceed 60 characters" })
    .refine((val) => val.trim() !== "", {
      message: "Title cannot be blank",
    }),
  postType: z.enum(["News", "Blog", "Sale"], {
    message: "Post type is required",
  }),
  content: z
    .string()
    .min(10, { message: "Content must be at least 10 characters long" })
    .max(1000, { message: "Content must not exceed 1000 characters" })
    .refine((val) => val.trim() !== "", {
      message: "Content cannot be blank",
    }),
  imageFile: z.instanceof(File).optional().nullable(),
  imageUrl: z
    .string()
    .trim()
    .regex(/\.(jpg|jpeg|png|webp|gif)$/i, {
      message: "URL must end with .jpg, .png, .webp or .gif",
    })
    .max(255, { message: "URL must not exceed 255 characters" })
    .optional()
    .or(z.literal(null)),
});

export const PostRegister = ({ initialData }) => {
  console.log("Cia initialdata:", initialData);
  const form = useForm({
    resolver: zodResolver(postSchema),
    mode: "onChange",
    defaultValues: {
      title: initialData?.title ?? "",
      postType: initialData?.postType ?? undefined,
      content: initialData?.content ?? "",
      imageFile: null,
      imageUrl: initialData?.imageUrl ?? null,
    },
  });
  
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const { Loading, Success, Error } = UIStatus;
  const { status, setStatus } = useUI();
  const isEditMode = !!initialData;
  const handleFormSubmit = async (data) => {
    let imageUrl = initialData?.imageUrl ?? null;

    try {
      setStatus(Loading);
      if (data.imageFile) {
        const formData = new FormData();
        formData.append("file", data.imageFile);
        const imageRes = await uploadImage(formData);
        imageUrl = imageRes.data.data;
        setPreviewUrl(imageUrl)
      }
      const payload = {
        title: data.title,
        postType: data.postType,
        content: data.content,
        imageUrl: imageUrl ?? initialData?.imageUrl ?? null,
      };
      const response = isEditMode
        ? await updatePost(initialData.id, payload)
        : await postPost(payload);

      const { data: data2, message, success } = response.data;
      setStatus(Success);
      if (data2 && success) {
        if (isEditMode) {
          setMessage(message);
          toast.dismiss();
          toast.success(message);
          form.reset({
            ...data2,
            imageFile: null,
            imageUrl: imageUrl ?? initialData.imageUrl ?? null
          });
          setPreviewUrl(imageUrl ?? initialData.imageUrl ?? null);
        } else {
          setMessage(message);
          toast.dismiss();
          toast.success(message);
          form.reset();
          setPreviewUrl(null);
        }
      } else {
        toast.error(message || "Something went wrong");
        setPreviewUrl(null);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ?? error.message ?? "Unknown error";
      toast.error(errorMessage);
      setError(errorMessage);
      setStatus(Error);
    } finally {
      form.setValue("imageFile", null);
    }
  };

  useEffect(() => {
    if (initialData?.imageUrl) {
      setPreviewUrl(initialData?.imageUrl);
    }
  }, [initialData?.imageUrl]);

  return (
    <div className="w-1/2 md:w-2/5 p-2 sm:p-4 md:p-6 bg-gradient-to-br from-blue-200 to-indigo-400 rounded-[10px]">
      <FormProvider {...form}>
        <Form onSubmit={form.handleSubmit(handleFormSubmit)}>
          <FormField
            name="title"
            render={({ field }) => (
              <FormItem className="md:w-1/2">
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
                <FormMessage>
                  {form.formState.errors.title?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            name="postType"
            render={({ field }) => (
              <FormItem className="md:w-1/2">
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
                <FormMessage>
                  {form.formState.errors.postType?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Textarea
                    intent={
                      form.formState.errors.content
                        ? "error"
                        : field.value && !form.formState.errors.content
                        ? "success"
                        : "default"
                    }
                    placeholder="Write a content..."
                    {...field}
                  />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.content?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <Controller
            control={form.control}
            name="imageFile"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <Dropzone
                  onDrop={async (file) => {
                    field.onChange(file);
                    await form.trigger("imageFile");
                    const reader = new FileReader();
                    reader.onload = () => setPreviewUrl(reader.result);
                    reader.readAsDataURL(file);
                  }}
                  previewUrl={
                    previewUrl
                  }
                  error={form.formState.errors.imageFile?.message}
                />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting
              ? isEditMode
                ? "Updating..."
                : "Submitting..."
              : isEditMode
              ? "Update"
              : "Submit"}
          </Button>
          {/* <pre className="text-xs text-red-500">
            {JSON.stringify(form.formState.errors, null, 2)}
          </pre> */}
        </Form>
      </FormProvider>
    </div>
  );
};

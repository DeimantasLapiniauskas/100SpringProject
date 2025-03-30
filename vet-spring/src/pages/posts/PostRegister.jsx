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
import { useUI } from "@/context/UIContext";
import { UIStatus } from "@/constants/UIStatus";
import { postPost, uploadImage } from "@/utils/helpers/uploadImage";
import { Controller } from "react-hook-form";
import toast from "react-hot-toast";

const postSchema = z.object({
  title: z.string().min(3),
  postType: z.enum(["News", "Blog", "Sale"]),
  content: z.string().min(10),
  // imageFile: z.instanceof(File, { message: "Image is required" })
  imageFile: z.instanceof(File).optional().nullable()
});

export const PostRegister = () => {
  const form = useForm({
    resolver: zodResolver(postSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      postType: undefined,
      description: "",
      imageFile: null,
    },
  });

  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const { Loading, Success, Error } = UIStatus;
  const { status, setStatus } = useUI();

  const handleFormSubmit = async (data) => {
let imageUrl = null

    try {
      setStatus(Loading);
      if (data.imageFile) {
      const formData = new FormData();
      formData.append("file", data.imageFile);
      const imageRes = await uploadImage(formData);
      imageUrl = imageRes.data.data;
      }
      const payload = {
        title: data.title,
        postType: data.postType,
        content: data.content,
        imageUrl,
      };
      const response = await postPost(payload);
      const { data: data2, message, success } = response.data;
      setStatus(Success);

      if (data2 && success) {
        setMessage(message);
        toast.dismiss();
        toast.success(message);
        form.reset();
        setPreviewUrl(null);
      } else {
        setMessage(message || "Something went wrong");
        toast.error(message || "Something went wrong");
        form.reset();
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

  return (
    <div className="w-1/2 md:w-2/5 p-2 sm:p-4 md:p-6">
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
                <FormMessage />
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
                <FormMessage />
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
                <FormMessage />
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
                  onDrop={ async (file) => {
                    console.log("🔥 Dropzone gavo failą:", file);
                    field.onChange(file);
                    await form.trigger("imageFile")
                    console.log("📌 Formos imageFile po trigger:", form.getValues("imageFile"));
                    
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
          {/* <Button type="submit" disabled={form.formState.isSubmitting}>
  {form.formState.isSubmitting ? "Submitting..." : "Submit"}
</Button> */}
          <pre className="text-xs text-red-500">
            {JSON.stringify(form.formState.errors, null, 2)}
          </pre>
        </Form>
      </FormProvider>
    </div>
  );
};

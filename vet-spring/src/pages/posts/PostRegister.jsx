import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/uiBase/inputBase";
import { Textarea } from "@/components/uiBase/textareaBase";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/uiBase/selectBase";
import { Button } from "@/components/uiBase/buttonBase";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/uiBase/formBase";
import { Dropzone } from "@/components/uiBase/dropZoneBase";
import { useState, useEffect } from "react";
import { useUI } from "@/context/UIContext";
import { UIStatus } from "@/constants/UIStatus";
import { postPost, updatePost, uploadImage } from "@/utils/helpers/posts";
import { Controller } from "react-hook-form";
import toast from "react-hot-toast";
import { useIsMounted } from "@/hooks/useIsMounted";
import { NavLink } from "react-router";
import { useMemo } from "react";
import { useNavigate } from "react-router";
import { Loading } from "@/components/feedback/Loading";
import { Error } from "@/components/feedback/Error";
import { Unusual } from "@/components/feedback/Unusual";
// import { Redirecting } from "@/components/feedback/Redirecting";

const postSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be atleast 3 characters long" })
    .max(50, { message: "Title must not exceed 50 characters" })
    .refine((val) => val.trim() !== "", {
      message: "Title cannot be blank",
    }),
  postType: z.enum(["News", "Blog", "Sale"], {
    message: "Post type is required",
  }),
  content: z
    .string()
    .min(10, { message: "Content must be at least 10 characters long" })
    .max(2000, { message: "Content must not exceed 2000 characters" })
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
  const form = useForm({
    resolver: zodResolver(postSchema),
    mode: "onChange",
    defaultValues: {
      title: initialData?.title ?? "",
      postType: initialData?.postType ?? "",
      content: initialData?.content ?? "",
      imageFile: null,
      imageUrl: initialData?.imageUrl ?? null,
    },
  });

  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const { Loading: Fetching, Success, Error: Err, Unusual: Strange, Redirecting: Navigating } = UIStatus;
  const { isLoading, isError, isUnusual, isRedirecting, setStatus } = useUI();

  const isEditMode = useMemo(() => !!initialData?.id, [initialData]);
  const isMounted = useIsMounted();
  const navigate = useNavigate();

  const handleFormSubmit = async (data) => {
    let imageUrl = initialData?.imageUrl ?? null;

    try {
      setStatus(Fetching);
      if (data?.imageFile) {
        const formData = new FormData();
        formData.append("file", data.imageFile);
        const imageRes = await uploadImage(formData);
        if (!isMounted.current) return;
  
        imageUrl = imageRes.data.data;
        setPreviewUrl(imageUrl);
      }
   
      const payload = {
        title: data.title,
        postType: data.postType,
        content: data.content,
        imageUrl: imageUrl ?? initialData?.imageUrl ?? null,
      };
      // console.log(initialData.id)
      let response;
      if (isEditMode) {
        response = await updatePost(initialData.id, payload);
      } else {
        response = await postPost(payload);
      }
      if (!isMounted.current) return;

      const { data: data2, message, success } = response.data;
    
      if (data2 && success) {
        setStatus(Success);
        
        if (isEditMode) {
          setMessage(message);
          toast.dismiss();
          toast.success(message);
          form.reset({
            ...data2,
            imageFile: null,
            imageUrl: imageUrl ?? initialData.imageUrl ?? null,
          });
          setPreviewUrl(imageUrl ?? initialData.imageUrl ?? null);
          // setStatus(Navigating)
          setTimeout(() => {
            navigate("/posts")
          }, 500)
        } else {
          setMessage(message);
          toast.dismiss();
          toast.success(message);
          form.reset();
          setPreviewUrl(null);
          // setStatus(Navigating)
          setTimeout(() => {
            navigate("/posts")
          }, 500)
        }
      } else {
        setStatus(Strange)
        setPreviewUrl(null);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ?? error.message ?? "Unknown error";

      if (!isMounted.current) return;
      setStatus(Err);
      setError(errorMessage);
    } finally {
      form.setValue("imageFile", null);
    }
  };

  useEffect(() => {
    if (initialData?.imageUrl) {
      setPreviewUrl(initialData?.imageUrl);
    }
  }, [initialData?.imageUrl]);

  if (isLoading) {
    return <Loading/>
  }
//  if (isRedirecting) {
//     return <Redirecting />;
//   }
  if (isUnusual) {
    return <Unusual error={error}/>
  }
  if (isError) {
    return <Error error={error} isHidden={!error}/>
  }

  return (
    <div>
      <div className="xs:w-3/5 lg:w-2/5 p-2 sm:p-4 md:p-6 bg-gradient-to-br from-blue-200 to-indigo-400 rounded-[10px] relative">
        <FormProvider {...form}>
          <Form onSubmit={form.handleSubmit(handleFormSubmit)}>
            <NavLink to={"/posts"}>
              <p className="absolute right-3 top-1.5 text-warning-content text-right text-xs sm:text-sm md:text-base hover:underline">
                Close
              </p>
            </NavLink>
            <FormField
              name="title"
              render={({ field }) => (
                <FormItem className="w-1/2">
                  <FormLabel>Title*</FormLabel>
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
            <Controller
              control={form.control}
              name="postType"
              render={({ field, fieldState }) => (
                <FormItem className="w-1/2 ">
                  <FormLabel>Post Type*</FormLabel>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    onOpenChange={(isOpen) => {
                      if (!isOpen) {
                        form.setFocus("postType");
                        form.trigger("postType");
                      }
                    }}
                  >
                    <FormControl>
                      <SelectTrigger
                        intent={
                          fieldState.error
                            ? "error"
                            : field.value && !fieldState.error
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
                  <FormLabel>Content*</FormLabel>
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
                    previewUrl={previewUrl}
                    error={form.formState.errors.imageFile?.message}
                  />
                </FormItem>
              )}
            />
            <div className="flex justify-between items-center">
              <div className="inline-flex gap-2">
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting
                    ? isEditMode
                      ? "Updating..."
                      : "Submitting..."
                    : isEditMode
                    ? "Update"
                    : "Submit"}
                </Button>
                <Button
                  type="button"
                  className="text-white/80"
                  onClick={() => {
                    form.reset();
                    setPreviewUrl(initialData?.imageUrl ?? null);
                  }}
                >
                  Reset
                </Button>
              </div>
              <p className="text-info-content text-right text-[10px] sm:text-xs md:text-sm">
                * required
              </p>
            </div>
            {/* <pre className="text-xs text-red-500">
              {JSON.stringify(form.formState.errors, null, 2)}
            </pre> */}
          </Form>
        </FormProvider>
      </div>
    </div>
  );
};

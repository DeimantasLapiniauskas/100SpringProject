import { useForm, FormProvider } from "react-hook-form";
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
import { PostRegisterSchema } from "@/schemas/PostRegisterScheme";
import pencil from "../../assets/icons/pencil.png";
import "../../index.css";

export const PostRegister = ({ initialData }) => {
  const form = useForm({
    resolver: zodResolver(PostRegisterSchema),
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
  const { Loading: Fetching, Success, Error: Err, Unusual: Unknown } = UIStatus;
  const { isLoading, isError, isUnusual, setStatus } = useUI();

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
          setTimeout(() => {
            navigate("/posts");
          }, 500);
        } else {
          setMessage(message);
          toast.dismiss();
          toast.success(message);
          form.reset();
          setTimeout(() => {
            navigate("/posts");
          }, 500);
        }
      } else {
        setStatus(Unknown);
        setPreviewUrl(null);
      }
    } catch (error) {
      if (!isMounted.current) return;

      const errorMessage =
        error.response?.data?.message ?? error.message ?? "Unknown error";
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
    return <Loading />;
  }

  if (isUnusual) {
    return <Unusual error={error} />;
  }
  if (isError) {
    return <Error error={error} isHidden={!error} />;
  }

  return (
    <div className="max-w-[1400px] mx-auto flex flex-col-reverse xs:flex xs:flex-row justify-center gap-2">
      <div className="flex flex-col gap-4 items-center mt-2 sm:mt-3 md:mt-4 lg:mt-5">
        <h1 className="text-center text-info-content text-[10px] sm:text-xs md:text-sm lg:text-base xl:text-lg font-semibold shadow-lg shadow-info-content p-3 rounded-[10px] bg-gradient-to-l from-red-500 via-white to-blue-500">
          REGISTER NEW POST HERE
        </h1>
        <img src={pencil} alt="pencil" className="w-40 sm:w-full" />
      </div>
      <div className="xs:max-w-3/5 xs:min-w-3/5 lg:min-w-1/2 lg:max-w-1/2 p-2 sm:p-4 md:p-6 bg-gradient-to-br from-blue-200 via-blue-300 to-indigo-400 rounded-[10px] relative mt-2 sm:mt-3 md:mt-4 lg:mt-5 flex border border-info shadow-lg shadow-info">
        <FormProvider {...form}>
          <Form
            onSubmit={form.handleSubmit(handleFormSubmit)}
            className="w-full"
          >
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
                      className={`${field.value && "font-semibold"}`}
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
                <FormItem className="w-1/2">
                  <FormLabel>Post Type*</FormLabel>
                  <FormControl>
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
                      <SelectTrigger
                        intent={
                          fieldState.error
                            ? "error"
                            : field.value && !fieldState.error
                            ? "success"
                            : "default"
                        }
                        className={`w-full ${
                          field.value === "Sale"
                            ? "text-red-700 font-semibold"
                            : field.value === "News"
                            ? "text-[#004C99] font-semibold"
                            : field.value === "Blog"
                            ? "text-[#006666] font-semibold"
                            : "text-info-content"
                        }`}
                      >
                        <SelectValue placeholder="Select a type" />
                      </SelectTrigger>
                      <SelectContent className="!w-[170%]">
                        <SelectItem
                          size="postRegForm"
                          value="News"
                          className="text-[#004C99]"
                        >
                          News
                        </SelectItem>
                        <SelectItem
                          size="postRegForm"
                          value="Blog"
                          className="text-[#006666]"
                        >
                          Blog
                        </SelectItem>
                        <SelectItem
                          size="postRegForm"
                          value="Sale"
                          className="text-red-700"
                        >
                          Sale
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
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
                <FormItem className="w-2/3">
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
            <div className="flex justify-between items-end">
              <div className="inline-flex pt-2 gap-2">
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
                <span className="text-xs sm:text-sm md:text-base">*</span>{" "}
                required
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

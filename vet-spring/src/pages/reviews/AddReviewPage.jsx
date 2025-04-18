import { useMemo, useState } from "react";
import { NavLink } from "react-router";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddReviewSchema } from "@/schemas/AddReviewSchema";
import { Textarea } from "@/components/uiBase/textareaBase";
import { Button } from "@/components/uiBase/buttonBase";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/uiBase/formBase";
import { useUI } from "@/context/UIContext";
import { UIStatus } from "@/constants/UIStatus";
import { useIsMounted } from "@/hooks/useIsMounted";
import { Loading } from "@/components/feedback/Loading";
import { Error } from "@/components/feedback/Error";
import { Unusual } from "@/components/feedback/Unusual";
import { Redirecting } from "@/components/feedback/Redirecting";
import { postEntity, putEntity } from "@/utils/helpers/entity";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useEntityPath } from "@/hooks/usePath";

export const AddReviewPage = ({initialData, getReviewError}) => {

  const form = useForm({
    resolver: zodResolver(AddReviewSchema),
    mode: "onChange",
    defaultValues: {
      title: initialData?.title ?? "",
      postType: initialData?.postType ?? "",
      content: initialData?.content ?? "",
      imageFile: null,
      imageUrl: initialData?.imageUrl ?? null,
    },
  });

  const [error, setError] = useState(getReviewError ? getReviewError : null)
  const [message, setMessage] = useState(null);
  const isEditMode = useMemo(() => !!initialData?.id, [initialData]);
  const isMounted = useIsMounted();
  const navigate = useNavigate();
  const entityPath = useEntityPath();

  const {
    Loading: Fetching,
    Success,
    Error: Err,
    Unusual: Unknown,
    Redirecting: Navigating,
  } = UIStatus;
  const { isLoading, isError, isUnusual, isRedirecting, setStatus } = useUI();

  const handleFormSubmit = async (data) => {
    try {
      let response
      setStatus(Fetching);
  
      if (isEditMode) {
        response = await putEntity(entityPath, data);
      } else {
        response = await postEntity(entityPath, data);
      }
      if (!isMounted.current) return;

      const { data: data2, message, success } = response.data;

      if(data2 && success) {
          setStatus(Success)
          setMessage(message)
          toast.success(message)
          if (isEditMode) {
            form.reset(data2)
          } else {
            form.reset();
          }
          setStatus(Navigating)
          navigate("/reviews")
      } else {
        setStatus(Unknown)
      }
    } catch (error) {
      if (!isMounted.current) return;
      
      const errorMessage = error.response?.data?.message ?? error.message ?? "Unknown error"
      form.reset()
      setStatus(Err);
      setError(errorMessage)
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isUnusual) {
    return <Unusual error={error} />;
  }
  if (isError) {
    return <Error error={error} isHidden={!error} />;
  }

  if (isRedirecting) {
    return <Redirecting />;
  }

  return (
    <div>
      <h1>Share Your Experience With Us</h1>

      <FormProvider {...form}>
        <Form onSubmit={form.handleSubmit(handleFormSubmit)} className="w-full">
          <NavLink to={"/reviews"}>
            <p className=" right-3 top-1.5 text-warning-content text-right text-xs sm:text-sm md:text-base hover:underline">
              Close
            </p>
          </NavLink>
          <FormField
            name="rating"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rate us</FormLabel>
                <FormControl>
                  <Rating
                    style={{ maxWidth: 150 }}
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          ></FormField>
          <FormField
            name="comment"
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
          <div className="flex justify-between items-end">
            <div className="inline-flex pt-2 gap-2">
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting
                  ? isEditMode
                    ? "Editing..."
                    : "Submitting..."
                  : isEditMode
                  ? "Edit"
                  : "Submit"}
              </Button>
              <Button
                type="button"
                className="text-white/80"
                onClick={() => {
                  form.reset();
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
        </Form>
      </FormProvider>
    </div>
  );
};

import { useMemo, useRef, useState } from "react";
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
import closeButton from "../../assets/icons/close-button.svg";
import "../../index.css";
import reviewDogy from "../../assets/images/reviewDogy.png";
import { FloatingReviewBubbles } from "./FloatingReviewBubbles";
import { ChevronsRight } from "lucide-react";
import reviewParrot from "../../assets/images/vet-parrot.png";
import reviewHamster from "../../assets/images/vet-hamster.png";
import { useEffect } from "react";
import { getAllEntitys } from "@/utils/helpers/entity";
import vetDoc from "../../assets/icons/vetDoc.png";
import { warningToast } from "@/components/uiBase/toast/toastUtils";

export const AddReviewPage = ({ initialData, getReviewError, feedbackRef }) => {
  const form = useForm({
    resolver: zodResolver(AddReviewSchema),
    mode: "onChange",
    defaultValues: {
      rating: initialData?.rating ?? null,
      comment: initialData?.comment ?? "",
    },
  });

  const [error, setError] = useState(getReviewError ? getReviewError : null);
  const [message, setMessage] = useState(null);
  const [fetching, setIsFetching] = useState(false);
  const [reviews, setRewies] = useState([]);

  const isEditMode = useMemo(() => !!initialData?.id, [initialData]);
  const preventUnmountRef = useRef(false);
  const isMounted = useIsMounted(preventUnmountRef);
  const controllerRef = useRef(new AbortController());
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
    preventUnmountRef.current = true;
    if (feedbackRef) {
      feedbackRef.current = true;
    }
    controllerRef.current = new AbortController();
    const signal = controllerRef.current.signal;

    try {
      let response;
      setStatus(Fetching);

      if (isEditMode) {
        response = await putEntity(entityPath, initialData.id, data, signal);
      } else {
        response = await postEntity(entityPath, data, signal);
      }
      preventUnmountRef.current = false;

      if (signal.aborted) return;
      if (!isMounted.current) return;

      const { data: data2, message, success } = response.data;

      if (data2 && success) {
        setStatus(Success);
        setMessage(message);
        toast.success(message);
        if (isEditMode) {
          form.reset(data2);
        } else {
          form.reset();
        }
        if (feedbackRef) {
          feedbackRef.current = false;
        }
        setTimeout(() => {
          setStatus(Navigating);
          navigate("/home");
          return
        }, 1000)
      } else {
        setStatus(Unknown);
      }
    } catch (error) {
      if (error.name === "AbortError") {
        toast.error("Request was cancelled");
        return;
      }

      if (!isMounted.current) return;

      const errorMessage =
        error.response?.data?.message ?? error.message ?? "Unknown error";
      form.reset();
      setStatus(Err);
      setError(errorMessage);
    }
  };

  useEffect(() => {
    const getAllReviews = async () => {
      try {
        setIsFetching(true);
        const response = await getAllEntitys("reviews");
        if (!isMounted) return;

        const { data } = response.data;

        if (data) {
          setRewies(data.reviewResponseListDTO);
          setIsFetching(false);
        }
      } catch (error) {

        if (error.name === "AbortError") {
          toast.error("Request was cancelled");
          return;
        }
        if (!isMounted) return;

        const errorMessage =
          error.response?.data?.errorMessage ??
          error.message ??
          "Unknown error";
        console.log(errorMessage);
      }
    };
    getAllReviews();
  }, []);

  if (isRedirecting) {
    return (
      <div className="h-[20rem] md:h-[35rem]">
        <Redirecting />
      </div>
    );
  }

  if (isUnusual) {
    return <Unusual error={error} />;
  }
  if (isError) {
    return <Error error={error} />;
  }

  return (
    <div
      className="flex flex-col items-end  px-1 py-1 sm:py-2 sm:px-2 md:px-3 md:py-3 lg:px-4 lg:py-4 
    h-screen relative bg-gradient-to-b via-sky-transparent xs:via-sky-900 to-sky-900 xs:to-transparent"
    >
      <img
        src={vetDoc}
        alt="vetDoc"
        className=" absolute w-15 xs:w-20 sm:w-25 md:w-30 lg:w-35 bottom-[14rem] xs:top-3 left-[50%] xs:left-[10%] md:left-[20%] rounded-2xl"
      />
      <FloatingReviewBubbles reviews={reviews} />
      <div className="flex items-center flex-col w-full xs:w-2/3 md:w-1/2 relative">
        <img
          src={reviewParrot}
          alt="reviewParrot"
          className=" w-15 sm:w-20 md:w-25 lg:w-30 absolute right-20 xs:right-12  top-[-0.5rem] sm:top-[-0.75rem] md:top-[-1rem] lg:top-[-1.25rem]"
        />
        {isLoading ? <Loading /> : <img
          src={reviewDogy}
          alt="reviewDogy"
          className="w-30 sm:w-40 md:w-50 lg:w-60 z-10"
        />}
        <div className="relative w-full">
          <img
            src={reviewHamster}
            alt="reviewHamster"
            className="absolute w-8 sm:w-10 md:w-12 lg:w-14 top-[-2.2rem] sm:top-[-2.75rem] md:top-[-3.35rem] lg:top-[-4rem] left-9 "
          />
          <div className="bg-gradient-to-b from-amber-300 via-white to-amber-300 text-center p-5 relative rounded-[10px]  border-2 border-amber-300 shadow-sm shadow-amber-300 top-[-11px] sm:top-[-14px] md:top-[-18px] lg:top-[-22px]">
            <h1 className="responsive-text-lg font-semibold text-amber-800 pb-3 sm:pb-4 md:pb-5">
              We’d Love to Hear Your Feedback
            </h1>
            <FormProvider {...form}>
              <Form onSubmit={form.handleSubmit(handleFormSubmit)}>
                <NavLink to={"/home"}>
                  <div className="flex justify-end absolute top-1.5 right-3">
                    <span className=" transition-transform duration-300 origin-center hover:scale-115 inline-block  w-10 sm:w-11 md:w-12 ">
                      <img src={closeButton} alt="closeButton" />
                    </span>
                  </div>
                </NavLink>
                <FormField
                  name="rating"
                  render={({ field }) => (
                    <FormItem className="flex items-center flex-col mb-1">
                      <FormLabel className="mb-1" intent="amber">
                        Rate us*
                      </FormLabel>
                      <FormControl>
                        <Rating
                          style={{ maxWidth: 150 }}
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage>
                        {form.formState.errors.rating?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                ></FormField>
                <FormField
                  name="comment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel intent="amber">Comment</FormLabel>
                      <FormControl>
                        <Textarea
                          intent={
                            form.formState.errors.content
                              ? "error"
                              : field.value && !form.formState.errors.content
                              ? "success"
                              : "amber"
                          }
                          placeholder="Write a content..."
                          {...field}
                          className="border-2"
                        />
                      </FormControl>
                      <FormMessage>
                        {form.formState.errors.comment?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />
                <div className="flex justify-between items-end">
                  <div className="inline-flex pt-2 gap-2">
                    <Button
                      type="submit"
                      disabled={form.formState.isSubmitting}
                      variant="review"
                      size="sm"
                      intent="review"
                    >
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
                      size="sm"
                      intent="faded"
                      className="text-white/90"
                      onClick={() => {
                        form.reset();
                      }}
                      disabled={form.formState.isSubmitting}
                    >
                      Reset
                    </Button>
                  </div>
                  <Button
                    type="button"
                    variant="cancel"
                    size="sm"
                    onClick={() => {
                      controllerRef?.current?.abort();
                      warningToast("Request cancelled");
                    }}
                  >
                    Cancel
                  </Button>
                  <p className="text-amber-800 text-right responsive-text-sm">
                    <span className="responsive-text-md">*</span>
                    required
                  </p>
                </div>
              </Form>
            </FormProvider>
          </div>
        </div>
      </div>
      <NavLink
        to="/reviews"
        className="responsive-text-sm text-amber-800 font-semibold text-xl-start w-full px-2 md:px-4  relative top-[-1.5%]"
      >
        <p className="inline-flex hover:underline items-center ">
          <span>
            <ChevronsRight className="w-4 sm:w-5 md:w-6" />
          </span>
          Read more Reviews
        </p>
      </NavLink>
    </div>
  );
};

import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import {
  updateService,
  uploadServiceImage,
} from "../../utils/helpers/serviceService.js";
import api from "../../utils/api";
import { useState, useEffect } from "react";
import { Error } from "../../components/feedback/Error.jsx";
import { Dropzone } from "@/components/uiBase/dropZoneBase";
import { Controller } from "react-hook-form";
export const ServiceUpdate = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/services/${id}`);

        const data = response.data.data;

        const { name, description, price, imageUrl } = data;
        console.log(data);

        setValue("name", name);
        setValue("description", description);
        setValue("price", price);
        setValue("imageUrl", imageUrl);
        setPreviewUrl(imageUrl);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData();
  }, [data, setValue]);

  const formSubmitHandler = async (data) => {
    setIsLoading(true);
    setSubmitError(null);
    let imageUrl = null;

    try {
      if (data?.imageFile) {
        const formData = new FormData();
        formData.append("file", data.imageFile);
        const imageRes = await uploadServiceImage(formData);

        imageUrl = imageRes.data.data;
        console.log(imageUrl);
        setPreviewUrl(imageUrl);
      }
      const payload = {
        name: data.name,
        description: data.description,
        price: data.price,
        imageUrl: imageUrl ?? null,
      };

      await updateService(id, payload);
      console.log(payload);
      console.log("Resetting form...");
      reset({
        name: "",
        description: "",
        price: "",
        imageFile: null,
        imageUrl: null,
      });
      setPreviewUrl(null);
      console.log("Form reset complete");
      navigate("/services");
    } catch (error) {
      setError(error.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="grid place-items-center h-screen">
      <div className="flex flex-col gap-2 items-center">
        <form onSubmit={handleSubmit(formSubmitHandler)}>
          <fieldset className=" bg-[#97a0f1] fieldset w-xs border border-base-300 p-4 rounded-box">
            <legend className="fieldset-legend pt-8">ServiceEdit</legend>

            <label className="fieldset-label"> Name </label>
            <input
              {...register("name", {
                required: "Name is required",
                minLength: 3,
                maxLength: 150,
                pattern: "^[A-Za-z0-9s-]+$",
              })}
              type="text"
              className="input focus:outline-[0px] focus:border-base-300"
              placeholder="Enter name of service"
            />

            <label className="fieldset-label ">Description</label>
            <textarea
              {...register("description", {
                required: "Description is required",
                pattern: "^[A-Za-z0-9\\s.\\-?!',’]*$",
                maxLength: 255,
              })}
              rows="8"
              type="text"
              className="block w-full text-sm resize-none text-gray-900 bg-gray-50 focus:outline-[0px]"
              placeholder="Enter description"
            />

            <label className="fieldset-label text-black">Price</label>
            <input
              {...register("price", {
                required: "Price is required",
                min: 0,
              })}
              type="mydouble"
              className="input focus:outline-[0px] focus:border-base-300"
              placeholder="Enter price"
            />
            <Controller
              name="imageFile"
              control={control}
              rules={{ required: "Image is required" }}
              render={({ field, fieldState }) => (
                <Dropzone
                  onDrop={async (file) => {
                    field.onChange(file);
                    const reader = new FileReader();
                    reader.onload = () => setPreviewUrl(reader.result);
                    reader.readAsDataURL(file);
                  }}
                  previewUrl={previewUrl}
                  error={fieldState.error?.message}
                />
              )}
            />
            <button
              type="submit"
              className="btn bg-black border-neutral-950 text-white hover:bg-white hover:text-neutral-950 mt-4"
            >
              ServiceEdit
            </button>
          </fieldset>

          <Error error={error} isHidden={!error} />
        </form>
      </div>
    </main>
  );
};

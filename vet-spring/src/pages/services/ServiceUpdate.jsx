import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { updateService } from "../../utils/helpers/serviceService.js";
import api from "../../utils/api";
import { useState, useEffect } from "react";
import { Error } from "../../components/Error.jsx";
export const ServiceUpdate = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/services/${id}`);
        const data = response.data;
        const { name, description, price } = data;

        setValue("name", name);
        setValue("description", description);
        setValue("price", price);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData();
  }, [data, setValue]);

  const formSubmitHandler = async (data) => {
    setIsLoading(true);
    setSubmitError(null);

    const trimmedData = {
      ...data,
      name: data.name.trim(),
    };

    const payload = { ...trimmedData };

    try {
      const { data } = await updateService(id, payload);

      console.log("Resetting form...");
      reset({
        name: "",
        description: "",
        price: "",
      });

      console.log("Form reset complete");
      navigate("/services");
    } catch (error) {
      setError(error.response?.data?.message || error.message);
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

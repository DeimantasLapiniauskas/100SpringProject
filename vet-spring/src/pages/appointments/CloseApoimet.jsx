import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import api from "../../utils/api";
import { useParams, useNavigate } from "react-router";
export const CloseApoiment = () => {
  const { id } = useParams();
  const [error, setError] = useState();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const [data, setData] = useState();
const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      
        try {
          const response = await api.get(`/appointments/client/${id}`);
          const data = response.data[0];          
          const {appointmentDate} = data;

          setValue("appointmentDate", appointmentDate);

        } catch (error) {
          setError(error.message);
        }
    };
    fetchData();
  }, [data, setValue]);

  const formSubmitHandler = async (data) => {

    const payload = {
      newDate: data.appointmentDate
    };
    
    try {

      const { data } = await api.put(`/appointments/${id}`,payload);
      
      console.log("Resetting form...");
      reset({
        appointmentDate: ""
      });

      console.log("Form reset complete");
      navigate("/appointments");

      
    } catch (error) {
      setError(error.response?.data?.message || error.message);
    }
  }

  return (
    <div className="z-2">
      <div className="bg-[#97a0f1] border border-[#97a0f1] p-8 rounded-box text-black">
        <h1 className="text-center text-2xl p-4">Register to appointment</h1>
        <form
          onSubmit={handleSubmit(formSubmitHandler)}
          className="grid grid-cols-1 w-3/5 m-auto mb-16"
        >
          <div>
            <div className="flex flex-row justify-between pt-2 pb-1">
              <label htmlFor="appointmentDate"> Date </label>
              <div className="text-red-700 font-medium">
                {errors.appointmentDate?.message}
              </div>
            </div>
            <input
              type="datetime-local"
              {...register("appointmentDate", {
                required: { value: true, message: "This field is required" },
              })}
              className="input autofill:shadow-[inset_0_0_0px_1000px_rgb(250,250,250)"
            />
          </div>

          <button
            type="submit"
            className=" btn custom-white-btn mt-1"
          >
            Register
          </button>
        </form>
        
      </div>
    </div>
  );
}


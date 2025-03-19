import { useForm } from "react-hook-form";
import { addService } from "../../utils/helpers/serviceService.js";
import { useNavigate } from "react-router";
import {useState, useEffect} from "react";
import {Error} from "../../components/Error.jsx";
export const ServiceAdd = ({ service}) => {
  const navigate = useNavigate();
  const [error, setError] = useState()
        const {
          register,
          handleSubmit,
          reset,
          setValue,
          formState: { errors },
        } = useForm();

        const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState(null);
        
  // useEffect(() => {
  //   if (service) {
  //     const { name, description, price } = service;

  //     setValue("name", name);
  //     setValue("description", description);
  //     setValue("price", price);
      
  //   }
  // }, [service, setValue]);

  const formSubmitHandler = async (data) => {
    setIsLoading(true);
    setSubmitError(null);

    const trimmedData = {
      ...data,
      name: data.name.trim(),
    }

    const payload = { ...trimmedData};

    try {
        let response1;
          response1 = await addService(payload);
        console.log("Resetting form...");
        reset({
          name: "",
          description: "",
          price: "",
        });

        console.log("Form reset complete");
        navigate("/services");  
      } catch (error) {
        setError(error.response?.data?.message || error.message)
      } finally {
        setIsLoading(false);
      }
    };



    
    return(
        <main className="grid place-items-center h-screen">
            <div className="flex flex-col gap-2 items-center">
                <form onSubmit={handleSubmit(formSubmitHandler)}>
                {submitError && <p className="bg-red-700">{submitError}</p>}

                    <fieldset className=" bg-[#97a0f1] fieldset w-xs border border-base-300 p-4 rounded-box">
                        <legend className="fieldset-legend pt-8">ServiceAdd</legend>

                        <label className="fieldset-label"> Name </label>
                        <input {...register("name", {
                          required:"Name is required",
                          minLength:3,
                          maxLength:150,
                          pattern:"^[A-Za-z0-9\s-]+$"
                        })} 
                          type="text" 
                        className="input focus:outline-[0px] focus:border-base-300" 
                        placeholder="Enter name of service" />
                        
                        <label className="fieldset-label ">Description</label>
                        <textarea  {...register("description", {
                          required:"Description is required",
                          maxLength:255
                        })} 
                        rows="8"
                        type="text" 
                        className="block w-full text-sm resize-none text-gray-900 bg-gray-50 focus:outline-[0px]" 
                        placeholder="Enter description" />
   
                        <label className="fieldset-label">Price</label>
                        <input {...register("price", {
                          required:"Price is required",
                          min:0
                        })} 
                        type="mydouble" 
                        className="input focus:outline-[0px] focus:border-base-300" 
                        placeholder="Enter price"/>
 
                        <button type="submit" className="btn bg-black border-neutral-950 text-white mt-4">ServiceAdd</button>
  
                    </fieldset>
                    <Error error={error} isHidden={!error} />
                </form>
            </div>
        </main>
        
    )
    
};
import { useForm } from "react-hook-form";
import { addService, updateService } from "../../utils/serviceService.js";
import { useAuth } from "../../context/AuthContext";
import {useState, useEffect} from "react";
import {Error} from "../../components/Error.jsx";
export const ServiceAdd = ({ service, onServiceUpdate, onClose }) => {

    const { account } = useAuth();
  const { account_id } = account;
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
        
  useEffect(() => {
    if (service) {
      const { name, description, price } = service;

      setValue("name", name);
      setValue("description", description);
      setValue("price", price);
      
    }
  }, [service, setValue]);

  const formSubmitHandler = async (data) => {
    setIsLoading(true);
    setSubmitError(null);

    const trimmedData = {
      ...data,
      name: data.name.trim(),
    }

    const payload = { ...trimmedData, account_id};

    try {
        let response1;
        if (service && service.id) {
          response1 = await updateService(service.id, payload);
        } else {
          response1 = await addService(payload);
        }
        //onPetUpdate(response1.data);
        console.log("Resetting form...");
        reset({
          name: "",
          description: "",
          price: "",
        });

        console.log("Form reset complete");
        //onClose();
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

                    <fieldset className=" bg-orange-300 fieldset w-xs border border-base-300 p-4 rounded-box">
                        <legend className="fieldset-legend pt-8">ServiceAdd</legend>

                        <label className="fieldset-label"> Name </label>
                        <input {...register("name")} type="text" 
                        className="input focus:outline-[0px] focus:border-base-300" 
                        placeholder="Enter name of service" />
                        
                        <label className="fieldset-label ">Description</label>
                        <input {...register("description")} type="text" 
                        className="input focus:outline-[0px] focus:border-base-300" 
                        placeholder="Enter description" />
                       
                        <label className="fieldset-label">Price</label>
                        <input {...register("price")} type="mydouble" 
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
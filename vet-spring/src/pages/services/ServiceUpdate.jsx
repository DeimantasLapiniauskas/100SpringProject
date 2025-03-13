import { useForm } from "react-hook-form";
import { addService, updateService } from "../../utils/serviceService.js";
import { useAuth } from "../../context/AuthContext";
import {useState, useEffect} from "react";
import {Error} from "../../components/Error.jsx";
export const ServiceEdit = ({ service, onServiceUpdate, onClose }) => {

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
        const fetchData = async () => {
          try {
            
            const response = await api.get(`/services/${id}`);
            const data = await response.json();
    
            setData(data);
            setLoading(false);
          } catch (error) {
            setError(error.message);
            setLoading(false);
          }
        };
      }, []);

      const formSubmitHandler = async (data) => {
        try {
          const response = await api.put(`/services/${id}`)
          if (!response.ok) {
            throw new Error(`Respose ststus: ${response.status}`);
          }
          navigate("/");
        } catch (error) {
          console.error(error);
        }
      };
      if (loading) {
        return <p>Loding ...</p>;
      }
      if (error) {
        return <p>Error: {error}</p>;
      }


    
    return(
        <main className="grid place-items-center h-screen">
            <div className="flex flex-col gap-2 items-center">
                <form onSubmit={handleSubmit(formSubmitHandler)}>
                {submitError && <p className="bg-red-700">{submitError}</p>}

                    <fieldset className=" bg-orange-300 fieldset w-xs border border-base-300 p-4 rounded-box">
                        <legend className="fieldset-legend pt-8">ServiceAdd</legend>

                        <label className="fieldset-label"> Name </label>
                        <input {...register("name", {
                          required:"Name is required",
                          minLength:3,
                          maxLength:150
                        })} 
                          type="text" 
                        className="input focus:outline-[0px] focus:border-base-300"
                         
                        placeholder="Enter name of service" />
                        
                        <label className="fieldset-label ">Description</label>
                        <input {...register("description", {
                          required:"Description is required",
                          maxLength:255
                        })} 
                        type="text" 
                        className="input focus:outline-[0px] focus:border-base-300" 
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
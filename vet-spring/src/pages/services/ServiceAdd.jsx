import { useForm } from "react-hook-form";
import api from "../../utils/api";
import {Error} from "../../components/Error.jsx";
import {useState} from "react";
export  const ServiceAdd = () => {
    const {
        register,handleSubmit} = useForm();

    const [error, setError] = useState("")

    const onSubmit = async () => {


        
        try {


            const {data} = await api.post(`/services`, {
                name: "Name",
                description: "description",
                price:5
            });
            console.log(data);
        } catch (error) {
            setError(error.response?.data?.message ?? error.message)
            
        }
        
    };
    return(
        <main className="grid place-items-center h-screen">
            <div className="flex flex-col gap-2 items-center">
                <form onSubmit={handleSubmit(onSubmit)} onClick={() => setError("")}>
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
                </form> 
                
                <Error error={error} isHidden={!error} />
            </div>
        </main>
    )
};
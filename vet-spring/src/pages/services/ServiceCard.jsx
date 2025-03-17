import { NavLink } from "react-router";
import {useAuth} from "../../context/AuthContext.jsx";
import api from "../../utils/api.js";
import {Error} from "../../components/Error.jsx";
import {useState} from "react";
import { usePagination } from "../../context/PaginationContext.jsx";

export const ServiceCard = (props) => {
    const{service} = props
    const{id, name, description, price} = service
    const [error, setError] = useState("")
    const{ account } = useAuth()
    const {getPage, currentPage, pageSize} = usePagination();
    
    const deleteService = async () => {
        
        try {
            await api.delete(`/services/${id}`);
            getPage(pageSize, currentPage)
        } catch (error) {
            setError(error.response?.message || error.message);
        }
        
    }
    const editService = async () => {
        try {
            await api.put(`/services/${id}`);
            await getPage(pageSize, currentPage)
        } catch (error) {
            setError(error.response?.message || error.message);
        }
    }


    


    // const registrApoiment = async(data) => {
    //     const trimmedData = {
    //         ...data,
    //         name: data.id.trim(),
    //       }
    //       const payload = { ...trimmedData};
    //       console.log(payload);
          
    //     try{
    //         await api.post("/appointments", payload);
    //     } catch (error) {
    //         setError(error.response?.message || error.message);
    //     }
    //}

    return (
        <div className="card card-side shadow-sm bg-[#6A7AFF] text-[#FFFFFF]">
            <div className="card-body">
            <h2 className="card-title">{name}</h2>
            <div className="text-warp w-[20rem]">{description}</div>
            <p>{price} €</p>
            <div className="card-actions">
            {   <button onClick={deleteService} className="btn btn-error bg-[#FFFFFF] border-0">Delete</button>}
            {   <NavLink to={`/services/edit/${service.id}`} className="btn btn-error bg-[#FFFFFF] border-0">Edit</NavLink>}
             {/* <button onClick={registrApoiment} className="btn btn-error bg-[#FFFFFF] border-0">reg</button>     */}
                </div>
                <Error error={error} isHidden={!error} />
            </div>
        </div>
    )
}


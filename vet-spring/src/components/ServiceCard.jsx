import {useAuth} from "../context/AuthContext.jsx";
import api from "../utils/api.js";
import {Error} from "./Error.jsx";
import {useState} from "react";

export const ServiceCard = (props) => {
    const{service, getServicePage, currentPage, pageSize} = props
    const{id, name, description, price} = service
    const{error, setError} = useState("")
    const{ user } = useAuth()

    const deleteService = async () => {

        try {
            await api.delete(`/services/${id}`);
            await getServicePage(pageSize, currentPage)
        } catch (error) {
            setError(error.response?.message || error.message);
        }
    }

    return(
        <div className="card card-side bg-base-100 shadow-sm">
            <div className="card-body">
            <h2 className="card-title">{name}</h2>
            <p>{description}</p>
            <p>{price}</p>
            <div className="card-actions">
            { user.roles?.includes("ROLE_ADMIN") && <button onClick={deleteService} className="btn btn-error">Delete</button> }
                </div>
                <Error error={error} isHidden={!error} />
            </div>
        </div>
    )
};
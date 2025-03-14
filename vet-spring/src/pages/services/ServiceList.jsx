import {useEffect, useState} from "react";
import api from "../../utils/api";
import {useAuth} from "../../context/AuthContext.jsx";
import {ServiceCard} from "./ServiceCard.jsx";
import {Error} from "../../components/Error.jsx";
import {NavLink} from "react-router";

export const ServiceList = () => {
    const [services, setServices] = useState()
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(12)
    const [error, setError] = useState()
    const{ account } = useAuth()

    const getServicePage = async (size, page) => {
        try {
            const response = await api.get(`/services?size=${size}&page=${page}`)
            
            setServices(response.data)
        } catch (error) {
            setError(error.response?.data?.mesage || error.mesage)

        }
    }

    const onPageSizeChange = async (e) => {
        const pageSize = e.target.value;
        await getServicePage(pageSize, 1)
        setCurrentPage(1)
        setPageSize(pageSize)
    }


    const onPaginate = async (page) => {
        if (page < 1) return

        await getServicePage(pageSize, page)
        setCurrentPage(page)
    }

    useEffect(() => {
        getServicePage(pageSize, currentPage)
    }, []);

    const checkRoles = () => {

        if(
        account.scope?.includes("ROLE_VET")) {
            return true
        }
        else if (account.scope?.includes("ROLE_ADMIN")) {
            return true
        }
            else return false
    }

    return (
        <div className="flex flex-col items-center gap-8 p-8 ">
         { checkRoles() && <NavLink to={`/services/add`} className="btn btn-primary">Add</NavLink>}
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            
                {services && services?.map(service => (
                    <ServiceCard key={service.id} service={service} getServicePage={getServicePage} currentPage={currentPage} pageSize={pageSize}/>
                ))}
            </ul>
            <div className="join " >
                <button className="join-item btn " onClick={async () => await onPaginate(currentPage - 1)}>«</button>
                <button className="join-item btn ">Page {currentPage}</button>
                <button className="join-item btn " onClick={async () => await onPaginate(currentPage + 1)}>»</button>
                <select
                    defaultValue="12"
                    className="join-item select ml-4"
                    onChange={onPageSizeChange}
                >
                    <option value="9">9</option>
                    <option value="12">12</option>
                    <option value="15">15</option>
                </select>
            </div>
            <Error error={error} isHidden={!error} />
            </div>
    )
}
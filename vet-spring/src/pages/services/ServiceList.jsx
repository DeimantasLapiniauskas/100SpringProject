import { usePagination } from "../../context/PaginationContext.jsx";
import {useAuth} from "../../context/AuthContext.jsx";
import {ServiceCard} from "./ServiceCard.jsx";
import {Error} from "../../components/Error.jsx";
import {NavLink} from "react-router";

export const ServiceList = () => {
    const{ account } = useAuth()
    const { getPage, onPageSizeChange, onPaginate, error, content, currentPage, totalPages, pageSize } = usePagination();




    const checkRoles = () => {
        return account.scope?.includes("ROLE_VET") || account.scope?.includes("ROLE_ADMIN");
    }

    return (
        <div className="flex flex-col items-center gap-8 p-8 ">
         { checkRoles() && <NavLink to={`/services/add`} className="btn btn-primary">Add</NavLink>}
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            
                {content?.map(service => (
                    <ServiceCard key={service.id} service={service} getServicePage={getPage} currentPage={currentPage} pageSize={pageSize}/>
                ))}
            </ul>
            <div className="join " >
                <button className="join-item btn " onClick={async () => onPaginate(currentPage - 1)}>«</button>
                <button className="join-item btn ">Page {currentPage + 1}</button>
                <button className="join-item btn " onClick={async () => onPaginate(currentPage + 1)}>»</button>
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

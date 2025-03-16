import {useEffect, useState} from "react";
// import api from "../../utils/api";
import {PetCard} from "./PetCard.jsx";
import {Error} from "../../components/Error.jsx";
import { useAuth } from "../../context/AuthContext"
import { usePagination } from "../../context/PaginationContext.jsx";

export const PetList = () => {
    const {account} = useAuth()
    const {iat} = account || ""
    const [welcome, setWelcome] = useState(true)

    const { getPage, onPageSizeChange, onPaginate, error, content, currentPage, totalPages, pageSize } = usePagination();
    
    //TODO fadeout effect
    const welcomeClosure = () => {
        setTimeout(() => {
            setWelcome(false)
        }, 2000)
    }

    useEffect(() => {
        welcomeClosure()
    },[])

    const roleCheck = () => {
        return account.scope?.includes("ROLE_CLIENT") || account.scope?.icludes("ROLE_ADMIN")
    }

    return (
        <>
        {(iat * 1000) + 2000 > Date.now() && welcome ? <div className="rounded-[10px] border-2 border-amber-900 text-white bg-amber-400 flex w-[5rem]">Welcome!</div> : ""}

        <div className="flex flex-col items-center gap-8 p-8">
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {content?.map(pet => (
                    <PetCard key={pet.id} pet={pet} getPage={getPage} currentPage={currentPage} pageSize={pageSize} roleCheck={roleCheck}/>
                ))}
            </ul>
            <div className="join">
                <button className="join-item btn" onClick={async () => onPaginate(currentPage - 1)}
                    disabled={currentPage === 0}>«</button>
                <button className="join-item btn">Page {currentPage + 1}</button>
                <button className="join-item btn" onClick={async () => onPaginate(currentPage + 1)}
                    disabled={currentPage === totalPages - 1}
                    >»</button>
                <select
                    defaultValue="6"
                    className="join-item select ml-4"
                    onChange={onPageSizeChange}
                >
                    <option value="6">6</option>
                    <option value="9">9</option>
                    <option value="12">12</option>
                </select>
            </div>
            <Error error={error} isHidden={!error} />
        </div>
        </>
    )
}
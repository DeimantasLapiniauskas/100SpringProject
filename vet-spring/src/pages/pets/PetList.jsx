import {useEffect, useState} from "react";
// import api from "../../utils/api";
// import {PetCard} from "../../components/PetCard.jsx";
// import {Error} from "../../components/Error.jsx";
import { useAuth } from "../../context/AuthContext"

export const PetList = () => {
    const {account} = useAuth()
    const {iat} = account || ""
    const [welcome, setWelcome] = useState(true)
    // const [pets, setPets] = useState([])
    // const [currentPage, setCurrentPage] = useState(1)
    // const [pageSize, setPageSize] = useState(12)
    // const [error, setError] = useState()

//TODO fadeout effect
const welcomeClosure = () => {
    setTimeout(() => {
        setWelcome(false)
    }, 2000)
}

useEffect(() => {
    welcomeClosure()
},[])

    // const getPetPage = async (size, page) => {
    //     try {
    //         const response = await api.get(`/pets?size=${size}&page=${page}`)
    //         setPets(response.data)
    //     } catch (error) {
    //         setError(error.response?.data?.message || error.message)
    //     }
    // }

    // const onPageSizeChange = async (e) => {
    //     const pageSize = e.target.value;
    //     await getPetPage(pageSize, 1)
    //     setCurrentPage(1)
    //     setPageSize(pageSize)
    // }

    // const onPaginate = async (page) => {
    //     if (page < 1) return

    //     await getPetPage(pageSize, page)
    //     setCurrentPage(page)
    // }

    // useEffect(() => {
    //     getPetPage(pageSize, currentPage)
    // }, []);

    return (
        <>
        {(iat * 1000) + 2000 > Date.now() && welcome ? <div className="rounded-[10px] border-2 border-amber-900 text-white bg-amber-400 flex w-[5rem]">Welcome!</div> : ""}
        
        {/* <div className="flex flex-col items-center gap-8 p-8">
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {pets?.map(pet => (
                    <PetCard key={pet.id} pet={pet} getPetPage={getPetPage} currentPage={currentPage} pageSize={pageSize} />
                ))}
            </ul>
            <div className="join">
                <button className="join-item btn" onClick={async () => await onPaginate(currentPage - 1)}>«</button>
                <button className="join-item btn">Page {currentPage}</button>
                <button className="join-item btn" onClick={async () => await onPaginate(currentPage + 1)}>»</button>
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
        </div> */}
        </>
    )
}
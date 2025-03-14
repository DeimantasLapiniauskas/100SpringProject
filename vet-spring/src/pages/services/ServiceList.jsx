import {useEffect, useState} from "react";
import api from "../../utils/api";
import {ServiceCard} from "./ServiceCard.jsx";
import {Error} from "../../components/Error.jsx";
import {NavLink} from "react-router";

import ServiceListPageVetHoldingCat from "../../assets/cart.png";
import ServiceListPageVetHoldingDog from "../../assets/vet.png";
import ServiceListPageCatPawBandage from "../../assets/peti.png";
import ServiceListPageCatSurgery from "../../assets/sur.png";
import ServiceListPageVetListeningDog from "../../assets/cons.png";

export const ServiceList = () => {
    const [services, setServices] = useState()
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(12)
    const [error, setError] = useState()


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

    return (
      <div className="flex flex-col items-center gap-8 p-8 ">
        <NavLink to={`/services/add`} className="btn btn-primary">
          Add
        </NavLink>
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services &&
            services?.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                getServicePage={getServicePage}
                currentPage={currentPage}
                pageSize={pageSize}
              />
            ))}
        </ul>
        <div className="join ">
          <button
            className="join-item btn "
            onClick={async () => await onPaginate(currentPage - 1)}
          >
            «
          </button>
          <button className="join-item btn ">Page {currentPage}</button>
          <button
            className="join-item btn "
            onClick={async () => await onPaginate(currentPage + 1)}
          >
            »
          </button>
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

{/* Centered Text and Horizontal Image Section */}
<div className="flex flex-col items-center text-center space-y-4">
  <h1 className="text-4xl text-black">
    Find What Your Pet Needs
    <br /> Here To Make Your
    <br /> Pet Happy
  </h1>

  {/* Horizontal Image Section */}
  <div className="flex space-x-4 overflow-x-auto"> {/* Ensures horizontal scroll if needed */}
    <figure className="w-[400px] h-[500px] bg-[#6A7AFF] border-4 border-white rounded-[70px] p-4 flex items-center justify-center overflow-hidden">
      <img
        src={ServiceListPageVetHoldingCat}
        alt="Vet holding gray cat"
        className="w-full h-full object-contain rounded-[30px]" /* Rounded corners for the image */
      />
    </figure>
    <figure className="w-[400px] h-[500px] bg-[#6A7AFF] border-4 border-white rounded-[70px] p-4 flex items-center justify-center overflow-hidden">
      <img
        src={ServiceListPageVetHoldingDog}
        alt="Vet holding black and white puppy"
        className="w-full h-full object-contain rounded-[30px]" /* Rounded corners for the image */
      />
    </figure>
    <figure className="w-[400px] h-[500px] bg-[#6A7AFF] border-4 border-white rounded-[70px] p-4 flex items-center justify-center overflow-hidden">
      <img
        src={ServiceListPageCatPawBandage}
        alt="Vet holding brown cat"
        className="w-full h-full object-contain rounded-[30px]" /* Rounded corners for the image */
      />
    </figure>
    <figure className="w-[400px] h-[500px] bg-[#6A7AFF] border-4 border-white rounded-[70px] p-4 flex items-center justify-center overflow-hidden">
      <img
        src={ServiceListPageCatSurgery}
        alt="Vet performing surgery on cat"
        className="w-full h-full object-contain rounded-[30px]" /* Rounded corners for the image */
      />
    </figure>
    <figure className="w-[400px] h-[500px] bg-[#6A7AFF] border-4 border-white rounded-[70px] p-4 flex items-center justify-center overflow-hidden">
      <img
        src={ServiceListPageVetListeningDog}
        alt="Vet listening to dog heartbeat"
        className="w-full h-full object-contain rounded-[30px]" /* Rounded corners for the image */
      />
    </figure>
  </div>
</div>

        <Error error={error} isHidden={!error} />
      </div>
    );
}
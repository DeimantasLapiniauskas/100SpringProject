import { useList } from "../../context/ListContext.jsx";
import { ServiceCard } from "./ServiceCard.jsx";
import { Error } from "../../components/feedback/Error.jsx";
import { NavLink } from "react-router";
// import ServiceListPageVetHoldingCat from "../../assets/images/cart.png";
// import ServiceListPageVetHoldingDog from "../../assets/images/vet.png";
// import ServiceListPageCatPawBandage from "../../assets/images/peti.png";
import { useUI } from "@/context/UIContext.jsx";
import { PaginationPanel } from "@/components/features/PaginationPanel.jsx";
import { Loading } from "@/components/feedback/Loading.jsx";
import { SelectPanel } from "@/components/features/SelectPagesPanel.jsx";
// import { FilterPanel } from "@/components/features/FilterPanel.jsx";
import { useCheckRoles } from "@/hooks/useCheckRoles.js";
import CatSilhouetteGradient from "@/assets/icons/CatSilhouetteGradient.jsx";
import vetServiceIcon from "../../assets/icons/vetServiceIcon.svg"

export const ServiceList = () => {

  const { getPage, error, message, content: services, currentPage, pageSize } = useList();

  const { isLoading, isEmpty, isError } = useUI();
  const roles = useCheckRoles();

  return (
    <>
      <div className="flex flex-col items-center px-2 sm:px-4 md:px-6 lg:px-8">
        <div className="flex w-full justify-end gap-5">
          {/* <FilterPanel /> */}
          {/* <SelectPanel /> */}
        </div>
        <div className={`grid grid-cols-2 pb-10 ${roles ? "" : "min-h-[250px]"}`}>
          {/* <div className="flex gap-1 bottom-[60%]">
           
            <figure className="w-[150px] h-[150px] bg-gradient-to-r from-pink-50 to-purple-400 border-2 border-[#ebb4eb] rounded-[35px] p-2 flex items-center justify-center overflow-hidden">
              <img
                src={ServiceListPageVetHoldingCat}
                alt="Vet holding gray cat"
                className="w-full h-full object-contain rounded-[30px]" 
              />
            </figure>
            <figure
              className="
             w-[150px] h-[150px] bg-gradient-to-r from-pink-50 to-purple-400 border-2 border-[#ebb4eb] rounded-[35px] p-2"
            >
              <img
                src={ServiceListPageVetHoldingDog}
                alt="Vet holding black and white puppy"
                className="w-full h-full object-contain rounded-[30px]" 
              />
            </figure>
            <figure
              className="
              w-[150px] h-[150px] bg-gradient-to-r from-pink-50 to-purple-400 border-2 border-[#ebb4eb] rounded-[35px] p-2"
            >
              <img
                src={ServiceListPageCatPawBandage}
                alt="Vet holding brown cat"
                className="w-full h-full object-contain rounded-[30px]" 
              />
            </figure>
          </div> */}
          <div className="flex me-30 p-5">
            <h1 className="text-fuchsia-950 font-semibold text-md sm:text-lg md:text-xl lg:text-2xl text-center " >
              Find What Your Pet Needs Here To Make Your Pet Happy
            </h1>
            <img src={vetServiceIcon} alt="vetServiceIcon" className="w-30"/>
          </div>
        </div>
        {roles && (
          <div className="w-full flex justify-center py-2 relative">
            <CatSilhouetteGradient className="w-40 absolute z-10 bottom-[15px] " />
            <NavLink
              to={`/services/add`}
              className="btn bg-gradient-to-br to-indigo-700 hover:scale-110 z-10 transform transition duration-700 text-info-content border-1 border-[#854685]"
            >
              Add Service
            </NavLink>
          </div>
        )}
        {isEmpty ? <p>{message}</p> : ""}
        {isLoading ? <Loading /> : ""}
        {isError ? <Error error={error} isHidden={!error} /> : ""}
        <div className="flex justify-end w-full">
          <div className="relative">
           {roles ? "" : <CatSilhouetteGradient className="w-50 absolute z-10 top-[-160px] right-[-250px] ] "/>}
          </div>
          <ul className="flex flex-col w-3/5">
            {services?.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                getPage={getPage}
                currentPage={currentPage}
                pageSize={pageSize}
              />
            ))}
          </ul>
        </div>
        <div className="p-3">
          <PaginationPanel />
        </div>
      </div>
    </>
  );
};

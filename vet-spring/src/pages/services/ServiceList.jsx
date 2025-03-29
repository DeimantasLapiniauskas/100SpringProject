import { useList } from "../../context/ListContext.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { ServiceCard } from "./ServiceCard.jsx";
import { Error } from "../../components/feedback/Error.jsx";
import { NavLink } from "react-router";
import ServiceListPageVetHoldingCat from "../../assets/cart.png";
import ServiceListPageVetHoldingDog from "../../assets/vet.png";
import ServiceListPageCatPawBandage from "../../assets/peti.png";
import { useUI } from "@/context/UIContext.jsx";
import { PaginationUI } from "@/components/PaginationUI.jsx";
import { Loading } from "@/components/feedback/Loading.jsx";
import { SelectUI } from "@/components/SelectUI.jsx";
import { FilterUI } from "@/components/FilterUI.jsx";

export const ServiceList = () => {
  const { account } = useAuth();

  const {
    getPage,
    error,
    message,
    content: servises,
    currentPage,
    pageSize,
  } = useList();

  const { isLoading, isEmpty, isError } = useUI();

  const checkRoles = () => {
    //todo: make this better
    return (
      (account !== null &&
        account.scope !== null &&
        account.scope.includes("ROLE_VET")) ||
      (account !== null &&
        account.scope !== null &&
        account?.scope.includes("ROLE_ADMIN"))
    );
  };

  return (
    <>
      <div className="flex flex-col items-center gap-2 px-2 sm:px-4 md:px-6 lg:px-8 ">
        <div className="flex w-full justify-end gap-5">
          <FilterUI />
          <SelectUI />
        </div>
        <div className="flex w-full items-center">
          <div className="flex gap-1 bottom-[60%]">
            {/* Ensures horizontal scroll if needed */}
            <figure className="w-[150px] h-[150px] bg-gradient-to-r from-pink-50 to-purple-400 border-2 border-[#ebb4eb] rounded-[35px] p-2 flex items-center justify-center overflow-hidden">
              <img
                src={ServiceListPageVetHoldingCat}
                alt="Vet holding gray cat"
                className="w-full h-full object-contain rounded-[30px]" /* Rounded corners for the image */
              />
            </figure>
            <figure
              className="
             w-[150px] h-[150px] bg-gradient-to-r from-pink-50 to-purple-400 border-2 border-[#ebb4eb] rounded-[35px] p-2"
            >
              <img
                src={ServiceListPageVetHoldingDog}
                alt="Vet holding black and white puppy"
                className="w-full h-full object-contain rounded-[30px]" /* Rounded corners for the image */
              />
            </figure>
            <figure
              className="
              w-[150px] h-[150px] bg-gradient-to-r from-pink-50 to-purple-400 border-2 border-[#ebb4eb] rounded-[35px] p-2"
            >
              <img
                src={ServiceListPageCatPawBandage}
                alt="Vet holding brown cat"
                className="w-full h-full object-contain rounded-[30px]" /* Rounded corners for the image */
              />
            </figure>
          </div>
          <h1 className="text-info-content text-md sm:text-lg md:text-xl lg:text-2xl text-center px-[8rem]">
            Find What Your Pet Needs
             Here To Make Your
             Pet Happy
          </h1>
        </div>
        {checkRoles() && (
          <div className="w-full flex justify-center ">
            <NavLink
              to={`/services/add`}
              className="btn bg-gradient-to-br to-indigo-700 hover:scale-110 transform transition duration-700 text-info-content border-1 border-[#854685]"
            >
              Add Service
            </NavLink>
          </div>
        )}
        {isEmpty ? <p>{message}</p> : ""}
        {isLoading ? <Loading /> : ""}
        {isError ? <Error error={error} isHidden={!error} /> : ""}
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {servises?.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              getPage={getPage}
              currentPage={currentPage}
              pageSize={pageSize}
            />
          ))}
        </ul>
        <div className="p-3">
          <PaginationUI />
        </div>
      </div>
    </>
  );
};

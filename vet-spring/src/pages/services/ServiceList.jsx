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

  const {isLoading, isEmpty, isError} = useUI();

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
      <div className="flex flex-col items-center gap-8 p-8 ">
         <div className="flex w-full justify-between ">
                  <FilterUI />
                <SelectUI />
              </div>
      <h1 className="figma-headline-2 text-black">
            Find What Your Pet Needs
            <br /> Here To Make Your
            <br /> Pet Happy
          </h1>
        {checkRoles() && (
          <NavLink to={`/services/add`} className="btn btn-primary">
            Add
          </NavLink>
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
     <PaginationUI />
        {/* Centered Text and Horizontal Image Section */}
        <div className="flex flex-col items-center text-center space-y-4">
          {/* Horizontal Image Section */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {" "}
            {/* Ensures horizontal scroll if needed */}
            <figure className="w-[300px] h-[500px] bg-[#6A7AFF] border-4 border-white rounded-[70px] p-4 flex items-center justify-center overflow-hidden">
              <img
                src={ServiceListPageVetHoldingCat}
                alt="Vet holding gray cat"
                className="w-full h-full object-contain rounded-[30px]" /* Rounded corners for the image */
              />
            </figure>
            <figure
              className="hidden sm:block
            
            w-[300px] h-[500px] bg-[#6A7AFF] border-4 border-white rounded-[70px] p-4"
            >
              <img
                src={ServiceListPageVetHoldingDog}
                alt="Vet holding black and white puppy"
                className="w-full h-full object-contain rounded-[30px]" /* Rounded corners for the image */
              />
            </figure>
            <figure
              className="hidden lg:block 
            
            w-[300px] h-[500px] bg-[#6A7AFF] border-4 border-white rounded-[70px] p-4"
            >
              <img
                src={ServiceListPageCatPawBandage}
                alt="Vet holding brown cat"
                className="w-full h-full object-contain rounded-[30px]" /* Rounded corners for the image */
              />
            </figure>
          </div>
        </div>
        {error && <Error error={error} isHidden={!error} />}
      </div>
    </>
  );
};

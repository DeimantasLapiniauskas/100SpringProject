import { usePagination } from "../../context/PaginationContext.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { ServiceCard } from "./ServiceCard.jsx";
import { Error } from "../../components/Error.jsx";
import { NavLink } from "react-router";

import ServiceListPageVetHoldingCat from "../../assets/cart.png";
import ServiceListPageVetHoldingDog from "../../assets/vet.png";
import ServiceListPageCatPawBandage from "../../assets/peti.png";

export const ServiceList = () => {
  const { account } = useAuth();

  const {
    getPage,
    onPageSizeChange,
    onPaginate,
    error,
    content,
    currentPage,
    totalPages,
    pageSize,
  } = usePagination();

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
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {content?.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              getServicePage={getPage}
              currentPage={currentPage}
              pageSize={pageSize}
            />
          ))}
        </ul>
        <div className="join ">
          <button
            className="join-item btn "
            onClick={async () => onPaginate(currentPage - 1)}
            disabled={currentPage === 0}
          >
            «
          </button>
          <button className="join-item btn ">Page {currentPage + 1}</button>
          <button
            className="join-item btn "
            onClick={async () => onPaginate(currentPage + 1)}
            disabled={currentPage === totalPages - 1}
          >
            »
          </button>
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

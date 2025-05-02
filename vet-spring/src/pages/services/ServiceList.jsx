import { useList } from "../../context/ListContext.jsx";
import { ServiceCard } from "./ServiceCard.jsx";
import { Error } from "../../components/feedback/Error.jsx";
import { NavLink } from "react-router";
import { useUI } from "@/context/UIContext.jsx";
import { PaginationPanel } from "@/components/features/PaginationPanel.jsx";
import { Loading } from "@/components/feedback/Loading.jsx";
import { SelectPageSizePanel } from "@/components/features/SelectPageSizePanel.jsx";
import { FilterPanel } from "@/components/features/FilterPanel.jsx";
import { useCheckAdminAndVetRoles } from "@/hooks/useCheckRoles.js";
import CatSilhouetteGradient from "@/assets/icons/CatSilhouetteGradient.jsx";
import vetServiceIcon from "../../assets/icons/vetServiceIcon.svg";
import { SearchBarPanel } from "@/components/features/SearchBarPanel.jsx";
import { ClearAllButton } from "@/components/features/ClearAllButton.jsx";
import vetCare from "../../assets/images/vetCare.jpg";

export const ServiceList = () => {
  const {
    getPage,
    error,
    message,
    content: services,
    currentPage,
    pageSize,
  } = useList();

  const { isLoading, isEmpty, isError } = useUI();
  const roles = useCheckAdminAndVetRoles();

  const filterFields = [
    { label: "All", value: "All" },
    { label: "Name", value: "name" },
    { label: "Lowest price", value: "price" },
  ];
  const pageSizes = [10, 15, 20];

  return (
    <>
      <div className="flex flex-col items-center px-1 sm:px-3 md:px-5 lg:px-8 mt-1 md:mt-2">
      <div className="flex flex-col items-center sm:flex-row w-full sm:justify-end gap-2.5 md:gap-3.5 relative">
          <SearchBarPanel />
          <div className="absolute sm:bottom-[-1rem] md:bottom-[-1.25rem] right-2 xs:right-15 sm:right-3">
        <ClearAllButton />
      </div>
        <div className="flex gap-2 items-center px-2 md:px-3">
          <FilterPanel filterFields={filterFields} />
          <SelectPageSizePanel pageSizes={pageSizes} />
        </div>
      </div>
        <div
          className={`${
            roles ? "" : "min-h-[250px]"
          } w-full mt-5 sm:mt-3  p-1 xs:p-2 sm:p-3 md:p-4 lg:p-5 flex sm:justify-between sm:gap-1 flex-col sm:flex-row`}
        >
          <div className="flex sm:flex-col items-center w-full sm:w-3/5 md:w-3/7 px-7 sm:px-0">
            <h1 className="text-fuchsia-950 font-semibold text-md sm:text-lg md:text-xl lg:text-2xl text-center ">
              Find What Your Pet Needs Here To Make Your Pet Happy
            </h1>
            <img
              src={vetServiceIcon}
              alt="vetServiceIcon"
              className="w-15 xs:w-20 sm:w-25 md:w-30"
            />
          </div>
          <img
            src={vetCare}
            alt="vetCare"
            className="sm:w-90 md:w-115 lg:w-145 sm:h-25 md:h-32 lg:h-39  rounded-lg me-0.5 xs:mx-4 sm:me-1.5 md:me-2 lg:me-2.5 mt-2  sm:mt-5 border border-purple-400 shadow-md shadow-fuchsia-900"
          />
        </div>
        {roles && (
          <div className="w-full flex justify-center py-2 relative">
            <CatSilhouetteGradient className="w-20 xs:w-25 sm:w-30 md:w-35 lg:w-40 absolute z-10 bottom-[15px] " />
            <NavLink
              to={`/services/add`}
              className="btn bg-gradient-to-br to-indigo-700 hover:scale-110 z-10 transform transition duration-700 text-info-content border-1 border-[#854685] text-[8px] sm:text-[10px] md:text-xs lg:text-sm"
            >
              Add Service
            </NavLink>
          </div>
        )}
        {isEmpty ? <p>{message}</p> : ""}
        {isLoading ? <Loading /> : ""}
        {isError ? <Error error={error} isHidden={!error} /> : ""}
        <div className="flex justify-center sm:justify-end w-full">
          <div className="relative">
            {roles ? (
              ""
            ) : (
              <CatSilhouetteGradient className="w-20 xs:w-25 sm:w-30 md:w-35 lg:w-40 absolute z-10 top-[-120px] right-[-180px] ] " />
            )}
          </div>
          <ul className="flex flex-col  w-[476px] md:w-[578px] lg:w-[680px] gap-2 md:gap-4">
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

import { Error } from "@/components/feedback/Error";
import VetCard from "../../cards/VetCard";
import AddVetButton from "../buttons/AddVetButton";
import { useList } from "@/context/ListContext";
import { useUI } from "@/context/UIContext";
import { PaginationUI } from "@/components/PaginationUI";
import { BadRequest } from "@/components/feedback/BadRequest";
import { Loading } from "@/components/feedback/Loading";

const VetList = () => {
  const {
    getPage,
    error,
    message,
    content: vets,
    currentPage,
    pageSize,
    isEmpty,
  } = useList();

  const { isLoading, isError, isBadRequest } = useUI();

  return (
    <div className="flex flex-col items-center gap-8 py-8">
      <AddVetButton
        getPage={getPage}
        currentPage={currentPage}
        pageSize={pageSize}
      />
      {isEmpty ? <p>{message}</p> : ""}
            {isLoading ? <Loading /> : ""}
            {isError ? <Error error={error} isHidden={!error} /> : ""}
            {isBadRequest ? <BadRequest/> : ""}
      <ul className="w-full divide-y divide-gray-200">
        {vets?.map((vet) => (
          <VetCard
            key={vet.id}
            vet={vet}
            getPage={getPage}
            currentPage={currentPage}
            pageSize={pageSize}
          />
        ))}
      </ul>
      <PaginationUI />
    </div>
  );
};

export default VetList;


{/* <div className="join">
        <button
          className="join-item btn"
          onClick={async () => onPaginate(currentPage - 1)}
          disabled={currentPage === 0}
        >
          «
        </button>
        <button className="join-item btn">Page {currentPage + 1}</button>
        <button
          className="join-item btn"
          onClick={async () => onPaginate(currentPage + 1)}
          disabled={currentPage === totalPages - 1}
        >
          »
        </button>
        <select
          defaultValue="10"
          className="join-item select ml-4"
          onChange={onPageSizeChange}
        >
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
        </select>
      </div> */}
      {/* <Error error={error} isHidden={!error} /> */}
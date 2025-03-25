import { usePagination } from "../../../context/PaginationContext";
import VetCard from "../../cards/VetCard";
import { Error } from "../../Error";
import AddVetButton from "../buttons/AddVetButton";

const VetList = () => {

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


  return (
    <div className="flex flex-col items-center gap-8 py-8">
      <AddVetButton
        getPage={getPage}
        currentPage={currentPage}
        pageSize={pageSize}
      />
      <ul className="w-full divide-y divide-gray-200">
        {content?.map((vet) => (
          <VetCard
            key={vet.id}
            vet={vet}
            getPage={getPage}
            currentPage={currentPage}
            pageSize={pageSize}
          />
        ))}
      </ul>
      <div className="join">
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
  )
}

export default VetList;
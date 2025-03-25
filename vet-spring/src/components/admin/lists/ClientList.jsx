import { usePagination } from "../../../context/PaginationContext";
import ClientCard from "../../cards/ClientCard";
import { Error } from "../../Error";

const ClientList = () => {

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
      <ul className="w-full divide-y divide-gray-200">
        {content?.map((client) => (
          <ClientCard
            key={client.id}
            client={client}
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

export default ClientList;
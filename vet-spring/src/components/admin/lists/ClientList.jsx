import { PaginationUI } from "@/components/PaginationUI";
import ClientCard from "../../cards/ClientCard";
import { useList } from "@/context/ListContext";
import { useUI } from "@/context/UIContext";
import { Error } from "@/components/feedback/Error";
import { BadRequest } from "@/components/feedback/BadRequest";
import { Loading } from "@/components/feedback/Loading";

const ClientList = () => {
  const {
    getPage,
    error,
    message,
    content: clients,
    currentPage,
    pageSize,
    isEmpty,
  } = useList();
//.filter(client => client?.id != null)
  const { isLoading, isError, isBadRequest } = useUI();

  return (
    <div className="flex flex-col items-center gap-8 py-8">
      {isEmpty ? <p>{message}</p> : ""}
      {isLoading ? <Loading /> : ""}
      {isError ? <Error error={error} isHidden={!error} /> : ""}
      {isBadRequest ? <BadRequest /> : ""}
      <ul className="w-full divide-y divide-gray-200">
        {clients.map((client) => (

          <ClientCard
            key={client.id}
            client={client}
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

export default ClientList;


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
          defaultValue="6"
          className="join-item select ml-4"
          onChange={onPageSizeChange}
        >
          <option value="6">6</option>
          <option value="9">9</option>
          <option value="12">12</option>
        </select>
      </div>
      <Error error={error} isHidden={!error} /> */}
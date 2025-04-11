import { PaginationPanel } from "@/components/features/PaginationPanel";
import ClientCard from "../cards/ClientCard";
import { useList } from "@/context/ListContext";
import { useUI } from "@/context/UIContext";
import { Error } from "@/components/feedback/Error";
import { BadPageRequest } from "@/components/feedback/BadPageRequest";
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
      {isBadRequest ? <BadPageRequest /> : ""}
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
      <PaginationPanel />
      
    </div>
  );
};

export default ClientList;
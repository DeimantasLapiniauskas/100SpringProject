import { Error } from "@/components/feedback/Error";
import VetCard from "../cards/VetCard";
import AddVetButton from "../buttons/AddVetButton";
import { useList } from "@/context/ListContext";
import { useUI } from "@/context/UIContext";
import { PaginationPanel } from "@/components/features/PaginationPanel";
import { BadPageRequest } from "@/components/feedback/BadPageRequest";
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

  //console.log("VetList vets:", vets?.map(vet => vet.id));

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
      {isBadRequest ? <BadPageRequest /> : ""}
      <ul className="w-full divide-y divide-gray-200">
        {vets.map((vet) => (
          <VetCard
            key={vet.id}
            vet={vet}
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

export default VetList;
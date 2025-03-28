import { useEffect, useState } from "react";
import { PetCard } from "./PetCard.jsx";
import { Error } from "../../components/feedback/Error.jsx";
import { useAuth } from "../../context/AuthContext";
import ThemeContext from "../../utils/helpers/themeContext.js";
import AddPetButton from "./AddPetButton.jsx";
import { useList } from "../../context/ListContext.jsx";

export const PetList = () => {
  const { account } = useAuth();
  const { iat } = account || "";
  const [welcome, setWelcome] = useState(true);

  //!!!!!!!!!!
  const [deleteModalID, setDeleteModalID] = useState("");
  const [editModalID, setEditModalID] = useState("");
  const [addModalID, setAddModalID] = useState("");
  const {
    getPage,
    onPageSizeChange,
    onPaginate,
    error,
    content: pets,
    currentPage,
    totalPages,
    pageSize,
  } = useList();

  //TODO fadeout effect
  const welcomeClosure = () => {
    setTimeout(() => {
      setWelcome(false);
    }, 2000);
  };

  useEffect(() => {
    welcomeClosure();
  }, []);

  // const roleCheck = () => {
  //     return account.scope?.includes("ROLE_CLIENT") || account.scope?.icludes("ROLE_ADMIN")
  // }

  return (
    <>
      {iat * 1000 + 2000 > Date.now() && welcome ? (
        <div className="rounded-[10px] border-2 border-amber-900 text-white bg-amber-400 flex w-[5rem]">
          Welcome!
        </div>
      ) : (
        ""
      )}

      <ThemeContext.Provider
        value={{
          deleteModalID,
          setDeleteModalID,
          editModalID,
          setEditModalID,
          addModalID,
          setAddModalID,
        }}
      >
        <div className="flex flex-col items-center">
          <AddPetButton
            getPage={getPage}
            currentPage={currentPage}
            pageSize={pageSize}
          />
        </div>
        <div className="flex flex-col items-center gap-8 py-8">
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {pets?.map((pet) => (
              <PetCard
                key={pet.id}
                pet={pet}
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
      </ThemeContext.Provider>
    </>
  );
};

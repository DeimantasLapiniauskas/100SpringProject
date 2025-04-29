import { useContext } from "react";
import ModalContext from "../../../utils/helpers/modalContext";
import PasswordChangeForm from "../forms/PasswordChangeForm";

function ChangeAccountPasswordButton({ accountId, getPage, currentPage, pageSize }) {
  const { editPasswordModalID, setEditPasswordModalID } = useContext(ModalContext);

  return (
    <>
      <div>
        <button
          className="btn bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
          onClick={() => setEditPasswordModalID(accountId)}
        >
          Change Password
        </button>
      </div>

      {editPasswordModalID == accountId && (
        <dialog open className="modal bg-[#DCDEFE]">
          <div className="modal-box bg-[#97a0f1] text-center">
            <PasswordChangeForm
              accountId={accountId}
              getPage={getPage}
              currentPage={currentPage}
              pageSize={pageSize}
            />
            <form method="dialog">
              <button
                className="text-white btn bg-red-500 hover:bg-red-700 w-16 mt-4"
                onClick={() => setEditPasswordModalID("")}
              >
                Close
              </button>
            </form>
          </div>
        </dialog>
      )}
    </>
  );
}

export default ChangeAccountPasswordButton;
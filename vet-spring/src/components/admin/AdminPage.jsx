import ClientList from './lists/ClientList';
import VetList from './lists/VetList';
import ModalContext from '../../utils/helpers/modalContext';
import { useState } from 'react';
import { useNavigate } from 'react-router';

import pawssAdminPageImage from '/src/assets/pawss_for_admin.png';
//import happyHeart from "../../assets/icons/happyHeart.svg";

const AdminPage = ({ initialList }) => {
    const [activeList, setActiveList] = useState(initialList || '');
    const [deleteModalID, setDeleteModalID] = useState('');
    const [editModalID, setEditModalID] = useState('');
    const [addModalID, setAddModalID] = useState('');
    const navigate = useNavigate();

    const handleTabChange = (list) => {
        setActiveList(list);
        navigate(`/adminpage/${list}`);
    };

    return (
      <ModalContext.Provider
        value={{
          deleteModalID,
          setDeleteModalID,
          editModalID,
          setEditModalID,
          addModalID,
          setAddModalID,
        }}
      >
        <div className="admin-page flex flex-col items-center gap-2 sm:px-4 md:px-6 lg:px-8 max-w-[1500px] mx-auto">
          {/* <img
            src={pawssAdminPageImage}
            alt="Paw print"
            className="absolute left-10 top-40 max-w-[3rem] sm:max-w-[4rem] md:max-w-[5rem] lg:max-w-[6rem] object-contain me-10 sm:m-0 opacity-6 rotate-[53deg] pointer-events-none"
          /> */}

          <img
            src={pawssAdminPageImage}
            alt="Paw print"
            className="absolute left-[66rem] top-[14rem] max-w-[3rem] sm:max-w-[4rem] md:max-w-[5rem] lg:max-w-[6rem] object-contain me-10 sm:m-0 opacity-6 rotate-[53deg] pointer-events-none"
          />

          <img
            src={pawssAdminPageImage}
            alt="Paw print"
            className="absolute left-[39rem] top-[17rem] max-w-[3rem] sm:max-w-[4rem] md:max-w-[5rem] lg:max-w-[6rem] object-contain me-10 sm:m-0 opacity-6 rotate-[53deg] pointer-events-none"
          />

          <img
            src={pawssAdminPageImage}
            alt="Paw print"
            className="absolute left-[86rem] top-[12rem] max-w-[3rem] sm:max-w-[4rem] md:max-w-[5rem] lg:max-w-[6rem] object-contain me-10 sm:m-0 opacity-6 rotate-[53deg] pointer-events-none"
          />

          <img
            src={pawssAdminPageImage}
            alt="Paw print"
            className="absolute left-[21rem] top-[5rem] max-w-[3rem] sm:max-w-[4rem] md:max-w-[5rem] lg:max-w-[6rem] object-contain me-10 sm:m-0 opacity-6 rotate-[53deg] pointer-events-none"
          />

          <img
            src={pawssAdminPageImage}
            alt="Paw print"
            className="absolute left-[16rem] top-[16rem] max-w-[3rem] sm:max-w-[4rem] md:max-w-[5rem] lg:max-w-[6rem] object-contain me-10 sm:m-0 opacity-6 rotate-[53deg] pointer-events-none"
          />

          <img
            src={pawssAdminPageImage}
            alt="Paw print"
            className="absolute left-[37rem] top-[9rem] max-w-[3rem] sm:max-w-[4rem] md:max-w-[5rem] lg:max-w-[6rem] object-contain me-10 sm:m-0 opacity-6 rotate-[53deg] pointer-events-none"
          />

          <img
            src={pawssAdminPageImage}
            alt="Paw print"
            className="absolute left-[75rem] top-[4rem] max-w-[3rem] sm:max-w-[4rem] md:max-w-[5rem] lg:max-w-[6rem] object-contain me-10 sm:m-0 opacity-6 rotate-[53deg] pointer-events-none"
          />

          <img
            src={pawssAdminPageImage}
            alt="Paw print"
            className="absolute left-[2rem] top-[7rem] max-w-[3rem] sm:max-w-[4rem] md:max-w-[5rem] lg:max-w-[6rem] object-contain me-10 sm:m-0 opacity-6 rotate-[53deg] pointer-events-none"
          />

          <img
            src={pawssAdminPageImage}
            alt="Paw print"
            className="absolute left-[22rem] top-[17rem] max-w-[3rem] sm:max-w-[4rem] md:max-w-[5rem] lg:max-w-[6rem] object-contain me-10 sm:m-0 opacity-6 rotate-[53deg] pointer-events-none"
          />

          <img
            src={pawssAdminPageImage}
            alt="Paw print"
            className="absolute left-[43rem] top-[12rem] max-w-[3rem] sm:max-w-[4rem] md:max-w-[5rem] lg:max-w-[6rem] object-contain me-10 sm:m-0 opacity-6 rotate-[53deg] pointer-events-none"
          />

          <h1 className=" text-black lg:text-2xl md:text-xl sm:text-lg text-base font-semibold text-center py-8 mb-4 mt-12">
            Admin Panel
          </h1>
          <div className="tabs flex gap-4 justify-center mt-4">
            <button
              className={`btn lg:text-lg md:text-base sm:text-sm text-xs ${
                activeList === "vets" ? "active" : ""
              }`}
              onClick={() => handleTabChange("vets")}
            >
              Vets
            </button>
            <button
              className={`btn lg:text-lg md:text-base sm:text-sm text-xs ${
                activeList === "clients" ? "active" : ""
              }`}
              onClick={() => handleTabChange("clients")}
            >
              Clients
            </button>
          </div>
          {activeList === "vets" && <VetList />}
          {activeList === "clients" && <ClientList />}
        </div>
      </ModalContext.Provider>
    );
};

export default AdminPage;
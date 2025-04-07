import ClientList from './lists/ClientList';
import VetList from './lists/VetList';
import ModalContext from '../../utils/helpers/modalContext';
import { useState } from 'react';
import { useNavigate } from 'react-router';

import pawssAdminPageImage from '/src/assets/pawss_for_admin.png';

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
        <div className="admin-page items-center px-10">
          <img
            src={pawssAdminPageImage}
            alt="Paw print"
            className="absolute left-4 top-40 w-[3rem] sm:w-[4rem] md:w-[5rem] lg:w-[6rem] opacity-20 rotate-[53deg] pointer-events-none"
          />

          <img
            src={pawssAdminPageImage}
            alt="Paw print"
            className="absolute right-4 top-40 w-[3rem] sm:w-[4rem] md:w-[5rem] lg:w-[6rem] opacity-20 rotate-[53deg] pointer-events-none"
          />

          <img
            src={pawssAdminPageImage}
            alt="Paw print"
            className="absolute left-4 top-70 w-[3rem] sm:w-[4rem] md:w-[5rem] lg:w-[6rem] opacity-20 rotate-[53deg] pointer-events-none"
          />

          <img
            src={pawssAdminPageImage}
            alt="Paw print"
            className="absolute right-4 top-70 w-[3rem] sm:w-[4rem] md:w-[5rem] lg:w-[6rem] opacity-20 rotate-[53deg] pointer-events-none"
          />

          <img
            src={pawssAdminPageImage}
            alt="Paw print"
            className="absolute left-22 top-70 w-[8rem] sm:w-[9rem] md:w-[10rem] lg:w-[19rem] opacity-20 rotate-[53deg] pointer-events-none"
          />

          <img
            src={pawssAdminPageImage}
            alt="Paw print"
            className="absolute right-22 top-70 w-[8rem] sm:w-[9rem] md:w-[10rem] lg:w-[11rem] opacity-20 rotate-[53deg] pointer-events-none"
          />

          <h1 className=" text-black lg:text-4xl md:text-2xl sm:text-lg text-base text-center py-8 mb-4 mt-12">
            Admin Panel
          </h1>
          <div className="tabs flex gap-4 justify-center mt-4">
            <button
              className={`btn ${activeList === "vets" ? "active" : ""}`}
              onClick={() => handleTabChange("vets")}
            >
              Vets
            </button>
            <button
              className={`btn ${activeList === "clients" ? "active" : ""}`}
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
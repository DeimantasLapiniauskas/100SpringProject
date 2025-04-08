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
          <img
            src={pawssAdminPageImage}
            alt="Paw print"
            className="absolute left-10 top-40 max-w-[3rem] sm:max-w-[4rem] md:max-w-[5rem] lg:max-w-[6rem] object-contain me-10 sm:m-0 opacity-6 rotate-[53deg] pointer-events-none"
          />

<img
  src={pawssAdminPageImage}
  alt="Paw print"
  className="absolute left-[538px] top-[223px] max-w-[3rem] sm:max-w-[4rem] md:max-w-[5rem] lg:max-w-[6rem] object-contain me-10 sm:m-0 opacity-6 rotate-[53deg] pointer-events-none"
/>

<img
  src={pawssAdminPageImage}
  alt="Paw print"
  className="absolute left-[112px] top-[264px] max-w-[3rem] sm:max-w-[4rem] md:max-w-[5rem] lg:max-w-[6rem] object-contain me-10 sm:m-0 opacity-6 rotate-[53deg] pointer-events-none"
/>

<img
  src={pawssAdminPageImage}
  alt="Paw print"
  className="absolute left-[405px] top-[194px] max-w-[3rem] sm:max-w-[4rem] md:max-w-[5rem] lg:max-w-[6rem] object-contain me-10 sm:m-0 opacity-6 rotate-[53deg] pointer-events-none"
/>

<img
  src={pawssAdminPageImage}
  alt="Paw print"
  className="absolute left-[331px] top-[85px] max-w-[3rem] sm:max-w-[4rem] md:max-w-[5rem] lg:max-w-[6rem] object-contain me-10 sm:m-0 opacity-6 rotate-[53deg] pointer-events-none"
/>

<img
  src={pawssAdminPageImage}
  alt="Paw print"
  className="absolute left-[176px] top-[260px] max-w-[3rem] sm:max-w-[4rem] md:max-w-[5rem] lg:max-w-[6rem] object-contain me-10 sm:m-0 opacity-6 rotate-[53deg] pointer-events-none"
/>

<img
  src={pawssAdminPageImage}
  alt="Paw print"
  className="absolute left-[597px] top-[148px] max-w-[3rem] sm:max-w-[4rem] md:max-w-[5rem] lg:max-w-[6rem] object-contain me-10 sm:m-0 opacity-6 rotate-[53deg] pointer-events-none"
/>

<img
  src={pawssAdminPageImage}
  alt="Paw print"
  className="absolute left-[453px] top-[62px] max-w-[3rem] sm:max-w-[4rem] md:max-w-[5rem] lg:max-w-[6rem] object-contain me-10 sm:m-0 opacity-6 rotate-[53deg] pointer-events-none"
/>

<img
  src={pawssAdminPageImage}
  alt="Paw print"
  className="absolute left-[214px] top-[117px] max-w-[3rem] sm:max-w-[4rem] md:max-w-[5rem] lg:max-w-[6rem] object-contain me-10 sm:m-0 opacity-6 rotate-[53deg] pointer-events-none"
/>

<img
  src={pawssAdminPageImage}
  alt="Paw print"
  className="absolute left-[344px] top-[279px] max-w-[3rem] sm:max-w-[4rem] md:max-w-[5rem] lg:max-w-[6rem] object-contain me-10 sm:m-0 opacity-6 rotate-[53deg] pointer-events-none"
/>

<img
  src={pawssAdminPageImage}
  alt="Paw print"
  className="absolute left-[56px] top-[197px] max-w-[3rem] sm:max-w-[4rem] md:max-w-[5rem] lg:max-w-[6rem] object-contain me-10 sm:m-0 opacity-6 rotate-[53deg] pointer-events-none"
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
// import ClientList from './lists/ClientList';
// import VetList from './lists/VetList';
// import ModalContext from '../../utils/helpers/modalContext';
// import { useState } from 'react';
// import { useNavigate } from 'react-router';

// import pawssAdminPageImage from '/src/assets/pawss_for_admin.png';
// //import happyHeart from "../../assets/icons/happyHeart.svg";

// const AdminPage = ({ initialList }) => {
//     const [activeList, setActiveList] = useState(initialList || '');
//     const [deleteModalID, setDeleteModalID] = useState('');
//     const [editModalID, setEditModalID] = useState('');
//     const [addModalID, setAddModalID] = useState('');
//     const navigate = useNavigate();

//     const handleTabChange = (list) => {
//         setActiveList(list);
//         navigate(`/adminpage/${list}`);
//     };

//     return (
//       <ModalContext.Provider
//         value={{
//           deleteModalID,
//           setDeleteModalID,
//           editModalID,
//           setEditModalID,
//           addModalID,
//           setAddModalID,
//         }}
//       >
//         {/* Page wrapper with paw background */}
//         <div
//           className="min-h-screen bg-repeat bg-[length:6rem_6rem] bg-center opacity-6 z-[-1] pointer-events-none"
//           style={{ backgroundImage: `url(${pawssAdminPageImage})` }}>

//           {/* Content centered and contained */}
//           <div className="admin-page relative z-10 flex flex-col items-center gap-2 sm:px-4 md:px-6 lg:px-8 max-w-[1500px] mx-auto">
//             <h1 className="text-black lg:text-2xl md:text-xl sm:text-lg text-base font-semibold text-center py-8 mb-4 mt-12">
//               Admin Panel
//             </h1>

//             <div className="tabs flex gap-4 justify-center mt-4">
//               <button
//                 className={`btn lg:text-lg md:text-base sm:text-sm text-xs ${
//                   activeList === "vets" ? "active" : ""
//                 }`}
//                 onClick={() => handleTabChange("vets")}
//               >
//                 Vets
//               </button>
//               <button
//                 className={`btn lg:text-lg md:text-base sm:text-sm text-xs ${
//                   activeList === "clients" ? "active" : ""
//                 }`}
//                 onClick={() => handleTabChange("clients")}
//               >
//                 Clients
//               </button>
//             </div>
//             {activeList === "vets" && <VetList />}
//             {activeList === "clients" && <ClientList />}
//           </div>
//         </div>
//       </ModalContext.Provider>
//     );
// };

// export default AdminPage;
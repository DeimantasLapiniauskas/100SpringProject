// import ClientList from './lists/ClientList';
// import VetList from './lists/VetList';
// import ModalContext from '../../utils/helpers/modalContext';
// import { useState } from 'react';
// import { useNavigate } from 'react-router';

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
//         <ModalContext.Provider value={{ deleteModalID, setDeleteModalID, editModalID, setEditModalID, addModalID, setAddModalID }}>
//             <div className="admin-page">
//                 <h1>Admin Panel</h1>
//                 <div className="tabs">
//                     <button
//                         className={activeList === 'vets' ? 'active' : ''}
//                         onClick={() => handleTabChange('vets')}
//                     >
//                         Vets
//                     </button>
//                     <button
//                         className={activeList === 'clients' ? 'active' : ''}
//                         onClick={() => handleTabChange('clients')}
//                     >
//                         Clients
//                     </button>
//                 </div>
//                 {activeList === 'vets' && <VetList />}
//                 {activeList === 'clients' && <ClientList />}
//             </div>
//         </ModalContext.Provider>
//     );
// };

// export default AdminPage;

//Admin page as of 2025/04/07 12:00//
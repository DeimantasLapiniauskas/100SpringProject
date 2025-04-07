import ClientList from './lists/ClientList';
import VetList from './lists/VetList';
import ModalContext from '../../utils/helpers/modalContext';
import { useState } from 'react';
import { useNavigate } from 'react-router';

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
        <ModalContext.Provider value={{ deleteModalID, setDeleteModalID, editModalID, setEditModalID, addModalID, setAddModalID }}>
            <div className="admin-page items-center px-10">
                <h1 className=" text-black lg:text-4xl md:text-2xl sm:text-lg text-base text-center py-8 mb-4 mt-12">Admin Panel</h1>
                <div className="tabs flex gap-4 justify-center mt-4">
                    <button
                        className={`btn ${activeList === 'vets' ? 'active' : ''}`}
                        onClick={() => handleTabChange('vets')}
                    >
                        Vets
                    </button>
                    <button
                        className={`btn ${activeList === 'clients' ? 'active' : ''}`}
                        onClick={() => handleTabChange('clients')}
                    >
                        Clients
                    </button>
                </div>
                {activeList === 'vets' && <VetList />}
                {activeList === 'clients' && <ClientList />}
            </div>
        </ModalContext.Provider>
    );
};

export default AdminPage;
import { useState } from "react";
import ModalContext from "../../utils/helpers/modalContext";
import ClientList from "./lists/ClientList";
import VetList from "./lists/VetList"
import AdminList from "./lists/AdminList"

const AdminPage = () => {
    const [activeList, setActiveList] = useState("");
    const [deleteModalID, setDeleteModalID] = useState("");
    const [editModalID, setEditModalID] = useState("");
    const [addModalID, setAddModalID] = useState("");

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
            <div className="admin-page">
                <h1>Admin Panel</h1>
                <div className="tabs">
                    <button
                        className={activeList === "vets" ? "active" : ""}
                        onClick={() => setActiveList("vets")}
                    >
                        Vets
                    </button>
                    <button
                        className={activeList === "clients" ? "active" : ""}
                        onClick={() => setActiveList("clients")}
                    >
                        Clients
                    </button>
                    <button
                        className={activeList === "admins" ? "active" : ""}
                        onClick={() => setActiveList("admins")}
                    >
                        Admins
                    </button>
                </div>

                {activeList === "vets" && <VetList />}
                {activeList === "clients" && <ClientList />}
                {activeList === "admins" && <AdminList />}
            </div>
        </ModalContext.Provider>
    );
}

export default AdminPage;
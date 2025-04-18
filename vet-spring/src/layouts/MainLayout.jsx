import {Outlet} from "react-router";
import { Navbar } from "../components/NavBar.jsx";
import { DeletePostModal } from "@/components/DeleteModal.jsx";

export const MainLayout = () => {
    
    return (
        <div className="p-2">
            <header className="pb-1">
                <Navbar/>
            </header>
            <main >
                {/* gal geriau kad */}
                <Outlet />
                <DeletePostModal/>
            </main>
        </div>
    )
}

import {Outlet} from "react-router";
import { Navbar } from "../components/NavBar.jsx";
import { DeleteModal } from "@/components/features/DeleteModal.jsx";

export const MainLayout = () => {
    
    return (
        <div className="p-2 max-w-[1400px] mx-auto">
            <header className="pb-1">
                <Navbar/>
            </header>
            <main >
                {/* gal geriau kad */}
                <Outlet />
                <DeleteModal/>
            </main>
        </div>
    )
}

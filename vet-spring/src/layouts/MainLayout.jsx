import {Outlet} from "react-router";
import { Navbar } from "../components/NavBar.jsx";
import { DeletePostModal } from "@/pages/posts/DeleteModal.jsx";

export const MainLayout = () => {
    

    return (
        <div className="p-1">
            <header className="pb-1">
                <Navbar/>
            </header>
            <main className="border-0 border-[#5e6ce4] rounded-[10px]">
                {/* gal geriau kad */}
                <Outlet />
                <DeletePostModal/>
            </main>
        </div>
    )
}

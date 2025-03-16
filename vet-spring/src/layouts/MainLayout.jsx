import {Outlet} from "react-router";
import { Navbar } from "../components/NavBar.jsx";

export const MainLayout = () => {
    

    return (
        <div className="p-1 bg-[#5e6ce4]">
            <header className="pb-1">
                <Navbar/>
            </header>
            <main className="border-2 border-[#CBC5C5]">
                <Outlet />
            </main>
        </div>
    )
}

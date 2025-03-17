import {Outlet} from "react-router";
import { Navbar } from "../components/NavBar.jsx";

export const MainLayout = () => {
    

    return (
        <div className="p-1 bg-[#F5F4F4]">
            <header className="pb-1">
                <Navbar/>
            </header>
            <main className="border-2 border-[#CBC5C5]">
                <Outlet />
            </main>
        </div>
    )
}

import {Outlet} from "react-router";
import { Navbar } from "../components/NavBar.jsx";

export const MainLayout = () => {
    

    return (
        <div className="p-1 bg-[#a7acd9]">
            <header className="pb-1">
                <Navbar/>
            </header>
            <main className="border-2 border-[#CBC5C5]">
                <Outlet />
            </main>
        </div>
    )
}

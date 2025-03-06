import {NavLink, Outlet} from "react-router";
import {useAuth} from "../context/AuthContext.jsx";

export const MainLayout = () => {
    const { logout } = useAuth();

    return (
        <div className="grid grid-rows-[5rem_1fr_5rem] h-screen">
            <nav className="navbar bg-primary text-primary-content">
                <NavLink to="/pets" className="btn btn-ghost text-xl">Readery</NavLink>
                <div className="flex-none hidden lg:flex">
                    <div className="flex items-stretch">
                        <button onClick={logout} className="btn btn-ghost">Logout</button>
                    </div>
                </div>
            </nav>
            <main>
                <Outlet />
            </main>
        </div>
    )
}
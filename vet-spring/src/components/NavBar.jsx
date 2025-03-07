import { NavLink, Outlet } from "react-router"
import { useAuth } from "../context/AuthContext"

export function Navbar() {

    return (
        <div>
            <nav className="h-[56px] bg-amber-600 px-[5rem] flex justify-between items-center">
                <NavLink to={"/pets"}><p className="">Pet list</p></NavLink>
                <NavLink to={"/login"}><p>Login</p></NavLink>
            </nav>
        </div>
    )

}
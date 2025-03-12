import { NavLink } from "react-router"
import { useAuth } from "../context/AuthContext"

export const Navbar = () => {

    const {account, logout} = useAuth()

    return (
        <div>
            <nav className="h-[56px] bg-amber-900 px-[5rem] flex justify-between items-center rounded-[10px]">
                <NavLink to={"/pets"}><p className="">Pet list</p></NavLink>
                {account ? 
                <button type="button" value="logout" onClick={logout} className="cursor-pointer">Logout</button> :
                <NavLink to={"/login"}><p>Login</p></NavLink>}
            </nav>
        </div>
    )

}
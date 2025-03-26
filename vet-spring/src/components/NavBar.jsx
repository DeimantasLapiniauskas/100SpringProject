import { NavLink } from "react-router";
import { useAuth } from "../context/AuthContext";

export const Navbar = () => {

    const {account, logout} = useAuth()
    return (
        <div>
            <nav className="lg:h-[84px] md:h-[72px] sm:h-[60px] h-[48px] bg-[#6A7AFF] px-[5rem] flex justify-between items-center rounded-[10px] border-2 border-[#CBC5C5]">
                <NavLink to={"/pets"}><p className="text-white">Your Pets</p></NavLink>
                <NavLink to={"/services"}><p className="text-white">Service list</p></NavLink>
                <NavLink to={"/posts"}><p className="text-white">News</p></NavLink>
                <NavLink to ={"/home"}><p className="text-white">Home</p></NavLink>
                {account ?
                <button type="button" value="logout" onClick={logout} className="custom-purple-btn cursor-pointer">Logout</button> :
                <NavLink to={"/login"}><p><button className="custom-purple-btn cursor-pointer">Login</button></p></NavLink>}
            </nav>
        </div>
    );
};

import { NavLink } from "react-router";
import { useAuth } from "../context/AuthContext";
import { DropdownMenu } from "../pages/profile/DropdownMenu";
export const Navbar = () => {

    const {account, logout} = useAuth()
    return (
        <div>
            <nav className="lg:h-[90px] md:h-[73px] h-[56px] bg-[#6A7AFF] px-[5rem] flex justify-between items-center rounded-[10px] border-2 border-[#CBC5C5]">
            
                <NavLink to={"/home"}><p className="figma-headline-4 text-white">Home</p></NavLink>
                <NavLink to={"/pets"}><p className="figma-headline-4 text-white">Your Pets</p></NavLink>
                <NavLink to={"/services"}><p className="figma-headline-4 text-white">Service list</p></NavLink>
                <DropdownMenu/>
            </nav>
        </div>
    );
};

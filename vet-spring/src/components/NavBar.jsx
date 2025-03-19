import { NavLink } from "react-router"
import { useAuth } from "../context/AuthContext"

export const Navbar = () => {

    const {account, logout} = useAuth()
    return (
        <div>
            <nav className="h-[56px] bg-[#6A7AFF] px-[5rem] flex justify-between items-center rounded-[10px] border-2 border-[#CBC5C5]">
                <NavLink to={"/pets"}><p className="">Your Pets</p></NavLink>
                <NavLink to={"/services"}><p className="">Service list</p></NavLink>
                {account ?
                <button type="button" value="logout" onClick={logout} className="cursor-pointer">Logout</button> :
                <NavLink to={"/login"}><p>Login</p></NavLink>}
            </nav>
        </div>
    )

}

//////////////////////////////////////////////VLADIMIR ZORIN TRYING DESIGN///////////////////////
// import { NavLink } from "react-router"
// import { useAuth } from "../context/AuthContext"

// export const Navbar = () => {

//     const {account, logout} = useAuth()
//     return (
//         <div>
//             <nav className="h-[90px] bg-[#6A7AFF] px-[5rem] flex justify-between items-center rounded-[10px] border-2 border-[#CBC5C5]">
//                 <NavLink to={"/pets"}><p className="">Your Pets</p></NavLink>
//                 <NavLink to={"/services"}><p className="">Service list</p></NavLink>
//                 {account ?
//                 <button type="button" value="logout" onClick={logout} className="custom-pink-btn cursor-pointer">Logout</button> :
//                 <NavLink to={"/login"}><p>Login</p></NavLink>}
//             </nav>
//         </div>
//     )

// }
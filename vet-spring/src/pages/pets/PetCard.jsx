// import {useAuth} from "../context/AuthContext.jsx";
// import {NavLink} from "react-router";
// import api from "../utils/api.js";
// import {Error} from "./Error.jsx";
// import {useState} from "react";

import { useContext } from "react";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";
import { ThemeContext } from "../utils/helpers/themeContext";

// export const PetCard = (props) => {
//     const { pet, getPetPage, currentPage, pageSize } = props
//     const { id, ownerId, name, species, breed, birthDate, gender } = pet
//     const [error, setError] = useState("")
//     const { user } = useAuth()

//     const deletePet = async () => {
//         try {
//             await api.delete(`/pets/${id}`);
//             await getPetPage(pageSize, currentPage)
//         } catch (error) {
//             setError(error.response?.message || error.message);
//         }
//     }

//     return (
//         <div className="card card-side bg-base-100 shadow-sm">
//             <div className="card-body">
//                 <h2 className="card-title">{ownerId}</h2>
//                 <p>{name}</p>
//                 <p>{species}</p>
//                 <p>{breed}</p>
//                 <p>{birthDate}</p>
//                 <p>{gender}</p>
//                 <div className="card-actions">
//                     <NavLink to={`/pets/view/${id}`} className="btn btn-primary">View</NavLink>
//                     { user.roles?.includes("ROLE_ADMIN") && <button onClick={deletePet} className="btn btn-error">Delete</button> }
//                 </div>
//                 <Error error={error} isHidden={!error} />
//             </div>
//         </div>
//     )
// }

export const PetCard = ({ pet }) => {
    const { id, name, species, breed, birthdate, gender } = pet;

    return (
        <div className="flex bg-blue-500 w-5/6">
            <div className="flex">
                <p className="p-2">{id}</p>
                <p className="p-2">{name}</p>
                <p className="p-2">{species}</p>
                <p className="p-2">{breed}</p>
                <p className="p-2">{birthdate}</p>
                <p className="p-2">{gender}</p>
            </div>
            <div className="card-actions">
                <EditButton pet={pet} />
                <DeleteButton pet={pet} />
            </div>
        </div>
    );
};
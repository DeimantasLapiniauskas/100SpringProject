// import { useState, useEffect } from "react";
// import { useAuth } from "../context/AuthContext";
// import { getPetsByAccountId } from "../utils/helpers/getPetsByAccountId";
// import { PetCard } from "./PetCard";
// import { ThemeContext } from "../utils/helpers/themeContext";

// export const TempPetList = () => {
//     const { account } = useAuth();
//     const { account_id } = account;

//     const [deleteModalID, setDeleteModalID] = useState("");
//     const [editModalID, setEditModalID] = useState("");
//     const [pets, setPets] = useState([]);

//     useEffect(() => {
//         const fetchPets = async () => {
//             try {
//                 const response = await getPetsByAccountId(account_id);
//                 setPets(response.data);
//             } catch (error) {
//                 console.error("Error while getting pet list", error);
//             }
//         };

//         if (account_id) {
//             fetchPets();
//         }
//     }, [account_id]);

//     return (
//         <ThemeContext.Provider
//             value={{ deleteModalID, setDeleteModalID, editModalID, setEditModalID }}
//         >
//             <div>
//                 {pets.map((pet) => (
//                     <PetCard key={pet.id} pet={pet} />
//                 ))}
//             </div>
//         </ThemeContext.Provider>
//     );
// };
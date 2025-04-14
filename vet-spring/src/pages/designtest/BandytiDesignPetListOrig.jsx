// import { useEffect, useState } from "react";
// import { PetCard } from "./PetCard.jsx";
// import { Error } from "../../components/feedback/Error.jsx";
// import { useAuth } from "../../context/AuthContext";
// import ThemeContext from "../../utils/helpers/themeContext.js";
// import AddPetButton from "./AddPetButton.jsx";
// import { useList } from "../../context/ListContext.jsx";

// export const PetList = () => {
//   const { account } = useAuth();
//   const { iat } = account || "";
//   const [welcome, setWelcome] = useState(true);

//   //!!!!!!!!!!
//   const [deleteModalID, setDeleteModalID] = useState("");
//   const [editModalID, setEditModalID] = useState("");
//   const [addModalID, setAddModalID] = useState("");
//   const {
//     getPage,
//     onPageSizeChange,
//     onPaginate,
//     error,
//     content: pets,
//     currentPage,
//     totalPages,
//     pageSize,
//   } = useList();

//   //TODO fadeout effect
//   const welcomeClosure = () => {
//     setTimeout(() => {
//       setWelcome(false);
//     }, 2000);
//   };

//   useEffect(() => {
//     welcomeClosure();
//   }, []);

//   // const roleCheck = () => {
//   //     return account.scope?.includes("ROLE_CLIENT") || account.scope?.icludes("ROLE_ADMIN")
//   // }

//   return (
//     <>
//       {/* Paw Prints in the Background */}
//       <div className="relative w-full h-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
//         {/* Paw 1 */}
//         <div
//           className="
//               pawss1-for-background-medium
//               absolute
//               w-[25.6%] h-[25.6%]
//               sm:w-[17.5%] sm:h-[17.5%]
//               md:w-[16.7%] md:h-[16.7%]
//               lg:w-[15.6%] lg:h-[15.6%]

//               left-[74.7%] top-[20px]

//               sm:left-[80%] sm:top-[20px]

//               md:left-[79.16%] md:top-[20px]

//               lg:left-[78.13%] lg:top-[20px]

//               xl:left-[72.5%] xl:top-[20px]

//               2xl:left-[68.75%] 2xl:top-[20px]

//               pawss1-paw1-3xl-custom-breakpoint-override

//               pawss1-paw1-4xl-custom-breakpoint-override

//               pawss1-paw1-5xl-custom-breakpoint-override

//               pawss1-paw1-6xl-custom-breakpoint-override

//               translate-x-[1rem] translate-y-[1rem]
//              "
//         ></div>

//         {/* Paw 2 */}
//         <div
//           className="
//               pawss1-for-background-medium
//               absolute
//               w-[25.6%] h-[25.6%]
//               sm:w-[17.5%] sm:h-[17.5%]
//               md:w-[16.7%] md:h-[16.7%]
//               lg:w-[15.6%] lg:h-[15.6%]

//               left-[91.8%] top-[77px]

//               sm:left-[90%] sm:top-[77px]

//               md:left-[87.5%] md:top-[77px]

//               lg:left-[84.38%] lg:top-[77px]

//               xl:left-[77.5%] xl:top-[77px]

//               2xl:left-[72.92%] 2xl:top-[77px]

//               pawss1-paw2-3xl-custom-breakpoint-override

//               pawss1-paw2-4xl-custom-breakpoint-override

//               pawss1-paw2-5xl-custom-breakpoint-override

//               pawss1-paw2-6xl-custom-breakpoint-override

//               translate-x-[-0.5rem] translate-y-[-0.5rem]
//              "
//         ></div>

//         {/* Paw 3 */}
//         <div
//           className="
//               pawss-for-background-medium
//               absolute
//               w-[25.6%] h-[25.6%]
//               sm:w-[17.5%] sm:h-[17.5%]
//               md:w-[16.7%] md:h-[16.7%]
//               lg:w-[15.6%] lg:h-[15.6%]

//               left-[66.2%] top-[82px]

//               sm:left-[75%] sm:top-[82px]

//               md:left-[75%] md:top-[82px]

//               lg:left-[75%] lg:top-[82px]

//               xl:left-[70%] xl:top-[82px]

//               2xl:left-[66.67%] 2xl:top-[82px]

//               pawss1-paw3-3xl-custom-breakpoint-override

//               pawss1-paw3-4xl-custom-breakpoint-override

//               pawss1-paw3-5xl-custom-breakpoint-override

//               pawss1-paw3-6xl-custom-breakpoint-override

//               translate-x-[1rem] translate-y-[-1rem]
//              "
//         ></div>

//         {/* Paw 4 */}
//         <div
//           className="
//               pawss-for-background-medium
//               absolute
//               w-[25.6%] h-[25.6%]
//               sm:w-[17.5%] sm:h-[17.5%]
//               md:w-[16.7%] md:h-[16.7%]
//               lg:w-[15.6%] lg:h-[15.6%]

//               left-[84.27%] top-[92px]

//               sm:left-[85%] sm:top-[92px]

//               md:left-[83.33%] md:top-[92px]

//               lg:left-[81.25%] lg:top-[92px]

//               xl:left-[75%] xl:top-[92px]

//               2xl:left-[70.83%] 2xl:top-[92px]

//               pawss1-paw4-3xl-custom-breakpoint-override

//               pawss1-paw4-4xl-custom-breakpoint-override

//               pawss1-paw4-5xl-custom-breakpoint-override

//               pawss1-paw4-6xl-custom-breakpoint-override

//               translate-x-[-1rem] translate-y-[0.5rem]
//              "
//         ></div>
//       </div>

//       {/* Top Section - Future Image & Text */}
//       <main className="flex flex-col sm:flex-row items-center justify-center gap-4 py-22">
//         {/* Text Section */}
//         <h1 className=" text-black lg:text-4xl md:text-2xl sm:text-lg text-base text-center">
//           Happy Hearts
//           <br />
//           Welcomes Your Pet!
//         </h1>
//       </main>

//       {iat * 1000 + 2000 > Date.now() && welcome ? (
//         <div className="rounded-[10px] border-2 border-amber-900 text-white bg-amber-400 flex w-[5rem]">
//           Welcome!
//         </div>
//       ) : (
//         ""
//       )}

//       <ThemeContext.Provider
//         value={{
//           deleteModalID,
//           setDeleteModalID,
//           editModalID,
//           setEditModalID,
//           addModalID,
//           setAddModalID,
//         }}
//       >
//         <div className="flex flex-col items-center">
//           <AddPetButton
//             getPage={getPage}
//             currentPage={currentPage}
//             pageSize={pageSize}
//           />
//         </div>
//         <div className="flex flex-col items-center gap-8 py-8">
//           <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
//             {pets?.map((pet) => (
//               <PetCard
//                 key={pet.id}
//                 pet={pet}
//                 getPage={getPage}
//                 currentPage={currentPage}
//                 pageSize={pageSize}
//               />
//             ))}
//           </ul>
//           <div className="join">
//             <button
//               className="join-item btn"
//               onClick={async () => onPaginate(currentPage - 1)}
//               disabled={currentPage === 0}
//             >
//               «
//             </button>
//             <button className="join-item btn">Page {currentPage + 1}</button>
//             <button
//               className="join-item btn"
//               onClick={async () => onPaginate(currentPage + 1)}
//               disabled={currentPage === totalPages - 1}
//             >
//               »
//             </button>
//             <select
//               defaultValue="6"
//               className="join-item select ml-4"
//               onChange={onPageSizeChange}
//             >
//               <option value="6">6</option>
//               <option value="9">9</option>
//               <option value="12">12</option>
//             </select>
//           </div>
//           <Error error={error} isHidden={!error} />
//         </div>
//       </ThemeContext.Provider>
//     </>
//   );
// };
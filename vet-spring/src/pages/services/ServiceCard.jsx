import { NavLink } from "react-router";
import { useAuth } from "../../context/AuthContext.jsx";
import api from "../../utils/api.js";
import { Error } from "../../components/feedback/Error.jsx";
import { useState } from "react";
import { useList } from "../../context/ListContext.jsx";
import { motion } from "framer-motion";

export const ServiceCard = (props) => {
  const { service } = props;
  const { id, name, description, price } = service;
  const [error, setError] = useState("");
  const { account } = useAuth();
  const { getPage, currentPage, pageSize } = useList();

  const deleteService = async () => {
    try {
      await api.delete(`/services/${id}`);
      getPage(pageSize, currentPage);
    } catch (error) {
      setError(error.response?.message || error.message);
    }
  };
  const editService = async () => {
    try {
      await api.put(`/services/${id}`);
    getPage(pageSize, currentPage);
    } catch (error) {
      setError(error.response?.message || error.message);
    }
  };

  // const registrApoiment = async(data) => {
  //     const trimmedData = {
  //         ...data,
  //         name: data.id.trim(),
  //       }
  //       const payload = { ...trimmedData};
  //       console.log(payload);

  //     try{
  //         await api.post("/appointments", payload);
  //     } catch (error) {
  //         setError(error.response?.message || error.message);
  //     }
  //}
  const checkRoles = () => {
    //todo: make this better
    return (
      (account !== null &&
        account.scope !== null &&
        account.scope.includes("ROLE_VET")) ||
      (account !== null &&
        account.scope !== null &&
        account?.scope.includes("ROLE_ADMIN"))
    );
  };
  return (
    <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ scale: 1.03 }}
    transition={{ duration: 0.5, delay: 0.2 }}
    className=" card-side will-change-transform bg-purple-300/20 backdrop-blur-lg p-5 rounded-xl shadow-lg ">

      <div className="card-body shadow-lg shadow-[#854685] rounded-[10px] bg-gradient-to-tr backdrop-blur-[100px] to-indigo-600 text-[#FFFFFF] ">
        <h2 className="card-title block break-all">{name}</h2>
        <p
          className=" caret-transparent h-full min-h-[75px] w-full resize-none text-sm focus:outline-[0px]"
        >
          {description}
        </p>
        <p className="text-[#854685]">{price} €</p>
        <div className="card-actions">
          {checkRoles() && (
            <button
              onClick={deleteService}
              className="py-2 px-4 bg-[#FFFFFF] hover:bg-[#CBC5C5] text-error-content font-semibold rounded shadow-sm shadow-pink-400"
            >
              Delete
            </button>
          )}
          {checkRoles() && (
            <NavLink
              to={`/services/edit/${service.id}`}
              className="py-2 px-4 bg-[#FFFFFF] hover:bg-[#CBC5C5] text-error-content font-semibold rounded shadow-sm shadow-pink-400"
            >
              Edit
            </NavLink>
          )}
        </div>
      </div>
    </motion.div>
  );
};

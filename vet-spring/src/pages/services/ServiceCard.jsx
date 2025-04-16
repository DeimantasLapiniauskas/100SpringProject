import { NavLink } from "react-router";
import { useAuth } from "../../context/AuthContext.jsx";
import api from "../../utils/api.js";
import { useState } from "react";
import { RegisterAppointment } from "../appointments/RegisterAppointment.jsx";
import { useList } from "../../context/ListContext.jsx";
import { motion } from "framer-motion";

export const ServiceCard = (props) => {
  const { service } = props;
  const { id, name, description, price, imageUrl } = service;
  const [error, setError] = useState("");
  const { account } = useAuth();
  const [visible, setVisible] = useState(false);
  const { getPage, currentPage, pageSize } = useList();

  const deleteService = async () => {
    try {
      await api.delete(`/services/${id}`);
      getPage(pageSize, currentPage);
    } catch (error) {
      setError(error.response?.message || error.message);
    }
  };

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

  const checkRoleClient = () => {
    return (
      account !== null &&
      account.scope !== null &&
      account.scope.includes("ROLE_CLIENT")
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className=" card-side will-change-transform bg-purple-300/20 backdrop-blur-lg p-5 rounded-xl shadow-lg "
    >
      <div className="card-body shadow-lg shadow-[#854685] rounded-[10px] bg-gradient-to-tr backdrop-blur-[100px] to-indigo-600 text-[#FFFFFF] ">
        <h2 className="card-title block break-all">{name}</h2>
        <p className=" caret-transparent h-full min-h-[75px] w-full resize-none text-sm focus:outline-[0px]">
          {description}
        </p>
        <p className="text-[#854685]">{price} €</p>
        <img src={imageUrl} alt="imgUrl" />
        <div className="card-actions">
          {checkRoles() && (
            <button
              onClick={deleteService}
              className="py-2 px-4 bg-[#FFFFFF] hover:bg-[#CBC5C5] text-error-content font-semibold rounded shadow-sm shadow-pink-400 cursor-pointer"
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
        <div>
          {checkRoleClient() && (
            <button
              className="btn btn-error bg-[#FFFFFF] border-0 hover:bg-[#CBC5C5]"
              onClick={() => setVisible(true)}
            >
              Register
            </button>
          )}
        </div>
      </div>
      {visible && (
        <RegisterAppointment setVisible={setVisible} serviceId={service.id} />
      )}
    </motion.div>
  );
};

import { NavLink } from "react-router";
import { useAuth } from "../../context/AuthContext.jsx";
import api from "../../utils/api.js";
import { useState } from "react";
import { RegisterAppointment } from "../appointments/RegisterAppointment.jsx";
import { useList } from "../../context/ListContext.jsx";
import { motion } from "framer-motion";
import ReactDOM from "react-dom";

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
      transition={{ duration: 0.3, delay: 0.2 }}
      className=" card-side will-change-transform bg-purple-300/20 backdrop-blur-lg p-3 md:p-4 lg:p-5 rounded-xl shadow-lg "
    >
      <div className="px-5 py-3 md:px-6 md:py-4  shadow-lg shadow-[#854685] rounded-[10px] bg-gradient-to-tr backdrop-blur-[100px] to-indigo-600 text-[#FFFFFF] ">
        <h2 className="font-semibold block break-all text-base md:text-lg">
          {name}
        </h2>
        <div className="grid grid-cols-2 mt-1">
          <p
            className=" caret-transparent h-[100px] md:h-[106px] lg:h-[96px]
           focus:outline-[0px] text-sm md:text-[15px] lg:text-base col-span-2 "
          >
            {description
              ? description.length > 275
                ? description.slice(0, 275)
                : description
              : ""}
          </p>
          <p className="text-sm md:text-[15px] lg:text-base h-[90px] md:h-[118px] overflow-hidden pe-2">
          {description
              ? description.length > 275
                ? description.slice(275)
                : ""
              : ""}
          </p>
          <img src={imageUrl} alt="imgUrl" className="w-50 h-25 md:w-60 md:h-30 lg:w-70 lg:h-35 object-cover rounded-lg border border-fuchsia-600 mt-2" />
          <p className="text-[#854685] text-sm md:text-[15px] lg:text-base font-semibold p-1 md:p-2">{price} €</p>
        </div>
        <div className="card-actions">
          {checkRoles() && (
            <button
              onClick={deleteService}
              className="py-2 px-4 bg-[#FFFFFF] hover:bg-[#CBC5C5] text-error-content font-semibold rounded shadow-sm shadow-pink-400 cursor-pointer text-xs md:text-[13px] lg:text-sm"
            >
              Delete
            </button>
          )}
          {checkRoles() && (
            <NavLink
              to={`/services/edit/${service.id}`}
              className="py-2 px-4 bg-[#FFFFFF] hover:bg-[#CBC5C5] text-error-content font-semibold rounded shadow-sm shadow-pink-400 text-xs md:text-[13px] lg:text-sm"
            >
              Edit
            </NavLink>
          )}
        </div>
        <div>
          {checkRoleClient() && (
            <button
              className="btn btn-error bg-[#ffffff] border-0 hover:bg-[#CBC5C5]"
              onClick={() => setVisible(true)}
            >
              Register
            </button>
          )}
        </div>
      </div>
      {/* {visible && (
        <RegisterAppointment setVisible={setVisible} serviceId={service.id} />
      )} */}
      {visible &&
        ReactDOM.createPortal(
          <RegisterAppointment
            setVisible={setVisible}
            serviceId={service.id}
          />,
          document.body // Append to the body element
        )}
    </motion.div>
  );
};

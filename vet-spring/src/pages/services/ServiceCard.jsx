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
      className=" card-side will-change-transform bg-purple-300/20 backdrop-blur-lg p-1 xs:p-2 sm:p-3 md:p-4 lg:p-5 rounded-xl shadow-lg "
    >
      <div className="px-3 py-1.5 xs:px-4 xs:py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3  shadow-lg shadow-[#854685] rounded-[10px] bg-gradient-to-tr backdrop-blur-[100px] to-indigo-600 text-[#FFFFFF] ">
        <h2 className="font-semibold block break-all responsive-text-md">
          {name}
        </h2>
        <div className="grid grid-cols-2 mt-1">
          <p
            className=" caret-transparent h-[84px] xs:h-[95px] sm:h-[90px] md:h-[99px] lg:h-[96px]
           focus:outline-[0px] text-xs xs:text-[13px] sm:text-sm md:text-[15px] lg:text-base col-span-2 leading-3.5 xs:leading-4 sm:leading-4.5 md:leading-5 lg:leading-6"
          >
            {description
              ? description.length > 275
                ? description.slice(0, 275)
                : description
              : ""}
          </p>
          <p className="text-xs xs:text-[13px] sm:text-sm md:text-[15px] lg:text-base h-[58px] xs:h-[67px] sm:h-[90px] md:h-[100px] lg:h-[120px] overflow-hidden pe-2 leading-3.5 xs:leading-4 sm:leading-4.5 md:leading-5 lg:leading-6">
          {description
              ? description.length > 275
                ? description.slice(275)
                : ""
              : ""}
          </p>
          <img src={imageUrl} alt="imgUrl" className="w-30 h-15 xs:w-40 xs:h-20 sm:w-50 sm:h-25 md:w-60 md:h-30 lg:w-70 lg:h-35 object-cover rounded-lg border border-fuchsia-600 mt-2" />
          <p className="text-[#854685] text-xs xs:text-[13px] sm:text-sm md:text-[15px] lg:text-base font-semibold p-1 md:p-2">{price} €</p>
        </div>
        <div className="card-actions">
          {checkRoles() && (
            <button
              onClick={deleteService}
              className=" py-1 px-2 sm:py-2 sm:px-4 bg-[#FFFFFF] hover:bg-[#CBC5C5] text-error-content font-semibold rounded shadow-sm shadow-pink-400 cursor-pointer text-[10px] xs:text-[11px] sm:text-xs md:text-[13px] lg:text-sm"
            >
              Delete
            </button>
          )}
          {checkRoles() && (
            <NavLink
              to={`/services/edit/${service.id}`}
              className="py-1 px-2 sm:py-2 sm:px-4 bg-[#FFFFFF] hover:bg-[#CBC5C5] text-error-content font-semibold rounded shadow-sm shadow-pink-400 text-[10px] xs:text-[11px] sm:text-xs md:text-[13px] lg:text-sm"
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

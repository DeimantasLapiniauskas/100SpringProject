import { NavLink } from "react-router";
import { useAuth } from "../../context/AuthContext.jsx";
import api from "../../utils/api.js";
import { Error } from "../../components/feedback/Error.jsx";
import { useState } from "react";
import { RegisterAppointment } from "../appointments/RegisterAppointment.jsx";
import { useList } from "../../context/ListContext.jsx";

export const ServiceCard = (props) => {
  const { service } = props;
  const { id, name, description, price } = service;
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
    return (account !== null &&
        account.scope !== null &&
        account.scope.includes("ROLE_CLIENT"))
  }

  return (<>
    <div className="card card-side shadow-sm bg-[#6A7AFF] text-[#FFFFFF]">
      <div className="card-body">
        <h2 className="card-title block break-all">{name}</h2>
        <textarea
          readOnly
          className=" caret-transparent peer h-full min-h-[100px] w-full resize-none text-sm focus:outline-[0px]"
        >
          {description}
        </textarea>
        <p>{price} €</p>
        <div className="card-actions">
          {checkRoles() && (
            <button
              onClick={deleteService}
              className="btn btn-error bg-[#FFFFFF] border-0 hover:bg-[#CBC5C5]"
            >
              Delete
            </button>
          )}
          {checkRoles() && (
            <NavLink
              to={`/services/edit/${service.id}`}
              className="btn btn-error bg-[#FFFFFF] border-0 hover:bg-[#CBC5C5]"
            >
              Edit
            </NavLink>
          )}
          {/* <button onClick={registrApoiment} className="btn btn-error bg-[#FFFFFF] border-0">reg</button>     */}
          <div>
            {checkRoleClient() && <button className="btn btn-error bg-[#FFFFFF] border-0 hover:bg-[#CBC5C5]" onClick={()=>setVisible(true)}>Register</button>}
          </div>
        </div>
      </div>
    </div>
      {visible && <RegisterAppointment setVisible={setVisible} serviceId={service.id}/>}</>
  );
};

import { NavLink } from "react-router";
import { useCheckClientRole } from "@/hooks/useCheckRoles";
import { patchEntity } from "@/utils/helpers/entity";
import { useEntityPath } from "@/hooks/usePath";
import { useUI } from "@/context/UIContext";
import { UIStatus } from "@/constants/UIStatus";
import { useIsMounted } from "@/hooks/useIsMounted";
import toast from "react-hot-toast";
import { useState, useRef } from "react";
import { useList } from "@/context/ListContext";

const OrderCard = ({ order }) => {
  const [newOrderStatus, setNewOrderStatus] = useState("");
  const [error, setError] = useState(null);

  const clientRole = useCheckClientRole();
  const entityPath = useEntityPath();
  const { Loading, Success, Error, Unusual } = UIStatus;
  const { setStatus } = useUI();
  const preventUnmountRef = useRef(false);
  const isMounted = useIsMounted(preventUnmountRef);
  const { setUpdate } = useList();

  if (!order) return;

  const {
    id,
    clientResponseDTO,
    vetClinicResponseDTO,
    orderDate,
    totalAmount,
    orderStatus,
  } = order;

  const canCancel = clientRole && orderStatus === "Pending";
  const canPay = clientRole && orderStatus === "Confirmed";
  const completedORCanceled =
    orderStatus === "Completed" || orderStatus === "Cancelled";
  const cancelConfirmed = !clientRole && orderStatus === "Confirmed";

  const handleStatusChange = async (status) => {
    try {
      setStatus(Loading);
      preventUnmountRef.current = true;
      const response = await patchEntity(entityPath, id, { status: status });
      preventUnmountRef.current = false;

      const { data, message, success } = response.data;

      if (message && success) {
        if (!isMounted.current) return;

        setStatus(Success);
        toast.success(message);
        setNewOrderStatus(data?.status);
        setUpdate((prieValue) => prieValue + 1);
      } else setStatus(Unusual);
    } catch (error) {
      if (!isMounted.current) return;

      const errorMessage =
        error.response?.data?.message ?? error.message ?? "Unknown error";
      setError(errorMessage);
      setStatus(Error);
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 backdrop-blur-md border border-white/20 shadow-lg rounded-2xl pb-5 pt-8 px-6 mb-4 w-full max-w-xl relative">
       <div className="flex gap-2 absolute top-1.5 left-1/2 transform -translate-x-1/2 ">
          <p>
            <span>Client: </span>
            {clientResponseDTO?.firstName}
          </p>
          <p> {clientResponseDTO?.lastName}</p>
        </div>
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-semibold text-gray-800">Order #{id}</h2>
        <span
          className={`text-sm font-medium px-3 py-1 rounded-full ${
            orderStatus === "Completed"
              ? "bg-green-100 text-green-700"
              : orderStatus === "Confirmed"
              ? "bg-blue-100 text-blue-700"
              : orderStatus === "Cancelled"
              ? "bg-red-100 text-red-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {orderStatus}
        </span>
      </div>

      <div className="text-sm text-gray-600 mb-4">
        <p>
          <span className="font-medium">Date:</span>{" "}
          {new Date(orderDate)?.toLocaleString()}
        </p>
        <p>
          <span className="font-medium">Total:</span> €{totalAmount?.toFixed(2)}
        </p>
        <div className="flex justify-between">
          <NavLink to={`/orders/view/${order.id}`}>
            <button type="button">View Order</button>
          </NavLink>
          {completedORCanceled ? (
            ""
          ) : (
            <div>
              {canPay && <button>Pay</button>}
              {canCancel && (
                <button
                  type="button"
                  onClick={() => handleStatusChange("Cancelled")}
                >
                  Cancel
                </button>
              )}
              {clientRole && !canPay && !canCancel && ""}
              {cancelConfirmed && (
                <button
                  type="button"
                  onClick={() => handleStatusChange("Cancelled")}
                >
                  Cancel
                </button>
              )}
              {!clientRole && !cancelConfirmed &&
                (<div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleStatusChange("Confirmed")}
                  >
                    Confirm
                  </button>
                  <button
                    type="button"
                    onClick={() => handleStatusChange("Cancelled")}
                  >
                    Decline
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="border-t pt-3  text-sm text-gray-700">
  
        <div className="flex justify-between">
          <p> {vetClinicResponseDTO?.name}</p>
          <p> {vetClinicResponseDTO?.address}</p>
        </div>
        <div className="flex justify-between">
          <p> {vetClinicResponseDTO?.phone}</p>
          <p> {vetClinicResponseDTO?.email}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;

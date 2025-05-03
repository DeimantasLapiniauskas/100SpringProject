import { NavLink } from "react-router";

const OrderCard = ({ order }) => {

  if (!order) return;

  const {
    id,
    clientResponseDTO,
    vetClinicResponseDTO,
    orderDate,
    totalAmount,
    orderStatus,
  } = order;

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 mb-4 w-full max-w-xl">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-semibold text-gray-800">Order #{id}</h2>
        <span
          className={`text-sm font-medium px-3 py-1 rounded-full ${
            orderStatus === "Completed"
              ? "bg-green-100 text-green-700"
              : orderStatus === "Cinfirmed" 
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
        <NavLink to={`/orders/view/${order.id}`}><button type="button">View Order</button></NavLink>
      </div>

      <div className="border-t pt-3 mt-3 text-sm text-gray-700">
        <div className="flex gap-2">
          <p><span>Client: </span>{clientResponseDTO?.firstName}</p>
          <p> {clientResponseDTO?.lastName}</p>
        </div>
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

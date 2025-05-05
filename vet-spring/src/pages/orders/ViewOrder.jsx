import { useUI } from "@/context/UIContext";
import { Loading } from "@/components/feedback/Loading";
import { Error } from "@/components/feedback/Error";
import { Unusual } from "@/components/feedback/Unusual";
import "../../index.css";
import { useEntityData } from "@/hooks/useEntityData";
import { Redirecting } from "@/components/feedback/Redirecting";
import { CircleX } from "lucide-react";
import { NavLink } from "react-router";
import { Button } from "@/components/uiBase/buttonBase";
import { Trash2 } from "lucide-react";
import { useDeleteModal } from "@/context/DeleteModalContext";
import { useCheckClientRole } from "@/hooks/useCheckRoles";

const ViewOrder = () => {
  const { initialData: order, error } = useEntityData({ redirect: true });

  const { isLoading, isError, isUnusual, isRedirecting } = useUI();
  const { openDeleteModal } = useDeleteModal();
  const clientRole = useCheckClientRole();

  if (isLoading) {
    return (
      <div className="h-[20rem] md:h-[35rem]">
        <Loading />
      </div>
    );
  }

  if (isRedirecting) {
    return (
      <div className="h-[20rem] md:h-[35rem]">
        <Redirecting />
      </div>
    );
  }

  if (isUnusual) {
    return <Unusual error={error} />;
  }
  if (isError) {
    return <Error error={error} />;
  }

  if (!order) return;

  const {
    id,
    clientResponseDTO,
    vetClinicResponseDTO,
    orderDate,
    totalAmount,
    orderStatus,
    orderItemsListResponseDTO,
  } = order;

  const canDelete = clientRole && orderStatus === "Cancelled";
  const canPay = clientRole && orderStatus === "Confirmed";

  return (
    <div className=" bg-gradient-to-br from-gray-300 via-white to-gray-100 backdrop-blur-md border border-white/20 rounded-xl shadow-lg p-3 pb-0.25 sm:p-4 sm:pb-0.5 md:p-5 md:pb-0.75 lg:p-6 lg:pb-1 space-y-4 xs:space-y-5 sm:space-y-6 md:space-y-7 lg:space-y-8 my-6 sm:my-8 md:my-10 md:w-8/10 mx-auto relative">
      <NavLink to={"/orders"}>
        <CircleX className="absolute w-2 sm:w-3 md:w-4 lg:w-5 right-3 top-1.5 text-red-950 hover:scale-110 duration-400 opacity-75 hover:opacity-100" />
      </NavLink>
      <div className="flex justify-between">
        <h1 className="responsive-text-lg font-bold text-info-content">
          Order view #{id}
        </h1>
        <div className="sm:flex gap-5">
          <div className="responsive-text-xs text-info-content">
            <p>{vetClinicResponseDTO?.name}</p>
            <p>{vetClinicResponseDTO?.address}</p>
          </div>
          <div className="responsive-text-xs text-info-content">
            <p>{vetClinicResponseDTO?.phone}</p>
            <p>{vetClinicResponseDTO?.email}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-1 sm:gap-1 md:gap-1.5 lg:gap-2 responsive-text-sm text-info-content">
        <p className="text-emerald-950">
          <span className="font-semibold">Client: </span>
          {clientResponseDTO?.firstName} {clientResponseDTO?.lastName}
        </p>
        <p>
          <span className="font-semibold">Date: </span>
          {new Date(orderDate)?.toLocaleString()}
        </p>
        <p>
          <span className="font-semibold">Status: </span>
          <span
            className={` px-2 py-0.5 rounded-full responsive-text-sm ${
              orderStatus === "Completed"
                ? "bg-green-100 text-green-700"
                : orderStatus === "Confirmed"
                ? "bg-blue-100 text-blue-700"
                : orderStatus === "Cancelled"
                ? "bg-red-100 text-red-700"
                : "bg-yellow-100 text-yellow-700 slow-pulse"
            }`}
          >
            {orderStatus}
          </span>
        </p>
        <p>
          <span className="font-semibold">Total: </span> €
          {totalAmount?.toFixed(2)}
        </p>
      </div>

      <div>
        <h2 className="responsive-text-lg font-semibold text-info-content mb-3 ">
          Products
        </h2>
        <div className="overflow-x-auto">
          <table className=" border border-gray-200 w-full">
            <thead className="bg-blue-100 responsive-text-md px-1 sm:px-2 md:px-3 lg:px-4 py-2 text-info-content">
              <tr>
                <th className=" px-1 sm:px-2 md:px-3 lg:px-4 py-2">name</th>
                <th className=" px-1 sm:px-2 md:px-3 lg:px-4 py-2">Image</th>
                <th className=" px-1 sm:px-2 md:px-3 lg:px-4 py-2">Quantity</th>
                <th className=" px-1 sm:px-2 md:px-3 lg:px-4 py-2">Price</th>
                <th className=" px-1 sm:px-2 md:px-3 lg:px-4 py-2">Sum</th>
              </tr>
            </thead>
            <tbody>
              {orderItemsListResponseDTO?.map((item, index) => (
                <tr
                  key={index}
                  className="border-t  border-gray-400 text-info-content"
                >
                  <td className="px-1 sm:px-2 md:px-3  lg:px-4 py-2 text-center responsive-text-sm">
                    {item?.productResponseDTO?.name ?? "N/A"}
                  </td>
                  <td className="px-1 sm:px-2 md:px-3 lg:px-4 py-2 flex justify-center items-center">
                    <img
                      src={item?.productResponseDTO?.imageUrl ?? "N/A"}
                      alt="orderItemImage"
                      className="w-30 xs:w-35 sm:w-40 md:w-45 lg:w-50 rounded-md shadow-lg"
                    />
                  </td>
                  <td className="px-1 sm:px-2 md:px-3 lg:px-4 py-2 text-center responsive-text-sm">
                    {item?.quantity}
                  </td>
                  <td className="px-1 sm:px-2 md:px-3 lg:px-4 py-2 text-center responsive-text-sm">
                    €{item?.itemPrice?.toFixed(2) ?? "0.00"}
                  </td>
                  <td className="px-1 sm:px-2 md:px-3 lg:px-4 py-2 text-center responsive-text-sm">
                    €{(item?.quantity * item?.itemPrice).toFixed(2) ?? "0.00"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end p-1">
          {canDelete && (
            <button
              className="text-red-800 inline-flex items-center  bg-gray-400 rounded-md  gap-1 md:gap-2  hover:bg-black responsive-button-sm responsive-text-xs hover:scale-105 duration-500 cursor-pointer"
              onClick={() => {
                openDeleteModal(order);
              }}
            >
              Delete{" "}
              <span>
                <Trash2 className="w-2.5 sm:w-3 md:w-3.5 " />
              </span>
            </button>
          )}
          {canPay && (
            <Button
              size="sm"
              className="text-white responsive-button-sm"
              onClick={() => alert("Neparduodam!")}
            >
              Pay Now
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewOrder;

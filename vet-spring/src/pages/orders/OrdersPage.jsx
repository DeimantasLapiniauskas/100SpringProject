import { Error } from "../../components/feedback/Error";
import { useList } from "../../context/ListContext";
import { Loading } from "../../components/feedback/Loading";
import { useUI } from "../../context/UIContext";
import { PaginationPanel } from "../../components/features/PaginationPanel";
import { SelectPageSizePanel } from "@/components/features/SelectPageSizePanel";
import { FilterPanel } from "@/components/features/FilterPanel";
import { BadPageRequest } from "@/components/feedback/BadPageRequest";
import { useAuth } from "@/context/AuthContext";
import { Unusual } from "@/components/feedback/Unusual";
import { Redirecting } from "@/components/feedback/Redirecting";
import { ClearAllButton } from "@/components/features/ClearAllButton";
import OrderCard from "./OrderCard";
import { useCheckClientRole } from "@/hooks/useCheckRoles";

export const OrdersList = () => {
  const { error, message, content: orders, isEmpty } = useList();

  const { isLoading, isError, isBadPageRequest, isUnusual, isRedirecting } =
    useUI();

  const { account } = useAuth()
  const clientRole = useCheckClientRole()
  const filterFields = [
    { label: "All orders", value: "All orders" },
    { label: "Pending", value: "Pending" },
    { label: "Confirmed", value: "Confirmed" },
    { label: "Completed", value: "Completed" },
    { label: "Cancelled", value: "Cancelled" },
  ];
  const pageSizes = [6, 9, 12];

  if (isRedirecting) {
    return <Redirecting />;
  }

  return (
    <div className="flex flex-col items-center mt-1 md:mt-2 ">
      <div className="flex flex-col items-center sm:flex-row w-full sm:justify-end gap-2.5 md:gap-3.5 relative ">
        <div className="absolute sm:bottom-[-1.25rem] md:bottom-[-1.5rem] right-0.5 xs:right-15 sm:right-3">
          <ClearAllButton />
        </div>
        <div className="flex gap-2 items-center px-2 md:px-3">
          <FilterPanel filterFields={filterFields} />
          <SelectPageSizePanel pageSizes={pageSizes} />
        </div>
      </div>
      <section className="px-2 py-3 sm:px-3 sm:py-4 md:px-4 md:py-6 text-center ">
        <h2 className="lg:text-3xl md:text-2xl sm:text-xl text-lg font-bold text-info-content mb-2  md:mb-4 text-center">
        Manage Your Orders with Ease
        </h2>
        <article className="text-sm md:text-base lg:text-lg text-gray-700 max-w-3xl mx-auto text-center">
        Track your recent purchases, view order details, and stay informed about your pet’s care essentials. Whether it’s a new toy or vital medication, your pet’s happiness starts here.
        </article>
      </section>

      {isEmpty ? <p>{message}</p> : ""}
      {isLoading ? <Loading /> : ""}
      {isError ? <Error error={error} /> : ""}
      {isBadPageRequest ? <BadPageRequest /> : ""}
      {isUnusual ? <Unusual error={error} /> : ""}
      {isEmpty || isLoading || isError || isBadPageRequest || isUnusual ? (
        ""
      ) : (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 w-full place-items-center px-2 xs:px-4 sm:px-6 md:px-8 lg:px-10">
          {clientRole ? orders?.filter((order) => order.clientResponseDTO?.accountResponseDTO?.id === account?.account_id).map((order) => (
            <OrderCard key={order.id} order={order} />
          )) : orders?.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
      <div className="p-3 flex justify-center">
        <PaginationPanel />
      </div>
    </div>
  );
};

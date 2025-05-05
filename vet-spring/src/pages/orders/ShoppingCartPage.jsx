import { useShoppingCartStore } from "@/hooks/useShoppingCartStore";
import { useNavigate } from "react-router";
import { UIStatus } from "@/constants/UIStatus";
import { useUI } from "@/context/UIContext";
import { useIsMounted } from "@/hooks/useIsMounted";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { Redirecting } from "@/components/feedback/Redirecting";
import { Loading } from "@/components/feedback/Loading";
import { Error } from "@/components/feedback/Error";
import { Unusual } from "@/components/feedback/Unusual";
import { Plus } from "lucide-react";
import { Minus } from "lucide-react";

export const ShoppingCartPage = () => {
  const cartItems = useShoppingCartStore((state) => state.cartItems);
  const removeFromCart = useShoppingCartStore((state) => state.removeFromCart);
  const clearCart = useShoppingCartStore((state) => state.clearCart);
  const removeOneFromCart = useShoppingCartStore(
    (state) => state.removeOneFromCart
  );
  const addToCart = useShoppingCartStore((state) => state.addToCart);
  const totalSum = useShoppingCartStore((state) => state.getTotalSum());
  const uniqueItems = useShoppingCartStore((state) => state.getUniqueItems());
  const itemQuantity = useShoppingCartStore((state) => state.getItemQuantity());
  const placeOrder = useShoppingCartStore((state) => state.placeOrder);

  const [error, setError] = useState(null);

  const {
    Loading: Fetching,
    Success,
    Error: Err,
    Redirecting: Navigating,
  } = UIStatus;
  const { isLoading, isUnusual, isError, isRedirecting, setStatus } = useUI();
  const formIsSubmittingRef = useRef(false);
  const isMounted = useIsMounted(formIsSubmittingRef);
  const controller = useRef(new AbortController());
  const navigate = useNavigate();

  const handlePlaceOrder = async () => {
    formIsSubmittingRef.current = true;
    controller.current = new AbortController();
    const signal = controller.current.signal;

    try {
      setStatus(Fetching);
      const result = await placeOrder(signal);

      formIsSubmittingRef.current = false;

      if (!isMounted.current) return;

      const { message, success, error } = result;

      if (message && success) {
        setStatus(Success);
        toast.success(message);
        setTimeout(() => {
          setStatus(Navigating);
          navigate("/products");
        }, 1000);
      } else {
        setError(error);
        setStatus(Err);
      }
    } catch (error) {
      if (error.name === "AbortError") {
        toast.error("Request was cancelled");
        return;
      }
      if (!isMounted.current) return;
      setStatus(Err);
    }
  };

  return (
    <div className="mt-1 xs:mt-1.5 sm:mt-2 md:mt-2.5 lg:mt-3 p-2 xs:p-3 sm:p-4 md:p-5 lg:p-6 flex flex-col items-center bg-gradient-to-b min-h-screen via-sky-200 to-emerald-400">
      <h1 className="responsive-text-xl font-bold mb-3 sm:mb-4 md:mb-4 lg:mb-6 text-emerald-900">
        Your Cart
      </h1>

     
        <div className="px-2 xs:px-3 sm:px-0 sm:mx-3 md:mx-4 lg:mx-5 w-full  sm:w-2/3">
          {cartItems?.length === 0 && (
            <p className="responsive-text-lg text-info-content">
              Cart is empty
            </p>
          )}
          <div className="space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-5">
          {isLoading ? <Loading /> : ""}
      {isError ? <Error error={error} /> : ""}
      {isRedirecting ? <Redirecting /> : ""}
      {isUnusual ? <Unusual error={error} /> : ""}
      {isRedirecting || isLoading || isError || isUnusual ? (
        ""
      ) : (uniqueItems?.map((item, idx) => (
              <div
                key={idx}
                className=" items-center border-b border-emerald-900 pb-2 sm:pb-3 md:pb-4 lg:pb-5"
              >
                <div className="responsive-text-md text-emerald-800 flex flex-col gap-1 sm:gap-1.5 md:gap-2 lg:gap-2.5">
                  <div className="flex justify-between">
                  <p className="font-semibold responsive-text-lg">
                      {item.name}
                    </p>
                    <img
                      src={item.imageUrl}
                      alt="itemImage"
                      className=" w-25 sm:w-30 md:w-35 lg:w-40 rounded-md mx-1"
                    />
                  </div>
                  <div className="flex justify-between">
                    <div className="flex items-center bg-emerald-100 rounded-md  px-1 sm:px-1.5 md:px-2 gap-1 sm:gap-1.5 md:gap-2">
                      <button type="button" onClick={() => addToCart(item)}>
                        <Plus className="w-2 sm:w-2.5 md:w-3 lg:w-3.5 hover:scale-130 duration-200 text-orange-800 cursor-pointer" />
                      </button>
                      <p className=" text-yellow-800">
                        {itemQuantity[item.id]}
                      </p>
                      <button
                        type="buttom"
                        onClick={() => removeOneFromCart(item.id)}
                      >
                        <Minus className="w-2 sm:w-2.5 md:w-3 lg:w-3.5 hover:scale-130 duration-200 text-orange-800 cursor-pointer" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-800 hover:font-semibold responsive-text-md px-1 sm:px-1.5 md:px-2 cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                  <p className=" text-info-content">${item.price}</p>
                  <p className="text-info-content">
                    <span>In Stock: </span>
                    {item.stockQuantity}
                  </p>
                </div>
              </div>
            ))
          )}
            <div className="text-right mt-2 sx:mt-3 sm:mt-4 md:mt-5 lg:mt-6">
              <div className="flex justify-between">
                <button
                  type="button"
                  className="responsive-text-md text-red-800 cursor-pointer rounded-md px-1 sm:px-1.5 md:px-2 py-0.25 md:py-0.5 hover:font-semibold hover:scale-105 duration-100"
                  onClick={clearCart}
                >
                  Clear Cart
                </button>
                <p className="responsive-text-lg  text-orange-800 font-semibold">
                  Total: ${totalSum.toFixed(2)}
                </p>
              </div>
              <div className="mt-2 sm:mt-3 md:mt-4 lg:mt-5 flex gap-2 sm:gap-3 md:gap-4 lg:gap-5 justify-end">
                <button
                  type="button"
                  onClick={() => navigate("/products")}
                  className="responsive-text-md  bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500 text-white  rounded-md hover:bg-gradient-to-br hover:from-gray-400 hover:via-gray-500 hover:to-gray-600 cursor-pointer py-1 sm:py-1.5 md:py-2  px-2 sm:px-3 md:px-4 "
                >
                  Continue shoping
                </button>
                <button
                  type="button"
                  onClick={handlePlaceOrder}
                  disabled={!Array.isArray(cartItems) || cartItems.length === 0}
                  className={`responsive-text-md rounded-md py-1 sm:py-1.5 md:py-2 px-2 sm:px-3 md:px-4
                    ${!Array.isArray(cartItems) || cartItems.length === 0
                      ? "bg-gray-400 cursor-not-allowed opacity-60"
                      : "bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-800 text-white hover:from-emerald-400 hover:via-emerald-500 hover:to-emerald-600 cursor-pointer"
                    }`}
                >
                  {isLoading ? <span className="animate-pulse">Placing...</span> : "Place order"}
                </button>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};

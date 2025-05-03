import { useShoppingCartStore } from "@/hooks/useShoppingCartStore";
import { useNavigate } from "react-router";
import { useMemo, useState } from "react";
import { UIStatus } from "@/constants/UIStatus";
import { useUI } from "@/context/UIContext";
import { useIsMounted } from "@/hooks/useIsMounted";
import { useRef } from "react";
import toast from "react-hot-toast";

export const ShoppingCartPage = () => {
  const cartItems = useShoppingCartStore((state) => state.cartItems);
  const removeFromCart = useShoppingCartStore((state) => state.removeFromCart);
  const clearCart = useShoppingCartStore((state) => state.clearCart);
  const removeOneFromCart = useShoppingCartStore(
    (state) => state.removeOneFromCart
  );
  const placeOrder = useShoppingCartStore((state) => state.placeOrder);

  const [error, setError] = useState(null);

  const { Loading, Success,  Error, Redirecting } = UIStatus;
  const { setStatus } = useUI();
  const formIsSubmittingRef = useRef(false);
  const isMounted = useIsMounted(formIsSubmittingRef);
  const controller = useRef(new AbortController());
  const navigate = useNavigate();
  const totalSum = useMemo(
    () => cartItems?.reduce((sum, item) => sum + item.price, 0).toFixed(2),
    [cartItems]
  );
  const quantity = useMemo(
    () =>
      cartItems?.reduce((acc, item) => {
        acc[item.id] = (acc[item.id] || 0) + 1;
        return acc;
      }, {}),
    [cartItems]
  );

  const handlePlaceOrder = async () => {
    formIsSubmittingRef.current = true;
    controller.current = new AbortController();
    const signal = controller.current.signal;

    try {
      setStatus(Loading);
      const result = await placeOrder(signal);

      formIsSubmittingRef.current = false;

      if (!isMounted.current) return;

      const { message, success, error } = result;

      if (message && success) {
        setStatus(Success);
        toast.success(message);
        setTimeout(() => {
          setStatus(Redirecting)
          navigate("/products")
        }, 1000)
      } else {
        setError(error);
        setStatus(Error);
      }
    } catch (error) {
      if (error.name === "AbortError") {
        toast.error("Request was cancelled");
        return;
      }
      if (!isMounted.current) return;
      setStatus(Error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      {cartItems?.length === 0 && (
        <p className="text-gray-600">Cart is empty</p>
      )}

      <div className="space-y-4">
        {cartItems
          ?.filter(
            (item, idx, self) =>
              idx === self.findIndex((selfItem) => selfItem.id === item.id)
          )
          .map((item, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center border-b pb-2"
            >
              <div>
                <img src={item.imageUrl} alt="itemImage" className="w-20" />
                <p className="font-semibold">{item.name}</p>
                <div className="flex">
                  <button>+</button>
                  <p>{quantity[item.id]}</p>
                  <button>-</button>
                </div>
                <p className="text-sm text-gray-500">${item.price}</p>
                <p>{item.stockQuantity}</p>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 text-sm"
              >
                Remove
              </button>
            </div>
          ))}

        <div className="text-right mt-6">
          <p className="text-lg font-semibold">Total: ${totalSum}</p>
          <div className="mt-4 flex gap-4 justify-between">
            <div>
              <button type="button" onClick={clearCart}>
                Clear Cart
              </button>
            </div>
            <div>
              <button
                type="button"
                onClick={() => navigate("/products")}
                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Continue shoping
              </button>
              <button
                type="button"
                onClick={handlePlaceOrder}
                disabled={cartItems?.length === 0}
                className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 cursor-pointer"
              >
                Place order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

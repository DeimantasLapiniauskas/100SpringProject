// import { useCart } from "@/context/CartContext";
import { useShoppingCartStore } from "@/hooks/useShoppingCartStore";
import { X } from "lucide-react";
import { useNavigate } from "react-router";
import shoppingCartIcon from "../../assets/icons/shoppingCart.svg";
import { useAuth } from "@/context/AuthContext";
import { useMemo } from "react";
import { Plus } from "lucide-react";
import { Minus } from "lucide-react";

export const MiniCart = () => {
  // const { cartItems, removeFromCart, isOpen, toggleCart } = useCart();
    const cartItems = useShoppingCartStore((state) => state.cartItems);
    const removeFromCart = useShoppingCartStore((state) => state.removeFromCart);
    const addToCart = useShoppingCartStore((state) => state.addToCart)
    const clearCart = useShoppingCartStore((state) => state.clearCart);
    const isOpen = useShoppingCartStore((state) => state.isOpen);
    const toggleCart = useShoppingCartStore((state) => state.toggleCart);
    const removeOneFromCart = useShoppingCartStore((state) => state.removeOneFromCart)

  const navigate = useNavigate();
  const { account } = useAuth();

  const quantity = useMemo(() => cartItems?.reduce((acc, item) => {
    acc[item.id] = (acc[item.id] || 0) + 1;
    return acc;
  }, {}), [cartItems]
  ) 

  return (
    <>
      {account && (
        <div className="flex flex-col">
          <div className=" flex relative" onClick={toggleCart}>
            <img
              src={shoppingCartIcon}
              alt="shoppingCartIcon"
              className="w-6 xs:w-7 sm:w-8 md:w-9 lg:w-10"
              style={{
                animation: "shake 5s ease-in-out infinite",
              }}
            />
            {cartItems?.length > 0 && (
              <div className="absolute w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4 md:w-4.5 lg:w-5 lg:h-5 md:h-4.5 top-1  rounded-full bg-sky-400 text-white flex justify-center items-center animate-bounce responsive-text-xs">
                {cartItems?.length}
              </div>
            )}
          </div>
          {isOpen && (
            <div className="w-80 bg-red-500 shadow-lg z-50 p-4 flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">Your Cart</h2>
                <button onClick={toggleCart}>
                  <X />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto space-y-3">
                {cartItems?.length === 0 && <p>Cart is empty</p>}
                {cartItems?.filter((item, idx, self) => idx === self.findIndex((selfItem) => selfItem.id === item.id))
                .map((item, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center border-b pb-2"
                  >
                    <div>
                    <img src={item.imageUrl} alt="itemImage" className="w-20" />
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-gray-500">${item.price}</p>
                      <div className="flex">
                        <button type="button" onClick={() => addToCart(item)}><Plus className="w-3"/></button>
                        <p className="text-sm text-yellow-800">{quantity[item.id]}</p>
                        <button type="buttom" onClick={() => removeOneFromCart(item.id)} ><Minus className="w-3"/></button>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-blue-500 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
              <button
                onClick={() => {
                  toggleCart();
                  navigate("/cart");
                }}
                className="mt-4 bg-black text-white py-2 rounded-md hover:bg-gray-800"
              >
                Go to Cart
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

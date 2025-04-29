import { useCart } from "@/context/CartContext";
import { X } from "lucide-react";
import { useNavigate } from "react-router";
import shoppingCartIcon from "../../assets/icons/shoppingCart.svg";
import { useAuth } from "@/context/AuthContext";

export const MiniCart = () => {
  const { cartItems, removeFromCart, isOpen, toggleCart } = useCart();
  const navigate = useNavigate();
  const { account } = useAuth();

  return (
    <>
      {account && (
        <div className="flex flex-col">
          <div className=" flex relative" onClick={toggleCart}>
            <img
              src={shoppingCartIcon}
              alt="shoppingCartIcon"
              className="w-7 xs:w-8 sm:w-9 md:w-10"
              style={{
                animation: "shake 5s ease-in-out infinite",
              }}
            />
            {cartItems?.length > 0 && (
              <div className="absolute w-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4 md:w-4.5 md:h-4.5 top-1  rounded-full bg-sky-400 text-white flex justify-center items-center animate-bounce responsive-text-xs">
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
                {cartItems.length === 0 && <p>Cart is empty</p>}
                {cartItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center border-b pb-2"
                  >
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-gray-500">${item.price}</p>
                      <p className="text-sm text-yellow-800">{item.quantity}</p>
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

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
              className="w-10"
            />
            <div className="absolute w-5 h-5 top-1 rounded-full bg-sky-400 text-white flex justify-center items-center ">
              {cartItems.length}
            </div>
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
                      <p className="font-semibold">{item.title}</p>
                      <p className="text-sm text-gray-500">${item.price}</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 text-sm"
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

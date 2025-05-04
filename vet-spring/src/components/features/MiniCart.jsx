import { useShoppingCartStore } from "@/hooks/useShoppingCartStore";
import { X } from "lucide-react";
import { useNavigate } from "react-router";
import { Plus } from "lucide-react";
import { Minus } from "lucide-react";
import { ShoppingCartIcon } from "@/assets/icons/ShoppingCartIcon";

export const MiniCart = () => {
  const cartItems = useShoppingCartStore((state) => state.cartItems);
  const removeFromCart = useShoppingCartStore((state) => state.removeFromCart);
  const addToCart = useShoppingCartStore((state) => state.addToCart);
  const clearCart = useShoppingCartStore((state) => state.clearCart);
  const isOpen = useShoppingCartStore((state) => state.isOpen);
  const toggleCart = useShoppingCartStore((state) => state.toggleCart);
  const removeOneFromCart = useShoppingCartStore(
    (state) => state.removeOneFromCart
  );
  const totalSum = useShoppingCartStore((state) => state.getTotalSum());
  const uniqueItems = useShoppingCartStore((state) => state.getUniqueItems());
  const itemQuantity = useShoppingCartStore((state) => state.getItemQuantity());

  const navigate = useNavigate();

  return (
    <>
        <div className="flex flex-col">
          <div className=" flex relative" onClick={toggleCart}>
            <ShoppingCartIcon
              className="w-6 xs:w-7 sm:w-8 md:w-9 lg:w-10 text-info-content hover:text-sky-700"
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
            <div className="w-60 sm:w-80  md:w-100  bg-emerald-100/10 backdrop-blur-md border border-emerald-200/100 rounded-xl shadow-lg z-50 p-2 sm:p-3 md:p-4 flex flex-col">
              <div className="flex justify-between items-center mb-2 sm:mb-2.5 md:mb-3">
                <h2 className="responsive-text-md text-emerald-900 font-bold">Your Cart</h2>
                <p className="responsive-text-sm text-orange-800"><span>Total: </span>${totalSum?.toFixed(2)}</p>
                <button onClick={toggleCart}>
                  <X className="text-emerald-800 w-2 sm:w-3 md:w-4 lg:w-5"/>
                </button>
              </div>
              <div className="flex-1 max-h-50 sm:max-h-55 md:max-h-60 overflow-y-auto space-y-2 sm:space-y-2.5 md:space-y-3">
                {cartItems?.length === 0 && <p className="responsive-text-sm text-info-content">Cart is empty</p>}
                {uniqueItems?.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center border-b border-emerald-800 pb-1 sm:pb-2 md:pb-3 "
                  >
                    <div className="responsive-text-sm flex flex-col gap-1 sm:gap-1.5 md:gap-2 w-full px-1">
                      <img
                        src={item.imageUrl}
                        alt="itemImage"
                        className="w-10 sm:w-12.5 md:w-15 rounded-sm"
                      />
                      <p className="font-semibold text-emerald-800">{item.name}</p>
                      <p className=" text-info-content">${item.price}</p>
                      <div className="flex justify-between">
                        <div className="flex items-center bg-emerald-100 rounded-md  px-1 sm:px-1.5 md:px-2 gap-1 sm:gap-1.5 md:gap-2">
                          <button type="button" onClick={() => addToCart(item)}>
                            <Plus className="w-2 sm:w-2.5 md:w-3 hover:scale-130 duration-200 text-orange-800 cursor-pointer" />
                          </button>
                          <p className=" text-yellow-800">
                            {itemQuantity[item.id]}
                          </p>
                          <button
                            type="buttom"
                            onClick={() => removeOneFromCart(item.id)}
                          >
                            <Minus className="w-2 sm:w-2.5 md:w-3 hover:scale-130 duration-200 text-orange-800 cursor-pointer" />
                          </button>
                      </div>
                      <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-800 hover:font-semibold responsive-text-sm px-1 sm:px-1.5 md:px-2 cursor-pointer"
                    >
                      Remove
                    </button>
                      </div>
                    
                    </div>
                    
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between ">
                <button type="button" className="responsive-text-sm mt-2 sm:mt-3 md:mt-4 text-red-800 cursor-pointer rounded-md px-1 sm:px-1.5 md:px-2 py-0.25 md:py-0.5 hover:font-semibold hover:scale-105 duration-100"
                onClick={clearCart}>
                Clear Cart
                </button>
                <button
                  onClick={() => {
                    toggleCart();
                    navigate("/cart");
                  }}
                  className="responsive-text-sm mt-2 sm:mt-3 md:mt-4 bg-gradient-to-br from-sky-700 via-sky-800 to-info-content text-white py-1 sm:py-1.5 md:py-2 w-6/10 mx-2 rounded-md hover:bg-gradient-to-br hover:from-sky-500 hover:via-sky-600 hover:to-sky-700 cursor-pointer"
                >
                  Proceed to Cart Page
                </button>
              </div>
            </div>
          )}
        </div>
    </>
  );
};

import { createContext, useContext, useState } from "react";

const CartContext = createContext({
  addToCart: () => {},
  removeFromCart: () => {},
  toggleCart: () => {},
  cartItems: [],
  isOpen: false,
});

export const CartProvider = ({ children }) => {
  const [cartItems, setCartitems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const addToCart = (item) => {
    setCartitems((prev) => [...prev, item]);
  };

  const removeFromCart = (id) => {
    setCartitems((prev) => prev.filter((item) => item.id !== id));
  };

  console.log("Pirmas",isOpen)

  const toggleCart = () => {
    setIsOpen(!isOpen);
  };

  return (
    <CartContext.Provider
      value={{ addToCart, removeFromCart, toggleCart, isOpen, cartItems }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};

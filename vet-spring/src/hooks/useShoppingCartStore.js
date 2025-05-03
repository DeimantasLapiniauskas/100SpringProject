import { postEntity } from "@/utils/helpers/entity";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useShoppingCartStore = create(
  persist(
    (set, get) => ({
      cartItems: [],
      isOpen: false,
      error: null,

      toggleCart: () => set({ isOpen: !get().isOpen }),

      setCartOpen: (value) => set({ isOpen: value }),

      addToCart: (item) => {
        set({ cartItems: [...get().cartItems, item] });
      },

      removeFromCart: (id) => {
        set({ cartItems: get().cartItems.filter((item) => item.id !== id) });
      },

      clearCart: () => {
        set({ cartItems: [] });
      },

      removeOneFromCart: (id) => {
        const index = get().cartItems.findIndex((item) => item.id === id);

        if (index !== -1) {
          let newItems = get().cartItems;
          newItems = [
            ...newItems.slice(0, index),
            ...newItems.slice(index + 1),
          ];
          set({ cartItems: newItems });
        }
      },

      placeOrder: async (signal) => {
        const totalSum = get().cartItems?.reduce(
          (acc, item) => acc + item.price,
          0
        );
        const uniqueItems = get().cartItems.filter(
          (item, idx, self) =>
            idx === self.findIndex((selfItem) => selfItem.id === item.id)
        );
        const itemQuantity = get().cartItems?.reduce((acc, item) => {
          acc[item.id] = (acc[item.id] || 0) + 1;
          return acc;
        }, {});

        const orderItemListRequestDTO = uniqueItems.map(({ id, price }) => ({
          productId: id,
          quantity: itemQuantity[id],
          itemPrice: Number(price.toFixed(2)),
         
        }));

        const order = { orderItemListRequestDTO, totalAmount: Number(totalSum.toFixed(2)) };

        if (order.orderItemListRequestDTO.length === 0)
          return { success: false, message: "Cart is empty" };
        try {
          const response = await postEntity("orders", order, signal);
          const { message, success } = response.data;

          if (message && success) get().clearCart();
          return { success: success, message: message };
        } catch (error) {
          return {
            success: false,
            error:
              error?.response?.data?.message ||
              error?.message ||
              "Unknown error",
          };
        }
      },
    }),

    {
      name: "shoppingCart-storage",
      getStorage: () => localStorage,
      partialize: (state) => ({
        cartItems: state.cartItems,
        // isOpen: state.isOpen,
      }),
    }
  )
);

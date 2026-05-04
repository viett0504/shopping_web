import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        const { items } = get();
        const existingIndex = items.findIndex(
          (i) =>
            i.productId === item.productId &&
            i.size === item.size &&
            i.color === item.color
        );

        if (existingIndex > -1) {
          // Item exists, increase quantity
          const newItems = [...items];
          newItems[existingIndex].quantity += item.quantity || 1;
          set({ items: newItems });
        } else {
          // New item
          set({
            items: [
              ...items,
              {
                ...item,
                quantity: item.quantity || 1,
              },
            ],
          });
        }
      },

      removeItem: (productId, size, color) => {
        set({
          items: get().items.filter(
            (item) =>
              !(
                item.productId === productId &&
                item.size === size &&
                item.color === color
              )
          ),
        });
      },

      updateQuantity: (productId, quantity, size, color) => {
        const { items } = get();
        const index = items.findIndex(
          (i) =>
            i.productId === productId &&
            i.size === size &&
            i.color === color
        );

        if (index > -1) {
          const newItems = [...items];
          if (quantity <= 0) {
            newItems.splice(index, 1);
          } else {
            newItems[index].quantity = quantity;
          }
          set({ items: newItems });
        }
      },

      increaseQuantity: (productId, size, color) => {
        const { items } = get();
        const index = items.findIndex(
          (i) =>
            i.productId === productId &&
            i.size === size &&
            i.color === color
        );

        if (index > -1) {
          const newItems = [...items];
          newItems[index].quantity += 1;
          set({ items: newItems });
        }
      },

      decreaseQuantity: (productId, size, color) => {
        const { items } = get();
        const index = items.findIndex(
          (i) =>
            i.productId === productId &&
            i.size === size &&
            i.color === color
        );

        if (index > -1) {
          const newItems = [...items];
          if (newItems[index].quantity > 1) {
            newItems[index].quantity -= 1;
          } else {
            newItems.splice(index, 1);
          }
          set({ items: newItems });
        }
      },

      clearCart: () => {
        set({ items: [] });
      },

      getTotalQuantity: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalAmount: () => {
        return get().items.reduce((total, item) => {
          const price = item.salePrice || item.price;
          return total + price * item.quantity;
        }, 0);
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);

export { useCartStore };
export default useCartStore;

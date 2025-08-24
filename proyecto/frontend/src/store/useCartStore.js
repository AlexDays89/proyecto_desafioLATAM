import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import axios from "../config/axios.config";

const initialState = {
  cart: [],
  products: [],
};

const useCartStore = create(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,
        async queryApi() {
          try {
            const { data } = await axios.get("/productos");
            set({ products: data });
          } catch (e) {
            console.error("queryApi error:", e.message || e);
          }
        },
        total: () => get().cart.reduce((ac, { price, count }) => ac + price * count, 0),
        addCart: (id) => {
          const { cart, products } = get();
          const idx = cart.findIndex((p) => p.id === id);
          const found = products.find((p) => p.id === id);
          if (!found) return;
          if (idx !== -1) {
            const copy = structuredClone(cart);
            copy[idx].count++;
            set({ cart: copy });
          } else {
            set({ cart: [...cart, { ...found, count: 1 }] });
          }
        },
        removeCart: (id) => {
          const { cart } = get();
          const next = cart
            .map((it) => (it.id === id ? { ...it, count: it.count - 1 } : it))
            .filter((it) => it.count > 0);
          set({ cart: next });
        },
        clear: () => set(initialState),
      }),
      { name: "cart-store" }
    )
  )
);

export default useCartStore;

"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, MenuItem, PortionSize } from "@/types";
import { getPriceForSize } from "@/lib/pricing";

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (item: MenuItem, portion: PortionSize) => void;
  addDeal: (deal: {
    id: string;
    title: string;
    price: number;
    image?: string;
  }) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  subtotal: () => number;
  totalItems: () => number;
}

function cartLineId(menuItemId: string, portion: PortionSize) {
  return `${menuItemId}-${portion}`;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((s) => ({ isOpen: !s.isOpen })),
      addItem: (item, portion) => {
        const unitPrice = getPriceForSize(item, portion);
        const id = cartLineId(item.id, portion);
        const existing = get().items.find((i) => i.id === id);

        if (existing) {
          set({
            items: get().items.map((i) =>
              i.id === id ? { ...i, quantity: i.quantity + 1 } : i
            ),
            isOpen: true,
          });
          return;
        }

        set({
          items: [
            ...get().items,
            {
              id,
              menuItemId: item.id,
              name: item.name,
              image: item.image,
              portion,
              unitPrice,
              quantity: 1,
            },
          ],
          isOpen: true,
        });
      },
      addDeal: (deal) => {
        const id = `deal-${deal.id}`;
        const existing = get().items.find((i) => i.id === id);
        if (existing) {
          set({
            items: get().items.map((i) =>
              i.id === id ? { ...i, quantity: i.quantity + 1 } : i
            ),
            isOpen: true,
          });
          return;
        }
        set({
          items: [
            ...get().items,
            {
              id,
              menuItemId: deal.id,
              name: deal.title,
              image:
                deal.image ||
                "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=80",
              portion: "regular",
              unitPrice: deal.price,
              quantity: 1,
            },
          ],
          isOpen: true,
        });
      },
      removeItem: (id) =>
        set({ items: get().items.filter((i) => i.id !== id) }),
      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        set({
          items: get().items.map((i) =>
            i.id === id ? { ...i, quantity } : i
          ),
        });
      },
      clearCart: () => set({ items: [] }),
      subtotal: () =>
        get().items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0),
      totalItems: () =>
        get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    { name: "crave-dine-cart-v2" }
  )
);
